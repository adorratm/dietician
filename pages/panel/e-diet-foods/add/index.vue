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
                @submit.prevent='handleSubmit(saveEdietFoods)'
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
                            v-model='inputData.name'
                            clearable
                            label='Besin Adı'
                            name='name'
                            outlined
                            hide-details
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                            v-model='inputData.description'
                            clearable
                            label='Besin Açıklaması'
                            name='description'
                            outlined
                            hide-details
                          ></v-textarea>
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                            v-model='inputData.quantity'
                            clearable
                            label='Miktar'
                            name='quantity'
                            outlined
                            hide-details
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                            v-model='selectedMeals'
                            :items='meals'
                            clearable
                            item-text='name'
                            item-value='_id.$oid'
                            label='Öğün Seçin'
                            multiple
                            name='meals[]'
                            outlined
                            hide-details
                          >
                            <template v-slot:prepend-item>
                              <v-list-item ripple @click='toggle'>
                                <v-list-item-action>
                                  <v-icon
                                    :color="
																			selectedMeals !== undefined &&
																			selectedMeals !== null &&
																			selectedMeals !== '' &&
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
                              <template>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-html='data.item.name'
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-select>
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                            v-model='selectedAgeGroups'
                            :items='ageGroups'
                            clearable
                            label='Yaş Grubu Seçin'
                            name='ageGroups'
                            hide-details
                            outlined
                          >
                          </v-select>
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                            v-model='selectedDiseases'
                            :items='diseases'
                            chips
                            clearable
                            item-text='name'
                            item-value='_id.$oid'
                            label='Hastalık Seçin'
                            multiple
                            name='selectedDiseases[]'
                            outlined
                            hide-details
                          >
                            <template v-slot:prepend-item>
                              <v-list-item ripple @click='toggle3'>
                                <v-list-item-action>
                                  <v-icon
                                    :color="
																			selectedDiseases !== undefined &&
																			selectedDiseases !== null &&
																			selectedDiseases !== '' &&
																			selectedDiseases.length > 0
																				? 'indigo darken-4'
																				: ''
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
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                            <v-card-text class='px-0' v-if='!isEmpty(inputs)'>
                              <v-row
                                v-for='(input, index) in inputs'
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
                                    rules='required'
                                    v-bind:name='input[0].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input[0].value'
                                        :label='input[0].label'
                                        clearable
                                        name='vitaminName[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    rules='required'
                                    v-bind:name='input[1].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input[1].value'
                                        :label='input[1].label'
                                        clearable
                                        name='vitaminValue[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    rules='required'
                                    v-bind:name='input[2].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input[2].value'
                                        :label='input[2].label'
                                        clearable
                                        name='vitaminType[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    v-if='inputs.length > 1'
                                    color='error'
                                    fab
                                    role='button'
                                    @click.prevent='
																				removeProperty(input[0].id)
																			'
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
                            <v-card-text class='px-0'
                              v-if='!isEmpty(inputs2) && !isEmpty(allCriterias)'
                            >
                              <v-row
                                v-for='(input2, index) in inputs2'
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
                                    rules='required'
                                    v-bind:name='input2[0].label'
                                  >
                                    <div class='form-group'>
                                      <v-autocomplete
                                        v-if='!isEmpty(allCriterias) && allCriterias.length > 0'
                                        v-model='input2[0].value'
                                        :items='allCriterias'
                                        :label='input2[0].label'
                                        clearable
                                        item-text='name'
                                        item-value='name'
                                        name='criteriaName[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    rules='required'
                                    v-bind:name='input2[1].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input2[1].value'
                                        :label='input2[1].label'
                                        clearable
                                        name='criteriaValue[]'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    rules='required'
                                    v-bind:name='input2[2].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input2[2].value'
                                        :label='input2[2].label'
                                        clearable
                                        name='criteriaType[]'
                                        outlined
                                        hide-details
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    v-if='inputs2.length > 1'
                                    color='error'
                                    fab
                                    role='button'
                                    @click.prevent='
																				removeProperty2(input2[0].id)
																			'
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
                        type='submit'
                      >
                        Besini Kaydet, Görsel Yüklemeye Geç
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
                        color='primary'
                        role='button'
                        @click.prevent='selectCover'
                      >
                        Kapak Fotoğrafı Seç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step='3'>
                      <v-card>
                        <v-card-title>
                          Görseller
                        </v-card-title>
                        <v-card-text>
                          <v-data-table
                            :headers='headers'
                            :hide-default-footer='true'
                            :items='data'
                            disable-pagination
                          >
                            <template v-slot:[`item.img_url`]='{ item }'>
                              <img
                                :alt='item.img_url'
                                height='150'
                                v-bind:src='item.img_url'
                                width='150'
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
                                outlined
                                hide-details
                              ></v-select>
                              <v-btn
                                class='mt-2'
                                color='info'
                                role='button'
                                @click.prevent='e1 = 2'
                              >
                                Geri Dön
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
  name: 'exercise-categories-add',
  middleware: ["auth","admin"],
  layout: 'admin',
  computed: {
    currentPath() {
      return this.$route.name
    },
    img_url() {
      return process.env.apiPublicUrl
    },
    user(){
      return this.$auth.user
    },
    likesAllFruit() {
      return (!this.isEmpty(this.selectedMeals) && !this.isEmpty(this.meals) &&
        this.selectedMeals.length === this.meals.length
      )
    },
    likesSomeFruit() {
      return (!this.isEmpty(this.selectedMeals) &&
        this.selectedMeals.length > 0 &&
        !this.likesAllFruit
      )
    },
    icon() {
      if (this.likesAllFruit) return 'mdi-close-box'
      if (this.likesSomeFruit) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllFruit2() {
      return this.selectedAgeGroups.length === this.ageGroups.length
    },
    likesSomeFruit2() {
      return this.selectedAgeGroups.length > 0 && !this.likesAllFruit2
    },
    icon2() {
      if (this.likesAllFruit2) return 'mdi-close-box'
      if (this.likesSomeFruit2) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllFruit3() {
      return (!this.isEmpty(this.selectedDiseases) && !this.isEmpty(this.diseases) &&
        this.selectedDiseases.length === this.diseases.length
      )
    },
    likesSomeFruit3() {
      return (!this.isEmpty(this.selectedDiseases) &&
        this.selectedDiseases.length > 0 &&
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
        {name: "E-Diyet Besini Ekle"}
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
      counter: 0,
      counter2: 0,
      inputs: [
        [
          { id: 'vitamin0', label: 'Besin Değeri Adı', value: '' },
          {
            id: 'vitaminValue0',
            label: 'Besin Değeri',
            value: ''
          },
          {
            id: 'vitaminType0',
            label: 'Besin Değeri Türü',
            value: ''
          }
        ]
      ],
      inputs2: [
        [
          { id: 'criteria0', label: 'Ölçüt Değeri Adı', value: null },
          {
            id: 'criteriaValue0',
            label: 'Ölçüt Değeri',
            value: ''
          },
          {
            id: 'criteriaType0',
            label: 'Ölçüt Değeri Türü',
            value: ''
          }
        ]
      ],
      e1: 1,
      inputData: {
        name: null,
        description: null,
        id: null
      },
      data: [],
      searchTitle: null,
      allCriterias: [],
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
        url: process.env.apiBaseUrl + 'panel/e-diet-foods/create-file/',
        headers: {
          Authorization:
            'Bearer ' +
            (!this.isEmpty(this.$auth.$storage.getUniversal('user'))
              ? this.$auth.$storage.getUniversal('user').api_token
              : null)
        },
        params: {
          title: null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      tab: null,
      tabItems: [{ tab: 'Besin Değerleri' }, { tab: 'Ölçüt Değerleri' }]
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj ) {
      if ( typeof obj == "number" ) return false;
      else if ( typeof obj == "string" ) return obj.length === 0;
      else if ( Array.isArray( obj ) ) return obj.length === 0;
      else if ( typeof obj == "object" )
        return obj == null || Object.keys( obj ).length === 0;
      else if ( typeof obj == "boolean" ) return false;
      else return !obj;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedMeals = []
        } else {
          this.selectedMeals = this.meals.slice()
        }
      })
    },
    toggle2() {
      this.$nextTick(() => {
        if (this.likesAllFruit2) {
          this.selectedAgeGroups = []
        } else {
          this.selectedAgeGroups = this.ageGroups.slice()
        }
      })
    },
    toggle3() {
      this.$nextTick(() => {
        if (this.likesAllFruit3) {
          this.selectedDiseases = []
        } else {
          this.selectedDiseases = []
          this.diseases.forEach((el, index) => {
            this.selectedDiseases.push(el._id.$oid)
          })
        }
      })
    },
    remove(item) {
      const index = this.selectedDiseases.indexOf(item._id.$oid)
      if (index >= 0) this.selectedDiseases.splice(index, 1)
    },
    getCriterias() {
      this.$axios
        .get(`${process.env.apiBaseUrl}panel/e-diet-foods/create`, {
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
        })
        .then(response => {
          this.allCriterias = response.data.data.criteria
          this.diseases = response.data.data.diseases
          this.meals = response.data.data.meals
        })
        .catch(err => console.log(err))
    },
    selectCover() {
      this.e1 = 3
      this.retrieveData()
    },
    getRequestParams(searchTitle, page, pageSize) {
      let params = {}
      params['title'] = searchTitle
      params['page'] = page
      params['size'] = pageSize
      return params
    },
    retrieveData(url) {
      let urlParam = 'get-all'
      if (url !== undefined && url !== '' && url !== null) {
        urlParam = url
      }
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      )
      this.$axios
        .get(
          `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=edietfoods_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=edietfoods_id&where_value=${this.inputData.id}&joins=edietfoods_file`,
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
          this.data = response.data.data.data.map(this.getDisplayData)

          this.totalPages = response.data.data.last_page
        })
        .catch(err => console.log(err))
        .finally(() => (this.loading = false))
    },
    handlePageChange(value) {
      this.page = value
      this.retrieveData()
    },
    handlePageSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.retrieveData()
    },
    refreshList() {
      this.retrieveData()
    },
    deleteData(id) {
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
    },
    isActiveSetter(id) {
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
    },
    isCoverSetter(id) {
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
    },
    getDisplayData(data) {
      return {
        rank: data.rank,
        id: data._id.$oid,
        img_url: this.img_url + data.img_url,
        isCover: data.isCover,
        isActive: data.isActive
      }
    },

    cloneProperty() {
      this.inputs.push([
        {
          id: `vitamin${++this.counter}`,
          label: 'Besin Değeri Adı',
          value: ''
        },
        {
          id: `vitaminValue${++this.counter}`,
          label: 'Besin Değeri',
          value: ''
        },
        {
          id: `vitaminType${++this.counter}`,
          label: 'Besin Değeri Türü',
          value: ''
        }
      ])
    },
    removeProperty(id) {
      for (let i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i][0].id === id) {
          this.inputs.splice(i, 1)
        }
      }
    },
    cloneProperty2() {
      this.inputs2.push([
        {
          id: `criteria${++this.counter2}`,
          label: 'Ölçüt Değeri Adı',
          value: ''
        },
        {
          id: `criteriaValue${++this.counter2}`,
          label: 'Ölçüt Değeri',
          value: ''
        },
        {
          id: `criteriaType${++this.counter2}`,
          label: 'Ölçüt Değeri Türü',
          value: ''
        }
      ])
    },
    removeProperty2(id) {
      for (let i = 0; i < this.inputs2.length; i++) {
        if (this.inputs2[i][0].id === id) {
          this.inputs2.splice(i, 1)
        }
      }
    },
    onComplete(e) {
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
    },
    saveEdietFoods() {
      let formData = new FormData(this.$refs.eDietFoodsForm)
      let meals = this.selectedMeals
      formData.delete('selectedMeals[]')
      formData.delete('selectedMeals')
      let diseases = this.selectedDiseases
      formData.delete('selectedDiseases[]')
      formData.delete('selectedDiseases')
      formData.delete('criteriaName[]')
      formData.delete('criteriaName')
      let criteriaValues = this.inputs2
      for (let i = 0; i < criteriaValues.length; i++) {
        formData.append('criteriaName[]', criteriaValues[i].value)
      }
      for (let i = 0; i < diseases.length; i++) {
        formData.append('selectedDiseases[' + i + ']', diseases[i])
      }
      for (let i = 0; i < meals.length; i++) {
        formData.append('selectedMeals[' + i + ']', meals[i])
      }
      this.$axios
        .post(process.env.apiBaseUrl + 'panel/e-diet-foods/create', formData, {
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
          },
          credentials: 'same-origin'
        })
        .then(response => {
          if (response.data.success) {
            this.$izitoast.success({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
            this.$refs.myDropzone.options.url =
              process.env.apiBaseUrl +
              'panel/e-diet-foods/create-file/' +
              response.data.data.$oid
            this.$refs.myDropzone.dropzone.options.url =
              process.env.apiBaseUrl +
              'panel/e-diet-foods/create-file/' +
              response.data.data.$oid
            this.options.url =
              process.env.apiBaseUrl +
              'panel/e-diet-foods/create-file/' +
              response.data.data.$oid
            this.inputData.id = response.data.data.$oid
            this.options.params.title = response.data.name
            this.e1 = 2
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
          }
        }).catch(err => console.log(err))
    }
  },
  mounted() {
    this.retrieveData();
    this.getCriterias()
  },
}
</script>

<style scoped>

</style>
