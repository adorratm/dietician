<template>
  <v-container>
  <client-only>
      <v-card  class='mb-3 pb-0' color='#15558d'>
        <v-card-text class='pa-0'>
          <v-breadcrumbs
            large
            divider='/'
            :items="items"
          >
            <template v-slot:divider>
              <v-icon class="white--text">mdi-forward</v-icon>
            </template>
            <template v-slot:item='{item}'>
              <v-breadcrumbs-item :href='item.href' :disabled='item.disabled'><a class="white--text" >{{item.text}}</a></v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-card-text>
      </v-card>
      <v-card  class='mb-3 text-center'>
        <v-card-title class='text-center justify-center'>
          Besin Ara
        </v-card-title>
        <v-card-subtitle>
          En Sağlıklı Besinleri Keşfet
        </v-card-subtitle>
        <v-card-text>
          <img src='/img/kalori.jpg' class='mb-3' style='width: 100%;min-height: 225px;max-height:450px;object-fit: scale-down' alt=''>
          <form onsubmit="return false">
            <v-text-field
              type="text"
              clearable
              v-on:keyup.prevent="getNutrients()"
              v-model="search"
              placeholder="Besin Aramak İçin Buraya Yazın..."
            />
          </form>
        </v-card-text>
      </v-card>
    <v-card>
      <v-card-title class='justify-center'>
        {{ !isEmpty(search) ? "\""+search+"\" Aramasıyla İle İlgili Besinler" : "Tüm Besinler" }}
      </v-card-title>
      <v-card-text>
        <v-row v-if="!isEmpty(nutrients)">
          <client-only>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              xl="3"
              v-bind:key="index"
              v-for="(nutrient, index) in nutrients"
            >
              <v-card>
                <v-card-title>
                  test
                </v-card-title>
                <v-card-text>

                </v-card-text>
              </v-card>
              <div class="profile-widget">
                <div class="doc-img">
                  <nuxt-link v-bind:to="/calorie/ + nutrient.slug">
                    <img
                      height="300"
                      v-bind:alt="nutrient.name"
                      v-bind:src="
															img_url +
																(!isEmpty(nutrient.nutrients) &&
																!isEmpty(nutrient.nutrients.img_url)
																	? nutrient.nutrients.img_url
																	: empty_url)
														"
                    />
                  </nuxt-link>
                </div>
                <div class="pro-content">
                  <h3 class="title">
                    <nuxt-link v-bind:to="/calorie/ + nutrient.slug">{{
                        nutrient.name
                      }}</nuxt-link>
                  </h3>
                  <p class="speciality">{{ nutrient.description }}</p>

                  <v-row>
                    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                      <v-btn
                        v-bind:to="/calorie/ + nutrient.slug"
                        color="primary"
                      >Besin Detayı</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </client-only>
        </v-row>
        <v-pagination
          color="success"
          class="my-3"
          v-model="pagination.current"
          :length="pagination.total"
          @input="onPageChange"
          total-visible="11"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: "index",
  computed: {
    img_url() {
      return process.env.apiPublicUrl;
    }
  },
  methods: {
    isEmpty(obj) {
      if (typeof obj == "number") return false;
      else if (typeof obj == "string") return obj.length === 0;
      else if (Array.isArray(obj)) return obj.length === 0;
      else if (typeof obj == "object")
        return obj == null || Object.keys(obj).length === 0;
      else if (typeof obj == "boolean") return false;
      else return !obj;
    },
    getNutrients(param) {
      if (this.search !== null) {
        this.$store
          .dispatch("getNutrients", {
            nutrientsURL:
              "nutrients?page=" +
              this.pagination.current +
              "&search=" +
              decodeURIComponent(this.search)
          })
          .then(response => {
            this.emptyUrl = this.$store.state.emptyUrl;
            this.nutrients = this.$store.state.nutrients.data;
            this.pagination.current = this.$store.state.nutrients.current_page;
            this.pagination.total = this.$store.state.nutrients.last_page;
          });
      } else {
        if (param) {
          this.$store
            .dispatch("getNutrients", { nutrientsURL: param })
            .then(response => {
              this.emptyUrl = this.$store.state.emptyUrl;
              this.nutrients = this.$store.state.nutrients.data;
              this.pagination.current = this.$store.state.nutrients.current_page;
              this.pagination.total = this.$store.state.nutrients.last_page;
            });
        } else {
          this.$store
            .dispatch("getNutrients", {
              nutrientsURL: "nutrients?page=" + this.pagination.current
            })
            .then(response => {
              this.emptyUrl = this.$store.state.emptyUrl;
              this.nutrients = this.$store.state.nutrients.data;
              this.pagination.current = this.$store.state.nutrients.current_page;
              this.pagination.total = this.$store.state.nutrients.last_page;
            });
        }
      }
    },
    onPageChange() {
      this.getNutrients();
    }
  },
  data() {
    return {
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/',
        },
        {
          text: 'Kaç Kalori?',
          disabled: false,
          href: 'javascript:void(0)',
        },
      ],
      nutrients: [],
      search: null,
      empty_url: null,
      pagination: {
        current: 1,
        total: 1
      }
    };
  },
  mounted() {
    this.getNutrients();
  }
};
</script>

<style scoped>

</style>
