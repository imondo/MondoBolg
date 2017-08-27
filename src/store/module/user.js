import { loginOut } from '../../api/login';
import { setToken, removeToken } from '../../utils/auth';
import Cookies from 'js-cookie';

let userInfo = {};
const user = {
    state: {
        token: Cookies.get('TOKEN'),
        userInfo: userInfo
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.userInfo = user;
        }
    },
    actions: {
        // 设置token
        SetToken ({ commit, state }, token) {
            return new Promise((reslove, reject) => {
                setToken(token); // 登录成功后将token存储在cookie中
                commit('SET_TOKEN', token);
                reslove();
            });
        },

        // 获取用户信息
        GetUser ({ commit, state }, user) {
            return new Promise((resolve, reject) => {
                commit('SET_USER', user);
                resolve();
            });
        },

        // 登出系统
        LoginOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                loginOut().then(() => {
                    commit('SET_TOKEN', {});
                    commit('SET_USER', {});
                    removeToken();
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 前端登出系统
        FeLoginOut({commit, state}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', {});
                commit('SET_USER', {});
                resolve();
            });
        }

    }
};

export default user;
