<template>
  <v-app>
    <client-only>
      <Header v-if='!isEmpty(settings)' :items='items' :settings='settings'></Header>
    </client-only>
    <v-main>
      <v-container>
        <nuxt v-if='!isEmpty(settings)' />
      </v-container>
    </v-main>
    <client-only>
      <Footer v-if='!isEmpty(settings)' :settings='settings'></Footer>
    </client-only>
  </v-app>
</template>

<script>
import Header from "@/components/dietician/Header"
import Footer from "@/components/includes/Footer"
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
  middleware:["auth","dietician"],
  beforeCreate() {
    this.$store.dispatch("setSiteSettings").then(result => {
      this.settings=result
    })
  },
  mounted() {
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
      settings: {  },
      items: [
        {
          icon: 'mdi-home',
          title: 'Anasayfa',
          to: '/dietician-panel'
        },
        {
          icon: 'mdi-account-group',
          title: 'Danışanlarım',
          to: '/dietician-panel/consultants',
          children:[
            {
              icon: 'mdi-account-plus',
              to:'/dietician-panel/consultants/add',
              title: 'Danışan Ekle'
            },
            {
              icon: 'mdi-account-plus',
              to:'/dietician-panel/consultants/new-consultant',
              title: 'Danışan Kaydet'
            }
          ]
        },
        {
          icon: 'mdi-food-fork-drink',
          title: 'Yemek Tarifleri',
          to: '/dietician-panel/recipes'
        },
      ],
      userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
        ? this.$auth.$storage.getUniversal("user")
        : null
    }
  },
  methods:{
    initDarkMode() {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      darkMediaQuery.addEventListener('change', (e) => {
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

<style scoped>

</style>
