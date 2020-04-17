<template>
  <span>
    <v-btn v-if="userInfo.id" color="primary" small @click.stop="dialog = true">
      <v-icon v-text="'mdi-pencil'" />
    </v-btn>
    <v-btn v-else class="primary" @click.stop="dialog = true">
      <v-icon left v-text="'mdi-account-plus'" />{{ $t('new') }}
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-4">
        <v-form v-model="valid">
          <v-card-title class="headline" v-text="'User bearbeiten'" />
          <v-divider />
          <v-card-text>
            <v-text-field v-model="userInfo.name" :label="$t('userInfo.name')"
                          :rules="[required(), minLength(3)]"
            />
            <v-text-field v-model="userInfo.email" :label="$t('userInfo.email')"
                          :rules="[required(), emailFormat()]"
            />
            <v-text-field v-model="userInfo.password" :label="$t('userInfo.password')"
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
            <v-btn class="secondary" @click="dialog = false">Close</v-btn>
            <v-btn :disabled="!valid" class="primary" @click="submitForm(userInfo)">
              <v-icon left v-text="iconType" />{{ buttonText }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import validations from '@/utils/validations'
export default {
  props: {
    submitForm: { type: Function, required: true },
    buttonText: { type: String, required: true },
    iconType: { type: String, required: true },
    userInfo: { type: Object, required: true }
  },
  data () {
    return {
      valid: false,
      showPassword: false,
      dialog: false,
      ...validations
    }
  }
}
</script>
