<template>
  <v-app style='min-height: unset!important;'>
    <div v-if='!currentPath.includes("/panel") && !currentPath.includes("/dietician-panel")'>
      <!-- Breadcrumb -->
      <Breadcrumb :items='breadCrumbItems'></Breadcrumb>
      <!-- /Breadcrumb -->
      <!-- Page Content -->
      <div  class="content success-page-cont" style='min-height: 300px;padding: 50px 0;background-color: #fff;'>

        <div class="container-fluid">

          <div class="row justify-content-center">
            <div class="col-lg-6">

              <!-- Success Card -->
              <div class="card success-card">
                <div class="card-body">
                  <div class="error-cont">
                    <i class="fas fa-times"></i>
                    <h3 v-if="error.statusCode === 404">{{ pageNotFound }}</h3>
                    <p v-else>{{ otherError }}</p>
                    <a href="/" class="btn btn-primary view-inv-btn text-white mt-2" title='Anasayfa' rel='dofollow'>Anasayfa'ya Dön</a>
                  </div>
                </div>
              </div>
              <!-- /Success Card -->

            </div>
          </div>

        </div>
      </div>
      <!-- /Page Content -->
    </div>
    <!-- Main Wrapper -->
    <div v-else-if='currentPath.includes("/dietician-panel")' class="main-wrapper" style="align-items: center !important;color: #1f1f1f !important;display: flex !important;">
      <div class="error-box">
        <h1 v-if="error.statusCode === 404">404</h1>
        <h1 v-else>{{error.statusCode}}</h1>
        <h3 class="h2 mb-3" v-if="error.statusCode === 404"><i class="fa fa-warning"></i> {{ pageNotFound }}</h3>
        <h3 class="h2 mb-3" v-else><i class="fa fa-warning"></i> {{ otherError }}</h3>
        <a href="/dietician-panel" class="btn btn-primary text-white">Diyetisyen Paneline Dön</a>
      </div>
    </div>
    <div v-else class="main-wrapper" style="align-items: center !important;color: #1f1f1f !important;display: flex !important;">
      <div class="error-box">
        <h1 v-if="error.statusCode === 404">404</h1>
        <h1 v-else>{{error.statusCode}}</h1>
        <h3 class="h2 mb-3" v-if="error.statusCode === 404"><i class="fa fa-warning"></i> {{ pageNotFound }}</h3>
        <h3 class="h2 mb-3" v-else><i class="fa fa-warning"></i> {{ otherError }}</h3>
        <a  href="/panel" class="btn btn-primary text-white">Yönetim Paneline Dön</a>
      </div>
    </div>
    <!-- /Main Wrapper -->
  </v-app>
</template>

<script>
import Breadcrumb from '~/components/frontend/breadcrumb'
export default {
  components:{
    Breadcrumb
  },
  layout(context){

    if(context.route.path.includes("/panel") || context.route.path.includes("/dietician-panel")){
      console.log(context.route.path)
      return "notheader"
    }else{
      console.log(context.route.path)
      return "default"
    }
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed:{
    breadCrumbItems(){
      return [{name: "Anasayfa",url: "/"},
        {name: (this.error.statusCode ===404 ? this.pageNotFound : this.otherError)}]
    },
      currentPath() {
      console.log(this.$route.path)
        return this.$route.path
      },
  },
  data () {
    return {
      pageNotFound: '404 Sayfa Bulunamadı.',
      otherError: 'Sistemde Bir Hata Oluştu.',
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  mounted() {
    this.$store.dispatch("setSiteSettings")
    if(!this.isEmpty(this.$auth.user) && !this.isEmpty(this.$auth.user.api_token)) {
      if (this.$auth.strategy.token.status()._status === "UNKNOWN" || this.$auth.strategy.token.status()._status === false) {
        this.$auth.logout()
        this.$auth.$storage.removeUniversal('user')
        this.$auth.strategy.refreshToken.reset()
        this.$auth.strategy.token.reset()
        this.$auth.reset()
      }
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
h1 {
  font-size: 20px;
}
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
