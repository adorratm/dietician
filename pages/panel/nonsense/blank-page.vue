<template>
 <div>
<!-- Page Wrapper -->
<div class="page-wrapper">
    <div class="content container-fluid">
    
        <!-- Page Header -->
        <div class="page-header">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="page-title">Blank Page</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                        <li class="breadcrumb-item active">Blank Page</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- /Page Header -->
        
        <div class="row">
            <div class="col-sm-12">
                Contents here
            </div>			
        </div>
        
    </div>			
</div>
<!-- /Page Wrapper -->
  <Nuxt />
 </div>
</template>

<script>
export default {
    head: {
    title: 'Doccure - Blank Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
