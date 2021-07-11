<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(saveCriterias)"
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
                      v-model="inputData.name"
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
                  Ölçütü Kayıt Et
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
            text: 'Ölçüt Ekle',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
				counter: 0,
				inputs: [
					[
						{ id: "criteria0", label: "Ölçüt Değeri Adı", value: "" },
						{
							id: "criteriaValue0",
							label: "Ölçüt Değeri",
							value: ""
						},
						{
							id: "criteriaType0",
							label: "Ölçüt Değeri Türü",
							value: ""
						}
					]
				],
				e1: 1,
				inputData: {
					name: null,
					description: null,
					id: null
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
				this.inputs.push([
					{
						id: `criteria${++this.counter}`,
						label: "Ölçüt Değeri Adı",
						value: ""
					},
					{
						id: `criteriaValue${++this.counter}`,
						label: "Ölçüt Değeri",
						value: ""
					},
					{
						id: `criteriaType${++this.counter}`,
						label: "Ölçüt Değeri Türü",
						value: ""
					}
				]);
			},
			removeProperty(id) {
				for (let i = 0; i < this.inputs.length; i++) {
					if (this.inputs[i][0].id === id) {
						this.inputs.splice(i, 1);
					}
				}
			},
			saveCriterias() {
				let formData = new FormData(this.$refs.criteriasForm);

				this.$axios
					.post(process.env.apiBaseUrl + "panel/criteria/create", formData, {
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
							this.$refs.myDropzone.options.url =
								process.env.apiBaseUrl +
								"panel/criteria/create-file/" +
								response.data.data.$oid;
							this.$refs.myDropzone.dropzone.options.url =
								process.env.apiBaseUrl +
								"panel/criteria/create-file/" +
								response.data.data.$oid;
							this.options.url =
								process.env.apiBaseUrl +
								"panel/criteria/create-file/" +
								response.data.data.$oid;
							this.inputData.id = response.data.data.$oid;
							this.options.params.title = response.data.name;
							this.e1 = 2;
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
