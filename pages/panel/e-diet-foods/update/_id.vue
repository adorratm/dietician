<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">E-Diyet Besini Düzenle</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">E-Diyet Besini Düzenle</li>
					</ul>
				</div>

				<div class="card">
					<div class="card-header">
						<h4 class="card-title">E-Diyet Besini Düzenle</h4>
					</div>
					<div class="card-body">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(editEdietFoods)"
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
														v-model="data.name"
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
														v-model="data.description"
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
														v-model="data.quantity"
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
														name="selectedMeals[]"
														v-model="data.selectedMeals"
														:items="data.meals"
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
																			!isEmpt(data.meals) &&
																			data.meals.length > 0
																				? 'indigo darken-4'
																				: null
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
														v-model="data.ageGroups"
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
														v-model="data.selectedDiseases"
														:items="data.diseases"
														chips
														label="Hastalık Seçin"
														item-text="name"
														item-value="_id.$oid"
														multiple
													>
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
														<template v-slot:prepend-item>
															<v-list-item ripple @click="toggle3">
																<v-list-item-action>
																	<v-icon
																		:color="
																			!isEmpty(data.selectedDiseases) &&
																			data.selectedDiseases.length > 0
																				? 'indigo darken-4'
																				: null
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
														<template v-slot:item="data">
															<template>
																<v-list-item-content>
																	<v-list-item-title
																		v-html="data.item.name"
																	></v-list-item-title>
																	<v-list-item-subtitle
																		v-html="data.item.group"
																	></v-list-item-subtitle>
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
																!isEmpty(data.values) && data.values.length > 0
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
																data.criteria_values !== null &&
																	data.criteria_values !== undefined &&
																	data.criteria_values !== '' &&
																	data.criteria_values.length > 0
															"
														>
															<client-only>
																<v-row
																	v-bind:key="index"
																	v-for="(input, index) in data.criteria_values"
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
																					v-if="
																						data.criterias !== null &&
																							data.criterias !== undefined &&
																							data.criterias !== '' &&
																							data.criterias.length > 0
																					"
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
																				<select
																					name="criteriaName[]"
																					v-bind:id="'criteria' + index"
																					class="form-control"
																					v-if="
																						data.criterias === null &&
																							data.criterias === undefined &&
																							data.criterias === '' &&
																							data.criterias.length <= 0
																					"
																				>
																					<option v-bind:value="null" selected>
																						Ölçüt Seçiniz
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
																		lg="3"
																		xl="3"
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
																			v-if="data.criteria_values.length > 1"
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
											<button
												class="btn btn-outline-primary rounded-0 btn-lg"
												type="submit"
											>
												Besini Güncelle
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
					this.data.criteria_values !== null &&
					this.data.criteria_values !== undefined &&
					this.data.criteria_values !== ""
						? this.data.criteria_values.length
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
						"panel/e-diet-foods/create-file/" +
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
				items: [{ tab: "Besin Değerleri" }, { tab: "Ölçüt Değerleri" }]
			};
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			},
			likesAllFruit() {
				return (
					this.data.selectedMeals !== undefined &&
					this.data.selectedMeals !== null &&
					this.data.selectedMeals !== "" &&
					this.data.meals !== undefined &&
					this.data.meals !== null &&
					this.data.meals !== "" &&
					this.data.selectedMeals.length === this.data.meals.length
				);
			},
			likesSomeFruit() {
				return (
					this.data.selectedMeals !== undefined &&
					this.data.selectedMeals !== null &&
					this.data.selectedMeals !== "" &&
					this.data.selectedMeals.length > 0 &&
					!this.likesAllFruit
				);
			},
			icon() {
				if (this.likesAllFruit) return "mdi-close-box";
				if (this.likesSomeFruit) return "mdi-minus-box";
				return "mdi-checkbox-blank-outline";
			},
			likesAllFruit2() {
				return this.data.ageGroups.length === this.ageGroups.length;
			},
			likesSomeFruit2() {
				return this.data.ageGroups.length > 0 && !this.likesAllFruit2;
			},
			icon2() {
				if (this.likesAllFruit2) return "mdi-close-box";
				if (this.likesSomeFruit2) return "mdi-minus-box";
				return "mdi-checkbox-blank-outline";
			},
			likesAllFruit3() {
				return (
					this.data.selectedDiseases !== undefined &&
					this.data.selectedDiseases !== null &&
					this.data.selectedDiseases !== "" &&
					this.data.diseases !== undefined &&
					this.data.diseases !== null &&
					this.data.diseases !== "" &&
					this.data.selectedDiseases.length === this.data.diseases.length
				);
			},
			likesSomeFruit3() {
				return (
					this.data.selectedDiseases !== undefined &&
					this.data.selectedDiseases !== null &&
					this.data.selectedDiseases !== "" &&
					this.data.selectedDiseases.length > 0 &&
					!this.likesAllFruit3
				);
			},
			icon3() {
				if (this.likesAllFruit3) return "mdi-close-box";
				if (this.likesSomeFruit3) return "mdi-minus-box";
				return "mdi-checkbox-blank-outline";
			}
		},
		validate({ params }) {
			return params.id !== null ? params.id : null;
		},
		async asyncData({ params, error, $axios }) {
			try {
				const { data } = await $axios.get(
					process.env.apiBaseUrl + "panel/e-diet-foods/update/" + params.id
				);
				data.data.selectedMeals =
					data.data.selectedMeals !== undefined &&
					data.data.selectedMeals !== null &&
					data.data.selectedMeals !== ""
						? data.data.selectedMeals
						: [];
				data.data.selectedDiseases =
					data.data.selectedDiseases !== undefined &&
					data.data.selectedDiseases !== null &&
					data.data.selectedDiseases !== ""
						? data.data.selectedDiseases
						: [];
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
					data.data.criteria_values.length === 0 ||
					data.data.criteria_values.length === null ||
					data.data.criteria_values.length === undefined
				) {
					data.data.criteria_values.push({
						title: "",
						value: "",
						type: "",
						id: 0
					});
				}

				return data;
			} catch (e) {
				error({ message: "Besin Bilgisi Bulunamadı.", statusCode: 404 });
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
						this.data.selectedMeals = [];
					} else {
						this.data.selectedMeals = [];
						this.data.meals.forEach((el, index) => {
							this.data.selectedMeals.push(el._id.$oid);
						});
					}
				});
			},
			toggle2() {
				this.$nextTick(() => {
					if (this.likesAllFruit2) {
						this.data.ageGroups = [];
					} else {
						this.data.ageGroups = this.ageGroups.slice();
					}
				});
			},
			toggle3() {
				this.$nextTick(() => {
					if (this.likesAllFruit3) {
						this.data.selectedDiseases = [];
					} else {
						this.data.selectedDiseases = [];
						this.data.diseases.forEach((el, index) => {
							this.data.selectedDiseases.push(el._id.$oid);
						});
					}
				});
			},
			remove(item) {
				const index = this.data.selectedDiseases.indexOf(item._id.$oid);
				if (index >= 0) this.data.selectedDiseases.splice(index, 1);
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
				let oid =
					this.data._id !== undefined &&
					this.data._id !== null &&
					this.data._id !== "" &&
					this.data._id.$oid !== undefined &&
					this.data._id.$oid !== null &&
					this.data._id.$oid !== ""
						? this.data._id.$oid
						: null;
				this.$axios
					.get(
						`${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=edietfoods_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=edietfoods_id&where_value=${oid}&joins=edietfoods_file`,
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
				this.data.criteria_values.push({
					value: "",
					type: "",
					id: ++this.counter2
				});
			},
			removeProperty2(id) {
				this.data.criteria_values.splice(id, 1);
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
			editEdietFoods() {
				let formData = new FormData(this.$refs.eDietFoodsForm);
				let meals = this.data.selectedMeals;
				formData.delete("selectedMeals[]");
				formData.delete("selectedMeals");
				let diseases = this.data.selectedDiseases;
				formData.delete("selectedDiseases[]");
				formData.delete("selectedDiseases");
				for (let i = 0; i < diseases.length; i++) {
					formData.append("selectedDiseases[" + i + "]", diseases[i]);
				}
				for (let i = 0; i < meals.length; i++) {
					formData.append("selectedMeals[" + i + "]", meals[i]);
				}
				this.$axios
					.post(
						process.env.apiBaseUrl +
							"panel/e-diet-foods/update/" +
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
								this.$router.go("/panel/e-diet-foods");
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
