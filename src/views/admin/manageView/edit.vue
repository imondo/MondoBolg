<template>
    <div class="publish">
        <el-row>
            <el-col :span="12">
                <div class="title">
                    <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
                </div>
                <div class="content-wrapper">
                    <textarea class="text-content text el-input__inner" rows="20" :value="input" @input="update" placeholder="请输入文章内容"></textarea>
                </div>
                <div class="save">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="文章分类">
                            <el-select placeholder="文章分类" v-model="formData.classify">
                                <el-option label="工作" value="工作"></el-option>
                                <el-option label="生活" value="生活"></el-option>
                                <el-option label="笔记" value="笔记"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标签">
                            <!--<el-select placeholder="标签" v-model="formData.tag">
                                <el-option label="JavaScript" value="JavaScript"></el-option>
                                <el-option label="nodeJs" value="nodeJs"></el-option>
                                <el-option label="vue" value="vue"></el-option>
                                <el-option label="life" value="life"></el-option>
                            </el-select>-->
                            <Tag></Tag>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit()">发表</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="show text">
                    <div v-html="compiledMarkdown"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less">
    .publish {
        .title, .content-wrapper {
            margin-bottom: 25px;
        }
        .show {
            padding-left: 25px;
        }
        .text {
            font-family: "Microsoft Yahei";
            font-size: 12px;
        }
        .text-content {
            padding: 5px;
            height: 650px;
        }

    }
</style>
<script type='text/ecmascript-6'>
    import marked from 'marked';
    import { addArticle } from '../../../api/article';
    import Tag from '../../../components/Tags/index';
    const CODE = 201;
    export default {
        name: 'edit',
        data() {
            return {
                formData: {
                    title: '',
                    classify: '',
                    tag: ''
                },
                input: ''
            };
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, {sanitize: true});
            }
        },
        methods: {
            update: function (e) {
                this.input = e.target.value;
            },
            save: function (params) {
                const vm = this;
                addArticle(params).then((res) => {
                   if (res.status === CODE) {
                       vm.$message.success('发表成功!');
                       vm.$router.push('/manage/article'); // 跳转列表页面面
                   }
                });
            },
            onSubmit: function () {
                if (this.title === '' || this.input === '') {
                    this.$message({
                        message: '请填写完整!',
                        type: 'warning'
                    });
                } else {
                    let params = {};
                    params = this.formData;
                    params.content = this.input;
                    params.tags = this.$store.getters.articleList.tags;
                    this.save(params);
                }
            }
        },
        components: {
            'Tag': Tag
        }
    };
</script>
