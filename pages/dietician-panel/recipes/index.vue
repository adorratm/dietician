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
                to="/dietician-panel/recipes/add"
                color="primary"
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
              <v-img :src="item.img_url" :lazy-src="item.img_url" width="150" height="150" />
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
              <v-icon small @click="deleteData(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Sayfada Görüntüleme Sayısı"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" lg="9">
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
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Breadcrumb from '@/components/includes/Breadcrumb'
export default {
  middleware: ["auth","dietician"],
  layout: "dietician",
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
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyen Paneli',
          disabled: false,
          href: '/dietician-panel/'
        },
        {
          text: 'Yemek Tarifleri',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      data: [],
      searchTitle: null,
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
      if (!this.isEmpty(url)) {
        urlParam = url;
      }
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      this.$axios
        .get(
          `${process.env.apiBaseUrl}dietician/recipes/${urlParam}?table=recipes&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name&where_column=dietician_id&where_value=${this.userData._id}`,
          {
            headers: {
              Authorization: "Bearer " + this.userData.api_token
            },
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
      this.$router.push("/dietician-panel/recipes/update/" + id);
    },
    deleteData(id) {
      this.$axios
        .delete(process.env.apiBaseUrl + "dietician/recipes/delete/" + id, {
          headers: {
            Authorization: "Bearer " + this.userData.api_token
          },
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
          "dietician/datatables/is-active-setter?table=recipes&id=" +
          id,
          {
            headers: {
              Authorization: "Bearer " + this.userData.api_token
            },
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
        img_url: this.img_url + data.img_url,
        isActive: data.isActive
      };
    }
  },
  mounted() {
    this.retrieveData();
  }
};
</script>


<style scoped>

</style>
