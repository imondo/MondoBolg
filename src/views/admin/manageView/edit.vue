<template>
  <div class="publish">
    <el-row>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="left">
        <div class="title text-center">
          <h1>{{formData.title}}</h1>
        </div>
        <div class="show text">
          <div v-html="compiledMarkdown" class="content"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="right">
        <div class="title">
          <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
        </div>
        <div class="save">
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="文章分类">
              <el-select placeholder="文章分类" v-model="formData.classify" size="small">
                <el-option label="工作" value="工作"></el-option>
                <el-option label="生活" value="生活"></el-option>
                <el-option label="笔记" value="笔记"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <Tag></Tag>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()" size="small">发表</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-wrapper">
          <textarea class="text-content text el-input__inner" rows="20" :value="input" @input="update" placeholder="请输入文章内容"></textarea>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .publish {
    height: 100%;
    .el-row,.right {
      height: 100%;
    }
    .right {
      float: right;
    }
    .left {
      input {
        border: none;
      }
    }
    .title, .content-wrapper {
      margin-bottom: 25px;
    }
    .show {
      padding-left: 25px;
      .content {
        font-size: 14px;
        hr {
          display: block;
          margin: 15px 0;
          background-color: #e0e0e0;
          border: 0;
          height: 1px;
        }
        blockquote{
          padding: 10px 20px;
          margin-bottom: 25px;
          background-color: #f7f7f7;
          border-left: 2px solid #009A61;
          word-break: break-word!important;
          word-break: break-all;
          line-height: 30px;
          p {
            font-weight: 600;
            line-height: 1.7;
            font-size: 16px;
          }
        }
        pre {
          margin: 30px 0;
        }
        code {
          display: block;
          width: 100%;
          overflow-x: auto;
          padding: 10px;
          border-radius: 3px;
          background-color: #F3F3F3;
        }
        h1, h2, h3, h4, h5 {
          margin: 20px 0;
        }
      }
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
  import marked from 'marked';
  import { getArtcile, addArticle, updateArtcile } from 'api/article';
  import { conversionData } from 'utils/index';
  import Tag from 'components/Tags/index';
  const CODE = 200;
  export default {
    data() {
      return {
        formData: {
          title: '',
          classify: '',
          tag: ''
        },
        input: '',
        id: ''
      };
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, {sanitize: true});
      },
      isEdit() {
        return this.$route.meta.isEdit;
      }
    },
    created() {
      let vm = this;
      if (this.isEdit) {
        getArtcile(this.$route.params.id).then((res) => {
          let data = conversionData(res).data;
          vm.formData = {
            title: data.title,
            classify: data.classify,
            tag: data.tag
          };
          vm.input = data.content;
          vm.id = this.$route.params.id;
        });
      }
    },
    methods: {
      update: function (e) {
        this.input = e.target.value;
      },
      save: function (params) {
        const vm = this;
        addArticle(params).then((res) => {
          if (res.status === 201) {
            vm.$message.success('发表成功!');
            vm.$router.push('/index'); // 跳转列表页面面
          }
        });
      },
      updates(params, id) {
        const vm = this;
        updateArtcile(params, id).then((res) => {
          if (res.status === CODE) {
            vm.$message.success('更新成功!');
            vm.$router.push('/index'); // 跳转列表页面面
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
          let vm = this;
          let params = {};
          params = this.formData;
          params.content = this.input;
          params.tags = this.$store.getters.articleList.tags;
          if (this.isEdit) {
            this.updates(params, vm.id);
          } else {
            this.save(params);
          }
        }
      }
    },
    watch: {
      '$route' (to, from) {
        let vm = this;
        if (to.path.indexOf('/create') > -1) {
          vm.formData = {
            title: '',
            classify: '',
            tag: ''
          };
          vm.input = '';
        }
      }
    },
    components: {
      'Tag': Tag
    }
  };
</script>
