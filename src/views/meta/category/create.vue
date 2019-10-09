<template>
  <meta-detail :is-edit="false" :is-category="true" />
</template>

<script>
import MetaDetail from '../components/MetaDetail'

export default {
  name: 'CreateCategory',
  components: { MetaDetail }
}
</script>
