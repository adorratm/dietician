<template>
<div>
  <ValidationObserver v-slot='{ handleSubmit }'>
    <form
      @submit.prevent='handleSubmit(updateUnlikedFoodsInformation)'
      ref='UnlikedFoodsInformationForm'
      enctype='multipart/form-data'
    >
      <ValidationProvider
        name='Sevilmeyen Besinler'
        rules=''
        v-slot='{ errors }'
      >
        <v-autocomplete
          name='selectedUnlikedFoods'
          v-model='selectedUnlikedFoods'
          :items='unlikedFoods'
          chips
          label='Sevilmeyen Besin Seçin'
          item-text='name'
          item-value='_id.$oid'
          multiple
        >
          <template v-slot:prepend-item>
            <v-list-item ripple @click='toggleUnlikedFoods'>
              <v-list-item-action>
                <v-icon
                  :color="
																	!isEmpty(selectedUnlikedFoods) &&
																	selectedUnlikedFoods.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                >
                  {{ unlikedFoodsIcon }}
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
              @click:close='removeUnlikedFoods(data.item)'
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

      <v-btn color='primary' type='submit' class='mb-2'>
        Sevilmeyen Besin Bilgisini Kaydet
      </v-btn>
      <v-btn color='info' type='button' class='mb-2' @click.prevent='e1 = 3'>
        Geri Dön
      </v-btn>
    </form>
  </ValidationObserver>
</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'profile-unliked-foods-edit',
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      unlikedFood: null,
      unlikedFoods: [],
      selectedUnlikedFoods: [],
    }
  },
  computed:{
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
    unlikedFoodsIcon() {
      if (this.selectAllUnlikedFoods) return 'mdi-close-box'
      if (this.selectSomeUnlikedFoods) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    selectAllUnlikedFoods() {
      return (
        !this.isEmpty(this.selectedUnlikedFoods) &&
        !this.isEmpty(this.unlikedFoods) &&
        this.selectedUnlikedFoods.length === this.unlikedFoods.length
      )
    },
    selectSomeUnlikedFoods() {
      return (
        !this.isEmpty(this.selectedUnlikedFoods) &&
        this.selectedUnlikedFoods.length > 0 &&
        !this.selectAllUnlikedFoods
      )
    },
  },
  props:["user"],
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    toggleUnlikedFoods() {
      this.$nextTick(() => {
        if (this.selectAllUnlikedFoods) {
          this.selectedUnlikedFoods = []
        } else {
          this.selectedUnlikedFoods = []
          this.unlikedFoods.forEach((el, index) => {
            this.selectedUnlikedFoods.push(el._id.$oid)
          })
        }
      })
    },
    updateUnlikedFoodsInformation() {
      let formData = new FormData(this.$refs.unlikedFoodsInformationForm)
      formData.append('dietician_id', this.userData._id)
      formData.append('tc', this.data.tc)
      formData.append('phone', this.data.phone)
      formData.append('id', this.data._id.$oid)
      formData.delete('selectedUnlikedFoods')
      formData.append('selectedUnlikedFoods', this.selectedUnlikedFoods)
      this.$axios
        .post(
          process.env.apiBaseUrl +
          'dietician/users/user-unlovedfoods/',
          formData,
          {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=' + formData._boundary,
              Authorization: 'Bearer ' + this.userData.api_token
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
        })
    },
    removeUnlikedFoods(item) {
      const index = this.selectedUnlikedFoods.indexOf(item._id.$oid)
      if (index >= 0) this.selectedUnlikedFoods.splice(index, 1)
    },
  },
}
</script>

<style scoped>

</style>
