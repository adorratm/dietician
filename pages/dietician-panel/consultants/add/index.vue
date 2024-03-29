<template>
  <div>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

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
                  <div class='form-group'>
                    <v-text-field
                      label='Danışanın Kimlik Numarası'
                      name='tc'
                      v-model='consultant.tc'
                      counter='11'
                      clearable
                      outlined
                      hide-details
                    ></v-text-field>
                    <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name='Danışanın Telefon Numarası'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <div class='form-group'>
                    <v-text-field
                      label='Danışanın Telefon Numarası'
                      name='phone'
                      v-model='consultant.phone'
                      counter='11'
                      clearable
                      outlined
                      hide-details
                    ></v-text-field>
                    <v-alert dismissible type='warning' dense  v-show='errors[0]' class='my-1'>
                      {{errors[0]}}
                    </v-alert>
                  </div>
                </ValidationProvider>
                <v-btn color='primary' type='submit'>
                  Danışanı Bul ve Diyetisyen Bildirimi Gönder
                </v-btn>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>

        <!-- General -->
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Editor from '@tinymce/tinymce-vue'
import Breadcrumb from '~/components/backend/breadcrumb'

export default {
  name: 'consultants-add',
  middleware: ["auth","dietician"],
  layout: 'dietician',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    user(){
      return this.$auth.user
    }
  },
  components:{
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor,
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/dietician-panel"},
        {name: "Danışanlarım",url:"/dietician-panel/consultants"},
        {name: "Danışan Ekle"},
      ],
      rules: [
        value => !!value || 'Zorunludur.',
        value =>
          (value && value.length >= 3) || 'Alanı Minimum 11 Karakter Olmalıdır'
      ],
      consultant: { tc: null, phone: null },
    }
  },
  methods:{
    isEmpty(obj) {
      try {
        if (typeof obj == 'number') return false
        else if (typeof obj == 'string') return obj.length === 0
        else if (Array.isArray(obj)) return obj.length === 0
        else if (typeof obj == 'object')
          return obj == null || Object.keys(obj).length === 0
        else if (typeof obj == 'boolean') return false
        else return !obj
      }catch (e) {
        console.log(e)
      }
    },
    saveConsultants() {
      try {
        let formData = new FormData(this.$refs.usersForm)
        formData.append('dietician_id', this.user._id)
        this.$axios
          .post(process.env.apiBaseUrl + 'dietician/users/user-mail', formData, {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=' + formData._boundary
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
          }).catch((e) => {console.log(e)})
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
