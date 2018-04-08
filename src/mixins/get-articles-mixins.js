import { getArtcileList } from '~/api/article';

export default {
  data: () => ({
    articleList: [],
    count: 0,
    params: {
      pageSize: 9,
      pageNo: 1
    }
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getList();
    });
  },
  methods: {
    getList() {
      getArtcileList(this.params).then((response) => {
        if (response.code == 200) {
          this.articleList = response.data.results;
          this.count = response.data.count;
        }
      });
    },
    setArticle(index) {
      this.params.pageNo = index;
      this.getList();
    }
  }
}