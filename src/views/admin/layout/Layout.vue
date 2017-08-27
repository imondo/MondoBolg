<template>
  <div class="admin-wrapper">
    <el-row class="sidebar-row">
      <el-col :lg="3" :md="4" class="sidebar-warpper">
        <div class="grid-content bg-purple sidebar">
          <Sidebar/>
        </div>
      </el-col>
      <el-col :lg="21" :md="20" class="appmian-warpper">
        <div class="grid-content bg-purple-light">
          <Topbar></Topbar>
          <Breadcrumb></Breadcrumb>
          <App-main/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {AppMain, Sidebar, Topbar, Breadcrumb} from '../../../views/admin/layout';
  export default {
    name: 'layout',
    components: {
      AppMain,
      Sidebar,
      Topbar,
      Breadcrumb
    }
  };
</script>

<style lang="less">
  .admin-wrapper {
    height: 100%;
    .sidebar-row, .sidebar-warpper {
      height: 100%;
    }
    .sidebar-row {
      min-width: 987px;
    }
    .sidebar {
      height: 100%;
      background-color: #00A0E9;
    }
  }
</style>

