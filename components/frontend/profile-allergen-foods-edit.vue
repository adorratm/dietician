<template>
<div>
  <ValidationObserver v-slot='{ handleSubmit }'>
    <form
      @submit.prevent='handleSubmit(updateAllergenFoodsInformation)'
      ref='AllergenFoodsInformationForm'
      enctype='multipart/form-data'
    >
      <ValidationProvider
        name='Alerjen Besinler'
        rules=''
        v-slot='{ errors }'
      >
        <v-autocomplete
          name='selectedAllergenFoods'
          v-model='selectedAllergenFoods'
          :items='allergenFoods'
          chips
          label='Alerjen Besin Seçin'
          item-text='name'
          item-value='_id.$oid'
          multiple
          outlined
          hide-details
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click='toggleAllergenFoods'>
              <v-list-item-action>
                <v-icon
                  :color="
																	!isEmpty(selectedAllergenFoods) &&
																	selectedAllergenFoods.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                >
                  {{ allergenFoodsIcon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Tümünü Seç
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class='mt-2'></v-divider>
          </template>
          <template v-slot:selection='data'>
            <v-chip
              v-bind='data.attrs'
              :input-value='data.selected'
              close
              @click='data.select'
              @click:close='removeAllergenFoods(data.item)'
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item='data'>
            <template>
              <v-list-item-content>
                <v-list-item-title
                  v-html='data.item.name'
                ></v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
          {{ errors[0] }}
        </v-alert>
      </ValidationProvider>

      <v-btn color='primary' type='submit' class='mt-2'>
        Alerjen Besin Bilgisini Kaydet
      </v-btn>
    </form>
  </ValidationObserver>
</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'profile-allergen-foods-edit',
  components:{
    ValidationObserver,
    ValidationProvider
  },
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
    selectAllAllergenFoods() {
      return (
        !this.isEmpty(this.selectedAllergenFoods) &&
        !this.isEmpty(this.allergenFoods) &&
        this.selectedAllergenFoods.length === this.allergenFoods.length
      )
    },
    selectSomeAllergenFoods() {
      return (
        !this.isEmpty(this.selectedAllergenFoods) &&
        this.selectedAllergenFoods.length > 0 &&
        !this.selectAllAllergenFoods
      )
    },
    allergenFoodsIcon() {
      if (this.selectAllAllergenFoods) return 'mdi-close-box'
      if (this.selectSomeAllergenFoods) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
  props:["user"],
  data(){
    return {
      allergenFood: null,
      allergenFoods: [],
      selectedAllergenFoods: [],
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
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
    },
    toggleAllergenFoods() {
      try {
        this.$nextTick(() => {
          if (this.selectAllAllergenFoods) {
            this.selectedAllergenFoods = []
          } else {
            this.selectedAllergenFoods = []
            this.allergenFoods.forEach((el, index) => {
              this.selectedAllergenFoods.push(el._id.$oid)
            })
          }
        })
      }catch (e) {
        console.log(e)
      }
    },

    removeAllergenFoods(item) {
      try {
        const index = this.selectedAllergenFoods.indexOf(item._id.$oid)
        if (index >= 0) this.selectedAllergenFoods.splice(index, 1)
      }catch (e) {
        console.log(e)
      }
    },

    updateAllergenFoodsInformation() {
      try {
        let formData = new FormData(this.$refs.allergenFoodsInformationForm)
        formData.delete('selectedAllergenFoods')
        formData.append('selectedAllergenFoods', this.selectedAllergenFoods)
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'dietician/users/user-allergenfoods/',
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary,
              }
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch((e) =>console.log(e))
      }catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>

</style>
