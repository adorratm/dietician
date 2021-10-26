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
                @submit.prevent="handleSubmit(editCriterias)"
                ref="criteriasForm"
                enctype="multipart/form-data"
              >
                <v-stepper flat v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Ölçüt Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step="1">
                      <ValidationProvider
                        name="Ölçüt Adı"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Ölçüt Adı'
                            id="title"
                            type="text"
                            name="name"
                            v-model="data.name"
                            clearable
                            hide-details
                            outlined
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
                        Ölçütü Güncelle
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
  name: 'criterias-update',
  middleware: ["auth","dietician"],
  layout: 'dietician',
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
        {name: "Ölçütler",url:"/panel/criterias"},
        {name: "Ölçüt Düzenle"}
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
      console.log(e)
      error({ message: "Ölçüt Bilgisi Bulunamadı.", statusCode: 404 });
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
    cloneProperty() {
      try {
        this.data.values.push({
          title: "",
          value: "",
          type: "",
          id: ++this.counter
        });
      }catch (e) {
        console.log(e)
      }
    },
    removeProperty(id) {
      try {
        this.data.values.splice(id, 1);
      }catch (e) {
        console.log(e)
      }
    },
    editCriterias() {
      try {
        let formData = new FormData(this.$refs.criteriasForm);
        this.$axios
          .post(
            process.env.apiBaseUrl +
            "panel/criteria/update/" +
            this.data._id.$oid,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data; boundary=" + formData._boundary
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
                window.location.href ="/panel/criterias";
              }, 2000);
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter"
              });
            }
          }).catch((e) => console.log(e));
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
