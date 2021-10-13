<template>
  <div>
    <!-- Header -->
    <header class='header'>
      <nav class='navbar navbar-expand-lg header-nav'>
        <div class='navbar-header'>
          <a id='mobile_btn' href='javascript:void(0);'>
						<span class='bar-icon'>
							<span></span>
							<span></span>
							<span></span>
						</span>
          </a>

          <NuxtLink to='/' class='navbar-brand logo' rel='dofollow' :title='settings.settings.company_name' :data-title='settings.settings.company_name'>
            <img :src='settings.settings.logo' class='img-fluid' :alt='settings.settings.company_name'>
          </NuxtLink>
        </div>
        <div class='main-menu-wrapper'>
          <div class='menu-header'>
            <NuxtLink to='/' class='menu-logo' rel='dofollow' :title='settings.settings.company_name'>
              <img :src='settings.settings.logo' class='img-fluid' :alt='settings.settings.company_name'>
            </NuxtLink>
            <a id='menu_close' class='menu-close' href='javascript:void(0);' rel='nofollow' title='Kapat'>
              <i class='fas fa-times'></i>
            </a>
          </div>
          <ul class='main-nav'>
            <li :class=" homeMenu ? 'active' : 'notactive'">
              <NuxtLink to='/' rel='dofollow' title='Anasayfa' data-title='Anasayfa' router exact>Anasayfa</NuxtLink>
            </li>
            <li :class=" dieticianMenu ? 'active' : 'notactive'">
              <NuxtLink to='/dieticians' rel='dofollow' title='Diyetisyenler' data-title='Diyetisyenler' router exact>Diyetisyenler</NuxtLink>
            </li>
            <li :class=" calorieMenu ? 'active' : 'notactive'">
              <NuxtLink to='/calorie' rel='dofollow' title='Kaç Kalori?' data-title='Kaç Kalori?' router exact>Kaç Kalori?</NuxtLink>
            </li>
            <li :class=" criteriaMenu ? 'active' : 'notactive'">
              <NuxtLink to='/criterias' rel='dofollow' title='Ölçütler' data-title='Ölçütler' router exact>Ölçütler</NuxtLink>
            </li>
            <li :class=" recipeMenu ? 'active' : 'notactive'">
              <NuxtLink to='/recipes' rel='dofollow' title='Yemek Tarifleri' data-title='Yemek Tarifleri' router exact>Yemek Tarifleri</NuxtLink>
            </li>
            <li :class=" exerciseMenu ? 'active' : 'notactive'">
              <NuxtLink to='/exercises' rel='dofollow' title='Egzersizler' data-title='Egzersizler' router exact>Egzersizler</NuxtLink>
            </li>
            <li class='login-link' v-if='!this.$auth.loggedIn'>
              <NuxtLink to='/login' rel='dofollow' title='Giriş Yap / Kayıt Ol' data-title='Giriş Yap / Kayıt Ol'>Giriş Yap / Kayıt Ol</NuxtLink>
            </li>
          </ul>
        </div>
        <ul class='nav header-navbar-rht'>
          <li class='nav-item contact-item'>
            <div class='header-contact-img'>
              <i class='far fa-hospital'></i>
            </div>
            <div class='header-contact-detail'>
              <p class='contact-header'>İletişim</p>
              <p class='contact-info-header'><a :href='"tel:"+settings.settings.phone' rel='dofollow'
                                                title='Telefon' data-title='Telefon'>{{ settings.settings.phone }}</a></p>
            </div>
          </li>
          <li class='nav-item' v-if='!this.$auth.loggedIn'>
            <NuxtLink class='nav-link header-login' to='/login' rel='dofollow' title='Giriş Yap / Kayıt Ol'>Giriş Yap /
              Kayıt Ol
            </NuxtLink>
          </li>
          <!-- User Menu -->
          <li v-else class='nav-item dropdown has-arrow logged-item'>
            <a href='javascript:void(0)' class='dropdown-toggle nav-link' data-toggle='dropdown'>
                    <span class='user-img'>
                        <img class='rounded-circle' :src='user.img_url' width='31' :alt='user.name'>
                    </span>
            </a>
            <div class='dropdown-menu dropdown-menu-right'>
              <div class='user-header'>
                <div class='avatar avatar-sm'>
                  <img :src='user.img_url' :alt='user.name' class='avatar-img rounded-circle'>
                </div>
                <div class='user-text'>
                  <h6>{{ user.name }}</h6>
                  <p class='text-muted mb-0'>{{ user.email }}</p>
                </div>
              </div>
              <a class='dropdown-item' rel='dofollow' title='Diyetisyen Paneli' data-title='Diyetisyen Paneli'
                 v-if='user.status === "dietician"' href='/dietician-panel'>Diyetisyen Paneli</a>
              <a class='dropdown-item' rel='dofollow' title='Yönetim Paneli' data-title='Yönetim Paneli'
                 v-if='user.status === "admin"' href='/panel'>Yönetim Paneli</a>
              <NuxtLink class='dropdown-item' rel='dofollow' title='Profilim' data-title='Profilim' to='/profile'>
                Profilim
              </NuxtLink>
              <a class='dropdown-item' href='javascript:void(0)' rel='dofollow' title='Çıkış Yap' data-title='Çıkış Yap'
                 v-on:click='logout'>Çıkış Yap</a>
            </div>
          </li>
          <!-- /User Menu -->
        </ul>
      </nav>
    </header>
    <!-- /Header -->
  </div>
