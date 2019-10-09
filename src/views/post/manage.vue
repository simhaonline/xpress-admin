<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="posts" border fit highlight-current-row style="width: 100%">
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

      <el-table-column align="center" label="分类" width="110">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.category.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/post/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/post/edit/' + row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delPage(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px"
      background
      layout="prev, pager, next"
      :total="page.total"
      :page-size="page.size"
      :current-page="page.current"
      @current-change="currentChangeHandler"
    />

  </div>
</template>

<script>
import { getPosts } from '@/api/post'
import { removePost } from '@/api/post'

export default {
  name: 'ManagePost',
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
      posts: undefined,
      page: {
        total: 0,
        size: 10,
        current: 1
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getPosts(this.page.current, this.page.size).then(response => {
        this.listLoading = true
        this.posts = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    },
    currentChangeHandler(pageNum) {
      this.listLoading = true
      this.page.current = pageNum
      getPosts(pageNum, this.page.size).then(response => {
        this.posts = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    },
    delPage(id) {
      this.$confirm('此操作将永久该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removePost(id).then(() => {
          this.$message({
            showClose: true,
            message: '文章删除成功',
            type: 'success'
          })
          this.posts = this.posts.filter(item => {
            return item.id !== id
          })
          this.page.total = this.page.total - 1
          if (Math.ceil(this.page.total / this.page.size) < this.page.current) {
            this.page.current = this.page.current - 1
          }
          this.currentChangeHandler(this.page.current)
        })
      }).catch(() => {})
    }
  }
}
</script>
