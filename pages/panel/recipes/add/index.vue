<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">Yemek Tarifleri</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">Yemek Tarifleri</li>
					</ul>
				</div>

				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Yemek Tarifi Ekle</h4>
					</div>
					<div class="card-body">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(saveRecipes)"
								ref="recipesForm"
								enctype="multipart/form-data"
							>
								<v-stepper v-model="e1">
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
										<v-stepper-content step="1">
											<ValidationProvider
												name="Yemek Tarifi Adı"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="title">Yemek Tarifi Adı</label>
													<input
														id="title"
														type="text"
														class="form-control"
														name="name"
														v-model="inputData.name"
													/>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yemek Tarifi Türü"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="category_id">Yemek Tarifi Türü</label>
													<select
														name="category_id"
														id="category_id"
														v-model="inputData.category_id"
														class="form-control"
													>
														<option v-bind:value="null" selected>
															Yemek Tarifi Türü Seçiniz.
														</option>
														<client-only>
															<option
																v-bind:key="index"
																v-bind:value="category._id.$oid"
																v-for="(category, index) in allCategories"
															>
																{{ category.name }}
															</option>
														</client-only>
													</select>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yemek Tarifi Porsiyon Sayısı"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="portion"
														>Yemek Tarifi Porsiyon Sayısı</label
													>
													<input
														id="portion"
														type="text"
														class="form-control"
														name="portion"
														v-model="inputData.portion"
													/>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yemek Tarifi Hazırlık Süresi"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="prepare_time"
														>Yemek Tarifi Hazırlık Süresi</label
													>
													<input
														id="prepare_time"
														type="text"
														class="form-control"
														name="prepare_time"
														v-model="inputData.prepare_time"
													/>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yemek Tarifi Pişirme Süresi"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="cooking_time"
														>Yemek Tarifi Pişirme Süresi</label
													>
													<input
														id="cooking_time"
														type="text"
														class="form-control"
														name="cooking_time"
														v-model="inputData.cooking_time"
													/>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yemek Tarifi Kalorisi"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="calorie"
														>Yemek Tarifi Kalorisi (Porsiyon - Gram)</label
													>
													<input
														id="calorie"
														type="text"
														class="form-control"
														name="calorie"
														v-model="inputData.calorie"
													/>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yemek Tarifi Açıklaması"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="description"
														>Yemek Tarifi Açıklaması</label
													>
													<textarea
														id="description"
														class="form-control"
														name="description"
														v-model="inputData.description"
													></textarea>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<v-tabs v-model="tab" background-color="primary" dark>
												<client-only>
													<v-tab v-for="item in items" :key="item.tab">
														{{ item.tab }}
													</v-tab>
												</client-only>
											</v-tabs>

											<v-tabs-items v-model="tab">
												<v-tab-item eager>
													<v-card flat>
														<v-card-text
															v-if="
																inputs !== null &&
																	inputs !== undefined &&
																	inputs !== ''
															"
														>
															<client-only>
																<v-row
																	v-bind:key="index"
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
																			<div class="form-group">
																				<label v-bind:for="input[0].id">{{
																					input[0].label
																				}}</label>
																				<input
																					v-bind:id="input[0].id"
																					type="text"
																					class="form-control"
																					name="vitaminName[]"
																					v-model="input[0].value"
																				/>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
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
																			<div class="form-group">
																				<label v-bind:for="input[1].id">{{
																					input[1].label
																				}}</label>
																				<input
																					v-bind:id="input[1].id"
																					type="text"
																					class="form-control"
																					name="vitaminValue[]"
																					v-model="input[1].value"
																				/>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
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
																			<div class="form-group">
																				<label v-bind:for="input[2].id">{{
																					input[2].label
																				}}</label>
																				<input
																					v-bind:id="input[2].id"
																					type="text"
																					class="form-control"
																					name="vitaminType[]"
																					v-model="input[2].value"
																				/>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
																			</div>
																		</ValidationProvider>
																	</v-col>
																	<v-col
																		cols="12"
																		sm="12"
																		md="12"
																		lg="2"
																		xl="2"
																		class="py-auto my-auto text-center align-bottom"
																	>
																		<button
																			@click.prevent="cloneProperty"
																			class="btn btn-lg btn-primary text-white rounded-circle align-bottom text-center"
																			role="button"
																		>
																			<i class="fa fa-plus"></i>
																		</button>
																		<button
																			v-if="inputs.length > 1"
																			@click.prevent="
																				removeProperty(input[0].id)
																			"
																			role="button"
																			class="btn btn-lg btn-danger text-white rounded-circle align-bottom text-center"
																		>
																			<i class="fa fa-times"></i>
																		</button>
																	</v-col>
																</v-row>
															</client-only>
														</v-card-text>
													</v-card>
												</v-tab-item>
												<v-tab-item eager>
													<v-card flat>
														<v-card-text
															v-if="
																inputs2 !== null &&
																	inputs2 !== undefined &&
																	inputs2 !== '' &&
																	allCriterias !== null &&
																	allCriterias !== undefined &&
																	allCriterias !== '' > 0 &&
																	allNutrients !== null &&
																	allNutrients !== undefined &&
																	allNutrients !== '' &&
																	allCategories !== null &&
																	allCategories !== undefined &&
																	allCategories !== ''
															"
														>
															<client-only>
																<v-row
																	v-bind:key="index"
																	v-for="(input2, index) in inputs2"
																>
																	<v-col
																		cols="12"
																		sm="12"
																		md="12"
																		lg="3"
																		xl="3"
																	>
																		<ValidationProvider
																			v-bind:name="input2[0].label"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label v-bind:for="input2[0].id">{{
																					input2[0].label
																				}}</label>
																				<select
																					name="criteriaName[]"
																					v-bind:id="input2[0].id"
																					v-model="input2[0].value"
																					class="form-control"
																				>
																					<option value="" selected>
																						Malzeme Ölçüt Değeri Adı Seçiniz.
																					</option>
																					<client-only>
																						<option
																							v-bind:value="criteria.name"
																							v-bind:key="index"
																							v-for="(criteria,
																							index) in allCriterias"
																						>
																							{{ criteria.name }}
																						</option>
																					</client-only>
																				</select>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
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
																			v-bind:name="input2[1].label"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label v-bind:for="input2[1].id">{{
																					input2[1].label
																				}}</label>
																				<input
																					v-bind:id="input2[1].id"
																					type="text"
																					class="form-control"
																					name="criteriaValue[]"
																					v-model="input2[1].value"
																				/>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
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
																			v-bind:name="input2[2].label"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label v-bind:for="input2[2].id">{{
																					input2[2].label
																				}}</label>
																				<input
																					v-bind:id="input2[2].id"
																					type="text"
																					class="form-control"
																					name="criteriaType[]"
																					v-model="input2[2].value"
																				/>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
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
																			v-bind:name="input2[3].label"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label v-bind:for="input2[3].id">{{
																					input2[3].label
																				}}</label>
																				<select
																					name="criteriaNutrient[]"
																					v-bind:id="input2[3].id"
																					v-model="input2[3].value"
																					class="form-control"
																				>
																					<option value="" selected>
																						Malzeme Besini Seçiniz.
																					</option>
																					<client-only>
																						<option
																							v-bind:value="nutrient._id.$oid"
																							v-bind:key="index"
																							v-for="(nutrient,
																							index) in allNutrients"
																						>
																							{{ nutrient.name }}
																						</option>
																					</client-only>
																				</select>
																				<small
																					class="font-weight-bold text-danger"
																					>{{ errors[0] }}</small
																				>
																			</div>
																		</ValidationProvider>
																	</v-col>
																	<v-col
																		cols="12"
																		sm="12"
																		md="12"
																		lg="2"
																		xl="2"
																		class="py-auto my-auto text-center align-bottom"
																	>
																		<button
																			@click.prevent="cloneProperty2"
																			class="btn btn-lg btn-primary text-white rounded-circle align-bottom text-center"
																			role="button"
																		>
																			<i class="fa fa-plus"></i>
																		</button>
																		<button
																			v-if="inputs2.length > 1"
																			@click.prevent="
																				removeProperty2(input2[0].id)
																			"
																			role="button"
																			class="btn btn-lg btn-danger text-white rounded-circle align-bottom text-center"
																		>
																			<i class="fa fa-times"></i>
																		</button>
																	</v-col>
																</v-row>
															</client-only>
														</v-card-text>
													</v-card>
												</v-tab-item>
											</v-tabs-items>

											<button
												class="btn btn-outline-primary rounded-0 btn-lg"
												type="submit"
											>
												Yemek Tarifini Kayıt Et, Görsel Yüklemeye Geç
											</button>
										</v-stepper-content>

										<v-stepper-content step="2">
											<v-row>
												<v-col cols="12" sm="12" md="12" lg="12" xl="12">
													<dropzone
														@vdropzone-complete="onComplete"
														ref="myDropzone"
														id="dropzone"
														:options="options"
														:headers="options.headers"
													></dropzone>
												</v-col>
											</v-row>
											<button
												class="btn btn-outline-primary rounded-0 btn-lg"
												role="button"
												@click.prevent="selectCover"
											>
												Kapak Fotoğrafı Seç
											</button>
										</v-stepper-content>

										<v-stepper-content step="3">
											<div class="card">
												<div class="card-header">
													<h4 class="card-title">Görseller</h4>
												</div>
												<div class="card-body">
													<v-card tile>
														<v-data-table
															:headers="headers"
															:items="data"
															disable-pagination
															:hide-default-footer="true"
														>
															<template v-slot:[`item.img_url`]="{ item }">
																<img
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
													</v-card>
													<div class="row">
														<v-col cols="12" sm="12">
															<div class="row">
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
															</div>
														</v-col>
													</div>
												</div>
											</div>
											<button
												class="btn btn-outline-primary rounded-0 btn-lg"
												role="button"
												@click.prevent="e1 = 2"
											>
												Geri Dön
											</button>
										</v-stepper-content>
									</v-stepper-items>
								</v-stepper>
							</form>
						</ValidationObserver>
					</div>
				</div>
			</v-container>
		</div>
	</div>
