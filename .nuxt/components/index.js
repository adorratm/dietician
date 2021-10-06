export { default as FrontendBreadcrumb } from '../..\\components\\frontend\\breadcrumb.vue'
export { default as FrontendCriteriaList } from '../..\\components\\frontend\\criteria-list.vue'
export { default as FrontendDieticianList } from '../..\\components\\frontend\\dietician-list.vue'
export { default as FrontendDieticianLogin } from '../..\\components\\frontend\\dietician-login.vue'
export { default as FrontendDieticianRegister } from '../..\\components\\frontend\\dietician-register.vue'
export { default as FrontendFooter } from '../..\\components\\frontend\\footer.vue'
export { default as FrontendHeader } from '../..\\components\\frontend\\header.vue'
export { default as FrontendLogin } from '../..\\components\\frontend\\login.vue'
export { default as FrontendNutrientList } from '../..\\components\\frontend\\nutrient-list.vue'
export { default as FrontendRecipeList } from '../..\\components\\frontend\\recipe-list.vue'
export { default as FrontendRegister } from '../..\\components\\frontend\\register.vue'
export { default as FrontendSlider } from '../..\\components\\frontend\\slider.vue'
export { default as BackendAdminheader } from '../..\\components\\backend\\adminheader.vue'
export { default as BackendAdminsidebar } from '../..\\components\\backend\\adminsidebar.vue'
export { default as BackendBreadcrumb } from '../..\\components\\backend\\breadcrumb.vue'
export { default as BackendDieticianLogin } from '../..\\components\\backend\\dietician-login.vue'
export { default as BackendDieticianheader } from '../..\\components\\backend\\dieticianheader.vue'
export { default as BackendDieticiansidebar } from '../..\\components\\backend\\dieticiansidebar.vue'
export { default as BackendLogin } from '../..\\components\\backend\\login.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
