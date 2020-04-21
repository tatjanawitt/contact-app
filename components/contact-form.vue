<template>
  <div>
    <div class="display-1 ma-4 d-flex justify-center" v-text="header" />
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-autocomplete
              v-if="$auth.user.admin" v-model="contactData.user_id"
              :items="users" item-text="name" item-value="id"
              :label="$t('links.users')" prepend-icon="mdi-badge-account"
              :rules="[v => !!v || 'required / Plichtfeld']"
            />
          </v-col>
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
            <ContactFormTextfield :obj="contactData" fieldname="rating" />
          </v-col>
          <v-col cols="12" sm="10">
            <ContactFormTextfield :obj="contactData" fieldname="img" />
          </v-col>
        </v-row>
        <small class="d-flex justify-end mb-2" v-text="$t('cForm.note')" />
        <v-row class="d-flex justify-end">
          <v-btn small class="mr-2 secondary" @click="cancel">
            <v-icon left v-text="'mdi-close-box'" />{{ $t('cForm.closeBtn') }}
          </v-btn>
          <v-btn small :disabled="!valid" class="primary" @click="save">
            <v-icon left v-text="'mdi-content-save'" />{{ $t('cForm.saveBtn') }}
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContactFormTextfield from '@/components/contact-form-textfield'
import Datepicker from '@/components/datepicker'
export default {
  components: {
    ContactFormTextfield,
    Datepicker
  },
  props: {
    contact: { type: Object, required: true },
    saveContact: { type: Function, required: true },
    cancelAction: { type: Function, required: true },
    header: { type: String, required: true }
  },
  data () {
    return {
      valid: false,
      contactData: { ...this.contact }
    }
  },
  computed: {
    ...mapState({ users: state => state.users.users }),
    ...mapGetters({ getUser: 'users/get' })
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
