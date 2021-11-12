<template>
  <div>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems'/>
        <!-- /Page Header -->

        <!-- General -->

        <v-card>
          <v-card-text>
            <ValidationObserver v-slot='{ handleSubmit }'>
              <form
                @submit.prevent='handleSubmit(saveBlogs)'
                ref='blogsForm'
                enctype='multipart/form-data'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Makale Bilgileri
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        name='Makale Adı'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-text-field
                            label='Makale Adı'
                            name='title'
                            v-model='inputData.title'
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
                        name='Makale Kategorisi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <v-autocomplete
                            label='Makale Kategorisi'
                            name='category_id'
                            v-model='inputData.category_id'
                            :items='allBlogCategories'
                            item-text='title'
                            item-value='id'
                            clearable
                            hide-details
                            outlined
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </div>
                      </ValidationProvider>
                      <ValidationProvider
                        name='Makale Açıklaması'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <div class='form-group'>
                          <editor
                            name="content"
                            id="content"
                            v-model="inputData.content"
                            api-key="4k2d9sks5ilhim6ju45ur7arp4pgn7o4u4asffie8cxttyu8"
                            :init="{
                          placeholder:'Makele Açıklaması',
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
                      <ValidationProvider name="Makale Görseli" rules="required" v-slot='{errors}'>
                        <v-file-input
                          label='Makale Görseli'
                          v-model='inputData.featureimage'
                          id='featureimage'
                          type='file'
                          ref='featureimage'
                          name='featureimage'
                          clearable
                          outlined
                        />
                        <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                          {{ errors[0] }}
                        </v-alert>
                      </ValidationProvider>
                      <v-btn
                        color='primary'
                        type='submit'
                      >
                        Makaleyi Kaydet
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
    <Nuxt/>
  </div>
</template>

<script>
import Breadcrumb from "~/components/backend/breadcrumb"
import {ValidationObserver, ValidationProvider} from "vee-validate";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor,
  },
  name: 'blog-add',
  middleware: ["auth", "dietician"],
  layout: 'dietician',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    user() {
      return this.$auth.user
    }
  },
  data() {
    return {
      breadCrumbItems: [
        {name: "Anasayfa", url: "/dietician-panel"},
        {name: "Makalelerim", url: "/dietician-panel/blogs"},
        {name: "Makale Ekle"}
      ],
      e1: 1,
      inputData: {
        title: null,
        content: null,
        id: null,
        category_id: null,
        unit: null,
        featureimage:null,
      },
      data: [],
      allBlogCategories: [],
      loading: false,
    }
  },
  methods: {
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
      } catch (e) {
        console.log(e)
      }
    },
    getBlogCategories() {
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}dietician/blog/create`)
          .then(response => {
            this.allBlogCategories = response.data.data
          })
          .catch(err => console.log(err))
      } catch (e) {
        console.log(e)
      }
    },
    saveBlogs() {
      try {
        let formData = new FormData(this.$refs.blogsForm)
        formData.delete("category_id");
        formData.append("category_id",this.inputData.category_id)
        this.$axios
          .post(process.env.apiBaseUrl + 'dietician/blog/create', formData, {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=' + formData._boundary
            },
          })
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch(err => console.log(err))
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.getBlogCategories();
  },
}
</script>

<style scoped>

</style>
