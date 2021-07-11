<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(editExercises)"
          ref="exercisesForm"
          enctype="multipart/form-data"
        >
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                Egzersiz Bilgileri
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                Egzersiz Görselleri
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3">
                Kapak Fotoğrafı Seçimi
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <ValidationProvider
                  name="Egzersiz Adı"
                  rules="required"
                  v-slot="{ errors }"
                >
                    <v-text-field
                      label='Egzersiz Adı'
                      name="name"
                      v-model="data.name"
                      clearable
                    />
                    <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name="Egzersiz Kategorisi"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    label='Egzersiz Kategorisi'
                    name='category_id'
                    v-model='data.category_id'
                    :items='data.exercise_categories'
                    item-text='name'
                    item-value='_id.$oid'
                    clearable
                  />
                  <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name="Egzersiz Birim Değeri"
                  rules="required"
                  v-slot="{ errors }"
                >
                    <v-text-field
                      label='Egzersiz Birim Değeri'
                      name="unit"
                      v-model="data.unit"
                      clearable
                    />
                  <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <ValidationProvider
                  name="Egzersiz Açıklaması"
                  rules="required"
                  v-slot="{ errors }"
                >
                    <v-textarea
                      label='Egzersiz Açıklaması'
                      name="description"
                      v-model="data.description"
                      clearable
                    ></v-textarea>
                    <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                </ValidationProvider>

                <v-btn
                  color='primary'
                  class="mt-2"
                  role="button"
                  @click.prevent="e1 = 2"
                >
                  Görsel Yüklemeye Geç
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                    <dropzone
                      @vdropzone-complete="onComplete"
                      ref="myDropzone"
                      id="dropzone"
                      :options="options"
                      :headers="options.headers"
                    ></dropzone>
                <v-btn
                  color='info'
                  class="mt-2"
                  role="button"
                  @click.prevent="e1 = 1"
                >
                  Geri Dön
                </v-btn>
                <v-btn
                  color='primary'
                  class="mt-2"
                  role="button"
                  @click.prevent="selectCover"
                >
                  Kapak Fotoğrafı Seç
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="imageData"
                      disable-pagination
                      :hide-default-footer="true"
                    >
                      <template v-slot:[`item.img_url`]="{ item }">
                        <v-img
                          v-bind:src="item.img_url"
                          width="150"
                          height="150"
                          contain
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
                    <v-row>
                      <v-col cols="12" lg="3">
                        <v-select
                          v-model="pageSize"
                          :items="pageSizes"
                          label="Sayfada Görüntüleme Sayısı"
                          @change="handlePageSizeChange"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" lg="9">
                        <v-pagination
                          v-model="page"
                          :length="totalPages"
                          total-visible="7"
                          next-icon="mdi-menu-right"
                          prev-icon="mdi-menu-left"
                          @input="handlePageChange"
                        ></v-pagination>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color='info'
                      class='mt-2'
                      role="button"
                      @click.prevent="e1 = 2"
                    >
                      Geri Dön
                    </v-btn>
                    <v-btn
                      color='primary'
                      class="mt-2"
                      type="submit"
                    >
                      Egzersizi Güncelle
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
	import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Breadcrumb from '@/components/includes/Breadcrumb'

	export default {
		middleware: ["auth","admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider,
      Breadcrumb
		},
		mounted() {
			this.retrieveData();
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
            text: 'Egzersizler',
            disabled: false,
            href: '/panel/exercises/'
          },
          {
            text: 'Egzersiz Düzenle',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
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
						"panel/exercises/create-file/" +
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
								? this.data.name
								: null
					},
					uploadMultiple: true,
					parallelUploads: 10
				},
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
		},
		validate({ params }) {
			return params.id !== null ? params.id : null;
		},
		async asyncData({ params, error, $axios }) {
			try {
				const { data } = await $axios.get(
					process.env.apiBaseUrl + "panel/exercises/update/" + params.id
				);

				return data;
			} catch (e) {
				error({ message: "Egzersiz Bilgisi Bulunamadı.", statusCode: 404 });
			}
		},
		methods: {
			isEmpty(obj) {
				if (typeof obj == "number") return false;
				else if (typeof obj == "string") return obj.length == 0;
				else if (Array.isArray(obj)) return obj.length == 0;
				else if (typeof obj == "object")
					return obj == null || Object.keys(obj).length == 0;
				else if (typeof obj == "boolean") return false;
				else return !obj;
			},
			selectCover() {
				this.e1 = 3;
				this.retrieveData();
			},
			getRequestParams(searchTitle, page, pageSize) {
				let params = {};
				params["title"] = searchTitle;
				params["page"] = page;
				params["size"] = pageSize;
				return params;
			},
			retrieveData(url) {
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
						`${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=exercises_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=exercise_id&where_value=${this.data._id.$oid}&joins=exercises_file`,
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
								Authorization: "Bearer " + this.userData.api_token
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
			},
			handlePageChange(value) {
				this.page = value;
				this.retrieveData();
			},
			handlePageSizeChange(size) {
				this.pageSize = size;
				this.page = 1;
				this.retrieveData();
			},
			refreshList() {
				this.retrieveData();
			},
			deleteData(id) {
				this.$axios
					.delete(
						process.env.apiBaseUrl +
							"panel/datatables/delete-file?id=" +
							id +
							"&table=exercises_file",
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
								Authorization: "Bearer " + this.userData.api_token
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
					});
			},
			isActiveSetter(id) {
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"panel/datatables/is-active-setter?table=exercises_file&id=" +
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
								Authorization: "Bearer " + this.userData.api_token
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
					});
			},
			isCoverSetter(id) {
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"panel/datatables/is-cover-setter?table=exercises_file&foreign_column=exercise_id&id=" +
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
								Authorization: "Bearer " + this.userData.api_token
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
					});
			},
			getDisplayData(data) {
				return {
					rank: data.rank,
					id: data._id.$oid,
					img_url: this.img_url + data.img_url,
					isCover: data.isCover,
					isActive: data.isActive
				};
			},
			onComplete(e) {
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
			},
			editExercises() {
				let formData = new FormData(this.$refs.exercisesForm);
				this.$axios
					.post(
						process.env.apiBaseUrl +
							"panel/exercises/update/" +
							this.data._id.$oid,
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
								Authorization: "Bearer " + this.userData.api_token
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
								this.$router.go("/panel/exercises");
							}, 2000);
						} else {
							this.$izitoast.error({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
						}
					});
			}
		}
	};
</script>
