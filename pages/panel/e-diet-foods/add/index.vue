<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">E-Diyet Besinleri</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">E-Diyet Besinleri</li>
					</ul>
				</div>

				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Besin Ekle</h4>
					</div>
					<div class="card-body">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(saveEdietFoods)"
								ref="eDietFoodsForm"
								enctype="multipart/form-data"
							>
								<v-stepper v-model="e1">
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
												<div class="form-group">
													<label for="title">Besin Adı</label>
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
												name="Besin Açıklaması"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="description">Besin Açıklaması</label>
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
											<ValidationProvider
												name="Miktar"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<label for="quantity">Miktar</label>
													<input
														id="quantity"
														type="text"
														class="form-control"
														name="quantity"
														v-model="inputData.quantity"
													/>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Öğün"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<v-select
														name="meals[]"
														v-model="selectedMeals"
														:items="meals"
														label="Öğün Seçin"
														item-text="name"
														item-value="_id.$oid"
														multiple
													>
														<template v-slot:prepend-item>
															<v-list-item ripple @click="toggle">
																<v-list-item-action>
																	<v-icon
																		:color="
																			selectedMeals !== undefined &&
																			selectedMeals !== null &&
																			selectedMeals !== '' &&
																			selectedMeals.length > 0
																				? 'indigo darken-4'
																				: ''
																		"
																	>
																		{{ icon }}
																	</v-icon>
																</v-list-item-action>
																<v-list-item-content>
																	<v-list-item-title>
																		Tümünü Seç
																	</v-list-item-title>
																</v-list-item-content>
															</v-list-item>
															<v-divider class="mt-2"></v-divider>
														</template>
														<template v-slot:item="data">
															<template>
																<v-list-item-content>
																	<v-list-item-title
																		v-html="data.item.name"
																	></v-list-item-title>
																</v-list-item-content>
															</template>
														</template>
													</v-select>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Yaş Grubu"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<v-select
														name="ageGroups"
														v-model="selectedAgeGroups"
														:items="ageGroups"
														label="Yaş Grubu Seçin"
													>
													</v-select>
													<small class="font-weight-bold text-danger">{{
														errors[0]
													}}</small>
												</div>
											</ValidationProvider>
											<ValidationProvider
												name="Hastalık"
												rules="required"
												v-slot="{ errors }"
											>
												<div class="form-group">
													<v-autocomplete
														name="selectedDiseases[]"
														v-model="selectedDiseases"
														:items="diseases"
														chips
														label="Hastalık Seçin"
														item-text="name"
														item-value="_id.$oid"
														multiple
													>
														<template v-slot:prepend-item>
															<v-list-item ripple @click="toggle3">
																<v-list-item-action>
																	<v-icon
																		:color="
																			selectedDiseases !== undefined &&
																			selectedDiseases !== null &&
																			selectedDiseases !== '' &&
																			selectedDiseases.length > 0
																				? 'indigo darken-4'
																				: ''
																		"
																	>
																		{{ icon3 }}
																	</v-icon>
																</v-list-item-action>
																<v-list-item-content>
																	<v-list-item-title>
																		Tümünü Seç
																	</v-list-item-title>
																</v-list-item-content>
															</v-list-item>
															<v-divider class="mt-2"></v-divider>
														</template>
														<template v-slot:selection="data">
															<v-chip
																v-bind="data.attrs"
																:input-value="data.selected"
																close
																@click="data.select"
																@click:close="remove(data.item)"
															>
																{{ data.item.name }}
															</v-chip>
														</template>
														<template v-slot:item="data">
															<template>
																<v-list-item-content>
																	<v-list-item-title
																		v-html="data.item.name"
																	></v-list-item-title>
																</v-list-item-content>
															</template>
														</template>
													</v-autocomplete>
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
																	allCriterias !== ''
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
																		lg="4"
																		xl="4"
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
																					v-if="
																						allCriterias !== null &&
																							allCriterias !== undefined &&
																							allCriterias !== '' &&
																							allCriterias.length > 0
																					"
																					class="form-control"
																				>
																					<option v-bind:value="null" selected>
																						Ölçüt Seçiniz.
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
																				<select
																					name="criteriaName[]"
																					v-bind:id="input2[0].id"
																					v-model="input2[0].value"
																					v-else-if="
																						allCriterias === null &&
																							allCriterias === undefined &&
																							allCriterias === '' &&
																							allCriterias.length <= 0
																					"
																					class="form-control"
																				>
																					<option v-bind:value="null" selected>
																						Ölçüt Seçiniz.
																					</option>
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
																		lg="3"
																		xl="3"
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
																		lg="3"
																		xl="3"
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
												Besini Kayıt Et, Görsel Yüklemeye Geç
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
																		color="success"
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
				disease: null,
				diseases: [],
				selectedDiseases: [],
				recipe: null,
				recipes: [],
				meals: ["Sabah", "Kuşluk", "Öğle", "İkindi", "Akşam", "Gece"],
				ageGroups: ["0+", "1+", "10+", "18+"],
				selectedAgeGroups: [],
				selectedMeals: [],
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
					url: process.env.apiBaseUrl + "panel/e-diet-foods/create-file/",
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
				items: [{ tab: "Besin Değerleri" }, { tab: "Ölçüt Değerleri" }]
			};
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			},
			likesAllFruit() {
				return (
					this.selectedMeals !== undefined &&
					this.selectedMeals !== null &&
					this.selectedMeals !== "" &&
					this.meals !== null &&
					this.meals !== undefined &&
					this.meals !== "" &&
					this.selectedMeals.length === this.meals.length
				);
			},
			likesSomeFruit() {
				return (
					this.selectedMeals !== undefined &&
					this.selectedMeals !== null &&
					this.selectedMeals !== "" &&
					this.selectedMeals.length > 0 &&
					!this.likesAllFruit
				);
			},
			icon() {
				if (this.likesAllFruit) return "mdi-close-box";
				if (this.likesSomeFruit) return "mdi-minus-box";
				return "mdi-checkbox-blank-outline";
			},
			likesAllFruit2() {
				return this.selectedAgeGroups.length === this.ageGroups.length;
			},
			likesSomeFruit2() {
				return this.selectedAgeGroups.length > 0 && !this.likesAllFruit2;
			},
			icon2() {
				if (this.likesAllFruit2) return "mdi-close-box";
				if (this.likesSomeFruit2) return "mdi-minus-box";
				return "mdi-checkbox-blank-outline";
			},
			likesAllFruit3() {
				return (
					this.selectedDiseases !== undefined &&
					this.selectedDiseases !== null &&
					this.selectedDiseases !== "" &&
					this.diseases !== undefined &&
					this.diseases !== null &&
					this.diseases !== "" &&
					this.selectedDiseases.length === this.diseases.length
				);
			},
			likesSomeFruit3() {
				return (
					this.selectedDiseases !== undefined &&
					this.selectedDiseases !== null &&
					this.selectedDiseases !== "" &&
					this.selectedDiseases.length > 0 &&
					!this.likesAllFruit3
				);
			},
			icon3() {
				if (this.likesAllFruit3) return "mdi-close-box";
				if (this.likesSomeFruit3) return "mdi-minus-box";
				return "mdi-checkbox-blank-outline";
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
			toggle() {
				this.$nextTick(() => {
					if (this.likesAllFruit) {
						this.selectedMeals = [];
					} else {
						this.selectedMeals = this.meals.slice();
					}
				});
			},
			toggle2() {
				this.$nextTick(() => {
					if (this.likesAllFruit2) {
						this.selectedAgeGroups = [];
					} else {
						this.selectedAgeGroups = this.ageGroups.slice();
					}
				});
			},
			toggle3() {
				this.$nextTick(() => {
					if (this.likesAllFruit3) {
						this.selectedDiseases = [];
					} else {
						this.selectedDiseases = [];
						this.diseases.forEach((el, index) => {
							this.selectedDiseases.push(el._id.$oid);
						});
					}
				});
			},
			remove(item) {
				const index = this.selectedDiseases.indexOf(item._id.$oid);
				if (index >= 0) this.selectedDiseases.splice(index, 1);
			},
			getCriterias() {
				this.$axios
					.get(`${process.env.apiBaseUrl}panel/e-diet-foods/create`, {
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
						this.allCriterias = response.data.data.criteria;
						this.diseases = response.data.data.diseases;
						this.meals = response.data.data.meals;
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
						`${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=edietfoods_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=edietfoods_id&where_value=${this.inputData.id}&joins=edietfoods_file`,
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
							"&table=edietfoods_file",
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
							"panel/datatables/is-active-setter?table=edietfoods_file&id=" +
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
							"panel/datatables/is-cover-setter?table=edietfoods_file&foreign_column=edietfoods_id&id=" +
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
			saveEdietFoods() {
				let formData = new FormData(this.$refs.eDietFoodsForm);
				let meals = this.selectedMeals;
				formData.delete("selectedMeals[]");
				formData.delete("selectedMeals");
				let diseases = this.selectedDiseases;
				formData.delete("selectedDiseases[]");
				formData.delete("selectedDiseases");
				for (let i = 0; i < diseases.length; i++) {
					formData.append("selectedDiseases[" + i + "]", diseases[i]);
				}
				for (let i = 0; i < meals.length; i++) {
					formData.append("selectedMeals[" + i + "]", meals[i]);
				}
				this.$axios
					.post(process.env.apiBaseUrl + "panel/e-diet-foods/create", formData, {
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
								"panel/e-diet-foods/create-file/" +
								response.data.data.$oid;
							this.$refs.myDropzone.dropzone.options.url =
								process.env.apiBaseUrl +
								"panel/e-diet-foods/create-file/" +
								response.data.data.$oid;
							this.options.url =
								process.env.apiBaseUrl +
								"panel/e-diet-foods/create-file/" +
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
