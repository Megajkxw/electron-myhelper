var storage=window.localStorage;

let remember_me = "remember_me"
let token="token"

function saveToken(token) {
    storage[token]=token
}

function getToken() {
    return  storage.getItem(token)
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

function setRemember_me(isRemeberMe) {
    storage[remember_me]=isRemeberMe;
}

function isRemember_me() {
    let temp= storage[remember_me]
    if (temp===null){
        return false;
    }
    else{
        return true;
    }
}


// function remove_remember_me() {
//     storage.removeItem("rememberMe")
// }
export default {
    saveToken,
    getToken,
    clearToken,
    isTokenExist,
    remember_me,
    // setRemember_me,
    setRemember_me,
    isRemember_me
}
