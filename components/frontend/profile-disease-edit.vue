<template>
  <div>
    <v-alert v-if='isEmpty(selectedDiseases)'
             border='left'
             colored-border
             type='error'
             elevation='2'
    >
      Eklenmiş Bir Hastalık Bulunamadı.
    </v-alert>
    <ValidationObserver v-slot='{ handleSubmit }'>
      <form
        @submit.prevent='handleSubmit(updateDiseaseInformation)'
        ref='diseaseInformationForm'
        enctype='multipart/form-data'
      >
        <ValidationProvider
          name='Hastalık'
          rules=''
          v-slot='{ errors }'
        >
          <v-autocomplete
            name='selectedDiseases'
            v-model='selectedDiseases'
            :items='diseases'
            chips
            label='Hastalık Seçin'
            item-text='name'
            item-value='_id'
            multiple
            outlined
            hide-details
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click='toggleDisease'>
                <v-list-item-action>
                  <v-icon
                    :color="
																	!isEmpty(selectedDiseases) &&
																	selectedDiseases.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                  >
                    {{ diseaseIcon }}
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
                @click:close='remove(data.item)'
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
          Hastalık Bilgisini Kaydet
        </v-btn>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'profile-disease-edit',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      disease: null,
      diseases: [],
      selectedDiseases: []
    }
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url() {
      return this.img_url + 'uploads/settings/preparing/my.jpg'
    },
    selectAllDisease() {
      return (
        !this.isEmpty(this.selectedDiseases) &&
        !this.isEmpty(this.diseases) &&
        this.selectedDiseases.length === this.diseases.length
      )
    },
    selectSomeDisease() {
      return (
        !this.isEmpty(this.selectedDiseases) &&
        this.selectedDiseases.length > 0 &&
        !this.selectAllDisease
      )
    },
    diseaseIcon() {
      if (this.selectAllDisease) return 'mdi-close-box'
      if (this.selectSomeDisease) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  props: ['user'],
  mounted() {
    this.getDiseases()
  },
  methods: {
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
      } catch (e) {
        console.log(e)
      }
    },
    toggleDisease() {
      try {
        this.$nextTick(() => {
          if (this.selectAllDisease) {
            this.selectedDiseases = []
          } else {
            this.selectedDiseases = []
            this.diseases.forEach((el, index) => {
              this.selectedDiseases.push(el._id)
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    getDiseases() {
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}users/diseases`)
          .then(response => {
            this.diseases = response.data.diseases
            this.selectedDiseases = response.data.selectedDiseases
          })
          .catch(err => console.log(err))
      } catch (e) {
        console.log(e)
      }
    },


    remove(item) {
      try {
        const index = this.selectedDiseases.indexOf(item._id)
        if (index >= 0) this.selectedDiseases.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    },
    updateDiseaseInformation() {
      try {
        let formData = new FormData(this.$refs.diseaseInformationForm)
        formData.delete('selectedDiseases')
        formData.append('selectedDiseases', this.selectedDiseases)
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'users/diseases/create',
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary
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
          }).catch((e) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
