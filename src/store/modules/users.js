import handleToken from '~/utils/token';
const jwt = require('jsonwebtoken');

let userInfo = null;
const users = {
    state: {
        userInfo: userInfo
    },
    mutations: {
        SET_USER: (state, user) => {
            state.userInfo = user;
        }
    },
    actions: {
        // 获取用户信息
        async GetUser ({ commit }) {
            return await handleToken.getToken().then(token => {
                if (token) {
                    let decode = jwt.decode(token);
                    commit('SET_USER', decode);
                }
                return token;
            })
        },
        async LoginOut({ commit }) {
            return await handleToken.removeToken().then(isToken => {
                isToken && commit('SET_USER', null);
                return isToken;
            })
        }
    }
};

export default users;
