<template>
 <div>
<!-- Page Wrapper -->
<div class="page-wrapper">
    <div class="content container-fluid">

        <!-- Page Header -->
        <div class="page-header">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="page-title">List of Doctors</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                        <li class="breadcrumb-item"><a href="javascript:(0);">Users</a></li>
                        <li class="breadcrumb-item active">Doctor</li>
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
                                        <th>Doctor Name</th>
                                        <th>Speciality</th>
                                        <th>Member Since</th>
                                        <th>Earned</th>
                                        <th>Account Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-01.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Ruby Perrin</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Dental</td>

                                        <td>14 Jan 2019 <br><small>02.59 AM</small></td>

                                        <td>$3100.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-02.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Darren Elder</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Dental</td>

                                        <td>11 Jun 2019 <br><small>4.50 AM</small></td>

                                        <td>$5000.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-03.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Deborah Angel</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Cardiology</td>

                                        <td>4 Jan 2018 <br><small>9.40 AM</small></td>

                                        <td>$3300.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-04.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Sofia Brient</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Urology</td>

                                        <td>5 Jul 2019 <br><small>12.59 AM</small></td>

                                        <td>$3500.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-05.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Marvin Campbell</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Orthopaedics</td>

                                        <td>24 Jan 2019 <br><small>02.59 AM</small></td>

                                        <td>$3700.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-06.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Katharine Berthold</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Orthopaedics</td>

                                        <td>23 Mar 2019 <br><small>02.50 PM</small></td>

                                        <td>$4000.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-07.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Linda Tobin</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Neurology</td>

                                        <td>14 Dec 2018 <br><small>01.59 AM</small></td>

                                        <td>$2000.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-08.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Paul Richard</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Dermatology</td>

                                        <td>11 Jan 2019 <br><small>02.59 AM</small></td>

                                        <td>$3000.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-09.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. John Gibbs</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Dental</td>

                                        <td>21 Apr 2018 <br><small>02.59 PM</small></td>

                                        <td>$4100.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 class="table-avatar">
                                                <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/doctors/doctor-thumb-10.jpg' alt="User Image"></NuxtLink>
                                                <NuxtLink to="profile">Dr. Olga Barlow</NuxtLink>
                                            </h2>
                                        </td>
                                        <td>Dental</td>

                                        <td>15 Feb 2018 <br><small>03.59 AM</small></td>

                                        <td>$3500.00</td>

                                        <td>
                                            <div class="status-toggle">
                                                <input type="checkbox" id="status_1" class="check" checked>
                                                <label for="status_1" class="checktoggle">checkbox</label>
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
    title: 'Doccure - Doctor List Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
