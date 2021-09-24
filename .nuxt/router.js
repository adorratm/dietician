import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _12665cc4 = () => interopDefault(import('..\\pages\\calorie\\index.vue' /* webpackChunkName: "pages/calorie/index" */))
const _6fb708e6 = () => interopDefault(import('..\\pages\\dietician-login\\index.vue' /* webpackChunkName: "pages/dietician-login/index" */))
const _6fe57bdc = () => interopDefault(import('..\\pages\\dietician-panel\\index.vue' /* webpackChunkName: "pages/dietician-panel/index" */))
const _8973758a = () => interopDefault(import('..\\pages\\dietician-register\\index.vue' /* webpackChunkName: "pages/dietician-register/index" */))
const _a42b9890 = () => interopDefault(import('..\\pages\\dieticians\\index.vue' /* webpackChunkName: "pages/dieticians/index" */))
const _458208a8 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _456acf2d = () => interopDefault(import('..\\pages\\panel\\index.vue' /* webpackChunkName: "pages/panel/index" */))
const _8377afa8 = () => interopDefault(import('..\\pages\\recipes\\index.vue' /* webpackChunkName: "pages/recipes/index" */))
const _b6244380 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _6ef4f4bb = () => interopDefault(import('..\\pages\\dietician-panel\\blog-categories\\index.vue' /* webpackChunkName: "pages/dietician-panel/blog-categories/index" */))
const _46a5be64 = () => interopDefault(import('..\\pages\\dietician-panel\\criterias\\index.vue' /* webpackChunkName: "pages/dietician-panel/criterias/index" */))
const _59422e71 = () => interopDefault(import('..\\pages\\dietician-panel\\exercise-categories\\index.vue' /* webpackChunkName: "pages/dietician-panel/exercise-categories/index" */))
const _6b2f55c7 = () => interopDefault(import('..\\pages\\dietician-panel\\exercises\\index.vue' /* webpackChunkName: "pages/dietician-panel/exercises/index" */))
const _235c018e = () => interopDefault(import('..\\pages\\dietician-panel\\login\\index.vue' /* webpackChunkName: "pages/dietician-panel/login/index" */))
const _26f8aba7 = () => interopDefault(import('..\\pages\\dietician-panel\\recipe-categories\\index.vue' /* webpackChunkName: "pages/dietician-panel/recipe-categories/index" */))
const _72f0be7d = () => interopDefault(import('..\\pages\\dietician-panel\\recipes\\index.vue' /* webpackChunkName: "pages/dietician-panel/recipes/index" */))
const _0938573a = () => interopDefault(import('..\\pages\\dietician-panel\\users\\index.vue' /* webpackChunkName: "pages/dietician-panel/users/index" */))
const _67b43e00 = () => interopDefault(import('..\\pages\\panel\\blog-categories\\index.vue' /* webpackChunkName: "pages/panel/blog-categories/index" */))
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
const _f9baf010 = () => interopDefault(import('..\\pages\\dietician-panel\\blog-categories\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/blog-categories/add/index" */))
const _1e11efc5 = () => interopDefault(import('..\\pages\\dietician-panel\\criterias\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/criterias/add/index" */))
const _7bc2f002 = () => interopDefault(import('..\\pages\\dietician-panel\\exercise-categories\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/exercise-categories/add/index" */))
const _94922328 = () => interopDefault(import('..\\pages\\dietician-panel\\exercises\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/exercises/add/index" */))
const _79b8448c = () => interopDefault(import('..\\pages\\dietician-panel\\recipe-categories\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/recipe-categories/add/index" */))
const _0d288776 = () => interopDefault(import('..\\pages\\dietician-panel\\recipes\\add\\index.vue' /* webpackChunkName: "pages/dietician-panel/recipes/add/index" */))
const _11637ed3 = () => interopDefault(import('..\\pages\\panel\\blog-categories\\add\\index.vue' /* webpackChunkName: "pages/panel/blog-categories/add/index" */))
const _529fe6e0 = () => interopDefault(import('..\\pages\\panel\\criterias\\add\\index.vue' /* webpackChunkName: "pages/panel/criterias/add/index" */))
const _404dc07d = () => interopDefault(import('..\\pages\\panel\\diseases\\add\\index.vue' /* webpackChunkName: "pages/panel/diseases/add/index" */))
const _b3b956ac = () => interopDefault(import('..\\pages\\panel\\e-diet-foods\\add\\index.vue' /* webpackChunkName: "pages/panel/e-diet-foods/add/index" */))
const _feb1fd46 = () => interopDefault(import('..\\pages\\panel\\exercise-categories\\add\\index.vue' /* webpackChunkName: "pages/panel/exercise-categories/add/index" */))
const _2b7634f2 = () => interopDefault(import('..\\pages\\panel\\exercises\\add\\index.vue' /* webpackChunkName: "pages/panel/exercises/add/index" */))
const _4bdb0078 = () => interopDefault(import('..\\pages\\panel\\nonsense\\add-blog.vue' /* webpackChunkName: "pages/panel/nonsense/add-blog" */))
const _dbae00fc = () => interopDefault(import('..\\pages\\panel\\nonsense\\appointment-list.vue' /* webpackChunkName: "pages/panel/nonsense/appointment-list" */))
const _50d2355e = () => interopDefault(import('..\\pages\\panel\\nonsense\\blank-page.vue' /* webpackChunkName: "pages/panel/nonsense/blank-page" */))
const _68db6f18 = () => interopDefault(import('..\\pages\\panel\\nonsense\\blog.vue' /* webpackChunkName: "pages/panel/nonsense/blog" */))
const _acf9fbe6 = () => interopDefault(import('..\\pages\\panel\\nonsense\\blog-details.vue' /* webpackChunkName: "pages/panel/nonsense/blog-details" */))
const _4ad48a0c = () => interopDefault(import('..\\pages\\panel\\nonsense\\components.vue' /* webpackChunkName: "pages/panel/nonsense/components" */))
const _e5477e3c = () => interopDefault(import('..\\pages\\panel\\nonsense\\data-tables.vue' /* webpackChunkName: "pages/panel/nonsense/data-tables" */))
const _f0fe74f4 = () => interopDefault(import('..\\pages\\panel\\nonsense\\doctor-list.vue' /* webpackChunkName: "pages/panel/nonsense/doctor-list" */))
const _7c1f4e7f = () => interopDefault(import('..\\pages\\panel\\nonsense\\edit-blog.vue' /* webpackChunkName: "pages/panel/nonsense/edit-blog" */))
const _5acfcc26 = () => interopDefault(import('..\\pages\\panel\\nonsense\\error-404.vue' /* webpackChunkName: "pages/panel/nonsense/error-404" */))
const _0745f72a = () => interopDefault(import('..\\pages\\panel\\nonsense\\error-500.vue' /* webpackChunkName: "pages/panel/nonsense/error-500" */))
const _56c3757f = () => interopDefault(import('..\\pages\\panel\\nonsense\\forgot-password.vue' /* webpackChunkName: "pages/panel/nonsense/forgot-password" */))
const _0a226bcb = () => interopDefault(import('..\\pages\\panel\\nonsense\\form-basic-inputs.vue' /* webpackChunkName: "pages/panel/nonsense/form-basic-inputs" */))
const _9508af72 = () => interopDefault(import('..\\pages\\panel\\nonsense\\form-horizontal.vue' /* webpackChunkName: "pages/panel/nonsense/form-horizontal" */))
const _6b35cdcc = () => interopDefault(import('..\\pages\\panel\\nonsense\\form-input-groups.vue' /* webpackChunkName: "pages/panel/nonsense/form-input-groups" */))
const _f5be7962 = () => interopDefault(import('..\\pages\\panel\\nonsense\\form-mask.vue' /* webpackChunkName: "pages/panel/nonsense/form-mask" */))
const _04c59bc8 = () => interopDefault(import('..\\pages\\panel\\nonsense\\form-validation.vue' /* webpackChunkName: "pages/panel/nonsense/form-validation" */))
const _7277f159 = () => interopDefault(import('..\\pages\\panel\\nonsense\\form-vertical.vue' /* webpackChunkName: "pages/panel/nonsense/form-vertical" */))
const _a1a796b2 = () => interopDefault(import('..\\pages\\panel\\nonsense\\invoice.vue' /* webpackChunkName: "pages/panel/nonsense/invoice" */))
const _2d8698ca = () => interopDefault(import('..\\pages\\panel\\nonsense\\invoice-report.vue' /* webpackChunkName: "pages/panel/nonsense/invoice-report" */))
const _6c55c748 = () => interopDefault(import('..\\pages\\panel\\nonsense\\lock-screen.vue' /* webpackChunkName: "pages/panel/nonsense/lock-screen" */))
const _c594fc48 = () => interopDefault(import('..\\pages\\panel\\nonsense\\patient-list.vue' /* webpackChunkName: "pages/panel/nonsense/patient-list" */))
const _5049848e = () => interopDefault(import('..\\pages\\panel\\nonsense\\pending-blog.vue' /* webpackChunkName: "pages/panel/nonsense/pending-blog" */))
const _4f03701c = () => interopDefault(import('..\\pages\\panel\\nonsense\\pharmacy-list.vue' /* webpackChunkName: "pages/panel/nonsense/pharmacy-list" */))
const _cfabb19c = () => interopDefault(import('..\\pages\\panel\\nonsense\\product-list.vue' /* webpackChunkName: "pages/panel/nonsense/product-list" */))
const _25b645ba = () => interopDefault(import('..\\pages\\panel\\nonsense\\profile.vue' /* webpackChunkName: "pages/panel/nonsense/profile" */))
const _0b59e699 = () => interopDefault(import('..\\pages\\panel\\nonsense\\register.vue' /* webpackChunkName: "pages/panel/nonsense/register" */))
const _34a7be95 = () => interopDefault(import('..\\pages\\panel\\nonsense\\reviews.vue' /* webpackChunkName: "pages/panel/nonsense/reviews" */))
const _f2965cae = () => interopDefault(import('..\\pages\\panel\\nonsense\\specialities.vue' /* webpackChunkName: "pages/panel/nonsense/specialities" */))
const _7003563c = () => interopDefault(import('..\\pages\\panel\\nonsense\\tables-basic.vue' /* webpackChunkName: "pages/panel/nonsense/tables-basic" */))
const _44095890 = () => interopDefault(import('..\\pages\\panel\\nonsense\\transactions-list.vue' /* webpackChunkName: "pages/panel/nonsense/transactions-list" */))
const _2221a758 = () => interopDefault(import('..\\pages\\panel\\nutrients\\add\\index.vue' /* webpackChunkName: "pages/panel/nutrients/add/index" */))
const _7b96f0a7 = () => interopDefault(import('..\\pages\\panel\\recipe-categories\\add\\index.vue' /* webpackChunkName: "pages/panel/recipe-categories/add/index" */))
const _9120ed5e = () => interopDefault(import('..\\pages\\panel\\recipes\\add\\index.vue' /* webpackChunkName: "pages/panel/recipes/add/index" */))
const _7a955828 = () => interopDefault(import('..\\pages\\panel\\slides\\add\\index.vue' /* webpackChunkName: "pages/panel/slides/add/index" */))
const _7107328c = () => interopDefault(import('..\\pages\\dietician-panel\\blog-categories\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/blog-categories/update/_id" */))
const _eb0c0ee6 = () => interopDefault(import('..\\pages\\dietician-panel\\criterias\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/criterias/update/_id" */))
const _3a2e0020 = () => interopDefault(import('..\\pages\\dietician-panel\\exercise-categories\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/exercise-categories/update/_id" */))
const _31166274 = () => interopDefault(import('..\\pages\\dietician-panel\\exercises\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/exercises/update/_id" */))
const _b8c386b4 = () => interopDefault(import('..\\pages\\dietician-panel\\recipe-categories\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/recipe-categories/update/_id" */))
const _7e3656fc = () => interopDefault(import('..\\pages\\dietician-panel\\recipes\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/recipes/update/_id" */))
const _7734a40e = () => interopDefault(import('..\\pages\\dietician-panel\\users\\update\\_id.vue' /* webpackChunkName: "pages/dietician-panel/users/update/_id" */))
const _015a4b3f = () => interopDefault(import('..\\pages\\panel\\blog-categories\\update\\_id.vue' /* webpackChunkName: "pages/panel/blog-categories/update/_id" */))
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
const _4aa67fa8 = () => interopDefault(import('..\\pages\\calorie\\_id.vue' /* webpackChunkName: "pages/calorie/_id" */))
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
    path: "/calorie",
    component: _12665cc4,
    name: "calorie"
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
    path: "/login",
    component: _458208a8,
    name: "login"
  }, {
    path: "/panel",
    component: _456acf2d,
    name: "panel"
  }, {
    path: "/recipes",
    component: _8377afa8,
    name: "recipes"
  }, {
    path: "/register",
    component: _b6244380,
    name: "register"
  }, {
    path: "/dietician-panel/blog-categories",
    component: _6ef4f4bb,
    name: "dietician-panel-blog-categories"
  }, {
    path: "/dietician-panel/criterias",
    component: _46a5be64,
    name: "dietician-panel-criterias"
  }, {
    path: "/dietician-panel/exercise-categories",
    component: _59422e71,
    name: "dietician-panel-exercise-categories"
  }, {
    path: "/dietician-panel/exercises",
    component: _6b2f55c7,
    name: "dietician-panel-exercises"
  }, {
    path: "/dietician-panel/login",
    component: _235c018e,
    name: "dietician-panel-login"
  }, {
    path: "/dietician-panel/recipe-categories",
    component: _26f8aba7,
    name: "dietician-panel-recipe-categories"
  }, {
    path: "/dietician-panel/recipes",
    component: _72f0be7d,
    name: "dietician-panel-recipes"
  }, {
    path: "/dietician-panel/users",
    component: _0938573a,
    name: "dietician-panel-users"
  }, {
    path: "/panel/blog-categories",
    component: _67b43e00,
    name: "panel-blog-categories"
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
    path: "/dietician-panel/blog-categories/add",
    component: _f9baf010,
    name: "dietician-panel-blog-categories-add"
  }, {
    path: "/dietician-panel/criterias/add",
    component: _1e11efc5,
    name: "dietician-panel-criterias-add"
  }, {
    path: "/dietician-panel/exercise-categories/add",
    component: _7bc2f002,
    name: "dietician-panel-exercise-categories-add"
  }, {
    path: "/dietician-panel/exercises/add",
    component: _94922328,
    name: "dietician-panel-exercises-add"
  }, {
    path: "/dietician-panel/recipe-categories/add",
    component: _79b8448c,
    name: "dietician-panel-recipe-categories-add"
  }, {
    path: "/dietician-panel/recipes/add",
    component: _0d288776,
    name: "dietician-panel-recipes-add"
  }, {
    path: "/panel/blog-categories/add",
    component: _11637ed3,
    name: "panel-blog-categories-add"
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
    path: "/panel/nonsense/add-blog",
    component: _4bdb0078,
    name: "panel-nonsense-add-blog"
  }, {
    path: "/panel/nonsense/appointment-list",
    component: _dbae00fc,
    name: "panel-nonsense-appointment-list"
  }, {
    path: "/panel/nonsense/blank-page",
    component: _50d2355e,
    name: "panel-nonsense-blank-page"
  }, {
    path: "/panel/nonsense/blog",
    component: _68db6f18,
    name: "panel-nonsense-blog"
  }, {
    path: "/panel/nonsense/blog-details",
    component: _acf9fbe6,
    name: "panel-nonsense-blog-details"
  }, {
    path: "/panel/nonsense/components",
    component: _4ad48a0c,
    name: "panel-nonsense-components"
  }, {
    path: "/panel/nonsense/data-tables",
    component: _e5477e3c,
    name: "panel-nonsense-data-tables"
  }, {
    path: "/panel/nonsense/doctor-list",
    component: _f0fe74f4,
    name: "panel-nonsense-doctor-list"
  }, {
    path: "/panel/nonsense/edit-blog",
    component: _7c1f4e7f,
    name: "panel-nonsense-edit-blog"
  }, {
    path: "/panel/nonsense/error-404",
    component: _5acfcc26,
    name: "panel-nonsense-error-404"
  }, {
    path: "/panel/nonsense/error-500",
    component: _0745f72a,
    name: "panel-nonsense-error-500"
  }, {
    path: "/panel/nonsense/forgot-password",
    component: _56c3757f,
    name: "panel-nonsense-forgot-password"
  }, {
    path: "/panel/nonsense/form-basic-inputs",
    component: _0a226bcb,
    name: "panel-nonsense-form-basic-inputs"
  }, {
    path: "/panel/nonsense/form-horizontal",
    component: _9508af72,
    name: "panel-nonsense-form-horizontal"
  }, {
    path: "/panel/nonsense/form-input-groups",
    component: _6b35cdcc,
    name: "panel-nonsense-form-input-groups"
  }, {
    path: "/panel/nonsense/form-mask",
    component: _f5be7962,
    name: "panel-nonsense-form-mask"
  }, {
    path: "/panel/nonsense/form-validation",
    component: _04c59bc8,
    name: "panel-nonsense-form-validation"
  }, {
    path: "/panel/nonsense/form-vertical",
    component: _7277f159,
    name: "panel-nonsense-form-vertical"
  }, {
    path: "/panel/nonsense/invoice",
    component: _a1a796b2,
    name: "panel-nonsense-invoice"
  }, {
    path: "/panel/nonsense/invoice-report",
    component: _2d8698ca,
    name: "panel-nonsense-invoice-report"
  }, {
    path: "/panel/nonsense/lock-screen",
    component: _6c55c748,
    name: "panel-nonsense-lock-screen"
  }, {
    path: "/panel/nonsense/patient-list",
    component: _c594fc48,
    name: "panel-nonsense-patient-list"
  }, {
    path: "/panel/nonsense/pending-blog",
    component: _5049848e,
    name: "panel-nonsense-pending-blog"
  }, {
    path: "/panel/nonsense/pharmacy-list",
    component: _4f03701c,
    name: "panel-nonsense-pharmacy-list"
  }, {
    path: "/panel/nonsense/product-list",
    component: _cfabb19c,
    name: "panel-nonsense-product-list"
  }, {
    path: "/panel/nonsense/profile",
    component: _25b645ba,
    name: "panel-nonsense-profile"
  }, {
    path: "/panel/nonsense/register",
    component: _0b59e699,
    name: "panel-nonsense-register"
  }, {
    path: "/panel/nonsense/reviews",
    component: _34a7be95,
    name: "panel-nonsense-reviews"
  }, {
    path: "/panel/nonsense/specialities",
    component: _f2965cae,
    name: "panel-nonsense-specialities"
  }, {
    path: "/panel/nonsense/tables-basic",
    component: _7003563c,
    name: "panel-nonsense-tables-basic"
  }, {
    path: "/panel/nonsense/transactions-list",
    component: _44095890,
    name: "panel-nonsense-transactions-list"
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
    path: "/dietician-panel/blog-categories/update/:id?",
    component: _7107328c,
    name: "dietician-panel-blog-categories-update-id"
  }, {
    path: "/dietician-panel/criterias/update/:id",
    component: _eb0c0ee6,
    name: "dietician-panel-criterias-update-id"
  }, {
    path: "/dietician-panel/exercise-categories/update/:id?",
    component: _3a2e0020,
    name: "dietician-panel-exercise-categories-update-id"
  }, {
    path: "/dietician-panel/exercises/update/:id",
    component: _31166274,
    name: "dietician-panel-exercises-update-id"
  }, {
    path: "/dietician-panel/recipe-categories/update/:id?",
    component: _b8c386b4,
    name: "dietician-panel-recipe-categories-update-id"
  }, {
    path: "/dietician-panel/recipes/update/:id",
    component: _7e3656fc,
    name: "dietician-panel-recipes-update-id"
  }, {
    path: "/dietician-panel/users/update/:id",
    component: _7734a40e,
    name: "dietician-panel-users-update-id"
  }, {
    path: "/panel/blog-categories/update/:id",
    component: _015a4b3f,
    name: "panel-blog-categories-update-id"
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
    path: "/calorie/:id",
    component: _4aa67fa8,
    name: "calorie-id"
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
