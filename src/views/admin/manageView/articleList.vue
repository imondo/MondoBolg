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
            <a href="javascript:;" class="wrap-img">
              <img class="img-blur-done" :src="article.picture!=undefined ? article.picture.url:'/static/9.jpg'" alt="">
              <span class="img-upload">
                  <input class="hidden" type="file" :id="index" name="file" :data="article.objectId" @change="processFile($event)">
                  <label class="upload-label" :for="index"></label>
                  <i class="el-icon-upload2"></i>
              </span>
            </a>
            <div class="content">
              <time>发布于 {{article.createdAt | formatDate}}</time>
              <h1>
                <router-link class="title" :to="{name:'article', params:{id: article.objectId}}">{{article.title}}</router-link>
              </h1>
              <div class="meta">
                <router-link :to="{name:'edit', params:{id: article.objectId}}">编辑</router-link>
                <el-button size="small" :data="article.objectId" @click="deleteArticle($event)">删除</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination-wrapper">
        <v-pagination @getArticle="setArticle" :count="count" :limit="limit"></v-pagination>
      </div>
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
            width: 80%;
            height: 0;
            margin-left: 10%;
            padding-bottom: 46%;
            overflow: hidden;
            transition: all .25s linear;
            -moz-transition: all .25s linear;
            -webkit-transition: all .25s linear;
            -o-transition: all .25s linear;
            img {
              width: 100%;
            }
            .img-upload {
              position: absolute;
              top: 0;
              display: inline-block;
              width: 100%;
              height: 100%;
              background-color: #FFFFFF;
              opacity: 0;
              line-height: 7;
              font-size: 18px;
              text-align: center;
              .el-icon-upload2 {
                position: absolute;
                top: 45%;
                left: 45%;
              }
              .upload-label {
                display: inline-block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                cursor: pointer;
              }
            }
            &:hover {
              .img-upload {
                opacity: .5;
                color: inherit;
              }
            }
          }
          .content {
            display: inline-block;
            font-size: .8em;
            height: 72px;
            margin-bottom: -3px;
            margin-left: 10%;
            overflow: hidden;
            position: relative;
            width: 80%;
            h1 {
              font-size: 16px;
              .title {
                display: inline-block;
                width: 160px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
            .meta {
              position: absolute;
              top: -3px;
              right: 0;
              background-color: #f7f7f7;
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
  import pagination from 'components/Pagination/pagination';
  import { mapGetters } from 'vuex';
  import { getArtcileList, delArticle } from 'api/article';
  import { uploadImg } from 'api/upload';
  const CODE = 200;
  export default {
    data() {
      return {
        articleList: [],
        count: 0,
        limit: 10
      };
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getList(10, 0);
      });
    },
    methods: {
      getList(limit, skip) {
        const vm = this;
        getArtcileList(limit, skip).then((response) => {
          if (response.status === CODE) {
            vm.articleList = response.data.results;
            this.$store.commit('SET_LIST', vm.articleList);
            vm.count = response.data.count;
          }
        });
      },
      deleteArticle(e) {
        let id = e.currentTarget.getAttribute('data');
        this.$confirm('确认删除吗？').then(() => {
          delArticle(id).then(() => {
            this.$message.success('删除成功');
            this.getList(10, 0);
          });
        });
      },
      processFile(e) {
        let id = e.currentTarget.getAttribute('data');
        uploadImg(e.target.files[0], id).then(() => {
          this.$message.success('上传成功');
          this.getList(10, 0);
        });
      },
      setArticle(index) {
        let skip = index * 10;
        this.getList(10, skip);
      }
    },
    components: {
      'v-pagination': pagination
    }
  };
</script>
