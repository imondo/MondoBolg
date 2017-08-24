const conditionState = {
  state: {
    aside: true
  },
  mutations: {
    'SET_ASIDE': (state, aside) => {
      state.aside = aside;
    }
  }
};

export default conditionState;
