<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-card-text>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>
                mdi-account
              </v-icon>
              Profilim
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-lock
              </v-icon>
              Option 2
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-access-point
              </v-icon>
              Option 3
            </v-tab>

            <v-tab-item eager>
              <v-card flat>
                <v-card-text>
                  <v-tabs show-arrows>
                    <v-tab>
                      Kayıt Bilgilerim
                    </v-tab>
                    <v-tab>
                      Kayıt Bilgisi Düzenle
                    </v-tab>
                    <v-tab-item eager>
                      <v-simple-table>
                        <tbody>
                        <tr>
                          <td>
                            <b>Ad Soyad :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.name }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Cinsiyet :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.gender }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>İkamet Ettiğiniz İl :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.city }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>İkamet Ettiğiniz İlçe :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.town }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>İkamet Ettiğiniz Semt :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.district }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>İkamet Ettiğiniz Mahalle :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.neighborhood }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>İkamet Ettiğiniz Adres :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.address }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Doğum Tarihi :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.birthDate }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Boy (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.size }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Ağırlık (kg) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.weight }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Bel (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.waist }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Kalça (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.hip }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Göğüs (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.chest }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Boyun (cm) : </b>
                          </td>
                          <td colspan="2">
                            {{ userData.neck }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Üst Kol (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.upperArm }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Alt Kol (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.lowerArm }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Kol Bileği (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.wrist }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Üst Bacak (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.upperLeg }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Alt Bacak (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.lowerLeg }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Deri Kıvrım Kalınlığı (cm) :</b>
                          </td>
                          <td colspan="2">
                            {{ userData.skinfoldThickness }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Yağ :</b>
                          </td>
                          <td>
                            %
                            {{ userData.fatRatio }}
                          </td>
                          <td>
                            {{ userData.fat }}
                            KG
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Kas :</b>
                          </td>
                          <td>
                            %
                            {{ userData.muscleRatio }}
                          </td>
                          <td>
                            {{ userData.muscle }}
                            KG
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Su :</b>
                          </td>
                          <td>
                            %
                            {{ userData.waterRatio }}
                          </td>
                          <td>
                            {{ userData.water }}
                            KG
                          </td>
                        </tr>
                        </tbody>
                      </v-simple-table>
                    </v-tab-item>
                    <v-tab-item eager>

                    </v-tab-item>
                  </v-tabs>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item eager>
              <v-card flat>
                <v-card-text>
                  <p>
                    Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                  </p>

                  <p>
                    Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                  </p>

                  <p>
                    Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                  </p>

                  <p>
                    Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                  </p>

                  <p class="mb-0">
                    Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item eager>
              <v-card flat>
                <v-card-text>
                  <p>
                    Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                  </p>

                  <p class="mb-0">
                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

        </v-card-text>
      </v-card>

    </client-only>
  </v-container>
</template>

<script>
	import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Breadcrumb from '@/components/includes/Breadcrumb'
	export default {
		middleware: ["auth"],
		components: {
			ValidationObserver,
			ValidationProvider,
      Breadcrumb
		},
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
		},
		mounted() {
			this.getCities();
			if (!this.isEmpty(this.userData) && this.userData.status === "dietician") {
				this.getCities2();
			}
			let inputs = document.querySelectorAll(".v-file-input input");
			[...inputs].forEach(input => {
				input.remove();
			});
		},
		data() {
			return {
        items: [
          {
            text: 'Anasayfa',
            disabled: false,
            href: '/'
          },
          {
            text: 'Profilim',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
				data: {
					cities: [],
					towns: [],
					districts: [],
					neighborhoods: [],
					company_cities: [],
					company_towns: [],
					company_districts: [],
					company_neighborhoods: [],
					city: "",
					town: "",
					district: "",
					neighborhood: "",
					company_city: "",
					company_town: "",
					company_district: "",
					company_neighborhood: ""
				},
				country: {
					cities: [],
					towns: [],
					districts: [],
					neighborhoods: []
				},
				country2: {
					cities: [],
					towns: [],
					districts: [],
					neighborhoods: []
				},
				months: [
					"OCAK",
					"ŞUBAT",
					"MART",
					"NİSAN",
					"MAYIS",
					"HAZİRAN",
					"TEMMUZ",
					"AĞUSTOS",
					"EYLÜL",
					"EKİM",
					"KASIM",
					"ARALIK"
				],
				userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
					? this.$auth.$storage.getUniversal("user")
					: null
			};
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
			getCities() {
				this.$axios
					.get(process.env.apiBaseUrl + "informations/cities")
					.then(response => {
						this.country.cities =
							response.data.data.cities.length > 0
								? response.data.data.cities
								: [];
						setTimeout(() => {
							this.getTowns();
						}, 100);
					});
			},
			getTowns: function(event) {
				let townIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					townIds = theTarget.id;
				}
				if (this.isEmpty(townIds)) {
					for (let element in this.$refs.city.options) {
						if (this.$refs.city.options[element].selected) {
							townIds = this.$refs.city.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(process.env.apiBaseUrl + "informations/towns?id=" + townIds)
					.then(response => {
						this.country.towns =
							response.data.towns.length > 0 ? response.data.towns : [];
						this.country.districts = [];
						this.userData.districts = [];
						this.country.neighborhoods = [];
						this.userData.neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getDistricts();
							}, 100);
						}
					});
			},
			getDistricts: function(event) {
				let districtIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					districtIds = theTarget.id;
				}
				if (this.isEmpty(districtIds)) {
					for (let element in this.$refs.town.options) {
						if (this.$refs.town.options[element].selected) {
							districtIds = this.$refs.town.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl + "informations/districts?id=" + districtIds
					)
					.then(response => {
						this.country.districts =
							response.data.districts.length > 0 ? response.data.districts : [];
						this.country.neighborhoods = [];
						this.userData.neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getNeighborhoods();
							}, 100);
						}
					});
			},
			getNeighborhoods: function(event) {
				let neighborhoodIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					neighborhoodIds = theTarget.id;
				}
				if (this.isEmpty(neighborhoodIds)) {
					for (let element in this.$refs.district.options) {
						if (this.$refs.district.options[element].selected) {
							neighborhoodIds = this.$refs.district.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"informations/neighborhoods?id=" +
							neighborhoodIds
					)
					.then(response => {
						this.country.neighborhoods =
							response.data.neighborhoods.length > 0
								? response.data.neighborhoods
								: [];
					});
			},
			getCities2() {
				this.$axios
					.get(process.env.apiBaseUrl + "informations/cities")
					.then(response => {
						this.country2.cities =
							response.data.data.cities.length > 0
								? response.data.data.cities
								: [];
						setTimeout(() => {
							this.getTowns2();
						}, 100);
					});
			},
			getTowns2: function(event) {
				let townIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					townIds = theTarget.id;
				}
				if (this.isEmpty(townIds)) {
					for (let element in this.$refs.company_city.options) {
						if (this.$refs.company_city.options[element].selected) {
							townIds = this.$refs.company_city.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(process.env.apiBaseUrl + "informations/towns?id=" + townIds)
					.then(response => {
						this.country2.towns =
							response.data.towns.length > 0 ? response.data.towns : [];
						this.country2.districts = [];
						this.userData.company_districts = [];
						this.country2.neighborhoods = [];
						this.userData.company_neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getDistricts2();
							}, 100);
						}
					});
			},
			getDistricts2: function(event) {
				let districtIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					districtIds = theTarget.id;
				}
				if (this.isEmpty(districtIds)) {
					for (let element in this.$refs.company_town.options) {
						if (this.$refs.company_town.options[element].selected) {
							districtIds = this.$refs.company_town.options[element].dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl + "informations/districts?id=" + districtIds
					)
					.then(response => {
						this.country2.districts =
							response.data.districts.length > 0 ? response.data.districts : [];
						this.country2.neighborhoods = [];
						this.userData.company_neighborhoods = [];
						if (event === undefined) {
							setTimeout(() => {
								this.getNeighborhoods2();
							}, 100);
						}
					});
			},
			getNeighborhoods2: function(event) {
				let neighborhoodIds = null;
				if (event !== undefined && event.target.options.selectedIndex > -1) {
					const theTarget =
						event.target.options[event.target.options.selectedIndex].dataset;
					neighborhoodIds = theTarget.id;
				}
				if (this.isEmpty(neighborhoodIds)) {
					for (let element in this.$refs.company_district.options) {
						if (this.$refs.company_district.options[element].selected) {
							neighborhoodIds = this.$refs.company_district.options[element]
								.dataset.id;
						}
					}
				}
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"informations/neighborhoods?id=" +
							neighborhoodIds
					)
					.then(response => {
						this.country2.neighborhoods =
							response.data.neighborhoods.length > 0
								? response.data.neighborhoods
								: [];
					});
			},
			updateInformation() {
				let formData = new FormData(this.$refs.informationForm);
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
