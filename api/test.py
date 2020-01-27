import pymongo
from config import get_connection_string

connection_string = get_connection_string()
client = pymongo.MongoClient(connection_string)
print(client)

db = client['database']
col = db['items']

sample_item = { 
    'itemId': 5, 
    'title': 'Note 5', 
    'category': 'Notes', 
    'dateCreated': '2018-12-19 09:26:03.478039', 
    'dateModified': '2020-1-27 09:30:03.000111', 
    'star': False, 
    'content': 'Newly created item.' 
}

col.insert_one(sample_item)