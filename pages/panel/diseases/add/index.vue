<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot='{ handleSubmit }'>
        <form
          ref='diseasesForm'
          enctype='multipart/form-data'
          @submit.prevent='handleSubmit(saveDiseases)'
        >
          <v-stepper v-model='e1'>
            <v-stepper-header>
              <v-stepper-step :complete='e1 > 1' step='1'>
                Hastalık Bilgileri
              </v-stepper-step>

              <v-divider></v-divider>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step='1'>
                <ValidationProvider
                  v-slot='{ errors }'
                  name='Hastalık Adı'
                  rules='required'
                >
                  <v-text-field
                    v-model='inputData.name'
                    clearable
                    label='Hastalık Adı'
                    name='name'
                  />
                  <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  v-slot='{ errors }'
                  name='Hastalık Açıklaması'
                  rules='required'
                >
                  <v-textarea
                    v-model='inputData.description'
                    clearable
                    label='Hastalık Açıklaması'
                    name='description'
                  ></v-textarea>
                  <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <v-tabs v-model='tab' background-color='primary' dark>
                  <client-only>
                    <v-tab v-for='item in tabItems' :key='item.tab'>
                      {{ item.tab }}
                    </v-tab>
                  </client-only>
                </v-tabs>

                <v-tabs-items v-model='tab'>
                  <v-tab-item eager>
                    <v-card flat>
                      <v-card-text v-if='!isEmpty(inputs)'>
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
                              <v-text-field
                                v-model='input[0].value'
                                :label='input[0].label'
                                clearable
                                name='diseaseName[]'
                              />
                              <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                          </v-col>
                          <v-col
                            cols='12'
                            lg='2'
                            md='12'
                            sm='12'
                            xl='2'
                          >
                            <ValidationProvider
                              v-slot='{ errors }'
                              rules='required'
                              v-bind:name='input[1].label'
                            >
                              <v-text-field
                                v-model='input[1].value'
                                :label='input[1].label'
                                clearable
                                name='diseaseMin[]'
                              />
                              <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                          </v-col>
                          <v-col
                            cols='12'
                            lg='2'
                            md='12'
                            sm='12'
                            xl='2'
                          >
                            <ValidationProvider
                              v-slot='{ errors }'
                              rules='required'
                              v-bind:name='input[2].label'
                            >
                              <v-text-field
                                v-model='input[2].value'
                                :label='input[2].label'
                                clearable
                                name='diseaseMax[]'
                              />
                              <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>
                          </v-col>
                          <v-col
                            cols='12'
                            lg='2'
                            md='12'
                            sm='12'
                            xl='2'
                          >
                            <ValidationProvider
                              v-slot='{ errors }'
                              rules='required'
                              v-bind:name='input[3].label'
                            >
                              <v-text-field
                                v-model='input[3].value'
                                :label='input[3].label'
                                clearable
                                name='diseaseType[]'
                              />
                              <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                {{ errors[0] }}
                              </v-alert>
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
                              small
                              @click.prevent='cloneProperty'
                            >
                              <v-icon>mdi mdi-plus</v-icon>
                            </v-btn>
                            <v-btn
                              v-if='inputs.length > 1'
                              class='ml-2'
                              color='error'
                              fab
                              role='button'
                              small
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
                </v-tabs-items>

                <v-btn
                  class='mt-2'
                  color='primary'
                  type='submit'
                >
                  Hastalığı Kayıt Et
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
          text: 'Hastalıklar',
          disabled: false,
          href: '/panel/diseases/'
        },
        {
          text: 'Hastalık Ekle',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      counter: 0,
      inputs: [
        [
          { id: 'disease0', label: 'Hastalık Değeri Adı', value: '' },
          { id: 'diseaseMin0', label: 'Hastalık Değeri', value: '' },
          { id: 'diseaseMax0', label: 'Hastalık Değeri 2', value: '' },
          { id: 'diseaseType0', label: 'Hastalık Değeri Türü', value: '' }
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
        url: process.env.apiBaseUrl + 'panel/diseases/create-file/',
        headers: {
          Authorization:
            'Bearer ' +
            (!this.isEmpty(this.$auth.$storage.getUniversal('user'))
              ? this.$auth.$storage.getUniversal('user').api_token
              : null)
        },
        params: {
          title: !this.isEmpty(this.data) ? this.data.name : null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null,
      tab: null,
      tabItems: [{ tab: 'Hastalık Değerleri' }]
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
          `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=diseases_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=nutrients_id&where_value=${this.inputData.id}&joins=diseases_file`,
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
              Authorization: 'Bearer ' + this.userData.api_token
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
        .delete(process.env.apiBaseUrl + 'panel/diseases/delete/' + id, {
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
            Authorization: 'Bearer ' + this.userData.api_token
          },
          credentials: 'same-origin'
        })
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
          'panel/datatables/is-active-setter?table=diseases_file&id=' +
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
    isCoverSetter(id) {
      this.$axios
        .get(
          process.env.apiBaseUrl +
          'panel/datatables/is-cover-setter?table=diseases_file&foreign_column=diseases_id&id=' +
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
        isCover: data.isCover,
        isActive: data.isActive
      }
    },

    cloneProperty() {
      this.inputs.push([
        {
          id: `disease${++this.counter}`,
          label: 'Hastalık Değeri Adı',
          value: ''
        },
        {
          id: `diseaseValue${++this.counter}`,
          label: 'Hastalık Değeri',
          value: ''
        },
        {
          id: `diseaseValuee${++this.counter}`,
          label: 'Hastalık Değeri 2',
          value: ''
        },
        {
          id: `diseaseType${++this.counter}`,
          label: 'Hastalık Değeri Türü',
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
    saveDiseases() {
      let formData = new FormData(this.$refs.diseasesForm)

      this.$axios
        .post(process.env.apiBaseUrl + 'panel/diseases/create', formData, {
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
            Authorization: 'Bearer ' + this.userData.api_token
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
            this.inputData.id = response.data.data.$oid
            setTimeout(() => {
              this.$router.go('/panel/diseases')
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
