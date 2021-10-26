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
                @submit.prevent="handleSubmit(editSlides)"
                ref="slidesForm"
                enctype="multipart/form-data"
              >
                <ValidationProvider
                  name="Slayt Adı"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class='form-group'>
                    <v-text-field
                      label="Slayt Adı"
                      id="title"
                      type="text"
                      name="title"
                      v-model="data.title"
                      clearable
                      hide-details
                      outlined
                    ></v-text-field>
                    <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </div>

                </ValidationProvider>
                <ValidationProvider
                  name="Slayt URL"
                  rules=""
                  v-slot="{ errors }"
                >
                  <div class='form-group'>
                    <v-text-field
                      label="Slayt URL"
                      id="url"
                      type="text"
                      name="url"
                      v-model="data.url"
                      clearable
                      hide-details
                      outlined
                    ></v-text-field>
                    <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="Slayt Açıklaması"
                  rules=""
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <label>Slayt Açıklaması</label>
                    <editor
                      id="description"
                      name="description"
                      v-model="data.description"
                      api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                      :init="{
                        placeholder:'Slayt Açıklaması',
												height: 300,
												plugins: [
													'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
												],
												toolbar:
													'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
												entity_encoding: 'raw',
												forced_root_block: '',
												paste_auto_cleanup_on_paste: true,
												language: 'tr_TR', // select language
												language_url:
													'https://cdn.jsdelivr.net/npm/tinymce-lang/langs/tr_TR.js',
												branding: false,
												image_advtab: true,
												mobile: {
													theme: 'silver'
												},
												setup: function(editor) {
                          editor.on('Init', function() {
														editor.save();
													});
													editor.on('change', function() {
														editor.save();
													});
												},
												convert_urls: false
											}"
                    />
                    <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                      {{ errors[0] }}
                    </v-alert>
                  </div>
                </ValidationProvider>
                <div class='form-group'>
                  <v-row>
                    <v-col cols="3" sm="3" md="3" lg="3" xl="3" class='my-auto py-auto'>
                      <img height='100'
                           :src="!isEmpty(data.img_url) ? data.img_url : empty_url"
                           :alt="data.title"
                           class="ma-3"
                      />
                    </v-col>
                    <v-col cols="9" sm="9" md="9" lg="9" xl="9" class='my-auto py-auto'>
                      <v-file-input
                        label="Slayt Görseli"
                        id="img_url"
                        name="img_url"
                        type="file"
                        counter
                        show-size
                        clearable
                        outlined
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </div>
                <v-btn color="primary" type="submit">
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
  name: 'slides-update',
  middleware: ["auth","admin"],
  layout: 'admin',
  computed: {
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
        {name: "Slaytlar",url:"/panel/slides"},
        {name: "Slayt Düzenle"}
      ],
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null;
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + "panel/sliders/update/" + params.id
      );
      return data;
    } catch (e) {
      console.log(e)
      error({ message: "Slayt Bilgisi Bulunamadı.", statusCode: 404 });
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
    editSlides() {
      try {
        let formData = new FormData(this.$refs.slidesForm);
        this.$axios
          .post(
            process.env.apiBaseUrl + "panel/sliders/update/" + this.data._id,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data; boundary=" + formData._boundary
              }
            }
          )
          .then(response => {
            console.log(response)
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: "topCenter"
              });
              setTimeout(() => {
                window.location.href="/panel/slides";
              }, 2000);
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
    }
  }
}
</script>

<style scoped>

</style>
