<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :items='breadCrumbItems' />
    <!-- /Breadcrumb -->
    <!-- Page Content -->
    <div class='content'>
      <div class='container-fluid'>
        <ProfileInformationTop :user='dietician' :hide-address='false' />
        <div class='row'>
          <div class='col-12'>
            <FullCalendar :options='calendarOptions'/>
            <div class='text-center'>
              <v-dialog
                v-model='dialog'
                width='500'
              >
                <template v-slot:activator='{ on, attrs }'>
                </template>

                <v-card>
                  <v-card-title class='text-h5 grey lighten-2'>
                    Randevu Al
                    <v-divider></v-divider>
                    <span v-if='args!==null'>{{ args.date.getDate() + '.' + (args.date.getMonth() + 1) + '.' + args.date.getFullYear() + ' ' + addZeroBefore(args.date.getHours()) + ':' + addZeroBefore(args.date.getMinutes())
                      }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-textarea
                      outlined
                      name='description'
                      label='Açıklama'
                      v-model='description'
                      class='mt-3'
                      hide-details
                    ></v-textarea>

                  </v-card-text>

                  <v-card-actions>
                    <v-btn color='primary' @click='addAppointment'>
                      Randevu Al!
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <div class='text-center'>
              <v-dialog
                v-model='dialogDel'
                width='500'
              >
                <template v-slot:activator='{ on, attrs }'>
                </template>

                <v-card>
                  <v-card-title class='text-h5 grey lighten-2'>
                    Randevunuz
                    <v-divider></v-divider>
                    <span v-if='args!==null'>{{ args.date.getDate() + '.' + (args.date.getMonth() + 1) + '.' + args.date.getFullYear() + ' ' + addZeroBefore(args.date.getHours()) + ':' + addZeroBefore(args.date.getMinutes())
                      }}</span>
                  </v-card-title>

                  <v-card-text>
                    Silmek İstediğinize Emin Misiniz?
                    <v-btn color='danger'>
                      Sil!
                    </v-btn>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Breadcrumb from '~/components/frontend/breadcrumb'
import '@fullcalendar/core' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import tr from '@fullcalendar/core/locales/tr'
import ProfileInformationTop from '~/components/frontend/profile-information-top'
export default {
  name: 'dietician-appointments',
  components: {
    Breadcrumb,
    FullCalendar,
    ProfileInformationTop
  },
  mounted() {
    this.done = localStorage.getItem('done')
    this.$axios.get(process.env.apiBaseUrl + 'dieticians/dieticians/' + this.$route.params.id).then(res => {
      this.dietician = res.data.data
      this.dietician.status = "dietician"
    })
    this.$axios.get(process.env.apiBaseUrl + 'appointments/' + this.$route.params.id).then(res => {
      this.getAppointments(res.data.data)
    })
  },
  data() {
    return {
      breadCrumbItems: [
        { name: 'Anasayfa', url: '/' },
        { name: 'Diyetisyenler', url: '/dieticians' },
        { name: 'Randevu Al' }
      ],
      dietician: {  },
      done: false,
      fullname: '',
      mail: '',
      phone: '',
      description: '',

      dialog: false,
      dialogDel: false,
      args: null,
      calendarOptions: {
        select: function(start, end) {
          if (start.isBefore(moment().format())) {
            $('#calendar').fullCalendar('unselect')
            return false
          }
        },
        buttonText: {
          today: 'Bugün',
          month: 'Ay',
          week: 'Hafta',
          day: 'Gün',
          list: 'Liste'
        },
        height: 550,
        eventClick: this.eventClick,
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        dateClick: this.handleDateClick,
        allDaySlot: false,
        slotMinTime: '08:00:00',
        slotMaxTime: '18:00:00',
        slotDuration: '00:30:00',
        omitZeroMinute: false,
        slotLabelInterval: '00:30:00',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short'
        },
        hour12: false,
        firstDay: 1,
        events: [],
        validRange: {
          start: moment().format()
        },
        locale: tr,
        timeFormat: 'H(:mm)',
        titleFormat: { // will produce something like "Tuesday, September 18, 2018"
          month: 'long',
          year: 'numeric',
          day: 'numeric',
          weekday: 'long',
          omitZeroMinute: false
        },

        businessHours: [ // specify an array instead
          {
            startTime: '08:00', // 8am
            endTime: '18:00', // 6pm
          }
        ]
      }
    }
  },
  methods: {
    addZeroBefore(n) {
      return (n < 10 ? '0' : '') + n
    },
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
    getAppointments(data) {
      data.forEach(e => {
        console.log(e)
        this.calendarOptions.events.push({
          title: !this.isEmpty(this.userData) && this.userData._id === e.consultant_id ? 'RANDEVUNUZ' : 'DOLU',
          start: e.date,
          consultant_id: e.consultant_id
        })
      })
    },
    handleDateClick: function(arg) {
      // if(!this.done){
      let now = moment(new Date().getTime())
      let diff = moment(arg.date).diff(now, 'hours', true)
      console.log(diff)
      if (diff >= 0) {
        this.args = arg
        this.dialog = true
      } else {
        this.$izitoast.error({
          title: 'Başarısız!',
          message: 'Seçmiş Olduğunuz Zamana Ait Randevu Alamazsınız!',
          position: 'topCenter'
        })
      }

      // }
    },
    addAppointment() {
      this.$axios.post(process.env.apiBaseUrl + 'appointments/', {
        // fullname:this.fullname,
        // email:this.mail,
        slug: this.$route.params.id,
        description: this.description,
        date: this.args.dateStr
        // phone:this.phone
      })
        .then(res => {
          if (res.data.success === false) {
            this.dialog = false
            this.$izitoast.error({
              title: res.data.title,
              message: res.data.msg,
              position: 'topCenter'
            })
          } else {
            this.calendarOptions.events.push({
              title: 'RANDEVUNUZ',
              date: this.args.dateStr
            })
            this.dialog = false
            this.fullname = ''
            this.description = ''
            this.mail = ''
            this.phone = ''
            this.done = true
            localStorage.setItem('done', true)
            console.log(res.data)
            this.$izitoast.success({
              title: res.data.title,
              message: res.data.msg,
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
