<template>
  <div>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

        <!-- General -->

        <v-card>
          <v-card-title class="d-flex justify-content-between">
						<span class="justify-content-center flex-grow-1">
							<v-text-field
                v-model="searchTitle"
                label="Arama Yapın..."
                class="my-auto py-auto"
                v-on:keyup.enter.prevent="
									page = 1;
									retrieveData('get-by-search');
								"
                clearable
                hide-details
                outlined
              ></v-text-field>
						</span>
            <span class="justify-content-end flex-shrink-1">
							<v-btn
                color='primary'
                to="/panel/blog-categories/add"
                class="float-right btn btn-info-light ml-3 my-auto py-auto"
                x-large
              >
								<i class="fa fa-plus"></i> Ekle
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
              <v-col cols="12" lg="3">
                <v-select
                  v-model="pageSize"
                  :items="pageSizes"
                  label="Sayfada Görüntüleme Sayısı"
                  @change="handlePageSizeChange"
                  outlined
                  hide-details
                ></v-select>
              </v-col>

              <v-col cols="12" lg="9">
                <v-pagination
                  color="primary"
                  v-model="page"
                  :length="totalPages"
                  total-visible="7"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  @input="handlePageChange"
                  circle
                ></v-pagination>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>

        <!-- /General -->

      </div>
    </div>
    <!-- /Page Wrapper -->
    <Nuxt />
  </div>
</template>

<script>
import Breadcrumb from "~/components/backend/breadcrumb"
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Editor from "@tinymce/tinymce-vue";
export default {
  components:{
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor,
  },
  name: 'nutrients',
  middleware: ["auth","admin"],
  layout: 'admin',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    user(){
      return this.$auth.user
    }
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/panel"},
        {name: "Makale Kategorileri"}
      ],
      data: [],
      searchTitle: null,
      headers: [
        { text: "#", align: "center", value: "rank" },
        { text: "Adı", align: "center", value: "title" },
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
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      try {
        if (typeof obj == 'number') return false
        else if (typeof obj == 'string') return obj.length === 0
        else if (Array.isArray(obj)) return obj.length === 0
        else if (typeof obj == 'object')
          return obj == null || Object.keys(obj).length === 0
        else if (typeof obj == 'boolean') return false
        else return !obj
      }catch (e){
        console.log(e)
      }
    },
    getRequestParams(searchTitle, page, pageSize) {
      try {
        let params = {};
        params["title"] = searchTitle;
        params["page"] = page;
        params["size"] = pageSize;
        return params;
      }catch (e) {
        console.log(e)
      }
    },
    retrieveData(url) {
      try {
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
          .get(`${process.env.apiBaseUrl}panel/blog-categories/${urlParam}?table=blog_categories&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=title`)
          .then(response => {
            this.data = response.data.data.data.map(this.getDisplayData);
            this.totalPages = response.data.data.last_page;
          })
          .catch(err => console.log(err))
          .finally(() => (this.loading = false));
      }catch (e) {
        console.log(e)
      }
    },
    handlePageChange(value) {
      try {
        this.page = value;
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    handlePageSizeChange(size) {
      try {
        this.pageSize = size;
        this.page = 1;
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    refreshList() {
      try {
        this.retrieveData();
      }catch (e) {
        console.log(e)
      }
    },
    editData(id) {
      try {
        this.$router.push("/panel/blog-categories/update/" + id);
      }catch (e) {
        console.log(e)
      }
    },
    deleteData(id) {
      try {
        this.$axios
          .delete(process.env.apiBaseUrl + "panel/blog-categories/delete/" + id)
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
          }).catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    },
    isActiveSetter(id) {
      try {
        this.$axios
          .get(
            process.env.apiBaseUrl +
            "panel/datatables/is-active-setter?table=blog_categories&id=" +
            id)
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
          }).catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    },
    getDisplayData(data) {
      try {
        return {
          rank: data.rank,
          id: data._id,
          title: data.title,
          isActive: data.isActive
        };
      }catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.retrieveData();
  }
}
</script>

<style scoped>

</style>
