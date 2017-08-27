<template>
    <div>
        <div class="topbar-wrapper">
            <el-button
                    size="small"
                    type="danger"
                    @click="batchDelete">批量删除
            </el-button>
        </div>
        <div class="table-wrapper">
            <el-table
                    :data="list"
                    @selection-change="selectAll"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        type="selection"
                        width="55" align="center">
                </el-table-column>
                <el-table-column
                        label="日期" align="center">
                    <template scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.createdAt | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="图片" align="center">
                    <template scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <el-col class="image-popover">
                                <img :src="scope.row.picture !=undefined?scope.row.picture.url:''" alt="image" class="image">
                            </el-col>
                            <div slot="reference" class="name-wrapper">
                                <span v-if="scope.row.picture != undefined" class="upload-success">已上传</span>
                                <span v-else class="upload-error">未上传</span>
                                <el-button type="primary" class="upload" size="mini" @click="openDialog(scope.row)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                        label="标题" align="center">
                    <template scope="scope">
                        <el-input v-show="scope.row.edit" v-model="scope.row.title"></el-input>
                        <el-popover trigger="hover" placement="top" v-show="!scope.row.edit">
                            <p>标签: <span v-for="item in scope.row.tags">{{item}}</span></p>
                            <p>分类: {{ scope.row.classify }}</p>
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.title }}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button
                                v-show="!scope.row.edit"
                                type="primary"
                                size="small"
                                @click='handleEdit(scope.$index, scope.row)' icon="edit">编辑</el-button>
                        <el-button
                                class="edit-btn"
                                v-show="scope.row.edit"
                                type="success"
                                size="small"
                                @click="handleEditSave(scope.$index, scope.row)" icon="check">完成</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer-wrapper">
            <Pagination
                    :total="articleList.count"
                    :pageSizes = "articleList.pageSizes"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange">
            </Pagination>
        </div>
        <el-dialog title="上传" :visible.sync="isDialog">
            <el-upload
                    class="avatar-uploader"
                    action="123"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveAvatarUpload">确 定</el-button>
            </div>
        </el-dialog>
        <MessageBox @dialogCallBack="batchDeleteOk" v-model="dialogSelectALL" title="提示" contents="确定批量删除吗?"></MessageBox>
    </div>
</template>
<style lang="less">
    .image-popover {
        height: auto;
        max-width: 150px;
        text-align: center;
    }
    .image {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .upload-success {
        display: inline-block;
        color: #13CE66;
    }
    .upload-error {
        display: inline-block;
        color: #FF4949;
    }
    .upload {
        margin-left: 15px;
        display: inline-block;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .edit-btn {
        margin-left: 0!important;
    }
</style>
<script type='text/ecmascript-6'>
    import Pagination from '../../../components/Pagination/index';
    import MessageBox from '../../../components/Messages/MessageBox';
    import uploadDialog from '../../../components/uploadDialog';
    import store from 'store/index';
    import { mapGetters, mapMutations } from 'vuex';
    import { uploadImg } from 'api/upload';
    import { delArticle, batchDelArticle } from '../../../api/article';
    import { conversionData } from '../../../utils/index';
    import { formatDate } from '../../../filters/index';
    import { getArticleList, updateArticle } from '../../../api/article';
    export default {
        name: 'articleList',
        created() {
            store.dispatch('GetCount');
            this.getList();
        },
        data() {
            return {
                list: null,
                isDialog: false,
                dialogSelectALL: false,
                imageUrl: '',
                rowId: '',
                multipleSelection: []
            };
        },
        computed: {
            ...mapGetters([
                'articleList',
                'articleCount'
            ])
        },
        methods: {
            getList() {
                getArticleList(0).then((res) => {
                    this.list = conversionData(res).data.results.map(v => {
                        v.edit = false;
                        return v;
                    })
                });
            },
            selectAll(val) {
                this.multipleSelection = val;
            },
            batchDelete() {
                this.dialogSelectALL = true;
            },
            batchDeleteOk() {
                batchDelArticle(this.multipleSelection).then((res) => {
                    let vm = this;
                    vm.dialogSelectALL = false;
                    this.getList();
                    store.dispatch('GetCount');
                    vm.$message.success('批量删除成功');
                });
            },
            handleEdit(index, row) {
                row.edit = true;
            },
            handleEditSave(index, row) {
                let params = {
                    title: row.title
                };
                updateArticle(row.objectId,row.title).then((res) => {
                    this.$message.success('编辑成功');
                    this.getList();
                    row.edit = false;
                }).catch(error => {
                    this.$message({
                        message: error,
                        type: 'error',
                        duration: 2*1000
                    });
                });
            },
            handleDelete(index, row) {
                delArticle(row.objectId).then(() => {
                    this.getList();
                    store.dispatch('GetCount');
                    this.$message.success('删除成功');
                });
            },
            openDialog(row) {
                this.isDialog = true;
                this.rowId = row.objectId;
                this.imageUrl = '';
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                const vm = this;
                if (!isJPG) {
                    vm.$message.error('上传头像图片只能是 JPG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    vm.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
                uploadImg(file,vm.rowId).then(function (res) {
                    let data = conversionData(res);
                    vm.imageUrl = data.picture.url.toString();
                    vm.$message.success('上传成功');
                });
            },
            saveAvatarUpload() {
                this.isDialog = false;
                this.getList();
            },
            handleSizeChange(val) {
                this.$store.commit('SET_PAGESIZE',val);
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.skip = (val -1) * this.listQuery.limit;
                this.$store.commit('SET_PAGENO',val-1);
                this.getList(this.listQuery);
            }

        },
        components: {
            'Pagination': Pagination,
            'MessageBox': MessageBox
        }
    }
</script>
