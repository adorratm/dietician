<template>
  <div>
    <!-- Home Banner -->
    <section id='home' class='divider'>
      <div class='container-fluid p-0'>
        <!--- slider ---->
        <Slider :settings='settings' v-if='!isEmpty(settings)'/>
        <!--- /slider ---->
      </div>
    </section>
    <!-- /Home Banner -->

    <!-- Popular Section -->
    <section class='section section-doctor'>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-lg-4'>
            <div class='section-header '>
              <h2>Diyetisyenler</h2>
              <p>En iyi hizmet bir tık uzağınızda... </p>
            </div>
            <div class='about-content'>
              <p>"Uzman diyetisyen yardımıyla zayıflamak istiyorum. Yüz yüze görüşmelerin yanında evimden, işimden trafiğe girmeden rahat rahat diyetisyenime ulaşayım, sevdiğim yiyeceklerden oluşan, ihtiyaçlarıma özel hazırlanmış bir diyet planım olsun, hedef kiloma en kısa sürede ulaşayım." diyorsanız diyetisyenlerimize hemen ulaşabilirsiniz</p>
              <nuxt-link to='/dieticians'>Tüm Diyetisyenler</nuxt-link>
            </div>
          </div>
          <div class='col-lg-8'>
            <div class='doctor-slider slider'>

              <!-- Doctor Widget -->
              <div class='profile-widget'>
                <div class='doc-img'>
                  <NuxtLink to='doctor-profile'>
                    <img class='img-fluid' alt='User Image' src='../assets/img/doctors/doctor-01.jpg'>
                  </NuxtLink>
                  <a href='javascript:void(0)' class='fav-btn'>
                    <i class='far fa-bookmark'></i>
                  </a>
                </div>
                <div class='pro-content'>
                  <h3 class='title'>
                    <NuxtLink to='doctor-profile'>Ruby Perrin</NuxtLink>
                    <i class='fas fa-check-circle verified'></i>
                  </h3>
                  <p class='speciality'>MDS - Periodontology and Oral Implantology, BDS</p>
                  <div class='rating'>
                    <i class='fas fa-star filled'></i>
                    <i class='fas fa-star filled'></i>
                    <i class='fas fa-star filled'></i>
                    <i class='fas fa-star filled'></i>
                    <i class='fas fa-star filled'></i>
                    <span class='d-inline-block average-rating'>(17)</span>
                  </div>
                  <ul class='available-info'>
                    <li>
                      <i class='fas fa-map-marker-alt'></i> Florida, USA
                    </li>
                    <li>
                      <i class='far fa-clock'></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i class='far fa-money-bill-alt'></i> $300 - $1000
                      <i class='fas fa-info-circle' data-toggle='tooltip' title='Lorem Ipsum'></i>
                    </li>
                  </ul>
                  <div class='row row-sm'>
                    <div class='col-6'>
                      <NuxtLink to='doctor-profile' class='btn view-btn'>View Profile</NuxtLink>
                    </div>
                    <div class='col-6'>
                      <NuxtLink to='booking' class='btn book-btn'>Book Now</NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Doctor Widget -->

            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /Popular Section -->

    <!-- Blog Section -->
    <section class="our-blog-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="section-heading">
              <h2>Makaleler</h2>
              <p>En yeni makalelerden haberdar olun.</p>
            </div>
          </div>
          <div class="col-md-6 text-right">
            <div class="owl-nav slide-nav-4 text-right nav-control"></div>
          </div>
        </div>
        <div class="owl-carousel blogs owl-theme">
          <div class="item">
            <div class="our-blogs">
              <div class="blogs-img">
                <NuxtLink to="/blog-details"><img src="../assets/img/blog-1.jpg" alt="" class="img-fluid"></NuxtLink>
                <div class="blogs-overlay d-flex">
                  <img src="../assets/img/doctors/doctor-thumb-01.jpg" alt="" class="img-fluid">
                  <span class="blogs-writter">Dr. Ruby Perrin</span>
                </div>
              </div>
              <div class="blogs-info">
                <span>Urology</span>
                <NuxtLink to="/blog-details"><h4>Doccure – Making your clinic painless visit?</h4></NuxtLink>
                <p>Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                <span class="blogs-time"><i class="far fa-clock"></i> 3 Dec 2021</span>
              </div>
              <div class="blogs-nav">
                <v-btn to="/blog-details" color='primary'>Devamını Oku</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /Blog Section -->
    <Nuxt />
  </div>
</template>

<script>
import Slider from "~/components/frontend/slider"
export default {
  components:{
    Slider
  },
  mounted() {
    // Slick Slider

    if ($('.specialities-slider').length > 0) {
      $('.specialities-slider').slick({
        dots: true,
        autoplay: false,
        infinite: true,
        variableWidth: true,
        prevArrow: false,
        nextArrow: false
      })
    }

    if ($('.doctor-slider').length > 0) {
      $('.doctor-slider').slick({
        dots: false,
        autoplay: false,
        infinite: true,
        variableWidth: true
      })
    }
    if ($('.features-slider').length > 0) {
      $('.features-slider').slick({
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        speed: 500,
        variableWidth: true,
        arrows: false,
        autoplay: false,
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 1
          }
        }]
      })
    }


    // Slick Slider
    if ($('.features-slider1').length == 1) {
      $('.features-slider1').slick({
        dots: false,
        infinite: true,
        centerMode: false,
        slidesToShow: 1,
        speed: 500,
        variableWidth: true,
        arrows: true,
        autoplay: false,
        responsive: [{
          breakpoint: 992,
          settings: {
            slidesToShow: 1
          }

        }]
      })
    }
    if ($('.slider-1').length > 0) {
      $('.slider-1').slick()
    }

    if($('.owl-carousel.blogs').length > 0) {
      $('.owl-carousel.blogs').owlCarousel({
        loop:true,
        margin:15,
        dots: false,
        nav:true,
        navContainer: '.slide-nav-4',
        navText: [ '<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>' ],
        responsive:{
          0:{
            items:1
          },
          500:{
            items:1
          },
          768:{
            items:2
          },
          1000:{
            items:3
          },
          1300:{
            items:4
          }
        }
      })
    }

    //Home pharmacy slider
    if ($('.pharmacy-home-slider .swiper-container').length > 0) {
      new Swiper('.pharmacy-home-slider .swiper-container', {
        loop: true,
        speed: 1000,
        pagination: {
          el: '.pharmacy-home-slider .swiper-pagination',
          dynamicBullets: true,
          clickable: true
        },
        navigation: {
          nextEl: '.pharmacy-home-slider .swiper-button-next',
          prevEl: '.pharmacy-home-slider .swiper-button-prev'
        }
      })
    }

  },
  computed: {
    settings(){
      return this.$store.state.settings
    },
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
    searchEveryWhere(){
      try {
        let formData = new FormData(this.$refs.searchEveryWhere)
        this.$router.push(formData.get("type")+"?search="+formData.get("search"))
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
