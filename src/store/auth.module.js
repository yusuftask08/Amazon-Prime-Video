import JwtService from "@/common/jwt.service";
import {
    LOGIN_URL,
    SIGN_UP_URL,
    FB_API_KEY
} from "../common/config";
import {
    LOGIN,
} from "./actions.type";
import {
    SET_TOKEN,
    CLEAR_TOKEN,
} from "./mutations.type";
import axios from "axios";

const state = {
    token: "",
};

const getters = {
    setToken(state) {
        return state.token
    },
    isAuthO(state) {
        return state.token !== "";
    }
};

const actions = {
    async [LOGIN](context, credentials) {
        const auth = credentials.signUp === true ? SIGN_UP_URL : LOGIN_URL;
        try {
            const data = await axios.post(auth + FB_API_KEY, {
                email: credentials.data.email,
                password: credentials.data.password,
                returnSecureToken: true
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(_ => {
                localStorage.setItem('name', _.data.email.replace(/@.*$/, ""))
                context.commit(SET_TOKEN, _.data.idToken);
            });
        } catch (err) {
            console.log(`err`, err.message);
        }
    }

};

const mutations = {
    [SET_TOKEN](state, item) {
        JwtService.saveToken(item);
        state.token = item;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};