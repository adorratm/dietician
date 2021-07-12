<template>
  <div>
    <div class='breadcrumb-bar'>
      <v-container fluid>
        <nav aria-label='breadcrumb' class='page-breadcrumb'>
          <ol class='breadcrumb pl-0'>
            <li class='breadcrumb-item'>
              <nuxt-link to='/'>Anasayfa</nuxt-link>
            </li>
            <li aria-current='page' class='breadcrumb-item active'>
              Profil
            </li>
          </ol>
        </nav>
        <h2 class='breadcrumb-title'>Profil</h2>
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
            <div class='card card-table'>
              <div class='card-header'>
                <div class='card-title my-auto'>
                  <h4 class='my-auto'>Şifre Güncelle</h4>
                </div>
              </div>
              <div class='card-body'>
                <ValidationObserver v-slot='{ handleSubmit }'>
                  <form
                    ref='passwordUpdateForm'
                    enctype='multipart/form-data'
                    @submit.prevent='handleSubmit(updatePassword)'
                  >
                    <div class='table-responsive'>
                      <table
                        class='table table-striped table-hover table-center table-borderless mb-0'
                        style='border-top: none'
                      >
                        <tbody>
                        <tr>
                          <td><b>Mevcut Şifreniz :</b></td>
                          <td colspan='2'>
                            <ValidationProvider
                              v-slot='{ errors }'
                              name='Mevcut Şifreniz'
                              rules='required'
                            >
                              <input
                                id='current_password'
                                v-model='current_password'
                                class='form-control'
                                name='current_password'
                                required
                                type='password'
                              />
                              <small class='font-weight-bold text-danger'>{{
                                  errors[0]
                                }}</small>
                            </ValidationProvider>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Yeni Şifreniz :</b></td>
                          <td colspan='2'>
                            <ValidationProvider
                              v-slot='{ errors }'
                              name='Yeni Şifreniz'
                              rules='required'
                            >
                              <input
                                id='password'
                                v-model='password'
                                class='form-control'
                                name='password'
                                required
                                type='password'
                              />
                              <small class='font-weight-bold text-danger'>{{
                                  errors[0]
                                }}</small>
                            </ValidationProvider>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Tekrar Yeni Şifreniz :</b></td>
                          <td colspan='2'>
                            <ValidationProvider
                              v-slot='{ errors }'
                              name='Tekrar Yeni Şifreniz'
                              rules='required'
                            >
                              <input
                                id='password_confirmation'
                                v-model='password_confirmation'
                                class='form-control'
                                name='password_confirmation'
                                required
                                type='password'
                              />
                              <small class='font-weight-bold text-danger'>{{
                                  errors[0]
                                }}</small>
                            </ValidationProvider>
                          </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td colspan='3'>
                            <div class='form-group'>
                              <button
                                class='btn btn-green-light float-right'
                                type='submit'
                              >
                                Şifremi Güncelle
                              </button>
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
      password: null,
      password_confirmation: null,
      current_password: null,
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null
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
    updatePassword() {
      let formData = new FormData(this.$refs.passwordUpdateForm)
      formData.append('api_token', this.userData.api_token)
      this.$axios
        .post(
          process.env.apiBaseUrl +
          (!this.isEmpty(this.userData) &&
          this.userData.status === 'dietician'
            ? 'dietician/profile/pass_update'
            : 'users/pass_update'),
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
