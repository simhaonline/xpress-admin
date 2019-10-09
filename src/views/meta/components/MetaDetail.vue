<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="form.name" class="formInput" />
      </el-form-item>
      <el-form-item label="缩略名">
        <el-input v-model="form.slug" class="formInput" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" class="formInput" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategory, createCategory, updateCategory } from '@/api/category'
import { getTag, createTag, updateTag } from '@/api/tag'

export default {
  name: 'MetaDetail',
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    isCategory: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: undefined,
        slug: undefined,
        description: undefined
      }
    }
  },
  created() {
    if (this.isCategory) {
      if (this.isEdit) {
        this.fetchCategory()
      }
    } else {
      if (this.isEdit) {
        this.fetchTag()
      }
    }
  },
  methods: {
    submitCategory() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        updateCategory(id, this.form).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/category/manage')
        })
      } else {
        createCategory(this.form).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/category/manage')
        })
      }
    },
    submitTag() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        updateTag(id, this.form).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/tag/manage')
        })
      } else {
        createTag(this.form).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/tag/manage')
        })
      }
    },
    onSubmit() {
      if (this.isCategory) {
        this.submitCategory()
      } else {
        this.submitTag()
      }
    },
    fetchCategory() {
      const id = this.$route.params && this.$route.params.id
      getCategory(id).then(response => {
        this.form.name = response.name
        this.form.slug = response.slug
        this.form.description = response.description
      })
    },
    fetchTag() {
      const id = this.$route.params && this.$route.params.id
      getTag(id).then(response => {
        this.form.name = response.name
        this.form.slug = response.slug
        this.form.description = response.description
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
