<template>
  <div>
    <v-row class="my-2">
      <v-col cols="12" sm="2" class="hidden-xs-only" />
      <v-col cols="12" sm="8">
        <div class="display-1 center" v-text="$t('users.header')" />
      </v-col>
      <v-col cols="12" sm="2">
        <div class="d-flex justify-end">
          <UsersForm :header-text="$t('users.newLabel')"
                     :save-user="create"
                     :user="user"
          />
        </div>
      </v-col>
    </v-row>
    <UsersTable :users="users" :headers="headers" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UsersTable from '@/components/users-table'
import UsersForm from '@/components/users-form'
export default {
  components: { UsersTable, UsersForm },
  data () {
    return { user: {} }
  },
  computed: {
    ...mapState({ users: state => state.users.users }),
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: this.$t('users.name'), value: 'name' },
        { text: this.$t('users.email'), value: 'email' },
        { text: this.$t('users.admin'), value: 'admin' },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '150px' }
      ]
    }
  },
  methods: {
    async create (newUser) {
      const user = await this.$store.dispatch('users/create', newUser)
      this.$store.dispatch('snackbar/create', {
        text: this.$t('users.newSuccess') + user.name + '.'
      })
    }
  }
}
</script>
