<template>
    <div class="tags-wrapper">
        <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                :closable="true"
                :close-transition="false"
                @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="mini"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>
<style lang="less">

</style>
<script type='text/ecmascript-6'>
   export default {
       name: 'Tag',
       data() {
           return {
               dynamicTags: [],
               inputVisible: false,
               inputValue: ''
           };
       },
       methods: {
           handleClose(tag) {
               this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
           },

           showInput() {
               this.inputVisible = true;
               this.$nextTick(_ => {
                   this.$refs.saveTagInput.$refs.input.focus();
               });
           },

           handleInputConfirm() {
               let inputValue = this.inputValue;
               if (inputValue) {
                   this.dynamicTags.push(inputValue);
               }
               this.$store.commit("SET_TAGS",this.dynamicTags);
               this.inputVisible = false;
               this.inputValue = '';
           }
       }
   }

</script>
