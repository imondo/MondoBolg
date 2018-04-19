<template>
    <div class="light-box" v-show="value" @click="closeImage">
        <div class="light-box-item">
            <img :src="src" />
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MoLightBox',
    props: {
      src: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeImage() {
        this.$emit('closeImg', false);
      }
    }

  }
</script>

<style lang="less" scoped>
    .light-box {
        position:fixed;
        top:0;
        left:0;
        background:rgba(0,0,0,0.7);
        z-index:99999;
        width:100%;
        height:100%;
        .light-box-item {
            display: flex;
            min-height: 100%;
            justify-content: center;
            align-items: center;
        }
        img {
            border:5px solid #fff
        }
    }
</style>