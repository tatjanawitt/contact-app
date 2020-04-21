<template>
  <span>
    <v-btn v-if="!avatar" color="primary" small
           :disabled="disabled" @click.stop="dialog = true"
    >
      <v-icon v-text="'mdi-delete-alert'" />
    </v-btn>
    <v-avatar v-if="avatar" class="ma-2 float-right pointer" fab dark
              size="64px" color="error" @click.stop="dialog = true"
    >
      <v-icon dark v-text="'mdi-delete-alert'" />
    </v-avatar>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline" v-text="header" />
        <v-divider class="mx-2 mb-2" />
        <v-card-text class="subtitle-1" v-html="content" />
        <v-divider class="mx-2 mb-2" />
        <v-card-actions>
          <v-spacer />
          <div class="mr-1 mb-1">
            <v-btn class="secondary" @click="cancel">
              <v-icon left v-text="'mdi-close-box'" />{{ $t('cForm.closeBtn') }}
            </v-btn>
            <v-btn class="primary" @click="agree()">
              <v-icon left v-text="agreeImg" />{{ agreeBtn }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    content: { type: String, required: true },
    agreeAction: { type: Function, required: true },
    agreeImg: { type: String, required: false, default: 'mdi-check-bold' },
    agreeBtn: { type: String, required: false, default: 'OK' },
    header: { type: String, required: false, default: 'Confirm' },
    disabled: { type: Boolean, required: false, default: false },
    avatar: { type: Boolean, required: false, default: false }
  },
  data () {
    return { dialog: false }
  },
  methods: {
    cancel () { this.dialog = false },
    agree () {
      this.agreeAction({ ...this.item })
      this.dialog = false
    }
  }
}
</script>
