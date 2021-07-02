<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">Ayarlar</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">Ayarlar</li>
					</ul>
				</div>
				<v-card tile>
					<v-card-text>
						<ValidationObserver v-slot="{ handleSubmit }">
							<form
								@submit.prevent="handleSubmit(saveSettings)"
								ref="settingsForm"
								enctype="multipart/form-data"
							>
								<v-tabs
									v-model="tab"
									background-color="primary"
									dark
									fixed-tabs
									show-arrows
								>
									<v-tab v-for="item in tabs" :key="item.tab">
										{{ item.tab }}
									</v-tab>
								</v-tabs>
								<v-tabs-items v-model="tab">
									<v-tab-item eager>
										<ValidationProvider
											name="Firma Adı"
											rules="required"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-text-field
													label="Firma Adı"
													hide-details="auto"
													id="company_name"
													type="text"
													name="company_name"
													v-model="company_name"
												></v-text-field>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Website Logosu"
											rules="required"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-file-input
													label="Website Logosu"
													id="logo"
													name="logo"
													type="file"
													counter
													show-size
													required
												></v-file-input>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Favicon"
											rules="required"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-file-input
													label="Favicon"
													id="favicon"
													name="favicon"
													type="file"
													counter
													show-size
													required
												></v-file-input>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
									</v-tab-item>
									<v-tab-item eager>
										<ValidationProvider
											name="Hakkımızda"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="aboutUs">Hakkımızda</label>

												<editor
													name="aboutUs"
													id="aboutUs"
													v-model="aboutUs"
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
										<ValidationProvider
											name="Misyonumuz"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="mission">Misyonumuz</label>
												<editor
													name="mission"
													id="mission"
													v-model="mission"
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
										<ValidationProvider
											name="Vizyonumuz"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="vision">Vizyonumuz</label>
												<editor
													name="vision"
													id="vision"
													v-model="vision"
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
									</v-tab-item>
									<v-tab-item eager>
										<ValidationProvider
											name="Telefon"
											rules="required"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-text-field
													label="Telefon"
													hide-details="auto"
													id="phone"
													type="text"
													name="phone"
													v-model="phone"
												></v-text-field>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Email"
											rules="required|email"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-text-field
													label="Email"
													hide-details="auto"
													id="email"
													type="email"
													name="email"
													v-model="email"
												></v-text-field>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Adres"
											rules="required"
											v-slot="{ errors }"
										>
											<div class="form-group">
												<label for="address">Adres</label>
												<editor
													id="address"
													name="address"
													v-model="address"
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
									</v-tab-item>
									<v-tab-item eager>
										<ValidationProvider
											name="Facebook"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-text-field
													label="Facebook"
													hide-details="auto"
													id="facebook"
													type="text"
													name="facebook"
													v-model="facebook"
												></v-text-field>
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
												<v-text-field
													label="Twitter"
													hide-details="auto"
													id="twitter"
													type="text"
													name="twitter"
													v-model="twitter"
												></v-text-field>
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
												<v-text-field
													label="Instagram"
													hide-details="auto"
													id="instagram"
													type="text"
													name="instagram"
													v-model="instagram"
												></v-text-field>
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
												<v-text-field
													label="Linkedin"
													hide-details="auto"
													id="linkedin"
													type="text"
													name="linkedin"
													v-model="linkedin"
												></v-text-field>
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
												<v-text-field
													label="Youtube"
													hide-details="auto"
													id="youtube"
													type="text"
													name="youtube"
													v-model="youtube"
												></v-text-field>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
									</v-tab-item>
									<v-tab-item eager>
										<ValidationProvider
											name="Meta Keywords"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-textarea
													label="Meta Keywords"
													name="metaKeywords"
													id="metaKeywords"
													v-model="metaKeywords"
												></v-textarea>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Meta Description"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-textarea
													label="Meta Description"
													name="metaDescription"
													id="metaDescription"
													v-model="metaDescription"
												></v-textarea>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
									</v-tab-item>
									<v-tab-item eager>
										<ValidationProvider
											name="Google Analytics"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-textarea
													label="Google Analytics"
													name="analytics"
													id="analytics"
													v-model="analytics"
												></v-textarea>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
										<ValidationProvider
											name="Yandex Metrica"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-textarea
													label="Yandex Metrica"
													name="metrica"
													id="metrica"
													v-model="metrica"
												></v-textarea>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
									</v-tab-item>
									<v-tab-item eager>
										<ValidationProvider
											name="Canlı Destek"
											rules=""
											v-slot="{ errors }"
										>
											<div class="form-group">
												<v-textarea
													label="Canlı Destek"
													name="liveSupport"
													id="liveSupport"
													v-model="liveSupport"
												></v-textarea>
												<small class="font-weight-bold text-danger">{{
													errors[0]
												}}</small>
											</div>
										</ValidationProvider>
									</v-tab-item>
								</v-tabs-items>
								<div class="form-group">
									<v-btn color="primary" dark type="submit">Kaydet</v-btn>
								</div>
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
    beforeCreate() {
      this.$store.dispatch('getSettings')
    },
		data() {
			return {
				tab: null,
				tabs: [
					{ tab: "Genel Ayarlar" },
					{ tab: "Hakkımızda" },
					{ tab: "İletişim" },
					{ tab: "Sosyal Medya" },
					{ tab: "Meta" },
					{ tab: "Analytics" },
					{ tab: "Canlı Destek" }
				],
				company_name: null,
				logo: null,
				favicon: null,
				aboutUs: null,
				mission: null,
				vision: null,
				phone: null,
				email: null,
				address: null,
				map: null,
				facebook: null,
				twitter: null,
				instagram: null,
				linkedin: null,
				youtube: null,
				medium: null,
				pinterest: null,
				metaKeywords: null,
				metaDescription: null,
				analytics: null,
				metrica: null,
				liveSupport: null,
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
			saveSettings() {
				let formData = new FormData(this.$refs.settingsForm);
				this.$axios
					.post(process.env.apiBaseUrl + "panel/settings/create", formData, {
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
								this.$router.go("/panel/settings");
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
