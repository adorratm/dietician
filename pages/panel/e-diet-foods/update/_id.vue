<template>
  <div>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

        <!-- General -->

        <v-card>
          <v-card-text>
            <ValidationObserver v-slot='{ handleSubmit }'>
              <form
                ref='eDietFoodsForm'
                enctype='multipart/form-data'
                @submit.prevent='handleSubmit(editEdietFoods)'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Besin Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 2' step='2'>
                      Besin Görselleri
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 3' step='3'>
                      Kapak Fotoğrafı Seçimi
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Besin Adı'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-text-field
                            v-model='data.name'
                            clearable
                            label='Besin Adı'
                            name='name'
                            outlined
                            hide-details
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Besin Açıklaması'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-textarea
                            v-model='data.description'
                            clearable
                            label='Besin Açıklaması'
                            name='description'
                            hide-details
                            outlined
                          ></v-textarea>
                          <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Miktar'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-text-field
                            v-model='data.quantity'
                            clearable
                            label='Miktar'
                            name='quantity'
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Öğün'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-select
                            v-model='data.selectedMeals'
                            :items='data.meals'
                            clearable
                            item-text='name'
                            item-value='_id.$oid'
                            label='Öğün Seçin'
                            multiple
                            name='selectedMeals[]'
                            hide-details
                            outlined
                          >
                            <template v-slot:prepend-item>
                              <v-list-item ripple @click='toggle'>
                                <v-list-item-action>
                                  <v-icon
                                    :color="
																			!isEmpty(data.meals) &&
																			data.meals.length > 0
																				? 'indigo darken-4'
																				: null
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
                              <template>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-html='data.item.name'
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-select>
                          <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Yaş Grubu'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-select
                            v-model='data.ageGroups'
                            :items='ageGroups'
                            clearable
                            label='Yaş Grubu Seçin'
                            name='ageGroups'
                            hide-details
                            outlined
                          >
                          </v-select>
                          <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Hastalık'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-autocomplete
                            v-model='data.selectedDiseases'
                            :items='data.diseases'
                            chips
                            clearable
                            item-text='name'
                            item-value='_id.$oid'
                            label='Hastalık Seçin'
                            multiple
                            name='selectedDiseases[]'
                            hide-details
                            outlined
                          >
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
                            <template v-slot:prepend-item>
                              <v-list-item ripple @click='toggle3'>
                                <v-list-item-action>
                                  <v-icon
                                    :color="
																			!isEmpty(data.selectedDiseases) &&
																			data.selectedDiseases.length > 0
																				? 'indigo darken-4'
																				: null
																		"
                                  >
                                    {{ icon3 }}
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
                              <template>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-html='data.item.name'
                                  ></v-list-item-title>
                                  <v-list-item-subtitle
                                    v-html='data.item.group'
                                  ></v-list-item-subtitle>
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-autocomplete>
                          <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <v-tabs v-model='tab' background-color='primary' dark>
                        <v-tab v-for='item in tabItems' :key='item.tab'>
                          {{ item.tab }}
                        </v-tab>
                      </v-tabs>
                      <v-tabs-items v-model='tab'>
                        <v-tab-item class='px-0' eager>
                          <v-card flat>
                            <v-card-text class='px-0' v-if='!isEmpty(data.values) && data.values.length > 0'>
                              <v-row
                                v-for='(input, index) in data.values'
                                v-bind:key='index'
                              >
                                <v-col
                                  cols='12'
                                  lg='4'
                                  md='12'
                                  sm='12'
                                  xl='4'
                                >
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Besin Değeri Adı'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.title'
                                        clearable
                                        label='Besin Değeri Adı'
                                        name='vitaminName[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols='12'
                                  lg='3'
                                  md='12'
                                  sm='12'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Besin Değeri'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.value'
                                        clearable
                                        label='Besin Değeri'
                                        name='vitaminValue[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols='12'
                                  lg='3'
                                  md='12'
                                  sm='12'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Besin Değeri Türü'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.type'
                                        clearable
                                        label='Besin Değeri Türü'
                                        name='vitaminType[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  class='text-center'
                                  cols='12'
                                  lg='2'
                                  md='12'
                                  sm='12'
                                  xl='2'
                                >
                                  <v-btn
                                    color='info'
                                    fab
                                    role='button'
                                    @click.prevent='cloneProperty'
                                  >
                                    <v-icon>mdi mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn
                                    v-if='data.values.length > 1'
                                    color='error'
                                    fab
                                    role='button'
                                    @click.prevent='removeProperty(index)'
                                  >
                                    <v-icon>mdi mdi-close</v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-tab-item>
                        <v-tab-item class='px-0' eager>
                          <v-card flat>
                            <v-card-text class='px-0' v-if='!isEmpty(data.criteria_values) && data.criteria_values.length > 0'>
                              <v-row
                                v-for='(input, index) in data.criteria_values'
                                v-bind:key='index'
                              >
                                <v-col
                                  cols='12'
                                  lg='4'
                                  md='12'
                                  sm='12'
                                  xl='4'
                                >
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Ölçüt Değeri Adı'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-autocomplete
                                        v-model='input.title'
                                        :items='data.criterias'
                                        clearable
                                        item-text='name'
                                        item-value='name'
                                        label='Ölçüt Değeri Adı'
                                        name='criteriaName[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols='12'
                                  lg='3'
                                  md='12'
                                  sm='12'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Ölçüt Değeri'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.value'
                                        clearable
                                        label='Ölçüt Değeri'
                                        name='criteriaValue[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols='12'
                                  lg='3'
                                  md='12'
                                  sm='12'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Ölçüt Değeri Türü'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.type'
                                        clearable
                                        label='Ölçüt Değeri Türü'
                                        name='criteriaType[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  class='text-center'
                                  cols='12'
                                  lg='2'
                                  md='12'
                                  sm='12'
                                  xl='2'
                                >
                                  <v-btn
                                    color='info'
                                    fab
                                    role='button'
                                    @click.prevent='cloneProperty2'
                                  >
                                    <v-icon>mdi mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn
                                    v-if='data.criteria_values.length > 1'
                                    color='error'
                                    fab
                                    role='button'
                                    @click.prevent='removeProperty2(index)'
                                  >
                                    <v-icon>mdi mdi-close</v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-tab-item>
                      </v-tabs-items>

                      <v-btn
                        color='primary'
                        role='button'
                        @click.prevent='e1 = 2'
                      >
                        Görsel Yüklemeye Geç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step='2'>
                      <div class='form-group'>
                        <dropzone
                          id='dropzone'
                          ref='myDropzone'
                          :headers='options.headers'
                          :options='options'
                          @vdropzone-complete='onComplete'
                        ></dropzone>
                      </div>
                      <v-btn
                        color='info'
                        role='button'
                        @click.prevent='e1 = 1'
                      >
                        Geri Dön
                      </v-btn>
                      <v-btn
                        color='primary'
                        role='button'
                        @click.prevent='selectCover'
                      >
                        Kapak Fotoğrafı Seç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step='3'>
                      <v-card flat>
                        <v-card-text class='px-0'>
                          <v-data-table
                            :headers='headers'
                            :hide-default-footer='true'
                            :items='imageData'
                            disable-pagination
                          >
                            <template v-slot:[`item.img_url`]='{ item }'>
                              <img
                                height='150'
                                v-bind:src='item.img_url'
                                width='150'
                                :alt='item.img_url'
                              />
                            </template>
                            <template v-slot:[`item.isCover`]='{ item }'>
                              <v-layout justify-center>
                                <v-switch
                                  :key='item.id'
                                  v-model='item.isCover'
                                  class='d-flex justify-content-center mx-auto px-auto text-center'
                                  color='success'
                                  @click='isCoverSetter(item.id)'
                                ></v-switch>
                              </v-layout>
                            </template>
                            <template v-slot:[`item.isActive`]='{ item }'>
                              <v-layout justify-center>
                                <v-switch
                                  :key='item.id'
                                  v-model='item.isActive'
                                  class='d-flex justify-content-center mx-auto px-auto text-center'
                                  color='success'
                                  @click='isActiveSetter(item.id)'
                                ></v-switch>
                              </v-layout>
                            </template>
                            <template v-slot:[`item.actions`]='{ item }'>
                              <v-icon small @click='deleteData(item.id)'>
                                mdi-delete
                              </v-icon>
                            </template>
                          </v-data-table>
                        </v-card-text>
                        <v-card-actions>
                          <v-row>
                            <v-col cols='12' lg='3'>
                              <v-select
                                v-model='pageSize'
                                :items='pageSizes'
                                label='Sayfada Görüntüleme Sayısı'
                                @change='handlePageSizeChange'
                                hide-details
                                outlined
                              ></v-select>
                              <v-btn
                                color='info'
                                role='button'
                                @click.prevent='e1 = 2'
                                class='mt-2'
                              >
                                Geri Dön
                              </v-btn>
                              <v-btn
                                class='mt-2'
                                color='primary'
                                type='submit'
                              >
                                Besini Güncelle
                              </v-btn>
                            </v-col>

                            <v-col cols='12' lg='9'>
                              <v-pagination
                                v-model='page'
                                :length='totalPages'
                                color='primary'
                                next-icon='mdi-menu-right'
                                prev-icon='mdi-menu-left'
                                total-visible='7'
                                @input='handlePageChange'
                                circle
                              ></v-pagination>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>

        <!-- /General -->

      </div>
    </div>
    <!-- /Page Wrapper -->
    <Nuxt />
  </div>
