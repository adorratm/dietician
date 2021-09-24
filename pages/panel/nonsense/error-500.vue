<template>
 <div>
<!-- Main Wrapper -->
<div class="main-wrapper" style="align-items: center !important;color: #1f1f1f !important;display: flex !important;">

            <div class="error-box">
				<h1>500</h1>
				<h3 class="h2 mb-3"><i class="fa fa-warning"></i> Oops! Something went wrong</h3>
				<p class="h4 font-weight-normal">The page you requested was not found.</p>
				<NuxtLink to="admin_index" class="btn btn-primary">Back to Home</NuxtLink>
			</div>
</div>
<!-- /Main Wrapper -->
  <Nuxt />
 </div>
</template>

<script>
export default {
    head: {
    title: 'Doccure - Error 500'
  },
  layout: 'notheader',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
