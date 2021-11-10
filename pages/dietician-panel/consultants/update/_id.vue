<template>
  <div>
    <!-- Page Wrapper -->
    <div class="page-wrapper">
      <div class="content container-fluid">

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

        <!-- General -->

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
                        <b>Ad ve Soyad :</b>
                      </td>
                      <td colspan='2'>
                        <ValidationProvider
                          name='Ad ve Soyad'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              id='name'
                              type='text'
                              name='name'
                              v-model='data.name'
                              clearable
                              label='Ad ve Soyad'
                              outlined
                              hide-details
                            />
                            <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
                        </ValidationProvider>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Email :</b>
                      </td>
                      <td colspan='2'>
                        <ValidationProvider
                          name='Email'
                          rules='required|email'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              id='email'
                              type='text'
                              name='email'
                              v-model='data.email'
                              clearable
                              label='Email'
                              outlined
                              hide-details
                            />
                            <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
                        </ValidationProvider>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Telefon :</b>
                      </td>
                      <td colspan='2'>
                        <ValidationProvider
                          name='Telefon'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              id='phone'
                              type='text'
                              name='phone'
                              v-model='data.phone'
                              clearable
                              label='Telefon'
                              outlined
                              hide-details
                            />
                            <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>

                        </ValidationProvider>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>T.C. Kimlik No :</b>
                      </td>
                      <td colspan='2'>
                        <ValidationProvider
                          name='T.C. Kimlik No'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              id='tc'
                              type='text'
                              name='tc'
                              v-model='data.tc'
                              clearable
                              label='T.C. Kimlik No'
                              outlined
                              hide-details
                            />
                            <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
                        </ValidationProvider>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Cinsiyet :</b>
                      </td>
                      <td colspan='2'>
                        <ValidationProvider
                          name='Cinsiyet'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
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
                          </div>
                        </ValidationProvider>
                      </td>
                    </tr>
                    <tr v-if='data.gender === "Kadın" && data.status !== "dietician"'>
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
                            v-model='data.special_case'
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
                    <tr v-if='data.gender === "Kadın" && data.special_case === "HAMİLE" && data.status !== "dietician"'>
                      <td><b>Hamileliğin Kaçıncı Ayında? :</b></td>
                      <td colspan='2' class='p-2'>
                        <ValidationProvider
                          name='Hamileliğin Kaçıncı Ayında?'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <v-autocomplete
                            name='special_case_month'
                            id='special_case_month'
                            :items='special_case_months'
                            v-model='data.special_case_month'
                            clearable
                            label='Hamileliğin Kaçıncı Ayında?'
                            hide-details
                            outlined
                          />
                          <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                            {{ errors[0] }}
                          </v-alert>
                        </ValidationProvider>
                      </td>
                    </tr>
                    <tr v-if='data.gender === "Kadın" && data.special_case === "HAMİLE" && data.status !== "dietician"'>
                      <td><b>Hamilelik Öncesi Ağırlık :</b></td>
                      <td colspan='2' class='p-2'>
                        <ValidationProvider
                          name='Hamilelik Öncesi Ağırlık (kg)'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <v-text-field
                            type='number'
                            name='special_case_weight'
                            id='special_case_weight'
                            v-model='data.special_case_weight'
                            clearable
                            hide-details
                            outlined
                            label='Hamilelik Öncesi Ağırlık (kg)'
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
                      <td colspan='2'>
                        <ValidationProvider
                          name='İkamet Ettiğiniz İl'
                          rules='required'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
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
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          <div class='form-group my-2'>
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
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          <div class='form-group my-2'>
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
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          <div class='form-group my-2'>
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
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          <div class='form-group my-2'>
                            <v-textarea
                              name='address'
                              id='address'
                              cols='30'
                              rows='5'
                              v-model='data.address'
                              clearable
                              label='İkamet Ettiğiniz Adres'
                              hide-details
                              outlined
                            ></v-textarea>
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          :rules='"required"'
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
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
                                  label='Doğum Tarihiniz (Örn: 31-12-2002)'
                                  pattern='[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}'
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
                                  @click:clear='data.birthDate = null'
                                  v-on:click:prepend='menu=true'
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model='data.birthDate'
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
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='size'
                              id='size'
                              v-model='data.size'
                              clearable
                              label='Boy (cm)'
                              outlined
                              hide-details
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='weight'
                              id='weight'
                              v-model='data.weight'
                              clearable
                              label='Ağırlık (kg)'
                              outlined
                              hide-details
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='waist'
                              id='waist'
                              v-model='data.waist'
                              clearable
                              label='Bel (cm)'
                              outlined
                              hide-details
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='hip'
                              id='hip'
                              v-model='data.hip'
                              clearable
                              label='Kalça (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='chest'
                              id='chest'
                              v-model='data.chest'
                              clearable
                              label='Göğüs (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='neck'
                              id='neck'
                              v-model='data.neck'
                              clearable
                              label='Boyun (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='upperArm'
                              id='upperArm'
                              v-model='data.upperArm'
                              clearable
                              label='Üst Kol (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='lowerArm'
                              id='lowerArm'
                              v-model='data.lowerArm'
                              clearable
                              label='Alt Kol (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='wrist'
                              id='wrist'
                              v-model='data.wrist'
                              clearable
                              label='Kol Bileği (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='upperLeg'
                              id='upperLeg'
                              v-model='data.upperLeg'
                              clearable
                              label='Üst Bacak (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='lowerLeg'
                              id='lowerLeg'
                              v-model='data.lowerLeg'
                              clearable
                              label='Alt Bacak (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                          v-slot='{ errors }'
                        >
                          <div class='form-group my-2'>
                            <v-text-field
                              type='number'
                              name='skinfoldThickness'
                              id='skinfoldThickness'
                              v-model='data.skinfoldThickness'
                              clearable
                              label='Deri Kıvrım Kalınlığı (cm)'
                              hide-details
                              outlined
                            />
                            <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                              {{ errors[0] }}
                            </v-alert>
                          </div>
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
                        <div class='form-group my-2'>
                          <v-file-input
                            type='file'
                            accept='image/*'
                            placeholder='Profil Resminiz'
                            name='img_url'
                            label='Profil Resminiz'
                            clearable
                            hide-details
                            outlined
                          />
                        </div>
                      </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                      <td colspan='3' style='text-align: end'>
                        <v-btn
                          type='submit'
                          color='primary'
                          class='ml-auto justify-end'
                        >
                          Danışan Bilgilerini Güncelle ve İlerle
                        </v-btn>
                        <v-btn color='error' type='button' class='ml-auto justify-end' @click.prevent='e1=2'>
                          Danışan Bilgisilerini Güncellemeden İlerle
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
                  @submit.prevent='handleSubmit(saveDiseaseInformation)'
                  ref='diseaseInformationForm'
                  enctype='multipart/form-data'
                >
                  <ValidationProvider
                    name='Hastalık'
                    rules=''
                    v-slot='{ errors }'
                  >
                    <div class='form-group'>
                      <v-autocomplete
                        name='selectedDiseases'
                        v-model='selectedDiseases'
                        :items='diseases'
                        chips
                        label='Hastalık Seçin'
                        item-text='name'
                        item-value='_id.$oid'
                        multiple
                        hide-details
                        outlined
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
                    </div>
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
                  @submit.prevent='handleSubmit(saveAllergenFoodsInformation)'
                  ref='AllergenFoodsInformationForm'
                  enctype='multipart/form-data'
                >
                  <ValidationProvider
                    name='Alerjen Besinler'
                    rules=''
                    v-slot='{ errors }'
                  >
                    <div class='form-group'>
                      <v-autocomplete
                        name='selectedAllergenFoods'
                        v-model='selectedAllergenFoods'
                        :items='allergenFoods'
                        chips
                        label='Alerjen Besin Seçin'
                        item-text='name'
                        item-value='_id.$oid'
                        multiple
                        hide-details
                        outlined
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
                    </div>
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
                  @submit.prevent='handleSubmit(saveUnlikedFoodsInformation)'
                  ref='UnlikedFoodsInformationForm'
                  enctype='multipart/form-data'
                >
                  <ValidationProvider
                    name='Sevilmeyen Besinler'
                    rules=''
                    v-slot='{ errors }'
                  >
                    <div class='form-group'>
                      <v-autocomplete
                        name='selectedUnlikedFoods'
                        v-model='selectedUnlikedFoods'
                        :items='unlikedFoods'
                        chips
                        label='Sevilmeyen Besin Seçin'
                        item-text='name'
                        item-value='_id.$oid'
                        multiple
                        hide-details
                        outlined
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
                    </div>
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

        <!-- /General -->

      </div>
    </div>
    <!-- /Page Wrapper -->
    <Nuxt />
  </div>
