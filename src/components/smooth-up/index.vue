<style lang="less" rel="stylesheet/less" scope>
  .smooth-up {
    background-color: #fff;
    opacity: 0;
    position: fixed;
    right: 32px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    z-index: 5;
    &.show-up {
      opacity: 1;
    }
    &:hover {
      background-color: #ececec;
    }
    i {
      color: #414d5b;
      display: block;
      line-height: 38px;
      text-align: center;
      font-size: 18px;
    }
  }
</style>
<template>
  <div class="smooth-up" :class="{'show-up': showUp}" @click.stop="smoothUp">
    <i class="el-icon-caret-top"></i>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default {
    name: 'SmoothUp',
    data: () => ({
      offsetTop: 0,
    }),
    mounted() {
      window.addEventListener('scroll', this.scrollMethod);
    },
    computed: {
      showUp() {
        return this.offsetTop > 300;
      }
    },
    methods: {
      smoothUp() {
        let gotoTop = () => {
          let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
          currentPosition -= 800;
          if (currentPosition > 0) {
            window.scrollTo(0, currentPosition);
          } else {
            window.scrollTo(0, 0);
            clearInterval(timer);
            timer = null;
          }
        }
        let timer = setInterval(gotoTop, 1);
      },
      scrollMethod() {
        this.offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
      }
    }
  }
</script>

