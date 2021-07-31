<template>
  <client-only>
    <v-card class='mb-3 pb-0' v-if="color" :color='color'>
      <v-card-text class='pa-0'>
        <v-breadcrumbs
          large
          divider='/'
          :items='items'
        >
          <template v-slot:divider>
            <v-icon class='white--text'>mdi-forward</v-icon>
          </template>
          <template v-slot:item='{item}'>
            <v-breadcrumbs-item :href='item.href' :disabled='item.disabled'><a class='white--text'>{{ item.text }}</a>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-card-text>
    </v-card>
    <v-card class='mb-3 pb-0' v-else color='#15558d'>
      <v-card-text class='pa-0'>
        <v-breadcrumbs
          large
          divider='/'
          :items='items'
        >
          <template v-slot:divider>
            <v-icon class='white--text'>mdi-forward</v-icon>
          </template>
          <template v-slot:item='{item}'>
            <v-breadcrumbs-item :href='item.href' :disabled='item.disabled'><a class='white--text'>{{ item.text }}</a>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-card-text>
    </v-card>
  </client-only>
</template>

<script>
export default {
  props: ['items','settings','color'],
}
</script>

<style scoped>

</style>
