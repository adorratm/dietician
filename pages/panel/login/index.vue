<template>
  <div>
    <!-- Main Wrapper -->
    <div class='main-wrapper login-body'>
      <div class='login-wrapper'>
        <div class='container'>
          <div class='loginbox'>
            <div class='login-left'>
              <img class='img-fluid' v-if='!isEmpty(settings)' :src='settings.settings.logo' :alt='settings.settings.company_name' style='filter:invert(1)'>
            </div>
            <div class='login-right'>
              <div class='login-right-wrap'>
                <h1 style='font-size: 21px' v-if='!isEmpty(settings)'>{{settings.settings.company_name}} - Yönetim Paneli</h1>
                <p class='account-subtitle'>Yönetici Panelinize Erişmeniz Bir Tık Uzağınızda!</p>

                <!-- Form -->
                <Login />
                <!-- /Form -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Main Wrapper -->
    <Nuxt />
  </div>
</template>

<script>
import Login from "~/components/backend/login"
export default {
  layout: 'notheader',
  name: 'panel-login',
  components:{
    Login
  },
  computed: {
    currentPath() {
      return this.$route.name
    },
    settings(){
      return this.$store.state.settings
    },
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    }
  }
}
</script>
