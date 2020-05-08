<template>
  <div class="app-container">
    <el-button type="primary" class="new-tag" @click="newTag">新建标签</el-button>
    <el-table v-loading="listLoading" :data="tags" border fit highlight-current-row style="width: 100%">
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
          <router-link :to="'/tag/edit/' + row.id">
            <el-button style="margin:2px;" type="primary" size="mini" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button style="margin:2px;" type="danger" size="mini" icon="el-icon-delete" @click="delTag(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getTags } from '@/api/tag'
import { removeTag } from '@/api/tag'

export default {
  name: 'ManageTag',
  data() {
    return {
      listLoading: true,
      tags: undefined
    }
  },
  created() {
    getTags().then(response => {
      this.listLoading = true
      this.tags = response
      this.listLoading = false
    })
  },
  methods: {
    newTag() {
      this.$router.push('/tag/create')
    },
    delTag(id) {
      this.$confirm('此操作将永久该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeTag(id).then(() => {
          this.$message({
            showClose: true,
            message: '标签删除成功',
            type: 'success'
          })
          this.tags = this.tags.filter(item => {
            return item.id !== id
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
  .new-tag {
    margin-bottom: 15px;
  }
</style>
