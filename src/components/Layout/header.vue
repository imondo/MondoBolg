<style lang="less" rel="stylesheet/less">
  .header-wrapper {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #eeeeee;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    animation-duration: .5s;
    animation-fill-mode: both;
    transition: all .4s linear;
    &.headerAside {
      position: absolute;
      height: 100%;
    }
    .nav {
      position: relative;
      margin: 0 auto;
      width: 1024px;
      max-width: 100%;
      .log {
        font-size: 22px;
        color: #0b58a2;
        font-family: "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue", Calibri, Helvetica, Arial;
        width: auto;
        max-width: 50%;
        margin-left: 25px;
        text-decoration: none;
      }
      .nav-right {
        float: right;
        .right-item {
          .item {
            .icon-contaner {
              position: absolute;
              right: 0;
              top: 0;
              padding-right: 25px;
              z-index: 2;
              font-size: 14px;
              cursor: pointer;
            }
            .item-pc-input {
              position: absolute;
              right: 15px;
              top: 21px;
              display: inline-block;
              height: 30px;
              width: 400px;
              border: none;
              opacity: 0;
              z-index: -1;
              transition: .5s ease;
              &:hover {
                z-index: 1;
              }
              input {
                position: absolute;
                padding: 0 40px 0 18px;
                width: 100%;
                height: 30px;
                border: 1px solid #00a0e8;
                border-radius: 15px;
              }
            }
          }
        }
        .item {
          display: inline-block;
          padding-right: 25px;
          color: #686d76;
          font-size: 14px;
          transition: .5s ease;
          &:hover {
            color: #0a90ff;
          }
          &.search-pc {
            padding-left: 9px;
            &:hover {
              .item-pc-input {
                opacity: 1;
                z-index: 1;
              }
            }
          }
        }
        .item-icon {
          display: none;
          width: 80px;
          font-size: 24px;
          .icon-contaner {
            display: inline-block;
            &:last-child {
              float: right;
              margin-right: 25px;
            }
            .motion {
              transition: all .4s linear;
            }
            .close {
              color: red;
              transform:rotate(180deg);
            }
          }
        }
        .icon-item {
          position: absolute;
          z-index: 2;
          right: 0;
          top: 70px;
          width: 100%;
          transition: all .4s linear;
          transform: scale3d(1,1,1);
          &.hidden {
            transform: scale3d(1,0,1);
            background-color: #FFFFFF;
          }
          .item {
            display: block;
            width: 80%;
            margin: 0 auto;
            padding: 10px 0;
            line-height: initial;
            border-bottom: 1px solid #cccccc;
            &:last-child {
              border-bottom-color: #cccccc;
            }
            .icon-contaner {
              float: left;
              padding: 0 12px 0 9px;
              font-size: 14px;
            }
            .item-mobile-input {
              border: none;
              width: 85%;
              height: 23px;
            }
          }
        }
        .user {
          cursor: pointer;
        }
      }
    }
  }
</style>

<template>
  <div class="header-wrapper" :class="{headerAside:!conditionState.aside}">
    <div class="nav">
      <router-link :to="{name: 'index'}" class="log">Mondo</router-link>
      <div class="nav-right">
        <div class="right-item">
          <el-dropdown class="item user" v-if="isLogin">
            <span class="el-dropdown-link">
               <i class="el-icon-fa-user"></i> {{userInfo.username}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/admin/create" class="item">写文章</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/admin/user" class="item">我的主页</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="javascript:;" class="item" @click="logout">退出</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to="/archive" class="item">归档</router-link>
          <router-link to="/about" class="item">关于</router-link>
          <div class="item search-pc">
            <span class="icon-contaner">
              <i class="el-icon-fa-search"></i>
            </span>
            <span class="item-pc-input">
              <input type="text" placeholder="请输入关键字" v-model="searchParams" @keyup.enter="searchSubmit">
            </span>
          </div>
        </div>
        <div class="item-icon">
          <span class="icon-contaner" @click.stop="open">
            <i class="motion" :class="{'el-icon-fa-reorder': conditionState.aside, 'el-icon-fa-close': !conditionState.aside, close:!conditionState.aside}"></i>
          </span>
        </div>
        <div class="icon-item" :class="{hidden: conditionState.aside}">
          <router-link to="/admin/user" class="item" v-if="isLogin">我的主页</router-link>
          <router-link to="/admin" class="item">编辑文章</router-link>
          <router-link to="/archive" class="item">归档</router-link>
          <router-link to="/about" class="item">关于</router-link>
          <a href="javascript:;" v-if="isLogin" class="item" @click="logout">退出</a>
          <p class="item">
            <input type="text" class="item-mobile-input" placeholder="请输入关键字" v-model="searchParams" @keyup.enter="searchSubmit">
            <span class="icon-contaner">
              <i class="el-icon-fa-search"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Mheader',
    data() {
      return {
        searchParams: ''
      };
    },
    computed: {
      ...mapGetters([
        'conditionState',
        'userInfo'
      ]),
      isLogin() {
        return this.$store.getters.userInfo;
      }
    },
    methods: {
      open() {
        this.conditionState.aside = !this.conditionState.aside;
        this.$store.commit('SET_ASIDE', this.conditionState.aside);
      },
      searchSubmit() {
        this.$router.push({name: 'search', params: { class: this.searchParams }});
        this.searchParams = '';
      },
      logout() {
        this.$confirm('确认退出？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LoginOut').then(res => {
            if (res) {
              this.$message.success('退出成功');
              this.$router.push({name: 'index'});
            }
          });
        });
      }
    }
  };
</script>
