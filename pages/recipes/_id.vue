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
              label='Besin Aramak İçin "Enter" Tuşuna Basın...'
              v-model='searchText'
              @keyup.enter='search'
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
              <img v-if='!isEmpty(recipe)'
                     width='100%'
                     height='300'
                     :src='recipe.img_url'
                     :alt='recipe.name'
                   style='object-fit: scale-down'
              />

              <v-card-title>
                "{{ recipe.name }}" Besini Hakkında Detaylı Bilgiler
              </v-card-title>
              <v-card-text>
                <v-tabs
                  show-arrows
                >
                  <v-tab>
                    Besin Değerleri
                  </v-tab>
                  <v-tab>
                    Açıklama
                  </v-tab>
                  <v-tab-item eager>
                    <v-simple-table>
                      <thead>
                      <tr>
                        <th class='font-weight-bold'>
                          Besin Değeri Adı
                        </th>
                        <th>
                          Besin Değeri
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-if='!isEmpty(recipe.recipescriteriavalues)' v-for='(value) in recipe.recipescriteriavalues'>
                        <td>{{ value.title }} ({{ value.type }})</td>
                        <td>{{ value.value }}</td>
                      </tr>
                      </tbody>
                    </v-simple-table>
                  </v-tab-item>
                  <v-tab-item eager>

                    {{ recipe.description }}
                  </v-tab-item>
                </v-tabs>
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
    recipe:[],
    loading:true,
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Yemek Tarifleri", url:"/recipes"}
    ]
  }),
  async mounted(){
    await this.getData()
  },
  computed: {
    currentPath() {
      return this.$route.name
    },
    criterias(){
      return this.recipe.recipescriteriavalues;
    },
    values(){
      return this.recipe.recipesvalue
    },
  },
  methods: {
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    changeValue: function(item) {
      this.criteriaValue = item.value
      this.criteriaName = item.title
      this.type = item.type
      if (this.values.length > 0) {
        for (let i = 0; i < this.values.length; i++) {
          this.recipe.recipesvalue[i].value =
            (this.values[i].value / 100) *
            ((this.unit <= 1 ? (this.unit = 1) : this.unit) *
              this.criteriaValue)
          if (
            this.isEmpty(this.recipe.recipesvalue[i].value) ||
            isNaN(this.recipe.recipesvalue[i].value)
          ) {
            this.recipe.recipesvalue[i].value = this.values[i].value
          }
        }
      }
    },
    search(){
      this.$router.push("/recipes?search="+this.searchText)
    },
    async getData() {
      await this.$axios.get(process.env.apiBaseUrl+'recipes/details/'+this.$route.params.id)
        .then( res=>{
          this.recipe=res.data.data

          this.item=this.recipe.name
          this.breadCrumbItems.push({name: this.item})
        })
      this.loading=false
      console.log(this.recipe)
    }
  }
}
</script>
