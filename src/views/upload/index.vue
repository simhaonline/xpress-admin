<template>
  <div class="app-container">
    <div class="dropzone-container">
      <vue-dropzone id="dropzone" ref="myVueDropzone" :options="dropzoneOptions" @vdropzone-success="handleSuccess" />
    </div>
    <el-table v-loading="listLoading" :data="files" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上传者">
        <template slot-scope="{row}">
          <span>{{ row.author.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="文件名">
        <template slot-scope="{row}">
          {{ row.filename }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="文件类型">
        <template slot-scope="{row}">
          {{ row.mimetype }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="文件大小">
        <template slot-scope="{row}">
          {{ row.size | toKB }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="日期">
        <template slot-scope="{row}">
          {{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delFile(row.id)">
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
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { getFiles } from '@/api/file'
import { removeFile } from '@/api/file'
import { getToken } from '@/utils/auth'

export default {
  name: 'Upload',
  components: { vueDropzone: vue2Dropzone },
  filters: {
    toKB(b) {
      return parseInt(b / 1024) + ' KB'
    }
  },
  data() {
    return {
      listLoading: true,
      files: undefined,
      dropzoneOptions: {
        url: process.env.VUE_APP_BASE_API + '/files',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'X-Token': getToken() }
      },
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
      getFiles(this.page.current, this.page.size).then(response => {
        this.listLoading = true
        this.files = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    },
    currentChangeHandler(pageNum) {
      this.listLoading = true
      this.page.current = pageNum
      getFiles(pageNum, this.page.size).then(response => {
        this.files = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    },
    delFile(id) {
      this.$confirm('此操作将永久该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeFile(id).then(response => {
          this.$message({
            showClose: true,
            message: '文件删除成功',
            type: 'success'
          })
          this.files = this.files.filter(item => {
            return item.id !== id
          })
          this.page.total = this.page.total - 1
          if (Math.ceil(this.page.total / this.page.size) < this.page.current) {
            this.page.current = this.page.current - 1
          }
          this.currentChangeHandler(this.page.current)
        })
      }).catch(() => {})
    },
    handleSuccess() {
      getFiles(this.page.current, this.page.size).then(response => {
        this.listLoading = true
        this.files = response.records
        this.page.total = response.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .dropzone-container {
    margin-bottom: 10px;
  }
</style>
