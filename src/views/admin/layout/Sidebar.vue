<template>
    <div class="sidebar">
        <el-row class="tac">
            <el-col class="sidebar-tac">
                <el-menu :default-active="$route.path" :router="true" :unique-opened="true"  class="el-menu el-menu-vertical-demo el-menu--dark" @open="handleOpen" @close="handleClose">
                    <el-menu-item index="/home/index"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i>管理</template>
                        <el-menu-item index="/manage/article">
                            <i class="el-icon-document"></i>
                            <router-link :to="{path:'/manage/article'}">文章管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="/manage/roles">
                            <i class="el-icon-menu"></i>
                            <router-link :to="{path:'/manage/roles'}">角色管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="/manage/users">
                            <i class="el-icon-menu"></i>
                            <router-link :to="{path:'/manage/users'}">用户管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="/manage/write">
                            <i class="el-icon-edit"></i>
                            <router-link :to="{path:'/manage/write'}">撰写文章</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>演示</template>
                        <el-menu-item index="/demo/table">Table</el-menu-item>
                        <el-menu-item index="/demo/message">Message</el-menu-item>
                    </el-submenu>
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
