<template>
<v-container>
  <client-only>
    <Breadcrumb :items='items'></Breadcrumb>
    <v-card>
      <v-card-title class="d-flex justify-content-between">
					<span class="justify-content-center flex-grow-1">
						<v-text-field
              v-on:keyup.prevent="
								page = 1;
								retrieveData('get-by-search');
							"
              v-model="searchTitle"
              label="Arama Yapın..."
              class="my-auto py-auto"
            ></v-text-field>
					</span>
        <span class="justify-content-end flex-shrink-1">
						<v-btn
              to="/dietician-panel/consultants/add"
              class="float-right ml-3 my-auto py-auto"
              color="primary"
            ><v-icon>mdi mdi-plus</v-icon> Ekle</v-btn
            >
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
            <img v-bind:src="item.img_url" width="150" height="150" :alt='item.full_name' />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  class="mr-2"
                  @click="createEdiet(item.id)"
                  v-bind="attrs"
                  v-on="on"
                >mdi mdi-clipboard-edit</v-icon
                >
              </template>
              <span>Yeni E-Diyet Oluştur</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editData(item.id)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Danışanı Düzenle</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  @click="deleteData(item.id)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Danışanı Sil</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3" xl="3">
        <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Sayfada Görüntüleme Sayısı"
          @change="handlePageSizeChange"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="9" xl="9">
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
      data: [],
      searchTitle: null,
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
          text: 'Danışanlarım',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      headers: [
        { text: "#", align: "center", value: "rank" },
        { text: "Görsel", align: "center", value: "img_url", sortable: false },
        { text: "Adı Soyadı", align: "center", value: "name" },
        { text: "Email", align: "center", value: "email" },
        { text: "Telefon", align: "center", value: "phone" },
        { text: "Kimlik No", align: "center", value: "tc" },
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
      params["page"] = page - 1;
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
          `${process.env.apiBaseUrl}dietician/datatables/${urlParam}?table=users&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=dietician_id&where_value=${this.userData._id}`,
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
    createEdiet(id) {
      this.$router.push("/dietician-panel/consultants/ediet/add/" + id);
    },
    editData(id) {
      this.$router.push("/dietician-panel/consultants/update/" + id);
    },
    deleteData(id) {
      this.$axios
        .update(
          process.env.apiBaseUrl + "dietician/users/update/" + id,
          { dietician_id: null },
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
        id: data._id.$oid,
        name: data.name,
        email: data.email,
        phone: data.phone,
        tc: data.tc,
        img_url:
          this.img_url +
          (data.status === "dietician" ? data.profile_photo : data.img_url),
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
