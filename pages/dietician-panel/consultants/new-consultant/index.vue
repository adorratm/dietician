<template>
  <v-container>
    <client-only>
      <v-card class='mb-3 pb-0' color='#15558d'>
        <v-card-text class='pa-0'>
          <v-breadcrumbs
            large
            divider='/'
            :items='items'
          >
            <template v-slot:divider>
              <v-icon class='white--text'>mdi-forward</v-icon>
            </template>
            <template v-slot:item='{item}'>
              <v-breadcrumbs-item :href='item.href' :disabled='item.disabled'><a class='white--text'>{{ item.text }}</a>
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  middleware: ["dietician"],
  layout: "dietician",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyen Paneli',
          disabled: false,
          href: '/dietician-panel/'
        },
        {
          text: 'Danışanlarım',
          disabled: false,
          href: '/dietician-panel/consultants'
        },
        {
          text: 'Danışan Ekle',
          disabled: false,
          href: '/dietician-panel/consultants/add'
        },
        {
          text: 'Danışan Kaydet',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      data: {
        name: null,
        gender: null,
        city: null,
        town: null,
        district: null,
        neighborhoods: null,
        address: null,
        birthDate: null,
        size: null,
        weight: null,
        waist: null,
        hip: null,
        chest: null,
        neck: null,
        upperArm: null,
        lowerArm: null,
        wrist: null,
        upperLeg: null,
        lowerLeg: null,
        skinfoldThickness: null,
        fatRatio: null,
        fat: null,
        muscleRatio: null,
        muscle: null,
        waterRatio: null,
        water: null,
        tc: null,
        phone: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      country: { cities: [], towns: [], districts: [], neighborhoods: [] },
      months: [
        "OCAK",
        "ŞUBAT",
        "MART",
        "NİSAN",
        "MAYIS",
        "HAZİRAN",
        "TEMMUZ",
        "AĞUSTOS",
        "EYLÜL",
        "EKİM",
        "KASIM",
        "ARALIK"
      ],
      userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
        ? this.$auth.$storage.getUniversal("user")
        : null
    };
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl;
    }
  },
  mounted() {
    this.getCities();
  },
  methods: {
    isEmpty(obj) {
      if (typeof obj == "number") return false;
      else if (typeof obj == "string") return obj.length === 0;
      else if (Array.isArray(obj)) return obj.length === 0;
      else if (typeof obj == "object")
        return obj == null || Object.keys(obj).length === 0;
      else if (typeof obj == "boolean") return false;
      else return !obj;
    },
    getCities() {
      this.$axios
        .get(process.env.apiBaseUrl + "informations/cities")
        .then(response => {
          this.country.cities =
            response.data.data.cities.length > 0
              ? response.data.data.cities
              : [];
          setTimeout(() => {
            this.getTowns();
          }, 100);
        });
    },
    getTowns: function(event) {
      let townIds = null;
      if (event !== undefined && event.target.options.selectedIndex > -1) {
        const theTarget =
          event.target.options[event.target.options.selectedIndex].dataset;
        townIds = theTarget.id;
      }
      if (
        this.isEmpty(townIds) &&
        this.$refs.city.options !== undefined &&
        this.$refs.city.options.length > 0
      ) {
        for (let element in this.$refs.city.options) {
          if (this.$refs.city.options[element].selected) {
            townIds = this.$refs.city.options[element].dataset.id;
          }
        }
      }
      this.$axios
        .get(process.env.apiBaseUrl + "informations/towns?id=" + townIds)
        .then(response => {
          this.country.towns =
            response.data.towns.length > 0 ? response.data.towns : [];
          this.country.districts = [];
          this.country.neighborhoods = [];
          if (event === undefined) {
            setTimeout(() => {
              this.getDistricts();
            }, 100);
          }
        });
    },
    getDistricts: function(event) {
      let districtIds = null;
      if (event !== undefined && event.target.options.selectedIndex > -1) {
        const theTarget =
          event.target.options[event.target.options.selectedIndex].dataset;
        districtIds = theTarget.id;
      }
      if (
        this.isEmpty(districtIds) &&
        this.$refs.town.options !== undefined &&
        this.$refs.town.options.length > 0
      ) {
        for (let element in this.$refs.town.options) {
          if (this.$refs.town.options[element].selected) {
            districtIds = this.$refs.town.options[element].dataset.id;
          }
        }
      }
      this.$axios
        .get(
          process.env.apiBaseUrl + "informations/districts?id=" + districtIds
        )
        .then(response => {
          this.country.districts =
            response.data.districts.length > 0 ? response.data.districts : [];
          this.country.neighborhoods = [];
          if (event === undefined) {
            setTimeout(() => {
              this.getNeighborhoods();
            }, 100);
          }
        });
    },
    getNeighborhoods: function(event) {
      let neighborhoodIds = null;
      if (event !== undefined && event.target.options.selectedIndex > -1) {
        const theTarget =
          event.target.options[event.target.options.selectedIndex].dataset;
        neighborhoodIds = theTarget.id;
      }
      if (
        this.isEmpty(neighborhoodIds) &&
        this.$refs.district.options !== undefined &&
        this.$refs.district.options.length > 0
      ) {
        for (let element in this.$refs.district.options) {
          if (this.$refs.district.options[element].selected) {
            neighborhoodIds = this.$refs.district.options[element].dataset.id;
          }
        }
      }
      this.$axios
        .get(
          process.env.apiBaseUrl +
          "informations/neighborhoods?id=" +
          neighborhoodIds
        )
        .then(response => {
          this.country.neighborhoods =
            response.data.neighborhoods.length > 0
              ? response.data.neighborhoods
              : [];
        });
    },
    saveInformation() {
      let formData = new FormData(this.$refs.informationForm);
      formData.append("dietician_id", this.userData._id);
      this.$axios
        .post(process.env.apiBaseUrl + "users/register/", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=" + formData._boundary,
            Authorization: "Bearer " + this.userData.api_token
          }
        })
        .then(response => {
          if (response.data.success) {
            this.$izitoast.success({
              title: response.data.title,
              message: response.data.msg,
              position: "topCenter"
            });
            setTimeout(() => {
              this.$router.go(
                decodeURIComponent("/dietician-panel/consultants/")
              );
            }, 2000);
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
              position: "topCenter"
            });
          }
        });
    }
  }
};
</script>


<style scoped>

</style>
