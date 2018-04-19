<template>
  <div class="publish">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="left">
        <div class="title text-center">
          <h1>{{formData.title}}</h1>
        </div>
        <div class="show text">
          <div v-html="compiledMarkdown" class="content-article"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="right">
        <div class="title">
          <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
        </div>
        <div class="save">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
              <el-select placeholder="文章分类" v-model="formData.classify" size="small">
                <el-option label="工作" value="工作"></el-option>
                <el-option label="生活" value="生活"></el-option>
                <el-option label="笔记" value="笔记"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <mo-tag @tags="getTags" :dynamicTags.sync="tags"></mo-tag>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="picture" size="small">
                <label for="upload">图片</label>
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="check" size="small" @click="onSubmit()">发表</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-wrapper">
          <textarea class="text-content text el-input__inner" rows="20" :value="input" @input="update" placeholder="请输入文章内容"></textarea>
        </div>
      </el-col>
    </el-row>
    <input class="hidden" type="file" id="upload" name="file" @change="processFile($event)">
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .publish {
    padding: 20px;
    .el-row,.right {
      height: 100%;
    }
    .el-dialog--small {
      width: 80%;
      max-width: 345px;
      label {
        display: inline-block;
        width: 100%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        font-size: 21px;
        color: #cccccc;
      }
    }
    .right {
      float: right;
    }
    .left {
      padding-right: 10px;
      input {
        border: none;
      }
    }
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
      outline: none;
    }

  }
</style>
<script type='text/ecmascript-6'>
  import { getArtcile, addArticle, updateArtcile } from '~/api/article';
  import { conversionData } from '~/utils/index';
  import { uploadArticleImg } from '~/api/upload';
  import { handleAbout, getAbout, addAbout } from '~/api/about';

  export default {
    data: () => ({
      formData: {
        title: '',
        classify: '',
      },
      tags: [],
      input: ''
    }),
    computed: {
      compiledMarkdown() {
        return this.$marked(this.input, {sanitize: true});
      },
      isEdit() {
        return this.$route.meta.isEdit;
      },
      isDialog() {
        return this.$store.getters.conditionState.isDialog;
      },
      isAbout() {
        return this.$route.meta.isAbout;
      }
    },
    created() {
      if (this.isEdit) {
        getArtcile(this.$route.params.id).then((res) => {
          let {id, title, classify, tags, content} = res.data;
          this.formData = {id, title, classify};
          this.input = content;
          this.tags = tags.split(',');
        });
      }
      if (this.isAbout && this.$route.query.hasAbout == 1) {
        getAbout().then((res) => {
          let {id, title, classify, tags, content} = res.data;
          this.formData = {id, title, classify};
          this.input = content;
          this.tags = tags.split(',');
        });
      }
    },
    methods: {
      update(e) {
        this.input = e.target.value;
      },
      save(params) {
        addArticle(params).then((res) => {
          this.$message.success('发表成功!');
          this.$router.push({name: 'index'});
        });
      },
      getTags(val) {
        this.tags = val;
      },
      updates(params) {
        updateArtcile(params).then((res) => {
          this.$message.success('更新成功!');
          this.$router.push({name: 'index'});
        });
      },
      saveAbout(params) {
        if (this.$route.query.hasAbout == 1) {
          handleAbout(params).then((res) => {
            this.$message.success('变更成功!');
            this.$router.push({name: 'about'});
          });
        } else {
          addAbout(params).then((res) => {
            this.$message.success('保存成功!');
            this.$router.push({name: 'about'});
          });

        }
      },
      onSubmit() {
        if (this.title === '' || this.input === '') {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        } else {
          let params = {};
          params = this.formData;
          params.content = this.input;
          params.tags = this.tags.join();
          if (this.isEdit) {
            this.updates(params);
          } else {
            if (this.isAbout) {
              this.saveAbout(params);
            } else {
              this.save(params);
            }
          }
        }
      },
      processFile(e) {
        uploadArticleImg(e.target.files[0]).then(file => {
          this.input = this.input + '\r\n![Alt text](' + conversionData(file).url + ')';
        });
      }
    },
    watch: {
      '$route' (to) {
        if (to.path.indexOf('/create') > -1) {
          this.formData = {
            title: '',
            classify: '',
            tags: []
          };
          this.input = '';
        }
      }
    }
  };
</script>
