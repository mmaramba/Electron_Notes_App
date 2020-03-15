const baseUrl = 'http://127.0.0.1:5000';



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

async function handleErrors(response) {
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