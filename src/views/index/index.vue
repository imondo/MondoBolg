<template>
    <div class="home list-wrapper">
      <div class="post-lists">
        <div class="post-list-body clearfix">
          <div class="post-list-item" v-for="article in articleList">
            <div class="post-list-item-container">
              <div class="item-thumb" :style="{'background-image': 'url('+article.picture.url+')'}"></div>
              <router-link :to="{name:'article', params:{id: article.objectId}}">
                <div class="item-desc" v-html="markedContent(article.content)"></div>
                <div class="bg-deepgrey"></div>
              </router-link>
              <div class="item-slant reverse-slant"></div>
              <div class="item-slant"></div>
              <div class="item-label">
                <div class="item-title">
                  <router-link class="title" :to="{name:'article', params:{id: article.objectId}}">{{article.title}}</router-link>
                </div>
                <div class="item-meta">
                  <div class="item-meta-icon"></div>
                  <div class="item-meta-cat">
                    <router-link class="title" :to="{name:'classify', params:{class: article.classify}}">{{article.classify}}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination-wrapper">
          <v-pagination @getArticle="setArticle" :count="count"></v-pagination>
        </div>
      </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
  .home {
    .post-list-body {
      display: block;
    }
    .post-list-item {
      float: left;
      width: 33.3333%;
      height: auto;
      padding: 15px;
      align-items: center;
      .post-list-item-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        padding: 0;
        border-radius: 3px;
        background-color: #ffffff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
        transition: .5s ease;
        &:hover {
          box-shadow: 0px 0px 15px rgba(0,0,0,.5);
          .item-thumb{
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            transform: scale(1.1);
            -webkit-filter: blur(3px);
            -moz-filter: blur(3px);
            filter: blur(3px);
          }
          .item-desc {
            -webkit-animation: fade-in .5s;
            animation: fade-in;
            animation-duration: .5s;
            opacity: 1;
            color: #fbfdff;
          }
          .bg-deepgrey {
            opacity: 0.2;
            height: 100%;
          }
        }
        .item-thumb {
          position: relative;
          display: inherit;
          min-height: 250px;
          background-position: 50% 50%;
          background-size: cover;
          background-image: url("../../assets/9.jpg");
          transition: transform .5s ease,filter .5s ease;
        }
        .item-desc {
          font-size: 14px;
          position: absolute;
          top: 20%;
          overflow: hidden;
          height: 80px;
          padding: 0 30px;
          word-break:break-all; /*支持IE，chrome，FF不支持*/
          word-wrap:break-word;/*支持IE，chrome，FF*/
          opacity: 0;
          z-index: 1;
          color: #ffffff;
          text-overflow: ellipsis;
          line-height: 1.5;
        }
        .bg-deepgrey {
          background-color: #000000;
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 0%;
          top: 0;
          left: 0;
        }
        .item-slant {
          position: absolute;
          z-index: 0;
          right: 0;
          bottom: 77px;
          left: 0;
          width: 110%;
          min-height: 76px;
          transform: rotate(7deg) translate(-10px,0);
          background-color: #ffffff;
        }
        .reverse-slant {
          transform: rotate(-10deg) translate(10px, -10px);
          opacity: 0.7;
          box-shadow: none;
          background-color: rgba(0,0,0,.7);
        }
        .item-label {
          position: relative;
          padding: 10px 20px 40px;
          height: 120px;
          background-color: #ffffff;
          .item-title {
            a {
              font-size: 16px;
              line-height: 17px;
              word-break: break-all;
              color: #313131;
            }
          }
        }
        .item-meta {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          padding: 0 15px 15px;
          text-align: right;
          .item-meta-icon {
            display: inline-block;
            float: right;
            width: 42px;
            height: 42px;
            border: 1px solid #eeeeee;
            border-radius: 50px;
            background: url("../../assets/17.jpg") no-repeat;
            background-position: center;
          }
          .item-meta-cat {
            a {
              position: relative;
              float: right;
              margin-right: 10px;
              padding: 10px 0;
              text-align: right;
              text-transform: none;
              color: #5f5f5f;
              font-size: 13px;
            }
          }
        }
      }
    }
  }

</style>
<script type='text/ecmascript-6'>
  import pagination from '../../components/pagination/pagination';
  import { getArtcileList } from '../../api/article';
  import marked from 'marked';
  const CODE = 200;
  export default {
    props: {
      isB: true
    },
    data() {
      return {
        articleList: [],
        count: 0
      };
    },
    created() {
      this.getList(0);
    },
    methods: {
      getList(skip) {
        const vm = this;
        getArtcileList(skip).then((response) => {
          if (response.status === CODE) {
            vm.articleList = response.data.results;
            vm.count = response.data.count;
          }
        });
      },
      markedContent(value) {
        let _content = value;
        marked(_content, function (err, content) {
          if (!err) {
            _content = content;
          }
        });
        if (_content.indexOf('<hr>') > -1) {
            _content = _content.substr(4, 100);
        }
        return _content;
      },
      setArticle(index) {
          let skip = index * 6;
          this.getList(skip);
      }
    },
    components: {
       'v-pagination': pagination
    }
  };
</script>
