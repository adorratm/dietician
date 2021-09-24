<template>
 <div>
	<!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Add Blog</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                            <li class="breadcrumb-item"><a href="javascript:(0);">Pages</a></li>
                            <li class="breadcrumb-item active">Add Blog</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- /Page Header -->

            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body custom-edit-service">

                            <div class="row mb-5">
                            <div class="col">
                                <ul class="nav nav-tabs nav-tabs-solid">
                                    <li class="nav-item">
                                        <NuxtLink class="nav-link" to="blog">Acitive Blog</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink class="nav-link" to="pending-blog">Pending Blog</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-auto">
                                <NuxtLink class="btn btn-primary btn-sm" to="add-blog"><i class="fas fa-plus mr-1"></i> Add Blog</NuxtLink>
                            </div>
                        </div>

                        <!-- Add Blog -->
                        <form method="post" enctype="multipart/form-data" autocomplete="off" id="update_service" action="blog.html">
                            <input type="hidden" name="csrf_token_name" value="0146f123a4c7ae94253b39bca6bd5a5e">

                            <div class="service-fields mb-3">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label>Blog Title <span class="text-danger">*</span></label>
                                            <input type="hidden" name="service_id" id="service_id" value="18">
                                            <input class="form-control" type="text" name="service_title" id="service_title" value="Doccure – Making your clinic painless visit?" required="">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="service-fields mb-3">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Category <span class="text-danger">*</span></label>
                                            <select class="form-control" name="category" required="">
                                                <option value="1">Automobile</option>
                                                <option value="2" selected="selected">Construction</option>
                                                <option value="3">Interior</option>
                                                <option value="4">Cleaning</option>
                                                <option value="5">Electrical</option>
                                                <option value="6">Carpentry</option>
                                                <option value="7">Computer</option>
                                                <option value="8">Painting</option>
                                                <option value="9">Car Wash</option>
                                                <option value="10">Category Test</option>
                                                <option value="11">dfdf</option>
                                                <option value="12">Equipment</option>
                                                <option value="13">Test category1</option>
                                                <option value="14">Farming</option>
                                                <option value="15">Test Category02</option>
                                                <option value="16">Laundry</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Sub Category <span class="text-danger">*</span></label>
                                            <select class="form-control" name="subcategory">
                                            <option value="5">Others</option>
                                            <option value="6">Others</option>
                                            <option value="7">Others</option>
                                            <option value="8">House cleaning</option>
                                            <option value="9">Others</option>
                                            <option value="10">Others</option>
                                            <option value="11">Others</option>
                                            <option value="12">Others</option>
                                            <option value="13">Full Car Wash</option>
                                            <option value="14" selected="selected">Testing category</option>
                                            <option value="15">Test Sub category</option>
                                            <option value="16">Harvesting pine</option>
                                            <option value="17">Test Sub category name</option>
                                            <option value="18">Test Sub category name</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="service-fields mb-3">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label>Descriptions <span class="text-danger">*</span></label>
                                            <textarea id="about" class="form-control service-desc" name="about">note.</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="service-fields mb-3">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="service-upload">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <span>Upload Blog Images *</span>
                                            <input type="file" name="images[]" id="images" multiple="" accept="image/jpeg, image/png, image/gif,">

                                        </div>
                                        <div id="uploadPreview">
                                            <ul class="upload-wrap">
                                                <li>
                                                    <div class=" upload-images">
                                                        <img alt="Blog Image" src='../../../assets/admin_img/profiles/avatar-17.jpg'>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class=" upload-images">
                                                        <img alt="Blog Image" src='../../../assets/admin_img/profiles/avatar-17.jpg'>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class=" upload-images">
                                                        <img alt="Blog Image" src='../../../assets/admin_img/profiles/avatar-17.jpg'>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="service-fields mb-3">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label>Video id <span class="text-danger">*</span></label>
                                            <input type="hidden" name="video_id" id="video_id" value="18">
                                            <input class="form-control" type="text" name="video_id" id="video_id" value="Rf34rhkWW1" required="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="submit-section">
                                <button class="btn btn-primary submit-btn" type="submit" name="form_submit" value="submit">Submit</button>
                            </div>
                        </form>
                        <!-- /Add Blog -->


                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- /Page Wrapper -->
    <!-- Model -->
		<div class="modal fade" id="deleteConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="acc_title"></h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<p id="acc_msg"></p>
					</div>
					<div class="modal-footer">
						<a href="javascript:;" class="btn btn-success si_accept_confirm">Yes</a>
						<button type="button" class="btn btn-danger si_accept_cancel" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="deleteNotConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="acc_title">Inactive Service?</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<p id="acc_msg">Service is Booked and Inprogress..</p>
					</div>
					<div class="modal-footer">

						<button type="button" class="btn btn-danger si_accept_cancel" data-dismiss="modal">OK</button>
					</div>
				</div>
			</div>
		</div>
		<!-- /Model -->
  <Nuxt />
 </div>
</template>

<script>
export default {
    mounted() {
        // Datatable

    if ($('.datatable').length > 0) {
        $('.datatable').DataTable({
            "bFilter": false,
        });
    }
    },
    head: {
    title: 'Doccure - Add Blog Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
