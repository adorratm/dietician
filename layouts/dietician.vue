<template>
  <v-app>
    <div class='main-wrapper'>
      <client-only>
        <Dieticianheader v-if='!isEmpty(settings)' :settings='settings' />
        <Dieticiansidebar v-if='!isEmpty(settings)' :settings='settings' />
      <v-main>
        <Nuxt />
      </v-main>
      </client-only>
    </div>
  </v-app>
</template>
<script>
import Dieticianheader from '@/components/backend/dieticianheader.vue'
import Dieticiansidebar from '@/components/backend/dieticiansidebar.vue'

export default {
  head() {
    return {
      htmlAttrs: {
        lang: 'tr'
      }
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  },
  mounted() {
    if(this.$auth.strategy.token.status()._status === "UNKNOWN" || this.$auth.strategy.token.status()._status === false){
      this.$auth.logout()
      this.$auth.$storage.removeUniversal('user')
      this.$auth.strategy.refreshToken.reset()
      this.$auth.strategy.token.reset()
      this.$auth.reset()
    }
  },
  name: 'dietician',
  middleware: ['auth', 'dietician'],
  components: {
    Dieticianheader,
    Dieticiansidebar
  },
  methods: {
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    }
  }
}
</script>

