<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">Slaytlar</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">Slaytlar</li>
					</ul>
				</div>

				<v-card tile>
					<v-card-text>
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(saveSlides)"
								ref="slidesForm"
								enctype="multipart/form-data"
							>
								<ValidationProvider
									name="Slayt Adı"
									rules="required"
									v-slot="{ errors }"
								>
									<div class="form-group">
										<v-text-field
											label="Slayt Adı"
											hide-details="auto"
											id="title"
											type="text"
											name="title"
											v-model="title"
										></v-text-field>
										<small class="font-weight-bold text-danger">{{
											errors[0]
										}}</small>
									</div>
								</ValidationProvider>
								<ValidationProvider
									name="Slayt Açıklaması"
									rules="required"
									v-slot="{ errors }"
								>
									<div class="form-group">
										<label for="description">Slayt Açıklaması</label>
										<editor
											id="description"
											name="description"
											v-model="description"
											api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
											:init="{
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
													editor.on('change', function() {
														editor.save();
													});
												},
												convert_urls: false
											}"
										/>
										<small class="font-weight-bold text-danger">{{
											errors[0]
										}}</small>
									</div>
								</ValidationProvider>
								<div class="form-group">
									<v-file-input
										label="Slayt Görseli"
										id="img_url"
										name="img_url"
										type="file"
										counter
										show-size
										required
									></v-file-input>
								</div>
								<v-btn color="primary" type="submit">
									Slaytı Kayıt Et
								</v-btn>
							</form>
						</ValidationObserver>
					</v-card-text>
				</v-card>
			</v-container>
		</div>
	</div>
</template>
<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";
	import Editor from "@tinymce/tinymce-vue";
	export default {
		middleware: ["admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider,
			editor: Editor
		},
		data() {
			return {
				title: null,
				description: null,
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
    beforeCreate() {
      this.$store.dispatch('getSettings')
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
			saveSlides() {
				let formData = new FormData(this.$refs.slidesForm);
				this.$axios
					.post(process.env.apiBaseUrl + "panel/sliders/create", formData, {
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

							setTimeout(() => {
								this.$router.go("/panel/slides");
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
