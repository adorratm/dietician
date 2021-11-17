<template>
  <div>
    <!-- Page Wrapper -->
    <div class='page-wrapper'>
      <div class='content container-fluid mb-5'>

        <!-- Page Header -->
        <Breadcrumb :items='breadCrumbItems' />
        <!-- /Page Header -->

        <!-- General -->

        <v-stepper v-model='e1'>
          <v-stepper-header>
            <v-stepper-step :complete='e1 > 1' step='1'>
              Diyetisyen Bilgileri
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content class='p-0' step='1'>
              <ValidationObserver v-slot='{ handleSubmit }'>
                <form
                  @submit.prevent='handleSubmit(updateInformation)'
                  ref='informationForm'
                  enctype='multipart/form-data'
                >
                  <div class='table-responsive'>
                    <table class='table table-striped table-bordered table-hover w-100'>
                      <tbody>
                      <tr>
                        <td class='align-middle p-2' width='150'>
                          <b>Ad ve Soyad :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
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
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>Email :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
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
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>Telefon :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
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
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>

                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>T.C. Kimlik No :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
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
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>Cinsiyet :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
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
                                dense
                                hide-details
                                class='mt-0'
                              >
                                <v-radio value='Erkek' label='Erkek' />
                                <v-radio value='Kadın' label='Kadın' />
                              </v-radio-group>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>İkamet Ettiği İl :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İkamet Ettiği İl'
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
                                label='İkamet Ettiği İl'
                                hide-details
                                outlined
                                dense
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>İkamet Ettiği İlçe :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İkamet Ettiği İlçe'
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
                                label='İkamet Ettiği İlçe'
                                return-object
                                clearable
                                hide-details
                                outlined
                                dense
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>İkamet Ettiği Semt :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İkamet Ettiği Semt'
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
                                label='İkamet Ettiği Semt'
                                return-object
                                clearable
                                hide-details
                                outlined
                                dense
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>İkamet Ettiği Mahalle :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İkamet Ettiği Mahalle'
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
                                label='İkamet Ettiği Mahalle'
                                hide-details
                                outlined
                                dense
                              />
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>İkamet Ettiği Adres :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İkamet Ettiği Adres'
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
                                label='İkamet Ettiği Adres'
                                hide-details
                                outlined
                                dense
                              ></v-textarea>
                              <v-alert type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr>
                        <td class='align-middle p-2'>
                          <b>Doğum Tarihi :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
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
                                    label='Doğum Tarihi (Örn: 31-12-2002)'
                                    pattern='[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}'
                                    prepend-icon='mdi-calendar'
                                    min='1950-01-01'
                                    :max='(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)'
                                    v-bind='attrs'
                                    v-on='on'
                                    hide-details
                                    clearable
                                    outlined
                                    dense
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
                        <td class='align-middle p-2'>
                          <b>Profil Resmi :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <div class='form-group my-2'>
                            <v-file-input
                              type='file'
                              accept='image/*'
                              placeholder='Profil Resmi'
                              name='profile_photo'
                              label='Profil Resmi'
                              clearable
                              hide-details
                              outlined
                              dense
                            />
                          </div>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td>
                          <b>İş Yerinin Bulunduğu İl :</b>
                        </td>
                        <td colspan='2' class='p-2'>
                          <ValidationProvider
                            name='İş Yerinin Bulunduğu İl'
                            rules='required'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-autocomplete
                                v-on:change='getTownsCompany'
                                name='company_city'
                                id='company_city'
                                :items='countryCompany.cities'
                                item-value='name'
                                item-text='name'
                                v-model='data.company_city'
                                ref='company_city'
                                clearable
                                hide-details
                                outlined
                                return-object
                                autocomplete='off'
                                label='İş Yerinin Bulunduğu İl'
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td>
                          <b>İş Yerinin Bulunduğu İlçe :</b>
                        </td>
                        <td colspan='2' class='p-2'>
                          <ValidationProvider
                            name='İş Yerinin Bulunduğu İlçe'
                            rules='required'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-autocomplete
                                v-on:change='getDistrictsCompany'
                                name='company_town'
                                id='company_town'
                                ref='company_town'
                                v-model='data.company_town'
                                :items='countryCompany.towns'
                                item-value='name'
                                item-text='name'
                                label='İş Yerinin Bulunduğu İlçe'
                                return-object
                                autocomplete='off'
                                clearable
                                hide-details
                                outlined
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td>
                          <b>İş Yerinin Bulunduğu Semt :</b>
                        </td>
                        <td colspan='2' class='p-2'>
                          <ValidationProvider
                            name='İş Yerinin Bulunduğu Semt'
                            rules='required'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-autocomplete
                                v-on:change='getNeighborhoodsCompany'
                                name='company_district'
                                id='company_district'
                                ref='company_district'
                                v-model='data.company_district'
                                :items='countryCompany.districts'
                                item-text='name'
                                item-value='name'
                                label='İş Yerinin Bulunduğu Semt'
                                return-object
                                clearable
                                autocomplete='off'
                                hide-details
                                outlined
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td>
                          <b>İş Yerinin Bulunduğu Mahalle :</b>
                        </td>
                        <td colspan='2' class='p-2'>
                          <ValidationProvider
                            name='İş Yerinin Bulunduğu Mahalle'
                            rules='required'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-autocomplete
                                name='company_neighborhood'
                                id='company_neighborhood'
                                ref='company_neighborhood'
                                v-model='data.company_neighborhood'
                                :items='countryCompany.neighborhoods'
                                item-value='name'
                                item-text='name'
                                clearable
                                return-object
                                autocomplete='off'
                                label='İş Yerinin Bulunduğu Mahalle'
                                hide-details
                                outlined
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td>
                          <b>İş Yerinin Bulunduğu Adres :</b>
                        </td>
                        <td colspan='2' class='p-2'>
                          <ValidationProvider
                            name='İş Yerinin Bulunduğu Adres'
                            rules='required'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-textarea
                                name='company_address'
                                id='company_address'
                                cols='30'
                                rows='5'
                                v-model='data.company_address'
                                clearable
                                hide-details
                                outlined
                                label='İş Yerinin Bulunduğu Adres'
                              ></v-textarea>
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td>
                          <b>İş Telefon Numarası :</b>
                        </td>
                        <td colspan='2' class='p-2'>
                          <ValidationProvider
                            name='İş Telefon Numarası'
                            rules='required'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-text-field
                                id='work_phone'
                                type='text'
                                name='work_phone'
                                v-model='data.work_phone'
                                clearable
                                outlined
                                hide-details
                                label='İş Telefon Numarası'
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td class='align-middle p-2'>
                          <b>İş Telefon Numarası 2 :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İş Telefon Numarası 2'
                            rules=''
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-text-field
                                id='work_phone_2'
                                type='text'
                                name='work_phone_2'
                                v-model='data.work_phone_2'
                                clearable
                                outlined
                                hide-details
                                label='İş Telefon Numarası 2'
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td class='align-middle p-2'>
                          <b>İş Email Adresi :</b>
                        </td>
                        <td colspan='2' class='align-middle p-2'>
                          <ValidationProvider
                            name='İş Email Adresi'
                            rules='email'
                            v-slot='{ errors }'
                          >
                            <div class='form-group my-2'>
                              <v-text-field
                                id='work_email'
                                type='text'
                                name='work_email'
                                v-model='data.work_email'
                                clearable
                                outlined
                                hide-details
                                label='İş Email Adresi'
                                dense
                              />
                              <v-alert dismissible type='warning' dense v-show='errors[0]' class='my-1'>
                                {{ errors[0] }}
                              </v-alert>
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                      <tr v-if='data.status === "dietician"'>
                        <td colspan='2' class='align-middle p-2'>
                          <v-card
                          >
                            <v-card-title class='text-h5'>
                              Çalışma Saatleri
                            </v-card-title>

                            <v-card-subtitle>Çalışma Saatlerini Aşağıdaki Bölümden Seçiniz. Kapalı Olarak
                              İşaretlediğiniz Günlerde Diyetisyen Randevu Alamayacaktır.
                            </v-card-subtitle>

                            <v-card-text>
                              <!-- Business Hours Widget -->
                              <div class='widget business-widget'>
                                <div class='widget-content'>
                                  <div class='listing-hours'>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Pazartesi</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                            <v-row>
                                              <v-col>
                                                <v-menu
                                                  ref='monday_start'
                                                  v-model='monday_start'
                                                  :close-on-content-click='false'
                                                  :nudge-right='35'
                                                  :return-value.sync='data.monday_start'
                                                  transition='scale-transition'
                                                  max-width='290px'
                                                  min-width='290px'
                                                  offset-y
                                                >
                                              <template v-slot:activator='{ on, attrs }'>
                                                <v-text-field
                                                  v-model='data.monday_start'
                                                  label='Başlangıç Saati:'
                                                  prepend-icon='mdi-clock-time-four-outline'
                                                  readonly
                                                  v-bind='attrs'
                                                  v-on='on'
                                                  clearable
                                                  hide-details
                                                  outlined
                                                  dense
                                                  v-on:click:prepend='monday_start=true'
                                                ></v-text-field>
                                              </template>
                                              <v-time-picker
                                                v-if='monday_start'
                                                v-model='data.monday_start'
                                                max='23:59'
                                                format='24hr'
                                                full-width
                                                @click:minute='$refs.monday_start.save(data.monday_start)'
                                              ></v-time-picker>
                                            </v-menu>
                                              </v-col>
                                              <v-col>
                                                <v-menu
                                                  ref='monday_end'
                                                  v-model='monday_end'
                                                  :close-on-content-click='false'
                                                  :nudge-right='35'
                                                  :return-value.sync='data.monday_end'
                                                  transition='scale-transition'
                                                  offset-y
                                                  max-width='290px'
                                                  min-width='290px'
                                                >
                                              <template v-slot:activator='{ on, attrs }'>
                                                <v-text-field
                                                  v-model='data.monday_end'
                                                  label='Bitiş Saati:'
                                                  prepend-icon='mdi-clock-time-four-outline'
                                                  readonly
                                                  v-bind='attrs'
                                                  v-on='on'
                                                  clearable
                                                  hide-details
                                                  outlined
                                                  dense
                                                  v-on:click:prepend='monday_end=true'
                                                ></v-text-field>
                                              </template>
                                              <v-time-picker
                                                v-if='monday_end'
                                                v-model='data.monday_end'
                                                format='24hr'
                                                min='00:00'
                                                full-width
                                                @click:minute='$refs.monday_end.save(data.monday_end)'
                                              ></v-time-picker>
                                            </v-menu>
                                              </v-col>
                                            </v-row>
                                          </span>
                                      </div>
                                    </div>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Salı</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                          <v-row>
                                            <v-col>
                                              <v-menu
                                                ref='tuesday_start'
                                                v-model='tuesday_start'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.tuesday_start'
                                                transition='scale-transition'
                                                max-width='290px'
                                                min-width='290px'
                                                offset-y
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.tuesday_start'
                                                label='Başlangıç Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='tuesday_start=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='tuesday_start'
                                              v-model='data.tuesday_start'
                                              max='23:59'
                                              format='24hr'
                                              full-width
                                              @click:minute='$refs.tuesday_start.save(data.tuesday_start)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                            <v-col>
                                              <v-menu
                                                ref='tuesday_end'
                                                v-model='tuesday_end'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.tuesday_end'
                                                transition='scale-transition'
                                                offset-y
                                                max-width='290px'
                                                min-width='290px'
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.tuesday_end'
                                                label='Bitiş Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='tuesday_end=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='tuesday_end'
                                              v-model='data.tuesday_end'
                                              format='24hr'
                                              min='00:00'
                                              full-width
                                              @click:minute='$refs.tuesday_end.save(data.tuesday_end)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                          </v-row>
                                        </span>
                                      </div>
                                    </div>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Çarşamba</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                          <v-row>
                                            <v-col>
                                              <v-menu
                                                ref='wednesday_start'
                                                v-model='wednesday_start'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.wednesday_start'
                                                transition='scale-transition'
                                                max-width='290px'
                                                min-width='290px'
                                                offset-y
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.wednesday_start'
                                                label='Başlangıç Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='wednesday_start=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='wednesday_start'
                                              v-model='data.wednesday_start'
                                              max='23:59'
                                              format='24hr'
                                              full-width
                                              @click:minute='$refs.wednesday_start.save(data.wednesday_start)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                            <v-col>
                                              <v-menu
                                                ref='wednesday_end'
                                                v-model='wednesday_end'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.wednesday_end'
                                                transition='scale-transition'
                                                offset-y
                                                max-width='290px'
                                                min-width='290px'
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.wednesday_end'
                                                label='Bitiş Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='wednesday_end=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='wednesday_end'
                                              v-model='data.wednesday_end'
                                              format='24hr'
                                              min='00:00'
                                              full-width
                                              @click:minute='$refs.wednesday_end.save(data.wednesday_end)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                          </v-row>
                                        </span>
                                      </div>
                                    </div>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Perşembe</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                          <v-row>
                                            <v-col>
                                              <v-menu
                                                ref='thursday_start'
                                                v-model='thursday_start'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.thursday_start'
                                                transition='scale-transition'
                                                max-width='290px'
                                                min-width='290px'
                                                offset-y
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.thursday_start'
                                                label='Başlangıç Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='thursday_start=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='thursday_start'
                                              v-model='data.thursday_start'
                                              max='23:59'
                                              format='24hr'
                                              full-width
                                              @click:minute='$refs.thursday_start.save(data.thursday_start)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                            <v-col>
                                              <v-menu
                                                ref='thursday_end'
                                                v-model='thursday_end'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.thursday_end'
                                                transition='scale-transition'
                                                offset-y
                                                max-width='290px'
                                                min-width='290px'
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.thursday_end'
                                                label='Bitiş Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='thursday_end=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='thursday_end'
                                              v-model='data.thursday_end'
                                              format='24hr'
                                              min='00:00'
                                              full-width
                                              @click:minute='$refs.thursday_end.save(data.thursday_end)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                          </v-row>
                                        </span>
                                      </div>
                                    </div>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Cuma</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                          <v-row>
                                            <v-col>
                                              <v-menu
                                                ref='friday_start'
                                                v-model='friday_start'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.friday_start'
                                                transition='scale-transition'
                                                max-width='290px'
                                                min-width='290px'
                                                offset-y
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.friday_start'
                                                label='Başlangıç Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='friday_start=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='friday_start'
                                              v-model='data.friday_start'
                                              max='23:59'
                                              format='24hr'
                                              full-width
                                              @click:minute='$refs.friday_start.save(data.friday_start)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                            <v-col>
                                              <v-menu
                                                ref='friday_end'
                                                v-model='friday_end'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.friday_end'
                                                transition='scale-transition'
                                                offset-y
                                                max-width='290px'
                                                min-width='290px'
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.friday_end'
                                                label='Bitiş Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='friday_end=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='friday_end'
                                              v-model='data.friday_end'
                                              format='24hr'
                                              min='00:00'
                                              full-width
                                              @click:minute='$refs.friday_end.save(data.friday_end)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                          </v-row>
                                        </span>
                                      </div>
                                    </div>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Cumartesi</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                          <v-row>
                                            <v-col>
                                              <v-menu
                                                ref='saturday_start'
                                                v-model='saturday_start'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.saturday_start'
                                                transition='scale-transition'
                                                max-width='290px'
                                                min-width='290px'
                                                offset-y
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.saturday_start'
                                                label='Başlangıç Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='saturday_start=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='saturday_start'
                                              v-model='data.saturday_start'
                                              max='23:59'
                                              format='24hr'
                                              full-width
                                              @click:minute='$refs.saturday_start.save(data.saturday_start)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                            <v-col>
                                              <v-menu
                                                ref='saturday_end'
                                                v-model='saturday_end'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.saturday_end'
                                                transition='scale-transition'
                                                offset-y
                                                max-width='290px'
                                                min-width='290px'
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.saturday_end'
                                                label='Bitiş Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='saturday_end=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='saturday_end'
                                              v-model='data.saturday_end'
                                              format='24hr'
                                              min='00:00'
                                              full-width
                                              @click:minute='$refs.saturday_end.save(data.saturday_end)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                          </v-row>
                                        </span>
                                      </div>
                                    </div>
                                    <div class='listing-day'>
                                      <div class='day my-auto py-auto'>Pazar</div>
                                      <div class='time-items'>
                                        <span class='time'>
                                          <v-row>
                                            <v-col>
                                              <v-menu
                                                ref='sunday_start'
                                                v-model='sunday_start'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.sunday_start'
                                                transition='scale-transition'
                                                max-width='290px'
                                                min-width='290px'
                                                offset-y
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.sunday_start'
                                                label='Başlangıç Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='sunday_start=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='sunday_start'
                                              v-model='data.sunday_start'
                                              max='23:59'
                                              format='24hr'
                                              full-width
                                              @click:minute='$refs.sunday_start.save(data.sunday_start)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                            <v-col>
                                              <v-menu
                                                ref='sunday_end'
                                                v-model='sunday_end'
                                                :close-on-content-click='false'
                                                :nudge-right='35'
                                                :return-value.sync='data.sunday_end'
                                                transition='scale-transition'
                                                offset-y
                                                max-width='290px'
                                                min-width='290px'
                                              >
                                            <template v-slot:activator='{ on, attrs }'>
                                              <v-text-field
                                                v-model='data.sunday_end'
                                                label='Bitiş Saati:'
                                                prepend-icon='mdi-clock-time-four-outline'
                                                readonly
                                                v-bind='attrs'
                                                v-on='on'
                                                clearable
                                                hide-details
                                                outlined
                                                dense
                                                v-on:click:prepend='sunday_end=true'
                                              ></v-text-field>
                                            </template>
                                            <v-time-picker
                                              v-if='sunday_end'
                                              v-model='data.sunday_end'
                                              format='24hr'
                                              min='00:00'
                                              full-width
                                              @click:minute='$refs.sunday_end.save(data.sunday_end)'
                                            ></v-time-picker>
                                          </v-menu>
                                            </v-col>
                                          </v-row>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- /Business Hours Widget -->
                            </v-card-text>
                            <v-card-actions>

                            </v-card-actions>
                          </v-card>
                        </td>
                      </tr>
                      </tbody>
                      <tfoot>
                      <tr>
                        <td colspan='3' class='align-middle p-2'>
                          <div class='d-flex w-100 flex-wrap'>
                            <v-btn
                              type='submit'
                              color='primary'
                              class='mr-3 justify-end'
                            >
                              Güncelle
                            </v-btn>
                          </div>
                        </td>
                      </tr>
                      </tfoot>
                    </table>
                  </div>
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
import Breadcrumb from '~/components/backend/breadcrumb'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Editor from '@tinymce/tinymce-vue'
import moment from 'moment'

