import json
import pymongo
from datetime import datetime
from flask import Flask, request, jsonify, abort, make_response, session
from flask_bcrypt import Bcrypt
from config import get_connection_string, get_secret_key
from bson.json_util import dumps
from bson.objectid import ObjectId
from pprint import pprint


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.secret_key = get_secret_key()
client = None


def db_connect():
    global client
    connection_string = get_connection_string()
    client = pymongo.MongoClient(connection_string)
    print(client)


# Create item (must supply null categoryId if none yet)
@app.route('/item', methods=['POST'])
def createItem():
    if 'email' in session:
        email = session['email']

        creation_time = datetime.now()

        # Get item object
        content = request.get_json()
        new_item = {
            '_id': ObjectId(),
            'title': content['title'],
            'categoryId': content['categoryId'],
            'dateCreated': creation_time,
            'dateModified': creation_time,
            'star': False,
            'content': content['content']
        }

        # Add to array in embedded document (currently ignores duplicates)
        client.db.users.update_one(
            { 'email': email },
            {'$addToSet': { 'items': new_item }}
        )

        return jsonify(success=True)
    else:
        abort(401, "Not logged in")


# Retrieve user's items
@app.route('/item/all', methods=['GET'])
def getAllItems():
    if 'email' in session:
        email = session['email']
        res = client.db.users.find_one({'email': email})
        items = res['items']
        print(items)

        # Sanitize (for ObjectId)
        sanitized = json.loads(dumps(items))
        return jsonify(sanitized)
    else:
        abort(401, "Not logged in")


# Retrieve user's starred items
@app.route('/item/starred', methods=['GET'])
def getStarredItems():
    if 'email' in session:
        email = session['email']
        res = client.db.users.find_one({'email': email})
        items = res['items']

        # Add starred to result array
        starred = []
        for item in items:
            if item['star']:
                starred.append(item)
        print(starred)

        sanitized = json.loads(dumps(starred))
        return jsonify(sanitized)
    else:
        abort(401, "Not logged in")


# Retrieve user's items in given category
@app.route('/item/cat/<categoryId>', methods=['GET'])
def getItemsByCategory(categoryId):
    if 'email' in session:
        email = session['email']
        res = client.db.users.find_one({'email': email})
        items = res['items']
        cats = res['categories']

        # Check if id is in user's categories
        id_found = False
        for cat in cats:
            if '_id' in cat and str(cat['_id']) == categoryId:
                id_found = True
        
        if not id_found:
            abort(404, "ID not found")

        # Add items from category to result array
        starred = []
        for item in items:
            if 'categoryId' in item and str(item['categoryId']) == categoryId:
                starred.append(item)
        print(starred)

        sanitized = json.loads(dumps(starred))
        return jsonify(sanitized)
    else:
        abort(401, "Not logged in")


# Operations on an individual item
@app.route('/item/<itemId>', methods=['GET', 'PUT', 'DELETE'])
def singleItemOperation(itemId):
    # Retrieve item
    if request.method == 'GET':
        if 'email' in session:
            email = session['email']
            res = client.db.users.find_one({'email': email})
            items = res['items']

            for item in items:
                if '_id' in item and str(item['_id']) == itemId:
                    sanitized = json.loads(dumps(item))
                    return jsonify(sanitized)
            
            abort(404, "Item not found")
        else:
            abort(401, "Not logged in")

    # Update an existing item
    elif request.method == 'PUT':
        if 'email' in session:
            email = session['email']
            content = request.get_json()

            # Create Python obj with fields and vals to update
            set_obj = {}
            for field in content:
                if field == '_id':
                    abort(403, "Forbidden request to change ID")
                elif field == 'categoryId':
                    set_obj['items.$.categoryId'] = ObjectId(content['categoryId'])
                else:
                    print(field, content[field])
                    key_str = 'items.$.' + field
                    val = content[field]
                    set_obj[key_str] = val
            print(set_obj)
            
            
            # Update $ from array in embedded document
            client.db.users.update_one(
                { 'email': email, 'items._id': ObjectId(itemId) },
                { '$set': set_obj }
            )

            return jsonify(success=True)            
        else:
            abort(401, "Not logged in")
    # Delete an item
    elif request.method == 'DELETE':
        if 'email' in session:
            email = session['email']

            # Remove from array in embedded document
            client.db.users.update_one(
                { 'email': email },
                {'$pull': { 'items': { '_id': ObjectId(itemId) } }}
            )

            return jsonify(success=True)
        else:
            abort(401, "Not logged in")


