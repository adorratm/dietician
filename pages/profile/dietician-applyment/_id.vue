<template>
	<div v-if="userData.status !== 'dietician'">
		<div class="breadcrumb-bar">
			<v-container fluid>
				<nav aria-label="breadcrumb" class="page-breadcrumb">
					<ol class="breadcrumb pl-0">
						<li class="breadcrumb-item">
							<nuxt-link to="/">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Diyetisyen Onayı
						</li>
					</ol>
				</nav>
				<h2 class="breadcrumb-title">Diyetisyen Onayı</h2>
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
						<h4 class="mb-4">Diyetisyen Onayı</h4>
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(applyDietician)"
								ref="applyDieticianForm"
								enctype="multipart/form-data"
							>
								<v-card color="#15558d" dark>
									<v-card-title class="headline">
										Klinik Diyetisyen Diyetisyen Onay İşlemleri
									</v-card-title>

									<v-card-subtitle
										>Lütfen e-mail veya sms yolu ile iletilen kodu girip
										diyetisyen onay işlemini tamamlayın.</v-card-subtitle
									>
									<ValidationProvider
										name="Tekrar Yeni Şifreniz"
										rules="required"
										v-slot="{ errors }"
									>
										<v-text-field
											label="Lütfen 6 Haneli Onay Kodunuzu Girin..."
											hide-details="auto"
											class="px-3"
											name="dietician_check"
											v-model="dietician_check"
										></v-text-field>
										<small class="font-weight-bold text-danger">{{
											errors[0]
										}}</small>
									</ValidationProvider>
									<v-card-actions>
										<v-btn type="submit" text>Diyetisyeni Onayla</v-btn>
									</v-card-actions>
								</v-card>
							</form>
						</ValidationObserver>
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
				dietician_check: null,
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
		},
		async asyncData({ app, store, route, params, error, $axios }) {
			try {
				if (store.getters.loggedInUser.status === "dietician") {
					let { data } = await $axios.get(
						process.env.apiBaseUrl + "dietician/profile/"
					);
					return data;
				} else {
					let { data } = await $axios.get(
						process.env.apiBaseUrl + "users/profile/"
					);
					return data;
				}
			} catch (e) {
        console.log(e)
				//error({ message: "Kullanıcı Bilgisi Bulunamadı.", statusCode: 404 });
			}
		},
		validate({ params }) {
			return params.id !== null ? params.id : null;
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
			applyDietician() {
				let formData = new FormData(this.$refs.applyDieticianForm);
				formData.append("api_token", this.userData.api_token);
				formData.append("slug", this.$route.params.id);
				this.$axios
					.post(process.env.apiBaseUrl + "users/dietician-update", formData, {
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
							this.$auth.$storage.setUniversal("user", response.data.data);
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
