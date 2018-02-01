<style lang="less" rel="stylesheet/less">
  .pagination-wrapper {
    width: 100%;
    font-size: 16px;
    padding: 15px;
    ul {
      text-align: center;
      li {
        display: inline-block;
        a {
          position: relative;
          display: inline-block;
          transition: background .3s;
          padding: 0 10px;
          margin: 0 5px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          background-color: #ccc;
          color: #fff;
          cursor: pointer;
          transform: skewX(-20deg);
          &:hover {
            background-color: #1abc9c;
          }
          &.active {
            background-color: #0b58a2;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="pagination-wrapper clearfix" ref="pagination">
    <ul v-show="pages > 1">
      <li class="prev">
        <a v-show="current != 1" @click="current-- && goto(current)">« Prev</a>
      </li>
      <li v-for="index in pages">
        <a @click="goto(index)" :class="{'active':current == index}">{{index}}</a>
      </li>
      <li class="next">
        <a v-show="pages !=0 && pages != current" @click="current++ && goto(current)">Next »</a>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: ['count', 'limit'],
    data() {
        return {
          current: 1
        };
    },
    computed: {
      pages() {
          return Math.ceil(this.count / this.limit);
      }
    },
    mounted() {

    },
    methods: {
      goto(index) {
        this.current = index;
        let num = index - 1;
        this.$emit('getArticle', num);
        this.smoothUp();
      },
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
        };
        let timer = setInterval(gotoTop, 1);
      }
    }
  };
</script>
