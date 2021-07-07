<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-card-text>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(editSettings)"
              ref="settingsForm"
              enctype="multipart/form-data"
            >
              <v-tabs
                v-model="tab"
                background-color="primary"
                dark
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
                      <v-text-field
                        label="Firma Adı"
                        hide-details="auto"
                        id="company_name"
                        type="text"
                        name="company_name"
                        v-model="data.company_name"
                        clearable
                      ></v-text-field>
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                  </ValidationProvider>
                  <div class="form-group">
                    <v-row>
                      <v-col cols="3" sm="3" md="3" lg="3" xl="3" class='my-auto py-auto'>
                        <v-img height='100' :aspect-ratio='1.77'
                          :src="img_url + data.logo"
                          :lazy-src="img_url + data.logo"
                          :alt="data.company_name"
                          class="ma-3"
                               contain
                        />
                      </v-col>
                      <v-col cols="9" sm="9" md="9" lg="9" xl="9" class='my-auto py-auto'>
                        <v-file-input
                          label="Website Logosu"
                          id="logo"
                          name="logo"
                          type="file"
                          counter
                          show-size
                          clearable
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </div>
                  <v-row>
                    <v-col cols="3" sm="3" md="3" lg="3" xl="3" class='my-auto py-auto'>
                      <v-img height='100' :aspect-ratio='1.77'
                        :src="img_url + data.favicon"
                        :lazy-src="img_url + data.favicon"
                        :alt="data.company_name"
                             class='ma-3'
                             contain
                      />
                    </v-col>
                    <v-col cols="9" sm="9" md="9" lg="9" xl="9" class='my-auto py-auto'>
                        <v-file-input
                          label="Favicon"
                          id="favicon"
                          name="favicon"
                          type="file"
                          counter
                          show-size
                          clearable
                        ></v-file-input>
                    </v-col>
                  </v-row>
                </v-tab-item>
                <v-tab-item eager>
                  <ValidationProvider
                    name="Hakkımızda"
                    rules=""
                    v-slot="{ errors }"
                  >
                    <div class='my-3'>
                      <editor
                        name="aboutUs"
                        id="aboutUs"
                        v-model="data.aboutUs"
                        api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                        :init="{
                          placeholder:'Hakkımızda',
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
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Misyonumuz"
                    rules=""
                    v-slot="{ errors }"
                  >
                    <div class="my-3">
                      <editor
                        name="mission"
                        id="mission"
                        v-model="data.mission"
                        api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                        :init="{
                          placeholder:'Misyonumuz',
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
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Vizyonumuz"
                    rules=""
                    v-slot="{ errors }"
                  >
                    <div class="my-3">
                      <editor
                        name="vision"
                        id="vision"
                        v-model="data.vision"
                        api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                        :init="{
                          placeholder:'Vizyonumuz',
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
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </div>
                  </ValidationProvider>
                </v-tab-item>
                <v-tab-item eager>
                  <ValidationProvider
                    name="Telefon"
                    rules="required"
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        label="Telefon"
                        hide-details="auto"
                        id="phone"
                        type="text"
                        name="phone"
                        v-model="data.phone"
                        clearable
                      ></v-text-field>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        label="Email"
                        hide-details="auto"
                        id="email"
                        type="email"
                        name="email"
                        v-model="data.email"
                        clearable
                      ></v-text-field>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Adres"
                    rules="required"
                    v-slot="{ errors }"
                  >
                      <editor
                        id="address"
                        name="address"
                        v-model="data.address"
                        api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                        :init="{
                          placeholder:'Adres',
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
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                </v-tab-item>
                <v-tab-item eager>
                  <ValidationProvider
                    name="Facebook"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        label="Facebook"
                        hide-details="auto"
                        id="facebook"
                        type="text"
                        name="facebook"
                        v-model="data.facebook"
                        clearable
                      ></v-text-field>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Twitter"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        label="Twitter"
                        hide-details="auto"
                        id="twitter"
                        type="text"
                        name="twitter"
                        v-model="data.twitter"
                        clearable
                      ></v-text-field>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Instagram"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        label="Instagram"
                        hide-details="auto"
                        id="instagram"
                        type="text"
                        name="instagram"
                        v-model="data.instagram"
                        clearable
                      ></v-text-field>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Linkedin"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        label="Linkedin"
                        hide-details="auto"
                        id="linkedin"
                        type="text"
                        name="linkedin"
                        v-model="data.linkedin"
                        clearable
                      ></v-text-field>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Youtube"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-text-field
                        class='mb-3'
                        label="Youtube"
                        hide-details="auto"
                        id="youtube"
                        type="text"
                        name="youtube"
                        v-model="data.youtube"
                        clearable
                      ></v-text-field>

                  </ValidationProvider>
                </v-tab-item>
                <v-tab-item eager>
                  <ValidationProvider
                    name="Meta Keywords"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-textarea
                        label="Meta Keywords"
                        name="metaKeywords"
                        id="metaKeywords"
                        v-model="data.metaKeywords"
                        clearable
                      ></v-textarea>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Meta Description"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-textarea
                        label="Meta Description"
                        name="metaDescription"
                        id="metaDescription"
                        v-model="data.metaDescription"
                        clearable
                      ></v-textarea>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                </v-tab-item>
                <v-tab-item eager>
                  <ValidationProvider
                    name="Google Analytics"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-textarea
                        label="Google Analytics"
                        name="analytics"
                        id="analytics"
                        v-model="data.analytics"
                        clearable
                      ></v-textarea>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Yandex Metrica"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-textarea
                        label="Yandex Metrica"
                        name="metrica"
                        id="metrica"
                        v-model="data.metrica"
                        clearable
                      ></v-textarea>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                </v-tab-item>
                <v-tab-item eager>
                  <ValidationProvider
                    name="Canlı Destek"
                    rules=""
                    v-slot="{ errors }"
                  >
                      <v-textarea
                        label="Canlı Destek"
                        name="liveSupport"
                        id="liveSupport"
                        v-model="data.liveSupport"
                        clearable
                      ></v-textarea>
                    <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </ValidationProvider>
                </v-tab-item>
              </v-tabs-items>
                <v-btn color="primary" dark type="submit" class='mt-3'>Güncelle</v-btn>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>
