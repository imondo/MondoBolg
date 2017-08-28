<template>
    <div class="user-wrapper">
        <div class="user-info">
          {{userInfo.username}}
        </div>
      <div class="trigger-menu">
        <ul>
          <li class="active">
            <a href="javascript:;">我的文章</a>
          </li>
        </ul>
      </div>
      <div class="list-container">
        <ul>
          <li v-for="article in articleList">
            <a href="#" class="wrap-img">
              <img class="img-blur-done" :src="article.picture!=undefined ? article.picture.url:'/static/9.jpg'" alt="">
            </a>
            <div class="content">
              <time>发布于 {{article.createdAt | formatDate}}</time>
              <h1>{{article.title}}</h1>
              <p v-html="markedContent(article.content)"></p>
              <div class="meta">
                <el-button size="small">编辑</el-button>
                <el-button size="small">删除</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<style lang="less">
  .user-wrapper {
    .trigger-menu {
      margin-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0;
      list-style: none;
      li {
        position: relative;
        display: inline-block;
        padding: 8px 0;
        margin-bottom: -1px;
        &.active {
           border-bottom: 2px solid #646464;
         }
        a {
          padding: 13px 20px;
          font-size: 15px;
          font-weight: 700;
          color: #969696;
          line-height: 25px;
        }
      }
    }
    .list-container {
      ul {
        li {
          position: relative;
          width: 100%;
          margin: 0 0 17px;
          padding: 0 2px 17px 0;
          border-bottom: 1px solid #f0f0f0;
          word-wrap: break-word;
          .wrap-img {
            position: absolute;
            top: 50%;
            margin-top: -68px;
            right: 0;
            width: 150px;
            height: 120px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
              border: 1px solid #f0f0f0;
            }
          }
          .content {
            padding-right: 160px;
            p {
              margin: 0 0 8px;
              font-size: 14px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex';
  import { getArtcileList } from 'api/article';
  import marked from 'marked';
  const CODE = 200;
  export default {
    data() {
      return {
        articleList: []
      };
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getList(0);
      });
    },
    methods: {
      getList(skip) {
        const vm = this;
        getArtcileList(skip).then((response) => {
          if (response.status === CODE) {
            vm.articleList = response.data.results;
            this.$store.commit('SET_LIST', vm.articleList);
          }
        });
      },
      markedContent(value) {
        value = marked(value);
        if (value.indexOf('<hr>') > -1) {
          if (value.length > 100) {
            value = value.substr(4, 100) + '...';
          }
        }
        return value;
      },
      setArticle(index) {
        let skip = index * 6;
        this.getList(skip);
      }
    }
  };
</script>
