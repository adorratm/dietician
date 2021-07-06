<template>
  <v-container>
    <client-only>
      <Breadcrumb :items='items'></Breadcrumb>

    </client-only>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'
import Breadcrumb from '@/components/includes/Breadcrumb'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Breadcrumb
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