</template>
<script>
export default {
  name: 'DefaultHeader',
  props: ['settings'],
  mounted() {
    let $wrapper = $('.main-wrapper')
    $('.main-nav a').on('click', function(e) {
      if ($(this).parent().hasClass('has-submenu')) {
        e.preventDefault()
      }
      if (!$(this).hasClass('submenu')) {
        $('ul', $(this).parents('ul:first')).slideUp(350)
        $('a', $(this).parents('ul:first')).removeClass('submenu')
        $(this).next('ul').slideDown(350)
        $(this).addClass('submenu')
      } else if ($(this).hasClass('submenu')) {
        $(this).removeClass('submenu')
        $(this).next('ul').slideUp(350)
      }
    })
    $('body').append('<div class="sidebar-overlay"></div>')
    $(document).on('click', '#mobile_btn', function() {
      $wrapper.toggleClass('slide-nav')
      $('.sidebar-overlay').toggleClass('opened')
      $('html').addClass('menu-opened')
      $('#task_window').removeClass('opened')
      return false
    })

    $(document).on('click', '#menu_close', function() {
      $('html').removeClass('menu-opened')
      $('.sidebar-overlay').removeClass('opened')
      $('main-wrapper').removeClass('slide-nav')
    })
    $('.main-nav ul li:not(.submenu) a').click(function() {
      $('html').removeClass('menu-opened')
      $('.sidebar-overlay').removeClass('opened')
    })

  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    currentPath() {
      return this.$route.name
    },
    homeMenu() {
      return this.$route.name ==='/'
    },
    dieticianMenu() {
      return !this.isEmpty(this.$route.name) ? this.$route.name.includes('dieticians') : null
    },
    calorieMenu() {
      return !this.isEmpty(this.$route.name) ? this.$route.name.includes('calorie') : null
    },
    recipeMenu() {
      return !this.isEmpty(this.$route.name) ? this.$route.name.includes('recipes') : null
    },
    exerciseMenu() {
      return !this.isEmpty(this.$route.name) ? this.$route.name.includes('exercises') : null
    },
    criteriaMenu() {
      return !this.isEmpty(this.$route.name) ? this.$route.name.includes('criterias') : null
    },
    blogMenu() {
      return !this.isEmpty(this.$route.name) ? this.$route.name.includes('blogs') : null
    },
    user() {
      return this.$auth.user
    }
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
        window.location.href = '/login'
      }, 2000)
    }
  }
}
</script>
