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
                ref='diseasesForm'
                enctype='multipart/form-data'
                @submit.prevent='handleSubmit(editDiseases)'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Hastalık Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Hastalık Adı'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-text-field
                            v-model='data.name'
                            clearable
                            label='Hastalık Adı'
                            name='name'
                            type='text'
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Hastalık Açıklaması'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-textarea
                            v-model='data.description'
                            clearable
                            label='Hastalık Açıklaması'
                            name='description'
                            hide-details
                            outlined
                          ></v-textarea>
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
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.title'
                                        clearable
                                        label='Hastalık Değeri Adı'
                                        name='diseaseName[]'
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
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.min'
                                        clearable
                                        label='Minimum Hastalık Değeri'
                                        name='diseaseMin[]'
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
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.max'
                                        clearable
                                        label='Maximum Hastalık Değeri'
                                        name='diseaseMax[]'
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
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.type'
                                        clearable
                                        label='Hastalık Değeri Türü'
                                        name='diseaseType[]'
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
    currentPath() {
      return this.$route.name
    },
    img_url() {
      return process.env.apiPublicUrl
    },
    user(){
      return this.$auth.user
    }
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/panel"},
        {name: "Hastalıklar",url:"/panel/diseases"},
        {name: "Hastalık Düzenle"}
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
      tab: null,
      tabItems: [{ tab: 'Hastalık Değerleri' }]
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
      console.log(e)
      error({ message: 'Hastalık Bilgisi Bulunamadı.', statusCode: 404 })
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
              Authorization: 'Bearer ' + this.user.api_token
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
    editDiseases() {
      try {
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
                window.location.href="/panel/diseases"
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
