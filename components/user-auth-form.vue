<template>
  <v-row justify="space-around">
    <v-sheet class="pa-8 ma-2" color="rgba(255, 255, 255, 0.7)" elevation="14" width="500px">
      <div class="display-2 ma-4 d-flex justify-center" v-text="buttonText" />
      <v-form v-model="valid">
        <div @keydown.enter="submitForm(userInfo)">
          <v-text-field v-if="hasName" v-model="userInfo.name" :label="$t('userInfo.name')"
                        :rules="[required(), minLength(3)]"
                        maxlength="30" counter="30"
          />
          <v-text-field v-model="userInfo.email" :label="$t('userInfo.email')"
                        :rules="[required(), emailFormat()]"
                        maxlength="50" counter="50"
          />
          <v-text-field v-model="userInfo.password" :label="$t('userInfo.password')"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        counter="true"
                        :rules="[required(), minLength(8)]"
                        @click:append="showPassword = !showPassword"
          />
          <v-row class="d-flex justify-end mt-4 mr-1">
            <v-btn :disabled="!valid" class="primary" @click="submitForm(userInfo)">
              <v-icon left v-text="iconType" />{{ buttonText }}
            </v-btn>
          </v-row>
        </div>
      </v-form>
    </v-sheet>
  </v-row>
</template>

<script>
import validations from '@/utils/validations'
export default {
  props: {
    submitForm: { type: Function, required: true },
    buttonText: { type: String, required: true },
    iconType: { type: String, required: true },
    hasName: Boolean
  },
  data () {
    return {
      valid: false,
      showPassword: false,
      userInfo: { name: '', email: '', password: '' },
      ...validations
    }
  }
}
</script>
