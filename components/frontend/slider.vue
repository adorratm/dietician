<template>
  <div>
    <!-- Home Banner -->
    <div class="pharmacy-home-slider">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <a class='swiper-slide d-block' :href='!isEmpty(item.url) ? item.url : "javascript:void(0)"' rel='dofollow' :target='!isEmpty(item.url) ? "_blank" : "_self"' v-for='(item,index) in this.settings.sliders'>
            <img :src='item.img_url' :alt='item.title' class='img-fluid w-100' style='object-fit: cover'>
            <div class="banner-wrapper">
              <div class="banner-header text-center">
                <h1>{{item.title}}</h1>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </a>
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <!-- Search -->
    <div class='banner-wrapper'>
      <div class='search-box search-box-3'>
        <form @submit.prevent='searchEveryWhere' enctype='multipart/form-data' ref='searchEveryWhere'>
          <div class='form-group search-location'>
            <select class='form-control' name='type' id='type'>
              <option value='/dieticians'>Diyetisyenler</option>
              <option value='/calorie'>Kaç Kalori?</option>
              <option value='/recipes'>Yemek Tarifleri</option>
              <option value='/criterias'>Ölçütler</option>
              <option value='/exercises'>Egzersizler</option>
            </select>
          </div>
          <div class='form-group search-info'>
            <input type='text' name='search' class='form-control' placeholder='Diyetisyen, Besin, Ölçüt, Egzersiz, Yemek Tarifi Arayın...'>
          </div>
          <button type='submit' class='btn btn-primary search-btn btn-search mt-0'><i class='fas fa-search'></i>
            <span>Ara</span>
          </button>
        </form>
      </div>
    </div>
    <!-- /Search -->
    <!-- /Home Banner -->
  </div>
</template>

<script>
export default {
  name: 'slider',
  props:["settings"],
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
    searchEveryWhere(){
      let formData = new FormData(this.$refs.searchEveryWhere)
      this.$router.push(formData.get("type")+"?search="+formData.get("search"))
    }
  }
}
</script>

<style scoped>

</style>
