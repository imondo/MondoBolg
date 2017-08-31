const conditionState = {
  state: {
    aside: true,
    isDialog: false
  },
  mutations: {
    'SET_ASIDE': (state, aside) => {
      state.aside = aside;
    },
    'SET_DIALOG': (state, isDialog) => {
      state.isDialog = isDialog;
    }
  }
};

export default conditionState;
