<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">Yemek Tarifi Düzenle</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">Yemek Tarifi Düzenle</li>
					</ul>
				</div>

				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Yemek Tarifi Düzenle</h4>
					</div>
					<div class="card-body">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(editRecipes)"
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
														v-model="data.name"
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
														v-model="data.category_id"
														class="form-control"
													>
														<option v-bind:value="null" selected>
															Yemek Tarifi Türü Seçiniz.
														</option>
														<client-only>
															<option
																v-bind:value="category._id.$oid"
																v-bind:key="index"
																v-for="(category, index) in data.categories"
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
														v-model="data.portion"
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
														v-model="data.prepare_time"
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
														v-model="data.cooking_time"
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
														v-model="data.calorie"
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
														v-model="data.description"
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
																data.values !== null &&
																	data.values !== undefined &&
																	data.values !== '' &&
																	data.values.length > 0
															"
														>
															<client-only>
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
																				<label v-bind:for="'vitamin' + index"
																					>Besin Değeri Adı</label
																				>
																				<input
																					v-bind:id="'vitamin' + index"
																					type="text"
																					class="form-control"
																					name="vitaminName[]"
																					v-model="input.title"
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
																			name="Besin Değeri"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label
																					v-bind:for="'vitaminValue' + index"
																					>Besin Değeri</label
																				>
																				<input
																					v-bind:id="'vitaminValue' + index"
																					type="text"
																					class="form-control"
																					name="vitaminValue[]"
																					v-model="input.value"
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
																			name="Besin Değeri Türü"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label
																					v-bind:for="'vitaminType' + index"
																					>Besin Değeri Türü</label
																				>
																				<input
																					v-bind:id="'vitaminType' + index"
																					type="text"
																					class="form-control"
																					name="vitaminType[]"
																					v-model="input.type"
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
																			v-if="data.values.length > 1"
																			@click.prevent="removeProperty(index)"
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
																data.criterias !== null &&
																	data.criterias !== undefined &&
																	data.criterias !== '' &&
																	data.criterias.length > 0
															"
														>
															<client-only>
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
																			name="Ölçüt Değeri Adı"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label v-bind:for="'criteria' + index"
																					>Ölçüt Değeri Adı</label
																				>
																				<select
																					name="criteriaName[]"
																					v-bind:id="'criteria' + index"
																					class="form-control"
																				>
																					<option value="" selected>
																						Ölçüt Seçiniz
																					</option>
																					<client-only>
																						<option
																							v-bind:value="criteria.name"
																							:selected="
																								criteria.name === input.title
																							"
																							v-bind:key="index"
																							v-for="(criteria,
																							index) in data.criterias"
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
																			name="Ölçüt Değeri"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label
																					v-bind:for="'criteriaValue' + index"
																					>Ölçüt Değeri</label
																				>
																				<input
																					v-bind:id="'criteriaValue' + index"
																					type="text"
																					class="form-control"
																					name="criteriaValue[]"
																					v-model="input.value"
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
																			name="Ölçüt Değeri Türü"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label
																					v-bind:for="'criteriaType' + index"
																					>Ölçüt Değeri Türü</label
																				>
																				<input
																					v-bind:id="'criteriaType' + index"
																					type="text"
																					class="form-control"
																					name="criteriaType[]"
																					v-model="input.type"
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
																			name="Malzeme Besini"
																			rules="required"
																			v-slot="{ errors }"
																		>
																			<div class="form-group">
																				<label
																					v-bind:for="
																						'criteriaNutrient' + index
																					"
																					>Malzeme Besini</label
																				>
																				<select
																					name="criteriaNutrient[]"
																					v-bind:id="'criteriaNutrient' + index"
																					v-model="input.recipe_criteria_id"
																					class="form-control"
																				>
																					<option value="" selected>
																						Malzeme Besini Seçiniz.
																					</option>
																					<client-only>
																						<option
																							v-bind:value="nutrient._id.$oid"
																							:selected="
																								nutrient._id.$oid ===
																									input.recipe_criteria_id
																							"
																							v-bind:key="index"
																							v-for="(nutrient,
																							index) in data.nutrients"
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
																		xl="12"
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
																			v-if="
																				data.recipes_criteria_values.length > 1
																			"
																			@click.prevent="removeProperty2(index)"
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
												role="button"
												@click.prevent="e1 = 2"
											>
												Görsel Yüklemeye Geç
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
												@click.prevent="e1 = 1"
											>
												Geri Dön
											</button>
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
															:items="imageData"
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
											<button
												class="btn btn-outline-primary rounded-0 btn-lg"
												type="submit"
											>
												Yemek Tarifini Güncelle
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
		middleware: ["auth","admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider
		},
		mounted() {
			this.retrieveData();
		},
		data() {
			return {
				counter:
					this.data !== null &&
					this.data !== undefined &&
					this.data !== "" &&
					this.data.values !== null &&
					this.data.values !== undefined &&
					this.data.values !== ""
						? this.data.values.length
						: 0,
				counter2:
					this.data !== null &&
					this.data !== undefined &&
					this.data !== "" &&
					this.data.recipes_criteria_values !== null &&
					this.data.recipes_criteria_values !== undefined &&
					this.data.recipes_criteria_values !== ""
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
				error({ message: "Yemek Tarifi Bilgisi Bulunamadı.", statusCode: 404 });
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
				this.data.values.push({
					title: "",
					value: "",
					type: "",
					id: ++this.counter
				});
			},
			removeProperty(id) {
				this.data.values.splice(id, 1);
			},
			cloneProperty2() {
				this.data.recipes_criteria_values.push({
					value: "",
					type: "",
					id: ++this.counter2
				});
			},
			removeProperty2(id) {
				this.data.recipes_criteria_values.splice(id, 1);
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
			editRecipes() {
				let formData = new FormData(this.$refs.recipesForm);
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
								this.$router.go("/panel/recipes");
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
