<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-toolbar
          flat
          color='primary'
          dark
        >
          <v-toolbar-title>Danışan İşlemleri</v-toolbar-title>
        </v-toolbar>
        <v-tabs show-arrows>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Danışan Bilgileri
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-account-edit
            </v-icon>
            Danışan Bilgisi Düzenle
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-account-edit
            </v-icon>
            Danışan E-Diyetleri
          </v-tab>

          <v-tab-item eager>
            <v-card flat>
              <v-card-text>
                <v-simple-table>
                  <tbody>
                  <tr>
                    <td><b>Profil Fotoğrafı :</b></td>
                    <td colspan='2'>
                      <v-img
                        v-bind:src='img_url + data.img_url'
                        v-bind:lazy-src='img_url + data.img_url'
                        v-bind:alt='data.name'
                        width='100'
                        height='100'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><b>Ad Soyad :</b></td>
                    <td colspan='2'>{{ data.name }}</td>
                  </tr>
                  <tr>
                    <td><b>Cinsiyet :</b></td>
                    <td colspan='2'>{{ data.gender }}</td>
                  </tr>
                  <tr>
                    <td><b>İkamet Ettiğiniz İl :</b></td>
                    <td colspan='2'>{{ data.city }}</td>
                  </tr>
                  <tr>
                    <td><b>İkamet Ettiğiniz İlçe :</b></td>
                    <td colspan='2'>{{ data.town }}</td>
                  </tr>
                  <tr>
                    <td><b>İkamet Ettiğiniz Semt :</b></td>
                    <td colspan='2'>{{ data.district }}</td>
                  </tr>
                  <tr>
                    <td><b>İkamet Ettiğiniz Mahalle :</b></td>
                    <td colspan='2'>{{ data.neighborhood }}</td>
                  </tr>
                  <tr>
                    <td><b>İkamet Ettiğiniz Adres :</b></td>
                    <td colspan='2'>{{ data.address }}</td>
                  </tr>
                  <tr>
                    <td><b>Doğum Tarihi :</b></td>
                    <td colspan='2'>{{ data.birthDate }}</td>
                  </tr>
                  <tr>
                    <td><b>Boy (cm) :</b></td>
                    <td colspan='2'>{{ data.size }}</td>
                  </tr>
                  <tr>
                    <td><b>Ağırlık (kg) :</b></td>
                    <td colspan='2'>{{ data.weight }}</td>
                  </tr>
                  <tr>
                    <td><b>Bel (cm) :</b></td>
                    <td colspan='2'>{{ data.waist }}</td>
                  </tr>
                  <tr>
                    <td><b>Kalça (cm) :</b></td>
                    <td colspan='2'>{{ data.hip }}</td>
                  </tr>
                  <tr>
                    <td><b>Göğüs (cm) :</b></td>
                    <td colspan='2'>{{ data.chest }}</td>
                  </tr>
                  <tr>
                    <td><b>Boyun (cm) : </b></td>
                    <td colspan='2'>{{ data.neck }}</td>
                  </tr>
                  <tr>
                    <td><b>Üst Kol (cm) :</b></td>
                    <td colspan='2'>{{ data.upperArm }}</td>
                  </tr>
                  <tr>
                    <td><b>Alt Kol (cm) :</b></td>
                    <td colspan='2'>{{ data.lowerArm }}</td>
                  </tr>
                  <tr>
                    <td><b>Kol Bileği (cm) :</b></td>
                    <td colspan='2'>{{ data.wrist }}</td>
                  </tr>
                  <tr>
                    <td><b>Üst Bacak (cm) :</b></td>
                    <td colspan='2'>{{ data.upperLeg }}</td>
                  </tr>
                  <tr>
                    <td><b>Alt Bacak (cm) :</b></td>
                    <td colspan='2'>{{ data.lowerLeg }}</td>
                  </tr>
                  <tr>
                    <td><b>Deri Kıvrım Kalınlığı (cm) :</b></td>
                    <td colspan='2'>
                      {{ data.skinfoldThickness }}
                    </td>
                  </tr>
                  <tr>
                    <td><b>Yağ :</b></td>
                    <td>% {{ data.fatRatio }}</td>
                    <td>{{ data.fat }} KG</td>
                  </tr>
                  <tr>
                    <td><b>Kas :</b></td>
                    <td>% {{ data.muscleRatio }}</td>
                    <td>{{ data.muscle }} KG</td>
                  </tr>
                  <tr>
                    <td><b>Su :</b></td>
                    <td>% {{ data.waterRatio }}</td>
                    <td>{{ data.water }} KG</td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item eager>
            <v-card flat>
              <v-card-text>
                <v-stepper v-model='e1'>
                  <v-stepper-header>
                    <v-stepper-step :complete='e1 > 1' step='1'>
                      Danışan Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 2' step='2'>
                      Hastalık Bilgileri
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 3' step='3'>
                      Alerjenik Besinler
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete='e1 > 4' step='4'>
                      Sevilmeyen Besinler
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                    <v-stepper-content step='1'>
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
                                    return-object
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
                                    label='İkamet Ettiğiniz İlçe'
                                    return-object
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
                                    label='İkamet Ettiğiniz Semt'
                                    return-object
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
                                    return-object
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
                                    ref='menu'
                                    v-model='menu'
                                    :close-on-content-click='false'
                                    transition='scale-transition'
                                    offset-y
                                    min-width='auto'
                                  >
                                    <template v-slot:activator='{ on, attrs }'>
                                      <v-text-field
                                        type='date'
                                        name='birthDate'
                                        v-model='data.birthDate'
                                        label='Doğum Tarihi'
                                        prepend-icon='mdi-calendar'
                                        readonly
                                        v-bind='attrs'
                                        v-on='on'
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model='data.birthDate'
                                      :active-picker.sync='activePicker'
                                      :max='(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)'
                                      min='1950-01-01'
                                      @change='save'
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
                                  v-model='imgURL'
                                  name='img_url'
                                  label='Profil Resminiz'
                                  clearable
                                />
                              </td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                              <td colspan='3' style='text-align: end'>
                                <v-btn
                                  @click='e1=2'
                                  color='error'
                                  class='ml-auto mb-2 justify-end'
                                >
                                  Danışan Bilgilerini Kaydetmeden İlerle
                                </v-btn>
                                <v-btn
                                  type='submit'
                                  color='primary'
                                  class='ml-auto mb-2 justify-end'
                                >
                                  Danışan Bilgilerini Kaydet ve İlerle
                                </v-btn>
                              </td>
                            </tr>
                            </tfoot>
                          </v-simple-table>
                        </form>
                      </ValidationObserver>
                    </v-stepper-content>
                    <v-stepper-content step='2'>
                      <ValidationObserver v-slot='{ handleSubmit }'>
                        <form
                          @submit.prevent='handleSubmit(updateDiseaseInformation)'
                          ref='diseaseInformationForm'
                          enctype='multipart/form-data'
                        >
                          <ValidationProvider
                            name='Hastalık'
                            rules=''
                            v-slot='{ errors }'
                          >
                              <v-autocomplete
                                name='selectedDiseases'
                                v-model='selectedDiseases'
                                :items='diseases'
                                chips
                                label='Hastalık Seçin'
                                item-text='name'
                                item-value='_id.$oid'
                                multiple
                              >
                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click='toggleDisease'>
                                    <v-list-item-action>
                                      <v-icon
                                        :color="
																	!isEmpty(selectedDiseases) &&
																	selectedDiseases.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                                      >
                                        {{ diseaseIcon }}
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
                                    {{ data.item.name }}
                                  </v-chip>
                                </template>
                                <template v-slot:item='data'>
                                  <template>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        v-html='data.item.name'
                                      ></v-list-item-title>
                                    </v-list-item-content>
                                  </template>
                                </template>
                              </v-autocomplete>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                          </ValidationProvider>

                          <v-btn color='primary' type='submit' class='mb-2'>
                            Hastalık Bilgisini Kaydet ve İlerle
                          </v-btn>
                          <v-btn color='error' type='button' class='mb-2' @click.prevent='e1=3'>
                            Hastalık Bilgisini Kaydetmeden İlerle
                          </v-btn>
                          <v-btn color='info' type='button' class='mb-2' @click.prevent='e1 = 1'>
                            Geri Dön
                          </v-btn>
                        </form>
                      </ValidationObserver>
                    </v-stepper-content>
                    <v-stepper-content step='3'>
                      <ValidationObserver v-slot='{ handleSubmit }'>
                        <form
                          @submit.prevent='handleSubmit(updateAllergenFoodsInformation)'
                          ref='AllergenFoodsInformationForm'
                          enctype='multipart/form-data'
                        >
                          <ValidationProvider
                            name='Alerjen Besinler'
                            rules=''
                            v-slot='{ errors }'
                          >
                              <v-autocomplete
                                name='selectedAllergenFoods'
                                v-model='selectedAllergenFoods'
                                :items='allergenFoods'
                                chips
                                label='Alerjen Besin Seçin'
                                item-text='name'
                                item-value='_id.$oid'
                                multiple
                              >
                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click='toggleAllergenFoods'>
                                    <v-list-item-action>
                                      <v-icon
                                        :color="
																	!isEmpty(selectedAllergenFoods) &&
																	selectedAllergenFoods.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                                      >
                                        {{ allergenFoodsIcon }}
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
                                    @click:close='removeAllergenFoods(data.item)'
                                  >
                                    {{ data.item.name }}
                                  </v-chip>
                                </template>
                                <template v-slot:item='data'>
                                  <template>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        v-html='data.item.name'
                                      ></v-list-item-title>
                                    </v-list-item-content>
                                  </template>
                                </template>
                              </v-autocomplete>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                          </ValidationProvider>

                          <v-btn color='primary' type='submit' class='mb-2'>
                            Alerjen Besin Bilgisini Kaydet ve İlerle
                          </v-btn>
                          <v-btn color='error' type='button' class='mb-2' @click.prevent='e1=4'>
                            Alerjen Besin Bilgisini Kaydetmeden İlerle
                          </v-btn>
                          <v-btn color='info' type='button' class='mb-2' @click.prevent='e1 = 2'>
                            Geri Dön
                          </v-btn>
                        </form>
                      </ValidationObserver>
                    </v-stepper-content>
                    <v-stepper-content step='4'>
                      <ValidationObserver v-slot='{ handleSubmit }'>
                        <form
                          @submit.prevent='handleSubmit(updateUnlikedFoodsInformation)'
                          ref='UnlikedFoodsInformationForm'
                          enctype='multipart/form-data'
                        >
                          <ValidationProvider
                            name='Sevilmeyen Besinler'
                            rules=''
                            v-slot='{ errors }'
                          >
                              <v-autocomplete
                                name='selectedUnlikedFoods'
                                v-model='selectedUnlikedFoods'
                                :items='unlikedFoods'
                                chips
                                label='Sevilmeyen Besin Seçin'
                                item-text='name'
                                item-value='_id.$oid'
                                multiple
                              >
                                <template v-slot:prepend-item>
                                  <v-list-item ripple @click='toggleUnlikedFoods'>
                                    <v-list-item-action>
                                      <v-icon
                                        :color="
																	!isEmpty(selectedUnlikedFoods) &&
																	selectedUnlikedFoods.length > 0
																		? 'indigo darken-4'
																		: ''
																"
                                      >
                                        {{ unlikedFoodsIcon }}
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
                                    @click:close='removeUnlikedFoods(data.item)'
                                  >
                                    {{ data.item.name }}
                                  </v-chip>
                                </template>
                                <template v-slot:item='data'>
                                  <template>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        v-html='data.item.name'
                                      ></v-list-item-title>
                                    </v-list-item-content>
                                  </template>
                                </template>
                              </v-autocomplete>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                          </ValidationProvider>

                          <v-btn color='primary' type='submit' class='mb-2'>
                            Sevilmeyen Besin Bilgisini Kaydet
                          </v-btn>
                          <v-btn color='info' type='button' class='mb-2' @click.prevent='e1 = 3'>
                            Geri Dön
                          </v-btn>
                        </form>
                      </ValidationObserver>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item eager>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula
                  sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna,
                  posuere eget, vestibulum et, tempor auctor, justo.
                </p>

                <p class='mb-0'>
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor
                  quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at
                  tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </client-only>
  </v-container>

