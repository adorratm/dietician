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
                @submit.prevent="handleSubmit(editRecipes)"
                ref="recipesForm"
                enctype="multipart/form-data"
              >
                <v-stepper flat v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Yemek Tarifi Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2">
                      Yemek Tarifi Görselleri
                    </v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 3" step="3">
                      Kapak Fotoğrafı Seçimi
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step="1">
                      <ValidationProvider
                        name="Yemek Tarifi Adı"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <v-text-field
                            label='Yemek Tarifi Adı'
                            name='name'
                            v-model='data.name'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Yemek Tarifi Kategorisi"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <v-select
                            label='Yemek Tarifi Kategorisi'
                            name='category_id'
                            :items='data.categories'
                            item-text='name'
                            item-value='_id.$oid'
                            v-model='data.category_id'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Yemek Tarifi Porsiyon Sayısı"
                        rules="required"
                        v-slot="{ errors }"
                      >
                          <div class="form-group">
                            <v-text-field
                              label='Yemek Tarifi Porsiyon Sayısı'
                              name='portion'
                              v-model='data.portion'
                              clearable
                              hide-details
                              outlined
                            />
                            <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Yemek Tarifi Hazırlık Süresi"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <v-text-field
                            label='Yemek Tarifi Hazırlık Süresi'
                            name='prepare_time'
                            v-model='data.prepare_time'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Yemek Tarifi Pişirme Süresi"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <v-text-field
                            label='Yemek Tarifi Pişirme Süresi'
                            name='cooking_time'
                            v-model='data.cooking_time'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Yemek Tarifi Kalorisi (Porsiyon - Gram)"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <v-text-field
                            label='Yemek Tarifi Kalorisi (Porsiyon - Gram)'
                            name='calorie'
                            v-model='data.calorie'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Yemek Tarifi Açıklaması"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <editor
                            name="description"
                            id="description"
                            v-model="data.description"
                            api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                            :init="{
                          placeholder:'Yemek Tarifi Açıklaması',
													height: 300,
													plugins: [
														'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
													],
													toolbar:
														'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
													entity_encoding: 'raw',
													forced_root_block: '',
													paste_auto_cleanup_on_paste: true,
													language: 'tr_TR', // select language
													language_url:
														'https://cdn.jsdelivr.net/npm/tinymce-lang/langs/tr_TR.js',
													branding: false,
													image_advtab: true,
													mobile: {
														theme: 'silver'
													},
													setup: function(editor) {
                            editor.on('Init', function() {
                              editor.save();
                            });
														editor.on('change', function() {
															editor.save();
														});
													},
													convert_urls: false
												}"
                          />
                          <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <v-tabs v-model="tab" background-color="primary" dark>
                        <v-tab v-for="item in items" :key="item.tab">
                            {{ item.tab }}
                        </v-tab>
                      </v-tabs>
                      <v-tabs-items v-model="tab">
                        <v-tab-item class='px-0' eager>
                          <v-card flat>
                            <v-card-text class='px-0'
                              v-if="
                              !isEmpty(data.values) &&
																	data.values.length > 0
															"
                            >
                                <v-row
                                  v-bind:key="index"
                                  v-for="(input, index) in data.values"
                                >
                                  <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="4"
                                    xl="4"
                                  >
                                    <ValidationProvider
                                      name="Besin Değeri Adı"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                        <div class="form-group">
                                          <v-text-field
                                            label='Besin Değeri Adı'
                                            name='vitaminName[]'
                                            v-model='input.title'
                                            clearable
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="3"
                                    xl="3"
                                  >
                                    <ValidationProvider
                                      name="Besin Değeri"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <div class="form-group">
                                        <v-text-field
                                          label='Besin Değeri'
                                          name='vitaminValue[]'
                                          v-model='input.value'
                                          clearable
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="3"
                                    xl="3"
                                  >
                                    <ValidationProvider
                                      name="Besin Değeri Türü"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <div class="form-group">
                                        <v-text-field
                                          label='Besin Değeri Türü'
                                          name='vitaminType[]'
                                          v-model='input.type'
                                          clearable
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="2"
                                    xl="2"
                                    class="text-center align-center"
                                  >
                                    <v-btn
                                      color='primary'
                                      @click.prevent="cloneProperty"
                                      role="button"
                                      fab
                                    >
                                      <i class="fa fa-plus"></i>
                                    </v-btn>
                                    <v-btn
                                      v-if="data.values.length > 1"
                                      @click.prevent="removeProperty(index)"
                                      role="button"
                                      color='error'
                                      fab
                                    >
                                      <i class="fa fa-times"></i>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                            </v-card-text>
                          </v-card>
                        </v-tab-item>
                        <v-tab-item class='px-0' eager>
                          <v-card flat>
                            <v-card-text class='px-0'
                              v-if="!isEmpty(data.criterias) &&
																	data.criterias.length > 0
															"
                            >
                                <v-row
                                  v-bind:key="index"
                                  v-for="(input,
																	index) in data.recipes_criteria_values"
                                >
                                  <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="4"
                                    xl="4"
                                  >
                                    <ValidationProvider
                                      name="Malzeme Ölçüt Değeri Adı"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <div class="form-group">
                                        <v-autocomplete
                                          v-model='input.title'
                                          :items='data.criterias'
                                          clearable
                                          item-text='name'
                                          item-value='name'
                                          label='Malzeme Ölçüt Değeri Adı'
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
                                  <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="2"
                                    xl="2"
                                  >
                                    <ValidationProvider
                                      name="Malzeme Ölçüt Değeri"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <div class='form-group'>
                                        <v-text-field
                                          label='Malzeme Ölçüt Değeri'
                                          name='criteriaValue[]'
                                          v-model='input.value'
                                          clearable
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="2"
                                    xl="2"
                                  >
                                    <ValidationProvider
                                      name="Malzeme Ölçüt Değeri Türü"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <div class='form-group'>
                                        <v-text-field
                                          label='Malzeme Ölçüt Değeri Türü'
                                          name='criteriaType[]'
                                          v-model='input.type'
                                          clearable
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="2"
                                    xl="2"
                                  >
                                    <ValidationProvider
                                      name="Malzeme Besini"
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <div class='form-group'>
                                        <v-autocomplete
                                          label='Malzeme Besini'
                                          :items='data.nutrients'
                                          item-text='name'
                                          item-value='_id.$oid'
                                          name='criteriaNutrient[]'
                                          v-model='input.recipe_criteria_id'
                                          clearable
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="2"
                                    xl="2"
                                    class="text-center align-center"
                                  >
                                    <v-btn
                                      color='primary'
                                      @click.prevent="cloneProperty2"
                                      fab
                                      role="button"
                                    >
                                      <i class="fa fa-plus"></i>
                                    </v-btn>
                                    <v-btn
                                      v-if="
																				data.recipes_criteria_values.length > 1
																			"
                                      color='error'
                                      fab
                                      @click.prevent="removeProperty2(index)"
                                      role="button"
                                      >
                                      <i class="fa fa-times"></i>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                            </v-card-text>
                          </v-card>
                        </v-tab-item>
                      </v-tabs-items>
                      <v-btn
                        color='primary'
                        role="button"
                        @click.prevent="e1 = 2"
                      >
                        Görsel Yüklemeye Geç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step="2">
                      <div class='form-group'>
                        <dropzone
                          @vdropzone-complete="onComplete"
                          ref="myDropzone"
                          id="dropzone"
                          :options="options"
                          :headers="options.headers"
                        ></dropzone>
                      </div>
                      <v-btn
                        color='info'
                        role="button"
                        @click.prevent="e1 = 1"
                      >
                        Geri Dön
                      </v-btn>
                      <v-btn
                        color='primary'
                        role="button"
                        @click.prevent="selectCover"
                      >
                        Kapak Fotoğrafı Seç
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content class='px-0' step="3">
                      <v-card>
                        <v-card-title>Görseller</v-card-title>
                        <v-card-text class='px-0'>
                          <v-data-table
                            :headers="headers"
                            :items="imageData"
                            disable-pagination
                            :hide-default-footer="true"
                          >
                            <template v-slot:[`item.img_url`]="{ item }">
                              <img
                                :alt='item.img_url'
                                v-bind:src="item.img_url"
                                width="150"
                                height="150"
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
                          <v-row>
                            <v-col cols="12" lg="4">
                              <v-select
                                v-model="pageSize"
                                :items="pageSizes"
                                label="Sayfada Görüntüleme Sayısı"
                                @change="handlePageSizeChange"
                                hide-details
                                outlined
                              ></v-select>
                              <v-btn
                                class='mt-2'
                                color='info'
                                role="button"
                                @click.prevent="e1 = 2"
                              >
                                Geri Dön
                              </v-btn>
                              <v-btn
                                class='mt-2'
                                color='primary'
                                type="submit"
                              >
                                Yemek Tarifini Güncelle
                              </v-btn>
                            </v-col>

                            <v-col cols="12" lg="8">
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
        {name: "Yemek Tarifleri",url:"/panel/recipes"},
        {name: "Yemek Tarifi Düzenle"}
      ],
      counter: !this.isEmpty(this.data) && !this.isEmpty(this.data.values)
          ? this.data.values.length
          : 0,
      counter2: !this.isEmpty(this.data) && !this.isEmpty(this.data.recipes_criteria_values)
          ? this.data.recipes_criteria_values.length
          : 0,
      e1: 1,
      imageData: [],
      data: {
        images: []
      },
      searchTitle: null,
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
        url:
          process.env.apiBaseUrl +
          "panel/recipes/create-file/" +
          this.$route.params.id,
        headers: {
          Authorization:
            "Bearer " +
            (!this.isEmpty(this.$auth.$storage.getUniversal("user"))
              ? this.$auth.$storage.getUniversal("user").api_token
              : null)
        },
        params: {
          title:
            this.data !== null && this.data !== undefined && this.data !== ""
              ? this.data.data.name
              : null
        },
        uploadMultiple: true,
        parallelUploads: 10
      },
      tab: null,
      items: [{ tab: "Besin Değerleri" }, { tab: "Yemek Tarifi Malzemeleri" }]
      }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null;
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + "panel/recipes/update/" + params.id
      );
      if (
        data.data.values.length === 0 ||
        data.data.values.length === null ||
        data.data.values.length === undefined
      ) {
        data.data.values.push({
          title: "",
          value: "",
          type: "",
          id: 0
        });
      }
      if (
        data.data.criterias.length === 0 ||
        data.data.criterias.length === null ||
        data.data.criterias.length === undefined
      ) {
        data.data.criterias.push({
          title: "",
          value: "",
          type: "",
          id: 0
        });
      }
      if (
        data.data.recipes_criteria_values.length === 0 ||
        data.data.recipes_criteria_values.length === null ||
        data.data.recipes_criteria_values.length === undefined
      ) {
        data.data.recipes_criteria_values.push({
          title: "",
          value: "",
          type: "",
          id: 0
        });
      }

      return data;
    } catch (e) {
      console.log(e)
      error({ message: "Yemek Tarifi Bilgisi Bulunamadı.", statusCode: 404 });
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
      try{
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
      try{
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
            `${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=recipes_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=recipes_id&where_value=${this.data._id.$oid}&joins=recipes_file`,
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
                "Content-type": "application/json",
                Authorization: "Bearer " + this.user.api_token
              },
              credentials: "same-origin"
            }
          )
          .then(response => {
            this.imageData = response.data.data.data.map(this.getDisplayData);
            this.totalPages = response.data.data.last_page;
          })
          .catch(err => console.log(err))
          .finally(() => (this.loading = false));
      }catch (e) {
        console.log(e)
      }
    },
    handlePageChange(value) {
      try{
        this.page = value;
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    handlePageSizeChange(size) {
      try{
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
      try{
        this.$axios
          .delete(
            process.env.apiBaseUrl +
            "panel/datatables/delete-file?id=" +
            id +
            "&table=recipes_file",
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
                "Content-type": "application/json",
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
      try{
        this.$axios
          .get(
            process.env.apiBaseUrl +
            "panel/datatables/is-active-setter?table=recipes_file&id=" +
            id,
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
                "Content-type": "application/json",
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
      try{
        this.$axios
          .get(
            process.env.apiBaseUrl +
            "panel/datatables/is-cover-setter?table=recipes_file&foreign_column=recipes_id&id=" +
            id,
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
                "Content-type": "application/json",
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
      try{
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
      try{
        this.data.values.push({
          title: "",
          value: "",
          type: "",
          id: ++this.counter
        });
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty(id) {
      try{
        this.data.values.splice(id, 1);
      }catch (e) {
        console.log(e)
      }
    },
    cloneProperty2() {
      try{
        this.data.recipes_criteria_values.push({
          value: "",
          type: "",
          id: ++this.counter2
        });
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty2(id) {
      try{
        this.data.recipes_criteria_values.splice(id, 1);
      }catch (e) {
        console.log(e)
      }
    },
    onComplete(e) {
      try{
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
    editRecipes() {
      try{
        console.log(this.data.recipes_criteria_values)
        let formData = new FormData(this.$refs.recipesForm);
        formData.delete('criteriaName[]')
        let criteriaValues = this.data.recipes_criteria_values
        for (let i = 0; i < criteriaValues.length; i++) {
          formData.append('criteriaName[]', criteriaValues[i].title)
        }
        formData.delete('criteriaNutrient[]')
        let criteriaNutrient = this.data.recipes_criteria_values

        for (let i = 0; i < criteriaNutrient.length; i++) {
          formData.append('criteriaNutrient[]', criteriaNutrient[i].recipe_criteria_id)
        }
        this.$axios
          .post(
            process.env.apiBaseUrl + "panel/recipes/update/" + this.data._id.$oid,
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
              }
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter"
              });
              setTimeout(() => {
                this.$router.go("/panel/recipes");
              }, 2000);
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter"
              });
            }
          }).catch(err => console.log(err));
      }catch (err) {
        console.log(err)
      }

    }
  }
}
</script>

<style scoped>

</style>
