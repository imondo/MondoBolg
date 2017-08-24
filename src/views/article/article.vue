<template>
  <div>
    <div class="article-wrapper">
      <div class="article-info">
        <h1>
          <router-link class="title" :to="{name:'classify', params:{class: article.classify}}">{{article.title}}</router-link>
        </h1>
        <p class="info">
          <span>发布于 {{article.createdAt | formatDate}}</span>
          <i>/</i>
          <span>{{article.classify}}</span>
        </p>
      </div>
      <div class="content" v-html="getContent"></div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .article-wrapper {
    max-width: 700px;
    padding: 20px 10px;
    margin: 0 auto;
    h1 {
      font-size: 21px;
    }
    .title {
      color: #000;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom:-1px;
        left: 0;
        background-color: #000;
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.2s ease-in-out;
      }
      &:hover::before {
        visibility: visible;
        transform: scaleX(1);
      }
    }
    .info {
      font-size: 12px;
      color: #5f5f5f;
      padding-right: 5px;
      margin: 5px 0;
      i {
        padding: 0 2px;
      }
    }
    .content {
      font-size: 14px;
      hr {
        display: block;
        margin: 15px 0;
        background-color: #e0e0e0;
        border: 0;
        height: 1px;
      }
      blockquote{
        border-left:3px solid green;
        margin: 10px 0;
        padding: 5px 10px;
        background-color: #ccc;
      }
      code {
        display: block;
        padding: 10px;
        border: 1px solid #cccccc;
        border-radius: 3px;
        background: #f6f6f6;
        color: #333333;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
      h1, h2, h3, h4, h5 {
        margin: 20px 0;
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { getArtcile } from '../../api/article';
  import marked from 'marked';
  const CODE = 200;
  export default {
    data() {
      return {
        article: {
          title: null,
          genre: null,
          tags: null,
          createdAt: ''
        }
      };
    },
    created() {
      const vm = this;
      getArtcile(this.$route.params.id).then((response) => {
        if (response.status === CODE) {
          vm.article = response.data;
        }
      });
    },
    computed: {
      getContent() {
        const vm = this;
        let _content = vm.article.content;
        marked(_content, function (err, content) {
          if (!err) {
            _content = content;
          }
        });
        return _content;
      }
    }
  };
</script>
