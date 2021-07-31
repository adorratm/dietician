<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items' v-if="this.item"></Breadcrumb>
      <v-row v-if="loading">
        <v-col class="fill-height text-center" >
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
            class="mx-auto"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols='12' sm='12' md='7' lg='8' xl='9'>
          <v-card>
            <v-img
              width='100%'
              height='300'
              :src='recipe.img_url'
              alt=''
              contain
            />

            <v-card-title v-text="recipe.name">

            </v-card-title>
            <v-card-text>
<!--              <div class='d-flex flex-wrap'>-->
<!--                <v-text-field-->
<!--                  type='number'-->
<!--                  @input='changeValue'-->
<!--                  min='1'-->
<!--                  step='1'-->
<!--                  id='unit'-->
<!--                  name='unit'-->
<!--                  v-model='unit'-->
<!--                  label='Birim'-->
<!--                />-->
<!--                <v-autocomplete-->
<!--                  class='ml-3'-->
<!--                  @change='changeValue'-->
<!--                  return-object-->
<!--                  id='criteriaValue'-->
<!--                  :items='criterias'-->
<!--                  item-text='title'-->
<!--                  item-value='value'-->
<!--                  label='Ölçüt'-->
<!--                >-->
<!--                </v-autocomplete>-->

<!--                <v-autocomplete-->
<!--                  class='ml-3'-->
<!--                  @change='changeValue'-->
<!--                  return-object-->
<!--                  id='criteriaValue'-->
<!--                  :items='criterias'-->
<!--                  item-text='nutrient.name'-->
<!--                  item-value='nutrient.name'-->
<!--                  label='Besin'-->
<!--                >-->
<!--                </v-autocomplete>-->
<!--              </div>-->
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-text>
              <v-tabs
                show-arrows
              >
                <v-tab>
                  Besin Değerleri
                </v-tab>
                <v-tab>
                  Yemek Tarifi
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
                    <tr  v-for='(value) in recipe.recipesvalue'>
                      <td>{{ value.title }} ({{ value.type }})</td>
                      <td>{{ value.value }}</td>
                    </tr>
                    </tbody>
                  </v-simple-table>
                </v-tab-item>
                <v-tab-item eager>
                {{recipe.description}}

                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>

        </v-col>
        <v-col
          cols='12'
          sm='12'
          md='5'
          lg='4'
          xl='3'
        >
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
        </v-col>
      </v-row>
    </client-only>
  </v-container>
</template>


<script>
import Breadcrumb from "../../components/includes/Breadcrumb";
export default {
  components:{
    Breadcrumb
  },
  methods:{

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
    }
  },
  async mounted(){
    await this.$axios.get(process.env.apiBaseUrl+'recipes/details/'+this.$route.params.id)
    .then( res=>{
       this.recipe=res.data.data

      this.item=this.recipe.name
    })
    this.loading=false
    console.log(this.recipe)
  },
  data(){
    return{
      unit:100,
      item:'',
      recipe:[],
      loading:true,
    }
  },
  computed:{
    criterias(){
      return this.recipe.recipescriteriavalues;
    },
    values(){
      return this.recipe.recipesvalue
    },
    items(){
      return [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Yemek Tarifleri',
          disabled: false,
          href: '/recipes'
        },
        {
          text: this.item,
          disabled: true,
          href: 'javascript:void(0)'
        }
      ]
    }
  }
}
</script>


<style scoped>

</style>
