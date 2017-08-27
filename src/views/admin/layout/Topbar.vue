<template>
    <div class="topbar-warpper">
        <div class="topbar">
            <a href="javascript:;" class="user-info">
                <i class="el-icon-star-on"></i>{{userInfo.username}}</a>
            <a href="javascript:;" class="user-logout" @click="logOut">
                <i class="el-icon-circle-cross"></i>
                退出
            </a>
            <MessageBox @dialogCallBack="logOutBack" v-model="dialogVisible" title="提示" contents="你确定退出吗?"></MessageBox>
        </div>
    </div>
</template>
<style lang="less">
    .topbar-warpper {
        height: 50px;
        line-height: 50px;
        background-color: #EEF1F6;
    }
    .topbar {
        float: right;
        padding-right: 15px;
        color: #96a3b5;
        font-size: 14px;
        i {
            padding: 0 2px;
        }
        a {
            padding-right: 15px;
            &:hover {
                color: #00a0e8;
            }
        }
    }
</style>
<script type='text/ecmascript-6'>
    import { mapGetters } from 'vuex';
    import MessageBox from '../../../components/Messages/MessageBox';
//    import { loginOut } from '../../../api/login';
    export default {
        name: 'Topbar',
        data() {
            return {
                dialogVisible: false
            };
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            logOut() {
                this.dialogVisible = true;
            },
            logOutBack() {
                const vm = this;
                this.$store.dispatch('LoginOut').then(function () {
                    vm.dialogVisible = false;
                    location.reload();
                });
            }
        },
        components: {
          'MessageBox': MessageBox
        }
    };
</script>
