<template>
  <div class="user-wrapper">
    <div class="user-info">
      <i class="el-icon-fa-blind"></i>
    </div>
    <div class="trigger-menu">
      <ul>
        <span class="active-trigger" :style="{'transform':'translate3d(' + triggerLight + ', 0, 0)'}"></span>
        <li :class="{active:index==nowIndex}" v-for="(item, index) in tabsParam"  @click="toggleTabs(index)">
          <a href="javascript:;">
            <i :class="item.icon"></i> {{item.name}}
          </a>
        </li>
      </ul>
    </div>
    <div class="list-container">
      <ul>
        <li v-show="nowIndex === 0">
          <ul>
            <li class="list hide-card" ref='article' v-for="(article, index) in articleList">
              <div class="thumb-container">
                <a href="javascript:;" class="wrap-img">
                  <img class="img-blur-done" v-lazy="article.image_url" alt="">
                  <span class="img-upload">
                  <input class="hidden" type="file" :id="index" name="file" :data-id="article.id" @change="processFile($event)">
                  <label class="upload-label" :for="index"></label>
                  <i class="el-icon-upload2"></i>
              </span>
                </a>
                <div class="content">
                  <time>发布于 {{article.updateAt | formatDate}}</time>
                  <h1>
                    <router-link class="title" :to="{name:'edit', params:{id: article.id}}">{{article.title}}</router-link>
                  </h1>
                  <div class="meta">
                    <span class="el-icon-fa-delete" :data="article.id" @click="deleteArticle($event)">删除</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="pagination-wrapper">
            <mo-pagination @getArticle="setArticle" :count="count" :limit="params.pageSize"></mo-pagination>
          </div>
        </li>
        <li v-show="nowIndex === 1">
          正在建设...
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .user-wrapper {
    .user-info {
      font-size: 16px;
      padding-left: 21px;
    }
    .trigger-menu {
      margin-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0;
      list-style: none;
      ul {
        position: relative;
      }
      li {
        position: relative;
        display: inline-block;
        padding: 8px 0;
        margin-bottom: -1px;
        &.active {
          a {
            color: #646464;
          }
        }
        a {
          padding: 13px 20px;
          font-size: 14px;
          font-weight: 700;
          color: #969696;
          line-height: 25px;
        }
      }
      .active-trigger {
        position: absolute;
        bottom: 0;
        left: 0;
        display: inline-block;
        width: 84.4px;
        height: 2px;
        background-color: #000;
        transform: translate3d(100%, 0, 0);
        transition: all 0.2s ease-in-out;
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
            img {
              width: 100%;
            }
            .img-upload {
              position: absolute;
              top: 0;
              display: inline-block;
              width: 100%;
              height: 100%;
              background-color: #f7f7f7;
              opacity: 0;
              line-height: 7;
              font-size: 18px;
              text-align: center;
              color: #00a0e8;
              transition: .5s ease;
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
                opacity: .7;
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
              span {
                cursor: pointer;
                &:hover {
                  color: red;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import getArticleMixins from '~/mixins/get-articles-mixins';
  import { mapGetters } from 'vuex';
  import { getArtcileList, delArticle, updateArtcile } from '~/api/article';
  import { uploadArticleImg } from '~/api/upload';
  import { conversionData } from '~/utils/index';
  import errimg from '~/assets/default.png';

  export default {
    mixins: [getArticleMixins],
    data: () => ({
      tabsParam: [
        {icon: 'el-icon-fa-folder', name: '文章'},
        {icon: 'el-icon-fa-tag', name: '标签'}
      ],
      nowIndex: 0,
      isMobile: false,
      errimg: errimg
    }),
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      triggerLight() {
        return 100 * this.nowIndex + '%';
      }
    },
    methods: {
      toggleTabs(index) {
        this.nowIndex = index;
      },
      deleteArticle(e) {
        let id = e.currentTarget.getAttribute('data');
        this.$confirm('确认删除吗？').then(() => {
          delArticle(id).then(() => {
            this.$message.success('删除成功');
            this.getList();
          });
        });
      },
      processFile(e) {
        let id = e.currentTarget.getAttribute('data-id');
        uploadArticleImg(e.target.files[0]).then(file => {
          updateArtcile({imageUrl: conversionData(file).url ,id}).then(res => {
            this.getList();
            this.$message.success('上传成功');
          })
        });
      }
    }
  };
</script>
