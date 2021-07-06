<template>
  <v-container>
    <client-only>

    </client-only>
  </v-container>
</template>

<script>
export default {
  layout: "dietician",
  middleware: ["auth","dietician"],
}
</script>

<style scoped>

</style>
