<template>
  <div class='row' >
    <div v-for='(item,key) in nutrients' class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
      <div class="profile-widget">
        <div class="doc-img">
          <NuxtLink :to="'calorie/'+item.slug" rel='dofollow' :title='item.name' :data-title='item.name'>
            <img class="img-fluid" :alt="item.name" style='object-fit: cover' :src="img_url +(!isEmpty(item.nutrients) && !isEmpty(item.nutrients.img_url) ? item.nutrients.img_url : emptyurl)">
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
