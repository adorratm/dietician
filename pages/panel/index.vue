<template>
<v-container>
  <client-only>

  </client-only>
</v-container>
</template>

<script>
export default {
  name: 'index',
  layout: 'admin',
  middleware:['auth','admin']
}
</script>

<style scoped>

</style>
