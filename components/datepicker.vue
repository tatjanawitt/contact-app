<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="computedDateFormatted"
        label="Geburtsdatum"
        prepend-icon="mdi-calendar-search"
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu = false"
    />
  </v-menu>
</template>
<script>

export default {
  name: 'Datepicker',
  props: {
    fieldname: { type: String, required: true },
    obj: { type: Object, required: true }
  },
  data () {
    return {
      date: this.obj[this.fieldname]
        ? this.obj[this.fieldname].toISOString().substr(0, 10)
        : null,
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
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
      this.obj[this.fieldname] = this.date
    }
  },
  methods: {
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
