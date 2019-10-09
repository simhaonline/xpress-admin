<template>
  <meta-detail :is-edit="false" :is-category="false" />
</template>

<script>
import MetaDetail from '../components/MetaDetail'

export default {
  name: 'CreateTag',
  components: { MetaDetail }
}
</script>