export default {
  components: {
    Breadcrumb,
    ValidationObserver,
    ValidationProvider,
    editor: Editor
  },
  name: 'dieticians-update',
  middleware: ['auth', 'admin'],
  layout: 'admin',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    user() {
      return this.$auth.user
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
    this.getCitiesCompany()
    this.birthDate = this.data.birthDate
    this.birth_year = moment(this.data.birth_year).format('YYYY-MM-DD')
  },
  data() {
    return {
      tab: null,
      e1: 1,
      breadCrumbItems: [
        { name: 'Anasayfa', url: '/panel' },
        { name: 'Diyetisyenler', url: '/panel/dieticians' },
        { name: 'Diyetisyen Düzenle' }
      ],
      activePicker: null,
      activePickerWeight: null,
      menu: false,
      menuWeight: false,
      country: { cities: [], towns: [], districts: [], neighborhoods: [] },
      countryCompany: { cities: [], towns: [], districts: [], neighborhoods: [] },
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
      currentAge: null,
      birth_year: null,
      birthDate: null,
      monday_start: false,
      tuesday_start: false,
      wednesday_start: false,
      thursday_start: false,
      friday_start: false,
      saturday_start: false,
      sunday_start: false,
      monday_end: false,
      tuesday_end: false,
      wednesday_end: false,
      thursday_end: false,
      friday_end: false,
      saturday_end: false,
      sunday_end: false
    }
  },
  validate({ params }) {
    return params.id !== null ? params.id : null
  },
  async asyncData({ params, error, $axios }) {
    try {
      const { data } = await $axios.get(
        process.env.apiBaseUrl + 'panel/dieticians/update/' + params.id
      )
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
      error({ message: 'Diyetisyen Bilgisi Bulunamadı.', statusCode: 404 })
    }
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
    saveWeight(date) {
      try {
        this.$refs.menuWeight.save(date)
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
        if (!this.isEmpty(item) && !this.isEmpty(item.towns)) {
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
    getCitiesCompany() {
      try {
        this.$axios
          .get(process.env.apiBaseUrl + 'informations/cities')
          .then(response => {
            this.countryCompany.cities =
              response.data.data.cities.length > 0
                ? response.data.data.cities
                : []
            let item = this.countryCompany.cities.filter(obj => {
              if (!this.isEmpty(this.data.company_city)) {
                return obj.name === this.data.company_city
              } else {
                return obj.name
              }
            })
            if (!this.isEmpty(item[0])) {
              this.getTownsCompany(item[0])
            }
          }).catch((e) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    },
    getTownsCompany: function(item) {
      try {
        if (!this.isEmpty(item) && !this.isEmpty(item.towns)) {
          this.$axios
            .get(process.env.apiBaseUrl + 'informations/towns?id=' + item.towns.join(','))
            .then(response => {
              this.countryCompany.towns =
                response.data.towns.length > 0 ? response.data.towns : []
              this.countryCompany.districts = []
              this.countryCompany.neighborhoods = []
              let item = this.countryCompany.towns.filter(obj => {
                if (!this.isEmpty(this.data.company_town)) {
                  return obj.name === this.data.company_town
                } else {
                  return obj.name
                }
              })
              if (!this.isEmpty(item[0])) {
                this.getDistrictsCompany(item[0])
              }
            }).catch((e) => console.log(e))
        }
      } catch (e) {
        console.log(e)
      }
    },
    getDistrictsCompany: function(item) {
      try {
        if (!this.isEmpty(item) && !this.isEmpty(item.districts)) {
          this.$axios
            .get(
              process.env.apiBaseUrl + 'informations/districts?id=' + item.districts.join(',')
            )
            .then(response => {
              this.countryCompany.districts =
                response.data.districts.length > 0 ? response.data.districts : []
              this.countryCompany.neighborhoods = []
              let item = this.countryCompany.districts.filter(obj => {
                if (!this.isEmpty(this.data.company_district)) {
                  return obj.name === this.data.company_district
                } else {
                  return obj.name
                }
              })
              if (!this.isEmpty(item[0])) {
                this.getNeighborhoodsCompany(item[0])
              }
            }).catch((e) => console.log(e))
        }
      } catch (e) {
        console.log(e)
      }
    },
    getNeighborhoodsCompany: function(item) {
      try {
        if (!this.isEmpty(item) && !this.isEmpty(item.neighborhoods)) {
          this.$axios
            .get(
              process.env.apiBaseUrl +
              'informations/neighborhoods?id=' +
              item.neighborhoods.join(',')
            )
            .then(response => {
              this.countryCompany.neighborhoods =
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
        if (!this.isEmpty(this.data.district.name)) {
          formData.append('district', this.data.district.name)
        } else {
          formData.append('district', this.data.district)
        }
        if (!this.isEmpty(this.data.neighborhood.name)) {
          formData.append('neighborhood', this.data.neighborhood.name)
        } else {
          formData.append('neighborhood', this.data.neighborhood)
        }
        if (!this.isEmpty(this.data.town.name)) {
          formData.append('town', this.data.town.name)
        } else {
          formData.append('town', this.data.town)
        }
        if (!this.isEmpty(this.data.city.name)) {
          formData.append('city', this.data.city.name)
        } else {
          formData.append('city', this.data.city)
        }
        formData.delete('company_district')
        formData.delete('company_neighborhood')
        formData.delete('company_city')
        formData.delete('company_town')
        if (!this.isEmpty(this.data.company_district.name)) {
          formData.append('company_district', this.data.company_district.name)
        } else {
          formData.append('company_district', this.data.company_district)
        }
        if (!this.isEmpty(this.data.company_neighborhood.name)) {
          formData.append('company_neighborhood', this.data.company_neighborhood.name)
        } else {
          formData.append('company_neighborhood', this.data.company_neighborhood)
        }
        if (!this.isEmpty(this.data.company_town.name)) {
          formData.append('company_town', this.data.company_town.name)
        } else {
          formData.append('company_town', this.data.company_town)
        }
        if (!this.isEmpty(this.data.company_city.name)) {
          formData.append('company_city', this.data.company_city.name)
        } else {
          formData.append('company_city', this.data.company_city)
        }
        formData.append('birthDate', moment(this.data.birthDate).format('YYYY-MM-DD'))
        this.$axios
          .post(process.env.apiBaseUrl + 'panel/dieticians/update/' + this.data._id.$oid, formData, {
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
    }
  }
}
</script>

<style scoped>
#morrisLineData > svg {
  width: 100% !important;
}
</style>
