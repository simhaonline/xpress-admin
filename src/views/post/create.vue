<template>
  <post-detail :is-edit="false" />
</template>

<script>
import PostDetail from './components/PostDetail'

export default {
  name: 'CreatePost',
  components: { PostDetail }
}
</script>
