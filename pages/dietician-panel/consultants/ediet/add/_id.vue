<template>
  <div>
    <!-- Page Wrapper -->
    <div class='page-wrapper'>
      <div class='content container-fluid'>

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

        <!-- General -->

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
                  <div v-for='(item,index) in factors' v-if='!isEmpty(factors) && !isEmpty(item.values)'>
                    <ValidationProvider
                      v-slot='{ errors }'
                      :name='item.title'
                      rules='required'
                    >
                      <v-select
                        v-model='selectedFactors[index]'
                        :items='item.values'
                        :label='item.title+" SEÇİN"'
                        item-text='name'
                        item-value='_id.$oid'
                        name='factors[]'
                        hide-details
                        outlined
                      />
                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </div>
                  <v-btn class='mt-2' color='primary' role='button'
                         @click.prevent='selectFactors'>
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
                      hide-details
                      outlined
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
                         @click.prevent='selectMeals'>
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
                  <ValidationProvider
                    v-slot='{ errors }'
                    name='Egzersizler'
                    rules=''
                  >
                    <v-autocomplete
                      v-model='selectedExercises'
                      :items='exercises'
                      chips
                      item-text='name'
                      item-value='_id.$oid'
                      label='Egzersiz Seçin'
                      multiple
                      name='selectedExercises'
                      hide-details
                      outlined
                    >
                      <template v-slot:prepend-item>
                        <v-list-item ripple @click='toggleExercise'>
                          <v-list-item-action>
                            <v-icon
                              :color="
																	!isEmpty(selectedExercises) &&
																	selectedExercises.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                            >
                              {{ exerciseIcon }}
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
                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <v-btn class='mt-2' color='primary' role='button' @click.prevent='selectExercises'>
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
                      <td>
                        {{ !isEmpty(adultCalorieCalc) && !isEmpty(adultCalorieCalc.original) && !isEmpty(adultCalorieCalc.original.data.oga) ? (adultCalorieCalc.original.data.oga).toFixed(2) : null
                        }}
                        KG
                      </td>
                    </tr>
                    <tr>
                      <td>Beden Kütle İndexi:</td>
                      <td>
                        {{ !isEmpty(adultCalorieCalc) && !isEmpty(adultCalorieCalc.original) && !isEmpty(adultCalorieCalc.original.data.bki) ? (adultCalorieCalc.original.data.bki).toFixed(2) : null
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{ !isEmpty(bmh) ? bmh.toFixed(2) : null }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Stres Faktörüne Göre Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{ !isEmpty(factorFirst) ? bmh.toFixed(2) + ' + ' + (factorFirst - bmh).toFixed(2) + ' = ' + factorFirst.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Aktivite Faktörüne Göre Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{ !isEmpty(factorSecond) ? bmh.toFixed(2) + ' + ' + (factorSecond - bmh).toFixed(2) + ' = ' + factorSecond.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Termal Faktöre Göre Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{ !isEmpty(factorThird) ? bmh.toFixed(2) + ' + ' + (factorThird - bmh).toFixed(2) + ' = ' + factorThird.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Genel Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{ !isEmpty(factorFour) ? bmh.toFixed(2) + ' + ' + (factorFirst - bmh).toFixed(2) + ' + ' + (factorSecond - bmh).toFixed(2) + ' + ' + (factorThird - bmh).toFixed(2) + ' = ' + factorFour.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    </tbody>
                  </v-simple-table>
                  <v-btn class='mt-2' color='primary' role='button' @click.prevent='sendTotal(5)'>
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
                  <v-simple-table>
                    <thead>
                    <tr>
                      <th class='text-center'>
                        <nuxt-link to='/'>
                          <img
                            v-if='!isEmpty(settings)'
                            :alt='settings.settings.company_name'
                            v-bind:lazy-src='img_url + settings.settings.logo'
                            v-bind:src='img_url + settings.settings.logo'
                            :style='!$vuetify.theme.dark ? "filter:invert(0%)" : "filter:invert(100%)"'
                            width='210'
                            height='75'
                          />
                        </nuxt-link>
                      </th>
                      <th class='text-center'><h1>{{ user.hospitalName }}</h1></th>
                    </tr>
                    <tr>
                      <th class='text-center align-center align-content-center align-self-center'>ÖĞÜN</th>
                      <th class='text-center align-center align-content-center align-self-center'>BESİNLER</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if='!isEmpty(mealss)' v-for='(item,index) in mealss' :key='item.mealname+index'>
                      <td class='text-center align-center align-content-center align-self-center'>{{ item.mealname }}
                      </td>
                      <td class='text-center align-center align-content-center align-self-center' colspan='8'>
                        <table>
                          <thead>
                          <tr>
                            <th class='text-center align-center align-content-center align-self-center'>PORSİYON</th>
                            <th class='text-center align-center align-content-center align-self-center'>MİKTAR</th>
                            <th class='text-center align-center align-content-center align-self-center'>YİYECEK ADI</th>
                            <th class='text-center align-center align-content-center align-self-center'>İŞLEMLER</th>
                            <th class='text-center align-center align-content-center align-self-center'>KHO</th>
                            <th class='text-center align-center align-content-center align-self-center'>PRT</th>
                            <th class='text-center align-center align-content-center align-self-center'>YAĞ</th>
                            <th class='text-center align-center align-content-center align-self-center'>KCAL</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for='(food,i) in item.foods' :key='food.name+i'>
                            <td class='text-center align-center align-content-center align-self-center'>
                              <v-text-field label='Porsiyon' name='portion'></v-text-field>
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              <v-text-field label='Miktar' name='quantity' :value='food.quantity'></v-text-field>
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              <v-autocomplete :items='edietfoods' item-value='_id.$oid' item-text='name' return-object :value='food._id' name='selectedFoods[]' hide-details outlined></v-autocomplete>
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              <v-btn color='primary'>
                                <v-icon>mdi mdi-close</v-icon>
                                Listeden Kaldır
                              </v-btn>
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              {{ !isEmpty(food.karbonhidrat) ? parseFloat(food.karbonhidrat) : 0 }}
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              {{ !isEmpty(food.protein) ? parseFloat(food.protein) : 0 }}
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              {{ !isEmpty(food.yag) ? parseFloat(food.yag) : 0 }}
                            </td>
                            <td class='text-center align-center align-content-center align-self-center'>
                              {{ !isEmpty(food.calorie) ? parseFloat(food.calorie) : 0 }}
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </v-simple-table>
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

      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Breadcrumb from '~/components/backend/breadcrumb'
import { mapState } from 'vuex'

export default {
  middleware: ['auth', 'dietician'],
  layout: 'dietician',
  name: 'ediet-add',
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    ...mapState(['settings']),
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
    selectAllExercise() {
      return (
        !this.isEmpty(this.selectedExercises) &&
        !this.isEmpty(this.exercises) &&
        this.selectedExercises.length === this.exercises.length
      )
    },
    selectSomeExercise() {
      return (
        !this.isEmpty(this.selectedExercises) &&
        this.selectedExercises.length > 0 &&
        !this.selectAllExercise
      )
    },
    exerciseIcon() {
      if (this.selectAllExercise) return 'mdi-close-box'
      if (this.selectSomeExercise) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    icon() {
      if (this.likesAllMeal) return 'mdi-close-box'
      if (this.likesSomeMeal) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  data() {
    return {
      selectedFactors: [],
      breadCrumbItems: [
        { name: 'Anasayfa', url: '/dietician-panel' },
        { name: 'Danışanlarım', url: '/dietician-panel/consultants' },
        { name: 'E-Diyet Oluştur' }
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
      ogbki: null,
      size: null,
      calorie: null,
      exercise: null,
      exercises: [],
      selectedExercises: [],
      bmh: null,
      factorFirst: null,
      factorSecond: null,
      factorThird: null,
      factorFour: null,
      mealss: []
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
    toggleExercise() {
      this.$nextTick(() => {
        if (this.selectAllExercise) {
          this.selectedExercises = []
        } else {
          this.selectedExercises = []
          this.exercises.forEach((el, index) => {
            this.selectedExercises.push(el._id.$oid)
          })
        }
      })
    },
    remove(item) {
      const index = this.selectedExercises.indexOf(item._id.$oid)
      if (index >= 0) this.selectedExercises.splice(index, 1)
    },
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
    },
    selectFactors() {
      if (!this.isEmpty(this.selectedFactors)) {
        this.e1 = 2
      } else if (this.year === 0) {
        this.e1 = 2
      } else {
        this.$izitoast.error({
          title: 'Hata!',
          message: 'Faktörleri Seçtiğinizden Emin Olup Tekrar Deneyin.',
          position: 'topCenter',
          displayMode: 'once'
        })
        this.e1 = 1
      }
    },
    selectMeals() {
      if (!this.isEmpty(this.selectedMeals)) {
        this.e1 = 3
      } else {
        this.$izitoast.error({
          title: 'Hata!',
          message: 'Öğünleri Seçtiğinizden Emin Olup Tekrar Deneyin.',
          position: 'topCenter',
          displayMode: 'once'
        })
        this.e1 = 2
      }
    },
    selectExercises() {
      if (!this.isEmpty(this.selectedExercises) || this.year === 0) {
        this.sendTotal(4)
      } else {
        this.$izitoast.error({
          title: 'Hata!',
          message: 'Egzersizleri Seçtiğinizden Emin Olup Tekrar Deneyin.',
          position: 'topCenter',
          displayMode: 'once'
        })
        this.e1 = 3
      }
    },
    sendTotal(e1 = 5) {
      if (!this.isEmpty(this.selectedFactors) && !this.isEmpty(this.selectedMeals) && !this.isEmpty(this.selectedExercises) || (this.year === 0 && !this.isEmpty(this.selectedMeals))) {
        let selectedFactors = this.selectedFactors.filter(n => n)
        let selectedMeals = this.selectedMeals.filter(n => n)
        let selectedExercises = this.selectedExercises.filter(n => n)
        this.$axios.post(process.env.apiBaseUrl + 'dietician/e-diets/create/' + this.user._id.$oid, {
          'selectedFactors': selectedFactors,
          'selectedMeals': selectedMeals,
          'selectedExercises': selectedExercises
        }).then((result) => {
          this.bmh = result.data.data.bmh
          this.factorFirst = result.data.data.factorFirst
          this.factorSecond = result.data.data.factorSecond
          this.factorThird = result.data.data.factorThird
          this.factorFour = result.data.data.factorFour
          this.mealss = result.data.data.mealss
          this.e1 = e1
        })
      } else {
        this.$izitoast.error({
          title: 'Hata!',
          message: 'Faktörleri, Öğünleri ve Egzersizleri Seçtiğinizden Emin Olup Tekrar Deneyin.',
          position: 'topCenter',
          displayMode: 'once'
        })
        this.e1 = 4
      }
    }
  }
}
</script>

<style scoped>

</style>
