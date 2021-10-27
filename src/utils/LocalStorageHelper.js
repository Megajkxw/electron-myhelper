var storage=window.localStorage;

function saveToken(token) {
    storage['token']=token
}

function getToken() {
    return  storage.getItem('token')
}

function isTokenExist() {
    let token=getToken()
    if (token==null){
        return false
    }
    return true
}

function clearToken() {
    storage.removeItem("token");
}

export default {
    saveToken,
    getToken,
    clearToken,
    isTokenExist,
}