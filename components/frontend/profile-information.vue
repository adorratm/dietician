<template>
  <v-simple-table>
    <tbody>
    <tr>
      <td><b>Profil Fotoğrafı :</b></td>
      <td colspan='2'>
        <img
          v-bind:src='!isEmpty(user.img_url) ? user.img_url : empty_url'
          v-bind:alt='user.name'
          width='100'
          height='100'
        />
      </td>
    </tr>
    <tr>
      <td><b>Ad Soyad :</b></td>
      <td colspan='2'>{{ user.name }}</td>
    </tr>
    <tr>
      <td><b>Cinsiyet :</b></td>
      <td colspan='2'>{{ user.gender }}</td>
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
      <td><b>Doğum Tarihi :</b></td>
      <td colspan='2'>{{ user.birthDate }}</td>
    </tr>
    <tr>
      <td><b>Boy (cm) :</b></td>
      <td colspan='2'>{{ user.size }}</td>
    </tr>
    <tr>
      <td><b>Ağırlık (kg) :</b></td>
      <td colspan='2'>{{ user.weight }}</td>
    </tr>
    <tr>
      <td><b>Bel (cm) :</b></td>
      <td colspan='2'>{{ user.waist }}</td>
    </tr>
    <tr>
      <td><b>Kalça (cm) :</b></td>
      <td colspan='2'>{{ user.hip }}</td>
    </tr>
    <tr>
      <td><b>Göğüs (cm) :</b></td>
      <td colspan='2'>{{ user.chest }}</td>
    </tr>
    <tr>
      <td><b>Boyun (cm) : </b></td>
      <td colspan='2'>{{ user.neck }}</td>
    </tr>
    <tr>
      <td><b>Üst Kol (cm) :</b></td>
      <td colspan='2'>{{ user.upperArm }}</td>
    </tr>
    <tr>
      <td><b>Alt Kol (cm) :</b></td>
      <td colspan='2'>{{ user.lowerArm }}</td>
    </tr>
    <tr>
      <td><b>Kol Bileği (cm) :</b></td>
      <td colspan='2'>{{ user.wrist }}</td>
    </tr>
    <tr>
      <td><b>Üst Bacak (cm) :</b></td>
      <td colspan='2'>{{ user.upperLeg }}</td>
    </tr>
    <tr>
      <td><b>Alt Bacak (cm) :</b></td>
      <td colspan='2'>{{ user.lowerLeg }}</td>
    </tr>
    <tr>
      <td><b>Deri Kıvrım Kalınlığı (cm) :</b></td>
      <td colspan='2'>
        {{ user.skinfoldThickness }}
      </td>
    </tr>
    <tr>
      <td><b>Yağ :</b></td>
      <td>% {{ user.fatRatio }}</td>
      <td>{{ user.fat }} KG</td>
    </tr>
    <tr>
      <td><b>Kas :</b></td>
      <td>% {{ user.muscleRatio }}</td>
      <td>{{ user.muscle }} KG</td>
    </tr>
    <tr>
      <td><b>Su :</b></td>
      <td>% {{ user.waterRatio }}</td>
      <td>{{ user.water }} KG</td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: 'profile-information',
  computed:{
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
  },
  props:["user"],
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
