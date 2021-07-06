<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot='{ handleSubmit }'>
        <form
          @submit.prevent='handleSubmit(saveRecipes)'
          ref='recipesForm'
          enctype='multipart/form-data'
        >
          <v-stepper v-model='e1'>
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
              <v-stepper-content step='1'>
                <ValidationProvider
                  name='Yemek Tarifi Adı'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-text-field
                    id='title'
                    type='text'
                    name='name'
                    v-model='inputData.name'
                    clearable
                    label='Yemek Tarifi Adı'
                  />
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name='Yemek Tarifi Porsiyon Sayısı'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-text-field
                    id='portion'
                    type='text'
                    class='form-control'
                    name='portion'
                    v-model='inputData.portion'
                    clearable
                    label='Yemek Tarifi Porsiyon Sayısı'
                  />
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name='Yemek Tarifi Hazırlık Süresi'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-text-field
                    id='prepare_time'
                    type='text'
                    class='form-control'
                    name='prepare_time'
                    v-model='inputData.prepare_time'
                    clearable
                    label='Yemek Tarifi Hazırlık Süresi'
                  />
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name='Yemek Tarifi Hazırlık Süresi'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-text-field
                    id='cooking_time'
                    type='text'
                    class='form-control'
                    name='cooking_time'
                    v-model='inputData.cooking_time'
                    clearable
                    label='Yemek Tarifi Pişirme Süresi'
                  />
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name='Yemek Tarifi Açıklaması'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-textarea
                    id='description'
                    class='form-control'
                    name='description'
                    v-model='inputData.description'
                    clearable
                    label='Yemek Tarifi Açıklaması'
                  ></v-textarea>
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <v-tabs v-model='tab' background-color='primary' dark show-arrows>
                  <client-only>
                    <v-tab v-for='item in tabItems' :key='item.tab'>
                      {{ item.tab }}
                    </v-tab>
                  </client-only>
                </v-tabs>

                <v-tabs-items v-model='tab'>
                  <v-tab-item eager>
                    <v-card>
                      <v-card-text v-if='!isEmpty(inputs)'>
                        <client-only>
                          <v-row
                            :key='index'
                            v-for='(input, index) in inputs'
                          >
                            <v-col cols='12' sm='12' md='12' lg='4' xl='4'>
                              <ValidationProvider
                                :name='input[0].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  :id='input[0].id'
                                  class='form-control'
                                  name='vitaminName[]'
                                  v-model='input[0].value'
                                  clearable
                                  :label='input[0].label'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                :name='input[1].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  :id='input[1].id'
                                  name='vitaminValue[]'
                                  v-model='input[1].value'
                                  clearable
                                  :label='input[1].label'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <div
                              class='col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'
                            >
                              <ValidationProvider
                                v-bind:name='input[2].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  :id='input[2].id'
                                  type='text'
                                  class='form-control'
                                  name='vitaminType[]'
                                  v-model='input[2].value'
                                  clearable
                                  :label='input[2].label'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </div>
                            <v-col cols='12' sm='12' md='12' lg='2' xl='2' class='text-center'>
                              <v-btn
                                @click.prevent='cloneProperty'
                                color='info'
                                role='button'
                                fab
                                small
                              >
                                <v-icon>mdi mdi-plus</v-icon>
                              </v-btn>
                              <v-btn
                                rounded
                                color='error'
                                v-if='inputs.length > 1'
                                @click.prevent='removeProperty(input[0].id)'
                                role='button'
                                fab
                                small
                              >
                                <v-icon>mdi mdi-close</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </client-only>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item eager>
                    <v-card>
                      <v-card-text
                        v-if='
													!isEmpty(inputs2) &&
														!isEmpty(allCriterias) &&
														!isEmpty(allNutrients)
												'
                      >
                        <client-only>
                          <v-row
                            :key='index'
                            v-for='(input2, index) in inputs2'
                          >
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                :name='input2[0].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-autocomplete
                                  name='criteriaName[]'
                                  label='Malzeme Ölçüt Değeri Adı Seçiniz.'
                                  v-model='input2[0].value'
                                  clearable
                                  :items='allCriterias'
                                  item-text='name'
                                  item-value='name'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='2' xl='2'>
                              <ValidationProvider
                                :name='input2[1].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  :id='input2[1].id'
                                  type='text'
                                  class='form-control'
                                  name='criteriaValue[]'
                                  v-model='input2[1].value'
                                  clearable
                                  :label='input2[1].label'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='2' xl='2'>
                              <ValidationProvider
                                :name='input2[2].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  type='text'
                                  class='form-control'
                                  name='criteriaType[]'
                                  v-model='input2[2].value'
                                  clearable
                                  :label='input2[2].label'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                :name='input2[3].label'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-autocomplete
                                  name='criteriaNutrient[]'
                                  clearable
                                  v-model='input2[0].value'
                                  label='Malzeme Besini Seçiniz.'
                                  :items='allNutrients'
                                  item-text='name'
                                  item-value='_id.$oid'
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='2' xl='2' class='text-center'>
                              <v-btn
                                @click.prevent='cloneProperty2'
                                color='info'
                                role='button'
                                fab
                                small
                              >
                                <v-icon>mdi mdi-plus</v-icon>
                              </v-btn>
                              <v-btn
                                v-if='inputs2.length > 1'
                                @click.prevent='removeProperty2(input2[0].id)'
                                color='error'
                                role='button'
                                fab
                                small
                              >
                                <v-icon>mdi mdi-close</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </client-only>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>

                <v-btn
                  color='primary'
                  type='submit'
                  class='mt-1'
                >
                  Yemek Tarifini Kayıt Et, Görsel Yüklemeye Geç
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step='2'>
                <v-row class='row'>
                  <v-col>
                    <dropzone
                      @vdropzone-complete='onComplete'
                      ref='myDropzone'
                      id='dropzone'
                      :options='options'
                      :headers='options.headers'
                    ></dropzone>
                  </v-col>
                </v-row>
                <v-btn
                  class='mt-1'
                  color='primary'
                  role='button'
                  @click.prevent='selectCover'
                >
                  Kapak Fotoğrafı Seç
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step='3'>
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
                        <v-img
                          :src='item.img_url'
                          :lazy-src='item.img_url'
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
                        ></v-select>
                      </v-col>

                      <v-col cols='12' lg='9'>
                        <v-pagination
                          color='success'
                          v-model='page'
                          :length='totalPages'
                          total-visible='7'
                          next-icon='mdi-menu-right'
                          prev-icon='mdi-menu-left'
                          @input='handlePageChange'
                        ></v-pagination>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
                <v-btn
                  class='mt-1'
                  color='primary'
                  role='button'
                  @click.prevent='e1 = 2'
                >
                  Geri Dön
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </form>
      </ValidationObserver>
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Breadcrumb from '@/components/includes/Breadcrumb'

