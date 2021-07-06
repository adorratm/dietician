export default {
  server: {
    port:5000,
    host: "0.0.0.0"
  },
  target: "server",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: "tr"
    },
    titleTemplate: 'Klinik Diyetisyen',
    title: 'Klinik Diyetisyen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui' },
      { hid: 'description', name: 'description', content: '' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/vee-validate"
    },
    {
      src: "~/plugins/axios"
    },
    { src: '~/plugins/persistedState.client.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    '@nuxtjs/dotenv',
    'dotenv-parse-variables',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
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
    fullPathRedirect:true,
    resetOnError:true,
    rewriteRedirects:true,
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
        autoLogout: true,
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
        autoLogout: true,
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
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
    base: '/'
  }
}
