export { default as BackendBreadcrumb } from '../..\\components\\backend\\breadcrumb.vue'
export { default as FrontendBreadcrumb } from '../..\\components\\frontend\\breadcrumb.vue'
export { default as FrontendCriteriaList } from '../..\\components\\frontend\\criteria-list.vue'
export { default as FrontendDieticianList } from '../..\\components\\frontend\\dietician-list.vue'
export { default as FrontendDieticianLogin } from '../..\\components\\frontend\\dietician-login.vue'
export { default as FrontendDieticianRegister } from '../..\\components\\frontend\\dietician-register.vue'
export { default as FrontendExerciseCategoryList } from '../..\\components\\frontend\\exercise-category-list.vue'
export { default as FrontendFooter } from '../..\\components\\frontend\\footer.vue'
export { default as FrontendHeader } from '../..\\components\\frontend\\header.vue'
export { default as FrontendLogin } from '../..\\components\\frontend\\login.vue'
export { default as FrontendNutrientList } from '../..\\components\\frontend\\nutrient-list.vue'
export { default as FrontendProfileAllergenFoodsEdit } from '../..\\components\\frontend\\profile-allergen-foods-edit.vue'
export { default as FrontendProfileAppointment } from '../..\\components\\frontend\\profile-appointment.vue'
export { default as FrontendProfileDiseaseEdit } from '../..\\components\\frontend\\profile-disease-edit.vue'
export { default as FrontendProfileInformationEdit } from '../..\\components\\frontend\\profile-information-edit.vue'
export { default as FrontendProfileInformationTop } from '../..\\components\\frontend\\profile-information-top.vue'
export { default as FrontendProfileInformation } from '../..\\components\\frontend\\profile-information.vue'
export { default as FrontendProfileUnlikedFoodsEdit } from '../..\\components\\frontend\\profile-unliked-foods-edit.vue'
export { default as FrontendProfileWeightAimsEdit } from '../..\\components\\frontend\\profile-weight-aims-edit.vue'
export { default as FrontendProfileWorkHours } from '../..\\components\\frontend\\profile-work-hours.vue'
export { default as FrontendRecipeList } from '../..\\components\\frontend\\recipe-list.vue'
export { default as FrontendRegister } from '../..\\components\\frontend\\register.vue'
export { default as FrontendSlider } from '../..\\components\\frontend\\slider.vue'
export { default as BackendDieticianLogin } from '../..\\components\\backend\\dietician\\dietician-login.vue'
export { default as BackendDieticianDieticianheader } from '../..\\components\\backend\\dietician\\dieticianheader.vue'
export { default as BackendDieticianDieticiansidebar } from '../..\\components\\backend\\dietician\\dieticiansidebar.vue'
export { default as BackendPanelAdminheader } from '../..\\components\\backend\\panel\\adminheader.vue'
export { default as BackendPanelAdminsidebar } from '../..\\components\\backend\\panel\\adminsidebar.vue'
export { default as BackendPanelLogin } from '../..\\components\\backend\\panel\\login.vue'

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
