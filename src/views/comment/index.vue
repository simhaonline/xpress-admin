<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="comments" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="文章ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.postId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="评论内容">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          {{ row.status | toCommentStatus }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="日期" width="160">
        <template slot-scope="{row}">
          {{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" icon="el-icon-check" :disabled="row.status === 'approve'" @click="approveCmt(row.id)">
            审核
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delComment(row.id)">
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
import { getComments } from '@/api/comment'
import { removeComment } from '@/api/comment'
import { approveComment } from '@/api/comment'

export default {
  name: 'Comment',
  filters: {
    toCommentStatus(val) {
      if (val === 'approve') {
        return '已审核'
      }
      if (val === 'waiting') {
        return '等待审核'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      comments: undefined,
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
      getComments(this.page.current, this.page.size).then(response => {
        this.listLoading = true
        this.comments = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    },
    currentChangeHandler(pageNum) {
      this.listLoading = true
      this.page.current = pageNum
      getComments(pageNum, this.page.size).then(response => {
        this.comments = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    },
    approveCmt(id) {
      approveComment(id).then(response => {
        this.$message({
          showClose: true,
          message: response.message,
          type: 'success'
        })
        this.comments = this.comments.map(item => {
          if (item.id === id) {
            item.status = 'approve'
          }
          return item
        })
      })
    },
    delComment(id) {
      this.$confirm('此操作将永久该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeComment(id).then(() => {
          this.$message({
            showClose: true,
            message: '评论删除成功',
            type: 'success'
          })
          this.comments = this.comments.filter(item => {
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
