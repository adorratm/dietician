<template>
  <div>
    <ValidationObserver v-slot='{ handleSubmit }'>
      <form
        @submit.prevent='handleSubmit(updateInformation)'
        ref='informationForm'
        enctype='multipart/form-data'
      >
        <v-simple-table>
          <tbody>
          <tr>
            <td>
              <b>Adınız ve Soyadınız :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Adınız ve Soyadınız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  id='name'
                  type='text'
                  name='name'
                  v-model='user.name'
                  clearable
                  outlined
                  hide-details
                  label='Adınız ve Soyadınız'
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Email Adresiniz :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Email Adresiniz'
                rules='required|email'
                v-slot='{ errors }'
              >
                <v-text-field
                  id='email'
                  type='text'
                  name='email'
                  v-model='user.email'
                  clearable
                  outlined
                  hide-details
                  label='Email Adresiniz'
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Telefon Numaranız :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Telefon Numaranız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  id='phone'
                  type='text'
                  name='phone'
                  v-model='user.phone'
                  clearable
                  outlined
                  hide-details
                  label='Telefon Numaranız'
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>T.C. Kimlik Numaranız :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='T.C. Kimlik Numaranız'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  id='tc'
                  type='text'
                  name='tc'
                  v-model='user.tc'
                  outlined
                  hide-details
                  clearable
                  label='T.C. Kimlik Numaranız'
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Cinsiyet :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Cinsiyetiniz'
                rules='required'
                v-slot='{ errors }'
              >
                <v-radio-group
                  v-model='user.gender'
                  name='gender'
                  row
                >
                  <v-radio value='Erkek'>
                    <template v-slot:label> Erkek</template>
                  </v-radio>
                  <v-radio value='Kadın'>
                    <template v-slot:label> Kadın</template>
                  </v-radio>
                </v-radio-group>
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='user.gender === "Kadın"'>
            <td><b>Özel Durum :</b></td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Özel Durum'
                rules='required'
                v-slot='{ errors }'
              >
                <v-autocomplete
                  name='special_case'
                  id='special_case'
                  class='form-control'
                  :items='specialCases'
                  v-model='user.special_case'
                  item-text='value'
                  item-value='value'
                  clearable
                  label='Özel Durum'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='user.gender === "Kadın" && user.special_case === "HAMİLE"'>
            <td><b>Hamileliğinizin Kaçıncı Ayındasınız? :</b></td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Hamileliğinizin Kaçıncı Ayındasınız?'
                rules='required'
                v-slot='{ errors }'
              >
                <v-autocomplete
                  name='special_case_month'
                  id='special_case_month'
                  class='form-control'
                  :items='special_case_months'
                  v-model='user.special_case_month'
                  clearable
                  label='Hamileliğinizin Kaçıncı Ayındasınız?'
                  hide-details
                  outlined
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='user.gender === "Kadın" && user.special_case === "HAMİLE"'>
            <td><b>Hamilelik Öncesi Ağırlığınız :</b></td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Hamilelik Öncesi Ağırlığınız (kg)'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='special_case_weight'
                  id='special_case_weight'
                  v-model='user.special_case_weight'
                  clearable
                  hide-details
                  outlined
                  label='Hamilelik Öncesi Ağırlığınız (kg)'
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>İkamet Ettiğiniz İl :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='İkamet Ettiğiniz İl'
                rules='required'
                v-slot='{ errors }'
              >
                <v-autocomplete
                  v-on:change='getTowns'
                  name='city'
                  id='city'
                  :items='country.cities'
                  item-value='name'
                  item-text='name'
                  :value='user.city'
                  ref='city'
                  clearable
                  hide-details
                  outlined
                  return-object
                  autocomplete="off"
                  label='İkamet Ettiğiniz İl'
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>İkamet Ettiğiniz İlçe :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='İkamet Ettiğiniz İlçe'
                rules='required'
                v-slot='{ errors }'
              >
                <v-autocomplete
                  v-on:change='getDistricts'
                  name='town'
                  id='town'
                  ref='town'
                  :value='user.town'
                  :items='country.towns'
                  item-value='name'
                  item-text='name'
                  label='İkamet Ettiğiniz İlçe'
                  return-object
                  autocomplete="off"
                  clearable
                  hide-details
                  outlined
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>İkamet Ettiğiniz Semt :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='İkamet Ettiğiniz Semt'
                rules='required'
                v-slot='{ errors }'
              >
                <v-autocomplete
                  v-on:change='getNeighborhoods'
                  name='district'
                  id='district'
                  ref='district'
                  :value='user.district'
                  :items='country.districts'
                  item-text='name'
                  item-value='name'
                  label='İkamet Ettiğiniz Semt'
                  return-object
                  clearable
                  autocomplete="off"
                  hide-details
                  outlined
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>İkamet Ettiğiniz Mahalle :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='İkamet Ettiğiniz Mahalle'
                rules='required'
                v-slot='{ errors }'
              >
                <v-autocomplete
                  name='neighborhood'
                  id='neighborhood'
                  ref='neighborhood'
                  :value='user.neighborhood'
                  :items='country.neighborhoods'
                  item-value='name'
                  item-text='name'
                  clearable
                  return-object
                  autocomplete="off"
                  label='İkamet Ettiğiniz Mahalle'
                  hide-details
                  outlined
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>İkamet Ettiğiniz Adres :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='İkamet Ettiğiniz Adres'
                rules='required'
                v-slot='{ errors }'
              >
                <v-textarea
                  name='address'
                  id='address'
                  cols='30'
                  rows='5'
                  v-model='user.address'
                  clearable
                  hide-details
                  outlined
                  label='İkamet Ettiğiniz Adres'
                ></v-textarea>
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Doğum Tarihi :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Doğum Tarihi'
                rules='required'
                v-slot='{ errors }'
              >
                <v-menu
                  ref='menu'
                  v-model='menu'
                  :close-on-content-click='false'
                  transition='scale-transition'
                  offset-y
                  min-width='auto'
                >
                  <template v-slot:activator='{ on,attrs }'>
                    <v-text-field
                      name='birthDate'
                      v-model='computedDateFormattedMomentjs'
                      label='Doğum Tarihi (Örn: 31-12-2002)'
                      pattern="[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}"
                      prepend-icon='mdi-calendar'
                      min='1950-01-01'
                      :max='(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)'
                      v-bind='attrs'
                      v-on='on'
                      hide-details
                      clearable
                      outlined
                      minlength='10'
                      maxlength='10'
                      @click:clear="birthDate = null"
                      v-on:click:prepend="menu=true"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model='birthDate'
                    :active-picker.sync='activePicker'
                    :max='(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)'
                    min='1950-01-01'
                    @change='save'
                    @input='menu = false'
                  ></v-date-picker>
                </v-menu>
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Boy (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Boy (cm)'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='size'
                  id='size'
                  v-model='user.size'
                  clearable
                  label='Boy (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Ağırlık (kg) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Ağırlık (kg)'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='weight'
                  id='weight'
                  v-model='user.weight'
                  clearable
                  label='Ağırlık (kg)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Bel (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Bel (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='waist'
                  id='waist'
                  v-model='user.waist'
                  clearable
                  label='Bel (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Kalça (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Kalça (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='hip'
                  id='hip'
                  v-model='user.hip'
                  clearable
                  label='Kalça (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Göğüs (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Göğüs (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='chest'
                  id='chest'
                  v-model='user.chest'
                  clearable
                  label='Göğüs (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Boyun (cm) : </b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Boyun (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='neck'
                  id='neck'
                  v-model='user.neck'
                  clearable
                  label='Boyun (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Üst Kol (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Üst Kol (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='upperArm'
                  id='upperArm'
                  v-model='user.upperArm'
                  clearable
                  label='Üst Kol (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Alt Kol (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Alt Kol (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='lowerArm'
                  id='lowerArm'
                  v-model='user.lowerArm'
                  clearable
                  label='Alt Kol (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Kol Bileği (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Kol Bileği (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='wrist'
                  id='wrist'
                  v-model='user.wrist'
                  clearable
                  label='Kol Bileği (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Üst Bacak (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Üst Bacak (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='upperLeg'
                  id='upperLeg'
                  v-model='user.upperLeg'
                  clearable
                  label='Üst Bacak (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Alt Bacak (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Alt Bacak (cm)'
                rules=''
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='lowerLeg'
                  id='lowerLeg'
                  v-model='user.lowerLeg'
                  clearable
                  label='Alt Bacak (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Deri Kıvrım Kalınlığı (cm) :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Deri Kıvrım Kalınlığı (cm)'
                rules='required'
                v-slot='{ errors }'
              >
                <v-text-field
                  type='number'
                  name='skinfoldThickness'
                  id='skinfoldThickness'
                  v-model='user.skinfoldThickness'
                  clearable
                  label='Deri Kıvrım Kalınlığı (cm)'
                  outlined
                  hide-details
                />
                <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='!isEmpty(user.fatRatio) && !isEmpty(user.fat)'>
            <td>
              <b>Yağ :</b>
            </td>
            <td>
              %
              {{ user.fatRatio }}
            </td>
            <td>
              {{ user.fat }}
              KG
            </td>
          </tr>
          <tr v-if='!isEmpty(user.muscleRatio) && !isEmpty(user.muscle)'>
            <td>
              <b>Kas :</b>
            </td>
            <td>
              %
              {{ user.muscleRatio }}
            </td>
            <td>
              {{ user.muscle }}
              KG
            </td>
          </tr>
          <tr v-if='!isEmpty(user.waterRatio) && !isEmpty(user.wate)'>
            <td>
              <b>Su :</b>
            </td>
            <td>
              %
              {{ user.waterRatio }}
            </td>
            <td>
              {{ user.water }}
              KG
            </td>
          </tr>
          <tr>
            <td>
              <b>Profil Resminiz :</b>
            </td>
            <td colspan='2' class='align-middle p-2'>
              <v-file-input
                type='file'
                accept='image/*'
                placeholder='Profil Resminiz'
                v-model='imgURL'
                name='img_url'
                label='Profil Resminiz'
                clearable
                outlined
                hide-details
              />
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan='3' style='text-align: end'>
              <v-btn
                type='submit'
                color='primary'
                class='ml-auto mb-2 justify-end'
              >
                Bilgilerimi Güncelle
              </v-btn>
            </td>
          </tr>
          </tfoot>
        </v-simple-table>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import moment from 'moment'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: 'profile-information-edit',
  computed: {
    empty_url() {
      return this.img_url + 'uploads/settings/preparing/my.jpg'
    },
    computedDateFormattedMomentjs: {
      get(){
        return !this.isEmpty(this.birthDate) && this.birthDate.length === 10 ? moment(this.birthDate).format('DD-MM-YYYY') : null
      },
      set(val){
        let isValid = moment(val,'DD-MM-YYYY')
        if(val.length === 10 && isValid.isValid()){
          console.log(val)
          console.log(moment(val,'DD-MM-YYYY').format('YYYY-MM-DD'))
          this.birthDate =moment(val,'DD-MM-YYYY').format('YYYY-MM-DD')
        }
      }

    },
  },
  props: ['user'],
  data() {
    return {
      imgURL: null,
      data: { cities: [], towns: [], districts: [], neighborhoods: [] },
      country: { cities: [], towns: [], districts: [], neighborhoods: [] },
      activePicker: null,
      menu: false,
      birthDate:null,
      dateFormatted: null,
    }
  },
  mounted() {
    this.getCities()
    this.birthDate = this.user.birthDate
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
    getCities() {
      try{
        this.$axios
          .get(process.env.apiBaseUrl + 'informations/cities')
          .then(response => {
            this.country.cities =
              response.data.data.cities.length > 0
                ? response.data.data.cities
                : []
            let item = this.country.cities.filter(obj => {
              if(!this.isEmpty(this.user.city)){
                return obj.name === this.user.city
              }else{
                return obj.name
              }
            })
            if(!this.isEmpty(item[0])){
              this.getTowns(item[0])
            }
          }).catch((e) => console.log(e))
      }catch (e) {
        console.log(e)
      }
    },
    getTowns: function(item) {
      try {
        if(!this.isEmpty(item) && !this.isEmpty(item.towns)){
          this.$axios
            .get(process.env.apiBaseUrl + 'informations/towns?id=' + item.towns.join(","))
            .then(response => {
              this.country.towns =
                response.data.towns.length > 0 ? response.data.towns : []
              this.country.districts = []
              this.country.neighborhoods = []
              this.company_district = null
              this.company_neighborhood = null
              let item = this.country.towns.filter(obj => {
                if(!this.isEmpty(this.user.town)){
                  return obj.name === this.user.town
                }else{
                  return obj.name
                }
              })
              if(!this.isEmpty(item[0])){
                this.getDistricts(item[0])
              }
            }).catch((e) => console.log(e))
        }
      }catch (e) {
        console.log(e)
      }
    },
    getDistricts: function(item) {
      try {
        if(!this.isEmpty(item) && !this.isEmpty(item.districts)){
          this.$axios
            .get(
              process.env.apiBaseUrl + 'informations/districts?id=' + item.districts.join(",")
            )
            .then(response => {
              this.country.districts =
                response.data.districts.length > 0 ? response.data.districts : []
              this.country.neighborhoods = []
              this.company_neighborhood = null
              let item = this.country.districts.filter(obj => {
                if(!this.isEmpty(this.user.district)){
                  return obj.name === this.user.district
                }else{
                  return obj.name
                }
              })
              if(!this.isEmpty(item[0])){
                this.getNeighborhoods(item[0])
              }
            }).catch((e) => console.log(e))
        }
      }catch (e){
        console.log(e)
      }
    },
    getNeighborhoods: function(item) {
      try {
        if(!this.isEmpty(item) && !this.isEmpty(item.neighborhoods)){
          this.$axios
            .get(
              process.env.apiBaseUrl +
              'informations/neighborhoods?id=' +
              item.neighborhoods.join(",")
            )
            .then(response => {
              this.country.neighborhoods =
                response.data.neighborhoods.length > 0
                  ? response.data.neighborhoods
                  : []
            }).catch((e) => console.log(e))
        }
      }catch (e){
        console.log(e)
      }
    },
    updateInformation() {
      try{
        let formData = new FormData(this.$refs.informationForm)
        formData.append('birthDate', moment(this.birthDate).format("YYYY-MM-DD"))
        this.$axios
          .post(
            process.env.apiBaseUrl +
            'theme/users/update/',
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary
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
              this.e1 = 2
            } else {
              this.$izitoast.error({
                title: response.data.title,
                message: response.data.msg,
                position: 'topCenter'
              })
            }
          }).catch((e) => console.log(e))
      }catch (e) {
        console.log(e)
      }
    },
    save(date) {
      try {
        this.$refs.menu.save(date)
      }catch (e){
        console.log(e)
      }
    },
  }
}
</script>

<style scoped>

</style>
