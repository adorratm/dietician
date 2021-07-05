<template>
  <v-app>
    <client-only>
      <Header :items='items' :settings='settings'></Header>
    </client-only>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <client-only>
      <Footer :settings='settings'></Footer>
    </client-only>
  </v-app>
</template>

<script>
import Header from "@/components/includes/Header"
import Footer from "@/components/includes/Footer"
import { mapState } from "vuex";

export default {
  head(){
    return {
      htmlAttrs: {
        lang: 'tr',
      },
    }
  },
  components:{
    Header,
    Footer
  },
  computed: {
    ...mapState(["settings"])
  },
  beforeCreate() {
    this.$store.dispatch("setSiteSettings")
  },
  mounted() {
    console.log(this.settings)
    // This Function Changing Default Theme
    const theme = localStorage.getItem("useDarkTheme");
    if (theme) {
      this.$vuetify.theme.dark = theme === "true";
    }else{
      // This Function Gets Default Windows || Mac Os || Linux Application Layout
      this.initDarkMode();
    }
  },
  data () {
    return {
      items: [
        {
          icon: 'mdi-home',
          title: 'Anasayfa',
          to: '/'
        },
        {
          icon: 'mdi-doctor',
          title: 'Diyetisyenler',
          to: '/dieticians'
        },
        {
          icon: 'mdi-weight-kilogram',
          title: 'Kaç Kalori ?',
          to: '/calorie'
        },
        {
          icon: 'mdi-food',
          title: 'Yemek Tarifleri',
          to: '/recipes'
        },
        {
          icon: 'mdi-food-variant',
          title: 'Ölçütler',
          to: '/criterias'
        },
        {
          icon: 'mdi-weight-lifter',
          title: 'Egzersizler',
          to: '/exercises'
        }
      ],
      userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
        ? this.$auth.$storage.getUniversal("user")
        : null
    }
  },
  methods:{
    initDarkMode() {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      darkMediaQuery.addEventListener('change', () => {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      });

      if (darkMediaQuery.matches) {
        console.log('change default light to dark theme');
        // need to set 0 sec timeout to set the dark more after mounted event, due to some bug in the framework
        setTimeout(() => {this.$vuetify.theme.dark = true; }, 0);
      }
    },
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
