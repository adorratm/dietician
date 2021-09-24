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
                @submit.prevent='handleSubmit(saveDiseases)'
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
                            v-model='inputData.name'
                            clearable
                            label='Hastalık Adı'
                            name='name'
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
                            v-model='inputData.description'
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
                        <v-tab-item eager>
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
                                    rules='required'
                                    v-bind:name='input[1].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input[1].value'
                                        :label='input[1].label'
                                        clearable
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
                                    rules='required'
                                    v-bind:name='input[2].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input[2].value'
                                        :label='input[2].label'
                                        clearable
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
                                    rules='required'
                                    v-bind:name='input[3].label'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input[3].value'
                                        :label='input[3].label'
                                        clearable
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
                      </v-tabs-items>

                      <v-btn
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
    }
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/panel"},
        {name: "Hastalıklar",url:"/panel/diseases"},
        {name: "Hastalık Ekle"}
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
      tab: null,
      tabItems: [{ tab: 'Hastalık Değerleri' }]
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
    saveExerciseCategories() {
      let formData = new FormData(this.$refs.exerciseCategoriesForm);

      this.$axios
        .post(
          process.env.apiBaseUrl + "panel/exercise-categories/create",
          formData,
          {
            json: true,
            withCredentials: false,
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token, Authorization",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Credentials": true,
              "Content-Type":
                "multipart/form-data; boundary=" + formData._boundary,
              Authorization: "Bearer " + this.user.api_token
            },
            credentials: "same-origin"
          }
        )
        .then(response => {
          if (response.data.success) {
            this.$izitoast.success({
              title: response.data.title,
              message: response.data.msg,
              position: "topCenter"
            });
            this.$refs.myDropzone.options.url =
              process.env.apiBaseUrl +
              "panel/exercise-categories/create-file/" +
              response.data.data.$oid;
            this.$refs.myDropzone.dropzone.options.url =
              process.env.apiBaseUrl +
              "panel/exercise-categories/create-file/" +
              response.data.data.$oid;
            this.options.url =
              process.env.apiBaseUrl +
              "panel/exercise-categories/create-file/" +
              response.data.data.$oid;
            this.inputData.id = response.data.data.$oid;
            this.options.params.title = response.data.name;
            this.e1 = 2;
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
              position: "topCenter"
            });
          }
        });
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
            this.inputData.id = response.data.data.$oid
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
        })
    }
  },
  mounted() {
    this.retrieveData();
  },
}
</script>

<style scoped>

</style>
