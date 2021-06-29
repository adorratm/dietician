<template>
  <v-container>
    <client-only>
      <v-card  class='mb-3 pb-0' color='#15558d'>
        <v-card-text class='pa-0'>
          <v-breadcrumbs
            large
            divider='/'
            :items='items'
          >
            <template v-slot:divider>
              <v-icon class='white--text'>mdi-forward</v-icon>
            </template>
            <template v-slot:item='{item}'>
              <v-breadcrumbs-item :href='item.href' :disabled='item.disabled'><a class='white--text'>{{ item.text }}</a>
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-card-text>
      </v-card>
      <v-row align='center' no-gutters>
        <v-col cols='12' sm='12' md='8' lg='6' xl='6' offset-md='2' offset-lg='3' align-content='center' align-self='center'>
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
        <v-col cols='12' sm='12' md='8' lg='6' xl='6' offset-md='2' offset-lg='3' align-content='center' align-self='center'>
          <v-tabs v-model='tab' background-color='primary' dark fixed-tabs>
            <v-tab v-for='item in tabs' :key='item.tab'>
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model='tab'>
            <v-tab-item eager >
              <ValidationObserver v-slot='{ handleSubmit }'>
                <form
                  @submit.prevent='handleSubmit(onRegister)'
                  ref='userRegister'
                  enctype='multipart/form-data'
                >
                  <v-card  outlined>
                    <v-card-text>
                      <ValidationProvider
                        name='Adınız ve Soyadınız'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <v-text-field
                          label='Adınız ve Soyadınız'
                          hide-details='auto'
                          type='text'
                          name='name'
                          v-model='name'
                          clearable
                        ></v-text-field>
                        <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                          {{errors[0]}}
                        </v-alert>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Email Adresiniz'
                        rules='required|email'
                        v-slot='{ errors }'
                      >
                        <v-text-field
                          label='Email Adresiniz'
                          hide-details='auto'
                          type='email'
                          name='email'
                          v-model='email'
                          clearable
                        ></v-text-field>
                        <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                          {{errors[0]}}
                        </v-alert>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Telefon Numaranız'
                        rules='required|phone'
                        v-slot='{ errors }'
                      >
                        <v-text-field
                          label='Telefon Numaranız'
                          hide-details='auto'
                          type='text'
                          name='phone'
                          v-model='phone'
                          clearable
                        ></v-text-field>
                        <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                          {{errors[0]}}
                        </v-alert>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Şifreniz'
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
                      <ValidationProvider
                        name='Tekrar Şifreniz'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <v-text-field
                          label='Tekrar Şifreniz'
                          hide-details='auto'
                          type='password'
                          name='password_confirmation'
                          v-model='password_confirmation'
                          clearable
                        ></v-text-field>
                        <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                          {{errors[0]}}
                        </v-alert>
                      </ValidationProvider>
                      <v-row class='mt-3'>
                        <v-col cols='12' sm='6' md='6' lg='6' xl='6'>
                          <v-btn color='primary' block type='submit'>
                            Kayıt Ol
                          </v-btn>
                        </v-col>
                        <v-col cols='12' sm='6' md='6' lg='6' xl='6'>
                          <v-btn
                            to='/dietician-register'
                            color='warning'
                            block
                          >Diyetisyen Kaydı
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </form>
              </ValidationObserver>
            </v-tab-item>
            <v-tab-item eager>
              <ValidationObserver v-slot='{ handleSubmit }'>
                <form
                  @submit.prevent='handleSubmit(onLogin)'
                  ref='userLogin'
                  enctype='multipart/form-data'
                >
                  <v-card  outlined>
                    <v-card-text>
                      <ValidationProvider
                        name='Email Adresiniz'
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
                        name='Şifreniz'
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
                        <v-col cols='12' sm='6' md='4' lg='4' xl='4'>
                          <v-btn color='primary' block type='submit' >
                            Giriş Yap
                          </v-btn>
                        </v-col>
                        <v-col cols='12' sm='6' md='4' lg='4' xl='4'>
                          <v-btn block to='/dietician-login' color='warning'
                          >Diyetisyen Girişi
                          </v-btn
                          >
                        </v-col>
                        <v-col cols='12' sm='12' md='4' lg='4' xl='4'>
                          <v-btn
                            block
                            to='/forgot-password'
                            color='error'

                          >Şifremi Unuttum
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
import { Base64 } from 'js-base64'
import Cookie from 'js-cookie'

export default {
  name: 'index.vue',
  middleware: ['auth2'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed:{
    settings(){
      return !this.isEmpty(Cookie.get("settings")) ? JSON.parse(Base64.decode(Cookie.get("settings"))) : {}
    }
  },
  mounted() {
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
          text: 'Danışan Kaydı',
          disabled: false,
          href: 'javascript:void(0)'
        }
      ],
      tab: null,
      tabs: [ { tab: 'Kayıt Ol' },{ tab: 'Giriş Yap' },],
      isUser: true,
      isDietician: false,
      email: null,
      password: null,
      password_confirmation: null,
      name: null,
      phone: null,
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
    /**
     * User Login Method
     */
    async onLogin() {
      let formData = new FormData(this.$refs.userLogin)
      formData.append('isUser', this.isUser)
      formData.append('isDietician', this.isDietician)
      try {
        let response = await this.$auth.loginWith('user', {
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
          setTimeout(event => {
            if (!this.isEmpty(this.$route.query.url)) {
              window.location.href = decodeURIComponent(this.$route.query.url)
            } else {
              this.$router.go('/profile')
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
    },
    /**
     * User Register Method
     */
    onRegister() {
      let formData = new FormData(this.$refs.userRegister)
      formData.append('isUser', this.isUser)
      formData.append('isDietician', this.isDietician)
      this.$store.dispatch('RegisterUser', formData).then(response => {
        if (response.success) {
          this.$izitoast.success({
            title: response.title,
            message: response.msg,
            position: 'topCenter'
          })
        } else {
          this.$izitoast.error({
            title: response.title,
            message: response.msg,
            position: 'topCenter'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
