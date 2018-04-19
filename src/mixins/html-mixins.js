/**
 * Created by qiangxl on 2018/4/19.
 */
export default {
  data: () => ({
    isShow: false,
    imgSrc: '',
  }),
  methods: {
    modifyImage(html) {
      this.$nextTick(() => {
        let $nodes = this.$refs[html].children;
        for (let tep of $nodes) {
          let hasImg = tep.children[0] && tep.children[0].nodeName === 'IMG';
          if (hasImg) {
            tep.className = 'img-wrapper';
            this.$emit('showImages');
          }
        }
      })
    },
    showImages(event) {
      if (event.target.nodeName === 'IMG') {
        let $src = event.target.currentSrc;
        this.imgSrc = $src;
        this.isShow = true;
      }
    },
    closeImg(val) {
      this.isShow = val;
    }
  }
}