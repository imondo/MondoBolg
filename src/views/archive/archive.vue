<template>
  <div class="archive-wrapper list-wrapper">
    <div v-for="(val, key) in articleList">
      <div class="common-title">{{key | timeConversion}}</div>
      <div class="post-lists">
        <ul>
          <li class="item" v-for="item in val">
            <router-link class="item-body" :to="{name:'article', params:{id: item.objectId}}">
              <p class="item-title">{{item.title}}</p>
              <p class="item-meta">
                <span class="item-meta-desc">发布于 <time>{{item.createdAt | formatDate}}</time></span>
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .archive-wrapper {
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
          width: 33.3333%;
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
            transition: .3s ease;
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
              bottom: 18px;
            }
          }
        }
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { getClassify } from 'api/article';
  import { dataConversion } from 'utils/index';
  const CODE = 200;
  export default {
    data() {
      return {
        articleList: null
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        getClassify().then((response) => {
          if (response.status === CODE) {
            vm.list = response.data.results;
            vm.articleList = dataConversion(vm.list);
          }
        });
      });
    }
  };
</script>
