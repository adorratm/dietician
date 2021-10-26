<template>
 <div>

	<!-- Page Wrapper -->
    <div class="page-wrapper">

        <div class="content container-fluid">

            <!-- Page Header -->
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Welcome dietician!</h3>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- /Page Header -->

            <div class="row">
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="dash-widget-header">
                                <span class="dash-widget-icon text-primary border-primary">
                                    <i class="fa fa-users"></i>
                                </span>
                                <div class="dash-count">
                                    <h3>168</h3>
                                </div>
                            </div>
                            <div class="dash-widget-info">
                                <h6 class="text-muted">Doctors</h6>
                                <div class="progress progress-sm">
                                    <div class="progress-bar bg-primary w-50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="dash-widget-header">
                                <span class="dash-widget-icon text-success">
                                    <i class="fa fa-credit-card"></i>
                                </span>
                                <div class="dash-count">
                                    <h3>487</h3>
                                </div>
                            </div>
                            <div class="dash-widget-info">

                                <h6 class="text-muted">Patients</h6>
                                <div class="progress progress-sm">
                                    <div class="progress-bar bg-success w-50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="dash-widget-header">
                                <span class="dash-widget-icon text-danger border-danger">
                                    <i class="fa fa-money"></i>
                                </span>
                                <div class="dash-count">
                                    <h3>485</h3>
                                </div>
                            </div>
                            <div class="dash-widget-info">

                                <h6 class="text-muted">Appointment</h6>
                                <div class="progress progress-sm">
                                    <div class="progress-bar bg-danger w-50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="dash-widget-header">
                                <span class="dash-widget-icon text-warning border-warning">
                                    <i class="fa fa-folder"></i>
                                </span>
                                <div class="dash-count">
                                    <h3>$62523</h3>
                                </div>
                            </div>
                            <div class="dash-widget-info">

                                <h6 class="text-muted">Revenue</h6>
                                <div class="progress progress-sm">
                                    <div class="progress-bar bg-warning w-50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-lg-6">

                    <!-- Sales Chart -->
                    <div class="card card-chart">
                        <div class="card-header">
                            <h4 class="card-title">Revenue</h4>
                        </div>
                        <div class="card-body">
                            <div id="morrisArea"></div>
                        </div>
                    </div>
                    <!-- /Sales Chart -->

                </div>
                <div class="col-md-12 col-lg-6">

                    <!-- Invoice Chart -->
                    <div class="card card-chart">
                        <div class="card-header">
                            <h4 class="card-title">Status</h4>
                        </div>
                        <div class="card-body">
                            <div id="morrisLine"></div>
                        </div>
                    </div>
                    <!-- /Invoice Chart -->

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
      if (this.$nuxt.layoutName === 'dietician') {
        $(function() {

          /* Morris Area Chart */

          window.mA = Morris.Area({
            element: 'morrisArea',
            data: [
              { y: '2013', a: 60 },
              { y: '2014', a: 100 },
              { y: '2015', a: 240 },
              { y: '2016', a: 120 },
              { y: '2017', a: 80 },
              { y: '2018', a: 100 },
              { y: '2019', a: 300 },
            ],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Revenue'],
            lineColors: ['#1b5a90'],
            lineWidth: 2,

            fillOpacity: 0.5,
            gridTextSize: 10,
            hideHover: 'auto',
            resize: true,
            redraw: true
          });

          /* Morris Line Chart */

          window.mL = Morris.Line({
            element: 'morrisLine',
            data: [
              { y: '2015', a: 100, b: 30 },
              { y: '2016', a: 20, b: 60 },
              { y: '2017', a: 90, b: 120 },
              { y: '2018', a: 50, b: 80 },
              { y: '2019', a: 120, b: 150 },
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Doctors', 'Patients'],
            lineColors: ['#1b5a90', '#ff9d00'],
            lineWidth: 1,
            gridTextSize: 10,
            hideHover: 'auto',
            resize: true,
            redraw: true
          });
          $(window).on("resize", function() {
            mA.redraw();
            mL.redraw();
          });
        });
      }
    },
    head: {
    title: 'Doccure - Dashboard'
  },
    layout: 'dietician',
	computed: {
	}
}
</script>
<style>
    .fa-users {
        font-size: 20px;
    }
    .fa-credit-card {
        font-size: 20px;
    }
    .fa-folder {
        font-size: 20px;
    }
    .fa-money {
        font-size: 20px;
    }
    .fa-star {
        font-size: 12px;
    }
    </style>
