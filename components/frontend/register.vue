<template>
  <div>
    <!-- Register Form -->
    <ValidationObserver v-slot='{ handleSubmit }'>
      <form
        @submit.prevent='handleSubmit(onRegister)'
        ref='userRegister'
        enctype='multipart/form-data'
      >
        <ValidationProvider
          name='Adınız ve Soyadınız'
          rules='required'
          v-slot='{ errors }'
        >
          <v-text-field label='Adınız ve Soyadınız' type='text' name='name' v-model='name' clearable outlined hide-details class='mb-2' />
          <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
            {{ errors[0] }}
          </v-alert>
        </ValidationProvider>
        <ValidationProvider
          name='Email Adresiniz'
          rules='required|email'
          v-slot='{ errors }'
        >
          <v-text-field label='Email Adresiniz' type='email' name='email' v-model='email' clearable outlined hide-details class='mb-2' />
          <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
            {{ errors[0] }}
          </v-alert>
        </ValidationProvider>

        <ValidationProvider
          name='Telefon Numaranız'
          rules='required'
          v-slot='{ errors }'
        >
          <v-text-field label='Telefon Numaranız' type='text' name='phone' minlength='11' maxlength='22' v-model='phone' clearable outlined hide-details class='mb-2' />
          <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
            {{ errors[0] }}
          </v-alert>
        </ValidationProvider>
        <ValidationProvider
          name='Şifreniz'
          rules='required'
          v-slot='{ errors }'
        >
          <v-text-field label='Şifreniz' type='password' name='password' v-model='password' clearable outlined hide-details class='mb-2' />
          <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
            {{ errors[0] }}
          </v-alert>
        </ValidationProvider>
        <ValidationProvider
          name='Tekrar Şifreniz'
          rules='required'
          v-slot='{ errors }'
        >
          <v-text-field label='Tekrar Şifreniz' type='password_confirmation' name='password_confirmation' v-model='password_confirmation' clearable outlined hide-details class='mb-2' />
          <v-alert type='warning' dense dismissible v-show='errors[0]' class='my-2'>
            {{ errors[0] }}
          </v-alert>
        </ValidationProvider>
        <button class='btn btn-primary btn-block btn-lg login-btn text-white' type='submit'>Kayıt Ol</button>
        <div class='login-or'>
          <span class='or-line'></span>
          <span class='span-or'>ya da</span>
        </div>
        <div class='text-center dont-have'>Hesabınız Var Mı?
          <NuxtLink to='/login' rel='dofollow' title='Giriş Yap'>Giriş Yapın.</NuxtLink>
        </div>
      </form>
    </ValidationObserver>
    <!-- /Register Form -->
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: 'register',
  data() {
    return {
      email: null,
      password: null,
      password_confirmation: null,
      name: null,
      phone: null
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
     * User Register Method
     */
    onRegister() {
      try {
        let formData = new FormData(this.$refs.userRegister)
        formData.append('isUser', true)
        formData.append('isDietician', false)
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
      }catch (e){
        console.log(e)
      }
    }
  }

}
</script>

<style scoped>

</style>
