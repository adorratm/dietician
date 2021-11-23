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
                  <div class='form-group' v-for='(item,index) in factors'
                       v-if='!isEmpty(factors) && !isEmpty(item.values)'>
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
                    <div class='form-group'>
                      <v-select
                        v-model='selectedMeals'
                        :items='meals'
                        item-text='name'
                        item-value='_id'
                        label='Öğün Seçin'
                        multiple
                        name='meals'
                        return-object
                        outlined
                        hide-details
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
                    </div>
                  </ValidationProvider>
                  <div class='form-group' v-for='(item,index) in selectedMeals' v-if='!isEmpty(selectedMeals)'
                       :key='index'>
                    <ValidationProvider
                      v-slot='{ errors }'
                      :name='item.name+" Öğün Oranı (Seçim Sırasıyla)"'
                      rules='required'
                    >
                      <v-text-field
                        :label='item.name+" Öğün Oranı (Seçim Sırasıyla)"'
                        name='selectedMealRates[]'
                        v-model='selectedMealRates[index]'
                        type='number'
                        min='0'
                        max='100'
                        clearable
                        outlined
                        hide-details
                      ></v-text-field>
                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </div>

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
                      <td>
                        <v-tooltip right>
                          <template v-slot:activator='{ on, attrs }'>
                            <span v-bind='attrs' v-on='on'>OGA:</span>
                          </template>
                          <span>Olması Gereken Ağırlık</span>
                        </v-tooltip>
                      </td>
                      <td>
                        {{
                          !isEmpty(adultCalorieCalc) && !isEmpty(adultCalorieCalc.original) && !isEmpty(adultCalorieCalc.original.data.oga) ? (adultCalorieCalc.original.data.oga).toFixed(2) : null
                        }}
                        KG
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <v-tooltip right>
                          <template v-slot:activator='{ on, attrs }'>
                            <span v-bind='attrs' v-on='on'>BKİ:</span>
                          </template>
                          <span>Beden Kütle İndexi</span>
                        </v-tooltip>
                      </td>
                      <td>
                        {{
                          !isEmpty(adultCalorieCalc) && !isEmpty(adultCalorieCalc.original) && !isEmpty(adultCalorieCalc.original.data.bki) ? (adultCalorieCalc.original.data.bki).toFixed(2) : null
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>Alınması Gereken Enerji Miktarı:</td>
                      <td>
                        {{ !isEmpty(bmh) ? bmh.toFixed(2) : null }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Stres Faktörüne Göre Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{
                          !isEmpty(factorFirst) ? factorFirst.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Aktivite Faktörüne Göre Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{
                          !isEmpty(factorSecond) ? factorSecond.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Termal Faktöre Göre Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{
                          !isEmpty(factorThird) ? factorThird.toFixed(2) : null
                        }} kcal
                      </td>
                    </tr>
                    <tr>
                      <td>Genel Alınması Gereken Kalori Miktarı:</td>
                      <td>
                        {{
                          !isEmpty(factorFour) ? factorFour.toFixed(2) : null
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
                  <div class='table-responsive'>
                    <table class='table table-bordered table-striped table-hover w-100'>
                      <thead>
                      <tr>
                        <th class='text-center align-middle' style='width:210px'>
                          <nuxt-link to='/dietician-panel'>
                            <img
                              v-if='!isEmpty(settings)'
                              :alt='settings.settings.company_name'
                              v-bind:src='settings.settings.logo'
                              :style='!$vuetify.theme.dark ? "filter:invert(0%)" : "filter:invert(100%)"'
                              width='210'
                              height='75'
                            />
                          </nuxt-link>
                        </th>
                        <th class='text-center align-middle'><h1>{{ dieticianData.hospitalName }}</h1></th>
                      </tr>
                      </thead>
                    </table>
                    <table class='table table-bordered table-striped table-hover w-100'>
                      <thead>
                      <tr>
                        <th class='text-center align-center align-content-center align-self-center align-middle'>ÖĞÜN
                        </th>
                        <th class='text-center align-center align-content-center align-self-center align-middle'>
                          BESİNLER
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-if='!isEmpty(mealss)' v-for='(item,index) in mealss' :key='item.mealname+index'>
                        <td class='text-center align-center align-content-center align-self-center align-middle rotate'
                            style='width:50px'><span>{{ item.mealname }}</span>
                        </td>
                        <td class='text-center align-center align-content-center align-self-center align-middle'
                            colspan='8'>
                          <table class='table table-bordered table-striped table-hover w-100'>
                            <thead>
                            <tr>
                              <th class='text-center align-center align-content-center align-self-center align-middle' style='width:150px'>
                                PORSİYON ADETİ
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle'>
                                PORSİYON ADI
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle' style='width:150px'>
                                MİKTAR GR VEYA ML
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle'>
                                YİYECEK ADI
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle'>
                                İŞLEMLER
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle' style='width:75px'>
                                KHO
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle' style='width:75px'>
                                PRT
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle' style='width:75px'>
                                YAĞ
                              </th>
                              <th class='text-center align-center align-content-center align-self-center align-middle' style='width:75px'>
                                KCAL
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for='(food,i) in item.foods' :key='food.name+i'>
                              <td class='text-center align-center align-content-center align-self-center align-middle'>
                                <v-text-field v-if='!isEmpty(item.foods[i].criteriaValue)' label='Porsiyon' v-model='criteriaValue[index][i]' name='portion' hide-details outlined clearable></v-text-field>
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle'>
                                <v-autocomplete label='Porsiyon Adı' v-if='!isEmpty(item.foods[i].criteriaName)' :items='criteriaNames[index][i]' v-model='criteriaName[index][i]' name='criteriaName[]' hide-details outlined></v-autocomplete>
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle'>
                                <v-text-field label='Miktar' name='quantity' hide-details outlined :ref='"quantity"+index+i' v-model='criteriaQuantity[index][i]' clearable></v-text-field>
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle'>
                                <v-autocomplete v-if='!isEmpty(dietFoods)' :items='dietFoods' item-value='_id' return-object name='selectedFoods[]' v-model='criteriaSelectedFoods[index][i]' hide-details outlined @change='(event) => setRates(event,index,i)'>
                                  <template slot='selection' slot-scope='data'>
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.name }} - {{ data.item.ageGroups }} Yaş - Miktar:
                                    {{ data.item.quantity }}
                                  </template>
                                  <template slot='item' slot-scope='data'>
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.name }} - {{ data.item.ageGroups }} Yaş - Miktar:
                                    {{ data.item.quantity }}
                                  </template>
                                </v-autocomplete>
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle'>
                                <v-btn color='primary' x-small class='py-4' @click='cloneProperty(index)'>
                                  <v-icon>mdi mdi-plus</v-icon>
                                </v-btn>
                                <v-btn color='error' x-small class='py-4' @click='item.foods.splice(item.foods.indexOf(i))'>
                                  <v-icon>mdi mdi-close</v-icon>
                                </v-btn>
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle' :ref='"karbonhidrat"+index+i'>
                                {{ !isEmpty(food.karbonhidrat) ? parseFloat(food.karbonhidrat) : 0 }}
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle' :ref='"protein"+index+i'>
                                {{ !isEmpty(food.protein) ? parseFloat(food.protein) : 0 }}
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle' :ref='"yag"+index+i'>
                                {{ !isEmpty(food.yag) ? parseFloat(food.yag) : 0 }}
                              </td>
                              <td class='text-center align-center align-content-center align-self-center align-middle' :ref='"calorie"+index+i'>
                                {{ !isEmpty(food.calorie) ? parseFloat(food.calorie) : 0 }}
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

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
    dieticianData() {
      return this.$auth.user
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
      selectedMealRates: [],
      selectedFoods: [],
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
      mealss: [],
      dietFoods: [],
      adultCalorieCalc: { original: { data: { oga: null, bki: null } } },
      criteria: [],
      edietfoods: [],
      factors: [],
      month: null,
      user: {},
      year: null,
      criteriaName: [],
      criteriaNames: [],
      criteriaValue: [],
      criteriaQuantity: [],
      criteriaSelectedFoods: []
    }
  },
  mounted() {
    this.getEdietVariables()
  },
  methods: {
    cloneProperty(index) {
      try {
        this.mealss[index].foods.push(this.mealss[index].foods.at(-1))
      } catch (e) {
        console.log(e)
      }
    },
    setRates(event, index, i) {
        try {
          this.$refs['karbonhidrat' + index + i][0].innerHTML = (!this.isEmpty(event.karbonhidrat) && parseFloat(event.karbonhidrat) > 0 ? parseFloat(event.karbonhidrat) : 0)
          this.$refs['protein' + index + i][0].innerHTML = (!this.isEmpty(event.protein) && parseFloat(event.protein) > 0 ? parseFloat(event.protein) : 0)
          this.$refs['yag' + index + i][0].innerHTML = (!this.isEmpty(event.yag) && parseFloat(event.yag) > 0 ? parseFloat(event.yag) : 0)
          this.$refs['calorie' + index + i][0].innerHTML = (!this.isEmpty(event.calorie) && parseFloat(event.calorie) > 0 ? parseFloat(event.calorie) : 0)

          this.$set(this.criteriaNames[index][i],i,event.criteriaValue[0])
          this.$set(this.criteriaValue[index][i],i,event.criteriaName)
          this.$set(this.criteriaQuantity[index][i],i,event.quantity)
          this.$set(this.criteriaName[index][i],i,event.criteriaName[0])
        } catch (e) {
          console.log(e)
        }

    },
    getEdietVariables() {
      console.log(this.$route.params.id)
      try {
        this.$axios.get(
          process.env.apiBaseUrl + 'dietician/e-diets/create/' + this.$route.params.id
        ).then((result) => {
          console.log(result.data.data)
          this.adultCalorieCalc = result.data.data.adultCalorieCalc
          this.criteria = result.data.data.criteria
          this.diseases = result.data.data.diseases
          this.edietfoods = result.data.data.edietfoods
          this.exercises = result.data.data.exercises
          this.factors = result.data.data.factors
          this.meals = result.data.data.meals
          this.month = result.data.data.month
          this.user = result.data.data.user
          this.year = result.data.data.year
        }).catch((e) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    },
    toggleExercise() {
      this.$nextTick(() => {
        if (this.selectAllExercise) {
          this.selectedExercises = []
        } else {
          this.selectedExercises = []
          this.exercises.forEach((el) => {
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
        if (this.selectedFactors.filter(n => n).length !== 3 && this.year >= 18) {
          this.$izitoast.error({
            title: 'Hata!',
            message: 'Faktörleri Seçtiğinizden Emin Olup Tekrar Deneyin.',
            position: 'topCenter',
            displayMode: 'once'
          })
          this.e1 = 1
          return false
        }
        if (this.selectedFactors.filter(n => n).length !== 4 && this.year >= 10 && this.year < 18) {
          this.$izitoast.error({
            title: 'Hata!',
            message: 'Faktörleri Seçtiğinizden Emin Olup Tekrar Deneyin.',
            position: 'topCenter',
            displayMode: 'once'
          })
          this.e1 = 1
          return false
        }
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
        if (!this.isEmpty(this.selectedMealRates)) {
          this.selectedMealRates = this.selectedMealRates.filter(v => parseInt(v))
          if (this.selectedMealRates.length !== this.selectedMeals.length) {
            this.$izitoast.error({
              title: 'Hata!',
              message: 'Öğün Oranlarını Doldurduğunuzdan Emin Olup Tekrar Deneyin.',
              position: 'topCenter',
              displayMode: 'once'
            })
            this.e1 = 2
            return false
          }
        } else {
          this.$izitoast.error({
            title: 'Hata!',
            message: 'Öğün Oranlarını Doldurduğunuzdan Emin Olup Tekrar Deneyin.',
            position: 'topCenter',
            displayMode: 'once'
          })
          this.e1 = 2
          return false
        }
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
      if (!this.isEmpty(this.selectedFactors) && !this.isEmpty(this.selectedMeals) && !this.isEmpty(this.selectedMealRates) && !this.isEmpty(this.selectedExercises) || (this.year === 0 && !this.isEmpty(this.selectedMeals))) {
        let selectedFactors = this.selectedFactors.filter(n => n)
        let selectedMeals = this.selectedMeals.filter(n => n)
        let selectedExercises = this.selectedExercises.filter(n => n)
        this.$axios.post(process.env.apiBaseUrl + 'dietician/e-diets/create/' + this.user._id.$oid, {
          'selectedFactors': selectedFactors,
          'selectedMeals': selectedMeals,
          'selectedExercises': selectedExercises,
          'selectedMealRates': this.selectedMealRates.filter(n => parseInt(n))
        }).then((result) => {
          this.bmh = result.data.data.bmh
          this.factorFirst = result.data.data.factorFirst
          this.factorSecond = result.data.data.factorSecond
          this.factorThird = result.data.data.factorThird
          this.factorFour = result.data.data.factorFour
          this.mealss = result.data.data.mealss
          this.dietFoods = result.data.data.dietFoods
          if (!this.isEmpty(this.mealss)) {
            let $this = this
            $this.criteriaValue = []
            $this.criteriaName = []
            $this.criteriaNames = []
            $this.criteriaQuantity = []
            $this.criteriaSelectedFoods = []
            this.mealss.forEach(function(v, index) {
              $this.criteriaValue[index] = []
              $this.criteriaName[index] = []
              $this.criteriaNames[index] = []
              $this.criteriaQuantity[index] = []
              $this.criteriaSelectedFoods[index] = []
              $this.dietFoods.forEach(function(value, i) {
                $this.criteriaValue[index].push(value.criteriaValue[0])
                $this.criteriaName[index].push(value.criteriaName[0])
                $this.criteriaNames[index].push(value.criteriaName)
                $this.criteriaQuantity[index].push(value.quantity)
                $this.criteriaSelectedFoods[index].push(value._id)
              })
            })
            console.log(this.criteriaNames)
          }
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
td.rotate {
  vertical-align: bottom;
  text-align: center;
}

td.rotate span {
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}
</style>
