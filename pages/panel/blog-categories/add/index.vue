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
          <v-card-text>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                @submit.prevent="handleSubmit(saveBlogCategories)"
                ref="blogCategoriesForm"
                enctype="multipart/form-data"
              >
                <v-stepper flat v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Makale Kategorisi Bilgileri
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step="1">
                      <ValidationProvider
                        name="Makale Kategorisi"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Makale Kategorisi'
                            id="title"
                            type="text"
                            name="title"
                            v-model="inputData.title"
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>

                      <v-btn
                        color='primary'
                        type="submit"
                      >
                        Makale Kategorisini Kaydet
                      </v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </form>
            </ValidationObserver>
          </v-card-text>
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
  name: 'blog-categories-add',
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
        {name: "Makale Kategorileri",url:"/panel/blog-categories"},
        {name: "Makale Kategorisi Ekle"}
      ],
      e1: 1,
      inputData: {
        title: null,
        description: null,
        id: null
      },
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
    saveBlogCategories() {
      try {
        let formData = new FormData(this.$refs.blogCategoriesForm);
        this.$axios
          .post(
            process.env.apiBaseUrl + "panel/blog-categories/create",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data; boundary=" + formData._boundary,
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
              setTimeout(function(){
                window.location.href="/panel/blog-categories"
              },2000)
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
    selectCover() {
      try {
        this.e1 = 3;
        this.retrieveData();
      }catch (e) {
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
        if (url !== undefined && url !== "" && url !== null) {
          urlParam = url;
        }
        const params = this.getRequestParams(
          this.searchTitle,
          this.page,
          this.pageSize
        );
        this.$axios
          .get(`${process.env.apiBaseUrl}panel/datatables/${urlParam}?table=blog_categories_file&page=${params.page}&per_page=${params.size}&search=${params.title}&search_columns=name,email,phone&where_column=blog_category_id&where_value=${this.inputData.id}&joins=blog_categories_file`)
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
    deleteData(id) {
      try {
        this.$axios
          .delete(
            process.env.apiBaseUrl +
            "panel/datatables/delete-file?id=" +
            id +
            "&table=blog_categories_file"
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
              this.refreshList();
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
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
            "panel/datatables/is-active-setter?table=blog_categories_file&id=" +
            id)
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
              this.refreshList();
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
            }
          }).catch(err => console.log(err));
      }catch (e) {
        console.log(e)
      }
    },
    isCoverSetter(id) {
      try {
        this.$axios
          .get(
            process.env.apiBaseUrl +
            "panel/datatables/is-cover-setter?table=blog_categories_file&foreign_column=blog_category_id&id=" +
            id)
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
              });
              this.refreshList();
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter",
                displayMode: "once"
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
          id: data._id.$oid,
          img_url: this.img_url + data.img_url,
          isCover: data.isCover,
          isActive: data.isActive
        };
      }catch (e) {
        console.log(e)
      }
    },
    onComplete(e) {
      try {
        if (JSON.parse(e.xhr.response).success) {
          this.$izitoast.success({
            title: JSON.parse(e.xhr.response).title,
            message: JSON.parse(e.xhr.response).msg,
            position: "topCenter",
            displayMode: "once"
          });
        } else {
          this.$izitoast.error({
            title: JSON.parse(e.xhr.response).title,
            message: JSON.parse(e.xhr.response).msg,
            position: "topCenter",
            displayMode: "once"
          });
        }
      }catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.retrieveData();
  },
}
</script>

<style scoped>

</style>