<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";
	import Editor from "@tinymce/tinymce-vue";
  import Breadcrumb from '@/components/includes/Breadcrumb'
	export default {
		middleware: ["auth","admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider,
			editor: Editor,
      Breadcrumb
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
		},
		mounted() {},
		data() {
			return {
        items: [
          {
            text: 'Admin Paneli',
            disabled: false,
            href: '/panel'
          },
          {
            text: 'Ayarlar',
            disabled: false,
            href: '/panel/settings/'
          },
          {
            text: 'Ayar Düzenle',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
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
				data: {
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
					liveSupport: null
				},
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
		},
		validate({ params }) {
			return params.id !== null ? params.id : null;
		},
		async asyncData({ params, error, $axios, $auth }) {
			try {
				const { data } = await $axios.get(
					process.env.apiBaseUrl + "panel/settings/update/" + params.id
				);

				return data;
			} catch (e) {
				error({ message: "Site Ayarı Bulunamadı.", statusCode: 404 });
			}
		},
		methods: {
			isEmpty(obj) {
				if (typeof obj == "number") return false;
				else if (typeof obj == "string") return obj.length === 0;
				else if (Array.isArray(obj)) return obj.length === 0;
				else if (typeof obj == "object")
					return obj == null || Object.keys(obj).length === 0;
				else if (typeof obj == "boolean") return false;
				else return !obj;
			},
			editSettings() {
				let formData = new FormData(this.$refs.settingsForm);
				this.$axios
					.post(
						process.env.apiBaseUrl +
							"panel/settings/update/" +
							this.data._id.$oid,
						formData,
						{
							headers: {
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
								//this.$router.go("/panel/settings");
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
