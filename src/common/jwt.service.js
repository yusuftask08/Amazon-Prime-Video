const ID_TOKEN_KEY = "id_token";

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
    return window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
    return window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default {
    getToken,
    saveToken,
    destroyToken
};