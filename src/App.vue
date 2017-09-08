<template>
  <div id="app">
    <v-header :class="{slideDown:!isScroll,slideUp:isScroll}" @click="aside"></v-header>
    <div class="main-wrapper clearfix" :class="{mainLogin: isLogin, mainAside: !conditionState.aside, mainEdit: isEdit, mainUser: isUser}">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import header from 'views/header/header';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        isScroll: false,
        scroll: '',
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
        this.isEdit = this.$route.meta.isRoute;
        this.isLogin = this.$route.meta.isLogin;
        if (to.path.indexOf('/user') > -1) {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
      },
      'scroll' (newVal, oldVal) {
        if (newVal < oldVal) {
          this.isScroll = false;
        }
      }
    },
    components: {
      'v-header': header
    }
  };
</script>

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
