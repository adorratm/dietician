<template>
  <client-only>
    <div>
      <v-navigation-drawer
        v-model='drawer'
        :mini-variant='miniVariant'
        :disable-resize-watcher='true'
        :disable-route-watcher='true'
        :clipped='clipped'
        fixed
        app
      >
        <v-layout fill-height column justify-space-between>

          <Nested :nodes='items' :settings='settings' />
          <v-list dense class='my-0 py-0'>
            <v-divider/>
            <v-list-item
              to='/'
              router
              exact
              class='my-0 py-0'
            >
              <v-list-item-action>
                <v-icon>mdi mdi-desktop-mac-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Websitesini Görüntüle</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-layout>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-model='rightDrawer'
        :disable-resize-watcher='true'
        :disable-route-watcher='true'
        :right="right"
        :mini-variant='miniVariant'
        :clipped='clipped'
        fixed
        app
      >
        <v-list dense v-if="!this.$auth.loggedIn">
          <v-list-item
            to='/login'
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Giriş Yap</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            to='/register'
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Kayıt Ol</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dense v-else>
          <v-list-item
            to='/profile'
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profilim</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-on:click='logout'
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Çıkış Yap</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left='clipped'
        :clipped-right='clipped'
        fixed
        app
        :dense='miniVariant'
        height='100'
      >
        <v-tooltip bottom attach>
          <template v-slot:activator='{on}'>
            <v-app-bar-nav-icon v-on='on' @click.stop='drawer = !drawer' />
          </template>
          <span>{{!drawer ? "Menüyü Aç" : "Menüyü Kapat"}}</span>
        </v-tooltip>

        <v-toolbar-title>
          <nuxt-link to="/"
          ><v-img
            v-if="!isEmpty(settings)"
            :src="img_url + settings.settings.logo"
            :lazy-src="img_url + settings.settings.logo"
            :alt="settings.settings.company_name"
            :style='!$vuetify.theme.dark ? "filter:invert(0%)" : "filter:invert(100%)"'
            aspect-ratio='16/9'
            max-height='75'
            max-width='210'
          />
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer />



        <v-menu
          attach
          offset-y bottom left origin="top right"
          :close-on-content-click='true'
          :close-on-click='true'
        >
          <template v-slot:activator="{ on,attrs }">
            <v-btn
              icon
              v-bind='attrs'
              v-on="on"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click='setClipped'>
              <v-list-item-icon><v-icon>mdi-application</v-icon></v-list-item-icon>
              <v-list-item-title>{{clipped ? "Üst Menüyü Daralt" : "Üst Menüyü Genişlet"}}</v-list-item-title>
            </v-list-item>

            <v-list-item @click='setMiniVariant'>
              <v-list-item-icon><v-icon>mdi-{{ `chevron-${!miniVariant ? 'right' : 'left'}` }}</v-icon></v-list-item-icon>
              <v-list-item-title>{{miniVariant ? 'Menüleri Genişlet' : 'Menüleri Daralt'}}</v-list-item-title>
            </v-list-item>

            <v-list-item @click='setFixed'>
              <v-list-item-icon><v-icon>mdi-page-layout-footer</v-icon></v-list-item-icon>
              <v-list-item-title>{{!fixed ? "Footer'ı Sabitle" :"Footer'ı Sabitlemeyi Bırak"  }}</v-list-item-title>
            </v-list-item>

            <v-list-item @click.stop='toggleTheme'
            >
              <v-list-item-icon><v-icon>{{!$vuetify.theme.dark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'}}</v-icon></v-list-item-icon>
              <v-list-item-title>{{!$vuetify.theme.dark ? "Karanlık Mod" : "Aydınlık Mod"}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tooltip bottom attach>
          <template v-slot:activator='{on}'>
            <v-app-bar-nav-icon v-on='on' @click.stop='rightDrawer = !rightDrawer'><v-icon>mdi-account</v-icon></v-app-bar-nav-icon>
          </template>
          <span>{{!rightDrawer ? "Kullanıcı Menüsünü Aç" : "Kullanıcı Menüsünü Kapat" }}</span>
        </v-tooltip>
      </v-app-bar>
    </div>
  </client-only>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import nested from '@/components/admin/nested'
export default {
  props: ['items','settings'],
  components:{
    Nested:nested
  },
  computed:{
    drawer: {
      get() {
        return this.$nuxt.$store.state.drawer
      },
      set(val) {
        this.$store.commit('setDrawer', val)
      }
    },
    rightDrawer:{
      get(){
        return this.$nuxt.$store.state.rightDrawer
      },
      set(val){
        this.$store.commit('setRightDrawer',val)
      }
    },
    ...mapState(["fixed","clipped","left","right","miniVariant"]),
    img_url() {
      return process.env.apiPublicUrl;
    }
  },
  data() {
    return {
      userData : this.$auth.$storage.getUniversal("user")
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark=!this.$vuetify.theme.dark;
      localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
    },
    ...mapMutations(["setFixed","setClipped","setLeft","setRight","setMiniVariant"]),
    isEmpty(obj) {
      if (typeof obj == "number") return false;
      else if (typeof obj == "string") return obj.length === 0;
      else if (Array.isArray(obj)) return obj.length === 0;
      else if (typeof obj == "object")
        return obj == null || Object.keys(obj).length === 0;
      else if (typeof obj == "boolean") return false;
      else return !obj;
    },
    logout() {
      this.$auth.logout();
      this.$auth.$storage.removeUniversal("user");
      this.$auth.strategy.refreshToken.reset();
      this.$izitoast.success({
        title: "Başarılı!",
        message: "Başarıyla Çıkış Yaptınız Yönlendiriliyorsunuz.",
        position: "topCenter"
      });
      setTimeout(() => {
        this.$router.go("/auth");
      }, 2000);
    }
  }
}
</script>

<style scoped>

</style>
