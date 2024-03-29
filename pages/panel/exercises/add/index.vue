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
                @submit.prevent='handleSubmit(saveExercises)'
                ref='exercisesForm'
                enctype='multipart/form-data'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Egzersiz Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 2' step='2'>
                      Egzersiz Görselleri
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 3' step='3'>
                      Kapak Fotoğrafı Seçimi
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        name='Egzersiz Adı'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Egzersiz Adı'
                            name='name'
                            v-model='inputData.name'
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Egzersiz Kategorisi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-autocomplete
                            label='Egzersiz Kategorisi'
                            name='category_id'
                            v-model='inputData.category_id'
                            :items='allExerciseCategories'
                            item-text='name'
                            item-value='_id.$oid'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Egzersiz Birim Değeri'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Egzersiz Birim Değeri'
                            name='unit'
                            v-model='inputData.unit'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Egzersiz Açıklaması'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-textarea
                            label='Egzersiz Açıklaması'
                            name='description'
                            v-model='inputData.description'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>

                      <v-btn
                        color='primary'
                        type='submit'
                      >
                        Egzersizi Kaydet, Görsel Yüklemeye Geç
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
                        <v-card-title>Görseller</v-card-title>
                        <v-card-text>
                          <v-data-table
                            :headers='headers'
                            :items='data'
                            disable-pagination
                            :hide-default-footer='true'
                          >
                            <template v-slot:[`item.img_url`]='{ item }'>
                              <v-btn
                                v-bind:src='item.img_url'
                                width='150'
                                height='150'
                                contain
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
        {name: "Egzersizler",url:"/panel/exercises"},
        {name: "Egzersiz Ekle"}
      ],
      counter: 0,
      e1: 1,
      inputData: {
        name: null,
        description: null,
        id: null,
        category_id: null,
        unit: null
      },
      data: [],
      searchTitle: null,
      allExerciseCategories: [],
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
        url: process.env.apiBaseUrl + 'panel/exercises/create-file/',
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
    getExerciseCategories() {
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}panel/exercises/create`)
          .then(response => {
            this.allExerciseCategories = response.data.data.exercise_categories
          })
          .catch(err => console.log(err))
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
            `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=exercises_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name&where_column=exercise_id&where_value=${this.inputData.id}&joins=exercises_file`
          )
          .then(response => {
            this.data = response.data.data.data.map(this.getDisplayData)

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
            '&table=exercises_file'
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
            'panel/datatables/is-active-setter?table=exercises_file&id=' +
            id
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
            'panel/datatables/is-cover-setter?table=exercises_file&foreign_column=exercise_id&id=' +
            id
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
    saveExercises() {
      try {
        let formData = new FormData(this.$refs.exercisesForm)
        this.$axios
          .post(process.env.apiBaseUrl + 'panel/exercises/create', formData, {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=' + formData._boundary
            },
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
                'panel/exercises/create-file/' +
                response.data.data.$oid
              this.$refs.myDropzone.dropzone.options.url =
                process.env.apiBaseUrl +
                'panel/exercises/create-file/' +
                response.data.data.$oid
              this.options.url =
                process.env.apiBaseUrl +
                'panel/exercises/create-file/' +
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
      }catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.retrieveData();
    this.getExerciseCategories();
  },
}
</script>

<style scoped>

</style>
