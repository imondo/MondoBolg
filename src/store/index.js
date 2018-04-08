import Vue from 'vue';
import Vuex from 'vuex';
import conditionState from './modules/condition';
import users from './modules/users';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
      conditionState,
      users
    },
    getters
});

export default store;
