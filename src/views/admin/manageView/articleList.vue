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
        <li class="list hide-card" ref='article' v-for="(article, index) in articleList">
          <div class="thumb-container">
            <a href="javascript:;" class="wrap-img" :data="article.objectId" @click="upload($event)">
              <img class="img-blur-done" :src="article.picture!=undefined ? article.picture.url:'/static/9.jpg'" alt="">
              <span class="img-upload">
                  <i class="el-icon-upload2"></i>
                </span>
            </a>
            <div class="content">
              <time>发布于 {{article.createdAt | formatDate}}</time>
              <h1>
                <router-link :to="{name:'article', params:{id: article.objectId}}">{{article.title | formatDate(10)}}</router-link>
              </h1>
              <div class="meta">
                <el-button size="small" :data="article.objectId" @click="editArticle($event)">编辑</el-button>
                <el-button size="small" :data="article.objectId" @click="deleteArticle($event)">删除</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
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
        .list {
          position: relative;
          float: left;
          width: 33.3333%;
          .thumb-container {
            overflow: hidden;
            padding: 0;
          }
          .wrap-img {
            position: relative;
            display: inline-block;
            height: 100px;
            margin-left: 10%;
            width: 80%;
            transition: all .25s linear;
            -moz-transition: all .25s linear;
            -webkit-transition: all .25s linear;
            -o-transition: all .25s linear;
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
              border: 1px solid #f0f0f0;
            }
            .img-upload {
              position: absolute;
              top: 0;
              display: inline-block;
              width: 100%;
              height: 100%;
              background-color: #FFFFFF;
              opacity: 0;
              line-height: 5;
              font-size: 18px;
              text-align: center;
            }
            &:hover {
              .img-upload {
                opacity: .5;
                color: inherit;
              }
            }
          }
          .content {
            background: rgba(255,255,255,0.9);
            display: inline-block;
            font-size: .8em;
            height: 72px;
            margin-bottom: -3px;
            overflow: hidden;
            padding: 0 29px;
            position: relative;
            width: 297px;
            h1 {
              font-size: 16px;
              overflow: hidden;
              a {
                white-space:nowrap;
              }
            }
            .meta {
              position: absolute;
              top: 19px;
              right: 19px;
              background-color: #FFFFFF;
              font-size: 12px;
              button {
                border: none;
                margin-left: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex';
  import { getArtcileList, delArticle } from 'api/article';
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
      setArticle(index) {
        let skip = index * 6;
        this.getList(skip);
      },
      editArticle(e) {
        let id = e.currentTarget.getAttribute('data');
        console.log(id);
      },
      deleteArticle(e) {
        let id = e.currentTarget.getAttribute('data');
        delArticle(id).then(() => {
          this.$message.success('删除成功');
          this.getList(0);
        });
      },
      upload(e) {
        let id = e.currentTarget.getAttribute('data');
        console.log(id);
      }
    }
  };
</script>
