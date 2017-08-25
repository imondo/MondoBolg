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
      <div class="content" v-html="articleHtmlData"></div>
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
        padding: 20px;
        margin-bottom: 25px;
        background-color: #f7f7f7;
        border-left: 6px solid #b4b4b4;
        word-break: break-word!important;
        word-break: break-all;
        line-height: 30px;
        p {
          font-weight: 600;
          line-height: 1.7;
          font-size: 16px;
        }
      }
      pre {
        margin: 30px 0;
      }
      code {
        display: block;
        width: 100%;
        overflow-x: auto;
        padding: 10px;
        border-radius: 3px;
        background-color: #F3F3F3;
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
  import highlightjs from 'highlight.js';
  // 配置marked
  marked.setOptions({
    // 配置高亮
    highlight: function (code, lang, callback) {
      return highlightjs.highlightAuto(code).value;   // 这里highlightjs会自动给代码增加类
    }
  });
  const CODE = 200;
  export default {
    data() {
      return {
        article: {
          title: null,
          genre: null,
          tags: null,
          createdAt: ''
        },
        articleHtmlData: null
      };
    },
    created() {
      const vm = this;
      getArtcile(this.$route.params.id).then((response) => {
        if (response.status === CODE) {
          vm.article = response.data;
          let htmlData = marked(vm.article.content);
          this.articleHtmlData = htmlData;
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
