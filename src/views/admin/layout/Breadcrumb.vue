<template>
    <div class="breadcrumb-wrapper">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="item.path">
                <span v-if='item.redirect==="noredirect"||index==breadcrumb.length-1' class="no-redirect">{{item.meta.nav}}</span>
                <router-link v-else to="item.path">{{item.meta.nav}}</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<style lang="less">
   .el-breadcrumb {
       line-height: 50px;
       padding-left: 20px;
   }
</style>
<script type='text/ecmascript-6'>
   export default {
       name: 'Breadcrumb',
       created() {
           this.getBreadcrumb();
       },
       data() {
           return {
               breadcrumb: null
           };
       },
       methods: {
           getBreadcrumb() {
               const vm = this;
               let matched = this.$route.matched.filter(item => item.meta.nav);
               const first = matched[0];
               if (first && (first.meta.nav !== '首页' || first.path !== '')) {
                   matched = [{ name: 'home', path: '/', meta: {nav: '首页'} }].concat(matched);
               }
               vm.breadcrumb = matched;
           }
       },
       watch: {
          $route() {
              this.getBreadcrumb();
          }
       }
   };
</script>
