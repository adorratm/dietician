<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->


    <!-- Page Content -->
    <!-- Page Content -->
    <div class='content'>
      <div class='container'>

        <ProfileInformationTop :user='user' />

        <!-- Doctor Details Tab -->
        <div class='card'>
          <div class='card-body pt-0'>

            <!-- Tab Menu -->
            <nav class='user-tabs mb-4'>
              <ul class='nav nav-tabs nav-tabs-bottom nav-justified nav-fill'>
                <li class='nav-item'>
                  <a class='nav-link active' href='#profileInformation' data-toggle='tab'>Kullanıcı Bilgilerim</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileInformationEdit' data-toggle='tab'>Bilgilerimi Düzenle</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileAppointments' data-toggle='tab'>Randevularım</a>
                </li>
                <li class='nav-item' v-if='user.status !== "dietician"'>
                  <a class='nav-link' href='#profileDiseasesEdit' data-toggle='tab' >Hastalıklarım</a>
                </li>
                <li class='nav-item' v-if='user.status !== "dietician"'>
                  <a class='nav-link' href='#profileUnlikedFoodsEdit' data-toggle='tab' >Sevmediğim Besinler</a>
                </li>
                <li class='nav-item' v-if='user.status !== "dietician"'>
                  <a class='nav-link' href='#profileAllergenFoodsEdit' data-toggle='tab' >Alerjen Besinler</a>
                </li>
                <li class='nav-item' v-if='user.status !== "dietician"'>
                  <a class='nav-link' href='#profileWeightAims' data-toggle='tab' >Kilo Hedefleri</a>
                </li>
                <li class='nav-item' v-if='user.status === "dietician"'>
                  <a class='nav-link' href='#profileWorkHours' data-toggle='tab' >Çalışma Saatlerim</a>
                </li>
              </ul>
            </nav>
            <!-- /Tab Menu -->

            <!-- Tab Content -->
            <div class='tab-content pt-0'>

              <!-- Profile Information -->
              <div role='tabpanel' id='profileInformation' class='tab-pane fade show active'>
                <div class='row'>
                  <div class='col-md-12 col-lg-12'>

                    <!-- About Details -->
                    <div class='widget about-widget'>
                      <ProfileInformation :user='user' />
                    </div>
                    <!-- /About Details -->

                  </div>
                </div>
              </div>
              <!-- /Profile Information -->

              <!-- Profile Information Edit -->
              <div role='tabpanel' id='profileInformationEdit' class='tab-pane fade'>
                <ProfileInformationEdit :user='user' />
              </div>
              <!-- /Profile Information Edit -->

              <!-- Profile Appointments -->
              <div role='tabpanel' id='profileAppointments' class='tab-pane fade'>
                <ProfileAppointment :user='user' />
              </div>
              <!-- /Profile Appointments -->

              <!-- Work Hours -->
              <div role='tabpanel' id='work_hours' class='tab-pane fade'>
                <ProfileWorkHours :user='user' />
              </div>
              <!-- /Work Hours -->

              <!-- Profile Diseases Edit -->
              <div role='tabpanel' id='profileDiseasesEdit' class='tab-pane fade' v-if='user.status !== "dietician"'>
                <ProfileDiseaseEdit :user='user' />
              </div>
              <!-- /Profile Diseases Edit -->

              <!-- Profile Unliked Foods Edit -->
              <div role='tabpanel' id='profileUnlikedFoodsEdit' class='tab-pane fade' v-if='user.status !== "dietician"'>
                <ProfileUnlikedFoodsEdit :user='user'/>
              </div>
              <!-- /Profile Unliked Foods Edit -->

              <!-- Profile Unliked Foods Edit -->
              <div role='tabpanel' id='profileAllergenFoodsEdit' class='tab-pane fade' v-if='user.status !== "dietician"'>
                <ProfileAllergenFoodsEdit :user='user'/>
              </div>
              <!-- /Profile Unliked Foods Edit -->

              <!-- Profile Work Hours -->
              <div role='tabpanel' id='profileWorkHours' class='tab-pane fade' v-if='user.status === "dietician"'>
                <ProfileWorkHours :user='user'/>
              </div>
              <!-- /Profile Work Hours -->

              <!-- Profile Weight Aims -->
              <div role='tabpanel' id='profileWeightAims' class='tab-pane fade' v-if='user.status !== "dietician"' @click='windowReDraw'>
                <ProfileWeightAimsEdit :user='user'/>
              </div>
              <!-- /Profile Work Hours -->
            </div>
          </div>
        </div>
        <!-- /Doctor Details Tab -->

      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ProfileAppointment from '~/components/frontend/profile-appointment'
