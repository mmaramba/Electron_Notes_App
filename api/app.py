import json
import pymongo
from datetime import datetime
from flask import Flask, request, jsonify
from config import get_connection_string
from bson.json_util import dumps


app = Flask(__name__)
client = None


def db_connect():
    global client
    connection_string = get_connection_string()
    client = pymongo.MongoClient(connection_string)
    print(client)


# Create item
@app.route('/item/all', methods=['POST'])
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
    pass


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
    pass


# Operations on an individual user
@app.route('/user/<userId>', methods=['GET', 'PUT, DELETE'])
def singleUserOperation():
    # Retrieve user information
    if request.method == 'GET':
        pass
    # Update user information
    elif request.method == 'PUT':
        pass
    # Delete an account
    elif request.method == 'DELETE':
        pass


# User login
@app.route('/session', methods=['POST'])
def login():
    pass


# User logout
@app.route('/session/<sessionId>', methods=['DELETE'])
def logout():
    pass


if __name__ == '__main__':
    print(('* Flask starting server and loading MongoDB database...'
           'please wait until server has fully started'))
    db_connect()
    app.run()
