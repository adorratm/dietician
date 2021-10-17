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
              label='Ölçüt Aramak İçin "Enter" Tuşuna Basın...'
              v-model='searchText'
              @change='search'
              solo
              clearable
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
            <!-- Criteria List -->
            <CriteriaList v-if='criterias.length>0 && loading===false' :criterias='criterias' :emptyurl='emptyUrl' />
            <!-- #Criteria List -->

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
import CriteriaList from '~/components/frontend/criteria-list'
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  layout: 'default',
  name:"criterias",
  components: {
    CriteriaList,
    Breadcrumb
  },
  data: () => ({
    searchText: null,
    pagination: {
      current: 1,
      total: 1
    },
    loading: true,
    criterias: [],
    emptyUrl:null,
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Ölçütler"}
    ]
  }),
  mounted() {
    this.getCriterias()
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
    getCriterias(param) {
      if (this.searchText !== null) {
        this.$store
          .dispatch('getCriterias', {
            criteriasURL:
              'criteria?page=' +
              this.pagination.current +
              '&search=' +
              decodeURIComponent(this.searchText)
          })
          .then(() => {
            this.emptyUrl = this.$store.state.emptyUrl
            this.criterias = this.$store.state.criterias.data
            this.pagination.current = this.$store.state.criterias.current_page
            this.pagination.total = this.$store.state.criterias.last_page
            this.loading = false
          }).catch(err => console.log(err))
      } else {
        if (param) {
          this.$store
            .dispatch('getCriterias', { criteriasURL: param })
            .then(() => {
              this.emptyUrl = this.$store.state.emptyUrl
              this.criterias = this.$store.state.criterias.data
              this.pagination.current = this.$store.state.criterias.current_page
              this.pagination.total = this.$store.state.criterias.last_page
              this.loading = false
            })
        } else {
          this.$store
            .dispatch('getCriterias', {
              criteriasURL: 'criteria?page=' + this.pagination.current
            })
            .then(() => {
              this.emptyUrl = this.$store.state.emptyUrl
              this.criterias = this.$store.state.criterias.data
              this.pagination.current = this.$store.state.criterias.current_page
              this.pagination.total = this.$store.state.criterias.last_page
              this.loading = false
            }).catch(err => console.log(err))
        }
      }
    },
    onPageChange() {
      this.loading = true
      this.getCriterias()
    },
    search(queryParam) {
      if(!this.isEmpty(queryParam)){
        this.searchText = queryParam
      }
      this.loading = true
      this.getCriterias()
    },
  }
}
</script>
