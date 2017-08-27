<template>
    <section class="app-main">
        <div class="main-wrapper">
            <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'AppMain'
    };
</script>

<style lang="less">
   section {
       min-height: 100%;
       margin: 0 10px;
       background-color: #FFFFFF;
       .main-wrapper {
           padding: 15px;
       }
   }
</style>
