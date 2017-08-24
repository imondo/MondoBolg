import Vue from 'vue';
import Vuex from 'vuex';
import articleList from './module/article';
import conditionState from './module/condition';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
      articleList,
      conditionState
    },
    getters
});

export default store;
