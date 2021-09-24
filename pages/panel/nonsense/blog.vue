<template>
 <div>
	<!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Blog</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                            <li class="breadcrumb-item"><a href="javascript:(0);">Pages</a></li>
                            <li class="breadcrumb-item active">Blog</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- /Page Header -->

            <div class="row">
                <div class="col-sm-12">

                        <div class="row mb-5">
                            <div class="col">
                                <ul class="nav nav-tabs nav-tabs-solid">
                                    <li class="nav-item">
                                        <NuxtLink class="nav-link active" to="blog">Acitive Blog</NuxtLink>
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

                        <!-- Blog -->
                        <div class="row blog-grid-row">

                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-01.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-01.jpg' alt="Post Author"> <span>Dr. Ruby Perrin</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 4 Dec 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Doccure – Making your clinic painless visit?</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-02.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-02.jpg' alt="Post Author"> <span>Dr. Darren Elder</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 3 Dec 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">What are the benefits of Online Doctor Booking?</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-03.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-03.jpg' alt="Post Author"> <span>Dr. Deborah Angel</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 3 Dec 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Benefits of consulting with an Online Doctor</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-04.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-04.jpg' alt="Post Author"> <span>Dr. Sofia Brient</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 2 Dec 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">5 Great reasons to use an Online Doctor</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-05.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-05.jpg' alt="Post Author"> <span>Dr. Marvin Campbell</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 1 Dec 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Online Doctor Appointment Scheduling</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-06.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-06.jpg' alt="Post Author"> <span>Dr. Katharine Berthold</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 30 Nov 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Simple steps to make your doctor visits exceptional!</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-07.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-07.jpg' alt="Post Author"> <span>Dr. Linda Tobin</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 28 Nov 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Choose your own Online Doctor Appointment</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-08.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-08.jpg' alt="Post Author"> <span>Dr. Paul Richard </span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 25 Nov 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Simple steps to visit your doctor today</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-09.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-09.jpg' alt="Post Author"> <span>Dr. John Gibbs</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 24 Nov 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">5 Great reasons to use an Online Doctor</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                            <div class="col-md-6 col-xl-4 col-sm-12">

                                <!-- Blog Post -->
                                <div class="blog grid-blog">
                                    <div class="blog-image">
                                        <a href="#"><img class="img-fluid" src='../../../assets/admin_img/blog/blog-10.jpg' alt="Post Image"></a>
                                    </div>
                                    <div class="blog-content">
                                        <ul class="entry-meta meta-item">
                                            <li>
                                                <div class="post-author">
                                                    <NuxtLink to="profile"><img src='../../../assets/admin_img/doctors/doctor-thumb-10.jpg' alt="Post Author"> <span>Dr. Olga Barlow</span></NuxtLink>
                                                </div>
                                            </li>
                                            <li><i class="far fa-clock"></i> 23 Nov 2019</li>
                                        </ul>
                                        <h3 class="blog-title"><a href="#">Online Doctoral Programs</a></h3>
                                        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.</p>
                                    </div>
                                    <div class="row pt-3">
                                        <div class="col"><NuxtLink to="edit-blog" class="text-success"><i class="far fa-edit"></i> Edit</NuxtLink></div>

                                        <div class="col text-right"><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#deleteNotConfirmModal"><i class="far fa-trash-alt"></i> Inactive</a></div>
                                    </div>
                                </div>
                                <!-- /Blog Post -->

                            </div>
                        </div>

                        <!-- Blog Pagination -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-pagination">
                                    <nav>
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item disabled">
                                                <a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-double-left"></i></a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">1</a>
                                            </li>
                                            <li class="page-item active">
                                                <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">3</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#"><i class="fas fa-angle-double-right"></i></a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <!-- /Blog Pagination -->
                        <!-- /Blog -->
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
    title: 'Doccure - Blog Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
