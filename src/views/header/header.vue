<template>
  <div class="header-wrapper">
    <div class="nav">
      <router-link to="/index" class="log">Mondo</router-link>
      <div class="nav-right">
        <div class="right-item">
          <router-link to="/classify" class="item">归档</router-link>
          <router-link to="/about" class="item">关于</router-link>
        </div>
        <div class="item-icon">
          <span class="icon-contaner">
            <!--<mu-icon value="search"/>-->
            <Icon type="android-search"></Icon>
          </span>
          <span class="icon-contaner" @click="setIocn">
            <!--<mu-icon value="menu"/>-->
            <Icon type="android-menu"></Icon>
          </span>
        </div>
        <div class="icon-item" :class="{hidden: isHidden}">
          <router-link to="/classify" class="item" @click="setIocn">Classify</router-link>
          <router-link to="/about" class="item" @click="setIocn">About</router-link>
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
          width: 58px;
          position: relative;
          padding-right: 15px;
          .icon-contaner {
            display: inline-block;
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
          .item {
            display: block;
            padding: 0 10px;
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
  export default {
    data() {
      return {
        isHidden: true
      };
    },
    methods: {
      setIocn: function () {
        this.isHidden = !this.isHidden;
      }
    }
  };
</script>
