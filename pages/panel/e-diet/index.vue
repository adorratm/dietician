<template>
	<div class="main-wrapper">
		<div class="page-wrapper">
			<v-container fluid class="content">
				<div class="page-header">
					<h3 class="page-title">E-Diyet</h3>
					<ul class="breadcrumb">
						<li class="breadcrumb-item">
							<nuxt-link to="/panel">Anasayfa</nuxt-link>
						</li>
						<li class="breadcrumb-item active">E-Diyet</li>
					</ul>
				</div>
				<v-card tile>
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
					</v-card-title>

					<v-data-table
						:headers="headers"
						:items="data"
						disable-pagination
						:hide-default-footer="true"
					>
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
				</v-card>
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
							color="success"
							v-model="page"
							:length="totalPages"
							total-visible="7"
							next-icon="mdi-menu-right"
							prev-icon="mdi-menu-left"
							@input="handlePageChange"
						></v-pagination>
					</v-col>
				</v-row>
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
		computed: {
			img_url() {
				return process.env.apiPublicUrl;
			}
		},
		data() {
			return {
				data: [],
				searchTitle: null,
				headers: [
					{ text: "#", align: "center", value: "rank" },
					{ text: "Diyet Adı", align: "center", value: "name" },
					{ text: "Diyetisyen Adı", align: "center", value: "dietician_name" },
					{ text: "Diyetisyen T.C.", align: "center", value: "dietician_tc" },
					{ text: "Hasta Adı", align: "center", value: "user_name" },
					{ text: "Hasta T.C.", align: "center", value: "user_tc" },
					{ text: "Oluşturulma Tarihi", align: "center", value: "createdAt" },
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
				else if (typeof obj == "string") return obj.length == 0;
				else if (Array.isArray(obj)) return obj.length == 0;
				else if (typeof obj == "object")
					return obj == null || Object.keys(obj).length == 0;
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
						`${process.env.apiBaseUrl}panel/e-diet/${urlParam}?table=ediet&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,description`,
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
				this.$router.push("/panel/e-diet/update/" + id);
			},
			deleteData(id) {
				this.$axios
					.delete(process.env.apiBaseUrl + "panel/e-diet/delete/" + id, {
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
					})
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
							"panel/datatables/is-active-setter?table=ediet&id=" +
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
					dietician_name: data.dietician.name,
					dietician_tc: data.dietician.tc,
					user_name: data.user.name,
					user_tc: data.user.tc,
					createdAt: data.createdAt,
					isActive: data.isActive
				};
			}
		},
		mounted() {
			this.retrieveData();
		}
	};
</script>
