<template>
  <div>
    <ValidationObserver v-slot='{ handleSubmit }'>
      <form
        @submit.prevent='handleSubmit(onSubmit)'
        ref='userLogin'
        enctype='multipart/form-data'
      >
        <ValidationProvider
          name='Email Adresiniz'
          rules='required|email'
          v-slot='{ errors }'
        >
          <div class='form-group form-focus mb-2'>
            <v-text-field
              label='Email Adresiniz'
              hide-details='auto'
              name='email'
              v-model='email'
              outlined
              clearable
            ></v-text-field>
            <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-1'>
              {{ errors[0] }}
            </v-alert>
          </div>

        </ValidationProvider>
        <ValidationProvider
          name='Şifreniz'
          rules='required'
          v-slot='{ errors }'
        >
          <div class='form-group form-focus mb-2'>
            <v-text-field
              label='Şifreniz'
              hide-details='auto'
              type='password'
              name='password'
              outlined
              v-model='password'
              clearable
            ></v-text-field>
            <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-1'>
              {{ errors[0] }}
            </v-alert>
          </div>
        </ValidationProvider>
        <div class='form-group form-focus'>
          <button class='btn btn-primary btn-block text-white' type='submit'>Giriş Yap</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'panel-login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: null,
      password: null
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
    async onSubmit() {
      try {
        let formData = new FormData(this.$refs.userLogin)
        formData.append('isUser', true)
        formData.append('isAdmin', true)
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
              window.location.href ='/panel'
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
  },
}
</script>

<style scoped>

</style>
