<template>
<div>
  <!-- Page Header -->
  <div class="page-header">
    <div class="row">
      <div class="col-sm-12">
        <h3 class="page-title">{{ last.name }}</h3>
        <ul class="breadcrumb">
          <li class="breadcrumb-item" v-for='(item,index) in items' v-if='!isEmpty(item.url)'><NuxtLink :to="item.url" rel='dofollow' :title='item.name'>{{ item.name }}</NuxtLink></li>
          <li class="breadcrumb-item active">{{last.name}}</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- /Page Header -->
</div>
</template>

<script>
export default {
  name: 'breadcrumb',
  props:["items"],
  computed:{
    last(){
      return this.items.slice(-1)[0];
    }
  },
  methods:{
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
  }
}
</script>

<style scoped>

</style>
