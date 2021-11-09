<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->


    <!-- Page Content -->
    <div class='content'>
      <div class='container'>
        <div class='row'>
          <!-- Content Left -->
          <div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8'>
            <v-text-field
              label='Egzersiz Kategorisi Aramak İçin "Enter" Tuşuna Basın...'
              v-model='searchText'
              @change='search'
              solo
              clearable
            ></v-text-field>

            <div class='mx-auto justify-center flex-wrap align-center text-center d-flex flex-column' v-if='isEmpty(recipe)'>
              <v-progress-circular
                :size='70'
                :width='7'
                color='purple'
                indeterminate
                class='mx-auto d-block'
              ></v-progress-circular>
              <h3 class='mx-auto d-block mt-3'>İçerik Yükleniyor. Lütfen Bekleyin...</h3>
            </div>
            <v-card>
              <v-card-title class='justify-center'>
                {{ searchResultText }}
              </v-card-title>
              <v-card-text v-if="loading" class="text-center">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
                  class="mx-auto"
                ></v-progress-circular>
              </v-card-text>
              <v-card-text v-else>
                <v-row v-if='exercisecategories.length>0'>
                  <client-only>
                    <v-col
                      cols='12'
                      sm='12'
                      md='6'
                      lg='4'
                      xl='3'
                      v-bind:key='index'
                      v-for='(exercisecategory, index) in exercisecategories'
                    >
                      <v-card>
                        <nuxt-link  v-bind:to='"/exercises/details/" + exercisecategory.slug'>
                          <v-img
                            height='300'
                            :aspect-ratio='16/9'
                            :alt='exercisecategory.name'
                            :src='exercisecategory.exercises.img_url'
                            :lazy-src='exercisecategory.exercises.img_url'
                          />
                        </nuxt-link>
                        <v-card-title>
                          <nuxt-link class="purple--text" v-bind:to='"/exercises/details/" + exercisecategory.slug'>{{
                              exercisecategory.name
                            }}
                          </nuxt-link>
                        </v-card-title>
                        <!--                  <v-card-text one-line>-->
                        <!--                    {{ exercisecategory.description }}-->
                        <!--                  </v-card-text>-->
                        <v-card-actions>
                          <v-btn
                            v-bind:to='"/exercises/details/" + exercisecategory.slug'
                            color='purple'
                            block
                            class="white--text"
                          >Egzersiz Detayları
                          </v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </client-only>
                </v-row>
                <v-pagination
                  color='purple'
                  class='my-3'
                  v-model='page'
                  :length='pageLength'
                  total-visible='11'
                ></v-pagination>
              </v-card-text>
            </v-card>
          </div>
          <!-- /Content Left -->
          <!-- Content Right -->
          <div class='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
            <v-card class="mb-4">
              <v-card-title>
                MALZEMELER
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                  <thead>
                  <tr>
                    <td class='text-center'>Ölçüt</td>
                    <td class='text-center'>Birim</td>
                    <td>Besin</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="criteria in recipe.recipescriteriavalues">
                    <td class='text-left'>
                      {{ criteria.value }}
                    </td>
                    <td class='text-center'>
                      {{criteria.title}}
                    </td>
                    <td>
                      {{ criteria.nutrient.name}}
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>

                  </tr>
                  </tfoot>
                </v-simple-table>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title>
                ÖZELLİKLER
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                  <thead>
                  <tr>
                    <td class='text-left'>Özellik</td>
                    <td class='text-center'>Değer</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Kalori
                    </td>
                    <td>{{ recipe.calorie}}
                    </td>
                  </tr>
                  <tr>

                    <td>Porsiyon
                    </td>
                    <td>{{ recipe.portion}}
                    </td>
                  </tr>
                  <tr>

                    <td>Pişirme Süresi
                    </td>
                    <td>{{ recipe.cooking_time}}
                    </td>
                  </tr>

                  <tr>

                    <td>Toplam Hazırlanma Süresü
                    </td>
                    <td>{{ recipe.prepare_time}}
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>

                  </tr>
                  </tfoot>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </div>
          <!-- /Content Right -->
        </div>
        <!-- /row-->
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import NutrientList from '~/components/frontend/nutrient-list'
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  layout: 'default',
  name:"recipe-detail",
  components: {
    NutrientList,
    Breadcrumb
  },
  data: () => ({
    searchText: null,
    unit:100,
    item:'',
    pageLength:1,
    page:1,
    loading: true,
    exercisecategories: [],
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Yemek Tarifleri", url:"/recipes"}
    ]
  }),
  async mounted(){
    await this.getData()
  },
  computed: {
  },
  watch: {
    async page(){
      this.loading=true
      await this.$axios.get(process.env.apiBaseUrl+'home/categoryexercises/'+this.$route.params.id+'?page='+this.page).then(res=>{
        this.setExercisecategories(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
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
      }catch (e){
        console.log(e)
      }
    },
    async search() {
      this.loading=true
      this.searchText.length > 0 ? this.searchResultText=this.searchText : this.searchResultText='Tüm Egzersizler'
      await this.$axios.post(process.env.apiBaseUrl + "home/searchcategoryexercises/"+this.$route.params.id
        , {
          'searchText': this.searchText
        }).then(res => {
        this.setExercisecategories(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
    },
    setExercisecategories(data,totalpage){
      this.exercisecategories=data
      this.pageLength=totalpage
    },





    search(){
      try {
        this.$router.push("/recipes?search="+this.searchText)
      }catch (e) {
        console.log(e)
      }
    },
    async getData() {
      try {
        await this.$axios.get(process.env.apiBaseUrl+'home/categoryexercises/'+this.$route.params.id)
          .then( res=>{
            this.exercisecategories=res.data.data
            this.item=this.exercisecategories.name
            this.breadCrumbItems.push({name: this.item})
          }).catch(err => console.log(err)).finally(()=>{this.loading=false})
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
