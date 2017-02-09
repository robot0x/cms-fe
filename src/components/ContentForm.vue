<template>
<div class="component-content-form">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="作者" prop="aName">
      <el-input v-model="ruleForm.aName"></el-input>
    </el-form-item>
    <el-form-item label="关键词" prop="keywords">
      <el-input v-model="ruleForm.keywords" placeholder="请输入文章关键字，多个关键字用空格或逗号隔开" @keyup.native.enter.stop.prevent="addKeywords"></el-input>
      <el-tag v-for="keyword in keywords" :closable="true" :type="keyword.type" @close="removeTag(keyword)"> {{keyword.name}} </el-tag>
    </el-form-item>
    <el-form-item label="类型" prop="ctype">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发布日期" required>
      <el-col :span="24">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="标签" prop="type">
      <tag-tree></tag-tree>
    </el-form-item>
    <el-form-item label="图片上传" prop="desc">
      <el-upload
        action="//jsonplaceholder.typicode.com/posts/"
        type="drag"
        thumbnail-mode="true"
        :multiple="true">
        <i class="el-icon-upload"></i>
        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="选择封面图" prop="cover">
      请先上传图片
    </el-form-item>
    <el-form-item label="选择缩略图" prop="thumb">
      请先上传图片
    </el-form-item>
    <el-form-item label="选择轮播图" prop="banners">
      请先上传图片
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import TagTree from './TagTree'
export default {
    components: {
      TagTree
    },
    data() {
      return {
        ruleForm: {
          delivery: false,
          name: '',
          region: '',
          date1: '',
          date2: '',
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss"></style>
