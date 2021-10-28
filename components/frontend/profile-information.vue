<template>
  <v-simple-table>
    <tbody>
    <tr>
      <td><b>Profil Fotoğrafınız :</b></td>
      <td colspan='2'>
        <img
          v-bind:src='user.status !== "dietician" ? (!isEmpty(user.img_url) ? user.img_url : empty_url) : (!isEmpty(user.profile_photo) ? user.profile_photo : empty_url)'
          v-bind:alt='user.name'
          width='100'
          height='100'
        />
      </td>
    </tr>
    <tr>
      <td><b>Adınız ve Soyadınız :</b></td>
      <td colspan='2'>{{ user.name }}</td>
    </tr>
    <tr>
      <td><b>Email Adresiniz :</b></td>
      <td colspan='2'>{{ user.email }}</td>
    </tr>
    <tr>
      <td><b>Telefon Numaranız :</b></td>
      <td colspan='2'>{{ user.phone }}</td>
    </tr>
    <tr>
      <td><b>T.C. Kimlik Numaranız :</b></td>
      <td colspan='2'>{{ user.tc }}</td>
    </tr>
    <tr>
      <td><b>Cinsiyetiniz :</b></td>
      <td colspan='2'>{{ user.gender }}</td>
    </tr>
    <tr v-if='user.gender === "Kadın" && user.status !== "dietician"'>
      <td><b>Özel Durum :</b></td>
      <td colspan='2'>
        {{user.special_case}}
      </td>
    </tr>
    <tr v-if='user.gender === "Kadın" && user.special_case === "HAMİLE" && user.status !== "dietician"'>
      <td><b>Hamileliğinizin Kaçıncı Ayındasınız? :</b></td>
      <td colspan='2'>
        {{user.special_case_months}}
      </td>
    </tr>
    <tr v-if='user.gender === "Kadın" && user.special_case === "HAMİLE" && user.status !== "dietician"'>
      <td><b>Hamilelik Öncesi Ağırlığınız :</b></td>
      <td colspan='2'>
        {{user.special_case_weight}}
      </td>
    </tr>
    <tr>
      <td><b>İkamet Ettiğiniz İl :</b></td>
      <td colspan='2'>{{ user.city }}</td>
    </tr>
    <tr>
      <td><b>İkamet Ettiğiniz İlçe :</b></td>
      <td colspan='2'>{{ user.town }}</td>
    </tr>
    <tr>
      <td><b>İkamet Ettiğiniz Semt :</b></td>
      <td colspan='2'>{{ user.district }}</td>
    </tr>
    <tr>
      <td><b>İkamet Ettiğiniz Mahalle :</b></td>
      <td colspan='2'>{{ user.neighborhood }}</td>
    </tr>
    <tr>
      <td><b>İkamet Ettiğiniz Adres :</b></td>
      <td colspan='2'>{{ user.address }}</td>
    </tr>
    <tr>
      <td><b>Doğum Tarihiniz :</b></td>
      <td colspan='2'>{{ user.birthDate }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Boy (cm) :</b></td>
      <td colspan='2'>{{ user.size }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Ağırlık (kg) :</b></td>
      <td colspan='2'>{{ user.weight }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Bel (cm) :</b></td>
      <td colspan='2'>{{ user.waist }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Kalça (cm) :</b></td>
      <td colspan='2'>{{ user.hip }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Göğüs (cm) :</b></td>
      <td colspan='2'>{{ user.chest }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Boyun (cm) : </b></td>
      <td colspan='2'>{{ user.neck }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Üst Kol (cm) :</b></td>
      <td colspan='2'>{{ user.upperArm }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Alt Kol (cm) :</b></td>
      <td colspan='2'>{{ user.lowerArm }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Kol Bileği (cm) :</b></td>
      <td colspan='2'>{{ user.wrist }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Üst Bacak (cm) :</b></td>
      <td colspan='2'>{{ user.upperLeg }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Alt Bacak (cm) :</b></td>
      <td colspan='2'>{{ user.lowerLeg }}</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Deri Kıvrım Kalınlığı (cm) :</b></td>
      <td colspan='2'>
        {{ user.skinfoldThickness }}
      </td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Yağ :</b></td>
      <td>% {{ user.fatRatio }}</td>
      <td>{{ user.fat }} KG</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Kas :</b></td>
      <td>% {{ user.muscleRatio }}</td>
      <td>{{ user.muscle }} KG</td>
    </tr>
    <tr v-if='user.status !== "dietician"'>
      <td><b>Su :</b></td>
      <td>% {{ user.waterRatio }}</td>
      <td>{{ user.water }} KG</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Yerinizin Bulunduğu İl :</b></td>
      <td colspan='2'>{{ user.company_city }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Yerinizin Bulunduğu İlçe :</b></td>
      <td colspan='2'>{{ user.company_town }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Yerinizin Bulunduğu Semt :</b></td>
      <td colspan='2'>{{ user.company_district }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Yerinizin Bulunduğu Mahalle :</b></td>
      <td colspan='2'>{{ user.company_neighborhood }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Yerinizin Bulunduğu Adres :</b></td>
      <td colspan='2'>{{ user.company_address }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Telefon Numaranız :</b></td>
      <td colspan='2'>{{ user.work_phone }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Telefon Numaranız :</b></td>
      <td colspan='2'>{{ user.work_phone_2 }}</td>
    </tr>
    <tr v-if='user.status === "dietician"'>
      <td><b>İş Email Adresiniz :</b></td>
      <td colspan='2'>{{ user.work_email }}</td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: 'profile-information',
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
  },
  props:["user"],
  mounted() {
  console.log(this.user)
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
  },
}
</script>

<style scoped>

</style>
