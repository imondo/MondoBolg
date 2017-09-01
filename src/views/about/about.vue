<template xmlns="http://www.w3.org/1999/html">
    <div>
      <div class="list-wrapper">
        <div class="info">
          <p>生活已然尽兴，何必畏首畏尾。
            <a href="https://github.com/one-pupil" target="_blank"><Icon type="social-github"></Icon></a>
          </p>
        </div>
        <div class="info-wrapper" v-html="htmlData"></div>
      </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
  .info {
    margin-bottom: 15px;
    font-size: 16px;
    i {
      font-size: 20px;
      vertical-align: middle;
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
