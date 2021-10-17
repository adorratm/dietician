<template>
  <div>
    <!-- Page Wrapper -->
    <div class='page-wrapper'>
      <div class='content container-fluid'>

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

        <!-- General -->

        <v-card>
          <v-card-text>
            <ValidationObserver v-slot='{ handleSubmit }'>
              <form
                @submit.prevent='handleSubmit(saveRecipes)'
                ref='recipesForm'
                enctype='multipart/form-data'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Yemek Tarifi Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 2' step='2'>
                      Yemek Tarifi Görselleri
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 3' step='3'>
                      Kapak Fotoğrafı Seçimi
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        name='Yemek Tarifi Adı'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Yemek Tarifi Adı'
                            name='name'
                            v-model='inputData.name'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Yemek Tarifi Türü'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-select
                            label='Yemek Tarifi Türü'
                            name='category_id'
                            :items='allCategories'
                            item-text='name'
                            item-value='_id.$oid'
                            v-model='inputData.category_id'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Yemek Tarifi Porsiyon Sayısı'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Yemek Tarifi Porsiyon Sayısı'
                            name='portion'
                            v-model='inputData.portion'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Yemek Tarifi Hazırlık Süresi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Yemek Tarifi Hazırlık Süresi'
                            name='prepare_time'
                            v-model='inputData.prepare_time'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Yemek Tarifi Pişirme Süresi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Yemek Tarifi Pişirme Süresi'
                            name='cooking_time'
                            v-model='inputData.cooking_time'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Yemek Tarifi Kalorisi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Yemek Tarifi Kalorisi (Porsiyon - Gram)'
                            name='calorie'
                            v-model='inputData.calorie'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Yemek Tarifi Açıklaması'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <editor
                            name="description"
                            id="description"
                            v-model="inputData.description"
                            api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                            :init="{
                          placeholder:'Yemek Tarifi Açıklaması',
													height: 300,
													plugins: [
														'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
													],
													toolbar:
														'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
													entity_encoding: 'raw',
													forced_root_block: '',
													paste_auto_cleanup_on_paste: true,
													language: 'tr_TR', // select language
													language_url:
														'https://cdn.jsdelivr.net/npm/tinymce-lang/langs/tr_TR.js',
													branding: false,
													image_advtab: true,
													mobile: {
														theme: 'silver'
													},
													setup: function(editor) {
                            editor.on('Init', function() {
                              editor.save();
                            });
														editor.on('change', function() {
															editor.save();
														});
													},
													convert_urls: false
												}"
                          />
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
                            <v-card-text class='px-0'
                                         v-if='!isEmpty(inputs)'>
                              <v-row
                                v-bind:key='index'
                                v-for='(input, index) in inputs'
                              >
                                <v-col
                                  cols='12'
                                  sm='12'
                                  md='12'
                                  lg='4'
                                  xl='4'
                                >
                                  <ValidationProvider
                                    v-bind:name='input[0].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input[0].label'
                                        name='vitaminName[]'
                                        v-model='input[0].value'
                                        clearable
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
                                  sm='12'
                                  md='12'
                                  lg='3'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-bind:name='input[1].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input[1].label'
                                        name='vitaminValue[]'
                                        v-model='input[1].value'
                                        clearable
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
                                  sm='12'
                                  md='12'
                                  lg='3'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-bind:name='input[2].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input[2].label'
                                        name='vitaminType[]'
                                        v-model='input[2].value'
                                        clearable
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
                                  sm='12'
                                  md='12'
                                  lg='2'
                                  xl='2'
                                  class='text-center'
                                >
                                  <v-btn
                                    color='info'
                                    fab
                                    @click.prevent='cloneProperty'
                                    role='button'
                                  >
                                    <v-icon>mdi mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn
                                    color='error'
                                    fab
                                    v-if='inputs.length > 1'
                                    @click.prevent='
																				removeProperty(input[0].id)
																			'
                                    role='button'
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
                              v-if='!isEmpty(inputs2) && !isEmpty(allCriterias) && !isEmpty(allNutrients) && !isEmpty(allCategories)'>
                              <v-row
                                v-bind:key='index'
                                v-for='(input2, index) in inputs2'
                              >
                                <v-col
                                  cols='12'
                                  sm='12'
                                  md='12'
                                  lg='3'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-bind:name='input2[0].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-autocomplete
                                        v-model='input2[0].value'
                                        :items='allCriterias'
                                        clearable
                                        item-text='name'
                                        item-value='name'
                                        label='Malzeme Ölçüt Değeri Adı'
                                        name='criteriaName[]'
                                        hide-details
                                        outlined
                                      >
                                      </v-autocomplete>
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols='12'
                                  sm='12'
                                  md='12'
                                  lg='2'
                                  xl='2'
                                >
                                  <ValidationProvider
                                    v-bind:name='input2[1].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input2[1].label'
                                        name='criteriaValue[]'
                                        v-model='input2[1].value'
                                        clearable
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
                                  sm='12'
                                  md='12'
                                  lg='2'
                                  xl='2'
                                >
                                  <ValidationProvider
                                    v-bind:name='input2[2].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input2[2].label'
                                        name='criteriaType[]'
                                        v-model='input2[2].value'
                                        clearable
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
                                  sm='12'
                                  md='12'
                                  lg='3'
                                  xl='3'
                                >
                                  <ValidationProvider
                                    v-bind:name='input2[3].label'
                                    rules='required'
                                    v-slot='{ errors }'
                                  >
                                    <div class='form-group'>
                                      <v-autocomplete
                                        :label='input2[3].label'
                                        :items='allNutrients'
                                        item-text='name'
                                        item-value='_id.$oid'
                                        name='criteriaNutrient[]'
                                        v-model='input2[3].value'
                                        clearable
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
                                  sm='12'
                                  md='12'
                                  lg='2'
                                  xl='2'
                                  class='text-center'
                                >
                                  <v-btn
                                    color='info'
                                    fab
                                    @click.prevent='cloneProperty2'
                                    role='button'
                                  >
                                    <v-icon>mdi mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn
                                    v-if='inputs2.length > 1'
                                    @click.prevent='removeProperty2(input2[0].id)'
                                    role='button'
                                    color='error'
                                    fab
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
                        Yemek Tarifini Kayıt Et, Görsel Yüklemeye Geç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step='2'>
                      <div class='form-group'>
                        <dropzone
                          @vdropzone-complete='onComplete'
                          ref='myDropzone'
                          id='dropzone'
                          :options='options'
                          :headers='options.headers'
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
                            :items='data'
                            disable-pagination
                            :hide-default-footer='true'
                          >
                            <template v-slot:[`item.img_url`]='{ item }'>
                              <img
                                :alt='item.img_url'
                                v-bind:src='item.img_url'
                                width='150'
                                height='150'
                              />
                            </template>
                            <template v-slot:[`item.isCover`]='{ item }'>
                              <v-layout justify-center>
                                <v-switch
                                  class='d-flex justify-content-center mx-auto px-auto text-center'
                                  v-model='item.isCover'
                                  color='success'
                                  :key='item.id'
                                  @click='isCoverSetter(item.id)'
                                ></v-switch>
                              </v-layout>
                            </template>
                            <template v-slot:[`item.isActive`]='{ item }'>
                              <v-layout justify-center>
                                <v-switch
                                  class='d-flex justify-content-center mx-auto px-auto text-center'
                                  v-model='item.isActive'
                                  color='success'
                                  :key='item.id'
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
                                total-visible='7'
                                next-icon='mdi-menu-right'
                                prev-icon='mdi-menu-left'
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
import Breadcrumb from '~/components/backend/breadcrumb'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor
  },
  name: 'exercise-categories-add',
  middleware: ['auth', 'admin'],
  layout: 'admin',
  computed: {
    currentPath() {
      return this.$route.name
    },
    img_url() {
      return process.env.apiPublicUrl
    },
    user() {
      return this.$auth.user
    }
  },
  data() {
    return {
      breadCrumbItems: [
        { name: 'Anasayfa', url: '/panel' },
        { name: 'Yemek Tarifleri', url: '/panel/recipes' },
        { name: 'Yemek Tarifi Ekle' }
      ],
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
          { id: 'criteria0', label: 'Malzeme Ölçüt Değeri Adı', value: '' },
          { id: 'criteriaValue0', label: 'Malzeme Ölçüt Değeri', value: '' },
          {
            id: 'criteriaType0',
            label: 'Malzeme Ölçüt Değeri Türü',
            value: ''
          },
          { id: 'criteriaNutrient0', label: 'Malzeme Besini', value: '' }
        ]
      ],
      e1: 1,
      inputData: {
        name: null,
        description: null,
        id: null,
        category_id: null
      },
      data: [],
      searchTitle: null,
      allCriterias: [],
      allNutrients: [],
      allCategories: [],
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
        url: process.env.apiBaseUrl + 'panel/recipes/create-file/',
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
      tabItems: [{ tab: 'Besin Değerleri' }, { tab: 'Yemek Tarifi Malzemeleri' }]
    }
  },
  methods: {
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
    getCriterias() {
      this.$axios
        .get(`${process.env.apiBaseUrl}panel/recipes/create`, {
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
          this.allCriterias = response.data.data.criterias
          this.allNutrients = response.data.data.nutrients
          this.allCategories = response.data.data.categories
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
          `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=recipes_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=recipes_id&where_value=${this.inputData.id}&joins=recipes_file`,
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
          '&table=recipes_file',
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
          'panel/datatables/is-active-setter?table=recipes_file&id=' +
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
          'panel/datatables/is-cover-setter?table=recipes_file&foreign_column=recipes_id&id=' +
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
          id: `recipe${++this.counter2}`,
          label: 'Malzeme Ölçüt Değeri Adı',
          value: ''
        },
        {
          id: `recipeValue${++this.counter2}`,
          label: 'Malzeme Ölçüt Değeri',
          value: ''
        },
        {
          id: `recipeType${++this.counter2}`,
          label: 'Malzeme Ölçüt Değeri Türü',
          value: ''
        },
        {
          id: `recipeNutrient${++this.counter2}`,
          label: 'Malzeme Besini',
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
    saveRecipes() {
      let formData = new FormData(this.$refs.recipesForm)
      formData.delete('criteriaName[]')
      let criteriaValues = this.inputs2
      for (let i = 0; i < criteriaValues.length; i++) {
        formData.append('criteriaName[]', criteriaValues[i][0].value)
      }
      formData.delete('criteriaNutrient[]')
      let criteriaNutrient = this.inputs2
      for (let i = 0; i < criteriaNutrient.length; i++) {
        formData.append('criteriaNutrient[]', criteriaNutrient[i][3].value)
      }
      this.$axios
        .post(process.env.apiBaseUrl + 'panel/recipes/create', formData, {
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
              'panel/recipes/create-file/' +
              response.data.data.$oid
            this.$refs.myDropzone.dropzone.options.url =
              process.env.apiBaseUrl +
              'panel/recipes/create-file/' +
              response.data.data.$oid
            this.options.url =
              process.env.apiBaseUrl +
              'panel/recipes/create-file/' +
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
    this.retrieveData()
    this.getCriterias()
  }
}
</script>

<style scoped>

</style>
