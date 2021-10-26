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
              <ul class='nav nav-tabs nav-tabs-bottom nav-justified'>
                <li class='nav-item'>
                  <a class='nav-link active' href='#profileInformation' data-toggle='tab'>Kullanıcı Bilgileri</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileInformationEdit' data-toggle='tab'>Bilgileri Düzenle</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileAppointments' data-toggle='tab'>Randevularım</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileDiseasesEdit' data-toggle='tab'>Hastalıklar</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileUnlikedFoodsEdit' data-toggle='tab'>Sevilmeyen Besinler</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#profileAllergenFoodsEdit' data-toggle='tab'>Alerjen Besinler</a>
                </li>
              </ul>
            </nav>
            <!-- /Tab Menu -->

            <!-- Tab Content -->
            <div class='tab-content pt-0'>

              <!-- Information Content -->
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
              <!-- /Overview Content -->

              <!-- Locations Content -->
              <div role='tabpanel' id='profileInformationEdit' class='tab-pane fade'>
                <ProfileInformationEdit :user='user' />
              </div>
              <!-- /Locations Content -->

              <div role='tabpanel' id='profileDiseasesEdit' class='tab-pane fade'>
                test
              </div>

              <!-- Reviews Content -->
              <div role='tabpanel' id='profileAppointments' class='tab-pane fade'>

                <!-- Location List -->
                <div class='location-list'>
                  <div class='row'>

                    <!-- Clinic Content -->
                    <div class='col-md-6'>
                      <div class='clinic-content'>
                        <h4 class='clinic-name'><a href='#'>Smile Cute Dental Care Center</a></h4>
                        <p class='doc-speciality'>MDS - Periodontology and Oral Implantology, BDS</p>
                        <div class='rating'>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star'></i>
                          <span class='d-inline-block average-rating'>(4)</span>
                        </div>
                        <div class='clinic-details mb-0'>
                          <h5 class='clinic-direction'><i class='fas fa-map-marker-alt'></i> 2286 Sundown Lane, Austin,
                            Texas 78749, USA <br><a href='javascript:void(0);'>Get Directions</a></h5>
                          <ul>
                            <li>
                              <a href='~/assets/img/features/feature-01.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-01.jpg' alt='Feature Image'>
                              </a>
                            </li>
                            <li>
                              <a href='~/assets/img/features/feature-02.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-02.jpg' alt='Feature Image'>
                              </a>
                            </li>
                            <li>
                              <a href='~/assets/img/features/feature-03.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-03.jpg' alt='Feature Image'>
                              </a>
                            </li>
                            <li>
                              <a href='~/assets/img/features/feature-04.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-04.jpg' alt='Feature Image'>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- /Clinic Content -->

                    <!-- Clinic Timing -->
                    <div class='col-md-4'>
                      <div class='clinic-timing'>
                        <div>
                          <p class='timings-days'>
                            <span> Mon - Sat </span>
                          </p>
                          <p class='timings-times'>
                            <span>10:00 AM - 2:00 PM</span>
                            <span>4:00 PM - 9:00 PM</span>
                          </p>
                        </div>
                        <div>
                          <p class='timings-days'>
                            <span>Sun</span>
                          </p>
                          <p class='timings-times'>
                            <span>10:00 AM - 2:00 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- /Clinic Timing -->

                    <div class='col-md-2'>
                      <div class='consult-price'>
                        $250
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Location List -->

                <!-- Location List -->
                <div class='location-list'>
                  <div class='row'>

                    <!-- Clinic Content -->
                    <div class='col-md-6'>
                      <div class='clinic-content'>
                        <h4 class='clinic-name'><a href='#'>The Family Dentistry Clinic</a></h4>
                        <p class='doc-speciality'>MDS - Periodontology and Oral Implantology, BDS</p>
                        <div class='rating'>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star filled'></i>
                          <i class='fas fa-star'></i>
                          <span class='d-inline-block average-rating'>(4)</span>
                        </div>
                        <div class='clinic-details mb-0'>
                          <p class='clinic-direction'><i class='fas fa-map-marker-alt'></i> 2883 University Street,
                            Seattle, Texas Washington, 98155 <br><a href='javascript:void(0);'>Get Directions</a></p>
                          <ul>
                            <li>
                              <a href='~/assets/img/features/feature-01.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-01.jpg' alt='Feature Image'>
                              </a>
                            </li>
                            <li>
                              <a href='~/assets/img/features/feature-02.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-02.jpg' alt='Feature Image'>
                              </a>
                            </li>
                            <li>
                              <a href='~/assets/img/features/feature-03.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-03.jpg' alt='Feature Image'>
                              </a>
                            </li>
                            <li>
                              <a href='~/assets/img/features/feature-04.jpg' data-fancybox='gallery2'>
                                <img src='~/assets/img/features/feature-04.jpg' alt='Feature Image'>
                              </a>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                    <!-- /Clinic Content -->

                    <!-- Clinic Timing -->
                    <div class='col-md-4'>
                      <div class='clinic-timing'>
                        <div>
                          <p class='timings-days'>
                            <span> Tue - Fri </span>
                          </p>
                          <p class='timings-times'>
                            <span>11:00 AM - 1:00 PM</span>
                            <span>6:00 PM - 11:00 PM</span>
                          </p>
                        </div>
                        <div>
                          <p class='timings-days'>
                            <span>Sat - Sun</span>
                          </p>
                          <p class='timings-times'>
                            <span>8:00 AM - 10:00 AM</span>
                            <span>3:00 PM - 7:00 PM</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- /Clinic Timing -->

                    <div class='col-md-2'>
                      <div class='consult-price'>
                        $350
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Location List -->

              </div>
              <!-- /Reviews Content -->

              <!-- Business Hours Content -->
              <div role='tabpanel' id='doc_business_hours' class='tab-pane fade'>
                <div class='row'>
                  <div class='col-md-6 offset-md-3'>

                    <!-- Business Hours Widget -->
                    <div class='widget business-widget'>
                      <div class='widget-content'>
                        <div class='listing-hours'>
                          <div class='listing-day current'>
                            <div class='day'>Today <span>5 Nov 2019</span></div>
                            <div class='time-items'>
                              <span class='open-status'><span class='badge bg-success-light'>Open Now</span></span>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day'>
                            <div class='day'>Monday</div>
                            <div class='time-items'>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day'>
                            <div class='day'>Tuesday</div>
                            <div class='time-items'>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day'>
                            <div class='day'>Wednesday</div>
                            <div class='time-items'>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day'>
                            <div class='day'>Thursday</div>
                            <div class='time-items'>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day'>
                            <div class='day'>Friday</div>
                            <div class='time-items'>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day'>
                            <div class='day'>Saturday</div>
                            <div class='time-items'>
                              <span class='time'>07:00 AM - 09:00 PM</span>
                            </div>
                          </div>
                          <div class='listing-day closed'>
                            <div class='day'>Sunday</div>
                            <div class='time-items'>
                              <span class='time'><span class='badge bg-danger-light'>Closed</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- /Business Hours Widget -->

                  </div>
                </div>
              </div>
              <!-- /Business Hours Content -->

            </div>
          </div>
        </div>
        <!-- /Doctor Details Tab -->

      </div>
    </div>
    <!-- /Page Content -->
    <div class='content'>
      <div class='container'>
        <div class='row'>
          <!-- Content Left -->
          <div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8'>
            <v-text-field
              label='Besin Aramak İçin "Enter" Tuşuna Basın...'
              v-model='searchText'
              @change='search'
              solo
              clearable
            ></v-text-field>

            <div class='mx-auto justify-center flex-wrap align-center text-center d-flex flex-column' v-if='loading'>
              <v-progress-circular
                :size='70'
                :width='7'
                color='purple'
                indeterminate
                class='mx-auto d-block'
              ></v-progress-circular>
              <h3 class='mx-auto d-block mt-3'>İçerik Yükleniyor. Lütfen Bekleyin...</h3>
            </div>
            <!-- Nutrient List -->
            <NutrientList v-if='nutrients.length>0 && loading===false' :nutrients='nutrients' :emptyurl='emptyUrl' />
            <!-- #Nutrient List -->

            <div class='load-more text-center'>
              <v-pagination
                total-visible='11'
                v-model='pagination.current'
                :length='pagination.total'
                circle
                @input='onPageChange'
              ></v-pagination>
            </div>
          </div>
          <!-- /Content Left -->
          <!-- Content Right -->
          <div class='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>

          </div>
          <!-- /Content Right -->
        </div>
        <!-- /row-->
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ProfileInformation from '~/components/frontend/profile-information'
import ProfileInformationEdit from '~/components/frontend/profile-information-edit'
import ProfileDiseaseEdit from '~/components/frontend/profile-disease-edit'
import ProfileAllergenFoodsEdit from '~/components/frontend/profile-allergen-foods-edit'
import ProfileUnlikedFoodsEdit from '~/components/frontend/profile-unliked-foods-edit'
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
    ProfileDiseaseEdit,
    ProfileAllergenFoodsEdit,
    ProfileUnlikedFoodsEdit,
    ValidationObserver,
    ValidationProvider,
    NutrientList,
    Breadcrumb
  },
  middleware: ['auth', 'user'],
  data: () => ({
    imgURL: null,
    e1: 1,
    specialCases: [{ 'value': 'YOK' }, { 'value': 'EMZİKLİ' }, { 'value': 'HAMİLE' }],
    disease: null,
    diseases: [],
    selectedDiseases: [],
    allergenFood: null,
    allergenFoods: [],
    selectedAllergenFoods: [],
    unlikedFood: null,
    unlikedFoods: [],
    selectedUnlikedFoods: [],
    months: [
      'OCAK',
      'ŞUBAT',
      'MART',
      'NİSAN',
      'MAYIS',
      'HAZİRAN',
      'TEMMUZ',
      'AĞUSTOS',
      'EYLÜL',
      'EKİM',
      'KASIM',
      'ARALIK'
    ],
    special_case_months: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],


    searchText: null,
    pagination: {
      current: 1,
      total: 1
    },
    loading: true,
    nutrients: [],
    emptyUrl: null,
    breadCrumbItems: [
      { name: 'Anasayfa', url: '/' },
      { name: 'Profil' }
    ]
  }),
  mounted() {
    this.getNutrients()
    this.search(!this.isEmpty(this.$route.query.search) ? this.$route.query.search : null)
  },
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
    selectAllDisease() {
      return (
        !this.isEmpty(this.selectedDiseases) &&
        !this.isEmpty(this.diseases) &&
        this.selectedDiseases.length === this.diseases.length
      )
    },
    selectSomeDisease() {
      return (
        !this.isEmpty(this.selectedDiseases) &&
        this.selectedDiseases.length > 0 &&
        !this.selectAllDisease
      )
    },
    diseaseIcon() {
      if (this.selectAllDisease) return 'mdi-close-box'
      if (this.selectSomeDisease) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    selectAllAllergenFoods() {
      return (
        !this.isEmpty(this.selectedAllergenFoods) &&
        !this.isEmpty(this.allergenFoods) &&
        this.selectedAllergenFoods.length === this.allergenFoods.length
      )
    },
    selectSomeAllergenFoods() {
      return (
        !this.isEmpty(this.selectedAllergenFoods) &&
        this.selectedAllergenFoods.length > 0 &&
        !this.selectAllAllergenFoods
      )
    },
    allergenFoodsIcon() {
      if (this.selectAllAllergenFoods) return 'mdi-close-box'
      if (this.selectSomeAllergenFoods) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },

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
    toggleDisease() {
      try {
        this.$nextTick(() => {
          if (this.selectAllDisease) {
            this.selectedDiseases = []
          } else {
            this.selectedDiseases = []
            this.diseases.forEach((el, index) => {
              this.selectedDiseases.push(el._id.$oid)
            })
          }
        })
      }catch (e) {
        console.log(e)
      }
    },
    toggleAllergenFoods() {
      try {
        this.$nextTick(() => {
          if (this.selectAllAllergenFoods) {
            this.selectedAllergenFoods = []
          } else {
            this.selectedAllergenFoods = []
            this.allergenFoods.forEach((el, index) => {
              this.selectedAllergenFoods.push(el._id.$oid)
            })
          }
        })
      }catch (e) {
        console.log(e)
      }
    },
    getDiseases() {
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}dietician/users/user-diseases-get`, {
            headers: {
              Authorization: 'Bearer ' + this.userData.api_token
            }
          })
          .then(response => {
            this.diseases = response.data.data.diseases
            this.unlikedFoods = response.data.data.unlikedFoods
            this.allergenFoods = response.data.data.allergenFoods
          })
          .catch(err => console.log(err))
      }catch (e){
        console.log(e)
      }
    },
    remove(item) {
      try {
        const index = this.selectedDiseases.indexOf(item._id.$oid)
        if (index >= 0) this.selectedDiseases.splice(index, 1)
      }catch (e) {
        console.log(e)
      }
    },
    removeAllergenFoods(item) {
      try {
        const index = this.selectedAllergenFoods.indexOf(item._id.$oid)
        if (index >= 0) this.selectedAllergenFoods.splice(index, 1)
      }catch (e) {
        console.log(e)
      }
    },
    updateDiseaseInformation() {
      try {
        let formData = new FormData(this.$refs.diseaseInformationForm)
        formData.append('dietician_id', this.userData._id)
        formData.append('tc', this.data.tc)
        formData.append('phone', this.data.phone)
        formData.append('id', this.data._id.$oid)
        formData.delete('selectedDiseases')
        formData.append('selectedDiseases', this.selectedDiseases)
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'dietician/users/user-diseases/',
            formData,
            {
              json: true,
              withCredentials: false,
              mode: 'no-cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, Content-Type, X-Auth-Token, Authorization',
                'Access-Control-Allow-Methods':
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary,
                Authorization: 'Bearer ' + this.userData.api_token
              },
              credentials: 'same-origin'
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
              this.e1 = 3
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch((e) =>console.log(e))
      }catch (e){
       console.log(e)
      }
    },
    updateAllergenFoodsInformation() {
      try {
        let formData = new FormData(this.$refs.allergenFoodsInformationForm)
        formData.append('dietician_id', this.userData._id)
        formData.append('tc', this.data.tc)
        formData.append('phone', this.data.phone)
        formData.append('id', this.data._id.$oid)
        formData.delete('selectedAllergenFoods')
        formData.append('selectedAllergenFoods', this.selectedAllergenFoods)
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'dietician/users/user-allergenfoods/',
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary,
                Authorization: 'Bearer ' + this.userData.api_token
              }
            }
          )
          .then(response => {
            if (response.data.success) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
              this.e1 = 4
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch((e) =>console.log(e))
      }catch (e) {
        console.log(e)
      }
    },
    getNutrients(param) {
      try {
        if (this.searchText !== null) {
          this.$store
            .dispatch('getNutrients', {
              nutrientsURL:
                'nutrients?page=' +
                this.pagination.current +
                '&search=' +
                decodeURIComponent(this.searchText)
            })
            .then(() => {
              this.emptyUrl = this.$store.state.emptyUrl
              this.nutrients = this.$store.state.nutrients.data
              this.pagination.current = this.$store.state.nutrients.current_page
              this.pagination.total = this.$store.state.nutrients.last_page
              this.loading = false
            }).catch(err => console.log(err))
        } else {
          if (param) {
            this.$store
              .dispatch('getNutrients', { nutrientsURL: param })
              .then(() => {
                this.emptyUrl = this.$store.state.emptyUrl
                this.nutrients = this.$store.state.nutrients.data
                this.pagination.current = this.$store.state.nutrients.current_page
                this.pagination.total = this.$store.state.nutrients.last_page
                this.loading = false
              }).catch(err => console.log(err))
          } else {
            this.$store
              .dispatch('getNutrients', {
                nutrientsURL: 'nutrients?page=' + this.pagination.current
              })
              .then(() => {
                this.emptyUrl = this.$store.state.emptyUrl
                this.nutrients = this.$store.state.nutrients.data
                this.pagination.current = this.$store.state.nutrients.current_page
                this.pagination.total = this.$store.state.nutrients.last_page
                this.loading = false
              }).catch(err => console.log(err))
          }
        }
      }catch (e){
        console.log(e)
      }
    },
    onPageChange() {
      try {
        this.loading = true
        this.getNutrients()
      }catch (e) {
        console.log(e)
      }
    },
    search(queryParam) {
      try {
        if (!this.isEmpty(queryParam)) {
          this.searchText = queryParam
        }
        this.loading = true
        this.getNutrients()
      }catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
