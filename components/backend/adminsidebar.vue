<template>
  <div>
    <!-- Sidebar -->
    <div class='sidebar' id='sidebar'>
      <div class='sidebar-inner'>
        <vue-custom-scrollbar class='scroll-area' :settings='settings' @ps-scroll-y='scrollHanle'>
          <div id='sidebar-menu' class='sidebar-menu'>
            <ul>
              <li class='menu-title'>
                <span>Menü</span>
              </li>
              <li>
                <NuxtLink to='/panel' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-home</v-icon>
                  <span>Anasayfa</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/settings' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-cogs</v-icon>
                  <span>Ayarlar</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/slides' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-folder-multiple-image</v-icon>
                  <span>Slaytlar</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/users' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-account-group</v-icon>
                  <span>Kullanıcılar</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/dieticians' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-doctor</v-icon>
                  <span>Diyetisyenler</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/nutrients' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-food</v-icon>
                  <span>Besinler</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/criterias' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-food-variant</v-icon>
                  <span>Ölçütler</span></NuxtLink>
              </li>
              <li class='submenu'>
                <a href='javascript:void(0)'>
                  <v-icon class='custom-class text-white'>mdi mdi-run-fast</v-icon>
                  <span> Egzersizler</span> <span class='menu-arrow'></span></a>
                <ul style='display: none;'>
                  <li>
                    <NuxtLink to='/panel/exercise-categories' router exact>Egzersiz Kategorileri</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/panel/exercises' router exact>Egzersizler</NuxtLink>
                  </li>
                </ul>
              </li>
              <li>
                <NuxtLink to='/panel/e-diet-foods' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-food</v-icon>
                  <span>E-Diyet Besinleri</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/panel/diseases' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-virus-outline</v-icon>
                  <span>Hastalıklar</span></NuxtLink>
              </li>
              <li class='submenu'>
                <a href='javascript:void(0)'>
                  <v-icon class='custom-class text-white'>mdi mdi-food-turkey</v-icon>
                  <span> Yemek Tarifleri</span> <span class='menu-arrow'></span></a>
                <ul style='display: none;'>
                  <li>
                    <NuxtLink to='/panel/recipe-categories' router exact>Kategoriler</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/panel/recipes' router exact>Yemek Tarifleri</NuxtLink>
                  </li>
                </ul>
              </li>
              <li class='submenu'>
                <a href='javascript:void(0)'>
                  <v-icon class='custom-class text-white'>mdi mdi-folder-text</v-icon>
                  <span> Makaleler</span> <span class='menu-arrow'></span></a>
                <ul style='display: none;'>
                  <li>
                    <NuxtLink to='/panel/blog-categories' router exact>Kategoriler</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/panel/blogs' router exact>Makaleler</NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </vue-custom-scrollbar>
      </div>
    </div>
    <!-- /Sidebar -->
  </div>
</template>
<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
export default {
  components: {
    vueCustomScrollbar,
  },
  mounted() {
    $('#sidebar-menu a').on('click', function(e) {
      if ($(this).parent().hasClass('submenu')) {
        e.preventDefault()
      }
      if (!$(this).hasClass('subdrop')) {
        $('ul', $(this).parents('ul:first')).slideUp(350)
        $('a', $(this).parents('ul:first')).removeClass('subdrop')
        $(this).next('ul').slideDown(350)
        $(this).addClass('subdrop')
      } else if ($(this).hasClass('subdrop')) {
        $(this).removeClass('subdrop')
        $(this).next('ul').slideUp(350)
      }
    })
    $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click')
  },
  data() {
    return {
      settings: {
        suppressScrollX: true
      },
      activeClass: 'active'
    }
    //  isactive : true
  },
  methods: {
    scrollHanle(evt) {
      console.log(evt)
    }
  }
}
</script>
<style>
.scroll-area {
  position: relative;
  margin: auto;
  height: calc(100vh - 60px);
  background-color: transparent !important;
}

.sidebar-menu ul li a.active {
  background-color: #19c1dc;
  color: #fff;
}

.sidebar-menu ul ul a.active {
  color: #20e3ff;
  text-decoration: underline;
  background-color: unset;
}
</style>
