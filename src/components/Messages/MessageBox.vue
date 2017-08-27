<template>
    <el-dialog
            :value="value"
            :visible.sync="visible"
            size="tiny">
        <span slot="title" class="el-dialog__title">{{title}}</span>
        <span>{{contents}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="dialogYes">确 定</el-button>
        </span>
    </el-dialog>
</template>
<style lang="less">

</style>
<script type='text/ecmascript-6'>
   export default {
       name: 'MessageBox',
       props: {
           value: {
               type: Boolean,
               default: false
           },
           contents: {
               type: String
           },
           title: {
               type: String
           }

       },
       data() {
           return {
               visible: false
           };
       },
       methods: {
           dialogYes() {
               this.$emit('dialogCallBack');
           },
           cancel() {
               this.visible = false;
           }
       },
       watch: {
           value(val) {
               this.visible = val;
           },
           visible(val) {
               this.$emit('input', val);
           },
           mounted() {
               if (this.value) {
                   this.visible = true;
               }
           }
       }
   };
</script>
