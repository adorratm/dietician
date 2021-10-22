<template>
<div>
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
          item-value='_id.$oid'
          multiple
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

      <v-btn color='primary' type='submit' class='mb-2'>
        Hastalık Bilgisini Kaydet ve İlerle
      </v-btn>
      <v-btn color='error' type='button' class='mb-2' @click.prevent='e1=3'>
        Hastalık Bilgisini Kaydetmeden İlerle
      </v-btn>
      <v-btn color='info' type='button' class='mb-2' @click.prevent='e1 = 1'>
        Geri Dön
      </v-btn>
    </form>
  </ValidationObserver>
</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'profile-disease-edit',
  components:{
    ValidationObserver,
    ValidationProvider
  },
  computed:{
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
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
  },
}
</script>

<style scoped>

</style>
