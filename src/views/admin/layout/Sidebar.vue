<template>
    <div class="sidebar">
        <el-row class="tac">
            <el-col class="sidebar-tac">
                <el-menu :default-active="$route.path" :router="true" :unique-opened="true"  class="el-menu el-menu-vertical-demo el-menu--dark" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="/admin/articleList"><i class="el-icon-menu"></i>文章列表</el-menu-item>
                    <el-menu-item index="/admin/edit"><i class="el-icon-menu"></i>发布文章</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less">
    .sidebar-tac {
        margin-top: 50px;
        .index-icon {
            margin-right: 5px;
        }
        .el-menu{
            overflow: hidden;
        }
    }
</style>
<script type='text/ecmascript-6'>
   export default {
       name: 'Sidebar',
       data() {
           return {
               isCollapse: true
           };
       },
       methods: {
           handleOpen(key, keyPath) {
               console.log(key, keyPath);
           },
           handleClose(key, keyPath) {
               console.log(key, keyPath);
           }
       }
   };
</script>