import ProfileInformation from '~/components/frontend/profile-information'
import ProfileInformationEdit from '~/components/frontend/profile-information-edit'
import ProfileWorkHours from '~/components/frontend/profile-work-hours'
import ProfileDiseaseEdit from '~/components/frontend/profile-disease-edit'
import ProfileAllergenFoodsEdit from '~/components/frontend/profile-allergen-foods-edit'
import ProfileUnlikedFoodsEdit from '~/components/frontend/profile-unliked-foods-edit'
import ProfileWeightAimsEdit from '~/components/frontend/profile-weight-aims-edit'
import ProfileInformationTop from '~/components/frontend/profile-information-top'
import NutrientList from '~/components/frontend/nutrient-list'
import Breadcrumb from '~/components/frontend/breadcrumb'

export default {
  layout: 'default',
  name: 'profile',
  components: {
    ProfileInformationTop,
    ProfileInformation,
    ProfileInformationEdit,
    ProfileWorkHours,
    ProfileAppointment,
    ProfileDiseaseEdit,
    ProfileAllergenFoodsEdit,
    ProfileUnlikedFoodsEdit,
    ProfileWeightAimsEdit,
    ValidationObserver,
    ValidationProvider,
    NutrientList,
    Breadcrumb
  },
  middleware: ['auth','loggedin'],
  data: () => ({
    breadCrumbItems: [
      { name: 'Anasayfa', url: '/' },
      { name: 'Profil' }
    ],
    allWeightAims: [],
    allWeights: [],
    activePickerWeight: null,
    menuWeight: false,
    userData: {},
    menu:false
  }),
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url() {
      return this.img_url + 'uploads/settings/preparing/my.jpg'
    },
    user() {
      return this.$auth.user
    },
  },
  mounted() {
    this.getWeightAims()
    this.getWeights()
  },
  methods: {
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
    getWeightAims(onlyData =false){
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}users/weightaims/get-all`)
          .then(response => {
            this.allWeightAims = response.data.data.data
            if(!onlyData){
              $("#morrisLineDataAim").empty()
              window.mLDataAim = Morris.Line({
                element: 'morrisLineDataAim',
                data: this.allWeightAims,
                xkey: 'aim_date',
                ykeys: ['weight'],
                labels: ['Hedef Kilo'],
                lineColors: ['#ff9d00'],
                lineWidth: 1,
                gridTextSize: 10,
                hideHover: 'auto',
                width: '100%',
                resize: true,
                redraw: true,
                parseTime: false
              });
            }
            return response.data.data.data
          })
          .catch(err => console.log(err))
      } catch (e) {
        console.log(e)
      }
    },
    getWeights(onlyData = false){
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}users/weights/get-all`)
          .then(response => {
            this.allWeights = response.data.data.data
            if(!onlyData){
              $("#morrisLineData").empty()
              window.mLData = Morris.Line({
                element: 'morrisLineData',
                data: this.allWeights,
                xkey: 'saved_date',
                ykeys: ['weight'],
                labels: ['Güncel Kilo'],
                lineColors: ['#1b5a90'],
                lineWidth: 1,
                gridTextSize: 10,
                hideHover: 'auto',
                width: '100%',
                resize: true,
                redraw: true,
                parseTime: false
              });
            }
            return response.data.data.data
          })
          .catch(err => console.log(err))
      } catch (e) {
        console.log(e)
      }
    },
    windowReDraw() {
      if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
      } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
      }
    },
  }
}
</script>
