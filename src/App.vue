<template>
  <div id="app">
    <v-header :class="{slideDown:!isScroll,slideUp:isScroll}"></v-header>
    <div class="main-wrapper clearfix">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import header from './views/header/header';
  export default {
    data() {
      return {
        isScroll: false,
        scroll: ''
      };
    },
    methods: {
      menu() {
        this.scroll = document.body.scrollTop;
        if (this.scroll > 20) {
          this.isScroll = true;
        } else {
          this.isScroll = false;
        }
      },
      aside() {
        this.$store.commit('SET_ASIDE', true);
      }
    },
    mounted() {
      window.addEventListener('scroll', this.menu);
      window.addEventListener('click', this.aside);
//      window.addEventListener('touchstart', this.aside);
    },
    components: {
      'v-header': header
    }
  };
</script>

<style  lang="less" rel="stylesheet/less">
  @import "styles/base";
  .main-wrapper {
    position: relative;
    padding: 90px 20px 0;
    max-width: 940px;
    margin: 0 auto;
    overflow: hidden;
    animation-name: fade-in;
    animation-duration: .5s;
    animation-timing-function: initial;
    animation-delay: initial;
    animation-iteration-count: initial;
    animation-direction: initial;
    animation-fill-mode: initial;
    animation-play-state: initial;
  }
  .slideDown {
    animation-name: slideDown;
  }
  .slideUp {
    animation-name: slideUp;
  }
  @import "styles/media";
</style>
