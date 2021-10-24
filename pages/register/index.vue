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
            <!-- Register Content -->
            <div class='account-content'>
              <div class='row align-items-center justify-content-center'>
                <div class='col-md-7 col-lg-6 login-left'>
                  <img src='~/assets/img/login.jpg' class='img-fluid' v-if='!isEmpty(settings)' :alt='settings.settings.company_name'>
                </div>
                <div class='col-md-12 col-lg-6 login-right'>
                  <div class='login-header'>
                    <h3>Danışan Kaydı - <span v-if='!isEmpty(settings)'>{{ settings.settings.company_name}}</span>
                      <NuxtLink to='/dietician-register' title='Diyetisyen Kaydı' rel='dofollow'>Diyetisyen Misiniz?</NuxtLink>
                    </h3>
                  </div>
                  <Register />
                </div>
              </div>
            </div>
            <!-- /Register Content -->
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
import Register from "@/components/frontend/register"
export default {
  components:{
    Breadcrumb,
    Register
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
        {name: "Danışan Kaydı"}
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
  }
}
</script>
