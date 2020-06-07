const baseUrl = 'http://127.0.0.1:5000';
//const baseUrl = 'https://mm-senior-proj.azurewebsites.net/';


async function userLogin(data) {
    return fetch(baseUrl + '/session', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function registerUser(data) {
    return fetch(baseUrl + '/user', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function getUserCategories() {
    return fetch(baseUrl + '/category/all', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function getAllItems() {
    return fetch(baseUrl + '/item/all', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function getStarredItems() {
    return fetch(baseUrl + '/item/starred', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function getSearchItems(query) {
    return fetch(baseUrl + '/item/search?title=' + query, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function getItemsFromCategory(categoryId) {
    return fetch(baseUrl + '/item/cat/' + categoryId, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function getUser() {
    return fetch(baseUrl + '/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function editItem(itemId, data) {
    return fetch(baseUrl + '/item/' + itemId, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function editUser(data) {
    return fetch(baseUrl + '/user', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function editCat(catId, data) {
    return fetch(baseUrl + '/category/' + catId, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function createCat(data) {
    return fetch(baseUrl + '/category', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function createItem(data) {
    return fetch(baseUrl + '/item', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(handleErrors)
    .catch(error => console.log(error));
}

async function deleteItem(itemId) {
    return fetch(baseUrl + '/item/' + itemId, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function deleteCat(id) {
    return fetch(baseUrl + '/category/' + id, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
    .then(handleErrors)
    .catch(error => console.log(error));  
}

async function handleErrors(response) {
    console.log("HI");
    const json = await response.json()
    //console.log(json);
    if (!response.ok) {
        console.log(json.error);
    }
    return json;
}

module.exports.userLogin = userLogin;
module.exports.registerUser = registerUser;
module.exports.getUserCategories = getUserCategories;
module.exports.getUser = getUser;
module.exports.editItem = editItem;
module.exports.createItem = createItem;
module.exports.getAllItems = getAllItems;
module.exports.getStarredItems = getStarredItems;
module.exports.getSearchItems = getSearchItems;
module.exports.getItemsFromCategory = getItemsFromCategory;
module.exports.deleteItem = deleteItem;
module.exports.editUser = editUser;
module.exports.editCat = editCat;
module.exports.createCat = createCat;
module.exports.deleteCat = deleteCat;