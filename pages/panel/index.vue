<template>
<v-container>
  <client-only>

  </client-only>
</v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware:['auth','admin']
}
</script>

<style scoped>

</style>
