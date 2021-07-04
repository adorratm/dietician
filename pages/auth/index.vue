<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-row align='center' no-gutters>
        <v-col cols='12' sm='12' md='6' lg='6' xl='6' offset-md='3' align-content='center' align-self='center'>
          <figure class='image is-3by2'>
            <v-img
              :alt='settings.company_name'
              lazy-src='/img/login.jpg?webp'
              max-height='750'
              max-width='1000'
              src='/img/login.jpg?webp'
              type='image/webp'
            ></v-img>
          </figure>
        </v-col>
        <v-col cols='12' sm='12' md='6' lg='6' xl='6' offset-md='3' align-content='center' align-self='center'>
          <v-tabs v-model='tab' background-color='primary' dark fixed-tabs>
            <v-tab v-for='item in tabs' :key='item.tab'>
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model='tab'>
            <v-tab-item eager>
              <ValidationObserver v-slot='{ handleSubmit }'>
                <form
                  @submit.prevent='handleSubmit(onSubmit)'
                  ref='userLogin'
                  enctype='multipart/form-data'
                >
                  <v-card  outlined>
                    <v-card-text>
                      <ValidationProvider
                        name='email'
                        rules='required|email'
                        v-slot='{ errors }'
                      >
                          <v-text-field
                            label='Email Adresiniz'
                            hide-details='auto'
                            name='email'
                            v-model='email'
                            clearable
                          ></v-text-field>
                          <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                            {{errors[0]}}
                          </v-alert>
                      </ValidationProvider>
                      <ValidationProvider
                        name='password'
                        rules='required'
                        v-slot='{ errors }'
                      >
                          <v-text-field
                            label='Şifreniz'
                            hide-details='auto'
                            type='password'
                            name='password'
                            v-model='password'
                            clearable
                          ></v-text-field>
                          <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                            {{errors[0]}}
                          </v-alert>
                      </ValidationProvider>
                      <v-row class='mt-3'>
                        <v-col cols='12' sm='12' md='12' lg='12' xl='12'>
                          <v-btn color='primary' type='submit' block>
                            Giriş Yap
                          </v-btn>
                        </v-col>
                      </v-row>

                    </v-card-text>
                  </v-card>

                </form>
              </ValidationObserver>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Cookie from 'js-cookie'
import { Base64 } from 'js-base64'
import Breadcrumb from '@/components/includes/Breadcrumb'
export default {
  layout: 'adminlogin',
  middleware: ['notadmin'],
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  computed: {
    settings() {
      return !this.isEmpty(Cookie.get('settings')) ? JSON.parse(Base64.decode(Cookie.get('settings'))) : {}
    }
  },
  data() {
    return {
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Admin Girişi',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      tab: null,
      tabs: [{ tab: 'Admin Girişi' }],
      isUser: false,
      isAdmin: true,
      email: null,
      password: null
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
    },
    async onSubmit() {
      let formData = new FormData(this.$refs.userLogin)
      formData.append('isUser', this.isUser)
      formData.append('isAdmin', this.isAdmin)
      try {
        let response = await this.$auth.loginWith('admin', {
          data: formData
        })
        if (response.data.success) {
          this.$izitoast.success({
            title: response.data.title,
            message: response.data.msg,
            position: 'topCenter'
          })
          this.$auth.setUser(response.data.user)
          this.$auth.$storage.setUniversal('user', response.data.user)
          setTimeout(() => {
            if (!this.isEmpty(this.$route.query.url)) {
              window.location.href = decodeURIComponent(this.$route.query.url)
            } else {
              this.$router.go('/panel')
            }
          }, 2000)
        } else {
          this.$izitoast.error({
            title: response.data.title,
            message: response.data.msg,
            position: 'topCenter'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
