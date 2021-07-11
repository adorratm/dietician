<template>
  <client-only>
    <v-footer
      absolute
      app
      padless
      width='100%'
    >
      <v-card
        class='text-center'
        flat
        tile
        width='100%'
      >
        <v-divider></v-divider>
        <v-card-text>
          <v-btn
            v-if='!isEmpty(settings.settings.facebook)'
            :href='settings.settings.facebook'
            class='mx-4'
            icon
            target='_blank'
          >
            <v-icon size='24px'>mdi mdi-facebook
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.twitter)'
            :href='settings.settings.twitter'
            class='mx-4'
            icon
            target='_blank'
          >
            <v-icon size='24px'>mdi mdi-twitter
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.instagram)'
            :href='settings.settings.instagram'
            class='mx-4'
            icon
            target='_blank'
          >
            <v-icon size='24px'>mdi mdi-instagram
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.linkedin)'
            :href='settings.settings.linkedin'
            class='mx-4'
            icon
            target='_blank'
          >
            <v-icon size='24px'>mdi mdi-linkedin
            </v-icon>
          </v-btn>
          <v-btn
            v-if='!isEmpty(settings.settings.youtube)'
            :href='settings.settings.youtube'
            class='mx-4'
            icon
            target='_blank'
          >
            <v-icon size='24px'>mdi mdi-youtube
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class='pt-0'>
          <v-row>
            <v-col class='my-auto py-auto' cols='12' lg='2' md='3' sm='12' xl='2'>
              <nuxt-link to='/'
              >
                <v-img
                  v-if='!isEmpty(settings) && !isEmpty(settings.settings)'
                  :alt='settings.settings.company_name'
                  :aspect-ratio='1.77'
                  :lazy-src='img_url + settings.settings.logo'
                  :src='img_url + settings.settings.logo'
                  :style='!$vuetify.theme.dark ? "filter:invert(0%)" : "filter:invert(100%)"'
                  contain
                  height='70'
                />
              </nuxt-link>
            </v-col>
            <v-col class='my-auto py-auto' cols='12' lg='6' md='6' sm='12' xl='6'>
              {{ settings.settings.about_us }}
            </v-col>
          </v-row>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col class='text-center justify-center mx-auto px-auto my-auto py-auto' cols='12' lg='11' md='10' sm='12'
                   xl='11'>
              &copy; {{ new Date().getFullYear() }} -
              <nuxt-link to='/'>{{ settings.settings.company_name }}</nuxt-link>
              Tüm Hakları Saklıdır.
            </v-col>
            <v-col class='text-center justify-center mx-auto px-auto' cols='12' lg='1' md='2' sm='12' xl='1'>
              <v-img contain
                     height='25' lazy-src='https://mutfakyapim.com/images/mutfak/logo.png?v=1' src='https://mutfakyapim.com/images/mutfak/logo.png?v=1'
                     style='filter:drop-shadow(1px 1px 1px black)' />
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
  props: ['settings'],
  computed: {
    ...mapState(['fixed']),
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  methods: {
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
