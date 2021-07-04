<template>
  <v-app>
    <client-only>
      <Header :items='items' :settings='settings' :user-data='userData'></Header>
    </client-only>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <client-only>
      <Footer :settings='settings'></Footer>
    </client-only>
  </v-app>
</template>

<script>
import Header from '@/components/admin/Header'
import Footer from '@/components/admin/Footer'
import Cookie from 'js-cookie'
import { Base64 } from 'js-base64'
import { mapState } from 'vuex'

export default {
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
    ...mapState(['settings'])
  },
  mounted() {
    // This Function Changing Default Theme
    const theme = localStorage.getItem('useDarkTheme')
    if (theme) {
      this.$vuetify.theme.dark = theme === 'true';
    } else {
      // This Function Gets Default Windows || Mac Os || Linux Application Layout
      this.initDarkMode()
    }
  },
  data() {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Anasayfa',
          to: '/panel'
        },
        {
          icon: 'mdi-cogs',
          title: 'Ayarlar',
          to: '/panel/settings'
        },
        {
          icon: 'mdi-folder-multiple-image',
          title: 'Slaytlar',
          to: '/panel/slides'
        },
        {
          icon: 'mdi-account-group',
          title: 'Kullanıcılar',
          to: '/panel/users'
        },
        {
          icon: 'mdi-doctor',
          title: 'Diyetisyenler',
          to: '/panel/dieticians'
        },
        {
          icon: 'mdi-food',
          title: 'Besinler',
          to: '/panel/nutrients'
        },
        {
          icon: 'mdi-food-variant',
          title: 'Ölçütler',
          to: '/panel/criterias'
        },
        {
          icon: 'mdi-run-fast',
          title: 'Egzersizler',
          to: '/panel/exercises',
          children: [
            {
              icon: 'mdi-view-list',
              title: 'Kategoriler',
              to: '/panel/exercise-categories'
            },
            {
              icon: 'mdi-jump-rope',
              title: 'Egzersizler',
              to: '/panel/exercises'
            }
          ]
        },
        {
          icon: 'mdi-clipboard-list',
          title: 'E-Diyet',
          to: '/panel/e-diet-foods',
          children: [
            {
              icon: 'mdi-food',
              title: 'E-Diyet Besinleri',
              to: '/panel/e-diet-foods'
            },
          ]
        },
        {
          icon: 'mdi-virus-outline',
          title: 'Hastalıklar',
          to: '/panel/diseases'
        },
        {
          icon: 'mdi-folder-text',
          title: 'Makaleler',
          to: '/panel/blogs',
          children: [
            {
              icon: 'mdi-view-list',
              title: 'Kategoriler',
              to: '/panel/blog-categories'
            },
            {
              icon: 'mdi-note-text',
              title: 'Makaleler',
              to: '/panel/blogs'
            }
          ]
        },
      ],
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null
    }
  },
  methods: {
    initDarkMode() {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      darkMediaQuery.addEventListener('change', (e) => {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      })

      if (darkMediaQuery.matches) {
        console.log('change default light to dark theme')
        // need to set 0 sec timeout to set the dark more after mounted event, due to some bug in the framework
        setTimeout(() => {
          this.$vuetify.theme.dark = true
        }, 0)
      }
    },
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

<style scoped>

</style>
