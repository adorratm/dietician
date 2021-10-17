<template>
  <div>
    <ValidationObserver v-slot='{ handleSubmit }'>
      <form
        @submit.prevent='handleSubmit(onRegister)'
        ref='userRegister'
        enctype='multipart/form-data'
      >
        <v-stepper flat v-model='e1'>
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
            <v-stepper-content step='1' class='px-0 pt-2'>
              <ValidationProvider
                name='Adınız ve Soyadınız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='Adınız ve Soyadınız' type='text' name='name' v-model='name' clearable outlined hide-details class='mb-2' />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>

              <ValidationProvider
                name='T.C. Kimlik Numaranız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='T.C. Kimlik Numaranız' type='text' name='tc' minlength='11' maxlength='11' v-model='tc' clearable outlined hide-details class='mb-2' />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>

              <ValidationProvider
                name='Email Adresiniz'
                rules='required|email'
                v-slot='{ errors }'
              >
                <v-text-field label='Email Adresiniz' type='email' name='email' v-model='email' clearable outlined hide-details class='mb-2' />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>

              <ValidationProvider
                name='Telefon Numaranız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='Telefon Numaranız' type='text' name='phone' minlength='11' maxlength='22' v-model='phone' clearable outlined hide-details class='mb-2' />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <ValidationProvider
                name='Şifreniz'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='Şifreniz' type='password' name='password' v-model='password' clearable outlined hide-details class='mb-2' />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <ValidationProvider
                name='Tekrar Şifreniz'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='Tekrar Şifreniz' type='password' name='password_confirmation' v-model='password_confirmation' clearable outlined hide-details class='mb-2' />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <button class='btn btn-primary btn-block btn-lg login-btn text-white' type='button' @click='changeStep'>
                Sonraki
              </button>
              <div class='login-or'>
                <span class='or-line'></span>
                <span class='span-or'>ya da</span>
              </div>
              <div class='text-center dont-have'>Hesabınız Var Mı?
                <NuxtLink to='/dietician-login' rel='dofollow' title='Giriş Yap'>Giriş Yapın.</NuxtLink>
              </div>
            </v-stepper-content>

            <v-stepper-content step='2' class='px-0 pt-2'>
              <ValidationProvider
                name='Hastane/Poliklinik Adı'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='Hastane/Poliklinik Adı' type='text' name='hospitalName' v-model='hospitalName' clearable outlined hide-details class='mb-2' />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <ValidationProvider
                name='Departmanınız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='Departmanınız' type='text' name='department' v-model='department' clearable outlined hide-details class='mb-2' />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <ValidationProvider
                name='İş Telefon Numaranız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field label='İş Telefon Numaranız' type='text' name='work_phone' minlength='11' maxlength='22' v-model='work_phone' clearable outlined hide-details class='mb-2' />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <ValidationProvider
                name='İş Telefon Numaranız 2'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field label='İş Telefon Numaranız 2' type='text' name='work_phone_2' minlength='11' maxlength='22' v-model='work_phone_2' clearable outlined hide-details class='mb-2' />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
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
                  outlined
                  hide-details
                  class='mb-2'
                  @click:clear='clearTowns'
                />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
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
                  outlined
                  hide-details
                  class='mb-2'
                  @click:clear='clearDistricts'
                />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
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
                  outlined
                  hide-details
                  class='mb-2'
                  @click:clear='clearNeighborhoods'
                />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
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
                  outlined
                  hide-details
                  class='mb-2'
                />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
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
                  outlined
                  class='mb-2'
                  hide-details
                ></v-textarea>
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
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
                  show-size
                  name='certificate_file'
                  outlined
                  placeholder='Diploma Örneği (PDF veya Görsel)'
                  accept='image/*,.pdf'
                  clearable
                  hide-details
                  class='mb-2'
                />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
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
                    placeholder='Kimlik İle Çekilmiş Fotoğraf Örneği'
                    accept='image/*'
                    clearable
                    outlined
                    hide-details
                    class='mb-2'
                  />
                <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <div class='row'>
                <div class='col-lg-6'>
                  <button class='btn btn-info btn-block btn-lg login-btn text-white' type='button' @click='e1 = 1'>Geri
                    Dön
                  </button>
                </div>
                <div class='col-lg-6'>
                  <button class='btn btn-primary btn-block btn-lg login-btn text-white' type='submit'>Kayıt Ol</button>
                </div>
              </div>
              <div class='login-or'>
                <span class='or-line'></span>
                <span class='span-or'>ya da</span>
              </div>
              <div class='text-center dont-have'>Hesabınız Var Mı?
                <NuxtLink to='/dietician-login' rel='dofollow' title='Giriş Yap'>Giriş Yapın.</NuxtLink>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'dietician-register',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  },
  mounted() {
    this.getCities()
  },
  data() {
    return {
      tab: null,
      tabs: [{ tab: 'Kayıt Ol' }, { tab: 'Giriş Yap' }],
      e1: 1,
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
      company_address: null,
      country: { cities: [], towns: [], districts: [], neighborhoods: [] }
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
        }).catch((err) => console.log(err))
    },
    getTowns: function(item) {
      if (!this.isEmpty(item) && !this.isEmpty(item.towns)) {
        this.$axios
          .get(process.env.apiBaseUrl + 'informations/towns?id=' + item.towns)
          .then(response => {
            this.country.towns =
              response.data.towns.length > 0 ? response.data.towns : []
            this.country.districts = []
            this.country.neighborhoods = []
            this.company_district = null
            this.company_neighborhood = null
          }).catch((err) => console.log(err))
      }
    },
    getDistricts: function(item) {
      if (!this.isEmpty(item) && !this.isEmpty(item.districts)) {
        this.$axios
          .get(
            process.env.apiBaseUrl + 'informations/districts?id=' + item.districts
          )
          .then(response => {
            this.country.districts =
              response.data.districts.length > 0 ? response.data.districts : []
            this.country.neighborhoods = []
            this.company_neighborhood = null
          }).catch((err) => console.log(err))
      }
    },
    getNeighborhoods: function(item) {
      if (!this.isEmpty(item) && !this.isEmpty(item.neighborhoods)) {
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
          }).catch((err) => console.log(err))
      }
    },
    clearTowns(){
      this.country.towns = [];
      this.country.districts = [];
      this.country.neighborhoods = [];
      this.company_town = null;
      this.company_district = null;
      this.company_neighborhood = null;
    },
    clearDistricts(){
      this.country.districts = [];
      this.country.neighborhoods = [];
      this.company_district = null;
      this.company_neighborhood = null;
    },
    clearNeighborhoods(){
      this.country.neighborhoods = [];
      this.company_neighborhood = null;
    },
    changeStep(){
      if(!this.isEmpty(this.name) && !this.isEmpty(this.tc) && !this.isEmpty(this.email) && !this.isEmpty(this.phone) && !this.isEmpty(this.password) && !this.isEmpty(this.password_confirmation)){
        this.e1 = 2
      }else{
        this.$izitoast.error({title:"Başarısız!",message:"Alanları Doldurduğunuzdan Emin Olup, Lütfen Tekrar Deneyin.",position:"topCenter"});
      }
    }
  }
}
</script>

<style scoped>

</style>
