<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <ContactFormTextfield :obj="contactData" fieldname="fName" />
        </v-col>
        <v-col cols="12" sm="6">
          <ContactFormTextfield :obj="contactData" fieldname="lName" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="7">
          <ContactFormTextfield :obj="contactData" fieldname="email" />
        </v-col>
        <v-col cols="12" sm="5">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y max-width="290px" min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Geburtsdatum"
                append-icon="mdi-calendar-search"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="contactData.born"
              no-title
              @input="menu = false"
            />
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <ContactFormTextfield :obj="contactData" fieldname="street" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <ContactFormTextfield :obj="contactData" fieldname="zip" />
        </v-col>
        <v-col cols="12" sm="8">
          <ContactFormTextfield :obj="contactData" fieldname="place" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <ContactFormTextfield :obj="contactData" fieldname="fon" />
        </v-col>
        <v-col cols="12" sm="6">
          <ContactFormTextfield :obj="contactData" fieldname="mobil" />
        </v-col>
      </v-row>
      <small>* Plichtfelder</small>
    </v-container>
    <v-btn @click="cancel">
      Abbrechen
    </v-btn>
    <v-btn :disabled="!valid" color="primary" @click="save">
      Speichern
    </v-btn>
  </v-form>
</template>

<script>
import ContactFormTextfield from '@/components/contact-form-textfield'

export default {
  name: 'ContactForm',
  components: {
    ContactFormTextfield
  },
  props: {
    contact: { type: Object, required: true },
    saveContact: { type: Function, required: true },
    cancelAction: { type: Function, required: true }
  },
  data () {
    return {
      valid: false,
      contactData: { ...this.contact },
      menu: false
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    cancel () {
      this.cancelAction()
    },
    save () {
      this.saveContact(this.contactData)
    },
    formatDate (date) {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate (date) {
      if (!date) { return null }
      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
