<template>
  <meta-detail :is-edit="true" :is-category="false" />
</template>

<script>
import MetaDetail from '../components/MetaDetail'

export default {
  name: 'EditTag',
  components: { MetaDetail }
}
</script>
