const getters = {
  articleList: state => state.articleList,
  conditionState: state => state.conditionState,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo
};

export default getters;