export default {
  middleware: ["auth",'dietician'],
  layout: 'dietician',
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  mounted() {
    this.retrieveData()
    this.getCriterias()
  },
  data() {
    return {
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
          text: 'Yemek Tarifleri',
          disabled: false,
          href: '/dietician-panel/recipes/'
        },
        {
          text: 'Yemek Tarifi Ekle',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      counter: 0,
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
        id: null
      },
      data: [],
      searchTitle: null,
      allCriterias: [],
      allNutrients: [],
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
        url: process.env.apiBaseUrl + 'dietician/recipes/create-file/',
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
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null,
      tab: null,
      tabItems: [{ tab: 'Besin Değerleri' }, { tab: 'Yemek Tarifi Malzemeleri' }]
    }
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  methods: {
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
        .get(`${process.env.apiBaseUrl}dietician/recipes/create`, {
          headers: {
            Authorization: 'Bearer ' + this.userData.api_token
          }
        })
        .then(response => {

          this.allCriterias = response.data.data.criterias
          this.allNutrients = response.data.data.nutrients
          console.log(this.allCriterias)
          console.log(this.allNutrients)
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
      if (!this.isEmpty(url)) {
        urlParam = url
      }
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      )
      this.$axios
        .get(
          `${process.env.apiBaseUrl}dietician/datatables/${urlParam}?table=recipes_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=recipes_id&where_value=${this.inputData.id}&joins=recipes_file`,
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            }
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
          'dietician/recipes/delete-file?id=' +
          id +
          '&table=recipes_file',
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            }
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
        })
    },
    isActiveSetter(id) {
      this.$axios
        .get(
          process.env.apiBaseUrl +
          'dietician/datatables/is-active-setter?table=recipes_file&id=' +
          id,
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            }
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
        })
    },
    isCoverSetter(id) {
      this.$axios
        .get(
          process.env.apiBaseUrl +
          'dietician/datatables/is-cover-setter?table=recipes_file&foreign_column=recipes_id&id=' +
          id,
          {
            json: true,
            withCredentials: false,
            mode: 'no-cors',
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
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
        })
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
          id: `recipe${++this.counter}`,
          label: 'Malzeme Ölçüt Değeri Adı',
          value: ''
        },
        {
          id: `recipeValue${++this.counter}`,
          label: 'Malzeme Ölçüt Değeri',
          value: ''
        },
        {
          id: `recipeType${++this.counter}`,
          label: 'Malzeme Ölçüt Değeri Türü',
          value: ''
        },
        {
          id: `recipeNutrient${++this.counter}`,
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
      console.log(formData.get("vitaminName[]"))
      //formData.set("vitaminName[]",)
      return false
      this.$axios
        .post(process.env.apiBaseUrl + 'dietician/recipes/create', formData, {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=' + formData._boundary,
            Authorization: 'Bearer ' + this.userData.api_token
          }
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
              'dietician/recipes/create-file/' +
              response.data.data.$oid
            this.$refs.myDropzone.dropzone.options.url =
              process.env.apiBaseUrl +
              'dietician/recipes/create-file/' +
              response.data.data.$oid
            this.options.url =
              process.env.apiBaseUrl +
              'dietician/recipes/create-file/' +
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
        })
    }
  }
}
</script>

<style scoped>

</style>
