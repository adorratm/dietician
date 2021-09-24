export default {
  server: {
    port:5000,
    host: "0.0.0.0"
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: "tr"
    },
    titleTemplate: '%s - Klinik Diyetisyen',
    title: 'Klinik Diyetisyen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui' },
      { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate, max-age=0' },
      { 'http-equiv': 'expires', content: '0' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/css/bootstrap.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/v4-shims.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.6/css/swiper.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/css/select2.min.css",
        ssr:false,
      } ,
      {
        rel: "stylesheet",
        href:
          "https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.11.1/af-2.3.7/b-2.0.0/b-colvis-2.0.0/b-html5-2.0.0/b-print-2.0.0/cr-1.5.4/date-1.1.1/fc-3.3.3/fh-3.1.9/kt-2.6.4/r-2.2.9/rg-1.1.3/rr-1.2.8/sc-2.0.5/sb-1.2.0/sp-1.4.0/sl-1.3.3/datatables.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "/fullcalendar/fullcalendar.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "/morris/morris.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "/owl.carousel.min.css",
        ssr:false,
      },
      {
        rel: "stylesheet",
        href:
          "/apex/apexcharts.css",
        ssr:false,
      }
    ],
    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://unpkg.com/slick-carousel@1.8.0/slick/slick.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.6/js/swiper.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery-circle-progress/1.2.2/circle-progress.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js ",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAftUbkeTKuYNcqK7UES0VF7X5-xdR4Mug",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/datatables/jquery.dataTables.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/datatables/dataTables.bootstrap4.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/fullcalendar/jquery-ui.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/fullcalendar/fullcalendar.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/fullcalendar/jquery.fullcalendar.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/raphael/raphael.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/morris/morris.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/owl.carousel.min.js",
        type: "text/javascript",
        ssr:false,
      },
      {
        src:
          "/apex/apexcharts.min.js",
        type: "text/javascript",
        ssr:false,
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/condition', ssr: false},
    { src: "~/plugins/vee-validate" },
    { src: "~/plugins/axios" },
    { src: '~/plugins/persistedState.client.js' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/auth-next",
    '@nuxtjs/dotenv',
    'dotenv-parse-variables',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "nuxt-izitoast",
    "dropzone-nuxt",
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    workboxOptions: {
      skipWaiting: true
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: './plugins/vuetify-options.js'
  },

  // Auth module configuration
  auth:{
    strategies:{
      user:{
        scheme: 'refresh',
        token: {
          property: 'user.api_token',
          required: true,
          global:true,
          type: "Bearer",
          maxAge: 7200
        },
        refreshToken: {
          property: "user.api_token",
          data: "user.api_token",
          global:true,
          type: "Bearer",
          maxAge: 7200
        },
        endpoints:{
          login: {
            url: `${process.env.apiBaseUrl}users/login`,
            method: "post"
          },
          refresh: {
            url: `${process.env.apiBaseUrl}users/login`,
            method: "post"
          },
          logout: {
            url: `${process.env.apiBaseUrl}users/logout`,
            method: "post"
          },
          user: {
            url: `${process.env.apiBaseUrl}users/profile`,
            method: "get",
            autoFetch: true
          }
        },
        autoLogout: true,
      },
      dietician: {
        scheme: "refresh",
        token: {
          property: 'user.api_token',
          required: true,
          global:true,
          type: "Bearer",
          maxAge: 7200
        },
        refreshToken: {
          property: "user.api_token",
          data: "user.api_token",
          global:true,
          type: "Bearer",
          maxAge: 7200
        },
        endpoints: {
          login: {
            url: process.env.apiBaseUrl + "dietician/login",
            method: "post"
          },
          refresh: {
            url: process.env.apiBaseUrl + "dietician/login",
            method: "post"
          },
          logout: {
            url: process.env.apiBaseUrl + "dietician/logout",
            method: "post"
          },
          user: {
            url: process.env.apiBaseUrl + "dietician/profile",
            method: "get",
            autoFetch: true
          }
        },
        autoLogout: true
      },
      admin: {
        scheme: "refresh",
        token: {
          property: 'user.api_token',
          required: true,
          global:true,
          type: "Bearer",
          maxAge: 7200
        },
        refreshToken: {
          property: "user.api_token",
          data: "user.api_token",
          type: "Bearer",
          global:true,
          maxAge: 7200
        },
        endpoints: {
          login: {
            url: process.env.apiBaseUrl + "panel/login",
            method: "post"
          },
          refresh: {
            url: process.env.apiBaseUrl + "panel/login",
            method: "post"
          },
          logout: {
            url: process.env.apiBaseUrl + "panel/logout",
            method: "post"
          },
          user: {
            url: process.env.apiBaseUrl + "users/profile",
            method: "get",
            autoFetch: true
          }
        },
        autoLogout: true
      }
    },
    redirect:false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: false,
    transpile: [ "vee-validate/dist/rules", "vee-validate/dist/locale" ],
    splitChunks: {
      layouts: true
    },
    extend( config ) {
      config.resolve.symlinks = false;
    },
    loaders: {
      vue: {
        prettify: false
      }
    },
  },
  hooks: {
    "vue-renderer:ssr:context"( context ) {
      const routePath = JSON.stringify( context.nuxt.routePath );
      context.nuxt = {
        serverRendered: true,
        routePath
      };
    }
  },
  router: {
    base: "/"
  },
}
