<template>
  <v-container>
    <client-only>
      <v-responsive :aspect-ratio="16/9">
      <v-carousel v-model="model" v-if='!isEmpty(sliders)' cycle continuous height='auto'>
        <v-carousel-item
          v-for="(slide, i) in sliders"
          :key="i"
        >
          <v-img :src="img_url+slide.img_url" :aspect-ratio="16/9" max-height='500' contain></v-img>
        </v-carousel-item>
      </v-carousel>
      </v-responsive>
    </client-only>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import {Base64} from 'js-base64'
export default {
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    },
  },
  components: {
  },
  data(){
    return {
      model: 0,
      settings: !this.isEmpty(Cookie.get("settings")) ? JSON.parse(Base64.decode(Cookie.get("settings"))) : null,
      sliders: []
    }
  },
  mounted() {
    this.$store.dispatch("getSettings").then(()=>{
      this.sliders = this.settings.sliders
    })
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