</template>

<script>
import Breadcrumb from "~/components/backend/breadcrumb"
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Editor from "@tinymce/tinymce-vue";
export default {
  components:{
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor,
  },
  name: 'exercise-categories-update',
  middleware: ["auth","admin"],
  layout: 'admin',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    user(){
      return this.$auth.user
    },
    likesAllFruit() {
      return (
        !this.isEmpty(this.data.selectedMeals) && !this.isEmpty(this.data.meals) &&
        this.data.selectedMeals.length === this.data.meals.length
      )
    },
    likesSomeFruit() {
      return (
        !this.isEmpty(this.data.selectedMeals) &&
        this.data.selectedMeals.length > 0 &&
        !this.likesAllFruit
      )
    },
    icon() {
      if (this.likesAllFruit) return 'mdi-close-box'
      if (this.likesSomeFruit) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllFruit2() {
      return this.data.ageGroups.length === this.ageGroups.length
    },
    likesSomeFruit2() {
      return this.data.ageGroups.length > 0 && !this.likesAllFruit2
    },
    icon2() {
      if (this.likesAllFruit2) return 'mdi-close-box'
      if (this.likesSomeFruit2) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllFruit3() {
      return (
        !this.isEmpty(this.data.selectedDiseases) && !this.isEmpty(this.data.diseases) &&
        this.data.selectedDiseases.length === this.data.diseases.length
      )
    },
    likesSomeFruit3() {
      return (
        !this.isEmpty(this.data.selectedDiseases) &&
        this.data.selectedDiseases.length > 0 &&
        !this.likesAllFruit3
      )
    },
    icon3() {
      if (this.likesAllFruit3) return 'mdi-close-box'
      if (this.likesSomeFruit3) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/panel"},
        {name: "E-Diyet Besinleri",url:"/panel/e-diet-foods"},
        {name: "E-Diyet Besini Düzenle"}
      ],
      disease: null,
      diseases: [],
      selectedDiseases: [],
      recipe: null,
      recipes: [],
      meals: ['Sabah', 'Kuşluk', 'Öğle', 'İkindi', 'Akşam', 'Gece'],
      ageGroups: ['0+', '1+', '10+', '18+'],
      selectedAgeGroups: [],
      selectedMeals: [],
      counter: !this.isEmpty(this.data) && !this.isEmpty(this.data.values)
        ? this.data.values.length
        : 0,
      counter2:
        !this.isEmpty(this.data) && !this.isEmpty(this.criteria_values)
          ? this.data.criteria_values.length
          : 0,
      e1: 1,
      imageData: [],
      data: {
        images: []
      },
      searchTitle: null,
      headers: [
        { text: '#', align: 'center', value: 'rank' },
        { text: 'Görsel', align: 'center', value: 'img_url', sortable: false },
        { text: 'Kapak Fotoğrafı', align: 'center', value: 'isCover' },
        { text: 'Durum', align: 'center', value: 'isActive' },
        {
          text: 'İşlemler',
          align: 'center',
          value: 'actions',
          sortable: false
        }
      ],
      page: 1,
      totalPages: 0,
      pageSize: 25,
      pageSizes: [25, 50, 100, 200, 500, 1000],
      loading: false,
      options: {
        url:
          process.env.apiBaseUrl +
          'panel/e-diet-foods/create-file/' +
          this.$route.params.id,
        headers: {
          Authorization:
            'Bearer ' +
            (!this.isEmpty(this.$auth.$storage.getUniversal('user'))
              ? this.$auth.$storage.getUniversal('user').api_token
              : null)
        },
        params: {
          title: !this.isEmpty(this.data) ? this.data.data.name
              : null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      tab: null,
      tabItems: [{ tab: 'Besin Değerleri' }, { tab: 'Ölçüt Değerleri' }]
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'panel/e-diet-foods/update/' + params.id
      )
      data.data.selectedMeals = data.data.selectedMeals.length !== 0 &&
      data.data.selectedMeals.length !== null &&
      data.data.selectedMeals.length !== undefined
        ? data.data.selectedMeals
        : []
      data.data.selectedDiseases = data.data.selectedDiseases.length !== 0 &&
      data.data.selectedDiseases.length !== null &&
      data.data.selectedDiseases.length !== undefined
        ? data.data.selectedDiseases
        : []
      if (data.data.values.length === 0 ||
        data.data.values.length === null ||
        data.data.values.length === undefined
      ) {
        data.data.values.push({
          title: '',
          value: '',
          type: '',
          id: 0
        })
      }
      if (data.data.criterias.length === 0 ||
        data.data.criterias.length === null ||
        data.data.criterias.length === undefined
      ) {
        data.data.criterias.push({
          title: '',
          value: '',
          type: '',
          id: 0
        })
      }
      if (data.data.criteria_values.length === 0 ||
        data.data.criteria_values.length === null ||
        data.data.criteria_values.length === undefined) {
        data.data.criteria_values.push({
          title: '',
          value: '',
          type: '',
          id: 0
        })
      }

      return data
    } catch (e) {
      console.log(e)
      error({ message: 'Besin Bilgisi Bulunamadı.', statusCode: 404 })
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
    toggle() {
      try {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.data.selectedMeals = []
          } else {
            this.data.selectedMeals = []
            this.data.meals.forEach((el) => {
              this.data.selectedMeals.push(el._id.$oid)
            })
          }
        })
      }catch (e) {
        console.log(e)
      }
    },
    toggle2() {
      try {
        this.$nextTick(() => {
          if (this.likesAllFruit2) {
            this.data.ageGroups = []
          } else {
            this.data.ageGroups = this.ageGroups.slice()
          }
        })
      }catch (e) {
        console.log(e)
      }
    },
    toggle3() {
      try {
        this.$nextTick(() => {
          if (this.likesAllFruit3) {
            this.data.selectedDiseases = []
          } else {
            this.data.selectedDiseases = []
            this.data.diseases.forEach((el) => {
              this.data.selectedDiseases.push(el._id.$oid)
            })
          }
        })
      }catch (e) {
        console.log(e)
      }
    },
    remove(item) {
      try {
        const index = this.data.selectedDiseases.indexOf(item._id.$oid)
        if (index >= 0) this.data.selectedDiseases.splice(index, 1)
      }catch (e) {
        console.log(e)
      }
    },
    selectCover() {
      try {
        this.e1 = 3
        this.retrieveData()
      }catch (e) {
        console.log(e)
      }
    },
    getRequestParams(searchTitle, page, pageSize) {
      try {
        let params = {}
        params['title'] = searchTitle
        params['page'] = page
        params['size'] = pageSize
        return params
      }catch (e) {
        console.log(e)
      }
    },
    retrieveData(url) {
      try {
        let urlParam = 'get-all'
        if (url !== undefined && url !== '' && url !== null) {
          urlParam = url
        }
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        )
        let oid = !this.isEmpty(this.data._id) && !this.isEmpty(this.data._id.$oid)
          ? this.data._id.$oid
          : null
        this.$axios
          .get(
            `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=edietfoods_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=edietfoods_id&where_value=${oid}&joins=edietfoods_file`,
            {
              json: true,
              withCredentials: false,
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, Content-Type, X-Auth-Token, Authorization',
                'Access-Control-Allow-Methods':
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.user.api_token
              },
              credentials: 'same-origin'
            }
          )
          .then(response => {
            this.imageData = response.data.data.data.map(this.getDisplayData)
            this.totalPages = response.data.data.last_page
          })
          .catch(err => console.log(err))
          .finally(() => (this.loading = false))
      }catch (e) {
        console.log(e)
      }
    },
    handlePageChange(value) {
      try {
        this.page = value
        this.retrieveData()
      }catch (e) {
        console.log(e)
      }
    },
    handlePageSizeChange(size) {
      try {
        this.pageSize = size
        this.page = 1
        this.retrieveData()
      }catch (e) {
        console.log(e)
      }
    },
    refreshList() {
      try {
        this.retrieveData()
      }catch (e) {
        console.log(e)
      }
    },
    deleteData(id) {
      try {
        this.$axios
          .delete(
            process.env.apiBaseUrl +
            'panel/datatables/delete-file?id=' +
            id +
            '&table=edietfoods_file',
            {
              json: true,
              withCredentials: false,
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, Content-Type, X-Auth-Token, Authorization',
                'Access-Control-Allow-Methods':
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.user.api_token
              },
              credentials: 'same-origin'
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter',
                displayMode: 'once'
              })
              this.refreshList()
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter',
                displayMode: 'once'
              })
            }
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    },
    isActiveSetter(id) {
      try {
        this.$axios
          .get(
            process.env.apiBaseUrl +
            'panel/datatables/is-active-setter?table=edietfoods_file&id=' +
            id,
            {
              json: true,
              withCredentials: false,
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, Content-Type, X-Auth-Token, Authorization',
                'Access-Control-Allow-Methods':
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.user.api_token
              },
              credentials: 'same-origin'
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter',
                displayMode: 'once'
              })
              this.refreshList()
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter',
                displayMode: 'once'
              })
            }
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    },
    isCoverSetter(id) {
      try {
        this.$axios
          .get(
            process.env.apiBaseUrl +
            'panel/datatables/is-cover-setter?table=edietfoods_file&foreign_column=edietfoods_id&id=' +
            id,
            {
              json: true,
              withCredentials: false,
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, Content-Type, X-Auth-Token, Authorization',
                'Access-Control-Allow-Methods':
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.user.api_token
              },
              credentials: 'same-origin'
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter',
                displayMode: 'once'
              })
              this.refreshList()
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter',
                displayMode: 'once'
              })
            }
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    },
    getDisplayData(data) {
      try {
        return {
          rank: data.rank,
          id: data._id.$oid,
          img_url: this.img_url + data.img_url,
          isCover: data.isCover,
          isActive: data.isActive
        }
      }catch (e) {
        console.log(e)
      }
    },

    cloneProperty() {
      try {
        this.data.values.push({
          title: '',
          value: '',
          type: '',
          id: ++this.counter
        })
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty(id) {
      try {
        this.data.values.splice(id, 1)
      }catch (e) {
        console.log(e)
      }
    },
    cloneProperty2() {
      try {
        this.data.criteria_values.push({
          value: '',
          type: '',
          id: ++this.counter2
        })
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty2(id) {
      try {
        this.data.criteria_values.splice(id, 1)
      }catch (e) {
        console.log(e)
      }
    },
    onComplete(e) {
      try {
        if (JSON.parse(e.xhr.response).success) {
          this.$izitoast.success({
            title: JSON.parse(e.xhr.response).title,
            message: JSON.parse(e.xhr.response).msg,
            position: 'topCenter',
            displayMode: 'once'
          })
        } else {
          this.$izitoast.error({
            title: JSON.parse(e.xhr.response).title,
            message: JSON.parse(e.xhr.response).msg,
            position: 'topCenter',
            displayMode: 'once'
          })
        }
      }catch (e) {
       console.log(e)
      }
    },
    editEdietFoods() {
      try {
        let formData = new FormData(this.$refs.eDietFoodsForm)
        let meals = this.data.selectedMeals
        formData.delete('selectedMeals[]')
        formData.delete('selectedMeals')
        let diseases = this.data.selectedDiseases
        formData.delete('selectedDiseases[]')
        formData.delete('selectedDiseases')
        formData.delete('criteriaName[]')
        formData.delete('criteriaName')
        let criteriaValues = this.data.criteria_values
        for (let i = 0; i < criteriaValues.length; i++) {
          formData.append('criteriaName[]', criteriaValues[i].title)
        }
        for (let i = 0; i < diseases.length; i++) {
          formData.append('selectedDiseases[' + i + ']', diseases[i])
        }
        for (let i = 0; i < meals.length; i++) {
          formData.append('selectedMeals[' + i + ']', meals[i])
        }
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'panel/e-diet-foods/update/' +
            this.data._id.$oid,
            formData,
            {
              json: true,
              withCredentials: false,
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, Content-Type, X-Auth-Token, Authorization',
                'Access-Control-Allow-Methods':
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary,
                Authorization: 'Bearer ' + this.user.api_token
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
              setTimeout(() => {
                window.location.href="/panel/e-diet-foods"
              }, 2000)
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
