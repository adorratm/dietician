import Cookie from 'js-cookie'
/**
 * isEmpty
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
  if (typeof obj == 'number') return false
  else if (typeof obj == 'string') return obj.length === 0
  else if (Array.isArray(obj)) return obj.length === 0
  else if (typeof obj == 'object')
    return obj == null || Object.keys(obj).length === 0
  else if (typeof obj == 'boolean') return false
  else return !obj
}

/**
 *
 * @returns {{settings: null, rightDrawer: (boolean|boolean), drawer: (boolean|boolean), right: (boolean|boolean), nutrients: *[], clipped: (boolean|boolean), emptyUrl: null, left: (boolean|boolean), criterias: *[], miniVariant: (boolean|boolean), dieticians: *[], searchs: *[], fixed: (boolean|boolean), recipeCategories: *[]}}
 */
export const state = () => ({
  settings: null,
  nutrients: [],
  emptyUrl: null,
  recipeCategories: [],
  criterias: [],
  dieticians: [],
  searchs: [],
  fixed: (!isEmpty(Cookie.get('fixed')) ? !(Cookie.get('fixed') === 'false') : true),
  clipped: (!isEmpty(Cookie.get('clipped')) ? (Cookie.get('clipped') === 'true') : false),
  drawer: (!isEmpty(Cookie.get('drawer')) ? (Cookie.get('drawer') === 'true') : false),
  miniVariant: (!isEmpty(Cookie.get('miniVariant')) ? (Cookie.get('miniVariant') === 'true') : false),
  right: (!isEmpty(Cookie.get('right')) ? (Cookie.get('right') === 'false') : true),
  rightDrawer: (!isEmpty(Cookie.get('rightDrawer')) ? (Cookie.get('rightDrawer') === 'true') : false),
  left: (!isEmpty(Cookie.get('left')) ? (Cookie.get('left') === 'false') : true),
  userData : null
})

/**
 * Mutations
 * @type {{setLeft(*): void, setRecipeCategories(*, *): void, setFixed(*): void, setDieticians(*, *): void, setRightDrawer(*, *=): void, setNutrients(*, *): void, setEmptyURL(*, *): void, setSettings(*, *): void, setCriterias(*, *): void, setClipped(*): void, setDrawer(*, *=): void, setRight(*): void, setSearchs(*, *): void, setMiniVariant(*): void}}
 */
export const mutations = {
  /**
   * Set UserData
   */
  setUserData(state,userData){
    state.userData = userData
  },
  /**
   * setFixed
   * @param state
   */
  setFixed(state) {
    state.fixed = !state.fixed
    Cookie.set('fixed', state.fixed)
  },
  /**
   * setClipped
   * @param state
   */
  setClipped(state) {
    state.clipped = !state.clipped
    Cookie.set('clipped', state.clipped)
  },
  /**
   * setDrawer
   * @param state
   * @param newDrawerState
   */
  setDrawer(state, newDrawerState) {
    state.drawer = newDrawerState
    Cookie.set('drawer', newDrawerState)
  },
  /**
   * setMiniVariant
   * @param state
   */
  setMiniVariant(state) {
    state.miniVariant = !state.miniVariant
    Cookie.set('miniVariant', state.miniVariant)
  },
  /**
   * setRight
   * @param state
   */
  setRight(state) {
    state.right = !state.right
    Cookie.set('right', state.right)
  },
  /**
   * setRightDrawer
   * @param state
   * @param newRightDrawerState
   */
  setRightDrawer(state, newRightDrawerState) {
    state.rightDrawer = newRightDrawerState
    Cookie.set('rightDrawer', newRightDrawerState)
  },
  /**
   * setLeft
   * @param state
   */
  setLeft(state) {
    state.left = !state.left
    Cookie.set('left', state.left)
  },
  /**
   * setSettings
   * @param state
   * @param settings
   * @constructor
   */
  setSettings(state, settings) {
    state.settings = settings
  },
  /**
   * setNutrients
   * @param state
   * @param nutrients
   */
  setNutrients(state, nutrients) {
    state.nutrients = nutrients
  },
  /**
   * setEmptyURL
   * @param state
   * @param emptyUrl
   */
  setEmptyURL(state, emptyUrl) {
    state.emptyUrl = emptyUrl
  },
  /**
   * setRecipeCategories
   * @param state
   * @param recipeCategories
   */
  setRecipeCategories(state, recipeCategories) {
    state.recipeCategories = recipeCategories
  },
  /**
   * setCriterias
   * @param state
   * @param criterias
   */
  setCriterias(state, criterias) {
    state.criterias = criterias
  },
  /**
   * setDieticians
   * @param state
   * @param dieticians
   */
  setDieticians(state, dieticians) {
    state.dieticians = dieticians
  },
  /**
   * setSearchs
   * @param state
   * @param searchs
   */
  setSearchs(state, searchs) {
    state.searchs = searchs
  }
}

