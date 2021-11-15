<template>
  <div class='row row-eq-height align-content-stretch align-items-stretch justify-content-stretch'>
    <div v-for='(item,key) in blogs' class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
      <div class="profile-widget h-100">
        <div class="doc-img">
          <NuxtLink :to="'/blogs/'+item.slug" rel='dofollow' :title='item.title' :data-title='item.title'>
            <img class="img-fluid" :alt="item.name" style='object-fit: cover' :src="(!isEmpty(item.featureimage) ? item.featureimage : img_url+emptyurl)">
          </NuxtLink>
        </div>
        <div class="pro-content d-flex flex-column align-content-stretch align-items-stretch justify-content-stretch">
          <h3 class="title d-flex">
            <NuxtLink :to="'/blogs/'+item.slug" rel='dofollow' :title='item.title' :data-title='item.title'>{{ item.title }}</NuxtLink>
            <v-spacer /> {{item.created_at}}
          </h3>
          <p class='mb-0'>Yazar: {{item.writer.name}} - {{item.writer.status === "admin" ? "Admin" : "Diyetisyen"}}</p>
          <v-divider></v-divider>
          <p>{{item.content.substr(0,150)}}...</p>
          <v-btn :to="'/blogs/'+item.slug" rel='dofollow' title='Makaleyi İncele' data-title='Makaleyi İncele' color='primary' dark block>Makaleyi İncele</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-list',
  props:['blogs','emptyurl'],
  computed:{
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
