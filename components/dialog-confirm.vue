<template>
  <span>
    <v-btn color="primary" small @click.stop="dialog = true">
      <v-icon v-text="'mdi-delete-alert'" />
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline" v-text="header" />
        <v-divider class="mx-2 mb-2" />
        <v-card-text class="subtitle-1" v-html="content" />
        <v-divider class="mx-2 mb-2" />
        <v-card-actions>
          <v-spacer />
          <v-btn class="secondary" @click="cancel">
            <v-icon left v-text="'mdi-close-box'" />{{ $t('cForm.closeBtn') }}
          </v-btn>
          <v-btn class="primary" @click="agree()">
            <v-icon left v-text="agreeImg" />{{ agreeBtn }}
          </v-btn>
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
    header: { type: String, required: false, default: 'Confirm' }
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
