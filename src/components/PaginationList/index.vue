<template>
    <div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>
<style lang="less">

</style>
<script type='text/ecmascript-6'>
    export default {
        name: 'Pagination',
        props: {
            total: {
                type: Number
            },
            pageSizes: {
                type: Array
            }
        },
        data() {
            return {
                currentPage: 1
            };
        },
        computed: {
            pageSize() {
                return this.pageSizes[0];
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit("handleSizeChange",val);
            },
            handleCurrentChange(val) {
                this.$emit("handleCurrentChange",val);
            }
        }
    }
</script>
