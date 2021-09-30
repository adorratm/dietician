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
                @submit.prevent="handleSubmit(saveCriterias)"
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
                            v-model="inputData.name"
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
                        Ölçütü Kaydet
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
  name: 'criterias-add',
  middleware: ["auth","dietician"],
  layout: 'dietician',
  computed: {
    currentPath() {
      return this.$route.name
    },
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
        {name: "Ölçüt Ekle"}
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
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj ) {
      if ( typeof obj == "number" ) return false;
      else if ( typeof obj == "string" ) return obj.length === 0;
      else if ( Array.isArray( obj ) ) return obj.length === 0;
      else if ( typeof obj == "object" )
        return obj == null || Object.keys( obj ).length === 0;
      else if ( typeof obj == "boolean" ) return false;
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
            setTimeout(function(){
              window.location.href ="/panel/criterias"
            },2000)
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
              position: "topCenter"
            });
          }
        });
    }
  },
}
</script>

<style scoped>

</style>
