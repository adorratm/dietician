<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->

    <!-- Page Content -->
    <div class='content' style='min-height: 300px;padding: 50px 0;background-color: #fff;'>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-md-8 offset-md-2'>
            <!-- Login Tab Content -->
            <div class='account-content'>
              <div class='row align-items-center justify-content-center'>
                <div class='col-md-7 col-lg-6 login-left'>
                  <img src='~/assets/img/dieticianlogin.jpg' class='img-fluid' v-if='!isEmpty(settings)' :alt='settings.settings.company_name'>
                </div>
                <div class='col-md-12 col-lg-6 login-right'>
                  <div class='login-header'>
                    <h3>Diyetisyen Girişi - <span v-if='!isEmpty(settings)'>{{ settings.settings.company_name}}</span>
                      <NuxtLink to='/login' title='Danışan Girişi' rel='dofollow'>Danışan Mısınız?</NuxtLink>
                    </h3>
                  </div>
                  <Login />
                </div>
              </div>
            </div>
            <!-- /Login Tab Content -->
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->
    <Nuxt />
  </div>
</template>

<script>
import Breadcrumb from "@/components/frontend/breadcrumb"
import Login from "@/components/frontend/dietician-login"
export default {
  name:"dietician-login",
  components:{
    Breadcrumb,
    Login
  },
  middleware: ['auth','guest'],
  auth: 'guest',
  computed: {
    currentPath() {
      return this.$route.name
    },
    settings(){
      return this.$store.state.settings
    },
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/"},
        {name: "Diyetisyen Girişi"}
      ]
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
  },
}
</script>
