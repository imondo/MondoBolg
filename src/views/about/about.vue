<template>
    <div>
      <div class="list-wrapper">
        <div class="user-info">
          <div class="profile-header clearfix">
            <div class="avatar-wrapper">
              <div class="avatar">
                <img src="/static/avatar.png" alt="">
              </div>
            </div>
            <div class="vcard-names-container clearfix">
              <h3>Mondo</h3>
              <ul>
                <li><router-link to="/admin/aboutCreate" v-if="isLogin"><i class="el-icon-fa-edit"></i></router-link></li>
                <li><a href="https://github.com/one-pupil" target="_blank"><i class="el-icon-fa-github"></i></a></li>
                <li><a href="mailto:imondo@qq.com" target="_blank"><i class="el-icon-fa-send"></i></a></li>
              </ul>
            </div>
          </div>
          <div class="user-profile">
            <p>生活已然尽兴，何必畏首畏尾。</p>
          </div>
        </div>
        <div class="info-wrapper" v-html="htmlData"></div>
      </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
  .user-info {
    margin-bottom: 15px;
    font-size: 16px;
    i {
      font-size: 20px;
      vertical-align: middle;
    }
    .profile-header {
      margin-bottom: 15px;
      .avatar-wrapper {
        float: left;
        .avatar {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .vcard-names-container {
        position: relative;
        float: left;
        width: 100px;
        height: 100px;
        ul {
          li {
            float: left;
            a {
              padding: 0 5px;
            }
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
    .user-profile {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px #e1e4e8 solid;
      p {
        font-size: 14px;
        color: #6a737d;
      }
    }
  }
  .info-wrapper {
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
      margin-bottom: 25px;
      background-color: #f7f7f7;
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
  }
</style>
<script type='text/ecmascript-6'>
 import { getAbout } from 'api/about';
 import marked from 'utils/marked';
 const CODE = 200;
 export default {
   data() {
     return {
       htmlData: null
     };
   },
   computed: {
     isLogin() {
       return this.$store.getters.userInfo;
     }
   },
   beforeRouteEnter(to, from, next) {
     next(vm => {
       vm.getData();
     });
   },
   updated() {
     var aTagArr = [].slice.apply(document.getElementsByTagName('a'));
     aTagArr.forEach(function (e, i) {
       e.href.indexOf('_blank') > -1 ? e.target = '_blank' : null;
     });
   },
   methods: {
     getData() {
       getAbout().then((response) => {
         if (response.status === CODE) {
           this.htmlData = marked(response.data.results[0].content);
         }
       });
     }
   }
 };
</script>
