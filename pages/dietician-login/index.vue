<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-row align='center' no-gutters>
        <v-col cols='12' sm='12' md='12' lg='8' xl='6' offset-lg='2' offset-xl='3' align-content='center'
               align-self='center'>
          <figure class='image is-3by2'>
            <v-img
              :alt='settings.company_name'
              lazy-src='/img/dieticianlogin.jpg?webp'
              max-height='750'
              max-width='1000'
              src='/img/dieticianlogin.jpg?webp'
              type='image/webp'
            ></v-img>
          </figure>
        </v-col>
        <v-col cols='12' sm='12' md='12' lg='8' xl='6' offset-lg='2' offset-xl='3' align-content='center'
               align-self='center'>
          <v-tabs v-model='tab' background-color='primary' dark fixed-tabs>
            <v-tab v-for='item in tabs' :key='item.tab'>
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model='tab'>
            <v-tab-item eager>
              <ValidationObserver v-slot='{ handleSubmit }'>
                <form
                  @submit.prevent='handleSubmit(onLogin)'
                  ref='userLogin'
                  enctype='multipart/form-data'
                >
                  <v-card outlined>
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
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                          {{ errors[0] }}
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
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                          {{ errors[0] }}
                        </v-alert>
                      </ValidationProvider>
                      <v-row class='mt-3'>
                        <v-col cols='12' sm='6' md='4' lg='4' xl='4'>
                          <v-btn color='primary' block type='submit'>
                            Giriş Yap
                          </v-btn>
                        </v-col>
                        <v-col cols='12' sm='6' md='4' lg='4' xl='4'>
                          <v-btn block to='/login' color='warning'
                          >Kullanıcı Girişi
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
            <v-tab-item eager>
              <ValidationObserver v-slot='{ handleSubmit }'>
                <form
                  @submit.prevent='handleSubmit(onRegister)'
                  ref='userRegister'
                  enctype='multipart/form-data'
                >
                  <v-card outlined>
                    <v-card-text>
                      <v-stepper v-model='e1'>
                        <v-stepper-header>
                          <v-stepper-step :complete='e1 > 1' step='1'>
                            Kayıt Bilgileriniz
                          </v-stepper-step>

                          <v-divider></v-divider>

                          <v-stepper-step :complete='e1 > 2' step='2'>
                            Diploma / İşyeri Bilgileriniz
                          </v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                          <v-stepper-content step='1'>
                            <ValidationProvider
                              name='Adınız ve Soyadınız'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-text-field
                                label='Adınız ve Soyadınız'
                                hide-details='auto'
                                name='name'
                                v-model='name'
                                clearable
                              ></v-text-field>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>

                            <ValidationProvider
                              name='T.C. Kimlik Numaranız'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-text-field
                                label='T.C. Kimlik Numaranız'
                                hide-details='auto'
                                name='tc'
                                v-model='tc'
                                clearable
                              ></v-text-field>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
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
                                name='email'
                                v-model='email'
                                clearable
                              ></v-text-field>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>

                            <ValidationProvider
                              name='Telefon Numaranız'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-text-field
                                label='Telefon Numaranız'
                                hide-details='auto'
                                name='phone'
                                v-model='phone'
                                clearable
                              ></v-text-field>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
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
                                name='password'
                                type='password'
                                v-model='password'
                                clearable
                              ></v-text-field>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
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
                                name='password_confirmation'
                                type='password'
                                v-model='password_confirmation'
                                clearable
                              ></v-text-field>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <v-row class='mt-3'>
                              <v-col>
                                <v-btn color='primary' block @click='e1 = 2'>
                                  Sonraki
                                </v-btn>
                              </v-col>
                              <v-col>
                                <v-btn to='/register' block color='warning'
                                >Kullanıcı Kaydı
                                </v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-stepper-content>

                          <v-stepper-content step='2'>
                            <div class='form-group form-focus'>
                              <ValidationProvider
                                name='Hastane/Poliklinik Adı'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  label='Hastane/Poliklinik Adı'
                                  hide-details='auto'
                                  name='hospitalName'
                                  v-model='hospitalName'
                                  clearable
                                ></v-text-field>
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </div>
                            <div class='form-group form-focus'>
                              <ValidationProvider
                                name='Departmanınız'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  label='Departmanınız'
                                  hide-details='auto'
                                  name='department'
                                  v-model='department'
                                  clearable
                                ></v-text-field>
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </div>
                            <div class='form-group form-focus'>
                              <ValidationProvider
                                name='İş Telefon Numaranız'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  label='İş Telefon Numaranız'
                                  hide-details='auto'
                                  name='work_phone'
                                  v-model='work_phone'
                                  clearable
                                ></v-text-field>
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </div>
                            <div class='form-group form-focus'>
                              <ValidationProvider
                                name='Telefon Numaranız 2'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  label='İş Telefon Numaranız 2'
                                  hide-details='auto'
                                  name='work_phone_2'
                                  v-model='work_phone_2'
                                  clearable
                                ></v-text-field>
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </div>
                            <div class='form-group form-focus'>
                              <ValidationProvider
                                name='İşyerinizin Bulunduğu İl'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-autocomplete
                                  v-on:change='getTowns'
                                  name='company_city'
                                  id='company_city'
                                  v-model='company_city'
                                  :items='country.cities'
                                  item-value='name'
                                  item-text='name'
                                  label='İşyerinizin Bulunduğu İl'
                                  return-object
                                  clearable
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </div>
                            <ValidationProvider
                              name='İşyerinizin Bulunduğu İlçe'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-autocomplete
                                v-on:change='getDistricts'
                                name='company_town'
                                id='company_town'
                                v-model='company_town'
                                :items='country.towns'
                                item-value='name'
                                item-text='name'
                                label='İşyerinizin Bulunduğu İlçe'
                                return-object
                                clearable
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <ValidationProvider
                              name='İşyerinizin Bulunduğu Semt'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-autocomplete
                                v-on:change='getNeighborhoods'
                                name='company_district'
                                id='company_district'
                                v-model='company_district'
                                :items='country.districts'
                                item-value='name'
                                item-text='name'
                                label='İşyerinizin Bulunduğu Semt'
                                return-object
                                clearable
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <ValidationProvider
                              name='İşyerinizin Bulunduğu Mahalle'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-autocomplete
                                name='company_neighborhood'
                                id='company_neighborhood'
                                v-model='company_neighborhood'
                                :items='country.neighborhoods'
                                item-value='name'
                                item-text='name'
                                label='İşyerinizin Bulunduğu Mahalle'
                                return-object
                                clearable
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <ValidationProvider
                              name='İşyerinizin Adresi'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-textarea
                                name='company_address'
                                label='İşyerinizin Adresi'
                                value=''
                                clearable
                                v-model='company_address'
                              ></v-textarea>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <ValidationProvider
                              name='Diploma Örneği (PDF veya Görsel)'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-file-input
                                type='file'
                                name='certificate_file'
                                class='form-control rounded-0'
                                placeholder='Diploma Örneği (PDF veya Görsel)'
                                accept='image/*,.pdf'
                                clearable
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <ValidationProvider
                              name='Kimlik İle Çekilmiş Fotoğraf Örneği'
                              rules='required'
                              v-slot='{ errors }'
                            >
                              <v-file-input
                                type='file'
                                show-size
                                name='identity_file'
                                class='form-control rounded-0'
                                placeholder='Kimlik İle Çekilmiş Fotoğraf Örneği'
                                accept='image/*'
                                clearable
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                            <v-row class='mt-3'>
                              <v-col>
                                <v-btn color='info' block @click='e1 = 1'>Geri Dön</v-btn>
                              </v-col>
                              <v-col>
                                <v-btn color='primary' block type='submit'>Kayıt Ol</v-btn>
                              </v-col>
                              <v-col>
                                <v-btn to='/register' block color='warning'>Kullanıcı Kaydı</v-btn>
                              </v-col>
                            </v-row>
                          </v-stepper-content>
                        </v-stepper-items>
                      </v-stepper>
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
  middleware: ['auth'],
  auth: 'guest',
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
  mounted() {
    this.getCities()
    let inputs = document.querySelectorAll('.v-file-input input');
    [...inputs].forEach(input => {
      input.remove()
    })
  },
  data() {
    return {
      tab: null,
      tabs: [{ tab: 'Giriş Yap' }, { tab: 'Kayıt Ol' }],
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyen Girişi',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      e1: 1,
      country: { cities: [], towns: [], districts: [], neighborhoods: [] },
      isUser: true,
      isDietician: true,
      isAdmin: false,
      email: null,
      password: null,
      password_confirmation: null,
      name: null,
      tc: null,
      identity_file: null,
      certificate_file: null,
      phone: null,
      hospitalName: null,
      department: null,
      work_phone: null,
      work_phone_2: null,
      company_city: null,
      company_town: null,
      company_neighborhood: null,
      company_district: null,
      company_address: null
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
    getCities() {
      this.$axios
        .get(process.env.apiBaseUrl + 'informations/cities')
        .then(response => {
          this.country.cities =
            response.data.data.cities.length > 0
              ? response.data.data.cities
              : []
        })
    },
    getTowns: function(item) {
      this.$axios
        .get(process.env.apiBaseUrl + 'informations/towns?id=' + item.towns)
        .then(response => {
          this.country.towns =
            response.data.towns.length > 0 ? response.data.towns : []
          this.country.districts = []
          this.country.neighborhoods = []
          this.company_district = null
          this.company_neighborhood = null
        })
    },
    getDistricts: function(item) {

      this.$axios
        .get(
          process.env.apiBaseUrl + 'informations/districts?id=' + item.districts
        )
        .then(response => {
          this.country.districts =
            response.data.districts.length > 0 ? response.data.districts : []
          this.country.neighborhoods = []
          this.company_neighborhood = null
        })
    },
    getNeighborhoods: function(item) {

      this.$axios
        .get(
          process.env.apiBaseUrl +
          'informations/neighborhoods?id=' +
          item.neighborhoods
        )
        .then(response => {
          this.country.neighborhoods =
            response.data.neighborhoods.length > 0
              ? response.data.neighborhoods
              : []
        })
    },
    /**
     * User Login Method
     */
    async onLogin() {
      let formData = new FormData(this.$refs.userLogin)
      formData.append('isUser', this.isUser)
      formData.append('isDietician', this.isDietician)
      formData.append('isAdmin', this.isAdmin)
      try {
        let response = await this.$auth.loginWith('dietician', {
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
      formData.append('status', 'dietician')
      this.$store.dispatch('RegisterUser', formData).then(response => {
        if (response.success) {
          this.$izitoast.success({
            title: response.title,
            message: response.msg,
            position: 'topCenter'
          })
          setTimeout(() => {
            this.$router.go('/dietician-login')
          }, 2000)
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
