<template>
    <div class="classify-wrapper list-wrapper">
      <div class="common-title">分类 ：{{classIfy}}</div>
      <div class="post-lists">
        <ul>
          <li class="item" v-for="item in classList">
              <router-link class="item-body" :to="{name:'article', params:{id: item.objectId}}">
                <p class="item-title">{{item.title}}</p>
                <p class="item-meta">
                  发布于 <time>{{item.createdAt | formatDate}}</time>
                </p>
              </router-link>
          </li>
        </ul>
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
            display: inline-block;
            width: 100%;
            height: 100px;
            padding: 15px;
            background-color: #ffffff;
            border-radius: 3px;
            transition-duration: .5s;
            -webkit-transition-duration: .5s;
            -webkit-box-shadow: 0 1px 5px rgba(0,0,0,.07);
            box-shadow: 0 1px 4px rgba(0,0,0,.04);
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
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
<script type='text/ecmascript-6'>
  import { getClassify } from '../../api/article';
  const CODE = 200;
  export default {
    data() {
      return {
        classIfy: '',
        classList: []
      };
    },
    created() {
      const vm = this;
      vm.classIfy = this.$route.params.class;
      let obj = {
        classIfy: vm.classIfy
      };
      let params = {
        where: JSON.stringify(obj)
      };
      getClassify(params).then((response) => {
        if (response.status === CODE) {
          vm.classList = response.data.results;
        }
      });
    }
  };
</script>
