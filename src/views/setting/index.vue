<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="网站URL">
        <el-input v-model="form.siteURL" class="formInput" />
      </el-form-item>
      <el-form-item label="网站LOGO">
        <el-input v-model="form.logo" class="formInput" />
      </el-form-item>
      <el-form-item label="网站标题">
        <el-input v-model="form.title" class="formInput" />
      </el-form-item>
      <el-form-item label="网站关键词">
        <el-input v-model="form.keywords" class="formInput" />
      </el-form-item>
      <el-form-item label="网站描述">
        <el-input v-model="form.description" class="formInput" />
      </el-form-item>
      <el-form-item label="导航栏HTML">
        <el-input v-model="form.navbar" type="textarea" :autosize="{ minRows: 5}" class="formInput" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSettings, updateSettings } from '@/api/setting'

export default {
  name: 'Setting',
  data() {
    return {
      form: {
        siteURL: undefined,
        logo: undefined,
        title: undefined,
        keywords: undefined,
        description: undefined,
        navbar: undefined
      }
    }
  },
  created() {
    this.fetchSettings()
  },
  methods: {
    fetchSettings() {
      getSettings().then(response => {
        this.form.siteURL = response.siteURL
        this.form.logo = response.logo
        this.form.title = response.title
        this.form.keywords = response.keywords
        this.form.description = response.description
        this.form.navbar = response.navbar
      })
    },
    onSubmit() {
      updateSettings(this.form).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
  .formInput {
    width: 40%;
  }
  .app-container {
    margin-top: 20px;
  }
</style>
