import json
import pymongo
from datetime import datetime
from flask import Flask, request, jsonify, abort, make_response, session
from flask_bcrypt import Bcrypt
from config import get_connection_string, get_secret_key
from bson.json_util import dumps
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


# Create item
@app.route('/item', methods=['POST'])
def createItem():
    pass


# Retrieve user's items
@app.route('/item/all', methods=['GET'])
def getAllItems():
    pass


# Retrieve user's starred items
@app.route('/item/starred', methods=['GET'])
def getStarredItems():
    pass


# Retrieve user's items in given category
@app.route('/item/cat/<categoryId>', methods=['GET'])
def getItemsByCategory():
    pass


# Operations on an individual item
@app.route('/item/<itemId>', methods=['GET', 'PUT', 'DELETE'])
def singleItemOperation():
    # Retrieve item
    if request.method == 'GET':
        pass
    # Update an existing item
    elif request.method == 'PUT':
        pass
    # Delete an item
    elif request.method == 'DELETE':
        pass


# Create category
@app.route('/category', methods=['POST'])
def createCategory():
    pass


# Retrieve user's categories
@app.route('/category/all', methods=['GET'])
def getAllCategories():
    if 'email' in session:
        email = session['email']
        res = client.db.users.find_one({'email': email})
        cats = res['categories']
        print(cats)
        return jsonify(cats)
    else:
        abort(401, "Not logged in")


# Operations on an individual category
@app.route('/category/<categoryId>', methods=['PUT, DELETE'])
def singleCategoryOperation():
    # Edit an existing category
    if request.method == 'PUT':
        pass
    # Delete a category
    elif request.method == 'DELETE':
        pass


# Register user
@app.route('/user', methods=['POST'])
def createUser():
    content = request.get_json()

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
@app.route('/user', methods=['GET', 'PUT, DELETE'])
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
        pass
    # Delete an account
    elif request.method == 'DELETE':
        pass


# User login
@app.route('/session', methods=['POST'])
def login():
    content = request.get_json()

    email = content['email']
    user_doc = client.db.users.find_one({'email': email})
    pprint(user_doc)

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
    print(session['email'])
    session.pop('email', None)

    resp = jsonify(success=True)
    return resp


if __name__ == '__main__':
    print(('* Flask starting server and loading MongoDB database...'
           'please wait until server has fully started'))
    db_connect()
    app.run()
