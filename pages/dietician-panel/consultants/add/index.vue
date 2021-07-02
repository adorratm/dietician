<template>
  <v-container>
    <client-only>
      <v-card class='mb-3 pb-0' color='#15558d'>
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
      <v-card>
        <v-card-title>
          Danışan Ekle
          <v-btn
            to='/dietician-panel/consultants/new-consultant'
            class='justify-content-end ml-auto my-auto py-auto'
            color='primary'
          >
            <v-icon>mdi mdi-plus</v-icon>
            Yeni Danışan Kaydet
          </v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-alert color='indigo' dark dense icon='mdi-information' prominent>
            <h3 class='headline'>Bilgi</h3>
            <div>
              Danışan Kaydı Yapabilmeniz İçin Aşağıdaki Bilgileri Doldurup
              Danışanınıza İstek Gönderebilirsiniz.
            </div>

            <v-divider class='my-4 info' style='opacity: 0.22'></v-divider>

            <div>
              Gönderdiğiniz İstek Danışanınız Tarafından Kabul Edildikten Sonra
              E-Diyet, Egzersiz, Randevu Oluşturma Gibi İşlemler Yapılabilir.
            </div>
          </v-alert>
          <ValidationObserver v-slot='{ handleSubmit }'>
            <form
              @submit.prevent='handleSubmit(saveConsultants)'
              ref='usersForm'
              enctype='multipart/form-data'
            >
              <ValidationProvider
                name='Danışanın Kimlik Numarası'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  label='Danışanın Kimlik Numarası'
                  name='tc'
                  v-model='consultant.tc'
                  counter='11'
                  clearable
                ></v-text-field>
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
              <ValidationProvider
                name='Danışanın Telefon Numarası'
                rules='required'
                v-slot='{ errors }'
              >
              <v-text-field
                label='Danışanın Telefon Numarası'
                name='phone'
                v-model='consultant.phone'
                counter='11'
                clearable
              ></v-text-field>
              <v-alert type='warning' dense  v-show='errors[0]' class='my-1'>
                {{errors[0]}}
              </v-alert>
              </ValidationProvider>
              <v-btn color='primary' type='submit'>
                Danışanı Bul ve Diyetisyen Bildirimi Gönder
              </v-btn>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: ['dietician'],
  layout: 'dietician',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      data: null,
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyen Paneli',
          disabled: false,
          href: '/dietician-panel/'
        },
        {
          text: 'Danışanlarım',
          disabled: false,
          href: '/dietician-panel/consultants'
        },
        {
          text: 'Danışan Ekle',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      rules: [
        value => !!value || 'Zorunludur.',
        value =>
          (value && value.length >= 3) || 'Alanı Minimum 11 Karakter Olmalıdır'
      ],
      consultant: { tc: null, phone: null },
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null
    }
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  beforeCreate() {
    this.$store.dispatch('getSettings')
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
    saveConsultants() {
      let formData = new FormData(this.$refs.usersForm)
      formData.append('dietician_id', this.userData._id)
      this.$axios
        .post(process.env.apiBaseUrl + 'dietician/users/user-mail', formData, {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=' + formData._boundary,
            Authorization: 'Bearer ' + this.userData.api_token
          }
        })
        .then(response => {
          if (response.data.success) {
            this.$izitoast.success({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
            this.data = response.data.data
            setTimeout(() => {
              this.$router.go(
                decodeURIComponent('/dietician-panel/consultants')
              )
            }, 2000)
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
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
