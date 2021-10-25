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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                @submit.prevent="handleSubmit(saveNutrients)"
                ref="nutrientsForm"
                enctype="multipart/form-data"
              >
                <v-stepper flat v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Besin Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2">
                      Besin Görselleri
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 3" step="3">
                      Kapak Fotoğrafı Seçimi
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step="1">
                      <ValidationProvider
                        name="Besin Adı"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Besin Adı'
                            id="title"
                            type="text"
                            name="name"
                            v-model="inputData.name"
                            outlined
                            hide-details
                            clearable
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>

                      </ValidationProvider>
                      <ValidationProvider
                        name="Besin Açıklaması"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-textarea
                            label='Besin Açıklaması'
                            id="description"
                            name="description"
                            v-model="inputData.description"
                            clearable
                            hide-details
                            outlined
                          ></v-textarea>
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <v-tabs v-model="tab" background-color="primary" dark>
                        <client-only>
                          <v-tab v-for="item in tabItems" :key="item.tab">
                            {{ item.tab }}
                          </v-tab>
                        </client-only>
                      </v-tabs>

                      <v-tabs-items v-model="tab">
                        <v-tab-item eager>
                          <v-card flat>
                            <v-card-text class='px-0 mb-0' v-if="!isEmpty(inputs)">
                              <v-row
                                :key="index"
                                v-for="(input, index) in inputs"
                              >
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="4"
                                  xl="4"
                                >
                                  <ValidationProvider
                                    v-bind:name="input[0].label"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input[0].label'
                                        type="text"
                                        name="vitaminName[]"
                                        v-model="input[0].value"
                                        clearable
                                        outlined
                                        hide-details
                                      />
                                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="3"
                                  xl="3"
                                >
                                  <ValidationProvider
                                    v-bind:name="input[1].label"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input[1].label'
                                        type="text"
                                        name="vitaminValue[]"
                                        v-model="input[1].value"
                                        clearable
                                        outlined
                                        hide-details
                                      />
                                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="3"
                                  xl="3"
                                >
                                  <ValidationProvider
                                    v-bind:name="input[2].label"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input[2].label'
                                        type="text"
                                        name="vitaminType[]"
                                        v-model="input[2].value"
                                        clearable
                                        outlined
                                        hide-details
                                      />
                                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="2"
                                  xl="2"
                                  class="text-center"
                                >
                                  <v-btn
                                    @click.prevent="cloneProperty"
                                    fab
                                    color='info'
                                    role="button"
                                  >
                                    <v-icon>mdi mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn
                                    v-if="inputs.length > 1"
                                    @click.prevent="
																				removeProperty(input[0].id)
																			"
                                    role="button"
                                    fab
                                    color='error'
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
                            <v-card-text class='px-0 mb-0' v-if="!isEmpty(inputs2) && !isEmpty(allCriterias)">
                              <v-row
                                v-bind:key="index"
                                v-for="(input2, index) in inputs2"
                              >
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="4"
                                  xl="4"
                                >
                                  <ValidationProvider
                                    v-bind:name="input2[0].label"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <div class='form-group'>
                                      <v-autocomplete
                                        :label='input2[0].label'
                                        name="criteriaName[]"
                                        v-model="input2[0].value"
                                        :items='allCriterias'
                                        item-text='name'
                                        item-value='name'
                                        clearable
                                        outlined
                                        hide-details
                                      >
                                      </v-autocomplete>
                                      <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="3"
                                  xl="3"
                                >
                                  <ValidationProvider
                                    v-bind:name="input2[1].label"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input2[1].label'
                                        type="text"
                                        name="criteriaValue[]"
                                        v-model="input2[1].value"
                                        clearable
                                        outlined
                                        hide-details
                                      />
                                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="3"
                                  xl="3"
                                >
                                  <ValidationProvider
                                    v-bind:name="input2[2].label"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <div class='form-group'>
                                      <v-text-field
                                        :label='input2[2].label'
                                        type="text"
                                        name="criteriaType[]"
                                        v-model="input2[2].value"
                                        clearable
                                        outlined
                                        hide-details
                                      />
                                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                        {{ errors[0] }}
                                      </v-alert>
                                    </div>
                                  </ValidationProvider>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="12"
                                  md="12"
                                  lg="2"
                                  xl="2"
                                  class="text-center"
                                >
                                  <v-btn
                                    @click.prevent="cloneProperty2"
                                    color='info'
                                    fab
                                    role="button"
                                  >
                                    <v-icon>mdi mdi-plus</v-icon>
                                  </v-btn>
                                  <v-btn
                                    v-if="inputs2.length > 1"
                                    @click.prevent="
																				removeProperty2(input2[0].id)
																			"
                                    role="button"
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
                        type="submit"
                      >
                        Besini Kaydet, Görsel Yüklemeye Geç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card>
                        <v-card-text class='px-0 mb-0'>
                          <dropzone
                            @vdropzone-complete="onComplete"
                            ref="myDropzone"
                            id="dropzone"
                            :options="options"
                            :headers="options.headers"
                          ></dropzone>
                        </v-card-text>
                        <v-card-actions class='px-0 mb-0'>
                          <v-btn
                            color='primary'
                            role="button"
                            @click.prevent="selectCover"
                          >
                            Kapak Fotoğrafı Seç
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card>
                        <v-card-title>
                          Görseller
                        </v-card-title>
                        <v-card-text class='px-0 mb-0'>
                          <v-data-table
                            :headers="headers"
                            :items="data"
                            disable-pagination
                            :hide-default-footer="true"
                          >
                            <template v-slot:[`item.img_url`]="{ item }">
                              <img
                                v-bind:src="item.img_url"
                                :alt='item.img_url'
                                width='150'
                                height='150'
                              />
                            </template>
                            <template v-slot:[`item.isCover`]="{ item }">
                              <v-layout justify-center>
                                <v-switch
                                  class="d-flex justify-content-center mx-auto px-auto text-center"
                                  v-model="item.isCover"
                                  color="success"
                                  :key="item.id"
                                  @click="isCoverSetter(item.id)"
                                ></v-switch>
                              </v-layout>
                            </template>
                            <template v-slot:[`item.isActive`]="{ item }">
                              <v-layout justify-center>
                                <v-switch
                                  class="d-flex justify-content-center mx-auto px-auto text-center"
                                  v-model="item.isActive"
                                  color="success"
                                  :key="item.id"
                                  @click="isActiveSetter(item.id)"
                                ></v-switch>
                              </v-layout>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                              <v-icon small @click="deleteData(item.id)">
                                mdi-delete
                              </v-icon>
                            </template>
                          </v-data-table>
                        </v-card-text>

                        <v-card-actions>
                          <div class="row">
                            <v-col cols="12" lg="3">
                              <v-select
                                v-model="pageSize"
                                :items="pageSizes"
                                label="Sayfada Görüntüleme Sayısı"
                                @change="handlePageSizeChange"
                                hide-details
                                outlined
                              ></v-select>
                              <v-btn
                                class='mt-3'
                                color='info'
                                role="button"
                                @click.prevent="e1 = 2"
                              >
                                Geri Dön
                              </v-btn>
                            </v-col>

                            <v-col cols="12" lg="9">
                              <v-pagination
                                v-model="page"
                                :length="totalPages"
                                total-visible="7"
                                next-icon="mdi-menu-right"
                                prev-icon="mdi-menu-left"
                                @input="handlePageChange"
                                circle
                              ></v-pagination>
                            </v-col>
                          </div>

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
  name: 'nutrients-add',
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
        {name: "Besinler",url:"/panel/nutrients"},
        {name: "Besin Ekle"}
      ],
      counter: 0,
      inputs: [
        [
          { id: "vitamin0", label: "Besin Değeri Adı", value: "" },
          {
            id: "vitaminValue0",
            label: "Besin Değeri",
            value: ""
          },
          {
            id: "vitaminType0",
            label: "Besin Değeri Türü",
            value: ""
          }
        ]
      ],
      inputs2: [
        [
          { id: "criteria0", label: "Ölçüt Değeri Adı", value: null },
          {
            id: "criteriaValue0",
            label: "Ölçüt Değeri",
            value: ""
          },
          {
            id: "criteriaType0",
            label: "Ölçüt Değeri Türü",
            value: ""
          }
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
      headers: [
        { text: "#", align: "center", value: "rank" },
        { text: "Görsel", align: "center", value: "img_url", sortable: false },
        { text: "Kapak Fotoğrafı", align: "center", value: "isCover" },
        { text: "Durum", align: "center", value: "isActive" },
        {
          text: "İşlemler",
          align: "center",
          value: "actions",
          sortable: false
        }
      ],
      page: 1,
      totalPages: 0,
      pageSize: 25,
      pageSizes: [25, 50, 100, 200, 500, 1000],
      loading: false,
      options: {
        url: process.env.apiBaseUrl + "panel/nutrients/create-file/",
        headers: {
          Authorization:
            "Bearer " +
            (!this.isEmpty(this.$auth.$storage.getUniversal("user"))
              ? this.$auth.$storage.getUniversal("user").api_token
              : null)
        },
        params: {
          title: null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      tab: null,
      tabItems: [{ tab: "Besin Değerleri" }, { tab: "Ölçüt Değerleri" }]
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
    getCriterias() {
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}panel/nutrients/create`)
          .then(response => {
            this.allCriterias = response.data.data;
          })
          .catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    },
    selectCover() {
      try {
        this.e1 = 3;
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    getRequestParams(searchTitle, page, pageSize) {
      try {
        let params = {};
        params["title"] = searchTitle;
        params["page"] = page;
        params["size"] = pageSize;
        return params;
      }catch (e) {
        console.log(e)
      }
    },
    retrieveData(url) {
      try {
        let urlParam = "get-all";
        if (url !== undefined && url !== "" && url !== null) {
          urlParam = url;
        }
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        this.$axios
          .get(
            `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=nutrients_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=nutrients_id&where_value=${this.inputData.id}&joins=nutrients_file`
          )
          .then(response => {
            this.data = response.data.data.data.map(this.getDisplayData);

            this.totalPages = response.data.data.last_page;
          })
          .catch(err => console.log(err))
          .finally(() => (this.loading = false));
      }catch (e) {
        console.log(e)
      }
    },
    handlePageChange(value) {
      try {
        this.page = value;
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    handlePageSizeChange(size) {
      try {
        this.pageSize = size;
        this.page = 1;
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    refreshList() {
      try {
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    deleteData(id) {
      try {
        this.$axios
          .delete(
            process.env.apiBaseUrl +
            "panel/datatables/delete-file?id=" +
            id +
            "&table=nutrients_file"
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
              this.refreshList();
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
            }
          }).catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    },
    isActiveSetter(id) {
      try {
        this.$axios
          .get(
            process.env.apiBaseUrl +
            "panel/datatables/is-active-setter?table=nutrients_file&id=" +
            id
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
              this.refreshList();
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
            }
          }).catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    },
    isCoverSetter(id) {
      try {
        this.$axios
          .get(
            process.env.apiBaseUrl +
            "panel/datatables/is-cover-setter?table=nutrients_file&foreign_column=nutrients_id&id=" +
            id
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
              this.refreshList();
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
            }
          }).catch(err => console.log(err));
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
        };
      }catch (e) {
        console.log(e)
      }
    },

    cloneProperty() {
      try {
        this.inputs.push([
          {
            id: `vitamin${++this.counter}`,
            label: "Besin Değeri Adı",
            value: ""
          },
          {
            id: `vitaminValue${++this.counter}`,
            label: "Besin Değeri",
            value: ""
          },
          {
            id: `vitaminType${++this.counter}`,
            label: "Besin Değeri Türü",
            value: ""
          }
        ]);
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty(id) {
      try {
        for (let i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i][0].id === id) {
            this.inputs.splice(i, 1);
          }
        }
      }catch (e) {
        console.log(e)
      }
    },
    cloneProperty2() {
      try {
        this.inputs2.push([
          {
            id: `criteria${++this.counter}`,
            label: "Ölçüt Değeri Adı",
            value: ""
          },
          {
            id: `criteriaValue${++this.counter}`,
            label: "Ölçüt Değeri",
            value: ""
          },
          {
            id: `criteriaType${++this.counter}`,
            label: "Ölçüt Değeri Türü",
            value: ""
          }
        ]);
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty2(id) {
      try {
        for (let i = 0; i < this.inputs2.length; i++) {
          if (this.inputs2[i][0].id === id) {
            this.inputs2.splice(i, 1);
          }
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
            position: "topCenter",
            displayMode: "once"
          });
        } else {
          this.$izitoast.error({
            title: JSON.parse(e.xhr.response).title,
            message: JSON.parse(e.xhr.response).msg,
            position: "topCenter",
            displayMode: "once"
          });
        }
      }catch (e) {
        console.log(e)
      }
    },
    saveNutrients() {
      try {
        let formData = new FormData(this.$refs.nutrientsForm);
        formData.delete("criteriaName[]");
        let criteriaValues = this.inputs2
        for (let i = 0; i < criteriaValues.length; i++) {
          formData.append("criteriaName[]", criteriaValues[i].value);
        }
        this.$axios
          .post(process.env.apiBaseUrl + "panel/nutrients/create", formData, {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=" + formData._boundary
            },
          })
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter"
              });
              this.$refs.myDropzone.options.url =
                process.env.apiBaseUrl +
                "panel/nutrients/create-file/" +
                response.data.data.$oid;
              this.$refs.myDropzone.dropzone.options.url =
                process.env.apiBaseUrl +
                "panel/nutrients/create-file/" +
                response.data.data.$oid;
              this.options.url =
                process.env.apiBaseUrl +
                "panel/nutrients/create-file/" +
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
          }).catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.retrieveData();
    this.getCriterias();
  },
}
</script>

<style scoped>

</style>
