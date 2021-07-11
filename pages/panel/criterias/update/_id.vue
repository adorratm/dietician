<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(editCriterias)"
          ref="criteriasForm"
          enctype="multipart/form-data"
        >
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                Ölçüt Bilgileri
              </v-stepper-step>

              <v-divider></v-divider>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <ValidationProvider
                  name="Ölçüt Adı"
                  rules="required"
                  v-slot="{ errors }"
                >
                    <v-text-field
                      label='Ölçüt Adı'
                      id="title"
                      type="text"
                      class="form-control"
                      name="name"
                      v-model="data.name"
                    />
                  <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                    {{ errors[0] }}
                  </v-alert>
                </ValidationProvider>
                <v-btn
                  color='primary'
                  class="mt-2"
                  type="submit"
                >
                  Ölçütü Güncelle
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </form>
      </ValidationObserver>
    </client-only>
  </v-container>
</template>
<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Breadcrumb from '~/components/includes/Breadcrumb'

	export default {
		middleware: ["auth","admin"],
		layout: "admin",
		components: {
			ValidationObserver,
			ValidationProvider,
      Breadcrumb
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
            text: 'Ölçütler',
            disabled: false,
            href: '/panel/criterias'
          },
          {
            text: 'Ölçüt Düzenle',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
				counter:
					!this.isEmpty(this.data) && !this.isEmpty(this.data.values)
						? this.data.values.length
						: 0,
				e1: 1,
				imageData: [],
				data: {
					images: []
				},
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
		validate({ params }) {
			return params.id !== null ? params.id : null;
		},
		async asyncData({ params, error, $axios }) {
			try {
				const { data } = await $axios.get(
					process.env.apiBaseUrl + "panel/criteria/update/" + params.id
				);

				return data;
			} catch (e) {
				error({ message: "Ölçüt Bilgisi Bulunamadı.", statusCode: 404 });
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
			editCriterias() {
				let formData = new FormData(this.$refs.criteriasForm);
				this.$axios
					.post(
						process.env.apiBaseUrl +
							"panel/criteria/update/" +
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
								this.$router.go("/panel/criterias");
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