</template>
<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";

	export default {
		middleware: ["admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider
		},
		mounted() {
			this.retrieveData();
			this.getCriterias();
		},
		data() {
			return {
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
						{ id: "criteria0", label: "Malzeme Ölçüt Değeri Adı", value: "" },
						{ id: "criteriaValue0", label: "Malzeme Ölçüt Değeri", value: "" },
						{
							id: "criteriaType0",
							label: "Malzeme Ölçüt Değeri Türü",
							value: ""
						},
						{ id: "criteriaNutrient0", label: "Malzeme Besini", value: "" }
					]
				],
				e1: 1,
				inputData: {
					name: null,
					description: null,
					id: null,
					category_id: null
				},
				data: [],
				searchTitle: null,
				allCriterias: [],
				allNutrients: [],
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
					url: process.env.apiBaseUrl + "panel/recipes/create-file/",
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
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null,
				tab: null,
				items: [{ tab: "Besin Değerleri" }, { tab: "Yemek Tarifi Malzemeleri" }]
			};
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
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
			getCriterias() {
				this.$axios
					.get(`${process.env.apiBaseUrl}panel/recipes/create`, {
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
					})
					.then(response => {
						this.allCriterias = response.data.data.criterias;
						this.allNutrients = response.data.data.nutrients;
						this.allCategories = response.data.data.categories;
					})
					.catch(err => console.log(err));
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
						`${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=recipes_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=recipes_id&where_value=${this.inputData.id}&joins=recipes_file`,
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
						this.data = response.data.data.data.map(this.getDisplayData);

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

			cloneProperty() {
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
			},
			removeProperty(id) {
				for (let i = 0; i < this.inputs.length; i++) {
					if (this.inputs[i][0].id === id) {
						this.inputs.splice(i, 1);
					}
				}
			},
			cloneProperty2() {
				this.inputs2.push([
					{
						id: `recipe${++this.counter}`,
						label: "Malzeme Ölçüt Değeri Adı",
						value: ""
					},
					{
						id: `recipeValue${++this.counter}`,
						label: "Malzeme Ölçüt Değeri",
						value: ""
					},
					{
						id: `recipeType${++this.counter}`,
						label: "Malzeme Ölçüt Değeri Türü",
						value: ""
					},
					{
						id: `recipeNutrient${++this.counter}`,
						label: "Malzeme Besini",
						value: ""
					}
				]);
			},
			removeProperty2(id) {
				for (let i = 0; i < this.inputs2.length; i++) {
					if (this.inputs2[i][0].id === id) {
						this.inputs2.splice(i, 1);
					}
				}
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
			saveRecipes() {
				let formData = new FormData(this.$refs.recipesForm);
				this.$axios
					.post(process.env.apiBaseUrl + "panel/recipes/create", formData, {
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
						},
						credentials: "same-origin"
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
								"panel/recipes/create-file/" +
								response.data.data.$oid;
							this.$refs.myDropzone.dropzone.options.url =
								process.env.apiBaseUrl +
								"panel/recipes/create-file/" +
								response.data.data.$oid;
							this.options.url =
								process.env.apiBaseUrl +
								"panel/recipes/create-file/" +
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
			}
		}
	};
</script>
