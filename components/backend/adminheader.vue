<template>
  <div>

    <!-- Header -->
    <div class='header'>

      <!-- Logo -->
      <div class='header-left'>
        <NuxtLink to='/panel' class='logo' rel='dofollow' :title='settings.settings.company_name' :data-title='settings.settings.company_name'>
          <img :src='img_url+settings.settings.logo' :alt='settings.settings.company_name'>
        </NuxtLink>
        <NuxtLink to='/panel' class='logo logo-small' rel='dofollow' :title='settings.settings.company_name' :data-title='settings.settings.company_name'>
          <img :src='img_url+settings.settings.logo' :alt='settings.settings.company_name' width='30' height='30'>
        </NuxtLink>
      </div>
      <!-- /Logo -->

      <a href='javascript:void(0);' id='toggle_btn' rel='dofollow' title='Menü' data-title='Menü'>
        <align-left-icon size='1x' class='custom-class'></align-left-icon>
      </a>

      <!-- Mobile Menu Toggle -->
      <a class='mobile_btn' id='mobile_btn' rel='dofollow' title='Menü' data-title='Menü'>
        <i class='fa fa-bars'></i>
      </a>
      <!-- /Mobile Menu Toggle -->

      <!-- Header Right Menu -->
      <ul class='nav user-menu pl-0'>
        <li class='nav-item my-auto py-auto'>
          <v-btn color='primary' class='mr-1' href='/'>Siteyi Görüntüle</v-btn>
        </li>
        <!-- Notifications -->
        <li class='nav-item dropdown noti-dropdown'>
          <a href='javascript:void(0)' class='dropdown-toggle nav-link' data-toggle='dropdown'>
            <bell-icon size='1.5x' class='custom-class'></bell-icon>
            <span class='badge badge-pill'>3</span>
          </a>
          <div class='dropdown-menu notifications'>
            <div class='topnav-dropdown-header'>
              <span class='notification-title'>Bildirimler</span>
              <a href='javascript:void(0)' class='clear-noti' rel='dofollow' title='Tümünü Temizle' data-title='Tümünü Temizle'> Tümünü Temizle </a>
            </div>
            <div class='noti-content'>
              <ul class='notification-list'>
                <li class='notification-message'>
                  <a href='javascript:void(0)'>
                    <div class='media'>
                      <span class='avatar avatar-sm'>
                          <img class='avatar-img rounded-circle' alt='User Image'
                               src='~/assets/admin_img/doctors/doctor-thumb-01.jpg'>
                      </span>
                      <div class='media-body'>
                        <p class='noti-details'><span class='noti-title'>Dr. Ruby Perrin</span> Schedule <span
                          class='noti-title'>her appointment</span></p>
                        <p class='noti-time'><span class='notification-time'>4 mins ago</span></p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class='topnav-dropdown-footer'>
              <a href='javascript:void(0)' rel='dofollow' title='Tüm Bildirimleri Görüntüle' data-title='Tüm Bildirimleri Görüntüle'>Tüm Bildirimleri Görüntüle</a>
            </div>
          </div>
        </li>
        <!-- /Notifications -->

        <!-- User Menu -->
        <li class='nav-item dropdown has-arrow' v-if='!isEmpty(user)'>
          <a href='javascript:void(0)' class='dropdown-toggle nav-link' data-toggle='dropdown' rel='dofollow' data-title='Profilim' title='Profilim'>
            <span class='user-img'><img class='rounded-circle' :src='img_url+user.img_url'
                                        width='31' :alt='user.name'></span>
          </a>
          <div class='dropdown-menu'>
            <div class='user-header'>
              <div class='avatar avatar-sm'>
                <img :src='img_url+user.img_url' :alt='user.name' class='avatar-img rounded-circle'>
              </div>
              <div class='user-text'>
                <h6>{{ user.name }}</h6>
                <p class='text-muted mb-0'>Yönetici</p>
              </div>
            </div>
            <NuxtLink class='dropdown-item' to='/profile' rel='dofollow' title='Profilim' data-title='Profilim'>Profilim</NuxtLink>
            <NuxtLink class='dropdown-item' to='/panel/settings' rel='dofollow' title='Ayarlar' data-title='Ayarlar'>Ayarlar</NuxtLink>
            <a class='dropdown-item' href='javascript:void(0)' @click='logout' rel='dofollow' title='Çıkış Yap' data-title='Çıkış Yap'>Çıkış Yap</a>
          </div>
        </li>
        <!-- /User Menu -->

      </ul>
      <!-- /Header Right Menu -->

    </div>
    <!-- /Header -->

  </div>
</template>
<script>
import { AlignLeftIcon } from 'vue-feather-icons'
import { BellIcon } from 'vue-feather-icons'

export default {
  components: {
    AlignLeftIcon,
    BellIcon
  },
  props: ['settings'],
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    user() {
      return this.$auth.user
    }
  },
  mounted() {
    let $wrapper = $('.main-wrapper')
    $('body').append('<div class="sidebar-overlay"></div>')
    $('#mobile_btn').click(function() {
      $wrapper.toggleClass('slide-nav')
      $('.sidebar-overlay').toggleClass('opened')
      $('html').addClass('menu-opened')
      $('#task_window').removeClass('opened')
    })
// Sidebar overlay
    $('.top-nav-search .responsive-search').click(function() {
      $('.top-nav-search').toggleClass('active')
    })
    $('.sidebar-menu ul li:not(.submenu) a').click(function() {
      $('html').removeClass('menu-opened')
      $('.sidebar-overlay').removeClass('opened')
    })

    $('#toggle_btn').click(function() {
      if ($('body').hasClass('mini-sidebar')) {
        $('body').removeClass('mini-sidebar')
        $('.subdrop + ul').slideDown()
      } else {
        $('body').addClass('mini-sidebar')
        $('.subdrop + ul').slideUp()
      }
      setTimeout(function() {
        mA.redraw()
        mL.redraw()
      }, 300)
      return false
    })
    $(document).on('mouseover', function(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      e.stopPropagation()
      if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        let targ = $(e.target).closest('.sidebar').length
        if (targ) {
          $('body').addClass('expand-menu')
          $('.subdrop + ul').slideDown()
        } else {
          $('body').removeClass('expand-menu')
          $('.subdrop + ul').slideUp()
        }
      }
    })
  },
  methods: {
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    logout() {
      this.$auth.logout()
      this.$auth.$storage.removeUniversal('user')
      this.$auth.strategy.refreshToken.reset()
      this.$auth.strategy.token.reset()
      this.$auth.reset()
      this.$izitoast.success({
        title: 'Başarılı!',
        message: 'Başarıyla Çıkış Yaptınız Yönlendiriliyorsunuz.',
        position: 'topCenter'
      })
      setTimeout(() => {
        window.location.href="/panel/login"
      }, 2000)
    }
  }
}
</script>
