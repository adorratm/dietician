<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-card-text>
          <ValidationObserver v-slot='{ handleSubmit }'>
            <form
              @submit.prevent='handleSubmit(editDieticians)'
              ref='dieticiansForm'
              enctype='multipart/form-data'
            >
              <v-tabs show-arrows v-model='tab' background-color='primary'
                      dark>
                <v-tab>
                  Genel Bilgiler
                </v-tab>
                <v-tab>
                  Sosyal Medya
                </v-tab>
                <v-tab>
                  İş Yeri Bilgileri
                </v-tab>
                <v-tabs-items v-model='tab'>
                  <v-tab-item eager>
                    <ValidationProvider
                      name='Adınız ve Soyadınız'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        label='Adınız ve Soyadınız'
                        id='title'
                        type='text'
                        name='name'
                        v-model='data.name'
                        clearable
                      />
                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                        id='tc'
                        type='text'
                        name='tc'
                        v-model='data.tc'
                        clearable
                      />
                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                        id='company_name'
                        type='text'
                        name='email'
                        v-model='data.email'
                        clearable
                      />
                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                        id='phone'
                        type='text'
                        name='phone'
                        v-model='data.phone'
                        clearable
                      />
                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                    <v-row>
                      <v-col cols='3' sm='3' md='3' lg='3' xl='3' class='justify-center text-center my-auto py-auto'>
                        <v-img
                          :src='img_url + data.img_url'
                          :lazy-src='img_url + data.img_url'
                          :alt='data.name'
                          width='150'
                          height='150'
                          contain
                        />
                      </v-col>
                      <v-col cols='9' sm='9' md='9' lg='9' xl='9' class='justify-center text-center my-auto py-auto'>
                        <v-file-input
                          label='Kullanıcı Görseli'
                          v-model='data.img_url'
                          id='img_url'
                          type='file'
                          ref='img_url'
                          name='img_url'
                          class='form-control'
                          clearable
                        />
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <v-tab-item eager>
                    <ValidationProvider
                      name='Facebook'
                      rules=''
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        label='Facebook'
                        id='facebook'
                        type='text'
                        name='facebook'
                        v-model='data.facebook'
                        clearable
                      />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }}</v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Twitter'
                      rules=''
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Twitter'
                          id='twitter'
                          type='text'
                          name='twitter'
                          v-model='data.twitter'
                          clearable
                        />
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Instagram'
                      rules=''
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Instagram'
                          id='instagram'
                          type='text'
                          name='instagram'
                          v-model='data.instagram'
                          clearable
                        />
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Linkedin'
                      rules=''
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Linkedin'
                          id='linkedin'
                          type='text'
                          name='linkedin'
                          v-model='data.linkedin'
                          clearable
                        />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Youtube'
                      rules=''
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Youtube'
                          id='youtube'
                          type='text'
                          name='youtube'
                          v-model='data.youtube'
                          clearable
                        />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                  </v-tab-item>
                  <v-tab-item eager>
                    <ValidationProvider
                      name='Hastane/Poliklinik Adı'
                      rules='required'
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Hastane/Poliklinik Adı'
                          id='hospitalName'
                          type='text'
                          name='hospitalName'
                          v-model='data.hospitalName'
                          clearable
                        />
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Departmanınız'
                      rules='required'
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Departmanınız'
                          id='department'
                          type='text'
                          name='department'
                          v-model='data.department'
                          clearable
                        />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Telefon Numaranız'
                      rules='required'
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Telefon Numaranız'
                          id='work_phone'
                          type='text'
                          name='work_phone'
                          v-model='data.work_phone'
                          clearable
                        />
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Telefon Numaranız 2'
                      rules=''
                      v-slot='{ errors }'
                    >
                        <v-text-field
                          label='Telefon Numaranız 2'
                          id='work_phone_2'
                          type='text'
                          name='work_phone_2'
                          v-model='data.work_phone_2'
                          clearable
                        />
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name='Adresiniz'
                      rules='required'
                      v-slot='{ errors }'
                    >
                        <v-textarea
                          label='Adresiniz'
                          id='address'
                          type='text'
                          name='address'
                          v-model='data.company_address'
                          clearable
                        />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'> {{ errors[0] }} </v-alert>
                    </ValidationProvider>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
              <v-btn color='primary' class='mt-3'
                     type='submit'
              >
                Gönder
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
import Breadcrumb from '@/components/includes/Breadcrumb'

export default {
  middleware: ['auth', 'admin'],
  layout: 'admin',
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  data() {
    return {
      tab: null,
      items: [
        {
          text: 'Admin Paneli',
          disabled: false,
          href: '/panel'
        },
        {
          text: 'Diyetisyenler',
          disabled: false,
          href: '/panel/dieticians/'
        },
        {
          text: 'Diyetisyen Düzenle',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      data: {
        name: null,
        phone: null,
        email: null,
        facebook: null,
        twitter: null,
        instagram: null,
        youtube: null,
        linkedin: null,
        img_url: null,
        department: null,
        hospitalName: null,
        address: null,
        tc: null,
        work_phone: null,
        work_phone_2: null
      },
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'panel/dieticians/update/' + params.id
      )

      return data
    } catch (e) {
      error({ message: 'Diyetisyen Bilgisi Bulunamadı.', statusCode: 404 })
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
    editDieticians() {
      let formData = new FormData(this.$refs.dieticiansForm)
      this.$axios
        .post(
          process.env.apiBaseUrl + 'panel/dieticians/update/' + this.data._id,
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=' + formData._boundary,
              Authorization: 'Bearer ' + this.userData.api_token
            }
          }
        )
        .then(response => {
          if (response.data.success) {
            this.$izitoast.success({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
            setTimeout(() => {
              this.$router.go('/panel/dieticians')
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
