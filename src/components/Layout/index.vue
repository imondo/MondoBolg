<style  lang="less" rel="stylesheet/less">
  .main-wrapper {
    position: relative;
    padding: 90px 20px 0;
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
    &.mainUser {
      height: auto;
      overflow-y: auto;
    }
  }
  .slideDown {
    animation-name: slideDown;
  }
  .slideUp {
    animation-name: slideUp;
  }
</style>
<template>
  <div>
    <MHeader :class="{slideDown:!isScroll,slideUp:isScroll}" @click="aside"></MHeader>
    <div class="main-wrapper clearfix" :class="{mainLogin: isLogin, mainAside: !conditionState.aside, mainEdit: isEdit, mainUser: isUser}">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
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
        this.transitionName = toDepth < fromDepth ? 'fade-in' : 'fade-out';
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
