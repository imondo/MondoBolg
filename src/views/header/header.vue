<template>
  <div class="header-wrapper">
    <div class="nav">
      <router-link to="/index" class="log">Mondo</router-link>
      <div class="nav-right">
        <div class="right-item">
          <router-link to="/archive" class="item">归档</router-link>
          <router-link to="/about" class="item">关于</router-link>
        </div>
        <div class="item-icon">
          <span class="icon-contaner">
            <Icon type="android-search"></Icon>
          </span>
          <span class="icon-contaner" @click.stop="open">
            <Icon :type="conditionState.aside?'android-menu':'android-close'" class="motion" :class="{close:!conditionState.aside}"></Icon>
          </span>
        </div>
        <div class="icon-item" :class="{hidden: conditionState.aside}">
          <router-link to="/archive" class="item">归档</router-link>
          <router-link to="/about" class="item">关于</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .header-wrapper {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #eeeeee;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    .nav {
      margin: 0 auto;
      width: 1024px;
      max-width: 100%;
      .log {
        font-size: 22px;
        color: #0b58a2;
        font-family: "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue", Calibri, Helvetica, Arial;
        width: auto;
        max-width: 50%;
        margin-left: 25px;
        text-decoration: none;
      }
      .nav-right {
        float: right;
        .item {
          display: inline-block;
          padding-right: 15px;
          color: #686d76;
          font-size: 14px;
          &:hover {
            color: #0a90ff;
          }
        }
        .item-icon {
          display: none;
          width: 80px;
          font-size: 24px;
          .icon-contaner {
            display: inline-block;
            &:last-child {
              float: right;
              margin-right: 25px;
            }
            .motion {
              transition: all .4s;
              -moz-transition: all .4s;
              -webkit-transition: all .4s;
              -o-transition: all .4s;
            }
            .close {
              color: red;
              transform:rotate(360deg);
              -ms-transform:rotate(360deg); /* Internet Explorer */
              -moz-transform:rotate(360deg); /* Firefox */
              -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
              -o-transform:rotate(360deg); /* Opera */
            }
          }
        }
        .icon-item {
          position: absolute;
          z-index: 2;
          right: 6px;
          top: 65px;
          background-color: #FFFFFF;
          border: 1px solid #eeeeee;
          box-shadow: 0 1px 5px rgba(0, 0, 0 ,0.5);
          transition: all .7s;
          -moz-transition: all .7s;
          -webkit-transition: all .7s;
          -o-transition: all .7s;
          transform: translate(-5px,0);
          &.hidden {
            transform: translate(85px,0);
          }
          .item {
            display: block;
            padding: 10px;
            line-height: 14px;
            text-align: center;
            &:not(:last-child) {
              border-bottom: 1px solid #eeeeee;
            }
          }
        }
      }
    }
  }
</style>

<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'conditionState'
      ])
    },
    methods: {
      open() {
        this.conditionState.aside = !this.conditionState.aside;
        this.$store.commit('SET_ASIDE', this.conditionState.aside);
      }
    }
  };
</script>
