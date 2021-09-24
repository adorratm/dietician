<template>
 <div>
	<!-- Page Wrapper -->
    <div class="page-wrapper">
        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Appointments</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><NuxtLink to="admin_index">Dashboard</NuxtLink></li>
                            <li class="breadcrumb-item active">Appointments</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- /Page Header -->
            <div class="row">
                <div class="col-md-12">

                    <!-- Recent Orders -->
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="datatable table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Doctor Name</th>
                                            <th>Speciality</th>
                                            <th>Patient Name</th>
                                            <th>Apointment Time</th>
                                            <th>Status</th>
                                            <th class="text-right">Amount</th>
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient1.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Charlene Reed </NuxtLink>
                                                </h2>
                                            </td>
                                            <td>9 Nov 2019 <span class="text-primary d-block">11.00 AM - 11.15 AM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_1" class="check" checked>
                                                    <label for="status_1" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $200.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient2.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Travis Trimble </NuxtLink>
                                                </h2>
                                            </td>

                                            <td>5 Nov 2019 <span class="text-primary d-block">11.00 AM - 11.35 AM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_2" class="check" checked>
                                                    <label for="status_2" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $300.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient3.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Carl Kelly</NuxtLink>
                                                </h2>
                                            </td>
                                            <td>11 Nov 2019 <span class="text-primary d-block">12.00 PM - 12.15 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_3" class="check" checked>
                                                    <label for="status_3" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $150.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient4.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile"> Michelle Fairfax</NuxtLink>
                                                </h2>
                                            </td>
                                            <td>7 Nov 2019 <span class="text-primary d-block">1.00 PM - 1.20 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_4" class="check" checked>
                                                    <label for="status_4" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $150.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient5.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Gina Moore</NuxtLink>
                                                </h2>
                                            </td>

                                            <td>15 Nov 2019 <span class="text-primary d-block">1.00 PM - 1.15 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_5" class="check" checked>
                                                    <label for="status_5" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $200.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient6.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Elsie Gilley</NuxtLink>
                                                </h2>
                                            </td>

                                            <td>16 Nov 2019 <span class="text-primary d-block">1.00 PM - 1.15 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_5" class="check" checked>
                                                    <label for="status_5" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $250.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient7.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Joan Gardner</NuxtLink>
                                                </h2>
                                            </td>

                                            <td>18 Nov 2019 <span class="text-primary d-block">1.10 PM - 1.25 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_5" class="check" checked>
                                                    <label for="status_5" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $260.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient8.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile"> Daniel Griffing</NuxtLink>
                                                </h2>
                                            </td>

                                            <td>18 Nov 2019 <span class="text-primary d-block">11.10 AM - 11.25 AM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_5" class="check" checked>
                                                    <label for="status_5" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $260.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient9.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Walter Roberson</NuxtLink>
                                                </h2>
                                            </td>

                                            <td>21 Nov 2019 <span class="text-primary d-block">12.10 PM - 12.25 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_5" class="check" checked>
                                                    <label for="status_5" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $300.00
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
                                            <td>
                                                <h2 class="table-avatar">
                                                    <NuxtLink to="profile" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src='../../../assets/admin_img/patients/patient10.jpg' alt="User Image"></NuxtLink>
                                                    <NuxtLink to="profile">Robert Rhodes</NuxtLink>
                                                </h2>
                                            </td>

                                            <td>23 Nov 2019 <span class="text-primary d-block">12.10 PM - 12.25 PM</span></td>
                                            <td>
                                                <div class="status-toggle">
                                                    <input type="checkbox" id="status_5" class="check" checked>
                                                    <label for="status_5" class="checktoggle">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="text-right">
                                                $300.00
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- /Recent Orders -->

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
    title: 'Doccure - Medicine Page'
  },
    layout: 'admin',
	computed: {
       currentPath() {
           return this.$route.name
	   },
	}
}
</script>
