<template>
  <div class='row row-eq-height align-content-stretch align-items-stretch justify-content-stretch' >
    <div v-for='(item,key) in nutrients' class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
      <div class="profile-widget h-100">
        <div class="doc-img">
          <NuxtLink :to="'calorie/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>
            <img class="img-fluid" :alt="item.name" height='320' width='320' :src="(!isEmpty(item.nutrients) && !isEmpty(item.nutrients.img_url) ? item.nutrients.img_url : img_url+emptyurl)">
          </NuxtLink>
        </div>
        <div class="pro-content">
          <h3 class="title">
            <NuxtLink :to="'calorie/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>{{ item.name }}</NuxtLink>
          </h3>
          <p>{{item.description.length > 150 ? item.description.substring(0,250)+"..." : item.description}}</p>
          <div class="row row-sm">
            <div class="col-6">
              <v-btn :to="'calorie/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name' color='info' block>Besini İncele</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nutrient-list',
  props:['nutrients','emptyurl'],
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
