<template>
  <v-text-field
    v-model="cItem.name"
    :label="label"
    :maxlength="maxlength"
    :counter="maxlength"
    clearable

    :hint="hint"
    @change="changeValue"
  />
</template>

<script>
import validations from '@/utils/validations'

export default {
  name: 'ContactFormTextfield',
  props: {
    fieldname: { type: String, required: true },
    obj: { type: Object, required: true }
  },
  data () {
    return {
      ...validations,
      cItem: { name: this.obj[this.fieldname] || '' },
      cAttr: [
        { text: 'Vorname', value: 'fName', max: '30', min: '3' },
        { text: 'Nachname', value: 'lName', max: '30', min: '3' },
        { text: 'Email', value: 'email', max: '50', min: '7' },
        { text: 'Telefon', value: 'fon', max: '30' },
        { text: 'Mobil', value: 'mobil', max: '30' },
        { text: 'Strasse', value: 'street', max: '50' },
        { text: 'Postleitzahl', value: 'zip', max: '5' },
        { text: 'Ort', value: 'place', max: '50' }
      ]
    }
  },
  computed: {
    label () { return this.cAttr.find(i => i.value === this.fieldname).text },
    maxlength () { return this.cAttr.find(i => i.value === this.fieldname).max },
    hint () { return 'eingefügte Zeichen' }
    // rules () {
    //   return this.cAttr.find(i => i.value === this.fieldname).min
    //     ? this.minLength(this.cAttr.find(i => i.value === this.fieldname).min) : []
    // }
  },
  methods: {
    changeValue () { this.obj[this.fieldname] = this.cItem.name }
  }
}
</script>
