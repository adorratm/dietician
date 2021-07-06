<template>
  <v-container>
    <client-only>

    </client-only>
  </v-container>
</template>

<script>
export default {
  name: 'index',
  layout: "dietician",
  middleware: ["auth","dietician"],
}
</script>

<style scoped>

</style>
