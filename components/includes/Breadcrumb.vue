<template>
  <v-card class='mb-3 pb-0' color='#15558d'>
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
</template>

<script>
export default {
  props: ['items','settings'],
}
</script>

<style scoped>

</style>
