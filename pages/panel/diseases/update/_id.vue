<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot='{ handleSubmit }'>
        <form
          ref='diseasesForm'
          enctype='multipart/form-data'
          @submit.prevent='handleSubmit(editDiseases)'
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
                    v-model='data.name'
                    clearable
                    label='Hastalık Adı'
                    name='name'
                    type='text'
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
                    v-model='data.description'
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
                      <v-card-text
                        v-if='!isEmpty(data.values) && data.values.length > 0'>
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
                              name='Hastalık Değeri Adı'
                              rules='required'
                            >
                              <v-text-field
                                v-model='input.title'
                                clearable
                                label='Hastalık Değeri Adı'
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
                              name='Minimum Hastalık Değeri'
                              rules='required'
                            >
                              <v-text-field
                                v-model='input.min'
                                clearable
                                label='Minimum Hastalık Değeri'
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
                              name='Maximum Hastalık Değeri'
                              rules='required'
                            >
                              <v-text-field
                                v-model='input.max'
                                clearable
                                label='Maximum Hastalık Değeri'
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
                              name='Hastalık Değeri Türü'
                              rules='required'
                            >
                              <v-text-field
                                v-model='input.type'
                                clearable
                                label='Hastalık Değeri Türü'
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
                              v-if='data.values.length > 1'
                              class='ml-2'
                              color='error'
                              fab
                              role='button'
                              small
                              @click.prevent='removeProperty(index)'
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
                  Hastalığı Güncelle
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
          text: 'Hastalık Düzenle',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      counter:
        !this.isEmpty(this.data) && !this.isEmpty(this.data.values)
          ? this.data.values.length
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
          'panel/diseases/create-file/' +
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
      tabItems: [{ tab: 'Hastalık Değerleri' }]
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
        process.env.apiBaseUrl + 'panel/diseases/update/' + params.id
      )
      if (
        data.data.values.length === 0 ||
        data.data.values.length === null ||
        data.data.values.length === undefined
      ) {
        data.data.values.push({
          title: '',
          min: '',
          max: '',
          type: '',
          id: 0
        })
      }

      return data
    } catch (e) {
      error({ message: 'Hastalık Bilgisi Bulunamadı.', statusCode: 404 })
    }
  },
  methods: {
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length == 0
      else if (Array.isArray(obj)) return obj.length == 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length == 0
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
          `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=diseases_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=diseases_id&where_value=${this.data._id.$oid}&joins=diseases_file`,
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
    editDiseases() {
      let formData = new FormData(this.$refs.diseasesForm)
      this.$axios
        .post(
          process.env.apiBaseUrl +
          'panel/diseases/update/' +
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
