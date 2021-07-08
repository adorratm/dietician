<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot='{ handleSubmit }'>
        <form
          @submit.prevent='handleSubmit(editNutrients)'
          ref='nutrientsForm'
          enctype='multipart/form-data'
        >
          <v-stepper v-model='e1'>
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
              <v-stepper-content step='1'>
                <ValidationProvider
                  name='Besin Adı'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-text-field
                    label='Besin Adı'
                    id='title'
                    type='text'
                    name='name'
                    v-model='data.name'
                    clearable
                  />
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name='Besin Açıklaması'
                  rules='required'
                  v-slot='{ errors }'
                >
                  <v-textarea
                    label='Besin Açıklaması'
                    id='description'
                    class='form-control'
                    name='description'
                    v-model='data.description'
                    clearable
                  ></v-textarea>
                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <v-tabs v-model='tab' background-color='primary' dark>
                    <v-tab v-for='item in tabItems' :key='item.tab'>
                      {{ item.tab }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model='tab'>
                  <v-tab-item eager>
                    <v-card flat>
                      <v-card-text v-if="!isEmpty(data.values) && data.values.length > 0">
                          <v-row :key='index' v-for='(input, index) in data.values'>
                            <v-col cols='12' sm='12' md='12' lg='4' xl='4'>
                              <ValidationProvider
                                name='Besin Değeri Adı'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                  <v-text-field
                                    label='Besin Değeri Adı'
                                    type='text'
                                    name='vitaminName[]'
                                    v-model='input.title'
                                    clearable
                                  />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                name='Besin Değeri'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                  <v-text-field
                                    label='Besin Değeri'
                                    type='text'
                                    name='vitaminValue[]'
                                    v-model='input.value'
                                    clearable
                                  />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                name='Besin Değeri Türü'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                  <v-text-field
                                    label='Besin Değeri Türü'
                                    type='text'
                                    name='vitaminType[]'
                                    v-model='input.type'
                                    clearable
                                  />
                                  <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                    {{ errors[0] }}
                                  </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='2' xl='2' class='text-center justify-center'>
                              <v-btn
                                @click.prevent='cloneProperty'
                                fab
                                small
                                color='info'
                                role='button'
                              >
                                <v-icon>mdi mdi-plus</v-icon>
                              </v-btn>
                              <v-btn
                                class='ml-2'
                                v-if='data.values.length > 1'
                                @click.prevent='removeProperty(index)'
                                role='button'
                                color='error'
                                fab
                                small
                              >
                                <v-icon>mdi mdi-close</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item eager>
                    <v-card flat>
                      <v-card-text v-if="!isEmpty(data.criteria_values) && data.criteria_values.length > 0">
                          <v-row
                            :key='index'
                            v-for='(input, index) in data.criteria_values'
                          >
                            <v-col cols='12' sm='12' md='12' lg='4' xl='4'>
                              <ValidationProvider
                                name='Ölçüt Değeri Adı'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-autocomplete
                                  label='Ölçüt Değeri Adı'
                                  name="criteriaName[]"
                                  v-model="input.title"
                                  :items='data.criterias'
                                  item-text='name'
                                  item-value='name'
                                  clearable
                                >
                                </v-autocomplete>
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                name='Ölçüt Değeri'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  label='Ölçüt Değeri'
                                  type="text"
                                  class="form-control"
                                  name="criteriaValue[]"
                                  v-model="input.value"
                                  clearable
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols='12' sm='12' md='12' lg='3' xl='3'>
                              <ValidationProvider
                                name='Ölçüt Değeri Türü'
                                rules='required'
                                v-slot='{ errors }'
                              >
                                <v-text-field
                                  label='Ölçüt Değeri Türü'
                                  type="text"
                                  class="form-control"
                                  name="criteriaType[]"
                                  v-model="input.type"
                                  clearable
                                />
                                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                  {{ errors[0] }}
                                </v-alert>
                              </ValidationProvider>
                            </v-col>
                            <v-col
                              cols='12'
                              sm='12'
                              md='12'
                              lg='2'
                              xl='2'
                              class='text-center justify-center'
                            >
                              <v-btn
                                color='info'
                                small
                                fab
                                @click.prevent='cloneProperty2'
                                role='button'
                              >
                                <v-icon>mdi mdi-plus</v-icon>
                              </v-btn>
                              <v-btn
                                v-if='data.criteria_values.length > 1'
                                color='error'
                                small
                                fab
                                @click.prevent='removeProperty2(index)'
                                role='button'
                                class='ml-2'
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
                  class='mt-3'
                  role='button'
                  @click.prevent='e1 = 2'
                >
                  Görsel Yüklemeye Geç
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step='2'>
                <v-card>
                  <v-card-text>
                    <dropzone
                      @vdropzone-complete='onComplete'
                      ref='myDropzone'
                      id='dropzone'
                      :options='options'
                      :headers='options.headers'
                    ></dropzone>
                  </v-card-text>
                  <v-card-actions>
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
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step='3'>
                <v-card>
                  <v-card-title>
                    Görseller
                  </v-card-title>
                  <v-card-text>
                    <v-data-table
                      :headers='headers'
                      :items='imageData'
                      disable-pagination
                      :hide-default-footer='true'
                    >
                      <template v-slot:[`item.img_url`]='{ item }'>
                        <v-img
                          :src='item.img_url'
                          :lazy-src='item.img_url'
                          max-width='150'
                          max-height='150'
                          contain
                          class='text-center justify-center mx-auto px-auto'
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
                          v-model='page'
                          :length='totalPages'
                          total-visible='7'
                          next-icon='mdi-menu-right'
                          prev-icon='mdi-menu-left'
                          @input='handlePageChange'
                        ></v-pagination>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>


                    <v-btn
                      color='info'
                      role='button'
                      @click.prevent='e1 = 2'
                    >
                      Geri Dön
                    </v-btn>
                    <v-btn
                      color='primary'
                      type='submit'
                    >
                      Besini Güncelle
                    </v-btn>
                  </v-card-actions>
                </v-card>

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
  middleware: ['auth', 'admin'],
  layout: 'admin',
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  mounted() {
    this.retrieveData()
  },
  data() {
    return {
      items: [
        {
          text: 'Admin Paneli',
          disabled: false,
          href: '/panel'
        },
        {
          text: 'Besinler',
          disabled: false,
          href: '/panel/nutrients/'
        },
        {
          text: 'Besin Düzenle',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      counter: !this.isEmpty(this.data) && !this.isEmpty(this.data.values) ? this.data.values.length : 0,
      counter2: !this.isEmpty(this.data) && !this.isEmpty(this.data.criteria_values) ? this.data.criteria_values.length : 0,
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
          'panel/nutrients/create-file/' +
          this.$route.params.id,
        headers: {
          Authorization:
            'Bearer ' +
            (!this.isEmpty(this.$auth.$storage.getUniversal('user'))
              ? this.$auth.$storage.getUniversal('user').api_token
              : null)
        },
        params: {
          title:
            this.data !== null && this.data !== undefined && this.data !== ''
              ? this.data.data.name
              : null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null,
      tab: null,
      tabItems: [{ tab: 'Besin Değerleri' }, { tab: 'Ölçüt Değerleri' }]
    }
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'panel/nutrients/update/' + params.id
      )
      if (
        data.data.values.length === 0 ||
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
      if (
        data.data.criterias.length === 0 ||
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
      if (
        data.data.criteria_values.length === 0 ||
        data.data.criteria_values.length === null ||
        data.data.criteria_values.length === undefined
      ) {
        data.data.criteria_values.push({
          title: '',
          value: '',
          type: '',
          id: 0
        })
      }
      return data
    } catch (e) {
      error({ message: 'Besin Bilgisi Bulunamadı.', statusCode: 404 })
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
          `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=nutrients_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=nutrients_id&where_value=${this.data._id.$oid}&joins=nutrients_file`,
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            },
          }
        )
        .then(response => {
          this.imageData = response.data.data.data.map(this.getDisplayData)
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
          '&table=nutrients_file',
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            },
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
          'panel/datatables/is-active-setter?table=nutrients_file&id=' +
          id,
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            },
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
          'panel/datatables/is-cover-setter?table=nutrients_file&foreign_column=nutrients_id&id=' +
          id,
          {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            },
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
      this.data.values.push({
        title: '',
        value: '',
        type: '',
        id: ++this.counter
      })
    },
    removeProperty(id) {
      this.data.values.splice(id, 1)
    },
    cloneProperty2() {
      this.data.criteria_values.push({
        value: '',
        type: '',
        id: ++this.counter2
      })
    },
    removeProperty2(id) {
      this.data.criteria_values.splice(id, 1)
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
    editNutrients() {
      let formData = new FormData(this.$refs.nutrientsForm)
      formData.delete("criteriaName[]");
      let criteriaValues = this.data.criteria_values
      for (let i = 0; i < criteriaValues.length; i++) {
        formData.append("criteriaName[]", criteriaValues[i].title);
      }
      this.$axios
        .post(
          process.env.apiBaseUrl +
          'panel/nutrients/update/' +
          this.data._id.$oid,
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
            setTimeout(() => {
              this.$router.go('/panel/nutrients')
            }, 2000)
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
