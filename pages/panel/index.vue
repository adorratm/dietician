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
  beforeCreate() {
    this.$store.dispatch('getSettings')
  },
}
</script>

<style scoped>

</style>
