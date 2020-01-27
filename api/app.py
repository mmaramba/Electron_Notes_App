import json
import pymongo
from datetime import datetime
from flask import Flask, request, jsonify
from config import get_connection_string

app = Flask(__name__)
client = None


def db_connect():
    global client
    connection_string = get_connection_string()
    client = pymongo.MongoClient(connection_string)
    print(client)


@app.route('/items/all', methods=['GET'])
def getAllItems():
    pass


@app.route('/all', methods=['GET'])
def getCandidates():
    pass


# Predicts sentiment of tweet
@app.route('/predict', methods=['POST'])
def predict():
    pass


if __name__ == '__main__':
    print(('* Flask starting server and loading MongoDB database...'
           'please wait until server has fully started'))
    db_connect()
    app.run()
