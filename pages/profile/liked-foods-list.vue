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
							Sosyal Medya Ayarlarım
						</li>
					</ol>
				</nav>
				<h2 class="breadcrumb-title">Sosyal Medya Ayarlarım</h2>
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
									<h4 class="my-auto">Sosyal Medya Ayarlarım</h4>
								</div>
							</div>
							<div class="card-body">
								<ValidationObserver v-slot="{ handleSubmit }">
									<form
										@submit.prevent="handleSubmit(updateSocialMedia)"
										ref="socialMediaUpdateForm"
										enctype="multipart/form-data"
									>
										<div class="table-responsive">
											<table
												class="table table-striped table-hover table-center table-borderless mb-0"
												style="border-top: none"
											>
												<tbody>
													<tr>
														<td><b>Facebook :</b></td>
														<td colspan="2">
															<input
																type="text"
																name="facebook"
																id="facebook"
																class="form-control"
																v-model="userData.facebook"
															/>
														</td>
													</tr>
													<tr>
														<td><b>Instagram :</b></td>
														<td colspan="2">
															<input
																type="text"
																name="instagram"
																id="instagram"
																class="form-control"
																v-model="userData.instagram"
															/>
														</td>
													</tr>
													<tr>
														<td><b>Linkedin :</b></td>
														<td colspan="2">
															<input
																type="text"
																name="linkedin"
																id="linkedin"
																class="form-control"
																v-model="userData.linkedin"
															/>
														</td>
													</tr>
													<tr>
														<td><b>Twitter :</b></td>
														<td colspan="2">
															<input
																type="text"
																name="twitter"
																id="twitter"
																class="form-control"
																v-model="userData.twitter"
															/>
														</td>
													</tr>
													<tr>
														<td><b>Youtube :</b></td>
														<td colspan="2">
															<input
																type="text"
																name="youtube"
																id="youtube"
																class="form-control"
																v-model="userData.youtube"
															/>
														</td>
													</tr>
													<tr>
														<td><b>Medium :</b></td>
														<td colspan="2">
															<input
																type="text"
																name="medium"
																id="medium"
																class="form-control"
																v-model="userData.medium"
															/>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="3">
															<div class="form-group">
																<v-btn
																	color="primary"
																	class="float-right"
																	type="submit"
																>
																	Sosyal Medya Bilgilerimi Güncelle
																</v-btn>
															</div>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
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
		middleware: ["guest2"],
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
    beforeCreate() {
      this.$store.dispatch('getSettings')
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
			updateSocialMedia() {
				let formData = new FormData(this.$refs.socialMediaUpdateForm);
				formData.append("api_token", this.userData.api_token);
				this.$axios
					.post(
						process.env.apiBaseUrl +
							(this.userData.status === "dietician"
								? "dietician/profile/update"
								: "users/update"),
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
