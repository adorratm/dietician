<template>
  <div class='card'>
    <div class='card-body'>
      <div class='doctor-widget'>
        <div class='doc-info-left'>
          <div class='doctor-img'>
            <img :src='(user.status === "dietician" ? (!isEmpty(user.profile_photo) ? user.profile_photo : empty_url) : (!isEmpty(user.img_url) ? user.img_url : empty_url))' class='img-fluid w-100' :alt='user.name'>
          </div>
          <div class='doc-info-cont'>
            <h4 class='doc-name'>{{ user.name }}</h4>
            <p class='doc-speciality'>
              {{ user.status === 'admin' ? 'Yönetici' : (user.status === 'dietician' ? 'Diyetisyen' : 'Kullanıcı')
              }}</p>
            <p class='doc-department'>{{ user.department }}</p>
            <div v-if='hideaddress !==true' class='clinic-details'>
              <p class='doc-location'><i class='fas fa-map-marker-alt'></i> {{ user.address }}
                {{ user.neighborhood }} {{ user.town }} {{ user.district }} {{ user.city }} / Türkiye</p>
            </div>
            <div v-else class='clinic-details'>
              <p class='doc-location'><i class='fas fa-map-marker-alt'></i> {{ user.company_address }}
                {{ user.company_neighborhood }} {{ user.company_town }} {{ user.company_district }} {{ user.company_city }} / Türkiye</p>
            </div>
          </div>
        </div>
        <div class='doc-info-right align-items-center align-self-center text-center justify-content-center'>
          <div class='doctor-action text-center justify-content-center'>
            <a v-if='!isEmpty(user.facebook)' :href='user.facebook' target='_blank' title='Facebook' class='btn btn-white'>
              <i class='fa fa-facebook color'></i>
            </a>
            <a v-if='!isEmpty(user.instagram)' :href='user.instagram' target='_blank' title='Instagram' class='btn btn-white'>
              <i class='fa fa-instagram color'></i>
            </a>
            <a v-if='!isEmpty(user.linkedin)' :href='user.linkedin' target='_blank' title='Linkedin' class='btn btn-white'>
              <i class='fa fa-linkedin color'></i>
            </a>
            <a v-if='!isEmpty(user.twitter)' :href='user.twitter' target='_blank' title='Twitter' class='btn btn-white'>
              <i class='fa fa-twitter color'></i>
            </a>
            <a v-if='!isEmpty(user.youtube)' :href='user.youtube' target='_blank' title='Youtube' class='btn btn-white'>
              <i class='fa fa-youtube color'></i>
            </a>
          </div>
          <div v-if='hideaddress !==true' class='doctor-action text-center justify-content-center'>
            <a :href='"tel:"+user.phone' title='Telefon' class='btn btn-white'><i class='fa fa-phone'></i></a>
            <a :href='"mailto:"+user.email' title='Email' class='btn btn-white'><i class='fa fa-envelope-open'></i></a>
          </div>
          <div v-else class='doctor-action text-center justify-content-center'>
            <a :href='"tel:"+user.work_phone' title='Telefon' class='btn btn-white'><i class='fa fa-phone'></i></a>
            <a :href='"tel:"+user.work_phone_2' title='Telefon 2' class='btn btn-white'><i class='fa fa-phone'></i></a>
            <a :href='"mailto:"+user.email' title='Email' class='btn btn-white'><i class='fa fa-envelope-open'></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-information-top',
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
  },
  props:["user","hideaddress"],
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
  },
}
</script>

<style scoped>

</style>