# Create category
@app.route('/category', methods=['POST'])
def createCategory():
    if 'email' in session:
        email = session['email']

        # Get new category name
        content = request.get_json()
        cat_name = content['name']
        new_cat = {
            '_id': ObjectId(),
            'name': cat_name
        }

        # Check dup category
        res = client.db.users.find_one({'email': email})
        cats = res['categories']
        for cat in cats:
            if 'name' in cat and cat['name'] == cat_name:
                abort(400, "Duplicate category name")

        # Add to array in embedded document (currently ignores duplicates)
        client.db.users.update_one(
            { 'email': email },
            {'$addToSet': { 'categories': new_cat }}
        )

        return jsonify(success=True)
    else:
        abort(401, "Not logged in")


# Retrieve user's categories
@app.route('/category/all', methods=['GET'])
def getAllCategories():
    if 'email' in session:
        email = session['email']
        res = client.db.users.find_one({'email': email})
        cats = res['categories']

        # Sanitize (for ObjectId)
        sanitized = json.loads(dumps(cats))
        return jsonify(sanitized)
    else:
        abort(401, "Not logged in")


# Operations on an individual category
@app.route('/category/<categoryId>', methods=['PUT', 'DELETE'])
def singleCategoryOperation(categoryId):
    # Rename category
    if request.method == 'PUT':
        if 'email' in session:
            email = session['email']
            content = request.get_json()
            
            # Make sure name field is in request
            if 'name' not in content:
                abort(400, "Does not contain name field")
            
            # Update $ from array in embedded document
            client.db.users.update_one(
                { 'email': email, 'categories._id': ObjectId(categoryId) },
                { '$set': { 'categories.$.name': content['name'] } }
            )

            return jsonify(success=True)            
        else:
            abort(401, "Not logged in")
    # Delete a category
    elif request.method == 'DELETE':
        if 'email' in session:
            email = session['email']

            # Remove from array in embedded document
            client.db.users.update_one(
                { 'email': email },
                {'$pull': { 'categories': { '_id': ObjectId(categoryId) } }}
            )

            return jsonify(success=True)
        else:
            abort(401, "Not logged in")


# Register user
@app.route('/user', methods=['POST'])
def createUser():
    content = request.get_json()

    # TODO: Check content for all fields
    REQ_FIELDS = ['email', 'password', 'firstName', 'lastName']
    for field in REQ_FIELDS:
        if field not in content:
            abort(400, "Missing fields")

    # Check duplicate email
    email = content['email']
    dup = client.db.users.count_documents({'email': email})
    if dup:
        abort(400, "Duplicate email")


    # Salt and hash password
    password = content['password']
    pw_hash = bcrypt.generate_password_hash(password)

    first_name = content['firstName']
    last_name = content['lastName']
    
    # Store in DB
    user_doc = {
        'email': email,
        'password': pw_hash,
        'firstName': first_name,
        'lastName': last_name,
        'categories': [],
        'items': []
    }
    client.db.users.insert_one(user_doc)
    
    resp = jsonify(success=True)
    return resp




# Operations on an individual user
@app.route('/user', methods=['GET', 'PUT', 'DELETE'])
def singleUserOperation():
    # Retrieve user information
    if request.method == 'GET':
        if 'email' in session:
            print("Logged in")
            email = session['email']
            resp = dumps(client.db.users.find_one({'email': email}))
            print(resp)
            return resp
        else: 
            abort(401, "Not logged in")
    # Update user information
    elif request.method == 'PUT':
        if 'email' in session:
            email = session['email']
            content = request.get_json()

            # TODO: Changing email, changing password
            # Create Python obj with fields and vals to update
            VALID_FIELDS = ["firstName", "lastName"]
            set_obj = {}
            for field in content:
                if field not in VALID_FIELDS:
                    abort(403, "Forbidden request")
                else:
                    print(field, content[field])
                    set_obj[field] = content[field]
            print(set_obj)

            client.db.users.update_one(
                {'email': email},
                {'$set': set_obj}
            )

            resp = jsonify(success=True)
            return resp
        else: 
            abort(401, "Not logged in")
    # Delete user account
    elif request.method == 'DELETE':
        if 'email' in session:
            email = session['email']
            client.db.users.delete_one({'email': email})

            resp = jsonify(success=True)
            return resp
        else: 
            abort(401, "Not logged in")


# User login
@app.route('/session', methods=['POST'])
def login():
    content = request.get_json()

    # Search for email in DB
    email = content['email']
    user_doc = client.db.users.find_one({'email': email})
    if not user_doc:
        abort(401, "Invalid email")

    # Check password
    candidate = content['password']
    pw_success = bcrypt.check_password_hash(user_doc['password'], candidate)
    print(pw_success)

    # Return 401 Unauthorized if incorrect password
    if not pw_success:
        abort(401, "Incorrect password")
        
    # Add email to sessions
    resp = jsonify(success=True)
    session['email'] = email
    return resp


# User logout
@app.route('/session', methods=['DELETE'])
def logout():
    session.pop('email', None)

    resp = jsonify(success=True)
    return resp


if __name__ == '__main__':
    print(('* Flask starting server and loading MongoDB database...'
           'please wait until server has fully started'))
    db_connect()
    app.run()
