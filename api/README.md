### GET /items/all
Returns a list of all of the user's items.

**Example response body:**  
`{ 'result': [{ 'itemId': 1, 'title': 'Note 1', 'category': 'Notes', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2019-12-19 09:30:03.000111', 'star': False, 'content': 'This is a note.' }, { 'itemId': 2, 'title': 'Note 2', 'category': 'Notes 2', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2019-12-19 09:30:03.000111', 'star': True, 'content': 'This is a starred note.' }] }`

### GET /categories/{category_id}
Returns a list of all of the items associated with a user's specific category.

**Example response body:**  
`{ 'result': [{ 'itemId': 1, 'title': 'Note 1', 'category': 'Notes', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2019-12-19 09:30:03.000111', 'star': False, 'content': 'This is a note.' }] }`

### GET /items/starred
Returns a list of all of the user's starred items.

**Example response body:**  
`{ 'result': [{ 'itemId': 2, 'title': 'Note 2', 'category': 'Notes', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2019-12-19 09:30:03.000111', 'star': True, 'content': 'This is a starred note.' }] }`

### GET /items/{item_id}
Returns the content of a user's individual item.

**Example response body:**  
`{ 'itemId': 1, 'title': 'Note 1', 'category': 'Notes', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2019-12-19 09:30:03.000111', 'star': False, 'content': 'This is a note.' }`


### PUT /items/{item_id}
Edit information about an item. Can supply fields such as `"title"`, `"content"`, etc.

**Example Request body:** `{ "content" : "I just edited this note." }`

**Example response body:**  
`{ 'itemId': 1, 'title': 'Note 1', 'category': 'Notes', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2020-1-27 09:30:03.000111', 'star': False, 'content': 'I just edited this note.' }`


### PUT /categories/{category_id}
Edit information about a category. Can supply fields such as `"title"`, `"content"`, etc.

**Example Request body:** `{ "name" : "New Category Name" }`

**Example Response body:** 
`{ 'categoryId': 1, 'name': 'New Category Name' }`

### POST /items
Create a new item.

**Example Request body:** `{ "title" : "Note 5", "content": "Newly created item." }`

**Example Response body:** 
`{ 'itemId': 5, 'title': 'Note 5', 'category': 'Notes', 'dateCreated': '2018-12-19 09:26:03.478039', 'dateModified': '2020-1-27 09:30:03.000111', 'star': False, 'content': 'Newly created item.' }`

### POST /categories
Create a new category.

**Example Request body:** `{ "name" : "My new category" }`

**Example Response body:** 
`{ 'categoryId': 3, 'name': 'My new category' }`

### DELETE /items/{item_id}
Delete an item. Returns HTTP 200 OK upon success.


### DELETE /categories/{category_id}
Delete a category. Returns HTTP 200 OK upon success.