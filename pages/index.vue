<template>
  <v-container>
    <client-only>
      <v-carousel v-model="model" v-if='!isEmpty(settings.sliders)' cycle continuous height='auto' class='mb-3'>
        <v-carousel-item
          v-for="(slide, i) in settings.sliders"
          :key="i"
        >
          <v-img :src="img_url+slide.img_url" :aspect-ratio="1.77" contain></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-card class='mb-3' v-if='!isEmpty(settings.dieticians)'>
        <v-card-title class='justify-center text-center'>ÖNE ÇIKAN DİYETİSYENLERİMİZ</v-card-title>
      </v-card>
      <v-row v-if='!isEmpty(settings.dieticians)'>
        <v-col cols='12' sm='12' md='6' lg='4' xl='3' :key='i' v-for='(dietician,i) in settings.dieticians'>
          <v-card>
            <v-card-title>
              {{dietician.name}}
            </v-card-title>
            <v-card-subtitle>{{dietician.department}}</v-card-subtitle>
            <v-img :src='dietician.profile_photo' :lazy-src='dietician.profile_photo' :aspect-ratio='1.77' contain/>
            <v-divider></v-divider>
            <v-card-text>
              Çalıştığı Hastane/Poliklinik : <b>{{dietician.hospitalName}}</b>
            </v-card-text>
            <v-card-actions>
              <v-btn :to='"/dieticians/"+dietician.slug+"/make-appointment"' color='primary' block>Randevu Almak İçin Tıklayın</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </client-only>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(["settings"]),
    img_url() {
      return process.env.apiPublicUrl
    },
  },
  components: {
  },
  data(){
    return {
      model: 0,
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj ) {
      if ( typeof obj == "number" ) return false;
      else if ( typeof obj == "string" ) return obj.length === 0;
      else if ( Array.isArray( obj ) ) return obj.length === 0;
      else if ( typeof obj == "object" )
        return obj == null || Object.keys( obj ).length === 0;
      else if ( typeof obj == "boolean" ) return false;
      else return !obj;
    }
  }
}
</script>