/**
 *
 * @type {{getCriterias(*, *): Promise<AxiosResponse<*>>, getNutrients(*, *): Promise<AxiosResponse<*>>, nuxtServerInit({commit: *}): *, getSearchs(*, *): Promise<AxiosResponse<*>>, getRecipeCategories(*, *): Promise<AxiosResponse<*>>, getDieticians(*, *): Promise<AxiosResponse<*>>, RegisterUser(*, *=): Promise<*>}}
 */
export const actions = {
  setSiteSettings(vuexContext){
    return this.$axios.get(process.env.apiBaseUrl+'home').then(response=>{
      vuexContext.commit("setSettings",response.data.data)
      return response.data.data
    })
  },
  /**
   * Register User Function
   * @param vuexContext
   * @param registerData
   * @returns {Promise<*>}
   * @constructor
   */
  RegisterUser(vuexContext, registerData) {
    let registerLink = 'users/register'
    if (registerData.get('isDietician')) {
      registerLink = 'dietician/register'
    }
    return this.$axios
      .post(process.env.apiBaseUrl + registerLink, registerData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=' + registerData._boundary
        }
      })
      .then(response => {
        return response.data
      })
  },
  /**
   * getNutrients
   * @param vuexContext
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  getNutrients(vuexContext, context) {
    let nutrientsURL = 'nutrients'
    if (context.nutrientsURL) {
      nutrientsURL = context.nutrientsURL
    }
    return this.$axios
      .get(process.env.apiBaseUrl + nutrientsURL)
      .then(response => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setNutrients', response.data.data)
          vuexContext.commit('setEmptyURL', response.data.emptyUrl)
        }
      })
  },
  /**
   * getRecipeCategories
   * @param vuexContext
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  getRecipeCategories(vuexContext, context) {
    let recipeCategoriesURL = 'recipe-categories'
    if (context.recipeCategoriesURL) {
      recipeCategoriesURL = context.recipeCategoriesURL
    }
    return this.$axios
      .get(process.env.apiBaseUrl + recipeCategoriesURL)
      .then(response => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setRecipeCategories', response.data.data)
        }
      })
  },
  /**
   * getCriterias
   * @param vuexContext
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCriterias(vuexContext, context) {
    let criteriasURL = 'criteria'
    if (context.criteriasURL) {
      criteriasURL = context.criteriasURL
    }
    return this.$axios
      .get(process.env.apiBaseUrl + criteriasURL)
      .then(response => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setCriterias', response.data.data)
        }
      })
  },
  /**
   * getDieticians
   * @param vuexContext
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  getDieticians(vuexContext, context) {
    let dieticiansURL = 'dieticians'
    if (context.dieticiansURL) {
      dieticiansURL = context.dieticiansURL
    }
    return this.$axios
      .get(process.env.apiBaseUrl + dieticiansURL)
      .then(response => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setDieticians', response.data.data.dieticians)
        }
      })
  },
  /**
   * getSearchs
   * @param vuexContext
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  getSearchs(vuexContext, context) {
    let searchsURL = 'search'
    if (context.searchsURL) {
      searchsURL = context.searchsURL
    }
    return this.$axios
      .get(process.env.apiBaseUrl + searchsURL)
      .then(response => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setSearchs', response.data.data)
        }
      })
  }
}
