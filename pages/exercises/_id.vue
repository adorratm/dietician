<template>
  <v-container>
    <client-only>
      <v-card class='mb-3 text-center'>
        <v-card-title class='text-center justify-center'>
          {{ categoryname }}
        </v-card-title>
        <v-card-subtitle>
          Egzersize Hemen Başla!
        </v-card-subtitle>
        <v-card-text>
          <img src='/img/exercisess.jpeg' class='mb-3'
               style='width: 100%;min-height: 225px;max-height:450px;object-fit: scale-down' alt=''>
          <v-text-field
            type='text'
            clearable
            @change='search()'
            v-model='searchText'
            placeholder='Bu Kategoride Egzersiz Arayın'
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
                  <v-card-text>
                    {{ exercisecategory.description }}
                  </v-card-text>
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
    </client-only>
  </v-container>
</template>

<script>
export default {
  async mounted() {
    await this.$axios.get(process.env.apiBaseUrl + "home/categoryexercises/"+this.$route.params.id).then(res => {
      this.setExercisecategories(res.data.data.data,res.data.data.links.length-2)
    })
    this.categoryname=this.exercisecategories[0].category.name
    console.log(this.exercisecategories)
    this.loading = false
  },
  methods: {
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
      await this.$axios.get(process.env.apiBaseUrl+'home/categoryexercises/'+this.$route.params.id+'?page='+this.page).then(res=>{
        this.setExercisecategories(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
    }

  },
  data: () => ({
    searchResultText:'Tüm Egzersiz Kategorileri',
    searchText: '',
    pageLength:1,
    page:1,
    loading: true,
    exercisecategories: [],
    categoryname:'Egzersizler',
    items: [
    ],
  }),
}
</script>

<style scoped>

</style>
