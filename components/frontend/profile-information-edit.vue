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
                  v-model='userData.name'
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
                  v-model='userData.email'
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
                  v-model='userData.phone'
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
                  v-model='userData.tc'
                  outlined
                  hide-details
                  clearable
                  label='T.C. Kimlik Numaranız'
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr>
            <td>
              <b>Cinsiyetiniz :</b>
            </td>
            <td colspan='2' class='p-2'>
              <ValidationProvider
                name='Cinsiyetiniz'
                rules='required'
                v-slot='{ errors }'
              >
                <v-radio-group
                  v-model='userData.gender'
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
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.gender === "Kadın" && userData.status !== "dietician"'>
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
                  :items='specialCases'
                  v-model='userData.special_case'
                  item-text='value'
                  item-value='value'
                  clearable
                  label='Özel Durum'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.gender === "Kadın" && userData.special_case === "HAMİLE" && userData.status !== "dietician"'>
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
                  :items='special_case_months'
                  v-model='userData.special_case_month'
                  clearable
                  label='Hamileliğinizin Kaçıncı Ayındasınız?'
                  hide-details
                  outlined
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.gender === "Kadın" && userData.special_case === "HAMİLE" && userData.status !== "dietician"'>
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
                  v-model='userData.special_case_weight'
                  clearable
                  hide-details
                  outlined
                  label='Hamilelik Öncesi Ağırlığınız (kg)'
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                  v-model='userData.city'
                  ref='city'
                  clearable
                  hide-details
                  outlined
                  return-object
                  autocomplete="off"
                  label='İkamet Ettiğiniz İl'
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                  v-model='userData.town'
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
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                  v-model='userData.district'
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
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                  v-model='userData.neighborhood'
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
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                  v-model='userData.address'
                  clearable
                  hide-details
                  outlined
                  label='İkamet Ettiğiniz Adres'
                ></v-textarea>
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
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
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.size'
                  clearable
                  label='Boy (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.weight'
                  clearable
                  label='Ağırlık (kg)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.waist'
                  clearable
                  label='Bel (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.hip'
                  clearable
                  label='Kalça (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.chest'
                  clearable
                  label='Göğüs (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.neck'
                  clearable
                  label='Boyun (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.upperArm'
                  clearable
                  label='Üst Kol (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.lowerArm'
                  clearable
                  label='Alt Kol (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.wrist'
                  clearable
                  label='Kol Bileği (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.upperLeg'
                  clearable
                  label='Üst Bacak (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
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
                  v-model='userData.lowerLeg'
                  clearable
                  label='Alt Bacak (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='userData.status !== "dietician"'>
            <td>
              <b>Deri Kıvrım Kalınlığınız (cm) :</b>
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
                  v-model='userData.skinfoldThickness'
                  clearable
                  label='Deri Kıvrım Kalınlığı (cm)'
                  outlined
                  hide-details
                />
                <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                  {{ errors[0] }}
                </v-alert>
              </ValidationProvider>
            </td>
          </tr>
          <tr v-if='!isEmpty(userData.fatRatio) && !isEmpty(userData.fat) && userData.status !== "dietician"'>
            <td>
              <b>Yağ :</b>
            </td>
            <td>
              %
              {{ userData.fatRatio }}
            </td>
            <td>
              {{ userData.fat }}
              KG
            </td>
          </tr>
          <tr v-if='!isEmpty(userData.muscleRatio) && !isEmpty(userData.muscle) && userData.status !== "dietician"'>
            <td>
              <b>Kas :</b>
            </td>
            <td>
              %
              {{ userData.muscleRatio }}
            </td>
            <td>
              {{ userData.muscle }}
              KG
            </td>
          </tr>
          <tr v-if='!isEmpty(userData.waterRatio) && !isEmpty(userData.wate) && userData.status !== "dietician"'>
            <td>
              <b>Su :</b>
            </td>
            <td>
              %
              {{ userData.waterRatio }}
            </td>
            <td>
              {{ userData.water }}
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
                class='ml-auto mt-2 justify-end'
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
    img_url() {
      return process.env.apiPublicUrl
    },
    empty_url() {
      return this.img_url + 'uploads/settings/preparing/my.jpg'
    },
    computedDateFormattedMomentjs: {
      get(){
        return !this.isEmpty(this.birthDate) && this.birthDate.length === 10 ? moment(this.birthDate).format('DD-MM-YYYY') : null
      },
      set(val){
        let isValid = moment(val,'DD-MM-YYYY')
        if(!this.isEmpty(val) && val.length === 10 && isValid.isValid()){
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
      userData: {},
      dateFormatted: null,
      specialCases: [{ 'value': 'YOK' }, { 'value': 'EMZİKLİ' }, { 'value': 'HAMİLE' }],
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
    }
  },
  mounted() {
    this.getCities()
    this.userData = {...this.user}
    this.birthDate = this.userData.birthDate
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
              if(!this.isEmpty(this.userData.city)){
                return obj.name === this.userData.city
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
                if(!this.isEmpty(this.userData.town)){
                  return obj.name === this.userData.town
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
                if(!this.isEmpty(this.userData.district)){
                  return obj.name === this.userData.district
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
        let endpoint = 'theme/users/update'
        if(this.user.status === "dietician"){
          endpoint = 'dietician/update'
        }
        let formData = new FormData(this.$refs.informationForm)
        formData.append('birthDate', moment(this.birthDate).format("YYYY-MM-DD"))
        this.$axios
          .post(
            process.env.apiBaseUrl +
            endpoint,
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
