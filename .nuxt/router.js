import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7ec4cc00 = () => interopDefault(import('..\\pages\\blogs\\index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _12665cc4 = () => interopDefault(import('..\\pages\\calorie\\index.vue' /* webpackChunkName: "pages/calorie/index" */))
const _be664a86 = () => interopDefault(import('..\\pages\\criterias\\index.vue' /* webpackChunkName: "pages/criterias/index" */))
const _6fb708e6 = () => interopDefault(import('..\\pages\\dietician-login\\index.vue' /* webpackChunkName: "pages/dietician-login/index" */))
const _6fe57bdc = () => interopDefault(import('..\\pages\\dietician-panel\\index.vue' /* webpackChunkName: "pages/dietician-panel/index" */))
const _8973758a = () => interopDefault(import('..\\pages\\dietician-register\\index.vue' /* webpackChunkName: "pages/dietician-register/index" */))
const _a42b9890 = () => interopDefault(import('..\\pages\\dieticians\\index.vue' /* webpackChunkName: "pages/dieticians/index" */))
const _2f4f0fb6 = () => interopDefault(import('..\\pages\\exercises\\index.vue' /* webpackChunkName: "pages/exercises/index" */))
const _458208a8 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _456acf2d = () => interopDefault(import('..\\pages\\panel\\index.vue' /* webpackChunkName: "pages/panel/index" */))
const _805b1eb0 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _8377afa8 = () => interopDefault(import('..\\pages\\recipes\\index.vue' /* webpackChunkName: "pages/recipes/index" */))
const _b6244380 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _696d9091 = () => interopDefault(import('..\\pages\\dietician-panel\\blogs\\index.vue' /* webpackChunkName: "pages/dietician-panel/blogs/index" */))
const _837e302c = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\index.vue' /* webpackChunkName: "pages/dietician-panel/consultants/index" */))
const _46a5be64 = () => interopDefault(import('..\\pages\\dietician-panel\\criterias\\index.vue' /* webpackChunkName: "pages/dietician-panel/criterias/index" */))
const _235c018e = () => interopDefault(import('..\\pages\\dietician-panel\\login\\index.vue' /* webpackChunkName: "pages/dietician-panel/login/index" */))
const _72f0be7d = () => interopDefault(import('..\\pages\\dietician-panel\\recipes\\index.vue' /* webpackChunkName: "pages/dietician-panel/recipes/index" */))
const _67b43e00 = () => interopDefault(import('..\\pages\\panel\\blog-categories\\index.vue' /* webpackChunkName: "pages/panel/blog-categories/index" */))
const _d831c1d4 = () => interopDefault(import('..\\pages\\panel\\blogs\\index.vue' /* webpackChunkName: "pages/panel/blogs/index" */))
const _09fc365a = () => interopDefault(import('..\\pages\\panel\\criterias\\index.vue' /* webpackChunkName: "pages/panel/criterias/index" */))
const _cb53273c = () => interopDefault(import('..\\pages\\panel\\dieticians\\index.vue' /* webpackChunkName: "pages/panel/dieticians/index" */))
const _468fbd16 = () => interopDefault(import('..\\pages\\panel\\diseases\\index.vue' /* webpackChunkName: "pages/panel/diseases/index" */))
const _7a8f80c9 = () => interopDefault(import('..\\pages\\panel\\e-diet-foods\\index.vue' /* webpackChunkName: "pages/panel/e-diet-foods/index" */))
const _c02d1f94 = () => interopDefault(import('..\\pages\\panel\\exercise-categories\\index.vue' /* webpackChunkName: "pages/panel/exercise-categories/index" */))
const _ecf7cc68 = () => interopDefault(import('..\\pages\\panel\\exercises\\index.vue' /* webpackChunkName: "pages/panel/exercises/index" */))
const _18cb8dbe = () => interopDefault(import('..\\pages\\panel\\login\\index.vue' /* webpackChunkName: "pages/panel/login/index" */))
const _3c17b95b = () => interopDefault(import('..\\pages\\panel\\nutrients\\index.vue' /* webpackChunkName: "pages/panel/nutrients/index" */))
const _08c0caa8 = () => interopDefault(import('..\\pages\\panel\\recipe-categories\\index.vue' /* webpackChunkName: "pages/panel/recipe-categories/index" */))
const _357e807c = () => interopDefault(import('..\\pages\\panel\\recipes\\index.vue' /* webpackChunkName: "pages/panel/recipes/index" */))
const _0c063bea = () => interopDefault(import('..\\pages\\panel\\settings\\index.vue' /* webpackChunkName: "pages/panel/settings/index" */))
const _cca672ea = () => interopDefault(import('..\\pages\\panel\\slides\\index.vue' /* webpackChunkName: "pages/panel/slides/index" */))
const _33b1e5bf = () => interopDefault(import('..\\pages\\panel\\users\\index.vue' /* webpackChunkName: "pages/panel/users/index" */))
const _3fffe1e2 = () => interopDefault(import('..\\pages\\dietician-panel\\blogs\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/blogs/add/index" */))
const _048a3a29 = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/consultants/add/index" */))
const _21174df1 = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\ediet\\index.vue' /* webpackChunkName: "pages/dietician-panel/consultants/ediet/index" */))
const _75081aa2 = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\new-consultant\\index.vue' /* webpackChunkName: "pages/dietician-panel/consultants/new-consultant/index" */))
const _1e11efc5 = () => interopDefault(import('..\\pages\\dietician-panel\\criterias\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/criterias/add/index" */))
const _0d288776 = () => interopDefault(import('..\\pages\\dietician-panel\\recipes\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/recipes/add/index" */))
const _11637ed3 = () => interopDefault(import('..\\pages\\panel\\blog-categories\\add\\index.vue' /* webpackChunkName: "pages/panel/blog-categories/add/index" */))
const _2778c306 = () => interopDefault(import('..\\pages\\panel\\blogs\\add\\index.vue' /* webpackChunkName: "pages/panel/blogs/add/index" */))
const _529fe6e0 = () => interopDefault(import('..\\pages\\panel\\criterias\\add\\index.vue' /* webpackChunkName: "pages/panel/criterias/add/index" */))
const _404dc07d = () => interopDefault(import('..\\pages\\panel\\diseases\\add\\index.vue' /* webpackChunkName: "pages/panel/diseases/add/index" */))
const _b3b956ac = () => interopDefault(import('..\\pages\\panel\\e-diet-foods\\add\\index.vue' /* webpackChunkName: "pages/panel/e-diet-foods/add/index" */))
const _feb1fd46 = () => interopDefault(import('..\\pages\\panel\\exercise-categories\\add\\index.vue' /* webpackChunkName: "pages/panel/exercise-categories/add/index" */))
const _2b7634f2 = () => interopDefault(import('..\\pages\\panel\\exercises\\add\\index.vue' /* webpackChunkName: "pages/panel/exercises/add/index" */))
const _2221a758 = () => interopDefault(import('..\\pages\\panel\\nutrients\\add\\index.vue' /* webpackChunkName: "pages/panel/nutrients/add/index" */))
const _7b96f0a7 = () => interopDefault(import('..\\pages\\panel\\recipe-categories\\add\\index.vue' /* webpackChunkName: "pages/panel/recipe-categories/add/index" */))
const _9120ed5e = () => interopDefault(import('..\\pages\\panel\\recipes\\add\\index.vue' /* webpackChunkName: "pages/panel/recipes/add/index" */))
const _7a955828 = () => interopDefault(import('..\\pages\\panel\\slides\\add\\index.vue' /* webpackChunkName: "pages/panel/slides/add/index" */))
const _3e4dbb6a = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\ediet\\add\\_id.vue' /* webpackChunkName: "pages/dietician-panel/consultants/ediet/add/_id" */))
const _0b487f70 = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\ediet\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/consultants/ediet/update/_id" */))
const _b36b6be0 = () => interopDefault(import('..\\pages\\dietician-panel\\blogs\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/blogs/update/_id" */))
const _730afaa9 = () => interopDefault(import('..\\pages\\dietician-panel\\consultants\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/consultants/update/_id" */))
const _eb0c0ee6 = () => interopDefault(import('..\\pages\\dietician-panel\\criterias\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/criterias/update/_id" */))
const _7e3656fc = () => interopDefault(import('..\\pages\\dietician-panel\\recipes\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/recipes/update/_id" */))
const _015a4b3f = () => interopDefault(import('..\\pages\\panel\\blog-categories\\update\\_id.vue' /* webpackChunkName: "pages/panel/blog-categories/update/_id" */))
const _fb03be56 = () => interopDefault(import('..\\pages\\panel\\blogs\\update\\_id.vue' /* webpackChunkName: "pages/panel/blogs/update/_id" */))
const _30aa365c = () => interopDefault(import('..\\pages\\panel\\criterias\\update\\_id.vue' /* webpackChunkName: "pages/panel/criterias/update/_id" */))
const _a44d75be = () => interopDefault(import('..\\pages\\panel\\dieticians\\update\\_id.vue' /* webpackChunkName: "pages/panel/dieticians/update/_id" */))
const _a08f8256 = () => interopDefault(import('..\\pages\\panel\\diseases\\update\\_id.vue' /* webpackChunkName: "pages/panel/diseases/update/_id" */))
const _04953048 = () => interopDefault(import('..\\pages\\panel\\e-diet-foods\\update\\_id.vue' /* webpackChunkName: "pages/panel/e-diet-foods/update/_id" */))
const _7a8719f5 = () => interopDefault(import('..\\pages\\panel\\exercise-categories\\update\\_id.vue' /* webpackChunkName: "pages/panel/exercise-categories/update/_id" */))
const _44a5bb0b = () => interopDefault(import('..\\pages\\panel\\exercises\\update\\_id.vue' /* webpackChunkName: "pages/panel/exercises/update/_id" */))
const _0861335a = () => interopDefault(import('..\\pages\\panel\\nutrients\\update\\_id.vue' /* webpackChunkName: "pages/panel/nutrients/update/_id" */))
const _44d5d82a = () => interopDefault(import('..\\pages\\panel\\recipe-categories\\update\\_id.vue' /* webpackChunkName: "pages/panel/recipe-categories/update/_id" */))
const _1ccf9081 = () => interopDefault(import('..\\pages\\panel\\recipes\\update\\_id.vue' /* webpackChunkName: "pages/panel/recipes/update/_id" */))
const _8338c6ec = () => interopDefault(import('..\\pages\\panel\\slides\\update\\_id.vue' /* webpackChunkName: "pages/panel/slides/update/_id" */))
const _beccf684 = () => interopDefault(import('..\\pages\\panel\\users\\update\\_id.vue' /* webpackChunkName: "pages/panel/users/update/_id" */))
const _73ce8c28 = () => interopDefault(import('..\\pages\\dieticians\\appointments\\_id.vue' /* webpackChunkName: "pages/dieticians/appointments/_id" */))
const _1aca1c68 = () => interopDefault(import('..\\pages\\blogs\\_id.vue' /* webpackChunkName: "pages/blogs/_id" */))
const _4aa67fa8 = () => interopDefault(import('..\\pages\\calorie\\_id.vue' /* webpackChunkName: "pages/calorie/_id" */))
const _43a9879e = () => interopDefault(import('..\\pages\\exercises\\_id.vue' /* webpackChunkName: "pages/exercises/_id" */))
const _2a5374d8 = () => interopDefault(import('..\\pages\\recipes\\_id.vue' /* webpackChunkName: "pages/recipes/_id" */))
const _219e6783 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blogs",
    component: _7ec4cc00,
    name: "blogs"
  }, {
    path: "/calorie",
    component: _12665cc4,
    name: "calorie"
  }, {
    path: "/criterias",
    component: _be664a86,
    name: "criterias"
  }, {
    path: "/dietician-login",
    component: _6fb708e6,
    name: "dietician-login"
  }, {
    path: "/dietician-panel",
    component: _6fe57bdc,
    name: "dietician-panel"
  }, {
    path: "/dietician-register",
    component: _8973758a,
    name: "dietician-register"
  }, {
    path: "/dieticians",
    component: _a42b9890,
    name: "dieticians"
  }, {
    path: "/exercises",
    component: _2f4f0fb6,
    name: "exercises"
  }, {
    path: "/login",
    component: _458208a8,
    name: "login"
  }, {
    path: "/panel",
    component: _456acf2d,
    name: "panel"
  }, {
    path: "/profile",
    component: _805b1eb0,
    name: "profile"
  }, {
    path: "/recipes",
    component: _8377afa8,
    name: "recipes"
  }, {
    path: "/register",
    component: _b6244380,
    name: "register"
  }, {
    path: "/dietician-panel/blogs",
    component: _696d9091,
    name: "dietician-panel-blogs"
  }, {
    path: "/dietician-panel/consultants",
    component: _837e302c,
    name: "dietician-panel-consultants"
  }, {
    path: "/dietician-panel/criterias",
    component: _46a5be64,
    name: "dietician-panel-criterias"
  }, {
    path: "/dietician-panel/login",
    component: _235c018e,
    name: "dietician-panel-login"
  }, {
    path: "/dietician-panel/recipes",
    component: _72f0be7d,
    name: "dietician-panel-recipes"
  }, {
    path: "/panel/blog-categories",
    component: _67b43e00,
    name: "panel-blog-categories"
  }, {
    path: "/panel/blogs",
    component: _d831c1d4,
    name: "panel-blogs"
  }, {
    path: "/panel/criterias",
    component: _09fc365a,
    name: "panel-criterias"
  }, {
    path: "/panel/dieticians",
    component: _cb53273c,
    name: "panel-dieticians"
  }, {
    path: "/panel/diseases",
    component: _468fbd16,
    name: "panel-diseases"
  }, {
    path: "/panel/e-diet-foods",
    component: _7a8f80c9,
    name: "panel-e-diet-foods"
  }, {
    path: "/panel/exercise-categories",
    component: _c02d1f94,
    name: "panel-exercise-categories"
  }, {
    path: "/panel/exercises",
    component: _ecf7cc68,
    name: "panel-exercises"
  }, {
    path: "/panel/login",
    component: _18cb8dbe,
    name: "panel-login"
  }, {
    path: "/panel/nutrients",
    component: _3c17b95b,
    name: "panel-nutrients"
  }, {
    path: "/panel/recipe-categories",
    component: _08c0caa8,
    name: "panel-recipe-categories"
  }, {
    path: "/panel/recipes",
    component: _357e807c,
    name: "panel-recipes"
  }, {
    path: "/panel/settings",
    component: _0c063bea,
    name: "panel-settings"
  }, {
    path: "/panel/slides",
    component: _cca672ea,
    name: "panel-slides"
  }, {
    path: "/panel/users",
    component: _33b1e5bf,
    name: "panel-users"
  }, {
    path: "/dietician-panel/blogs/add",
    component: _3fffe1e2,
    name: "dietician-panel-blogs-add"
  }, {
    path: "/dietician-panel/consultants/add",
    component: _048a3a29,
    name: "dietician-panel-consultants-add"
  }, {
    path: "/dietician-panel/consultants/ediet",
    component: _21174df1,
    name: "dietician-panel-consultants-ediet"
  }, {
    path: "/dietician-panel/consultants/new-consultant",
    component: _75081aa2,
    name: "dietician-panel-consultants-new-consultant"
  }, {
    path: "/dietician-panel/criterias/add",
    component: _1e11efc5,
    name: "dietician-panel-criterias-add"
  }, {
    path: "/dietician-panel/recipes/add",
    component: _0d288776,
    name: "dietician-panel-recipes-add"
  }, {
    path: "/panel/blog-categories/add",
    component: _11637ed3,
    name: "panel-blog-categories-add"
  }, {
    path: "/panel/blogs/add",
    component: _2778c306,
    name: "panel-blogs-add"
  }, {
    path: "/panel/criterias/add",
    component: _529fe6e0,
    name: "panel-criterias-add"
  }, {
    path: "/panel/diseases/add",
    component: _404dc07d,
    name: "panel-diseases-add"
  }, {
    path: "/panel/e-diet-foods/add",
    component: _b3b956ac,
    name: "panel-e-diet-foods-add"
  }, {
    path: "/panel/exercise-categories/add",
    component: _feb1fd46,
    name: "panel-exercise-categories-add"
  }, {
    path: "/panel/exercises/add",
    component: _2b7634f2,
    name: "panel-exercises-add"
  }, {
    path: "/panel/nutrients/add",
    component: _2221a758,
    name: "panel-nutrients-add"
  }, {
    path: "/panel/recipe-categories/add",
    component: _7b96f0a7,
    name: "panel-recipe-categories-add"
  }, {
    path: "/panel/recipes/add",
    component: _9120ed5e,
    name: "panel-recipes-add"
  }, {
    path: "/panel/slides/add",
    component: _7a955828,
    name: "panel-slides-add"
  }, {
    path: "/dietician-panel/consultants/ediet/add/:id",
    component: _3e4dbb6a,
    name: "dietician-panel-consultants-ediet-add-id"
  }, {
    path: "/dietician-panel/consultants/ediet/update/:id",
    component: _0b487f70,
    name: "dietician-panel-consultants-ediet-update-id"
  }, {
    path: "/dietician-panel/blogs/update/:id",
    component: _b36b6be0,
    name: "dietician-panel-blogs-update-id"
  }, {
    path: "/dietician-panel/consultants/update/:id",
    component: _730afaa9,
    name: "dietician-panel-consultants-update-id"
  }, {
    path: "/dietician-panel/criterias/update/:id",
    component: _eb0c0ee6,
    name: "dietician-panel-criterias-update-id"
  }, {
    path: "/dietician-panel/recipes/update/:id",
    component: _7e3656fc,
    name: "dietician-panel-recipes-update-id"
  }, {
    path: "/panel/blog-categories/update/:id",
    component: _015a4b3f,
    name: "panel-blog-categories-update-id"
  }, {
    path: "/panel/blogs/update/:id?",
    component: _fb03be56,
    name: "panel-blogs-update-id"
  }, {
    path: "/panel/criterias/update/:id?",
    component: _30aa365c,
    name: "panel-criterias-update-id"
  }, {
    path: "/panel/dieticians/update/:id?",
    component: _a44d75be,
    name: "panel-dieticians-update-id"
  }, {
    path: "/panel/diseases/update/:id?",
    component: _a08f8256,
    name: "panel-diseases-update-id"
  }, {
    path: "/panel/e-diet-foods/update/:id?",
    component: _04953048,
    name: "panel-e-diet-foods-update-id"
  }, {
    path: "/panel/exercise-categories/update/:id",
    component: _7a8719f5,
    name: "panel-exercise-categories-update-id"
  }, {
    path: "/panel/exercises/update/:id?",
    component: _44a5bb0b,
    name: "panel-exercises-update-id"
  }, {
    path: "/panel/nutrients/update/:id?",
    component: _0861335a,
    name: "panel-nutrients-update-id"
  }, {
    path: "/panel/recipe-categories/update/:id",
    component: _44d5d82a,
    name: "panel-recipe-categories-update-id"
  }, {
    path: "/panel/recipes/update/:id?",
    component: _1ccf9081,
    name: "panel-recipes-update-id"
  }, {
    path: "/panel/slides/update/:id?",
    component: _8338c6ec,
    name: "panel-slides-update-id"
  }, {
    path: "/panel/users/update/:id?",
    component: _beccf684,
    name: "panel-users-update-id"
  }, {
    path: "/dieticians/appointments/:id?",
    component: _73ce8c28,
    name: "dieticians-appointments-id"
  }, {
    path: "/blogs/:id",
    component: _1aca1c68,
    name: "blogs-id"
  }, {
    path: "/calorie/:id",
    component: _4aa67fa8,
    name: "calorie-id"
  }, {
    path: "/exercises/:id",
    component: _43a9879e,
    name: "exercises-id"
  }, {
    path: "/recipes/:id",
    component: _2a5374d8,
    name: "recipes-id"
  }, {
    path: "/",
    component: _219e6783,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
