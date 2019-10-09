<template>
  <div class="app-container">
    <el-button type="primary" class="new-category" @click="newCategory">新建分类</el-button>
    <el-table v-loading="listLoading" :data="categories" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="缩略名">
        <template slot-scope="{row}">
          <span>{{ row.slug }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="文章数量" width="110">
        <template slot-scope="{row}">
          {{ row.count }}
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="描述">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/category/edit/' + row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delCategory(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getCategories } from '@/api/category'
import { removeCategory } from '@/api/category'

export default {
  name: 'ManageCategory',
  data() {
    return {
      listLoading: true,
      categories: undefined
    }
  },
  created() {
    getCategories().then(response => {
      this.listLoading = true
      this.categories = response
      this.listLoading = false
    })
  },
  methods: {
    newCategory() {
      this.$router.push('/category/create')
    },
    delCategory(id) {
      this.$confirm('此操作将永久该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCategory(id).then(() => {
          this.$message({
            showClose: true,
            message: '分类删除成功',
            type: 'success'
          })
          this.categories = this.categories.filter(item => {
            return item.id !== id
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
  .new-category {
    margin-bottom: 15px;
  }
</style>
