<template>
  <meta-detail :is-edit="true" :is-category="true" />
</template>

<script>
import MetaDetail from '../components/MetaDetail'

export default {
  name: 'EditCategory',
  components: { MetaDetail }
}
</script>
