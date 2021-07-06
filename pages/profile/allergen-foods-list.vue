<template>
	<div>
		<div class="breadcrumb-bar">
			<v-container fluid>
				<nav aria-label="breadcrumb" class="page-breadcrumb">
					<ol class="breadcrumb pl-0">
						<li class="breadcrumb-item">
							<nuxt-link to="/">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Alerjen Olduğum Besinler / Yemekler
						</li>
					</ol>
				</nav>
				<h2 class="breadcrumb-title">Alerjen Olduğum Besinler / Yemekler</h2>
			</v-container>
		</div>
		<div class="content">
			<v-container fluid>
				<v-row>
					<v-col
						cols="12"
						sm="12"
						md="5"
						lg="4"
						xl="3"
					>

					</v-col>

					<v-col cols="12" sm="12" md="7" lg="8" xl="9">
						<div class="card card-table my-0">
							<div class="card-header">
								<div class="card-title my-auto">
									<h4 class="my-auto">Alerjen Olduğum Besinler / Yemekler</h4>
								</div>
							</div>
							<div class="card-body">
								<ValidationObserver v-slot="{ handleSubmit }">
									<form
										@submit.prevent="handleSubmit(updateAllergenFoods)"
										ref="allergenFoodsUpdateForm"
										enctype="multipart/form-data"
									>
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
														<template v-if="typeof data.item !== 'object'">
															<v-list-item-content
																v-text="data.item"
															></v-list-item-content>
														</template>
														<template v-else>
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
									</form>
								</ValidationObserver>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</div>
</template>

<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";

	export default {
		middleware: ["auth"],
		name: "profile",
		components: {
			ValidationObserver,
			ValidationProvider,
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
		},
		mounted() {
			let inputs = document.querySelectorAll(".v-file-input input");
			[...inputs].forEach(input => {
				input.remove();
			});
		},
		data() {
			return {
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
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
			logout() {
				this.$auth.logout();
				this.$auth.$storage.removeUniversal("user");
				this.$auth.strategy.refreshToken.reset();
				this.$izitoast.success({
					title: "Başarılı!",
					message: "Başarıyla Çıkış Yaptınız Yönlendiriliyorsunuz.",
					position: "topCenter"
				});
				setTimeout(() => {
					this.$router.go("/");
				}, 2000);
			},
			updateAllergenFoods() {
				let formData = new FormData(this.$refs.allergenFoodsUpdateForm);
				formData.append("api_token", this.userData.api_token);
				this.$axios
					.post(process.env.apiBaseUrl + "users/update", formData, {
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
					})
					.then(response => {
						if (response.data.success) {
							this.$izitoast.success({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
							this.$auth.setUser(response.data.data);
							this.$auth.$storage.setUniversal("user", response.data.data);
							this.$auth.strategy.token.set(
								this.$auth.$storage.getUniversal("user").api_token
							);
							setTimeout(() => {
								this.$router.go("/profile");
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
