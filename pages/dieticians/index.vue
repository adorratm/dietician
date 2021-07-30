<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            label="Diyetisyen Ara"
            filled
            v-model="searchText"
            @change="search"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="text-center"
           v-if="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
          class="mx-auto"
        ></v-progress-circular>
      </div>
      <v-card
        v-else
        class="mx-auto pb-4"

      >

        <div v-if="dieticians.length>0 && loading==false">
          <v-list three-line>
            <template v-for="(item,key) in dieticians">
              <v-subheader
                :key="item.name"
                v-text="item.department"
              ></v-subheader>


              <v-list-item
                :key="key"
              >
                <v-list-item-avatar>
                  <v-img
                    src="https://www.crushpixel.com/big-static7/preview4/vector-sign-diet-dietitian-hand-154597.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.name"></v-list-item-title>
                  <v-list-item-subtitle class="d-flex justify-space-between">
                    <div>
                      Telefon: {{ item.phone }}
                      Email: {{ item.email }}<br>
                      Poliklinik: {{ item.hospitalName }}
                    </div>
                    <div>
                      <v-btn
                        depressed
                        color="primary"
                      >
                        Randevu Al
                      </v-btn>
                    </div>

                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>


          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pageLength"
              circle
            ></v-pagination>
          </div>
        </div>
        <div v-else class="text-center"> Uygun Sonuç Bulunamadı</div>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
import Breadcrumb from '@/components/includes/Breadcrumb'
export default {
  components:{
    Breadcrumb
  },
  async mounted() {
    await this.$axios.get(process.env.apiBaseUrl + "home/dieticians").then(res => {
      this.setDieticianss(res.data.data.data,res.data.data.links.length-2)
    })
    this.loading = false
  },
  methods: {
    async search() {
      this.loading=true
      await this.$axios.post(process.env.apiBaseUrl + "home/searchdieticians"
        , {
          'searchText': this.searchText
        }).then(res => {
        this.setDieticianss(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
    },
    setDieticianss(data,totalpage){
      this.dieticians=data
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
       await this.$axios.get(process.env.apiBaseUrl+'home/dieticians?page='+this.page).then(res=>{
         this.setDieticianss(res.data.data.data,res.data.data.links.length-2)
      })
      this.loading=false
    }

  },
  data: () => ({
    searchText: '',
    pageLength:1,
    page:1,
    loading: true,
    dieticians: [],
    items: [
      {
        text: 'Anasayfa',
        disabled: false,
        href: '/'
      },
      {
        text: 'Diyetisyenler',
        disabled: true,
        href: 'javascript:void(0)'
      }
    ],
  }),
}
</script>

<style scoped>

</style>
