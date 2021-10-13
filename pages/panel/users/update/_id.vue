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
                @submit.prevent="handleSubmit(editUsers)"
                ref="usersForm"
                enctype="multipart/form-data"
              >
                <v-tabs show-arrows v-model='tab' background-color="primary"
                        dark>
                  <v-tab>
                    Genel Bilgiler
                  </v-tab>
                  <v-tab>
                    Sosyal Medya
                  </v-tab>
                  <v-tabs-items v-model='tab'>
                    <v-tab-item class='pt-4' eager>
                      <ValidationProvider
                        name="Adı ve Soyadı"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Adı ve Soyadı'
                            id="title"
                            type="text"
                            name="name"
                            v-model="data.name"
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Email Adresi"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Email Adresi'
                            id="company_name"
                            type="text"
                            name="email"
                            v-model="data.email"
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <div class='form-group'>
                        <v-row>
                          <v-col cols="3" sm="3" md="3" lg="3" xl="3">
                            <img :src="!isEmpty(data.img_url) ? img_url + data.img_url : empty_url"
                                 :alt="data.name" height='100'
                            />
                          </v-col>
                          <v-col cols="9" sm="9" md="9" lg="9" xl="9">
                            <v-file-input
                              label='Kullanıcı Görseli'
                              type="file"
                              id="img_url"
                              ref="img_url"
                              name="img_url"
                              clearable
                              outlined
                              counter
                              show-size
                            />
                          </v-col>
                        </v-row>
                      </div>
                    </v-tab-item>
                    <v-tab-item class='pt-4' eager>
                      <ValidationProvider
                        name="Facebook"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Facebook'
                            id="facebook"
                            type="text"
                            name="facebook"
                            v-model="data.facebook"
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Twitter"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Twitter'
                            id="twitter"
                            type="text"
                            name="twitter"
                            v-model="data.twitter"
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Instagram"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Instagram'
                            id="instagram"
                            type="text"
                            name="instagram"
                            v-model="data.instagram"
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Linkedin"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Linkedin'
                            id="linkedin"
                            type="text"
                            name="linkedin"
                            v-model="data.linkedin"
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Youtube"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Youtube'
                            id="youtube"
                            type="text"
                            name="youtube"
                            v-model="data.youtube"
                            clearable
                            outlined
                            hide-details
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                    </v-tab-item>
                  </v-tabs-items>
                </v-tabs>
                <v-btn color='primary' type="submit">
                  Güncelle
                </v-btn>
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
  name: 'users-update',
  middleware: ["auth","admin"],
  layout: 'admin',
  computed: {
    currentPath() {
      return this.$route.name
    },
    img_url() {
      return process.env.apiPublicUrl
    },
    user(){
      return this.$auth.user
    },
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    }
  },
  data(){
    return {
      breadCrumbItems:[
        {name: "Anasayfa",url: "/panel"},
        {name: "Kullanıcılar",url:"/panel/users"},
        {name: "Kullanıcı Düzenle"},
      ],
      tab: null,
      data: {
        name: null,
        phone: null,
        email: null,
        facebook: null,
        twitter: null,
        instagram: null,
        youtube: null,
        linkedin: null,
        img_url: null
      },
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null;
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + "panel/users/update/" + params.id
      );

      return data;
    } catch (e) {
      error({ message: "Kullanıcı Bilgisi Bulunamadı.", statusCode: 404 });
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
    editUsers() {
      let formData = new FormData(this.$refs.usersForm);
      this.$axios
        .post(
          process.env.apiBaseUrl + "panel/users/update/" + this.data._id.$oid,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=" + formData._boundary,
              Authorization: "Bearer " + this.user.api_token
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
              window.location.href ="/panel/users";
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
}
</script>

<style scoped>

</style>
