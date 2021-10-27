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
    <div class='location-list'>
      <div class='row'>

        <!-- Clinic Content -->
        <div class='col-md-6'>
          <div class='clinic-content'>
            <h4 class='clinic-name'><a href='#'>Diyetisyen Adı</a></h4>
            <p class='doc-speciality'>Poliklinik Adı - Departman</p>
            <div class='rating'>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
              <i class='fas fa-star filled'></i>
            </div>
            <div class='clinic-details mb-0'>
              <h5 class='clinic-direction'><i class='fas fa-map-marker-alt'></i> Poliklinik Adresi <br><a href='javascript:void(0);'>Yol Tarifi Alın</a></h5>
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
                <span>10:00 AM - 2:00 PM</span>
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
        this.$axios.get(process.env.apiBaseUrl +'theme/users/appointments/myappointments').then((result) => {
          console.log(result)
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
