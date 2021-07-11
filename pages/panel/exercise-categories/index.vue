<template>
  <v-container>
    <client-only>
        <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-card-title class="d-flex justify-content-between">
						<span class="justify-content-center flex-grow-1">
							<v-text-field
                v-model="searchTitle"
                label="Arama Yapın..."
                class="my-auto py-auto"
                v-on:keyup.prevent="
									page = 1;
									retrieveData('get-by-search');
								"
              ></v-text-field>
						</span>
          <span class="justify-content-end flex-shrink-1">
							<v-btn
                color='primary'
                to="/panel/exercise-categories/add"
                class="float-right ml-3 my-auto py-auto"
              >
								<v-icon>mdi mdi-plus</v-icon> Ekle
							</v-btn>
						</span>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="data"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:[`item.img_url`]="{ item }">
              <img v-bind:src="item.img_url" width="150" height="150" />
            </template>
            <template v-slot:[`item.isActive`]="{ item }">
              <v-layout justify-center>
                <v-switch
                  class="d-flex justify-content-center mx-auto px-auto text-center"
                  v-model="item.isActive"
                  color="success"
                  :key="item.id"
                  @click="isActiveSetter(item.id)"
                ></v-switch>
              </v-layout>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editData(item.id)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteData(item.id)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-select
                v-model="pageSize"
                :items="pageSizes"
                label="Sayfada Görüntüleme Sayısı"
                @change="handlePageSizeChange"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="9" lg="9" xl="9">
              <v-pagination
                v-model="page"
                :length="totalPages"
                total-visible="7"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                @input="handlePageChange"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
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
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
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
            text: 'Egzersiz Kategorileri',
            disabled: true,
            href: 'javascript:void(0)'
          }
        ],
				data: [],
				searchTitle: null,
				empty_url: null,
				headers: [
					{ text: "#", align: "center", value: "rank" },
					{ text: "Görsel", align: "center", value: "img_url", sortable: false },
					{ text: "Adı", align: "center", value: "name" },
					{ text: "Durum", align: "center", value: "isActive" },
					{
						text: "İşlemler",
						align: "center",
						value: "actions",
						sortable: false
					}
				],
				page: 1,
				totalPages: 0,
				pageSize: 25,
				pageSizes: [25, 50, 100, 200, 500, 1000],
				loading: false,
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
			getRequestParams(searchTitle, page, pageSize) {
				let params = {};
				params["title"] = searchTitle;
				params["page"] = page;
				params["size"] = pageSize;
				return params;
			},
			retrieveData(url) {
				let urlParam = "get-all";
				if (url !== undefined && url !== "" && url !== null) {
					urlParam = url;
				}
				const params = this.getRequestParams(
					this.searchTitle,
					this.page,
					this.pageSize
				);
				this.$axios
					.get(
						`${process.env.apiBaseUrl}panel/exercise-categories/${urlParam}?table=exercise_categories&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name`,
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
								"Content-type": "application/json",
								Authorization: "Bearer " + this.userData.api_token
							},
							credentials: "same-origin"
						}
					)
					.then(response => {
						this.empty_url = response.data.empty_url;
						this.data = response.data.data.data.map(this.getDisplayData);

						this.totalPages = response.data.data.last_page;
					})
					.catch(err => console.log(err))
					.finally(() => (this.loading = false));
			},
			handlePageChange(value) {
				this.page = value;
				this.retrieveData();
			},
			handlePageSizeChange(size) {
				this.pageSize = size;
				this.page = 1;
				this.retrieveData();
			},
			refreshList() {
				this.retrieveData();
			},
			editData(id) {
				this.$router.push("/panel/exercise-categories/update/" + id);
			},
			deleteData(id) {
				this.$axios
					.delete(
						process.env.apiBaseUrl + "panel/exercise-categories/delete/" + id,
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
								"Content-type": "application/json",
								Authorization: "Bearer " + this.userData.api_token
							},
							credentials: "same-origin"
						}
					)
					.then(response => {
						if (response.data.success) {
							this.$izitoast.success({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
							this.refreshList();
						} else {
							this.$izitoast.error({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
						}
					});
			},
			isActiveSetter(id) {
				this.$axios
					.get(
						process.env.apiBaseUrl +
							"panel/datatables/is-active-setter?table=exercise_categories&id=" +
							id,
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
								"Content-type": "application/json",
								Authorization: "Bearer " + this.userData.api_token
							},
							credentials: "same-origin"
						}
					)
					.then(response => {
						if (response.data.success) {
							this.$izitoast.success({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
							this.refreshList();
						} else {
							this.$izitoast.error({
								title: response.data.title,
								message: response.data.msg,
								position: "topCenter"
							});
						}
					});
			},
			getDisplayData(data) {
				return {
					rank: data.rank,
					id: data._id,
					name: data.name,
					img_url:
						this.img_url +
						(!this.isEmpty(data.exercise_categories) && !this.isEmpty(data.exercise_categories.img_url)
							? data.exercise_categories.img_url
							: this.empty_url),
					isActive: data.isActive
				};
			}
		},
		mounted() {
			this.retrieveData();
		}
	};
</script>
