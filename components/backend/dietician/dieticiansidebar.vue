<template>
  <div>
    <!-- Sidebar -->
    <div class='sidebar' id='sidebar'>
      <div class='sidebar-inner'>
        <vue-custom-scrollbar class='scroll-area' :settings='settings' @ps-scroll-y='scrollHandle'>
          <div id='sidebar-menu' class='sidebar-menu'>
            <ul>
              <li class='menu-title'>
                <span>Menü</span>
              </li>
              <li>
                <NuxtLink to='/dietician-panel' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-home</v-icon>
                  <span>Anasayfa</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/dietician-panel/consultants' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-account-group</v-icon>
                  <span>Danışanlarım</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/dietician-panel/recipes' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-food-turkey</v-icon>
                  <span>Yemek Tariflerim</span></NuxtLink>
              </li>
              <li>
                <NuxtLink to='/dietician-panel/blogs' router exact>
                  <v-icon class='custom-class text-white'>mdi mdi-folder-text</v-icon>
                  <span>Makalelerim</span></NuxtLink>
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
    scrollHandle(evt) {
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