</template>


<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Breadcrumb from '@/components/includes/Breadcrumb'

export default {
  middleware: ['auth', 'dietician'],
  layout: 'dietician',
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
  },
  data() {
    return {
      imgURL:null,
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
      activePicker: null,
      menu: false,
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
          text: 'Danışan Düzenle',
          disabled: true
        }
      ],
      data: { cities: [], towns: [], districts: [], neighborhoods: [] },
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
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  computed: {
    img_url() {
      return process.env.apiPublicUrl
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
    selectAllUnlikedFoods() {
      return (
        !this.isEmpty(this.selectedUnlikedFoods) &&
        !this.isEmpty(this.unlikedFoods) &&
        this.selectedUnlikedFoods.length === this.unlikedFoods.length
      )
    },
    selectSomeUnlikedFoods() {
      return (
        !this.isEmpty(this.selectedUnlikedFoods) &&
        this.selectedUnlikedFoods.length > 0 &&
        !this.selectAllUnlikedFoods
      )
    },
    unlikedFoodsIcon() {
      if (this.selectAllUnlikedFoods) return 'mdi-close-box'
      if (this.selectSomeUnlikedFoods) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },
  mounted() {
    this.getCities()
    this.getDiseases()
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'dietician/users/update/' + params.id
      )
      return data
    } catch (e) {
      error({ message: 'Kullanıcı Bilgisi Bulunamadı.', statusCode: 404 })
    }
  },
  methods: {
    toggleDisease() {
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
    },
    toggleAllergenFoods() {
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
    },
    toggleUnlikedFoods() {
      this.$nextTick(() => {
        if (this.selectAllUnlikedFoods) {
          this.selectedUnlikedFoods = []
        } else {
          this.selectedUnlikedFoods = []
          this.unlikedFoods.forEach((el, index) => {
            this.selectedUnlikedFoods.push(el._id.$oid)
          })
        }
      })
    },
    getDiseases() {
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
    },
    remove(item) {
      const index = this.selectedDiseases.indexOf(item._id.$oid)
      if (index >= 0) this.selectedDiseases.splice(index, 1)
    },
    removeAllergenFoods(item) {
      const index = this.selectedAllergenFoods.indexOf(item._id.$oid)
      if (index >= 0) this.selectedAllergenFoods.splice(index, 1)
    },
    removeUnlikedFoods(item) {
      const index = this.selectedUnlikedFoods.indexOf(item._id.$oid)
      if (index >= 0) this.selectedUnlikedFoods.splice(index, 1)
    },
    save(date) {
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
          let item = this.country.cities.filter(obj => {
            return obj.name === this.data.city
          })
          this.getTowns(item[0])
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
          let item = this.country.towns.filter(obj => {
            return obj.name === this.data.town
          })
          this.getDistricts(item[0])
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
          let item = this.country.districts.filter(obj => {
            return obj.name === this.data.district
          })
          this.getNeighborhoods(item[0])
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
    updateInformation() {
      let formData = new FormData(this.$refs.informationForm)
      this.$axios
        .post(
          process.env.apiBaseUrl +
          'dietician/users/update/' +
          this.data._id.$oid,
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
            this.e1 = 2
          } else {
            this.$izitoast.error({
              title: response.data.title,
              message: response.data.msg,
              position: 'topCenter'
            })
          }
        })
    },
    updateDiseaseInformation() {
      let formData = new FormData(this.$refs.diseaseInformationForm)
      formData.append('dietician_id', this.userData._id)
      formData.append('tc', this.data.tc)
      formData.append('phone', this.data.phone)
      formData.append('id', this.data._id.$oid)
      formData.delete("selectedDiseases")
      formData.append("selectedDiseases",this.selectedDiseases)

      this.$axios
        .post(
          process.env.apiBaseUrl +
          'dietician/users/user-diseases/',
          formData,
          {
            json: true,
            withCredentials: false,
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token, Authorization",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Credentials": true,
              "Content-Type":
                "multipart/form-data; boundary=" + formData._boundary,
              Authorization: "Bearer " + this.userData.api_token
            },
            credentials: "same-origin"
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
        })
    },
    updateAllergenFoodsInformation() {
      let formData = new FormData(this.$refs.allergenFoodsInformationForm)
      formData.append('dietician_id', this.userData._id)
      formData.append('tc', this.data.tc)
      formData.append('phone', this.data.phone)
      formData.append('id', this.data._id.$oid)
      formData.delete("selectedAllergenFoods")
      formData.append("selectedAllergenFoods",this.selectedAllergenFoods)
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
        })
    },
    updateUnlikedFoodsInformation() {
      let formData = new FormData(this.$refs.unlikedFoodsInformationForm)
      formData.append('dietician_id', this.userData._id)
      formData.append('tc', this.data.tc)
      formData.append('phone', this.data.phone)
      formData.append('id', this.data._id.$oid)
      formData.delete("selectedUnlikedFoods")
      formData.append("selectedUnlikedFoods",this.selectedUnlikedFoods)
      this.$axios
        .post(
          process.env.apiBaseUrl +
          'dietician/users/user-unlovedfoods/',
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
