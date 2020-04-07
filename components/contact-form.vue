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
        <v-col cols="12" sm="2">
          <v-text-field
            v-model="contactData.rating"
            label="Bewertung"
            prepend-icon="mdi-heart"
            min="0" max="5"
            maxlength="1"
            type="number"
            hint="0-5 Herzen"
          />
        </v-col>
        <v-col cols="12" sm="10">
          <ContactFormTextfield :obj="contactData" fieldname="img" />
        </v-col>
      </v-row>
      <!--small>* Plichtfelder</small-->
      <v-row class="d-flex justify-end">
        <v-btn class="mr-2 secondary" @click="cancel">
          <v-icon left>
            mdi-close-box
          </v-icon>
          Abbrechen
        </v-btn>
        <v-btn :disabled="!valid" class="primary" @click="save">
          <v-icon left>
            mdi-content-save
          </v-icon>
          Speichern
        </v-btn>
      </v-row>
    </v-container>
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
        born: '',
        street: '',
        zip: '',
        place: '',
        fon: '',
        mobil: '',
        img: '',
        ...this.contactData,
        rating: parseInt(this.contactData.rating) || 0
      })
    }
  }
}
</script>
