<template>
  <div>
    <Breadcrumb :items="items" v-if="dietician"></Breadcrumb>
    <div>
      <FullCalendar style="max-height: 400px" :options="calendarOptions" />
    </div>
    <div>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Randevu Oluştur
              <v-divider></v-divider>
              <span v-if="args!==null">{{ args.date.getDate()+ '.'+(args.date.getMonth()+1) +'.'+args.date.getFullYear()+' '+args.date.getHours()+':00' }}</span>
            </v-card-title>

            <v-card-text>
<!--              <v-text-field label="Ad Soyad" v-model="fullname" name="fullname"></v-text-field>-->
<!--              <v-text-field label="Telefon" v-model="phone" name="phone"></v-text-field>-->
<!--              <v-text-field label="Mail" v-model="mail" name="mail"></v-text-field>-->
              <v-textarea
                outlined
                name="description"
                label="Açıklama"
                v-model="description"
                class="my-3"
              ></v-textarea>
              <v-btn color="primary" @click="addAppointment">
                Oluştur!
              </v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog
          v-model="dialogDel"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Randevunuz
              <v-divider></v-divider>
              <span v-if="args!==null">{{ args.date.getDate()+ '.'+(args.date.getMonth()+1) +'.'+args.date.getFullYear()+' '+args.date.getHours()+':00' }}</span>
            </v-card-title>

            <v-card-text>
<!--              <v-text-field label="Ad Soyad" v-model="fullname" name="fullname"></v-text-field>-->
<!--              <v-text-field label="Telefon" v-model="phone" name="phone"></v-text-field>-->
<!--              <v-text-field label="Mail" v-model="mail" name="mail"></v-text-field>-->
              Silmek İstediğinize Emin Misiniz?
              <v-btn color="danger">
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
</template>

<script>
import '@fullcalendar/core' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';

import Breadcrumb from "../../../components/includes/Breadcrumb";
export default {
  components: {
    Breadcrumb,
    FullCalendar
  },
  mounted(){
    this.done=localStorage.getItem('done')
    console.log(this.token)
    this.$axios.get(process.env.apiBaseUrl+'dieticians/dieticians/'+this.$route.params.id).then(res=>{
      this.dietician=res.data.data
    })
    this.$axios.get(process.env.apiBaseUrl+'appointments/'+this.$route.params.id).then(res=>{
      this.getAppointments(res.data.data)
    })
  },
  methods:{
    eventClick(arg){
      // console.log(arg)
      // if(arg.event.consultant_id==this.userData._id)
      //   this.dialogDel=true
    },
    isEmpty(obj) {
      if (typeof obj == "number") return false;
      else if (typeof obj == "string") return obj.length === 0;
      else if (Array.isArray(obj)) return obj.length === 0;
      else if (typeof obj == "object")
        return obj == null || Object.keys(obj).length === 0;
      else if (typeof obj == "boolean") return false;
      else return !obj;
    },
    getAppointments(data){
      data.forEach(e=>{
        this.calendarOptions.events.push({
          title:this.userData!==null && this.userData._id==e.consultant_id ? 'RANDEVUNUZ' : 'DOLU',
          start:e.date,
          consultant_id:e.consultant_id
        })
      })
    },
    handleDateClick: function(arg) {
      // if(!this.done){
        this.args=arg
        this.dialog=true
      // }
    },
    addAppointment(){
      this.$axios.post(process.env.apiBaseUrl+'appointments/',{
        // fullname:this.fullname,
        // email:this.mail,
        slug:this.$route.params.id,
        description:this.description,
        date:this.args.dateStr,
        // phone:this.phone
      },{
        headers:{
          'Authorization': "Bearer " + this.token
        }
      })
      .then(res=>{
        if(res.data.success==false){
          this.dialog=false
          this.$izitoast.error({
            title: res.data.title,
            message: res.data.msg,
            position: "topCenter"
          });
        }
          else{
          this.calendarOptions.events.push({
            title:'RANDEVUNUZ',
            date:this.args.dateStr
          })
          this.dialog=false
          this.fullname=''
          this.description=''
          this.mail=''
          this.phone=''
          this.done=true
          localStorage.setItem('done',true)
          console.log(res.data)
          this.$izitoast.success({
            title: res.data.title,
            message: res.data.msg,
            position: "topCenter"
          });
        }

      })
    }
  },
  data() {
    return {
      token:'',
      userData: !this.isEmpty(this.$auth.$storage.getUniversal("user"))
        ? this.$auth.$storage.getUniversal("user")
        : null,
      dietician:null,
      done:false,
      fullname:'',
      mail:'',
      phone:'',
      description:'',
      buttonText:{
        today:'Bugün'
      },
      dialog:false,
      dialogDel:false,
      args:null,
      calendarOptions: {
        eventClick:this.eventClick,
        plugins: [ dayGridPlugin, interactionPlugin,timeGridPlugin ],
        initialView: 'timeGridWeek',
        dateClick: this.handleDateClick,
        allDaySlot:false,
        slotMinTime:'08:00:00',
        slotMaxTime:'20:00:00',
        slotDuration:'01:00:00',
        firstDay:1,
        events:[],
        validRange:{
          start:new Date()
        },
        locale:'tr',
        timeFormat: 'H(:mm)',
        businessHours: [ // specify an array instead
          {
            startTime: '08:00', // 8am
            endTime: '18:00' // 6pm
          },
        ]
      }
    }
  },
  computed:{
    token(){
      if(this.userData==null)
        return ''
      else
        return this.userData.api_token
    },
    items(){
      return [
        {
          text: 'Anasayfa',
          disabled: false,
          href: '/'
        },
        {
          text: 'Diyetisyenler',
          disabled: false,
          href: 'javascript:void(0)'
        },
        {
          text: this.dietician.name,
          disabled: false,
          href: 'javascript:void(0)'
        },
        {
          text: 'Randevu Al',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
