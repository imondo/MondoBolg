<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

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
      display: flex;
      justify-content: center;
      align-items: center;
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
