import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
// To be able to use this._ or Vue._ in the components without including lodash
Vue.use(VueLodash, { name: '$_', lodash })
