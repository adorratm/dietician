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
      <v-card>
        <v-card-title>
          Yeni Danışan Kaydet
        </v-card-title>
        <v-card-text>
          <ValidationObserver v-slot='{ handleSubmit }'>
            <form
              @submit.prevent='handleSubmit(saveInformation)'
              ref='informationForm'
              enctype='multipart/form-data'
            >
              <v-simple-table>
                <tbody>
                <tr>
                  <td>
                    <b>Adınız ve Soyadınız :</b>
                  </td>
                  <td colspan='2'>
                    <ValidationProvider
                      name='Adınız ve Soyadınız'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        id='name'
                        type='text'
                        name='name'
                        v-model='data.name'
                        clearable
                        label='Adınız ve Soyadınız'
                      />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Email Adresiniz :</b>
                  </td>
                  <td colspan='2'>
                    <ValidationProvider
                      name='Email Adresiniz'
                      rules='required|email'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        id='email'
                        type='text'
                        name='email'
                        v-model='data.email'
                        clearable
                        label='Email Adresiniz'
                      />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Telefon Numaranız :</b>
                  </td>
                  <td colspan='2'>
                    <ValidationProvider
                      name='Telefon Numaranız'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        id='phone'
                        type='text'
                        name='phone'
                        v-model='data.phone'
                        clearable
                        label='Telefon Numaranız'
                      />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>T.C. Kimlik Numaranız :</b>
                  </td>
                  <td colspan='2'>
                    <ValidationProvider
                      name='T.C. Kimlik Numaranız'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        id='tc'
                        type='text'
                        class='form-control'
                        name='tc'
                        v-model='data.tc'
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
                  <td><b>Şifreniz :</b></td>
                  <td colspan='2'>
                    <ValidationProvider
                      name='Şifreniz'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='password'
                        name='password'
                        id='password'
                        v-model='data.password'
                        clearable
                        label='Şifreniz'
                      />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </td>
                </tr>
                <tr>
                  <td><b>Tekrar Şifreniz :</b></td>
                  <td colspan='2'>
                    <ValidationProvider
                      name='Tekrar Şifreniz'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='password'
                        name='password_confirmation'
                        id='password_confirmation'
                        v-model='data.password_confirmation'
                        clearable
                        label='Tekrar Şifreniz'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Cinsiyetiniz'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-radio-group
                        v-model='data.gender'
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
                <tr>
                  <td><b>Özel Durum :</b></td>
                  <td colspan='2'>
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
                        v-model='data.special_case'
                        item-text='value'
                        item-value='value'
                        clearable
                        return-object
                        label='Özel Durum'

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
                  <td colspan='2'>
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
                        v-model='data.city'
                        ref='city'
                        clearable
                        label='İkamet Ettiğiniz İl'
                        return-object
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
                  <td colspan='2'>
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
                        v-model='data.town'
                        :items='country.towns'
                        item-value='name'
                        item-text='name'
                        return-object
                        label='İkamet Ettiğiniz İlçe'
                        clearable
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
                  <td colspan='2'>
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
                        v-model='data.district'
                        :items='country.districts'
                        item-text='name'
                        item-value='name'
                        return-object
                        label='İkamet Ettiğiniz Semt'
                        clearable
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='İkamet Ettiğiniz Mahalle'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-autocomplete
                        name='neighborhood'
                        id='neighborhood'
                        ref='neighborhood'
                        v-model='data.neighborhood'
                        :items='country.neighborhoods'
                        item-value='name'
                        item-text='name'
                        clearable
                        label='İkamet Ettiğiniz Mahalle'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='İkamet Ettiğiniz Adres'
                      rules='required'
                      v-slot='{ errors }'
                    >
													<v-textarea
                            name='address'
                            id='address'
                            class='form-control'
                            cols='30'
                            rows='5'
                            v-model='data.address'
                            clearable
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Doğum Tarihi'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            type='date'
                            name='birthDate'
                            v-model="data.birthDate"
                            label="Doğum Tarihi"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="data.birthDate"
                          :active-picker.sync="activePicker"
                          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Boy (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='size'
                        id='size'
                        v-model='data.size'
                        clearable
                        label='Boy (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Ağırlık (kg)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='weight'
                        id='weight'
                        v-model='data.weight'
                        clearable
                        label='Ağırlık (kg)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Bel (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='waist'
                        id='waist'
                        v-model='data.waist'
                        clearable
                        label='Bel (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Kalça (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='hip'
                        id='hip'
                        v-model='data.hip'
                        clearable
                        label='Kalça (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Göğüs (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='chest'
                        id='chest'
                        v-model='data.chest'
                        clearable
                        label='Göğüs (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Boyun (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='neck'
                        id='neck'
                        v-model='data.neck'
                        clearable
                        label='Boyun (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Üst Kol (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='upperArm'
                        id='upperArm'
                        class='form-control'
                        v-model='data.upperArm'
                        clearable
                        label='Üst Kol (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Alt Kol (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='lowerArm'
                        id='lowerArm'
                        class='form-control'
                        v-model='data.lowerArm'
                        clearable
                        label='Alt Kol (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Kol Bileği (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='wrist'
                        id='wrist'
                        class='form-control'
                        v-model='data.wrist'
                        clearable
                        label='Kol Bileği (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Üst Bacak (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='upperLeg'
                        id='upperLeg'
                        class='form-control'
                        v-model='data.upperLeg'
                        clearable
                        label='Üst Bacak (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Alt Bacak (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='lowerLeg'
                        id='lowerLeg'
                        class='form-control'
                        v-model='data.lowerLeg'
                        clearable
                        label='Alt Bacak (cm)'
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
                  <td colspan='2'>
                    <ValidationProvider
                      name='Deri Kıvrım Kalınlığı (cm)'
                      rules='required'
                      v-slot='{ errors }'
                    >
                      <v-text-field
                        type='number'
                        name='skinfoldThickness'
                        id='skinfoldThickness'
                        class='form-control'
                        v-model='data.skinfoldThickness'
                        clearable
                        label='Deri Kıvrım Kalınlığı (cm)'
                      />
                      <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                        {{ errors[0] }}
                      </v-alert>
                    </ValidationProvider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Yağ :</b>
                  </td>
                  <td>
                    %
                    {{ data.fatRatio }}
                  </td>
                  <td>
                    {{ data.fat }}
                    KG
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Kas :</b>
                  </td>
                  <td>
                    %
                    {{ data.muscleRatio }}
                  </td>
                  <td>
                    {{ data.muscle }}
                    KG
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Su :</b>
                  </td>
                  <td>
                    %
                    {{ data.waterRatio }}
                  </td>
                  <td>
                    {{ data.water }}
                    KG
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Profil Resminiz :</b>
                  </td>
                  <td colspan='2' class='align-middle'>
                    <v-file-input
                      type='file'
                      accept='image/*'
                      placeholder='Profil Resminiz'
                      name='img_url'
                      label='Profil Resminiz'
                      clearable
                    />
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td colspan='3'>
                    <v-btn
                      type='submit'
                      color='primary'
                      class='ml-auto justify-end'
                    >
                      Danışan Bilgilerini Kaydet
                    </v-btn>
                  </td>
                </tr>
                </tfoot>
              </v-simple-table>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: ['dietician'],
  layout: 'dietician',
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
      specialCases: [{ 'value': 'YOK' }, { 'value': 'EMZİKLİ' }, { 'value': 'HAMİLE' }],
      activePicker: null,
      menu: false,
      data: {
        name: null,
        gender: null,
        city: null,
        town: null,
        district: null,
        neighborhoods: null,
        address: null,
        birthDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        special_case: null,
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
      userData: !this.isEmpty(this.$auth.$storage.getUniversal('user'))
        ? this.$auth.$storage.getUniversal('user')
        : null
    }
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    }
  },
  mounted() {
    this.getCities()
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    getCities() {
      this.$axios
        .get(process.env.apiBaseUrl + 'informations/cities')
        .then(response => {
          this.country.cities =
            response.data.data.cities.length > 0
              ? response.data.data.cities
              : []
        })
    },
    getTowns: function(item) {
      this.$axios
        .get(process.env.apiBaseUrl + 'informations/towns?id=' + item.towns)
        .then(response => {
          this.country.towns =
            response.data.towns.length > 0 ? response.data.towns : []
          this.country.districts = []
          this.country.neighborhoods = []
          this.company_district = null
          this.company_neighborhood = null
        })
    },
    getDistricts: function(item) {

      this.$axios
        .get(
          process.env.apiBaseUrl + 'informations/districts?id=' + item.districts
        )
        .then(response => {
          this.country.districts =
            response.data.districts.length > 0 ? response.data.districts : []
          this.country.neighborhoods = []
          this.company_neighborhood = null
        })
    },
    getNeighborhoods: function(item) {

      this.$axios
        .get(
          process.env.apiBaseUrl +
          'informations/neighborhoods?id=' +
          item.neighborhoods
        )
        .then(response => {
          this.country.neighborhoods =
            response.data.neighborhoods.length > 0
              ? response.data.neighborhoods
              : []
        })
    },
    saveInformation() {
      let formData = new FormData(this.$refs.informationForm)
      formData.append('dietician_id', this.userData._id)
      this.$axios
        .post(process.env.apiBaseUrl + 'users/register/', formData, {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=' + formData._boundary,
            Authorization: 'Bearer ' + this.userData.api_token
          }
        })
        .then(response => {
          if (response.data.success) {
            this.$izitoast.success({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
            setTimeout(() => {
              this.$router.go(
                decodeURIComponent('/dietician-panel/consultants/')
              )
            }, 2000)
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
          }
        })
    }
  }
}
</script>


<style scoped>

</style>
