const KEY = "token";

export function getToken(){
    return localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
};


export function setToken(token,remember){
    const store = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;

    other.removeItem(KEY);
    store.setItem(KEY,token);
};
export function clearToken(){
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
};
