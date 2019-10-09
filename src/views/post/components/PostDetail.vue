<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <el-col :span="24">
        <el-row>
          <el-col :span="18">
            <div class="post-main">
              <el-tag class="tag-title">标题:</el-tag>
              <el-input v-model="postForm.title" class="post-title" autosize placeholder="请输入标题" />
              <el-tag class="tag-title">正文:</el-tag>
              <markdown-editor ref="markdownEditor" v-model="postForm.content" class="post-content" :options="{hideModeSwitch:true,previewStyle:'tab'}" :language="language" height="300px" />
              <el-tag class="tag-title">别名:</el-tag>
              <el-input v-model="postForm.slug" class="post-slug" autosize placeholder="请输入别名" />
              <el-tag class="tag-title">标签 (使用逗号分割, 标签必须已存在) :</el-tag>
              <el-input v-model="postTags" class="post-tag" autosize placeholder="请输入标签" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="post-info">
              <el-form-item label-width="60px" label="作者:" class="post-author">
                <el-select v-model="postForm.authorId" default-first-option placeholder="选择用户">
                  <el-option v-for="item in remoteData.authors" :key="item.id+item.username" :label="item.username" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label-width="60px" label="分类:" class="post-category">
                <el-select v-model="postForm.categoryId" default-first-option placeholder="选择分类">
                  <el-option v-for="item in remoteData.categories" :key="item.id+item.name" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label-width="60px" label="状态:" class="post-status">
                <el-select v-model="postForm.status" default-first-option placeholder="选择状态">
                  <el-option v-for="(item,index) in remoteData.status" :key="item+index" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label-width="80px" label="允许评论:">
                <el-switch v-model="postForm.isAllowComments" />
              </el-form-item>
              <el-button type="primary" style="width: 100%" @click="onSubmit">提交</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { getCategories } from '@/api/category'
import { getUsers } from '@/api/user'
import { createPost } from '@/api/post'
import { updatePost } from '@/api/post'
import { getPost } from '@/api/post'
import { getTagsByIds } from '@/api/tag'

export default {
  name: 'PostDetail',
  components: { MarkdownEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      },
      remoteData: {
        authors: undefined,
        categories: undefined,
        status: [
          {
            name: '发布',
            value: 'publish'
          },
          {
            name: '草稿',
            value: 'draft'
          }
        ]
      },
      postForm: {
        title: undefined,
        content: undefined,
        slug: undefined,
        tags: undefined,
        authorId: undefined,
        categoryId: undefined,
        status: undefined,
        isAllowComments: true
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['zh']
    },
    postTags: {
      get() {
        if (this.postForm.tags) {
          return this.postForm.tags.join(',')
        }
        return ''
      },
      set(newValue) {
        const tags = newValue.split(',')
        tags.map(item => {
          item.trim()
        })
        const set = new Set(tags)
        this.postForm.tags = [...set]
      }
    }
  },
  created() {
    getCategories().then(response => {
      this.remoteData.categories = response
    })
    getUsers().then(response => {
      this.remoteData.authors = response
    })
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      getPost(id).then(response => {
        this.postForm.title = response.title
        this.postForm.content = response.content
        this.postForm.slug = response.slug
        this.postForm.authorId = response.author.id
        this.postForm.categoryId = response.category.id
        this.postForm.status = response.status
        this.postForm.isAllowComments = response.isAllowComments
        if (response.tags.length === 0) {
          return Promise.reject()
        }
        return getTagsByIds(response.tags)
      }).then(response => {
        const tags = []
        response.forEach(tag => {
          tags.push(tag.name)
        })
        this.postTags = tags.join(',')
      }).catch(() => {})
    }
  },
  methods: {
    onSubmit() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        updatePost(id, this.postForm).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/post/manage')
        })
      } else {
        createPost(this.postForm).then(response => {
          this.$message({
            showClose: true,
            message: response.message,
            type: 'success'
          })
          this.$router.push('/post/manage')
        })
      }
    }
  }
}
</script>

<style scoped>
  .form-container{
    margin-bottom: 30px;
  }
  .post-title, .post-content, .post-slug, .post-tag{
    margin-bottom: 20px;
  }
  .tag-title{
    margin-bottom: 5px;
  }
  .post-info{
    padding: 60px;
    float: right;
  }
</style>
