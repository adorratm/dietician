<template>
  <div>
    <Breadcrumb :items="items"></Breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/includes/Breadcrumb";
export default {
  components: {Breadcrumb},
  computed:{
    items(){
      return [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyenler',
          disabled: false,
          href: 'javascript:void(0)'
        },
        {
          text: this.$route.params.id,
          disabled: false,
          href: 'javascript:void(0)'
        },
        {
          text: 'Randevu Al',
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
