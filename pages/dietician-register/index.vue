<template>
  <div style="background-color: #fff;">
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->

    <!-- Page Content -->
    <div class="content" style="min-height: 122px;padding: 50px 0;">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <!-- Account Content -->
            <div class="account-content">
              <div class="row align-items-center justify-content-center">
                <div class="col-md-7 col-lg-6 login-left">
                  <img src="~/assets/img/dieticianlogin.jpg" class="img-fluid" v-if='!isEmpty(settings)' :alt="settings.settings.company_name">
                </div>
                <div class="col-md-12 col-lg-6 login-right">
                  <div class="login-header">
                    <h3>Diyetisyen Kaydı - <span v-if='!isEmpty(settings)'>{{settings.settings.company_name}}</span> <NuxtLink to='/register' rel='dofollow' title='Kayıt Ol'>Diyetisyen Değil Misiniz?</NuxtLink></h3>
                  </div>
                  <!-- Register Form -->
                  <Dieticianregister />
                  <!-- /Register Form -->
                </div>
              </div>
            </div>
            <!-- /Account Content -->
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->
    <Nuxt />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Dieticianregister from "~/components/frontend/dietician-register"
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  middleware: ['auth','guest'],
  auth:'guest',
  name: 'dietician-register',
  components: {
    ValidationObserver,
    ValidationProvider,
    Dieticianregister,
    Breadcrumb
  },
  computed:{
    currentPath() {
      return this.$route.name
    },
    settings(){
      return this.$store.state.settings
    }
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/"},
        {name: "Diyetisyen Kaydı"}
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

<style scoped>

</style>
