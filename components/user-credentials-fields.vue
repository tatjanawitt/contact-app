<template>
  <div>
    <v-text-field v-if="hasName"
                  v-model="userInfo.name"
                  :label="$t('userInfo.name')"
                  :rules="[required(), minLength(3)]"
                  maxlength="30" counter="30"
    />
    <v-text-field v-model="userInfo.email"
                  :label="$t('userInfo.email')"
                  :rules="[required(), emailFormat()]"
                  maxlength="50" counter="50"
    />
    <!--input type="password" style="visibility: hidden"-->
    <v-text-field v-model="userInfo.password"
                  :label="$t('userInfo.password')"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  counter="true"
                  :rules="[required(), minLength(8)]"
                  @click:append="showPassword = !showPassword"
    />
  </div>
</template>

<script>
import validations from '@/utils/validations'
export default {
  props: {
    userInfo: { type: Object, required: true },
    hasName: Boolean
  },
  data () {
    return { showPassword: false, ...validations }
  }
}
</script>
