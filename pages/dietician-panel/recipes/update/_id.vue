<template>
  <v-container>
    <client-only>

    </client-only>
  </v-container>
</template>

<script>
export default {
  name: '_id',
  layout: "dietician",
  middleware: ["dietician"],
  beforeCreate() {
    this.$store.dispatch('getSettings')
  },
}
</script>

<style scoped>

</style>
