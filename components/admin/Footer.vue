<template>
  <div>
    <v-footer
      :absolute='!fixed'
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
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
