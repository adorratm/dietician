<template>
  <div class='row row-eq-height align-content-stretch align-items-stretch justify-content-stretch'>
    <div v-for='(item,key) in exerciseCategories' class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
      <div class="profile-widget h-100">
        <div class="doc-img">
          <NuxtLink :to="'/exercises/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>
            <img class="img-fluid" :alt="item.name" style='object-fit: cover' :src="(!isEmpty(item.img_url) ? item.img_url : img_url+emptyurl)">
          </NuxtLink>
        </div>
        <div class="pro-content d-flex flex-column align-content-stretch align-items-stretch justify-content-stretch">
          <h3 class="title">
            <NuxtLink :to="'/exercises/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>{{ item.name }}</NuxtLink>
          </h3>
          <v-btn :to="'/exercises/'+item.slug" rel='dofollow' title='Egzersizleri İncele' data-title='Egzersizleri İncele' color='primary' dark block>Egzersizleri İncele</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'exercise-category-list',
  props:['exerciseCategories','emptyurl'],
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
