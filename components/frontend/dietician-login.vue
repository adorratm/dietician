<template>
<div>
  <!-- Login Form -->
  <ValidationObserver v-slot='{ handleSubmit }'>
    <form
      @submit.prevent='handleSubmit(onLogin)'
      ref='userLogin'
      enctype='multipart/form-data'
    >
          <ValidationProvider
            name='Email Adresiniz'
            rules='required|email'
            v-slot='{ errors }'
          >
            <v-text-field label='Email Adresiniz' type='email' name='email' v-model='email' clearable outlined hide-details class='mb-2' />
            <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
              {{errors[0]}}
            </v-alert>
          </ValidationProvider>
          <ValidationProvider
            name='Şifreniz'
            rules='required'
            v-slot='{ errors }'
          >
            <v-text-field label='Şifreniz' type='password' name='password' v-model='password' clearable outlined hide-details class='mb-2' />
            <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
              {{errors[0]}}
            </v-alert>
          </ValidationProvider>
          <div class='text-right'>
            <NuxtLink class='forgot-link' rel='dofollow' title='Şifremi Unuttum' to='/dietician-forgot-password'>Şifrenizi Unuttunuz Mu?</NuxtLink>
          </div>
          <button class='btn btn-primary text-white btn-block btn-lg login-btn' type='submit'>Giriş Yap</button>
          <div class='login-or'>
            <span class='or-line'></span>
            <span class='span-or'>ya da</span>
          </div>
          <div class='text-center dont-have'>Hesabınız Yok Mu?
            <NuxtLink to='/dietician-register' rel='dofollow' title='Kayıt Ol'>Kayıt Olun.</NuxtLink>
          </div>
    </form>
  </ValidationObserver>
  <!-- /Login Form -->
</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'login',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      try {
        if (typeof obj == 'number') return false
        else if (typeof obj == 'string') return obj.length === 0
        else if (Array.isArray(obj)) return obj.length === 0
        else if (typeof obj == 'object')
          return obj == null || Object.keys(obj).length === 0
        else if (typeof obj == 'boolean') return false
        else return !obj
      }catch (e){
        console.log(e)
      }
    },
    /**
     * User Login Method
     */
    async onLogin() {
      try {
        let formData = new FormData(this.$refs.userLogin)
        formData.append('isUser', true)
        formData.append('isDietician', true)
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
          setTimeout(event => {
            if (!this.isEmpty(this.$route.query.url)) {
              window.location.href = decodeURIComponent(this.$route.query.url)
            } else {
              window.location.href = '/profile'
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
