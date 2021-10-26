/**
 * isEmpty
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
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
})

/**
 * Mutations
 * @type {{setLeft(*): void, setRecipeCategories(*, *): void, setFixed(*): void, setDieticians(*, *): void, setRightDrawer(*, *=): void, setNutrients(*, *): void, setEmptyURL(*, *): void, setSettings(*, *): void, setCriterias(*, *): void, setClipped(*): void, setDrawer(*, *=): void, setRight(*): void, setSearchs(*, *): void, setMiniVariant(*): void}}
 */
export const mutations = {
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
  },
}

/**
 *
 * @type {{getCriterias(*, *): Promise<AxiosResponse<*>>, setSiteSettings(*): *, getNutrients(*, *): Promise<AxiosResponse<*>>, getSearchs(*, *): Promise<AxiosResponse<*>>, getRecipeCategories(*, *): Promise<AxiosResponse<*>>, getDieticians(*, *): Promise<AxiosResponse<*>>, RegisterUser(*, *): Promise<*>}}
 */
export const actions = {
  setSiteSettings(vuexContext) {
    return this.$axios.get(process.env.apiBaseUrl + 'home').then((response) => {
      vuexContext.commit('setSettings', response.data.data)
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
          'Content-Type':
            'multipart/form-data; boundary=' + registerData._boundary,
        },
      })
      .then((response) => {
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
      .then((response) => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setNutrients', response.data.data)
          console.log(response.data)
          vuexContext.commit('setEmptyURL', response.data.empty_url)
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
      .then((response) => {
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
      .then((response) => {
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
      .then((response) => {
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
      .then((response) => {
        if (!isEmpty(response.data)) {
          vuexContext.commit('setSearchs', response.data.data)
        }
      })
  },
}
