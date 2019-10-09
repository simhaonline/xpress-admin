<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" class="formInput" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" class="formInput" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail" class="formInput" />
      </el-form-item>
      <el-form-item label="网址">
        <el-input v-model="form.url" class="formInput" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" class="formInput" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUser, updateUser, createUser } from '@/api/user'

export default {
  name: 'UserDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        username: undefined,
        password: undefined,
        mail: undefined,
        url: undefined,
        nickname: undefined
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchUser()
    }
  },
  methods: {
    fetchUser() {
      const id = this.$route.params && this.$route.params.id
      getUser(id).then(response => {
        this.form.username = response.username
        this.form.password = ''
        this.form.mail = response.mail
        this.form.url = response.url
        this.form.nickname = response.nickname
      })
    },
    onSubmit() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        updateUser(id, this.form).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/user/manage')
        })
      } else {
        createUser(this.form).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/user/manage')
        })
      }
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
