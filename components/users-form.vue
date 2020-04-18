<template>
  <span>
    <v-btn v-if="user.id" color="primary" small @click="openDialog">
      <v-icon v-text="'mdi-pencil'" />
    </v-btn>
    <v-btn v-else class="primary" @click="openDialog">
      <v-icon left v-text="'mdi-account-plus'" />{{ $t('new') }}
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-4">
        <v-form ref="form" v-model="valid">
          <v-card-title class="headline" v-text="headerText" />
          <v-divider />
          <v-card-text>
            <div v-if="userInfo.id">
              <v-checkbox v-model="userInfo.admin" class="red--text"
                          :label="$t('userInfo.admin')"
              />
              <v-text-field v-model="userInfo.token"
                            :label="$t('userInfo.token')"
              />
            </div>
            <v-text-field v-model="userInfo.name"
                          :label="$t('userInfo.name')"
                          :rules="[required(), minLength(3)]"
                          maxlength="30"
                          counter="30"
            />
            <v-text-field v-model="userInfo.email"
                          :label="$t('userInfo.email')"
                          :rules="[required(), emailFormat()]"
                          maxlength="50"
                          counter="50"
            />
            <v-text-field v-model="userInfo.password"
                          :label="$t('userInfo.password')"
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          counter="true"
                          :rules="[required(), minLength(8)]"
                          @click:append="showPassword = !showPassword"
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
import validations from '@/utils/validations'
export default {
  props: {
    saveUser: { type: Function, required: true },
    headerText: { type: String, required: true },
    user: { type: Object, required: true }
  },
  data () {
    return {
      valid: false,
      showPassword: false,
      dialog: false,
      userInfo: {},
      ...validations
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/get'
    })
  },
  methods: {
    openDialog () {
      this.dialog = true
      this.userInfo = { ...this.getUser(this.user.id) }
    },
    cancel () {
      this.$refs.form.reset()
      this.dialog = false
    },
    save () {
      this.saveUser({ ...this.userInfo })
      this.$refs.form.reset()
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.red--text /deep/ label {
    color:#D32F2F;
}
</style>
