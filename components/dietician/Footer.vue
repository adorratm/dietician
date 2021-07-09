<template>
  <client-only>
    <v-footer
      padless
      width='100%'
    >
      <v-card
        width='100%'
        flat
        tile
        class="text-center"
      >
        <v-divider></v-divider>
        <v-card-text>
          <v-btn
            v-if='!isEmpty(settings.settings.facebook)'
            class="mx-4"
            icon
            :href='settings.settings.facebook'
            target='_blank'
          >
            <v-icon size="24px">mdi mdi-facebook
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.twitter)'
            class="mx-4"
            icon
            :href='settings.settings.twitter'
            target='_blank'
          >
            <v-icon size="24px">mdi mdi-twitter
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.instagram)'
            class="mx-4"
            icon
            :href='settings.settings.instagram'
            target='_blank'
          >
            <v-icon size="24px">mdi mdi-instagram
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.linkedin)'
            class="mx-4"
            icon
            :href='settings.settings.linkedin'
            target='_blank'
          >
            <v-icon size="24px">mdi mdi-linkedin
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.youtube)'
            class="mx-4"
            icon
            :href='settings.settings.youtube'
            target='_blank'
          >
            <v-icon size="24px">mdi mdi-youtube
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="pt-0">
          <v-row>
            <v-col cols='12' sm='12' md='3' lg='2' xl='2' class='my-auto py-auto'>
              <nuxt-link to='/'
              >
                <v-img
                  v-if='!isEmpty(settings) && !isEmpty(settings.settings)'
                  :src='img_url + settings.settings.logo'
                  :lazy-src='img_url + settings.settings.logo'
                  :alt='settings.settings.company_name'
                  :style='!$vuetify.theme.dark ? "filter:invert(0%)" : "filter:invert(100%)"'
                  :aspect-ratio='1.77'
                  height='70'
                  contain
                />
              </nuxt-link>
            </v-col>
            <v-col cols='12' sm='12' md='6' lg='6' xl='6' class='my-auto py-auto'>
              {{ settings.settings.about_us }}
            </v-col>
          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols='12' sm='12' md='10' lg='11' xl='11' class='text-center justify-center mx-auto px-auto my-auto py-auto'>
              &copy; {{ new Date().getFullYear() }} - <nuxt-link to='/'>{{settings.settings.company_name}}</nuxt-link> Tüm Hakları Saklıdır.
            </v-col>
            <v-col cols='12' sm='12' md='2' lg='1' xl='1' class='text-center justify-center mx-auto px-auto'>
              <v-img src='https://mutfakyapim.com/images/mutfak/logo.png?v=1' lazy-src='https://mutfakyapim.com/images/mutfak/logo.png?v=1' contain height='25' style='filter:drop-shadow(1px 1px 1px black)' />
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-footer>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:['settings'],
  computed:{
    ...mapState(["fixed"]),
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  methods:{
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
  }
}
</script>

<style scoped>

</style>
