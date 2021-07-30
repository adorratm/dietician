<template>
  <v-container>
    <client-only>
      <v-card class='mb-3 text-center'>
        <v-card-title class='text-center justify-center'>
          Yemek Tarifleri
        </v-card-title>
        <v-card-subtitle>
          En Sağlıklı Yemek Tariflerini Keşfet
        </v-card-subtitle>
        <v-card-text>
          <img src='/img/kalori.jpg' class='mb-3'
               style='width: 100%;min-height: 225px;max-height:450px;object-fit: scale-down' alt=''>
            <v-text-field
              type='text'
              clearable
              @change='search()'
              v-model='searchText'
              placeholder='Yemek Tarifi Aramak İçin Buraya Yazın...'
            />
        </v-card-text>
      </v-card>





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
          <v-row v-if='recipes.length>0'>
            <client-only>
              <v-col
                cols='12'
                sm='12'
                md='12'
                lg='12'
                v-bind:key='index'
                v-for='(recipe, index) in recipes'
              >
                <v-card
                  :loading="loading"
                  class="mx-auto my-12"
                  md="12"
                >
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img
                    height="250"
                    :src="recipe.img_url"
                  ></v-img>

                  <v-card-title v-text="recipe.name"></v-card-title>

                  <v-card-text>
                    <v-row
                      align="center"
                      class="mx-0"
                    >

                      <div class="white--text font-weight-bold purple lighten-2 pa-4" v-text="recipe.calorie">

                      </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                      Porsiyon :{{recipe.portion}} - Hazırlanma Süresi:{{ recipe.prepare_time}}
                    </div>

                    <div v-text="recipe.description"></div>
                  </v-card-text>


                  <v-card-actions class="text-right">
                    <v-btn
                      color="deep-purple lighten-2"
                      text
                      class="text-right"
                    >
                      YEMEK DETAYLARI
                    </v-btn>
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
    </client-only>
  </v-container>
</template>

<script>
export default {
  async mounted() {
    await this.$axios.get(process.env.apiBaseUrl + "home/recipes").then(res => {
      this.setRecipess(res.data.data.data,res.data.data.links.length-2)
    })
    this.loading = false
  },
  methods: {
    async search() {
      this.loading=true
      this.searchText.length > 0 ? this.searchResultText=this.searchText+" ile ilgili yemek tarifleri" : this.searchResultText='Tüm Yemek Tarifleri'
      await this.$axios.post(process.env.apiBaseUrl + "home/searchrecipes"
        , {
          'searchText': this.searchText
        }).then(res => {
        this.setRecipess(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
    },
    setRecipess(data,totalpage){
      this.recipes=data
      this.pageLength=totalpage
    }

  },
  watch: {
    // async searchText() {
    //   this.loading = true
    //   await this.$axios.post(process.env.apiBaseUrl + "home/searchdieticians"
    //     , {
    //       'searchText': this.searchText
    //     }).then(res => {
    //     this.dieticians = res.data.data
    //   })
    //   this.loading = false
    //
    // },
    async page(){
      this.loading=true
      await this.$axios.get(process.env.apiBaseUrl+'home/recipes?page='+this.page).then(res=>{
        this.setRecipess(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
    }

  },
  data: () => ({
    searchResultText:'Tüm Yemek Tarifleri',
    searchText: '',
    pageLength:1,
    page:1,
    loading: true,
    recipes: [],
    items: [
    ],
  }),
}
</script>

<style scoped>

</style>
