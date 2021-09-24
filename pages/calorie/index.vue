<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->


    <!-- Page Content -->
    <div class='content'>
      <div class='container'>
        <div class='row'>
          <!-- Content Left -->
          <div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8'>
            <v-text-field
              label='Besin Aramak İçin "Enter" Tuşuna Basın...'
              v-model='searchText'
              @change='search'
              solo
            ></v-text-field>

            <div class='mx-auto justify-center flex-wrap align-center text-center d-flex flex-column' v-if='loading'>
              <v-progress-circular
                :size='70'
                :width='7'
                color='purple'
                indeterminate
                class='mx-auto d-block'
              ></v-progress-circular>
              <h3 class='mx-auto d-block mt-3'>İçerik Yükleniyor. Lütfen Bekleyin...</h3>
            </div>
            <!-- Nutrient List -->
            <NutrientList v-if='nutrients.length>0 && loading===false' :nutrients='nutrients' :emptyurl='emptyUrl' />
            <!-- #Nutrient List -->

            <div class='load-more text-center'>
              <v-pagination
                total-visible='11'
                v-model='pagination.current'
                :length='pagination.total'
                circle
                @input='onPageChange'
              ></v-pagination>
            </div>
          </div>
          <!-- /Content Left -->
          <!-- Content Right -->
          <div class='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>

          </div>
          <!-- /Content Right -->
        </div>
        <!-- /row-->
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import NutrientList from '~/components/frontend/nutrient-list'
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  layout: 'default',
  name:"nutrients",
  components: {
    NutrientList,
    Breadcrumb
  },
  data: () => ({
    searchText: null,
    pagination: {
      current: 1,
      total: 1
    },
    loading: true,
    nutrients: [],
    emptyUrl:null,
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Kaç Kalori?"}
    ]
  }),
  mounted() {
    this.getNutrients()
    this.search(!this.isEmpty(this.$route.query.search) ? this.$route.query.search : null)
  },
  computed: {
    currentPath() {
      return this.$route.name
    },
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  methods: {
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
    },
    getNutrients(param) {
      if (this.searchText !== null) {
        this.$store
          .dispatch('getNutrients', {
            nutrientsURL:
              'nutrients?page=' +
              this.pagination.current +
              '&search=' +
              decodeURIComponent(this.searchText)
          })
          .then(() => {
            this.emptyUrl = this.$store.state.emptyUrl
            this.nutrients = this.$store.state.nutrients.data
            this.pagination.current = this.$store.state.nutrients.current_page
            this.pagination.total = this.$store.state.nutrients.last_page
            this.loading = false
          })
      } else {
        if (param) {
          this.$store
            .dispatch('getNutrients', { nutrientsURL: param })
            .then(() => {
              this.emptyUrl = this.$store.state.emptyUrl
              this.nutrients = this.$store.state.nutrients.data
              this.pagination.current = this.$store.state.nutrients.current_page
              this.pagination.total = this.$store.state.nutrients.last_page
              this.loading = false
            })
        } else {
          this.$store
            .dispatch('getNutrients', {
              nutrientsURL: 'nutrients?page=' + this.pagination.current
            })
            .then(() => {
              this.emptyUrl = this.$store.state.emptyUrl
              this.nutrients = this.$store.state.nutrients.data
              this.pagination.current = this.$store.state.nutrients.current_page
              this.pagination.total = this.$store.state.nutrients.last_page
              this.loading = false
            })
        }
      }
    },
    onPageChange() {
      this.loading = true
      this.getNutrients()
    },
    search(queryParam) {
      if(!this.isEmpty(queryParam)){
        this.searchText = queryParam
      }
      this.loading = true
      this.getNutrients()
    },
  }
}
</script>
