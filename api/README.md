# Senior Project API
Prototype documentation for Michael Maramba's Senior Project API. This API features routes that support functionality for user registration, note-taking and saving, and data display.

## Version: 1.0.0

**Contact information:**  
mpmaramb@calpoly.edu  

### /item

#### POST
##### Summary:

Create item

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Created item object | Yes | [Item](#item) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### /item/all

#### GET
##### Summary:

Retrieve user's items

##### Description:

Returns a list of all of the user's items

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | object |

### /item/starred

#### GET
##### Summary:

Retrieve user's starred items

##### Description:

Returns a list of all of the user's starred items

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | object |

### /item/cat/{categoryId}

#### GET
##### Summary:

Retrieve items by category

##### Description:

Returns a single pet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| categoryId | path | ID of category to search items by | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | object |

### /item/{itemId}

#### GET
##### Summary:

Retrieve item by ID

##### Description:

Returns a single item

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| itemId | path | ID of item to return | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Item](#item) |

#### PUT
##### Summary:

Update an existing item

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| itemId | path | ID of item to edit | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

#### DELETE
##### Summary:

Delete an item

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| itemId | path | Item ID to delete | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### /user

#### POST
##### Summary:

Register user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Created user object | Yes | [User](#user) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### /user/{userId}

#### GET
##### Summary:

Retrieve user by ID

##### Description:

Returns a single user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | ID of item to return | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |

#### PUT
##### Summary:

Update user information

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | ID of user to update | Yes | integer |
| body | body | Updated information of user | Yes | [User](#user) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

#### DELETE
##### Summary:

Delete an account

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| userId | path | User ID to delete | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### /session

#### POST
##### Summary:

User Login

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | User login information | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | object |

### /session/{sessionId}

#### DELETE
##### Summary:

User logout

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| sessionId | path | Session ID to delete | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### /category

#### POST
##### Summary:

Create category

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Created category | Yes | [Category](#category) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### /category/all

#### GET
##### Summary:

Retrieve user's categories

##### Description:

Returns a list of user's categories

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | object |

### /category/{categoryId}

#### PUT
##### Summary:

Edit an existing category

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| categoryId | path | ID of category to edit | Yes | integer |
| body | body | Created user object | Yes | [Category](#category) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

#### DELETE
##### Summary:

Delete a category

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| categoryId | path | Category ID to delete | Yes | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |

### Models


#### Category

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| name | string |  | Yes |

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| firstName | string |  | No |
| lastName | string |  | No |
| email | string |  | Yes |
| password | string |  | Yes |

#### Item

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| title | string |  | No |
| category | string |  | No |
| dateCreated | dateTime |  | No |
| dateModified | dateTime |  | No |
| star | boolean | whether item is starred or not | No |
| content | string | HTML representation of item content | Yes |