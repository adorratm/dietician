<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <ValidationObserver v-slot='{ handleSubmit }'>
          <form
            ref='edietForm'
            enctype='multipart/form-data'
            @submit.prevent='handleSubmit(saveEdiet)'
          >
            <v-stepper v-model='e1'>
              <v-stepper-header>

                <v-stepper-step :complete='e1 > 0' step='1'>
                  Faktörler
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete='e1 > 1' step='2'>
                  Menü Planlama
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete='e1 > 3' step='3'>
                  Egzersiz
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete='e1 > 4' step='4'>
                  Kalori Hesabı
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete='e1 > 4' step='5'>
                  Diyet Listesi
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step='1'>
                  <div  v-for='(item) in factors'>
                    <ValidationProvider
                      v-slot='{ errors }'
                      :name='item.title'
                      rules=''
                    >
                      <v-select
                        :items='item.values'
                        item-text='name'
                        item-value='_id.$oid'
                        :label='item.title+" SEÇİN"'
                        name='factors[]'
                        return-object
                      />
                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </div>
                  <v-btn class='mt-2' color='primary' role='button' @click.prevent='e1 = 2'>
                    İlerle
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step='2'>
                  <ValidationProvider
                    v-slot='{ errors }'
                    name='Öğün'
                    rules='required'
                  >
                    <v-select
                      v-model='selectedMeals'
                      :items='meals'
                      item-text='name'
                      item-value='_id'
                      label='Öğün Seçin'
                      multiple
                      name='meals'
                      return-object
                    >
                      <template v-slot:prepend-item>
                        <v-list-item ripple @click='toggle'>
                          <v-list-item-action>
                            <v-icon
                              :color="
																	!isEmpty(selectedMeals) &&
																	selectedMeals.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                            >
                              {{ icon }}
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
                      <template v-slot:item='data'>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html='data.item.name'
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-select>
                    <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <v-btn class='mt-2' color='primary' role='button'
                         @click.prevent='(!isEmpty(selectedMeals) ? e1 = 3 : e1=2)'>
                    İlerle
                  </v-btn>
                  <v-btn
                    class='mt-2'
                    color='info'
                    role='button'
                    @click.prevent='e1 = 1'
                  >
                    Geri Dön
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step='3'>

                  <v-btn class='mt-2' color='primary' role='button' @click.prevent='e1 = 4'>
                    İlerle
                  </v-btn>
                  <v-btn
                    class='mt-2'
                    color='info'
                    role='button'
                    @click.prevent='e1 = 2'
                  >
                    Geri Dön
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step='4'>
                  <v-simple-table>
                    <thead>
                    <tr>
                      <th class='text-center justify-center' colspan='2'>Kalori Hesabı Sonucu</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Olması Gereken Ağırlık:</td>
                      <td>{{ !isEmpty(adultCalorieCalc.original.data.oga) ? adultCalorieCalc.original.data.oga : null }}
                        KG
                      </td>
                    </tr>
                    <tr>
                      <td>Beden Kütle İndexi:</td>
                      <td>
                        {{ !isEmpty(adultCalorieCalc.original.data.bki) ? adultCalorieCalc.original.data.bki : null }}
                      </td>
                    </tr>
                    </tbody>
                  </v-simple-table>
                  <v-btn class='mt-2' color='primary' role='button' @click.prevent='e1 = 5'>
                    İlerle
                  </v-btn>
                  <v-btn
                    class='mt-2'
                    color='info'
                    role='button'
                    @click.prevent='e1 = 3'
                  >
                    Geri Dön
                  </v-btn>
                </v-stepper-content>
                <v-stepper-content step='5'>
                  <v-btn class='mt-2' color='primary' type='submit'>
                    Kaydet
                  </v-btn>
                  <v-btn class='mt-2' color='success' role='button'>
                    Kaydet ve Yazdır
                  </v-btn>
                  <v-btn
                    class='mt-2'
                    color='info'
                    role='button'
                    @click.prevent='e1 = 4'
                  >
                    Geri Dön
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </form>
        </ValidationObserver>
      </v-card>
    </client-only>
  </v-container>

</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Breadcrumb from '@/components/includes/Breadcrumb'

export default {
  middleware: ['auth', 'dietician'],
  layout: 'dietician',
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    likesAllMeal() {
      return (
        !this.isEmpty(this.selectedMeals) &&
        !this.isEmpty(this.meals) &&
        this.selectedMeals.length === this.meals.length
      )
    },
    likesSomeMeal() {
      return (
        !this.isEmpty(this.selectedMeals) &&
        this.selectedMeals.length > 0 &&
        !this.likesAllMeal
      )
    },
    icon() {
      if (this.likesAllMeal) return 'mdi-close-box'
      if (this.likesSomeMeal) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  data() {
    return {
      selectedFacts: [],
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyen Paneli',
          disabled: false,
          href: '/dietician-panel/'
        },
        {
          text: 'Danışanlarım',
          disabled: false,
          href: '/dietician-panel/consultants'
        },
        {
          text: 'E-Diyet Oluştur',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      e1: 1,
      disease: null,
      diseases: [],
      selectedDiseases: [],
      recipe: null,
      recipes: [],
      ageGroups: ['0+', '1+', '10+', '18+'],
      selectedAgeGroups: [],
      selectedMeals: [],
      meals: [],
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null,
      ogbki: null,
      size: null,
      calorie: null
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'dietician/e-diets/create/' + params.id
      )
      return data.data
    } catch (e) {
      error({ message: 'Danışan Bilgisi Bulunamadı.', statusCode: 404 })
    }
  },
  methods: {
    /**
     * This Function Will Be Remove
     */
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllMeal) {
          this.selectedMeals = []
        } else {
          this.selectedMeals = []
          this.meals.forEach((el) => {
            this.selectedMeals.push(el._id)
          })
        }
      })
    },
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    }
  }
}
</script>