</template>

<script>
import Breadcrumb from "~/components/backend/breadcrumb"
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Editor from "@tinymce/tinymce-vue";
import moment from "moment";
export default {
  components:{
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor,
  },
  name: 'users-update',
  middleware: ["auth","dietician"],
  layout: 'dietician',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
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
    },
    computedDateFormattedMomentjs: {
      get() {
        return !this.isEmpty(this.data.birthDate) && this.data.birthDate.length === 10 ? moment(this.data.birthDate).format('DD-MM-YYYY') : null
      },
      set(val) {
        let isValid = moment(val, 'DD-MM-YYYY')
        if (!this.isEmpty(val) && val.length === 10 && isValid.isValid()) {
          console.log(val)
          console.log(moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          this.data.birthDate = moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD')
        }
      }
    }
  },
  mounted() {
    this.getCities()
    this.getDiseases()
  },
  data(){
    return {
      tab: null,
      disease: null,
      diseases: [],
      selectedDiseases: [],
      allergenFood: null,
      allergenFoods: [],
      selectedAllergenFoods: [],
      unlikedFood: null,
      unlikedFoods: [],
      selectedUnlikedFoods: [],
      e1: 1,
      breadCrumbItems: [
        { name: 'Anasayfa', url: '/dietician-panel' },
        { name: 'Danışanlarım', url: '/dietician-panel/consultants' },
        { name: 'Danışan Düzenle' }
      ],
      specialCases: [{ 'value': 'YOK' }, { 'value': 'EMZİKLİ' }, { 'value': 'HAMİLE' }],
      activePicker: null,
      menu: false,
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
      ]
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null;
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + "dietician/users/update/" + params.id
      );
      console.log(data)
      return data;
    } catch (e) {
      console.log(e)
      error({ message: "Kullanıcı Bilgisi Bulunamadı.", statusCode: 404 });
    }
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
      } catch (e) {
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
      } catch (e) {
        console.log(e)
      }
    },
    toggleUnlikedFoods() {
      try {
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
      } catch (e) {
        console.log(e)
      }
    },
    getDiseases() {
      try {
        this.$axios
          .get(`${process.env.apiBaseUrl}dietician/users/user-diseases-get`)
          .then(response => {
            this.diseases = response.data.data.diseases
            this.allergenFoods = response.data.data.allergenFoods
            this.unlikedFoods = response.data.data.unlikedFoods
            console.log(this.diseases)
          })
          .catch(err => console.log(err))
      } catch (e) {
        console.log(e)
      }
    },
    remove(item) {
      try {
        const index = this.selectedDiseases.indexOf(item._id.$oid)
        if (index >= 0) this.selectedDiseases.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    },
    removeAllergenFoods(item) {
      try {
        const index = this.selectedAllergenFoods.indexOf(item._id.$oid)
        if (index >= 0) this.selectedAllergenFoods.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    },
    removeUnlikedFoods(item) {
      try {
        const index = this.selectedUnlikedFoods.indexOf(item._id.$oid)
        if (index >= 0) this.selectedUnlikedFoods.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
    },
    save(date) {
      try {
        this.$refs.menu.save(date)
      } catch (e) {
        console.log(e)
      }
    },
    getCities() {
      try {
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
          }).catch((e) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    },
    getTowns: function(item) {
      try {
        if (!this.isEmpty(item) && !this.isEmpty(item.towns)){
          this.$axios
          .get(process.env.apiBaseUrl + 'informations/towns?id=' + item.towns)
          .then(response => {
            this.country.towns =
              response.data.towns.length > 0 ? response.data.towns : []
            this.country.districts = []
            this.country.neighborhoods = []
            let item = this.country.towns.filter(obj => {
              return obj.name === this.data.town
            })
            this.getDistricts(item[0])
          }).catch((e) => console.log(e))
        }
      } catch (e) {
        console.log(e)
      }
    },
    getDistricts: function(item) {
      try {
        if (!this.isEmpty(item) && !this.isEmpty(item.districts)) {
          this.$axios
            .get(
              process.env.apiBaseUrl + 'informations/districts?id=' + item.districts
            )
            .then(response => {
              this.country.districts =
                response.data.districts.length > 0 ? response.data.districts : []
              this.country.neighborhoods = []
              let item = this.country.districts.filter(obj => {
                return obj.name === this.data.district
              })
              this.getNeighborhoods(item[0])
            }).catch((e) => console.log(e))
        }
      } catch (e) {
        console.log(e)
      }
    },
    getNeighborhoods: function(item) {
      try {
        if (!this.isEmpty(item) && !this.isEmpty(item.neighborhoods)) {
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
            }).catch((e) => console.log(e))
        }
      } catch (e) {
        console.log(e)
      }
    },
    updateInformation() {
      try {
        let formData = new FormData(this.$refs.informationForm)
        formData.delete('district')
        formData.delete('neighborhood')
        formData.delete('city')
        formData.delete('town')
        if(!this.isEmpty(this.data.district.name)){
          formData.append('district', this.data.district.name)
        }else{
          formData.append('district', this.data.district)
        }
        if(!this.isEmpty(this.data.neighborhood.name)){
          formData.append('neighborhood', this.data.neighborhood.name)
        }else{
          formData.append('neighborhood', this.data.neighborhood)
        }
        if(!this.isEmpty(this.data.town.name)){
          formData.append('town', this.data.town.name)
        }else{
          formData.append('town', this.data.town)
        }
        if(!this.isEmpty(this.data.city.name)){
          formData.append('city', this.data.city.name)
        }else{
          formData.append('city', this.data.city)
        }
        formData.append('dietician_id', this.user._id)
        formData.append('birthDate', moment(this.data.birthDate).format('YYYY-MM-DD'))
        this.$axios
          .post(process.env.apiBaseUrl + 'dietician/users/update/'+this.data._id.$oid, formData, {
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
              this.e1 = 2
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
    saveDiseaseInformation() {
      try {
        let formData = new FormData(this.$refs.diseaseInformationForm)
        formData.append('dietician_id', this.user._id)
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
              this.e1 = 3
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
    saveAllergenFoodsInformation() {
      try {
        let formData = new FormData(this.$refs.diseaseInformationForm)
        formData.append('dietician_id', this.user._id)
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
              this.e1 = 4
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
    saveUnlikedFoodsInformation() {
      try {
        let formData = new FormData(this.$refs.diseaseInformationForm)
        formData.append('dietician_id', this.user._id)
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
          })
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style scoped>

</style>
