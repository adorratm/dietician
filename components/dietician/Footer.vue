<template>
  <client-only>
      <v-footer
        :absolute='!fixed'
        app
      >
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:['settings'],
  computed:{
    ...mapState(["fixed"])
  },
}
</script>

<style scoped>

</style>
