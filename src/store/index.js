import Vue from 'vue';
import Vuex from 'vuex';
import articleList from './module/article';
import conditionState from './module/condition';
import user from './module/user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
      articleList,
      conditionState,
      user
    },
    getters
});

export default store;
