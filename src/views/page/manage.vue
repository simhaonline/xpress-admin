<template>
  <div class="app-container">
    <el-button type="primary" class="new-page" @click="newPage">新建页面</el-button>
    <el-table v-loading="listLoading" :data="pages" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="日期">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="{row}">
          <span>{{ row.author.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | toTagType">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="别名">
        <template slot-scope="{row}">
          <span>{{ row.slug }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/page/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/page/edit/' + row.id">
            <el-button style="margin:2px;" type="primary" size="mini" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button style="margin:2px;" type="danger" size="mini" icon="el-icon-delete" @click="delPage(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getPages } from '@/api/page'
import { removePage } from '@/api/page'

export default {
  name: 'ManagePage',
  filters: {
    toTagType(value) {
      if (value === 'publish') {
        return 'success'
      } else if (value === 'draft') {
        return 'danger'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      pages: undefined
    }
  },
  created() {
    getPages().then(response => {
      this.listLoading = true
      this.pages = response
      this.listLoading = false
    })
  },
  methods: {
    newPage() {
      this.$router.push('/page/create')
    },
    delPage(id) {
      this.$confirm('此操作将永久该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removePage(id).then(() => {
          this.$message({
            showClose: true,
            message: '页面删除成功',
            type: 'success'
          })
          this.pages = this.pages.filter(item => {
            return item.id !== id
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
  .new-page {
    margin-bottom: 15px;
  }
</style>
