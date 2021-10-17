<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->


    <!-- Page Content -->
    <div class='content'>
      <div class='container-fluid'>

        <div class='row'>
          <div class='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 map-left'>
            <v-text-field
              label='Diyetisyen Aramak İçin "Enter" Tuşuna Basın...'
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
            <!-- Dietician List -->
            <DieticianList v-if='dieticians.length>0 && loading===false' :dieticians='dieticians' />
            <!-- #Dietician List -->

            <div class='load-more text-center'>
              <v-pagination
                v-model='page'
                :length='pageLength'
                circle
              ></v-pagination>
            </div>
          </div>
          <!-- /content-left-->
          <div class='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 order-md-1 order-sm-1 order-1 map-right'>
            <div id='map' class='map-listing border'></div>
            <!-- map-->
          </div>
          <!-- /map-right-->
        </div>
        <!-- /row-->
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import DieticianList from '~/components/frontend/dietician-list'
import Breadcrumb from "~/components/frontend/breadcrumb"
export default {
  layout: 'default',
  name:"dieticians",
  components: {
    DieticianList,
    Breadcrumb
  },
  data: () => ({
    searchText: null,
    pageLength: 1,
    page: 1,
    loading: true,
    dieticians: [],
    slider :null,
    infowindow : null,
    bounds : null,
    map : null,
    current : 0,
    breadCrumbItems:[
      {name: "Anasayfa",url: "/"},
      {name: "Diyetisyenler"}
    ]
  }),
  beforeCreate() {
    this.$axios.get(process.env.apiBaseUrl + 'home/dieticians').then(res => {
      this.dieticians = res.data.data.data
      this.pageLength = res.data.data.links.length - 2
      this.loading = false
      if (this.loading === false) {
        let dietician = res.data.data.data[0]
        if (!this.isEmpty(dietician.company_lat) && !this.isEmpty(dietician.company_long)) {
          this.initialize(dietician.company_lat, dietician.company_long, this.img_url, res.data.data.data,this.map,this.infowindow,this.slider,new google.maps.LatLngBounds())
          google.maps.visualRefresh = true
          this.search(!this.isEmpty(this.$route.query.search) ? this.$route.query.search : null)
        }
      }
    }).catch(err => console.log(err))
  },
  mounted() {
    // Select 2
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      })
    }
  },
  computed: {
    currentPath() {
      return this.$route.name
    },
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  watch: {
    // async searchText() {
    //   this.loading = true
    //   await this.$axios.post(process.env.apiBaseUrl + "home/searchdieticians"
    //     , {
    //       'searchText': this.searchText
    //     }).then(res => {
    //     this.dieticians = res.data.data
    //   })
    //   this.loading = false
    //
    // },
    page() {
      this.loading = true
      this.$axios.get(process.env.apiBaseUrl + 'home/dieticians?page=' + this.page).then(res => {
        this.dieticians = res.data.data.data
        this.pageLength = res.data.data.links.length - 2
        this.loading = false
        let dietician = this.dieticians[0]
        if (!this.isEmpty(dietician.company_lat) && !this.isEmpty(dietician.company_long)) {
          this.initialize(dietician.company_lat, dietician.company_long, this.img_url, this.dieticians,this.map,this.infowindow,this.slider,new google.maps.LatLngBounds())
        }
      }).catch(err => console.log(err))
    }
  },
  methods: {
    /**
     * isEmpty
     * @param obj
     * @returns {boolean}
     */
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    search(queryParam) {
      if(!this.isEmpty(queryParam)){
        this.searchText = queryParam
      }
      this.loading = true
      this.$axios.post(process.env.apiBaseUrl + 'home/searchdieticians'
        , {
          'searchText': this.searchText
        }).then(res => {
        if (!this.isEmpty(res.data.data.data)) {
          this.dieticians = res.data.data.data
          this.pageLength = res.data.data.links.length - 2
          this.loading = false
          let dietician = this.dieticians[0]
          if (!this.isEmpty(dietician.company_lat) && !this.isEmpty(dietician.company_long)) {
            this.initialize(dietician.company_lat, dietician.company_long, this.img_url, this.dieticians,this.map,this.infowindow,this.slider,new google.maps.LatLngBounds())
          }
        }
      }).catch(err => console.log(err))
    },
    initialize(lat, long, img_url, locations, map, infowindow, slider,bounds) {
      let mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(lat, long),
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      map = new google.maps.Map(document.getElementById('map'), mapOptions)
      map.slide = true

      infowindow = new google.maps.InfoWindow({
        content: 'Yükleniyor...'
      })
      this.setMarkers(map, locations,bounds,infowindow,img_url)
      google.maps.event.addListener(infowindow, 'closeclick', function() {
        infowindow.close()
      })
      this.infowindow = infowindow;
      slider = window.setTimeout(this.show(img_url, locations,this.infowindow,map), 3000)
    },
    setInfo(img_url, marker,infowindow) {
      let content =
        '<div class="profile-widget" style="width: 100%; display: inline-block;">' +
        '<div class="doc-img">' +
        '<a href="/profile/' + marker.slug + '" rel="dofollow" v-bind:title=' + marker.name + '>' +
        '<img class="img-fluid" alt="' + marker.name + '" src="' + img_url + marker.profile_photo + '">' +
        '</a>' +
        '</div>' +
        '<div class="pro-content">' +
        '<h3 class="title">' +
        '<a href="/profile/' + marker.slug + '" rel="dofollow" v-bind:title=' + marker.name + '>' + marker.name + '</a>' +
        '<i class="fas fa-check-circle verified"></i>' +
        '</h3>' +
        '<p class="speciality">' + marker.department + " - " + marker.hospitalName +'</p>' +
        '<ul class="available-info">' +
        '<li><i class="fas fa-map-marker-alt"></i> ' + marker.company_address + ' ' + marker.company_neighborhood + ' ' + marker.company_district + ' ' + marker.company_town + ' / ' + marker.company_city + ' </li>' +
        '</ul>' +
        '</div>' +
        '</div>';
      infowindow.setContent(content)
    },
    show(img_url, locations, infowindow,map) {
      let ref = this
      infowindow.close()
      if (!map.slide) {
        return
      }
      let next, marker
      if (locations.length === 0) {
        return
      } else if (locations.length === 1) {
        next = 0
      }
      if (locations.length > 1) {
        do {
          next = Math.floor(Math.random() * locations.length)
        } while (next === this.current)
      }
      this.current = next
      marker = locations[next]
      ref.setInfo(img_url, marker,infowindow)
      infowindow.open(map, marker)
    },
    setMarkers(map, markers,bounds,infowindow,img_url) {
      for (let i = 0; i < markers.length; i++) {
        let item = markers[i]
        item.position = new google.maps.LatLng(item.company_lat, item.company_long)
        item.icon = '/img/marker.png'
        item.map = map
        let marker = new google.maps.Marker(item)
        bounds.extend(marker.position)
        markers[i] = marker
        let ref = this;
        google.maps.event.addListener(marker, 'click', function(e) {
          let markeritem = this
          ref.setInfo(img_url,markeritem,infowindow)
          infowindow.open(map, this)
          window.clearTimeout(this.slider)
        })
      }
      //map.fitBounds(bounds)
      google.maps.event.addListener(map, 'zoom_changed', function() {
        if (map.zoom > 16) map.slide = false
      })
    }
  }
}
</script>
