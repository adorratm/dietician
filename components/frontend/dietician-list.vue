<template>
  <div class='row row-eq-height align-content-stretch align-items-stretch justify-content-stretch' >
    <div v-for='(item,key) in dieticians' class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">

      <div class="profile-widget h-100">
        <div class="doc-img">
          <NuxtLink to="doctor-profile">
            <img class="img-fluid" :alt="item.name" src="~/assets/img/doctors/doctor-01.jpg">
          </NuxtLink>
        </div>
        <div class="pro-content">
          <h3 class="title">
            <NuxtLink to="doctor-profile">{{ item.name }}</NuxtLink>
            <i class="fas fa-check-circle verified"></i>
          </h3>
          <p class="speciality">{{item.department}} - {{item.hospitalName}}</p>
          <ul class="available-info">
            <li>
              <i class="fas fa-map-marker-alt"></i> {{ item.company_address }} {{item.company_neighborhood}} {{item.company_district}} {{item.company_town}} / {{item.company_city}}
            </li>
          </ul>
          <div class="row row-sm">
            <div class="col-6">
              <v-btn to='doctor-profile' color='info' block>Profili Görüntüle</v-btn>
            </div>
            <div class="col-6">
              <v-btn to='booking' color='primary' block>Randevu Al</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dietician-list',
  props:['dieticians'],
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
