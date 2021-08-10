<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>
      <v-card>
        <v-card-text>
          <v-tabs>
            <v-tab>
              <v-icon left>
                mdi-account
              </v-icon>
              Profilim
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-lock
              </v-icon>
              Profili Düzenle
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-access-point
              </v-icon>
              Option 3
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
                          height='100'
                          v-bind:alt='data.name'
                          v-bind:lazy-src='img_url + data.img_url'
                          v-bind:src='img_url + data.img_url'
                          width='100'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><b>Ad Soyad :</b></td>
                      <td colspan='2'>{{ userData.name }}</td>
                    </tr>
                    <tr>
                      <td><b>Cinsiyet :</b></td>
                      <td colspan='2'>{{ userData.gender }}</td>
                    </tr>
                    <tr>
                      <td><b>İkamet Ettiğiniz İl :</b></td>
                      <td colspan='2'>{{ userData.city }}</td>
                    </tr>
                    <tr>
                      <td><b>İkamet Ettiğiniz İlçe :</b></td>
                      <td colspan='2'>{{ userData.town }}</td>
                    </tr>
                    <tr>
                      <td><b>İkamet Ettiğiniz Semt :</b></td>
                      <td colspan='2'>{{ userData.district }}</td>
                    </tr>
                    <tr>
                      <td><b>İkamet Ettiğiniz Mahalle :</b></td>
                      <td colspan='2'>{{ userData.neighborhood }}</td>
                    </tr>
                    <tr>
                      <td><b>İkamet Ettiğiniz Adres :</b></td>
                      <td colspan='2'>{{ userData.address }}</td>
                    </tr>
                    <tr>
                      <td><b>Doğum Tarihi :</b></td>
                      <td colspan='2'>{{ userData.birthDate }}</td>
                    </tr>
                    <tr>
                      <td><b>Boy (cm) :</b></td>
                      <td colspan='2'>{{ userData.size }}</td>
                    </tr>
                    <tr>
                      <td><b>Ağırlık (kg) :</b></td>
                      <td colspan='2'>{{ userData.weight }}</td>
                    </tr>
                    <tr>
                      <td><b>Bel (cm) :</b></td>
                      <td colspan='2'>{{ userData.waist }}</td>
                    </tr>
                    <tr>
                      <td><b>Kalça (cm) :</b></td>
                      <td colspan='2'>{{ userData.hip }}</td>
                    </tr>
                    <tr>
                      <td><b>Göğüs (cm) :</b></td>
                      <td colspan='2'>{{ userData.chest }}</td>
                    </tr>
                    <tr>
                      <td><b>Boyun (cm) : </b></td>
                      <td colspan='2'>{{ userData.neck }}</td>
                    </tr>
                    <tr>
                      <td><b>Üst Kol (cm) :</b></td>
                      <td colspan='2'>{{ userData.upperArm }}</td>
                    </tr>
                    <tr>
                      <td><b>Alt Kol (cm) :</b></td>
                      <td colspan='2'>{{ userData.lowerArm }}</td>
                    </tr>
                    <tr>
                      <td><b>Kol Bileği (cm) :</b></td>
                      <td colspan='2'>{{ userData.wrist }}</td>
                    </tr>
                    <tr>
                      <td><b>Üst Bacak (cm) :</b></td>
                      <td colspan='2'>{{ userData.upperLeg }}</td>
                    </tr>
                    <tr>
                      <td><b>Alt Bacak (cm) :</b></td>
                      <td colspan='2'>{{ userData.lowerLeg }}</td>
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
                        Profil Bilgileri
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
                            ref='informationForm'
                            enctype='multipart/form-data'
                            @submit.prevent='handleSubmit(updateInformation)'
                          >
                            <v-simple-table>
                              <tbody>
                              <tr>
                                <td>
                                  <b>Adınız ve Soyadınız :</b>
                                </td>
                                <td colspan='2'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Adınız ve Soyadınız'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='name'
                                      v-model='userData.name'
                                      clearable
                                      label='Adınız ve Soyadınız'
                                      name='name'
                                      type='text'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Email Adresiniz'
                                    rules='required|email'
                                  >
                                    <v-text-field
                                      id='email'
                                      v-model='userData.email'
                                      clearable
                                      label='Email Adresiniz'
                                      name='email'
                                      type='text'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Telefon Numaranız'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='phone'
                                      v-model='userData.phone'
                                      clearable
                                      label='Telefon Numaranız'
                                      name='phone'
                                      type='text'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense dismissible type='warning'>
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
                                    v-slot='{ errors }'
                                    name='T.C. Kimlik Numaranız'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='tc'
                                      v-model='userData.tc'
                                      class='form-control'
                                      clearable
                                      label='T.C. Kimlik Numaranız'
                                      name='tc'
                                      type='text'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Cinsiyetiniz'
                                    rules='required'
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
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                      {{ errors[0] }}
                                    </v-alert>
                                  </ValidationProvider>
                                </td>
                              </tr>
                              <tr>
                                <td><b>Özel Durum :</b></td>
                                <td colspan='2'>
                                  <ValidationProvider
                                    v-slot='{ errors }'
                                    name='Özel Durum'
                                    rules='required'
                                  >
                                    <v-autocomplete
                                      id='special_case'
                                      v-model='userData.special_case'
                                      :items='specialCases'
                                      class='form-control'
                                      clearable
                                      item-text='value'
                                      item-value='value'
                                      label='Özel Durum'
                                      name='special_case'

                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='İkamet Ettiğiniz İl'
                                    rules='required'
                                  >
                                    <v-autocomplete
                                      id='city'
                                      ref='city'
                                      v-model='userData.city'
                                      :items='country.cities'
                                      clearable
                                      item-text='name'
                                      item-value='name'
                                      label='İkamet Ettiğiniz İl'
                                      name='city'
                                      return-object
                                      v-on:change='getTowns'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='İkamet Ettiğiniz İlçe'
                                    rules='required'
                                  >
                                    <v-autocomplete
                                      id='town'
                                      ref='town'
                                      v-model='userData.town'
                                      :items='country.towns'
                                      clearable
                                      item-text='name'
                                      item-value='name'
                                      label='İkamet Ettiğiniz İlçe'
                                      name='town'
                                      return-object
                                      v-on:change='getDistricts'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='İkamet Ettiğiniz Semt'
                                    rules='required'
                                  >
                                    <v-autocomplete
                                      id='district'
                                      ref='district'
                                      v-model='userData.district'
                                      :items='country.districts'
                                      clearable
                                      item-text='name'
                                      item-value='name'
                                      label='İkamet Ettiğiniz Semt'
                                      name='district'
                                      return-object
                                      v-on:change='getNeighborhoods'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='İkamet Ettiğiniz Mahalle'
                                    rules='required'
                                  >
                                    <v-autocomplete
                                      id='neighborhood'
                                      ref='neighborhood'
                                      v-model='userData.neighborhood'
                                      :items='country.neighborhoods'
                                      clearable
                                      item-text='name'
                                      item-value='name'
                                      label='İkamet Ettiğiniz Mahalle'
                                      name='neighborhood'
                                      return-object
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='İkamet Ettiğiniz Adres'
                                    rules='required'
                                  >
                                    <v-textarea
                                      id='address'
                                      v-model='userData.address'
                                      class='form-control'
                                      clearable
                                      cols='30'
                                      label='İkamet Ettiğiniz Adres'
                                      name='address'
                                      rows='5'
                                    ></v-textarea>
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Doğum Tarihi'
                                    rules='required'
                                  >
                                    <v-menu
                                      ref='menu'
                                      v-model='menu'
                                      :close-on-content-click='false'
                                      min-width='auto'
                                      offset-y
                                      transition='scale-transition'
                                    >
                                      <template v-slot:activator='{ on, attrs }'>
                                        <v-text-field
                                          v-model='userData.birthDate'
                                          v-bind='attrs'
                                          v-on='on'
                                          label='Doğum Tarihi'
                                          name='birthDate'
                                          prepend-icon='mdi-calendar'
                                          readonly
                                          type='date'
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
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Boy (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='size'
                                      v-model='userData.size'
                                      clearable
                                      label='Boy (cm)'
                                      name='size'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Ağırlık (kg)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='weight'
                                      v-model='userData.weight'
                                      clearable
                                      label='Ağırlık (kg)'
                                      name='weight'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Bel (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='waist'
                                      v-model='userData.waist'
                                      clearable
                                      label='Bel (cm)'
                                      name='waist'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Kalça (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='hip'
                                      v-model='userData.hip'
                                      clearable
                                      label='Kalça (cm)'
                                      name='hip'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Göğüs (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='chest'
                                      v-model='userData.chest'
                                      clearable
                                      label='Göğüs (cm)'
                                      name='chest'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Boyun (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='neck'
                                      v-model='userData.neck'
                                      clearable
                                      label='Boyun (cm)'
                                      name='neck'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Üst Kol (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='upperArm'
                                      v-model='userData.upperArm'
                                      class='form-control'
                                      clearable
                                      label='Üst Kol (cm)'
                                      name='upperArm'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Alt Kol (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='lowerArm'
                                      v-model='userData.lowerArm'
                                      class='form-control'
                                      clearable
                                      label='Alt Kol (cm)'
                                      name='lowerArm'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Kol Bileği (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='wrist'
                                      v-model='userData.wrist'
                                      class='form-control'
                                      clearable
                                      label='Kol Bileği (cm)'
                                      name='wrist'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Üst Bacak (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='upperLeg'
                                      v-model='userData.upperLeg'
                                      class='form-control'
                                      clearable
                                      label='Üst Bacak (cm)'
                                      name='upperLeg'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Alt Bacak (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='lowerLeg'
                                      v-model='userData.lowerLeg'
                                      class='form-control'
                                      clearable
                                      label='Alt Bacak (cm)'
                                      name='lowerLeg'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                    v-slot='{ errors }'
                                    name='Deri Kıvrım Kalınlığı (cm)'
                                    rules='required'
                                  >
                                    <v-text-field
                                      id='skinfoldThickness'
                                      v-model='userData.skinfoldThickness'
                                      class='form-control'
                                      clearable
                                      label='Deri Kıvrım Kalınlığı (cm)'
                                      name='skinfoldThickness'
                                      type='number'
                                    />
                                    <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
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
                                  {{ userData.fatRatio }}
                                </td>
                                <td>
                                  {{ userData.fat }}
                                  KG
                                </td>
                              </tr>
                              <tr>
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
                              <tr>
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
                                <td class='align-middle' colspan='2'>
                                  <v-file-input
                                    v-model='imgURL'
                                    accept='image/*'
                                    clearable
                                    label='Profil Resminiz'
                                    name='img_url'
                                    placeholder='Profil Resminiz'
                                    type='file'
                                  />
                                </td>
                              </tr>
                              </tbody>
                              <tfoot>
                              <tr>
                                <td colspan='3' style='text-align: end'>
                                  <v-btn
                                    class='ml-auto mb-2 justify-end'
                                    color='error'
                                    @click='e1=2'
                                  >
                                    Danışan Bilgilerini Kaydetmeden İlerle
                                  </v-btn>
                                  <v-btn
                                    class='ml-auto mb-2 justify-end'
                                    color='primary'
                                    type='submit'
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
                            ref='diseaseInformationForm'
                            enctype='multipart/form-data'
                            @submit.prevent='handleSubmit(updateDiseaseInformation)'
                          >
                            <ValidationProvider
                              v-slot='{ errors }'
                              name='Hastalık'
                              rules=''
                            >
                              <v-autocomplete
                                v-model='selectedDiseases'
                                :items='diseases'
                                chips
                                item-text='name'
                                item-value='_id.$oid'
                                label='Hastalık Seçin'
                                multiple
                                name='selectedDiseases'
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
                              <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>

                            <v-btn class='mb-2' color='primary' type='submit'>
                              Hastalık Bilgisini Kaydet ve İlerle
                            </v-btn>
                            <v-btn class='mb-2' color='error' type='button' @click.prevent='e1=3'>
                              Hastalık Bilgisini Kaydetmeden İlerle
                            </v-btn>
                            <v-btn class='mb-2' color='info' type='button' @click.prevent='e1 = 1'>
                              Geri Dön
                            </v-btn>
                          </form>
                        </ValidationObserver>
                      </v-stepper-content>
                      <v-stepper-content step='3'>
                        <ValidationObserver v-slot='{ handleSubmit }'>
                          <form
                            ref='AllergenFoodsInformationForm'
                            enctype='multipart/form-data'
                            @submit.prevent='handleSubmit(updateAllergenFoodsInformation)'
                          >
                            <ValidationProvider
                              v-slot='{ errors }'
                              name='Alerjen Besinler'
                              rules=''
                            >
                              <v-autocomplete
                                v-model='selectedAllergenFoods'
                                :items='allergenFoods'
                                chips
                                item-text='name'
                                item-value='_id.$oid'
                                label='Alerjen Besin Seçin'
                                multiple
                                name='selectedAllergenFoods'
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
                              <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>

                            <v-btn class='mb-2' color='primary' type='submit'>
                              Alerjen Besin Bilgisini Kaydet ve İlerle
                            </v-btn>
                            <v-btn class='mb-2' color='error' type='button' @click.prevent='e1=4'>
                              Alerjen Besin Bilgisini Kaydetmeden İlerle
                            </v-btn>
                            <v-btn class='mb-2' color='info' type='button' @click.prevent='e1 = 2'>
                              Geri Dön
                            </v-btn>
                          </form>
                        </ValidationObserver>
                      </v-stepper-content>
                      <v-stepper-content step='4'>
                        <ValidationObserver v-slot='{ handleSubmit }'>
                          <form
                            ref='UnlikedFoodsInformationForm'
                            enctype='multipart/form-data'
                            @submit.prevent='handleSubmit(updateUnlikedFoodsInformation)'
                          >
                            <ValidationProvider
                              v-slot='{ errors }'
                              name='Sevilmeyen Besinler'
                              rules=''
                            >
                              <v-autocomplete
                                v-model='selectedUnlikedFoods'
                                :items='unlikedFoods'
                                chips
                                item-text='name'
                                item-value='_id.$oid'
                                label='Sevilmeyen Besin Seçin'
                                multiple
                                name='selectedUnlikedFoods'
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
                              <v-alert v-show='errors[0]' class='my-1' dense type='warning'>
                                {{ errors[0] }}
                              </v-alert>
                            </ValidationProvider>

                            <v-btn class='mb-2' color='primary' type='submit'>
                              Sevilmeyen Besin Bilgisini Kaydet
                            </v-btn>
                            <v-btn class='mb-2' color='info' type='button' @click.prevent='e1 = 3'>
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
                    sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui
                    magna,
                    posuere eget, vestibulum et, tempor auctor, justo.
                  </p>

                  <p class='mb-0'>
                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a,
                    auctor
                    quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at
                    tortor in tellus interdum sagittis.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

        </v-card-text>
      </v-card>

    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Breadcrumb from '@/components/includes/Breadcrumb'

export default {
  middleware: ['auth'],
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
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
    if (!this.isEmpty(this.userData) && this.userData.status === 'dietician') {
      this.getCities2()
      this.getDiseases2()
    }
    let inputs = document.querySelectorAll('.v-file-input input');
    [...inputs].forEach(input => {
      input.remove()
    })
  },
  data() {
    return {
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
          (this.userData.status === 'dietician'
            ? 'dietician/profile/update/'
            : 'users/update/') +
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
        })
    },
    updateAllergenFoodsInformation() {
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
        })
    },
    updateUnlikedFoodsInformation() {
      let formData = new FormData(this.$refs.unlikedFoodsInformationForm)
      formData.append('dietician_id', this.userData._id)
      formData.append('tc', this.data.tc)
      formData.append('phone', this.data.phone)
      formData.append('id', this.data._id.$oid)
      formData.delete('selectedUnlikedFoods')
      formData.append('selectedUnlikedFoods', this.selectedUnlikedFoods)
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
    },
    logout() {
      this.$auth.logout()
      this.$auth.$storage.removeUniversal('user')
      this.$auth.strategy.refreshToken.reset()
      this.$auth.strategy.token.reset()
      this.$auth.reset()
      this.$izitoast.success({
        title: 'Başarılı!',
        message: 'Başarıyla Çıkış Yaptınız Yönlendiriliyorsunuz.',
        position: 'topCenter'
      })
      setTimeout(() => {
        this.$router.go('/')
      }, 2000)
    },
    getCities2() {
      this.$axios
        .get(process.env.apiBaseUrl + 'informations/cities')
        .then(response => {
          this.country2.cities =
            response.data.data.cities.length > 0
              ? response.data.data.cities
              : []
          setTimeout(() => {
            this.getTowns2()
          }, 100)
        })
    },
    getTowns2: function(event) {
      let townIds = null
      if (event !== undefined && event.target.options.selectedIndex > -1) {
        const theTarget =
          event.target.options[event.target.options.selectedIndex].dataset
        townIds = theTarget.id
      }
      if (this.isEmpty(townIds)) {
        for (let element in this.$refs.company_city.options) {
          if (this.$refs.company_city.options[element].selected) {
            townIds = this.$refs.company_city.options[element].dataset.id
          }
        }
      }
      this.$axios
        .get(process.env.apiBaseUrl + 'informations/towns?id=' + townIds)
        .then(response => {
          this.country2.towns =
            response.data.towns.length > 0 ? response.data.towns : []
          this.country2.districts = []
          this.userData.company_districts = []
          this.country2.neighborhoods = []
          this.userData.company_neighborhoods = []
          if (event === undefined) {
            setTimeout(() => {
              this.getDistricts2()
            }, 100)
          }
        })
    },
    getDistricts2: function(event) {
      let districtIds = null
      if (event !== undefined && event.target.options.selectedIndex > -1) {
        const theTarget =
          event.target.options[event.target.options.selectedIndex].dataset
        districtIds = theTarget.id
      }
      if (this.isEmpty(districtIds)) {
        for (let element in this.$refs.company_town.options) {
          if (this.$refs.company_town.options[element].selected) {
            districtIds = this.$refs.company_town.options[element].dataset.id
          }
        }
      }
      this.$axios
        .get(
          process.env.apiBaseUrl + 'informations/districts?id=' + districtIds
        )
        .then(response => {
          this.country2.districts =
            response.data.districts.length > 0 ? response.data.districts : []
          this.country2.neighborhoods = []
          this.userData.company_neighborhoods = []
          if (event === undefined) {
            setTimeout(() => {
              this.getNeighborhoods2()
            }, 100)
          }
        })
    },
    getNeighborhoods2: function(event) {
      let neighborhoodIds = null
      if (event !== undefined && event.target.options.selectedIndex > -1) {
        const theTarget =
          event.target.options[event.target.options.selectedIndex].dataset
        neighborhoodIds = theTarget.id
      }
      if (this.isEmpty(neighborhoodIds)) {
        for (let element in this.$refs.company_district.options) {
          if (this.$refs.company_district.options[element].selected) {
            neighborhoodIds = this.$refs.company_district.options[element]
              .dataset.id
          }
        }
      }
      this.$axios
        .get(
          process.env.apiBaseUrl +
          'informations/neighborhoods?id=' +
          neighborhoodIds
        )
        .then(response => {
          this.country2.neighborhoods =
            response.data.neighborhoods.length > 0
              ? response.data.neighborhoods
              : []
        })
    }
  }
}
</script>
