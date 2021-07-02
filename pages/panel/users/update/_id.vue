<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">Kullanıcı Düzenle</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">Kullanıcı Düzenle</li>
					</ul>
				</div>

				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Kullanıcı Düzenle</h4>
					</div>
					<div class="card-body">
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(editUsers)"
								ref="usersForm"
								enctype="multipart/form-data"
							>
								<ul class="nav nav-tabs nav-tabs-bottom nav-justified">
									<li class="nav-item">
										<a
											class="nav-link active"
											href="#genel-bilgiler"
											data-toggle="tab"
											>Genel Bilgiler</a
										>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="#sosyal-medya" data-toggle="tab"
											>Sosyal Medya</a
										>
									</li>
								</ul>
								<div class="tab-content mb-3">
									<div class="tab-pane show active" id="genel-bilgiler">
										<ValidationProvider
											name="Adınız ve Soyadınız"
											rules="required"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="title">Adınız ve Soyadınız</label>
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
											name="Email Adresiniz"
											rules="required|email"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="company_name">Email Adresiniz</label>
												<input
													id="company_name"
													type="text"
													class="form-control"
													name="email"
													v-model="data.email"
												/>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<v-row>
											<v-col cols="12" sm="12" md="3" lg="3" xl="3">
												<img
													v-bind:src="img_url + data.img_url"
													v-bind:alt="data.name"
													width="300"
													height="300"
												/>
											</v-col>
											<v-col cols="12" sm="12" md="9" lg="9" xl="9">
												<div class="form-group">
													<label>Kullanıcı Görseli</label>
													<input
														type="file"
														id="img_url"
														ref="img_url"
														name="img_url"
														class="form-control"
													/>
												</div>
											</v-col>
										</v-row>
									</div>
									<div class="tab-pane" id="sosyal-medya">
										<ValidationProvider
											name="Facebook"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="facebook">Facebook</label>
												<input
													id="facebook"
													type="text"
													class="form-control"
													name="facebook"
													v-model="data.facebook"
												/>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Facebook"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="twitter">Twitter</label>
												<input
													id="twitter"
													type="text"
													class="form-control"
													name="twitter"
													v-model="data.twitter"
												/>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Instagram"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="instagram">Instagram</label>
												<input
													id="instagram"
													type="text"
													class="form-control"
													name="instagram"
													v-model="data.instagram"
												/>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Linkedin"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="linkedin">Linkedin</label>
												<input
													id="linkedin"
													type="text"
													class="form-control"
													name="linkedin"
													v-model="data.linkedin"
												/>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Youtube"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="youtube">Youtube</label>
												<input
													id="youtube"
													type="text"
													class="form-control"
													name="youtube"
													v-model="data.youtube"
												/>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
									</div>
								</div>
								<div class="form-group">
									<button class="btn btn-primary login-btn" type="submit">
										Gönder
									</button>
								</div>
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
    beforeCreate() {
      this.$store.dispatch('getSettings')
    },
		data() {
			return {
				data: {
					name: null,
					phone: null,
					email: null,
					facebook: null,
					twitter: null,
					instagram: null,
					youtube: null,
					linkedin: null,
					img_url: null
				},
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
		},
		validate({ params }) {
			return params.id !== null ? params.id : null;
		},
		async asyncData({ params, error, $axios }) {
			try {
				const { data } = await $axios.get(
					process.env.apiBaseUrl + "panel/users/update/" + params.id
				);

				return data;
			} catch (e) {
				error({ message: "Kullanıcı Bilgisi Bulunamadı.", statusCode: 404 });
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
			editUsers() {
				let formData = new FormData(this.$refs.usersForm);
				this.$axios
					.post(
						process.env.apiBaseUrl + "panel/users/update/" + this.data._id.$oid,
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
								this.$router.go("/panel/users");
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
