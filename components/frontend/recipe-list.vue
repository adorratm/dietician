<template>
  <div class='row row-eq-height align-content-stretch align-items-stretch justify-content-stretch'>
    <div v-for='(item,key) in recipes' class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <div class="profile-widget h-100">
        <div class="doc-img">
          <NuxtLink :to="'/recipes/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>
            <img class="img-fluid" :alt="item.name" style='object-fit: cover' :src="(!isEmpty(item.recipes) && !isEmpty(item.recipes.img_url) ? item.recipes.img_url : img_url+emptyurl)">
          </NuxtLink>
        </div>
        <div class="pro-content d-flex flex-column align-content-stretch align-items-stretch justify-content-stretch">
          <h3 class="title">
            <NuxtLink :to="'/recipes/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>{{ item.name }}</NuxtLink>
          </h3>
          <p class="text-success font-weight-bold py-4">{{item.calorie}}</p>
          <p class='text-subtitle-1'>Porsiyon :{{item.portion}} - Hazırlanma Süresi:{{ item.prepare_time}}</p>
          <p>{{item.description.length > 150 ? item.description.substring(0,250)+"..." : item.description}}</p>
          <v-btn :to="'/recipes/'+item.slug" rel='dofollow' title='Yemek Tarifini İncele' data-title='Yemek Tarifini İncele' color='primary' block>Yemek Tarifini İncele</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipe-list',
  props:['recipes','emptyurl'],
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
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
  }
}
</script>

<style scoped>

</style>
