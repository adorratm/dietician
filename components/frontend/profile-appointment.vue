<template>
  <div v-if='!isEmpty(appointments)'>
    <v-alert
      border="left"
      colored-border
      type="info"
      elevation="2"
    >
      Bilgilendirme: Randevunuzu Alacağınız Farklı Bir Diyetisyen Mevcut İse Oluşturmuş Olduğunuz Randevuyu İptal Ediniz.
    </v-alert>
    <!-- Location List -->
    <div class='location-list' v-if='!isEmpty(appointments)' v-for='(item,index) in appointments'>
      <div class='row'>

        <!-- Clinic Content -->
        <div class='col-md-6'>
          <div class='clinic-content'>
            <h4 class='clinic-name'><a rel='dofollow' :href='"/dieticians/"+item.slug'>{{item.dietician.name}}</a></h4>
            <p class='doc-speciality'>{{ item.dietician.hospitalName }} - {{ item.dietician.department }}</p>
            <div class='rating'>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
            </div>
            <div class='clinic-details mb-0'>
              <h5 class='clinic-direction'><i class='fas fa-map-marker-alt'></i> {{ item.dietician.company_address }} {{ item.dietician.company_neighborhood }} {{ item.dietician.company_district }} {{ item.dietician.company_town }} / {{ item.dietician.company_city }}, Türkiye <br><a :href='"https://www.google.com/maps/dir/?api=1&origin="+user.address+" "+user.neighborhood+" "+user.district+" "+user.town+" "+user.city+"&destination="+item.dietician.company_address+" "+item.dietician.company_neighborhood+" "+item.dietician.company_district+" "+item.dietician.company_town+" "+item.dietician.company_city' target='_blank'>Yol Tarifi Alın</a></h5>
            </div>
          </div>
        </div>
        <!-- /Clinic Content -->

        <!-- Clinic Timing -->
        <div class='col-md-4'>
          <div class='clinic-timing'>
            <div>
              <p class='timings-days'>
                <span> Randevu Tarihi </span>
              </p>
              <p class='timings-times'>
                <span>{{ item.date }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- /Clinic Timing -->

        <div class='col-md-2'>
          <p class='timings-days'>
            <span> İşlemler </span>
          </p>
          <p class='timings-times'>
            <span><a href='javascript:void(0)'>Randevuyu Güncelle</a></span>
            <span><a href='javascript:void(0)'>Randevuyu İptal Et</a></span>
          </p>
        </div>
      </div>
    </div>
    <!-- /Location List -->
  </div>
  <div v-else>
    <v-alert
      border="left"
      colored-border
      type="error"
      elevation="2"
    >
      Oluşturulmuş Bir Randevu Bulunamadı.
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'profile-appointment',
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
  },
  props:["user"],
  data(){
    return {
      appointments : null
    }
  },
  mounted() {
    this.getAppointments()
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
    getAppointments(){
      try {
        this.$axios.get(process.env.apiBaseUrl +'users/appointments').then((result) => {
          this.appointments = result.data.data
          console.log(result.data.data)
        }).catch((e) => console.log(e))
      }catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style scoped>

</style>
