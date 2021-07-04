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
      <v-card class='mb-3 text-center'>
        <v-card-title class='text-center justify-center'>
          Ölçüt Ara
        </v-card-title>
        <v-card-subtitle>
          En Sağlıklı Ölçütleri Keşfet
        </v-card-subtitle>
        <v-card-text>
          <img src='/img/olcut.jpg' class='mb-3'
               style='width: 100%;min-height: 225px;max-height:450px;object-fit: scale-down' alt=''>
          <form onsubmit='return false'>
            <v-text-field
              type='text'
              clearable
              v-on:keyup.prevent='getCriterias()'
              v-model='search'
              placeholder='Ölçüt Aramak İçin Buraya Yazın...'
            />
          </form>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title class='justify-center'>
          {{ search ? '"' + search + '" Aramasıyla İle İlgili Ölçütler' : 'Tüm Ölçütler' }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <client-only v-if='!isEmpty(criterias)'>
              <v-simple-table
                class='mb-2 px-2 px-xl-16 px-lg-16 px-sm-10 px-md-10'
                v-bind:key='index'
                v-for='(criteria, index) in criterias'
              >
                <thead>
                <tr>
                  <th colspan='2' class='text-center text-h6 font-weight-bold'>
                    <nuxt-link v-bind:to="'calorie/' + criteria.slug">
                      {{ criteria.name }}
                    </nuxt-link>
                  </th>
                </tr>
                <tr>
                  <th class='text-break text-h6 font-weight-bold' scope='col'>Ölçüt</th>
                  <th class='text-break text-h6 font-weight-bold' scope='col'>Ölçüt Değeri</th>
                </tr>
                </thead>
                <tbody>
                <client-only>
                  <tr
                    v-bind:key='index'
                    v-for='(value, index) in criteria.criteria_values'
                  >
                    <td class='text-break'>{{ value.title }}</td>
                    <td class='text-break'>
                      {{ value.value }} {{ value.type }}
                    </td>
                  </tr>
                </client-only>
                </tbody>
              </v-simple-table>
            </client-only>
            <v-pagination
              color='success'
              v-model='pagination.current'
              :length='pagination.total'
              total-visible='11'
              @input='onPageChange'
            ></v-pagination>
          </v-container>
        </v-card-text>
      </v-card>
    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: 'index',
  computed: {
    img_url() {
      return process.env.apiPublicUrl
    },
    ...mapState(['settings'])
  },
  methods: {
    isEmpty(obj) {
      if (typeof obj == 'number') return false
      else if (typeof obj == 'string') return obj.length === 0
      else if (Array.isArray(obj)) return obj.length === 0
      else if (typeof obj == 'object')
        return obj == null || Object.keys(obj).length === 0
      else if (typeof obj == 'boolean') return false
      else return !obj
    },
    getCriterias(param) {
      let payload = null
      if (this.search !== null) {
        payload = {
          criteriasURL:
            'criteria?page=' +
            this.pagination.current +
            '&search=' +
            decodeURIComponent(this.search)
        }
        this.$store
          .dispatch('getCriterias', payload)
          .then(() => {
            this.criterias = this.$store.state.criterias.data
            this.pagination.current = this.$store.state.criterias.current_page
            this.pagination.total = this.$store.state.criterias.last_page
          })
      } else {
        if (param) {
          payload = { criteriasURL: param }
          this.$store
            .dispatch('getCriterias', payload)
            .then(() => {
              this.criterias = this.$store.state.criterias
            })
        } else {
          payload = {
            criteriasURL: 'criteria?page=' + this.pagination.current
          }
          this.$store
            .dispatch('getCriterias', payload)
            .then(() => {
              this.criterias = this.$store.state.criterias.data
              this.pagination.current = this.$store.state.criterias.current_page
              this.pagination.total = this.$store.state.criterias.last_page
            })
        }
      }
    },
    onPageChange() {
      this.getCriterias()
    }
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
          text: 'Ölçütler',
          disabled: true,
          href: 'javascript:void(0)'
        }
      ],
      criterias: [],
      search: null,
      pagination: {
        current: 1,
        total: 1
      }
    }
  },
  mounted() {
    this.getCriterias()
  }
}
</script>
