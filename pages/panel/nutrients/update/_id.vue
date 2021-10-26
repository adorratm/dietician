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
                ref='nutrientsForm'
                enctype='multipart/form-data'
                @submit.prevent='handleSubmit(editNutrients)'
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
                    <v-stepper-content class='px-0 pt-4' step='1'>
                      <ValidationProvider
                        v-slot='{ errors }'
                        name='Besin Adı'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-text-field
                            id='title'
                            v-model='data.name'
                            clearable
                            label='Besin Adı'
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
                        name='Besin Açıklaması'
                        rules='required'
                      >
                        <div class='form-group'>
                          <v-textarea
                            id='description'
                            v-model='data.description'
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
                      <v-tabs v-model='tab' background-color='primary' dark>
                        <v-tab v-for='item in tabItems' :key='item.tab'>
                          {{ item.tab }}
                        </v-tab>
                      </v-tabs>
                      <v-tabs-items v-model='tab'>
                        <v-tab-item eager>
                          <v-card flat>
                            <v-card-text class='px-0' v-if='!isEmpty(data.values) && data.values.length > 0'>
                              <v-row v-for='(input, index) in data.values' :key='index'>
                                <v-col cols='12' lg='4' md='12' sm='12' xl='4'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Besin Değeri Adı'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.title'
                                        clearable
                                        label='Besin Değeri Adı'
                                        name='vitaminName[]'
                                        type='text'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols='12' lg='3' md='12' sm='12' xl='3'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Besin Değeri'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.value'
                                        clearable
                                        label='Besin Değeri'
                                        name='vitaminValue[]'
                                        type='text'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols='12' lg='3' md='12' sm='12' xl='3'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Besin Değeri Türü'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.type'
                                        clearable
                                        label='Besin Değeri Türü'
                                        name='vitaminType[]'
                                        type='text'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col class='text-center justify-center' cols='12' lg='2' md='12' sm='12' xl='2'>
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
                        <v-tab-item eager>
                          <v-card flat>
                            <v-card-text class='px-0' v-if='!isEmpty(data.criteria_values) && data.criteria_values.length > 0'>
                              <v-row
                                v-for='(input, index) in data.criteria_values'
                                :key='index'
                              >
                                <v-col cols='12' lg='4' md='12' sm='12' xl='4'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Ölçüt Değeri Adı'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-autocomplete
                                        v-model='input.title'
                                        :items='data.criterias'
                                        clearable
                                        item-text='name'
                                        item-value='name'
                                        label='Ölçüt Değeri Adı'
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
                                <v-col cols='12' lg='3' md='12' sm='12' xl='3'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Ölçüt Değeri'
                                    rules='required'
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        v-model='input.value'
                                        clearable
                                        label='Ölçüt Değeri'
                                        name='criteriaValue[]'
                                        type='text'
                                        hide-details
                                        outlined
                                      />
                                      <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols='12' lg='3' md='12' sm='12' xl='3'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Ölçüt Değeri Türü'
                                    rules='required'
                                  >
                                    <v-text-field
                                      v-model='input.type'
                                      clearable
                                      label='Ölçüt Değeri Türü'
                                      name='criteriaType[]'
                                      type='text'
                                      hide-details
                                      outlined
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                      {{ errors[0] }}
                                    </v-alert>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  class='text-center justify-center'
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
                                    v-if='data.criteria_values.length > 1'
                                    color='error'
                                    fab
                                    role='button'
                                    @click.prevent='removeProperty2(index)'
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
                        role='button'
                        @click.prevent='e1 = 2'
                      >
                        Görsel Yüklemeye Geç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0 pt-4' step='2'>
                      <v-card>
                        <v-card-text class='px-0'>
                          <dropzone
                            id='dropzone'
                            ref='myDropzone'
                            :headers='options.headers'
                            :options='options'
                            @vdropzone-complete='onComplete'
                          ></dropzone>
                        </v-card-text>
                        <v-card-actions class='px-0'>
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

                    <v-stepper-content class='px-0 pt-4' step='3'>
                      <v-card>
                        <v-card-title>
                          Görseller
                        </v-card-title>
                        <v-card-text>
                          <v-data-table
                            :headers='headers'
                            :hide-default-footer='true'
                            :items='imageData'
                            disable-pagination
                          >
                            <template v-slot:[`item.img_url`]='{ item }'>
                              <img
                                :alt='item.img_url'
                                :src='item.img_url'
                                class='text-center justify-center mx-auto px-auto'
                                height='150'
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
                                hide-details
                                outlined
                              ></v-select>
                              <v-btn
                                class='mt-3'
                                color='info'
                                role='button'
                                @click.prevent='e1 = 2'
                              >
                                Geri Dön
                              </v-btn>
                              <v-btn
                                class='mt-3'
                                color='primary'
                                type='submit'
                              >
                                Besini Güncelle
                              </v-btn>
                            </v-col>

                            <v-col cols='12' lg='9'>
                              <v-pagination
                                v-model='page'
                                :length='totalPages'
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
  name: 'nutrients-update',
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
        {name: "Besinler",url:"/panel/nutrients"},
        {name: "Besin Düzenle"}
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
          title: !this.isEmpty(this.data)
            ? this.data.data.name
            : null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      tab: null,
      tabItems: [{ tab: 'Besin Değerleri' }, { tab: 'Ölçüt Değerleri' }]
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
      console.log(e)
      error({ message: 'Besin Bilgisi Bulunamadı.', statusCode: 404 })
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
          .get(`${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=nutrients_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=nutrients_id&where_value=${this.data._id.$oid}&joins=nutrients_file`)
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
            '&table=nutrients_file'
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
            'panel/datatables/is-active-setter?table=nutrients_file&id=' +
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
            'panel/datatables/is-cover-setter?table=nutrients_file&foreign_column=nutrients_id&id=' +
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
    editNutrients() {
      try {
        let formData = new FormData(this.$refs.nutrientsForm)
        formData.delete('criteriaName[]')
        let criteriaValues = this.data.criteria_values
        for (let i = 0; i < criteriaValues.length; i++) {
          formData.append('criteriaName[]', criteriaValues[i].title)
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
                  'multipart/form-data; boundary=' + formData._boundary
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
                window.location.href ='/panel/nutrients'
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
