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
            <ValidationObserver v-slot='{ handleSubmit }'>
              <form
                @submit.prevent='handleSubmit(editBlogCategories)'
                ref='blogCategoriesForm'
                enctype='multipart/form-data'
              >
                <v-stepper flat v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Makale Kategorisi Bilgileri
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content class='px-0' step='1'>
                      <ValidationProvider
                        name='Makale Kategorisi'
                        rules='required'
                        v-slot='{ errors }'
                      >
                        <v-text-field
                          label='Makale Kategorisi'
                          id='title'
                          type='text'
                          name='title'
                          v-model='data.title'
                          clearable
                          outlined
                          hide-details
                        />
                        <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                          {{ errors[0] }}
                        </v-alert>
                      </ValidationProvider>
                      <v-btn
                        color='primary'
                        class='mt-2'
                        type='submit'
                      >
                        Makale Kategorisini Güncelle
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
  name: 'blog-categories-update',
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
        {name: "Makale Kategorisi Düzenle"}
      ],
      e1: 1,
      searchTitle: null,
      loading: false,
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'panel/blog-categories/update/' + params.id
      )

      return data
    } catch (e) {
      console.log(e)
      error({ message: 'Makale Kategorisi Bulunamadı.', statusCode: 404 })
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
    editBlogCategories() {
      try {
        let formData = new FormData(this.$refs.blogCategoriesForm)
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'panel/blog-categories/update/' +
            this.data.id,
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary,
              }
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
              setTimeout(() => {
                window.location.href ='/panel/blog-categories'
              }, 2000)
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch(err => console.log(err))
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
