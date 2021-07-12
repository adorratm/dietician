<template>
  <div>
    <div class='breadcrumb-bar'>
      <v-container fluid
      >
        <nav aria-label='breadcrumb' class='page-breadcrumb'>
          <ol class='breadcrumb pl-0'>
            <li class='breadcrumb-item'>
              <nuxt-link to='/'>Anasayfa</nuxt-link>
            </li>
            <li aria-current='page' class='breadcrumb-item active'>
              Sosyal Medya Ayarlarım
            </li>
          </ol>
        </nav>
        <h2 class='breadcrumb-title'>Sosyal Medya Ayarlarım</h2>
      </v-container>
    </div>
    <div class='content'>
      <v-container fluid>
        <v-row>
          <v-col
            cols='12'
            lg='4'
            md='5'
            sm='12'
            xl='3'
          >
          </v-col>

          <v-col cols='12' lg='8' md='7' sm='12' xl='9'>
            <div class='card card-table my-0'>
              <div class='card-header'>
                <div class='card-title my-auto'>
                  <h4 class='my-auto'>Sosyal Medya Ayarlarım</h4>
                </div>
              </div>
              <div class='card-body'>
                <ValidationObserver v-slot='{ handleSubmit }'>
                  <form
                    ref='socialMediaUpdateForm'
                    enctype='multipart/form-data'
                    @submit.prevent='handleSubmit(updateSocialMedia)'
                  >
                    <div class='table-responsive'>
                      <table
                        class='table table-striped table-hover table-center table-borderless mb-0'
                        style='border-top: none'
                      >
                        <tbody>
                        <tr>
                          <td><b>Facebook :</b></td>
                          <td colspan='2'>
                            <input
                              id='facebook'
                              v-model='userData.facebook'
                              class='form-control'
                              name='facebook'
                              type='text'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><b>Instagram :</b></td>
                          <td colspan='2'>
                            <input
                              id='instagram'
                              v-model='userData.instagram'
                              class='form-control'
                              name='instagram'
                              type='text'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><b>Linkedin :</b></td>
                          <td colspan='2'>
                            <input
                              id='linkedin'
                              v-model='userData.linkedin'
                              class='form-control'
                              name='linkedin'
                              type='text'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><b>Twitter :</b></td>
                          <td colspan='2'>
                            <input
                              id='twitter'
                              v-model='userData.twitter'
                              class='form-control'
                              name='twitter'
                              type='text'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><b>Youtube :</b></td>
                          <td colspan='2'>
                            <input
                              id='youtube'
                              v-model='userData.youtube'
                              class='form-control'
                              name='youtube'
                              type='text'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><b>Medium :</b></td>
                          <td colspan='2'>
                            <input
                              id='medium'
                              v-model='userData.medium'
                              class='form-control'
                              name='medium'
                              type='text'
                            />
                          </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td colspan='3'>
                            <div class='form-group'>
                              <v-btn
                                class='float-right'
                                color='primary'
                                type='submit'
                              >
                                Sosyal Medya Bilgilerimi Güncelle
                              </v-btn>
                            </div>
                          </td>
                        </tr>
                        </tfoot>
                      </table>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: ['auth'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  mounted() {
    let inputs = document.querySelectorAll('.v-file-input input');
    [...inputs].forEach(input => {
      input.remove()
    })
  },
  data() {
    return {
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null
    }
  },

  methods: {
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length == 0
      else if (Array.isArray(obj)) return obj.length == 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length == 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    logout() {
      this.$auth.logout()
      this.$auth.$storage.removeUniversal('user')
      this.$auth.strategy.refreshToken.reset()
      this.$auth.strategy.token.reset()
      this.$auth.reset()
      this.$izitoast.success({
        title: 'Başarılı!',
        message: 'Başarıyla Çıkış Yaptınız Yönlendiriliyorsunuz.',
        position: 'topCenter'
      })
      setTimeout(() => {
        this.$router.go('/')
      }, 2000)
    },
    updateSocialMedia() {
      let formData = new FormData(this.$refs.socialMediaUpdateForm)
      formData.append('api_token', this.userData.api_token)
      this.$axios
        .post(
          process.env.apiBaseUrl +
          (this.userData.status === 'dietician'
            ? 'dietician/profile/update'
            : 'users/update'),
          formData,
          {
            json: true,
            withCredentials: false,
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers':
                'Origin, Content-Type, X-Auth-Token, Authorization',
              'Access-Control-Allow-Methods':
                'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Credentials': true,
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
            this.$auth.setUser(response.data.data)
            this.$auth.$storage.setUniversal('user', response.data.data)
            this.$auth.strategy.token.set(
              this.$auth.$storage.getUniversal('user').api_token
            )
            setTimeout(() => {
              this.$router.go('/profile')
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
