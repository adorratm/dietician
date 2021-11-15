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
              label='Makale Aramak İçin "Enter" Tuşuna Basın...'
              v-model='searchText'
              @change='search'
              solo
              clearable
            ></v-text-field>

            <h2 class='text-center mb-5'>{{ searchResultText }}</h2>

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
            <!-- Blog List -->
            <BlogList v-if='!isEmpty(blogs) && loading===false' :blogs='blogs' :emptyurl='emptyUrl' />
            <!-- # List -->

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
import BlogList from '~/components/frontend/blog-list'
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  layout: 'default',
  name:"blogs",
  components: {
    BlogList,
    Breadcrumb
  },
  data: () => ({
    searchResultText: 'Tüm Makaleler',
    searchText: null,
    pagination: {
      current: 1,
      total: 1
    },
    loading: true,
    blogs: [],
    emptyUrl:null,
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Makaleler"}
    ]
  }),
  async mounted() {
    await this.getBlogs()
    this.search(!this.isEmpty(this.$route.query.search) ? this.$route.query.search : null)
  },
  computed: {
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
    async getBlogs() {
      try {
        this.loading=true
        !this.isEmpty(this.searchText) ? this.searchResultText="'"+this.searchText+"' Arama Sonucuna İlişkin Makaleler" : this.searchResultText='Tüm Makaleler'
        if (!this.isEmpty(this.searchText)) {
          await this.$axios.get(process.env.apiBaseUrl + "blog"
            , {
              'page': this.pagination.current,
              'searchText': this.searchText
            }).then(res => {
            this.fillData(res.data.data.data,res.data.data.current_page,res.data.data.last_page)
          }).catch(err => console.log(err)).finally(() => {this.loading=false})
        } else {
          await this.$axios.get(process.env.apiBaseUrl + "blog?page="+this.pagination.current).then(res => {
            console.log(res.data.data.data)
            this.fillData(res.data.data.data,res.data.data.current_page,res.data.data.last_page)
          }).catch(err => console.log(err)).finally(() => {this.loading=false})
        }
      }catch (e) {
        console.log(e)
      }
    },
    fillData(data,current_page,last_page){
      try {
        this.emptyUrl = this.$store.state.emptyUrl
        this.blogs = data
        this.pagination.current = current_page
        this.pagination.total = last_page
      }catch (e) {
        console.log(e)
      }
    },
    onPageChange() {
      try {
        this.loading = true
        this.getBlogs()
      }catch (e) {
        console.log(e)
      }
    },
    search(queryParam) {
      try {
        if(!this.isEmpty(queryParam)){
          this.searchText = queryParam
        }
        this.loading = true
        this.getBlogs()
      }catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
