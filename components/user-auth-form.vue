<template>
  <v-form v-model="valid">
    <div @keydown.enter="submitForm(userInfo)">
      <v-text-field v-if="hasName" v-model="userInfo.name" :label="$t('userInfo.name')"
                    :rules="[required($t('userInfo.name')), minLength($t('userInfo.name'), 3)]"
      />
      <v-text-field v-model="userInfo.email" :label="$t('userInfo.email')"
                    :rules="[required($t('userInfo.email')), emailFormat()]"
      />
      <v-text-field v-model="userInfo.password" :label="$t('userInfo.password')"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    counter="true"
                    :rules="[required($t('userInfo.password')), minLength($t('userInfo.password'), 8)]"
                    @click:append="showPassword = !showPassword"
      />
      <v-btn :disabled="!valid" class="primary" @click="submitForm(userInfo)">
        <v-icon left v-text="iconType" />{{ buttonText }}
      </v-btn>
    </div>
  </v-form>
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
