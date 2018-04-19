<template>
  <div class="article-wrapper" id="article-wrapper">
    <div class="article-info">
      <h1>
        <router-link class="title" :to="{name:'classify', params:{class: article.classify}}" v-cloak>{{article.title}}</router-link>
      </h1>
      <p class="info">
        <span v-cloak>发布于 {{article.updateAt | formatDate}}</span>
        <i>/</i>
        <span v-cloak>{{article.classify}}</span>
      </p>
    </div>
    <div ref="articleHtml" class="content-article" v-html="articleHtmlData" @click="showImages($event)" v-cloak></div>
    <mo-light-box v-model="isShow" @closeImg="closeImg" :src="imgSrc"></mo-light-box>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .article-wrapper {
    padding: 20px 40px;
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
      font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 12px;
      color: #999;
      padding-right: 5px;
      margin: 5px 0;
      i {
        padding: 0 2px;
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { getArtcile } from '~/api/article';
  import updatedMixins from '~/mixins/updated-mixins';
  import htmlMixins from '~/mixins/html-mixins';

  export default {
    mixins: [updatedMixins, htmlMixins],
    data: () => ({
      article: {
        title: null,
        classify: null,
        tags: null,
        updateAt: ''
      },
      articleHtmlData: null
    }),
    created() {
      getArtcile(this.$route.params.id).then((response) => {
        ({data: this.article} = response);
        let htmlData = this.$marked(this.article.content);
        if (htmlData.indexOf('<hr>') < 0) {
          this.articleHtmlData = '<hr>' + htmlData;
        } else {
          this.articleHtmlData = htmlData;
        }
        this.modifyImage('articleHtml');
      });
    }
  };
</script>
