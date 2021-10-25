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
                @submit.prevent='handleSubmit(editExerciseCategories)'
                ref='exerciseCategoriesForm'
                enctype='multipart/form-data'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Egzersiz Kategorisi Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 2' step='2'>
                      Egzersiz Kategorisi Görselleri
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 3' step='3'>
                      Kapak Fotoğrafı Seçimi
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        name='Egzersiz Kategorisi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <v-text-field
                          label='Egzersiz Kategorisi'
                          id='title'
                          type='text'
                          name='name'
                          v-model='data.name'
                          clearable
                        />
                        <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                          {{ errors[0] }}
                        </v-alert>
                      </ValidationProvider>
                      <v-btn
                        color='primary'
                        class='mt-2'
                        role='button'
                        @click.prevent='e1 = 2'
                      >
                        Egzersiz Kategorisi Görseli Yükle
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
                        <v-btn
                          color='info'
                          class='mt-2'
                          role='button'
                          @click.prevent='e1 = 1'
                        >
                          Geri Dön
                        </v-btn>
                        <v-btn
                          color='primary'
                          class='mt-2'
                          role='button'
                          @click.prevent='selectCover'
                        >
                          Kapak Fotoğrafı Seç
                        </v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step='3'>
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
                            <v-col cols='12' lg='4'>
                              <v-select
                                v-model='pageSize'
                                :items='pageSizes'
                                label='Sayfada Görüntüleme Sayısı'
                                @change='handlePageSizeChange'
                                outlined
                                hide-details
                              ></v-select>
                              <div>
                                <v-btn
                                  color='info'
                                  class='mt-2'
                                  role='button'
                                  @click.prevent='e1 = 2'
                                >
                                  Geri Dön
                                </v-btn>
                                <v-btn
                                  color='primary'
                                  class='mt-2'
                                  type='submit'
                                >
                                  Egzersiz Kategorisini Güncelle
                                </v-btn>
                              </div>
                            </v-col>

                            <v-col cols='12' lg='8'>
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
        {name: "Egzersiz Kategorileri",url:"/panel/exercise-categories"},
        {name: "Egzersiz Kategorisi Düzenle"}
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
          'panel/exercise-categories/create-file/' +
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
              ? this.data.name
              : null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'panel/exercise-categories/update/' + params.id
      )

      return data
    } catch (e) {
      console.log(e)
      error({ message: 'Egzersiz Kategorisi Bulunamadı.', statusCode: 404 })
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
      try{
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
            `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=exercise_categories_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=exercise_category_id&where_value=${this.data._id.$oid}&joins=exercise_categories_file`,
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
            '&table=exercise_categories_file',
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
            'panel/datatables/is-active-setter?table=exercise_categories_file&id=' +
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
      try{
        this.$axios
          .get(
            process.env.apiBaseUrl +
            'panel/datatables/is-cover-setter?table=exercise_categories_file&foreign_column=exercise_category_id&id=' +
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
    editExerciseCategories() {
      try {
        let formData = new FormData(this.$refs.exerciseCategoriesForm)
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'panel/exercise-categories/update/' +
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
                window.location.href ='/panel/exercise-categories'
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
