<template>
  <div id="app">
    <v-header :class="{slideDown:!isScroll,slideUp:isScroll}" @click="aside"></v-header>
    <div class="main-wrapper clearfix" :class="{mainAside: !conditionState.aside}">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import header from './views/header/header';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        isScroll: false,
        scroll: '',
        transitionName: ''
      };
    },
    computed: {
      ...mapGetters([
        'conditionState'
      ])
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
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'fade-in' : 'fade-out';
      }
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
    min-height: 100%;
    margin: 0 auto;
    overflow: hidden;
    &.mainAside {
      display: none;
    }
  }
  .slideDown {
    animation-name: slideDown;
  }
  .slideUp {
    animation-name: slideUp;
  }
  @import "styles/media";
</style>
