<style  lang="less" rel="stylesheet/less">
  .layout-warpper, .main-wrapper {
    height: 100%;
  }
  .main-wrapper {
    position: relative;
    max-width: 940px;
    margin: 0 auto;
    &.mainAside {
      display: none;
    }
    &.mainLogin {
      height: 100%;
    }
    &.mainEdit {
      max-width: 100%;
      padding-top: 73px;
    }
  }
  .slideDown {
    animation-name: slideDown;
  }
  .slideUp {
    animation-name: slideUp;
  }
  .child-view {
    position: absolute;
    left: 0;
    top: 90px;
    width: 100%;
    padding: 20px;
    transition: all .8s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate3d(0, -50px, 0);
  }
</style>
<template>
  <div class="layout-warpper">
    <MHeader :class="{slideDown:!isScroll,slideUp:isScroll}" @click="aside"></MHeader>
    <div class="main-wrapper" :class="{mainLogin: isLogin, mainAside: !conditionState.aside, mainEdit: isEdit, mainUser: isUser}">
      <transition :name="transitionName">
        <router-view class="child-view clearfix"></router-view>
      </transition>
    </div>
    <smooth-up></smooth-up>
  </div>
</template>

<script type='text/ecmascript-6'>
  import MHeader from './header';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Layout',
    components: {
      MHeader: MHeader
    },
    data() {
      return {
        isScroll: false,
        scroll: 0,
        transitionName: '',
        isEdit: false,
        isUser: false,
        isLogin: false
      };
    },
    computed: {
      ...mapGetters([
        'conditionState'
      ])
    },
    created() {
      this.isEdit = this.$route.meta.isRoute;
      this.isLogin = this.$route.meta.isLogin;
    },
    methods: {
      menu() {
        this.scroll = window.scrollY;
        this.scroll > 20 ? this.isScroll = true : this.isScroll = false;
      },
      aside() {
        this.$store.commit('SET_ASIDE', true);
      },
      smoothUp() {
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let step = 10;
        if (distance > 0) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(this.smoothUp(), 10);
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.menu);
    },
    watch: {
      $route(to, from) {
        this.smoothUp();
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right';
        this.isEdit = this.$route.meta.isRoute;
        this.isLogin = this.$route.meta.isLogin;
        if (to.path.indexOf('/user') > -1) {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
      },
      scroll(newVal, oldVal) {
        if (newVal < oldVal) {
          this.isScroll = false;
        }
      }
    }
  };
</script>
