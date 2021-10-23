<template>
<div>
  <!-- Breadcrumb -->
  <div class="breadcrumb-bar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-12 col-12">
          <nav aria-label="breadcrumb" class="page-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item" v-for='(item,index) in items' v-if='!isEmpty(item.url)'><NuxtLink :to="item.url" rel='dofollow' :title='item.name'>{{ item.name }}</NuxtLink></li>
              <li class="breadcrumb-item active" aria-current="page">{{last.name}}</li>
            </ol>
          </nav>
          <h2 class="breadcrumb-title">{{ last.name }}</h2>
        </div>
      </div>
    </div>
  </div>
  <!-- /Breadcrumb -->
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
