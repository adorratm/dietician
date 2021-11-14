<template>
<div>
    <ValidationObserver v-slot='{ handleSubmit }'>
      <form
        @submit.prevent='handleSubmit(saveWeightAimformation)'
        ref='weightAimInformationForm'
        enctype='multipart/form-data'
      >
        <ValidationProvider
          name='Güncel Ağırlık (kg)'
          v-slot='{ errors }'
        >
          <div class='form-group my-2'>
            <v-text-field
              type='number'
              name='weight'
              id='weight'
              v-model='data.weight'
              clearable
              label='Güncel Ağırlık (kg)'
              outlined
            />
            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
              {{ errors[0] }}
            </v-alert>
          </div>
        </ValidationProvider>
        <ValidationProvider
          name='Hedeflenen Ağırlık (KG)'
          rules='required'
          v-slot='{ errors }'
        >
          <v-text-field
            id='weightaim'
            type='number'
            name='weightaim'
            v-model='data.weightaim'
            clearable
            label='Hedeflenen Ağırlık (KG)'
            outlined
          />
          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
            {{ errors[0] }}
          </v-alert>
        </ValidationProvider>

        <ValidationProvider
          name='Hedeflenen Tarih'
          :rules='"required"'
          v-slot='{ errors }'
        >
          <div class='form-group my-2'>
            <v-menu
              ref='menuWeight'
              v-model='menuWeight'
              :close-on-content-click='false'
              transition='scale-transition'
              offset-y
              min-width='auto'
            >
              <template v-slot:activator='{ on,attrs }'>
                <v-text-field
                  name='aim_date'
                  v-model='computedDateFormattedMomentjsWeight'
                  label='Hedeflenen Tarih (Örn: 31-12-2002)'
                  pattern='[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}'
                  prepend-icon='mdi-calendar'
                  :min="(new Date(Date.now())).toISOString().substr(0, 10)"
                  v-bind='attrs'
                  v-on='on'
                  clearable
                  outlined
                  minlength='10'
                  maxlength='10'
                  @click:clear='data.aim_date = null'
                  v-on:click:prepend='menu=true'
                ></v-text-field>
              </template>
              <v-date-picker
                v-model='data.aim_date'
                :active-picker.sync='activePickerWeight'
                :min="(new Date(Date.now())).toISOString().substr(0, 10)"
                @change='saveWeight'
                @input='menuWeight = false'
              ></v-date-picker>
            </v-menu>
            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
              {{ errors[0] }}
            </v-alert>
          </div>
        </ValidationProvider>

        <v-btn color='primary' type='submit' class='mb-2'>
          Hedeflenen Ağırlık Bilgisini Kaydet
        </v-btn>
        <v-btn color='error' type='button' class='mb-2' @click.prevent='e1=6'>
          Hedeflenen Ağırlık Bilgisini Kaydetmeden İlerle
        </v-btn>
        <v-btn color='info' type='button' class='mb-2' @click.prevent='e1 = 4'>
          Geri Dön
        </v-btn>
      </form>
    </ValidationObserver>

    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="card card-chart mt-3">
          <div class="card-header">
            <h4 class="card-title">Güncel Kilo Geçmişi</h4>
          </div>
          <div class="card-body">
            <div id="morrisLineData" class="w-100"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="card card-chart mt-3">
          <div class="card-header">
            <h4 class="card-title">Güncel Kilo Hedefleri</h4>
          </div>
          <div class="card-body">
            <div id="morrisLineDataAim" class="w-100"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Invoice Chart -->
</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import moment from "moment";
export default {
  name: 'profile-weight-aims-edit',
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      allWeightAims: [],
      allWeights: [],
      activePickerWeight: null,
      menuWeight: false,
      data:null,
    }
  },
  computed:{
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url(){
      return this.img_url+ "uploads/settings/preparing/my.jpg"
    },
    computedDateFormattedMomentjsWeight: {
      get() {
        return !this.isEmpty(this.data.aim_date) && this.data.aim_date.length === 10 ? moment(this.data.aim_date).format('DD-MM-YYYY') : null
      },
      set(val) {
        let isValid = moment(val, 'DD-MM-YYYY')
        if (!this.isEmpty(val) && val.length === 10 && isValid.isValid()) {
          console.log(val)
          console.log(moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          this.data.aim_date = moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD')
        }
      }
    }
  },
  props:["user"],
  mounted(){
    this.getWeights()
    this.getWeightAims()
    this.data = { ...this.user }
  },
  methods:{
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
          .get(`${process.env.apiBaseUrl}users/${this.user._id}/weightaims/get-all`)
          .then(response => {
            this.allWeightAims = response.data.data.data
            if(!onlyData){
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
          .get(`${process.env.apiBaseUrl}users/${this.user._id}/weights/get-all`)
          .then(response => {
            this.allWeights = response.data.data.data
            if(!onlyData){
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
      this.e1 = 5;
      window.mLData.setData(this.allWeights)
      window.mLDataAim.setData(this.allWeightAims)
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
    saveWeight(date) {
      try {
        this.$refs.menuWeight.save(date)
      } catch (e) {
        console.log(e)
      }
    },
    saveWeightAimformation() {
      try {
        let formData = new FormData(this.$refs.weightAimInformationForm)
        formData.append('aim_date', moment(this.data.aim_date).format('YYYY-MM-DD'))
        this.$axios
          .post(process.env.apiBaseUrl + 'users/update/' + this.data._id, formData, {
            headers: {
              'Content-Type':
                'multipart/form-data; boundary=' + formData._boundary
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.$izitoast.success({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
              $("#morrisLineData").empty()
              $("#morrisLineDataAim").empty()
              this.getWeightAims()
              this.getWeights()
              this.windowReDraw()
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch((e) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>

</style>
