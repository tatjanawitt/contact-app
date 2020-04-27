<template>
  <span>
    <v-btn v-if="$route.name.includes('admin') && $auth.user.admin && user.id"
           color="primary" small @click="openDialog"
    ><v-icon v-text="'mdi-pencil'" /></v-btn>

    <v-dialog v-model="dialog.show" max-width="500px">
      <v-card class="pa-4">
        <v-form ref="form" v-model="valid">
          <v-card-title class="headline" v-text="headerText" />

          <v-divider />
          <v-card-text>
            <div v-if="$route.name.includes('admin') && $auth.user.admin && userInfo.id">
              <v-checkbox v-model="userInfo.admin" class="red--text"
                          :label="$t('userInfo.admin')"
              />
              <v-text-field v-model="userInfo.token" disabled
                            :label="$t('userInfo.token')"
              />
            </div>
            <UserCredentialsFields :user-info="userInfo" :has-name="true" />
            <p v-if="userInfo.contact_ids && userInfo.contact_ids.length"
               v-text="$t('links.contacts')"
            />
            <v-chip v-for="(contactId,i) in userInfo.contact_ids" :key="i"
                    :to="`/admin/contacts/${contactId}`" small dark
                    class="mb-1" v-text="getName(contactId)"
            />
          </v-card-text>
          <v-divider class="mx-2 mb-2" />

          <v-card-actions>
            <v-spacer />
            <v-btn small class="secondary" @click="cancel">
              <v-icon left v-text="'mdi-close-box'" />{{ $t('cForm.closeBtn') }}
            </v-btn>
            <v-btn :disabled="!valid" small class="primary" @click="save">
              <v-icon left v-text="'mdi-content-save'" />{{ $t('cForm.saveBtn') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCredentialsFields from '@/components/forms/user-credentials-fields'
export default {
  components: { UserCredentialsFields },
  props: {
    saveUser: { type: Function, required: true },
    headerText: { type: String, required: true },
    user: { type: Object, required: true },
    dialog: { type: Object, required: false, default () { return { show: false } } }
  },
  data () {
    return { valid: false, userInfo: {} }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/get',
      getName: 'contacts/getFullName'
    })
  },
  methods: {
    openDialog () {
      this.dialog.show = true
      this.userInfo = { ...this.getUser(this.user.id) }
    },
    cancel () {
      this.$refs.form.reset()
      this.dialog.show = false
    },
    save () {
      this.saveUser({ ...this.userInfo })
      this.$refs.form.reset()
      this.dialog.show = false
    }
  }
}
</script>

<style scoped>
.red--text /deep/ label {
    color:#D32F2F;
}
</style>
