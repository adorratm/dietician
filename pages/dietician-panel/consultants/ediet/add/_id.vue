<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            @submit.prevent="handleSubmit(saveEdiet)"
            ref="edietForm"
            enctype="multipart/form-data"
          >
            <v-stepper v-model="e1">
              <v-stepper-header>

                <v-stepper-step :complete="e1 > 0" step="1">
                  Kalori Hesabı
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 1" step="2">
                  Menü Planlama
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="3">
                  Diyet Listesi
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>

                <v-stepper-content step="1">
                  <v-btn color="primary" role="button" @click.prevent="e1 = 2">
                    İlerle
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <ValidationProvider
                    name="Öğün"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <v-select
                        name="meals[]"
                        v-model="selectedMeals"
                        :items="meals"
                        label="Öğün Seçin"
                        item-text="name"
                        item-value="_id"
                        return-object
                        multiple
                      >
                        <template v-slot:prepend-item>
                          <v-list-item ripple @click="toggle">
                            <v-list-item-action>
                              <v-icon
                                :color="
																	!isEmpty(selectedMeals) &&
																	selectedMeals.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                              >
                                {{ icon }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Tümünü Seç
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                        <template v-slot:item="data">
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-select>
                      <small class="font-weight-bold text-danger">{{
                          errors[0]
                        }}</small>
                    </div>
                  </ValidationProvider>
                  <v-btn color="primary" role="button" @click.prevent="e1 = 3">
                    İlerle
                  </v-btn>
                  <v-btn
                    color='info'
                    role="button"
                    @click.prevent="e1 = 1"
                  >
                    Geri Dön
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-btn
                    color='info'
                    role="button"
                    @click.prevent="e1 = 2"
                  >
                    Geri Dön
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </form>
        </ValidationObserver>
      </v-card>
    </client-only>
  </v-container>

</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Breadcrumb from '@/components/includes/Breadcrumb'
export default {
  middleware: ["auth","dietician"],
  layout: "dietician",
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl;
    },
    likesAllMeal() {
      return (
        !this.isEmpty(this.selectedMeals) &&
        !this.isEmpty(this.meals) &&
        this.selectedMeals.length === this.meals.length
      );
    },
    likesSomeMeal() {
      return (
        !this.isEmpty(this.selectedMeals) &&
        this.selectedMeals.length > 0 &&
        !this.likesAllMeal
      );
    },
    icon() {
      if (this.likesAllMeal) return "mdi-close-box";
      if (this.likesSomeMeal) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  data() {
    return {
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyen Paneli',
          disabled: false,
          href: '/dietician-panel/'
        },
        {
          text: 'Danışanlarım',
          disabled: false,
          href: '/dietician-panel/consultants'
        },
        {
          text: 'E-Diyet Oluştur',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      e1: 1,
      disease: null,
      diseases: [],
      selectedDiseases: [],
      recipe: null,
      recipes: [],
      ageGroups: ["0+", "1+", "10+", "18+"],
      selectedAgeGroups: [],
      selectedMeals: [],
      meals:[],
      userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
        ? this.$auth.$storage.getUniversal("user")
        : null,
      ogbki: null,
      size: null,
      calorie: null,
    };
  },
  mounted() {
    this.calcCalorie()
  },
  validate({ params }) {
    return params.id !== null ? params.id : null;
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + "dietician/e-diets/create/" + params.id
      );
      console.log(data);
      return data.data;
    } catch (e) {
      error({ message: "Danışan Bilgisi Bulunamadı.", statusCode: 404 });
    }
  },
  methods: {
    /**
     * This Function Will Be Remove
     */
    calcCalorie(){
      this.ogbki = parseInt(this.user.weight)/(parseInt(this.user.size)*parseInt(this.user.size))*10000
      console.log(this.ogbki)
      this.calorie = this.ogbki*parseInt(this.user.size)*parseInt(this.user.size)/10000
      console.log(this.calorie)
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllMeal) {
          this.selectedMeals = [];
        } else {
          this.selectedMeals = [];
          this.meals.forEach((el, index) => {
            this.selectedMeals.push(el._id);
          });
        }
      });
    },
    isEmpty(obj) {
      if (typeof obj == "number") return false;
      else if (typeof obj == "string") return obj.length === 0;
      else if (Array.isArray(obj)) return obj.length === 0;
      else if (typeof obj == "object")
        return obj == null || Object.keys(obj).length === 0;
      else if (typeof obj == "boolean") return false;
      else return !obj;
    },
  }
};
</script>
