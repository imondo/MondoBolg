<template>
  <div class="classify-wrapper list-wrapper">
    <div class="common-title"><span>{{classRoute}}</span> ：{{classIfy}}</div>
    <div class="post-lists">
      <ul>
        <li class="item" v-for="item in classList">
          <router-link class="item-body" :to="{name:'article', params:{id: item.objectId}}">
            <p class="item-title">{{item.title}}</p>
            <p class="item-meta">
              <span class="item-meta-desc">发布于 <time>{{item.createdAt | formatDate}}</time></span>
              <span class="item-meta-icon" :data-icon="item.classify"></span>
            </p>
          </router-link>
        </li>
      </ul>
      <h3 v-if="isSearch && classList.length == 0">抱歉，还没有相关文章.</h3>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .classify-wrapper {
    .common-title {
      font-size: 14px;
      position: relative;
      margin: 10px auto;
      padding: 0 30px;
      color: #5f5f5f;
      &:before {
        position: absolute;
        top: 0;
        left: -15px;
        padding: 0 30px;
        content: '#';
        color: #6fa3ef;
      }
    }
    .post-lists {
      ul {
        li {
          display: inline-block;
          width: 49.9999%;
          padding: 15px;
          overflow: hidden;
          .item-body {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 100px;
            padding: 15px;
            background-color: #ffffff;
            border-radius: 3px;
            color: #5f5f5f;
            transition-duration: .5s;
            -webkit-transition-duration: .5s;
            -webkit-box-shadow: 0 2px 5px rgba(0,0,0,.07);
            box-shadow: 0 2px 5px rgba(0,0,0,.07);
            &:hover {
              -webkit-box-shadow: 2px 2px 4px rgba(0,0,0,.1);
              box-shadow: 2px 2px 10px rgba(0,0,0,.2);
              -webkit-transform: scale(1.03);
              transform: scale(1.03);
            }
            .item-title {
              font-size: 15px;
            }
            .item-meta {
              position: absolute;
              bottom: 0;
              width: 100%;
              padding-right: 28px;
              text-align: right;
              .item-meta-desc {
                line-height: 41px;
                float: left;
              }
              .item-meta-icon {
                display: inline-block;
                width: 42px;
                height: 42px;
                border: 1px solid #eeeeee;
                border-radius: 50px;
                background: url("../../assets/bg-ico.png") no-repeat;
                background-size: 42px auto;
                background-position: 0 0;
                &[data-icon='生活'] {
                  background-position: 0 -338px;
                }
                &[data-icon='笔记'] {
                  background-position: 0 0;
                }
                &[data-icon='工作'] {
                  background-position: 0 -167px;
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
  import { getClassify } from 'api/article';
  const CODE = 200;
  export default {
    data() {
      return {
        classRoute: '',
        classIfy: '',
        classList: [],
        isSearch: false
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.setClass();
      });
    },
    methods: {
      setClass() {
        let obj = {};
        let params = {
          where: obj
        };
        const vm = this;
        vm.isSearch = this.$route.meta.isSearch;
        vm.classIfy = this.$route.params.class;
        vm.classRoute = this.$route.meta.className;
        if (this.$route.meta.isSearch) {
          obj['title'] = {'$regex': vm.classIfy, '$options': 'i'};
        } else {
          obj['classify'] = vm.classIfy;
        }
        getClassify(params).then((response) => {
          if (response.status === CODE) {
            vm.classList = response.data.results;
          }
        });
      }
    },
    watch: {
      '$route': function () {
        const vm = this;
        vm.setClass();
      }
    }
  };
</script>
