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
          <Datepicker :obj="contactData" fieldname="born" />
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
      <v-row>
        <v-col cols="12" sm="4">
          <ContactFormTextfield :obj="contactData" fieldname="rating" />
        </v-col>
        <v-col cols="12" sm="8">
          <ContactFormTextfield :obj="contactData" fieldname="img" />
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
import Datepicker from '@/components/datepicker'

export default {
  name: 'ContactForm',
  components: {
    ContactFormTextfield,
    Datepicker
  },
  props: {
    contact: { type: Object, required: true },
    saveContact: { type: Function, required: true },
    cancelAction: { type: Function, required: true }
  },
  data () {
    return {
      valid: false,
      contactData: { ...this.contact }
    }
  },
  methods: {
    cancel () {
      this.cancelAction()
    },
    save () {
      this.saveContact({
        ...this.contactData,
        rating: parseInt(this.contactData.rating) || 0
      })
    }
  }
}
</script>
