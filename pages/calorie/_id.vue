<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-row>
        <v-col cols='12' sm='12' md='7' lg='8' xl='9'>
          <v-card>
            <v-img v-if='!isEmpty(data)'
                   width='100%'
                   height='300'
                   :key='index'
                   v-for='(image, index) in images'
                   :src='img_url + image.img_url'
                   :alt='data.name'
                   contain
            />

            <v-card-title>
              "{{ data.name }}" Besini Hakkında Detaylı Bilgiler
            </v-card-title>
            <v-card-text>
              <div class='d-flex flex-wrap'>
                <v-text-field
                  type='number'
                  @input='changeValue'
                  min='1'
                  step='1'
                  id='unit'
                  name='unit'
                  v-model='unit'
                  label='Birim'
                />
                <v-autocomplete
                  class='ml-3'
                  @change='changeValue'
                  return-object
                  id='criteriaValue'
                  :items='criterias'
                  item-text='title'
                  item-value='value'
                  label='Ölçüt'
                >
                </v-autocomplete>
              </div>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-text>
              <v-tabs
                show-arrows
              >
                <v-tab>
                  Besin Değerleri
                </v-tab>
                <v-tab>
                  Açıklama
                </v-tab>
                <v-tab-item>
                  <v-simple-table>
                    <thead>
                    <tr>
                      <th class='font-weight-bold'>
                        Besin Değeri Adı
                      </th>
                      <th>
                        Besin Değeri
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if='!isEmpty(values)' v-for='(value) in fordata'>
                      <td>{{ value.title }} ({{ value.type }})</td>
                      <td>{{ value.value }}</td>
                    </tr>
                    </tbody>
                  </v-simple-table>
                </v-tab-item>
                <v-tab-item>

                  {{ data.description }}
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>

        </v-col>
        <v-col
          cols='12'
          sm='12'
          md='5'
          lg='4'
          xl='3'
        >
          <v-card>
            <v-card-title>
              BESİN DEĞERLERİ
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                <tr>
                  <td class='text-center'></td>
                  <td class='text-center'>100 Gram</td>
                  <td class='text-center'>
                    {{ unit }} {{ criteriaName }}
                  </td>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for='(value, index) in HundredData'
                  v-bind:key='index'
                  v-show='showName.includes(value.title)'
                >
                  <td class='text-left'>
                    {{ value.title }} ({{ value.type }})
                  </td>
                  <td class='text-center'>{{ value.value }}</td>
                  <td class='text-center'>
                    {{ fordata[index].value }}
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td colspan='3'>
                    <v-autocomplete
                      v-model='showName'
                      :items='fordata'
                      chips
                      label='Göstermek İstediğiniz Bileşenleri Seçin'
                      item-text='title'
                      item-value='title'
                      multiple
                    >
                      <template v-slot:prepend-item>
                        <v-list-item ripple @click='toggle'>
                          <v-list-item-action>
                            <v-icon
                              :color="
																				!isEmpty(showName)
																					? 'indigo darken-4'
																					: ''
																			"
                            >
                              {{ icon }}
                            </v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              Tümünü Seç
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class='mt-2'></v-divider>
                      </template>
                      <template v-slot:selection='data'>
                        <v-chip
                          v-bind='data.attrs'
                          :input-value='data.selected'
                          close
                          @click='data.select'
                          @click:close='remove(data.item)'
                        >
                          {{ data.item.title }}
                        </v-chip>
                      </template>
                      <template v-slot:item='data'>
                        <template>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html='data.item.title'
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </td>
                </tr>
                </tfoot>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </client-only>
  </v-container>
</template>


<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Breadcrumb from '@/components/includes/Breadcrumb'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  name: 'index',
  mounted() {
    this.HundredData = this.values
    this.criteriaLimit(this.data)
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    likesAllFruit() {
      return (
        !this.isEmpty(this.showName) &&
        !this.isEmpty(this.fordata) &&
        this.showName.length === this.fordata.length
      )
    },
    likesSomeFruit() {
      return !this.isEmpty(this.showName) && !this.likesAllFruit
    },
    icon() {
      if (this.likesAllFruit) return 'mdi-close-box'
      if (this.likesSomeFruit) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  methods: {
    remove(item) {
      console.log(item)
      const index = this.showName.indexOf(item.title)
      if (index >= 0) this.showName.splice(index, 1)
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
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.showName = []
        } else {
          this.showName = []
          this.fordata.forEach((el) => {
            this.showName.push(el.title)
          })
        }
      })
    },
    criteriaLimit: function(data) {
      this.showName = []
      this.showValue = []
      this.showType = []
      this.hideName = []
      this.hideValue = []
      this.hideType = []
      if (!this.isEmpty(data.vitaminName)) {
        let durum = 0
        for (let i = 0; i <= data.vitaminName.length - 1; i++) {
          durum = 0
          for (let j = 0; j <= this.excel.length; j++) {
            if (data.vitaminName[i] === this.excel[j]) {
              durum = 1
            }
          }
          if (durum === 1) {
            this.showName.push(data.vitaminName[i])
            this.showValue.push(data.vitaminValue[i])
            this.showType.push(data.vitaminType[i])
          } else {
            this.hideName.push(data.vitaminName[i])
            this.hideValue.push(data.vitaminValue[i])
            this.hideType.push(data.vitaminType[i])
          }
        }
      }
    },
    changeValue: function(item) {
      this.criteriaValue = item.value
      this.criteriaName = item.title
      this.type = item.type
      if (this.values.length > 0) {
        for (let i = 0; i < this.values.length; i++) {
          this.fordata[i].value =
            (this.values[i].value / 100) *
            ((this.unit <= 1 ? (this.unit = 1) : this.unit) *
              this.criteriaValue)
          if (
            this.isEmpty(this.fordata[i].value) ||
            isNaN(this.fordata[i].value)
          ) {
            this.fordata[i].value = this.values[i].value
          }
        }
      }
    }
  },
  data() {
    return {
      data: {},
      fordata: [],
      HundredData: [],
      criteriaValue: 1,
      criteriaName: 'Gram',
      value: null,
      unit: 100,
      type: null,
      excel: [
        'ENERJİ',
        'KARBONHİDRAT',
        'PROTEİN',
        'YAĞ',
        'LİF',
        'KOLESTROL',
        'POTASYUM',
        'SODYUM',
        'DEMİR',
        'KALSİYUM'
      ],
      showName: [],
      showValue: [],
      showType: [],
      hideName: [],
      hideValue: [],
      hideType: [],
      component: null,
      images: [],
      criterias : [],
      values:[],
      item: null,
      items: [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Kaç Kalori?',
          disabled: false,
          href: '/calorie'
        },
        {
          text: this.item,
          disabled: true,
          href: 'javascript:void(0)'
        }
      ]
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'nutrients/' + params.id
      )
      return data
    } catch (e) {
      error({ message: 'Besin Bilgisi Bulunamadı.', statusCode: 404 })
    }
  }
}
</script>


<style scoped>

</style>
