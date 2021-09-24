<template>
  <v-app>
    <client-only>
      <Header v-if='!isEmpty(settings)' :settings='settings' />
      <v-main>
        <Nuxt />
      </v-main>
      <Footer v-if='!isEmpty(settings)' :settings='settings' />
    </client-only>
  </v-app>
</template>
<script>

import Header from '@/components/frontend/header.vue'
import Footer from '@/components/frontend/footer.vue'

export default {
  name: 'default',
  head() {
    return {
      htmlAttrs: {
        lang: 'tr'
      }
    }
  },
  components: {
    Header,
    Footer
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

