const conditionState = {
  state: {
    aside: true,
    isDialog: false,
    web: null
  },
  mutations: {
    'SET_ASIDE': (state, aside) => {
      state.aside = aside;
    },
    'SET_DIALOG': (state, isDialog) => {
      state.isDialog = isDialog;
    },
    'SET_WEB': (state, web) => {
      state.web = web;
    }
  },
  actions: {
    async GetWeb({commit}) {
      await commit('SET_WEB', process.env.PUBLICPATH);
    }
  }
};

export default conditionState;
