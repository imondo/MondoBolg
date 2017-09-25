<template>
  <div class="article-wrapper" id="article-wrapper">
    <div class="article-info">
      <h1>
        <router-link class="title" :to="{name:'classify', params:{class: article.classify}}" v-cloak>{{article.title}}</router-link>
      </h1>
      <p class="info">
        <span v-cloak>发布于 {{article.createdAt | formatDate}}</span>
        <i>/</i>
        <span v-cloak>{{article.classify}}</span>
      </p>
    </div>
    <div class="content" v-html="articleHtmlData" v-cloak></div>
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
      a {
        color: #57a3f3;
      }
      blockquote{
        padding: 10px 20px;
        margin: 25px 0;
        background-color: #F3F3F3;
        border-left: 2px solid #009A61;
        word-break: break-word!important;
        word-break: break-all;
        line-height: 30px;
        p {
          line-height: 1.7;
          font-size: 16px;
        }
      }
      img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        border: 0;
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
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: #000000;
      }
      strong {
        padding-left: 3px;
        padding-right: 3px;
        color: #c7254e;
        background: #f9f2f4;
        font-weight: 100;
        font-size: 14px;
        font-family: Consolas,Menlo,Courier,monospace;
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { getArtcile } from 'api/article';
  import marked from 'utils/marked';
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
    beforeRouteEnter(to, from, next) {
      getArtcile(to.params.id).then((response) => {
        if (response.status === CODE) {
          next(vm => {
            vm.article = response.data;
            let htmlData = marked(vm.article.content);
            if (htmlData.indexOf('<hr>') < 0) {
              vm.articleHtmlData = '<hr>' + htmlData;
            } else {
              vm.articleHtmlData = htmlData;
            }
          });
        }
      });
    },
    updated() {
      var aTagArr = [].slice.apply(document.getElementsByTagName('a'));
      aTagArr.forEach(function (e, i) {
        e.href.indexOf('_blank') > -1 ? e.target = '_blank' : null;
      });
    }
  };
</script>
