<template>
  <div class="app-container">
    <el-button type="primary" class="new-user" @click="newUser">新建用户</el-button>
    <el-table v-loading="listLoading" :data="users" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="别名">
        <template slot-scope="{row}">
          {{ row.nickname }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱">
        <template slot-scope="{row}">
          {{ row.mail }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="网址">
        <template slot-scope="{row}">
          {{ row.url }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/user/edit/' + row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button v-if="hiddenDelBtn(row.id)" type="danger" size="mini" icon="el-icon-delete" @click="delUser(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getUsers, removeUser, getCurrentUser } from '@/api/user'
import request from '@/utils/request'

export default {
  name: 'ManageUser',
  data() {
    return {
      listLoading: true,
      users: undefined,
      currentUser: undefined
    }
  },
  created() {
    request.all([getUsers(), getCurrentUser()])
      .then(request.spread((users, currentUser) => {
        this.listLoading = true
        this.users = users
        this.currentUser = currentUser
        this.listLoading = false
      }))
  },
  methods: {
    newUser() {
      this.$router.push('/user/create')
    },
    delUser(id) {
      this.$confirm('此操作将永久该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser(id).then(() => {
          this.$message({
            showClose: true,
            message: '用户删除成功',
            type: 'success'
          })
          this.users = this.users.filter(item => {
            return item.id !== id
          })
        })
      }).catch(() => {})
    },
    hiddenDelBtn(id) {
      if (id === this.currentUser.id) {
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
  .new-user {
    margin-bottom: 15px;
  }
</style>

