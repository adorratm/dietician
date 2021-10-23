<template>
  <div>
    <v-simple-table
      class='mb-2'
      v-bind:key='index'
      v-for='(criteria, index) in criterias'
    >
      <thead>
      <tr>
        <th colspan='2' class='text-center text-h6 font-weight-bold'>
          <nuxt-link v-bind:to="'calorie/' + criteria.slug" rel='dofollow' :title='criteria.name' :data-title='criteria.name'>
            {{ criteria.name }}
          </nuxt-link>
        </th>
      </tr>
      <tr>
        <th class='text-break text-h6 font-weight-bold' scope='col'>Ölçüt</th>
        <th class='text-break text-h6 font-weight-bold' scope='col'>Ölçüt Değeri</th>
      </tr>
      </thead>
      <tbody>
      <client-only>
        <tr
          v-bind:key='index'
          v-for='(value, index) in criteria.criteria_values'
        >
          <td class='text-break'>{{ value.title }}</td>
          <td class='text-break'>
            {{ value.value }} {{ value.type }}
          </td>
        </tr>
      </client-only>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'criteria-list',
  props:['criterias','emptyurl'],
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      try {
        if (typeof obj == 'number') return false
        else if (typeof obj == 'string') return obj.length === 0
        else if (Array.isArray(obj)) return obj.length === 0
        else if (typeof obj == 'object')
          return obj == null || Object.keys(obj).length === 0
        else if (typeof obj == 'boolean') return false
        else return !obj
      }catch (e){
        console.log(e)
      }
    },
  }
}
</script>

<style scoped>

</style>
