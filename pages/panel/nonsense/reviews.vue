<template>
 <div>
<!-- Page Wrapper -->
<div class="page-wrapper">
    <div class="content container-fluid">

        <!-- Page Header -->
        <div class="page-header">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="page-title">Reviews</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                        <li class="breadcrumb-item active">Reviews</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- /Page Header -->

        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="datatable table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Doctor Name</th>
                                        <th>Ratings</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient1.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Charlene Reed </NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-01.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Ruby Perrin</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>3 Nov 2019 <br><small>09.59 AM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient2.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Travis Trimble </NuxtLink>
                                            </h2>
                                        </td>


                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-02.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Darren Elder</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>2 Nov 2019<br> <small>08.50 AM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient3.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Carl Kelly</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-03.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Deborah Angel</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>1 Nov 2019<br> <small>02.59 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient4.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile"> Michelle Fairfax</NuxtLink>
                                            </h2>
                                        </td>


                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-04.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Sofia Brient</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>27 Sep 2019 <br><small>03.40 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient5.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Gina Moore</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-05.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Marvin Campbell</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>24 Sep 2019 <br><small>04.38 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient6.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Elsie Gilley</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-06.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Katharine Berthold</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>22 Aug 2019 <br><small>01.50 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient7.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Joan Gardner</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-07.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Linda Tobin</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>21 Jul 2019 <br><small>05.50 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient8.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Daniel Griffing</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-08.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Paul Richard</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>16 Jun 2019 <br><small>04.50 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient9.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Walter Roberson</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-09.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. John Gibbs</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>11 Mar 2019 <br><small>05.55 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient10.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Harry Williams</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-10.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Olga Barlow</NuxtLink>
                                            </h2>
                                        </td>

                                        <td>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star text-warning"></i>
                                            <i class="fa fa-star-o text-secondary"></i>
                                        </td>

                                        <td>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                        </td>
                                            <td>15 Feb 2019 <br><small>07.30 PM</small></td>
                                        <td class="text-right">
                                            <div class="actions">
                                                <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">
                                                    <i class="far fa-trash-alt"></i> Delete
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- /Page Wrapper -->

<!-- Delete Modal -->
<div class="modal fade" id="delete_modal" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document" >
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-content p-2">
                    <h4 class="modal-title">Delete</h4>
                    <p class="mb-4">Are you sure want to delete?</p>
                    <button type="button" class="btn btn-primary">Save </button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /Delete Modal -->
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
    title: 'Doccure - Reviews Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
<style>
    .fa-star {
        font-size: 12px;
    }
    </style>
