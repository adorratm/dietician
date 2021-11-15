<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->


    <!-- Page Content -->
    <div class="content">
      <div class="container">

        <div class="row">
          <div class="col-lg-8 col-md-12">
            <div class="blog-view">
              <div class="blog blog-single-post">
                <div class="blog-image">
                  <a href="javascript:void(0);"><img :alt="blog.title" :src="blog.featureimage" class="img-fluid"></a>
                </div>
                <h3 class="blog-title">{{ blog.title }}</h3>
                <div class="blog-info clearfix">
                  <div class="post-left">
                    <ul>
                      <li>
                        <div class="post-author">
                          <span v-if='!isEmpty(blog.writer)'>{{blog.writer.name}} - {{blog.writer.role}}</span>
                        </div>
                      </li>
                      <li><i class="far fa-calendar"></i>{{ blog.created_at }}</li>
                      <li><i class="far fa-clock"></i>{{blog.updated_at}}</li>
                    </ul>
                  </div>
                </div>
                <div class="blog-content">
                  {{blog.content}}
                </div>
              </div>

            </div>
          </div>

          <!-- Blog Sidebar -->
          <div class="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">

            <!-- Search -->
            <div class="card search-widget">
              <div class="card-body">
                <form onsubmit='return false' class="search-form">
                  <div class="input-group">
                    <input type="text" placeholder="Ara..." class="form-control" v-model='searchText' @change='search'>
                    <div class="input-group-append">
                      <button type="submit" class="btn btn-primary" @click='search'><i class="fa fa-search"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- /Search -->

            <!-- Latest Posts -->
            <div class="card post-widget" v-if='!isEmpty(items)'>
              <div class="card-header">
                <h4 class="card-title">Yeni Makaleler</h4>
              </div>
              <div class="card-body">
                <ul class="latest-posts">
                  <li v-for='(item,index) in items'>
                    <div class="post-thumb">
                      <NuxtLink to="blog-details">
                        <img class="img-fluid" :src="item.featureimage" :alt="item.title">
                      </NuxtLink>
                    </div>
                    <div class="post-info">
                      <h4>
                        <NuxtLink :to="'/blogs/'+item.slug">{{ item.title }}</NuxtLink>
                      </h4>
                      <p>{{ item.created_at }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- /Latest Posts -->

            <!-- Categories -->
            <div class="card category-widget" v-if='!isEmpty(blogCategories)'>
              <div class="card-header">
                <h4 class="card-title">Makale Kategorileri</h4>
              </div>
              <div class="card-body">
                <ul class="categories">
                  <li v-for='(item,index) in blogCategories'><NuxtLink :to="'/blog-categories/'+item.slug">{{ item.title }}</NuxtLink></li>
                </ul>
              </div>
            </div>
            <!-- /Categories -->

          </div>
          <!-- /Blog Sidebar -->

        </div>
      </div>

    </div>
    <!-- /Page Content -->
  </div>
</template>

<script>
import NutrientList from '~/components/frontend/nutrient-list'
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  layout: 'default',
  name:"blog-detail",
  components: {
    NutrientList,
    Breadcrumb
  },
  data: () => ({
    searchText: null,
    unit:100,
    item:'',
    blog:[],
    blogCategories:[],
    items:[],
    loading:true,
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Makaleler", url:"/blogs"},
      {name: ""}
    ]
  }),
  async mounted(){
    await this.getData()
    await this.getLastBlogs()
    await this.getAllBlogCategories()
  },
  computed: {
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
    search(){
      try {
        this.$router.push("/blogs?search="+this.searchText)
      }catch (e) {
        console.log(e)
      }
    },
    async getData() {
      try {
        await this.$axios.get(process.env.apiBaseUrl+'blog/'+this.$route.params.id)
          .then( res=>{
            this.blog=res.data.data
            this.item=this.blog.title
            this.breadCrumbItems.push({name: this.item})
          }).catch(err => console.log(err)).finally(()=>{this.loading=false})
      }catch (e) {
        console.log(e)
      }
    },
    async getLastBlogs() {
      try {
        await this.$axios.get(process.env.apiBaseUrl+'home/')
          .then( res=>{
            this.items=res.data.data.blog
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    },
    async getAllBlogCategories() {
      try {
        await this.$axios.get(process.env.apiBaseUrl+'blog/categories')
          .then( res=>{
            this.blogCategories=res.data.data.data
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
