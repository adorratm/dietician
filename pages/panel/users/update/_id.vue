<template>
	<v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-card-text>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              @submit.prevent="handleSubmit(editUsers)"
              ref="usersForm"
              enctype="multipart/form-data"
            >
              <v-tabs show-arrows v-model='tab' background-color="primary"
                      dark>
                <v-tab>
                  Genel Bilgiler
                </v-tab>
                <v-tab>
                  Sosyal Medya
                </v-tab>
                <v-tabs-items v-model='tab'>
                  <v-tab-item eager>
                    <ValidationProvider
                      name="Adınız ve Soyadınız"
                      rules="required"
                      v-slot="{ errors }"
                    >
                        <v-text-field
                          label='Adınız ve Soyadınız'
                          id="title"
                          type="text"
                          name="name"
                          v-model="data.name"
                          clearable
                        />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                    <ValidationProvider
                      name="Email Adresiniz"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                        <v-text-field
                          label='Email Adresiniz'
                          id="company_name"
                          type="text"
                          name="email"
                          v-model="data.email"
                          clearable
                        />
                        <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                          {{ errors[0] }}
                        </v-alert>
                    </ValidationProvider>
                    <v-row>
                      <v-col cols="3" sm="3" md="3" lg="3" xl="3">
                        <v-img
                          :src="img_url + data.img_url"
                          :alt="data.name"
                          contain
                          max-width="150"
                          max-height="150"
                        />
                      </v-col>
                      <v-col cols="9" sm="9" md="9" lg="9" xl="9">
                          <v-file-input
                            label='Kullanıcı Görseli'
                            type="file"
                            id="img_url"
                            ref="img_url"
                            name="img_url"
                            v-model='data.img_url'
                            clearable
                          />
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <v-tab-item eager>
                    <ValidationProvider
                      name="Facebook"
                      rules=""
                      v-slot="{ errors }"
                    >
                        <v-text-field
                          label='Facebook'
                          id="facebook"
                          type="text"
                          name="facebook"
                          v-model="data.facebook"
                          clearable
                        />
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
                          label='Twitter'
                          id="twitter"
                          type="text"
                          name="twitter"
                          v-model="data.twitter"
                          clearable
                        />
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
                          label='Instagram'
                          id="instagram"
                          type="text"
                          name="instagram"
                          v-model="data.instagram"
                          clearable
                        />
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
                          label='Linkedin'
                          id="linkedin"
                          type="text"
                          class="form-control"
                          name="linkedin"
                          v-model="data.linkedin"
                          clearable
                        />
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
                          label='Youtube'
                          id="youtube"
                          type="text"
                          name="youtube"
                          v-model="data.youtube"
                          clearable
                        />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
              <v-btn color='primary' class='mt-3' type="submit">
                Gönder
              </v-btn>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>
<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Breadcrumb from '@/components/includes/Breadcrumb'

	export default {
		middleware: ["auth","admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider,
      Breadcrumb
		},
    computed:{
      img_url() {
        return process.env.apiPublicUrl
      },
    },
		data() {
			return {
        items: [
          {
            text: 'Admin Paneli',
            disabled: false,
            href: '/panel'
          },
          {
            text: 'Kullanıcılar',
            disabled: false,
            href: '/panel/users/'
          },
          {
            text: 'Kullanıcı Düzenle',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
			  tab:null,
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
				else if (typeof obj == "string") return obj.length === 0;
				else if (Array.isArray(obj)) return obj.length === 0;
				else if (typeof obj == "object")
					return obj == null || Object.keys(obj).length === 0;
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
