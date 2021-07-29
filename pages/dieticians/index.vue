<template>
  <v-card
    class="mx-auto"
  >

    <v-list three-line v-if="dieticians">
      <template v-for="(item,key) in dieticians">
        <v-subheader
          :key="key"
          v-text="item.department"
        ></v-subheader>


        <v-list-item
          :key="key"
        >
          <v-list-item-avatar>
            <v-img src="https://www.crushpixel.com/big-static7/preview4/vector-sign-diet-dietitian-hand-154597.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle class="d-flex justify-space-between" >
              <div>
                Telefon: {{item.phone}}
                Email: {{item.email}}<br>
                Poliklinik: {{item.hospitalName}}
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
  </v-card>
</template>

<script>
export default {
  async mounted(){
     await this.$axios.get(process.env.apiBaseUrl+"home/dieticians").then(res=>{
      this.dieticians=res.data.data
    })
    console.log(this.dieticians)
  },
  data: () => ({
    dieticians:[],
    items: [
      { header: 'Diyetisyenler ' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
}
</script>

<style scoped>

</style>
