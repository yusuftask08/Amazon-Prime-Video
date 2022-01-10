import axios from "axios";
import {

    WL_API
} from "../common/config";
import {
    WATCH_LIST_ADD,
    WATCH_LIST_DELETE,
    WATCH_LIST_GET,
} from "./actions.type";
import {
    SET_WATCH_LIST,
    SET_ADD_WATCH_LIST
} from "./mutations.type";

const state = {
    watchList: [],
    isAddWatchList: false,
};

const getters = {
    setWatchList(state) {
        return state.watchList
    },
    setIsAddWatchList(state) {
        return state.isAddWatchList
    }
};

const actions = {
    [WATCH_LIST_ADD](context, credentials) {
        axios.post(`${WL_API}/watchList`, credentials).then(_ => {
            if (_.status === 201) {
                context.commit(SET_ADD_WATCH_LIST, _.data.id)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    },
    [WATCH_LIST_GET](context, ) {
        axios.get(`${WL_API}/watchList`).then(_ => {
            if (_.status === 200) {
                context.commit(SET_WATCH_LIST, _.data)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    },
    [WATCH_LIST_DELETE](context, credentials) {
        axios.delete(`${WL_API}watchList/${credentials}`).then(_ => {
            if (_.status === 200) {
                this.dispatch(WATCH_LIST_GET);
                context.commit(SET_ADD_WATCH_LIST, false)
            }
        }).catch(err => {
            console.log(`err`, err)
        });
    }
};

const mutations = {
    [SET_ADD_WATCH_LIST](state, item) {
        state.isAddWatchList = item;
    },
    [SET_WATCH_LIST](state, item) {
        state.watchList = item;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};