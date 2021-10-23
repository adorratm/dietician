<template>
  <div>
    <!-- Footer -->
    <footer class='footer'>

      <!-- Footer Top -->
      <div class='footer-top'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col-lg-3 col-md-6'>

              <!-- Footer Widget -->
              <div class='footer-widget footer-about'>
                <div class='footer-logo'>
                  <NuxtLink to='/' rel='dofllow' :title='settings.settings.company_name'>
                    <img :src='settings.settings.logo' class='img-fluid' :alt='settings.settings.company_name'
                         style='filter: invert(1);width:225px'>
                  </NuxtLink>
                </div>
                <div class='footer-about-content'>
                  <p>{{ settings.settings.aboutUs }}</p>
                  <div class='social-icon'>
                    <ul>
                      <li v-if='!isEmpty(settings.settings.facebook)'>
                        <a :href='settings.settings.facebook' rel='nofollow' target='_blank' title='Facebook'><i class='fab fa-facebook-f'></i> </a>
                      </li>
                      <li  v-if='!isEmpty(settings.settings.twitter)'>
                        <a :href='settings.settings.twitter' rel='nofollow' target='_blank' title='Twitter'><i class='fab fa-twitter'></i> </a>
                      </li>
                      <li  v-if='!isEmpty(settings.settings.linkedin)'>
                        <a :href='settings.settings.linkedin' rel='nofollow' target='_blank' title='Linkedin'><i class='fab fa-linkedin-in'></i></a>
                      </li>
                      <li  v-if='!isEmpty(settings.settings.instagram)'>
                        <a :href='settings.settings.instagram' rel='nofollow' target='_blank' title='Instagram'><i class='fab fa-instagram'></i></a>
                      </li>
                      <li  v-if='!isEmpty(settings.settings.youtube)'>
                        <a :href='settings.settings.youtube' rel='nofollow' target='_blank' title='Youtube'><i class='fab fa-youtube'></i> </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- /Footer Widget -->

            </div>

            <div class='col-lg-3 col-md-6'>

              <!-- Footer Widget -->
              <div class='footer-widget footer-menu'>
                <h2 class='footer-title'>Danışanlar İçin</h2>
                <ul>

                  <li>
                    <NuxtLink to='/dieticians' rel='dofollow' title='Diyetisyen Ara'>Diyetisyen Ara</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/login' rel='dofollow' title='Giriş Yap'>Giriş Yap</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/register' rel='dofollow' title='Kayıt Ol'>Kayıt Ol</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/profile/ediets' rel='dofollow' title='E-Diyetler'>E-Diyetler</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/profile' rel='dofollow' title='Profil'>Profil</NuxtLink>
                  </li>
                </ul>
              </div>
              <!-- /Footer Widget -->

            </div>

            <div class='col-lg-3 col-md-6'>

              <!-- Footer Widget -->
              <div class='footer-widget footer-menu'>
                <h2 class='footer-title'>Diyetisyenler İçin</h2>
                <ul>
                  <li>
                    <NuxtLink to='/dietician-panel/appointments' rel='dofollow' title='Randevular'>Randevular</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/dietician-panel/consultants' rel='dofollow' title='Danışanlar'>Danışanlar</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/dietician-login' rel='dofollow' title='Diyetisyen Girişi'>Diyetisyen Girişi</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/dietician-register' rel='dofollow' title='Diyetisyen Kaydı'>Diyetisyen Kaydı</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/dietician-panel' rel='dofollow' title='Diyetisyen Paneli'>Diyetisyen Paneli</NuxtLink>
                  </li>
                </ul>
              </div>
              <!-- /Footer Widget -->

            </div>

            <div class='col-lg-3 col-md-6'>

              <!-- Footer Widget -->
              <div class='footer-widget footer-contact'>
                <h2 class='footer-title'>İletişime Geçin</h2>
                <div class='footer-contact-info'>
                  <div class='footer-address'>
                    <span><i class='fas fa-map-marker-alt'></i></span>
                    <p> {{ settings.settings.address }} </p>
                  </div>
                  <p>
                    <i class='fas fa-phone-alt'></i>
                    <a :href='"tel:"+settings.settings.phone' rel='dofollow' title='Telefon' class='text-white'>{{settings.settings.phone}}</a>
                  </p>
                  <p class='mb-0'>
                    <i class='fas fa-envelope'></i>
                    <a :href='"mailto:"+settings.settings.email' rel='dofollow' title='E-Mail' class='text-white'>{{ settings.settings.email }}</a>
                  </p>
                </div>
              </div>
              <!-- /Footer Widget -->

            </div>

          </div>
        </div>
      </div>
      <!-- /Footer Top -->

      <!-- Footer Bottom -->
      <div class='footer-bottom'>
        <div class='container-fluid'>

          <!-- Copyright -->
          <div class='copyright'>
            <div class='row'>
              <div class='col-md-6 col-lg-6'>
                <div class='copyright-text'>
                  <p class='mb-0'>&copy; {{ new Date().getFullYear() }}
                    <NuxtLink rel='dofollow' to='/' :title='settings.settings.company_name'>{{ settings.settings.company_name }}</NuxtLink>
                    . Tüm Hakları Saklıdır.
                  </p>
                </div>
              </div>
              <div class='col-md-6 col-lg-6'>

                <!-- Copyright Menu -->
                <div class='copyright-menu'>
                  <ul class='policy-menu'>
                    <li>
                      <NuxtLink rel='dofollow' to='/term-condition' title='Kullanım Koşulları'>Kullanım Koşulları</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink rel='dofollow' to='/privacy-policy' title='Gizlilik Politikası'>Gizlilik Politikası</NuxtLink>
                    </li>
                  </ul>
                </div>
                <!-- /Copyright Menu -->

              </div>
            </div>
          </div>
          <!-- /Copyright -->

        </div>
      </div>
      <!-- /Footer Bottom -->

    </footer>
    <!-- /Footer -->

  </div>
</template>

<script>
export default {
  name: 'DefaultFooter',
  props: ['settings'],
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
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
  }
}
</script>
