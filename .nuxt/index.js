import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_31f27ab0 from 'nuxt_plugin_plugin_31f27ab0' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_plugin_2fb6bf44 from 'nuxt_plugin_plugin_2fb6bf44' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_workbox_7116832f from 'nuxt_plugin_workbox_7116832f' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_75424ea2 from 'nuxt_plugin_metaplugin_75424ea2' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_6bf303ba from 'nuxt_plugin_iconplugin_6bf303ba' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_libmoduleplugin66164b6a_41bbf145 from 'nuxt_plugin_libmoduleplugin66164b6a_41bbf145' // Source: .\\lib.module.plugin.66164b6a.js (mode: 'client')
import nuxt_plugin_nuxtizitoastplugin43e29816_2f4df6d3 from 'nuxt_plugin_nuxtizitoastplugin43e29816_2f4df6d3' // Source: .\\nuxt-izitoast.plugin.43e29816.js (mode: 'all')
import nuxt_plugin_axios_a0ef125a from 'nuxt_plugin_axios_a0ef125a' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_condition_3c7ad665 from 'nuxt_plugin_condition_3c7ad665' // Source: ..\\plugins\\condition (mode: 'client')
import nuxt_plugin_veevalidate_6e5ad03a from 'nuxt_plugin_veevalidate_6e5ad03a' // Source: ..\\plugins\\vee-validate (mode: 'all')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ..\\plugins\\axios (mode: 'all')
import nuxt_plugin_persistedStateclient_3b127e9c from 'nuxt_plugin_persistedStateclient_3b127e9c' // Source: ..\\plugins\\persistedState.client.js (mode: 'client')
import nuxt_plugin_auth_5050e806 from 'nuxt_plugin_auth_5050e806' // Source: .\\auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"htmlAttrs":{"lang":"en"},"titleTemplate":"%s - Klinik Diyetisyen","title":"Klinik Diyetisyen","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui"},{"http-equiv":"cache-control","content":"no-cache, no-store, must-revalidate, max-age=0"},{"http-equiv":"expires","content":"0"},{"http-equiv":"pragma","content":"no-cache"},{"hid":"description","name":"description","content":""},{"hid":"charset","charset":"utf-8"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"dietician"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"dietician"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"dietician"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Klinikdiyetisyen.com Nuxt JS &amp; Vue JS Frontend Development &amp; Production"}],"link":[{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicon.png"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fbootstrap\u002F4.6.0\u002Fcss\u002Fbootstrap.min.css","ssr":false},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.15.4\u002Fcss\u002Fall.min.css","ssr":false},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F5.15.4\u002Fcss\u002Fv4-shims.min.css","ssr":false},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FSwiper\u002F5.3.6\u002Fcss\u002Fswiper.min.css","ssr":false},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fbootstrap-datetimepicker\u002F4.17.47\u002Fcss\u002Fbootstrap-datetimepicker.min.css","ssr":false},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fselect2\u002F4.1.0-rc.0\u002Fcss\u002Fselect2.min.css","ssr":false},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.datatables.net\u002Fv\u002Fbs4\u002Fjszip-2.5.0\u002Fdt-1.11.1\u002Faf-2.3.7\u002Fb-2.0.0\u002Fb-colvis-2.0.0\u002Fb-html5-2.0.0\u002Fb-print-2.0.0\u002Fcr-1.5.4\u002Fdate-1.1.1\u002Ffc-3.3.3\u002Ffh-3.1.9\u002Fkt-2.6.4\u002Fr-2.2.9\u002Frg-1.1.3\u002Frr-1.2.8\u002Fsc-2.0.5\u002Fsb-1.2.0\u002Fsp-1.4.0\u002Fsl-1.3.3\u002Fdatatables.min.css","ssr":false},{"rel":"stylesheet","href":"\u002Ffullcalendar\u002Ffullcalendar.min.css","ssr":false},{"rel":"stylesheet","href":"\u002Fmorris\u002Fmorris.css","ssr":false},{"rel":"stylesheet","href":"\u002Fowl.carousel.min.css","ssr":false},{"rel":"stylesheet","href":"\u002Fapex\u002Fapexcharts.css","ssr":false},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"},{"hid":"shortcut-icon","rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64x64.5f6a36.png"},{"hid":"apple-touch-icon","rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512x512.5f6a36.png","sizes":"512x512"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.46ecad9f.json","hid":"manifest"}],"script":[{"src":"https:\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fjquery\u002F3.5.1\u002Fjquery.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fpopper.js\u002F1.16.0\u002Fumd\u002Fpopper.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fmaxcdn.bootstrapcdn.com\u002Fbootstrap\u002F4.5.2\u002Fjs\u002Fbootstrap.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Funpkg.com\u002Fslick-carousel@1.8.0\u002Fslick\u002Fslick.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FSwiper\u002F5.3.6\u002Fjs\u002Fswiper.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-circle-progress\u002F1.2.2\u002Fcircle-progress.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fselect2\u002F4.0.13\u002Fjs\u002Fselect2.min.js ","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmoment.js\u002F2.29.1\u002Fmoment.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fbootstrap-datetimepicker\u002F4.17.47\u002Fjs\u002Fbootstrap-datetimepicker.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"https:\u002F\u002Fmaps.googleapis.com\u002Fmaps\u002Fapi\u002Fjs?key=AIzaSyAftUbkeTKuYNcqK7UES0VF7X5-xdR4Mug","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Fdatatables\u002Fjquery.dataTables.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Fdatatables\u002FdataTables.bootstrap4.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Ffullcalendar\u002Fjquery-ui.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Ffullcalendar\u002Ffullcalendar.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Ffullcalendar\u002Fjquery.fullcalendar.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Fraphael\u002Fraphael.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Fmorris\u002Fmorris.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Fowl.carousel.min.js","type":"text\u002Fjavascript","ssr":false},{"src":"\u002Fapex\u002Fapexcharts.min.js","type":"text\u002Fjavascript","ssr":false}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_31f27ab0 === 'function') {
    await nuxt_plugin_plugin_31f27ab0(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_2fb6bf44 === 'function') {
    await nuxt_plugin_plugin_2fb6bf44(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_7116832f === 'function') {
    await nuxt_plugin_workbox_7116832f(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_75424ea2 === 'function') {
    await nuxt_plugin_metaplugin_75424ea2(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_6bf303ba === 'function') {
    await nuxt_plugin_iconplugin_6bf303ba(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_libmoduleplugin66164b6a_41bbf145 === 'function') {
    await nuxt_plugin_libmoduleplugin66164b6a_41bbf145(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtizitoastplugin43e29816_2f4df6d3 === 'function') {
    await nuxt_plugin_nuxtizitoastplugin43e29816_2f4df6d3(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_a0ef125a === 'function') {
    await nuxt_plugin_axios_a0ef125a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_condition_3c7ad665 === 'function') {
    await nuxt_plugin_condition_3c7ad665(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_6e5ad03a === 'function') {
    await nuxt_plugin_veevalidate_6e5ad03a(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_persistedStateclient_3b127e9c === 'function') {
    await nuxt_plugin_persistedStateclient_3b127e9c(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_5050e806 === 'function') {
    await nuxt_plugin_auth_5050e806(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
