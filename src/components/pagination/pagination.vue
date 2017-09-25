<template>
  <div class="pagination-wrapper clearfix">
    <ul v-show="pages > 1">
      <li class="prev">
        <a v-show="current != 1" @click="current-- && goto(current)">←</a>
      </li>
      <li v-for="index in pages">
        <a @click="goto(index)" :class="{'active':current == index}">{{index}}</a>
      </li>
      <li class="next">
        <a v-show="pages !=0 && pages != current" @click="current++ && goto(current)">→</a>
      </li>
    </ul>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  .pagination-wrapper {
    width: 100%;
    font-size: 16px;
    ul {
      text-align: center;
      li {
        display: inline-block;
        a {
          padding: 5px;
          cursor: pointer;
          &:hover {
              background-color: #f7f7f7;
          }
          &.active {
            color: #0a90ff;
          }
        }
      }
    }
  }
</style>

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
    methods: {
      goto(index) {
          document.body.scrollTop = 0;
          this.current = index;
          let num = index - 1;
          this.$emit('getArticle', num);
      }
    }
  };
</script>
