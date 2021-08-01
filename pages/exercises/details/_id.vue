<template>
  <div>
    <Breadcrumb :items="items" color="purple" v-if="item"></Breadcrumb>
    <v-row class="fill-height align-center" v-if="loading">
      <v-col class="fill-height text-center align-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
          class="mx-auto"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col md="12">
        <v-card
          elevation="24"
          class="mx-auto"
        >
          <v-system-bar lights-out></v-system-bar>
          <v-carousel
            :continuous="true"
            :cycle="true"
            :show-arrows="true"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            max-height="450"
          >

            <v-carousel-item
              v-for="image in exercise.images" :key="image._id"
            >
              <v-img :src="img_url+image.img_url"></v-img>

            </v-carousel-item>
          </v-carousel>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                                   v-text="exercise.data.name+' - '+exercise.data.category.name"></v-list-item-title>
                <div class="my-3">{{ exercise.data.description }}</div>
              </v-list-item-content>
              <v-list-item-action>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/includes/Breadcrumb";

export default {
  components: {Breadcrumb},
  async mounted() {

    await this.$axios.get(process.env.apiBaseUrl + "exercises/" + this.$route.params.id)
      .then(res => {
        this.exercise = res.data
        this.item = res.data.data.name
      })
    this.loading = false
    console.log(this.exercise)
  },
  data() {
    return {
      item: '',
      exercise: [],
      loading: true,
    }
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    items() {
      return [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Egzersizler',
          disabled: true,
          href: '/exercises'
        },
        {
          text: this.exercise.data.category.name,
          disabled: false,
          href: '/recipes/' + this.exercise.data.category.slug
        },
        {
          text: this.item,
          disabled: true,
          href: '/recipes'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
