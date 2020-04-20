<template>
  <v-row justify="space-around">
    <v-sheet class="pa-8 ma-2" color="rgba(255, 255, 255, 0.7)" elevation="14" width="500px">
      <div class="display-2 ma-4 d-flex justify-center" v-text="buttonText" />
      <v-form v-model="valid">
        <div @keydown.enter="submitForm(userInfo)">
          <UsersCredentialsFields
            :user-info="userInfo"
            :has-name="hasName"
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
import UsersCredentialsFields from '@/components/user-credentials-fields'
export default {
  components: { UsersCredentialsFields },
  props: {
    submitForm: { type: Function, required: true },
    buttonText: { type: String, required: true },
    iconType: { type: String, required: true },
    hasName: Boolean
  },
  data () {
    return {
      valid: false,
      userInfo: { name: '', email: '', password: '' }
    }
  }
}
</script>
