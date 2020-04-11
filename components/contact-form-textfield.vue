<template>
  <v-text-field
    v-model="fieldItem"
    :label="label"
    :maxlength="maxlength"
    :counter="maxlength"
    :prepend-icon="icon"
    clearable
    :hint="defaultHint"
    :rules="rules"
    @change="changeValue"
  />
</template>

<script>
import validations from '@/utils/validations'
import formFieldConfig from '@/utils/form-field-config'
export default {
  props: {
    fieldname: { type: String, required: true },
    obj: { type: Object, required: true }
  },
  data () {
    return {
      defaultMaxlength: 255,
      defaultHint: 'eingefügte Zeichen',
      fieldItem: this.obj[this.fieldname] || '',
      ...validations,
      fieldConfig: [...formFieldConfig.contactForm]
    }
  },
  computed: {
    label () {
      return this.$t('cForm.' + [this.fieldname])
    },
    icon () {
      return this.fieldConfig.find(i =>
        i.value === this.fieldname).icon
    },
    maxlength () {
      return this.fieldConfig.find(i =>
        i.value === this.fieldname).max || this.defaultMaxlength
    },
    rules () {
      return this.fieldConfig.find(i =>
        i.value === this.fieldname).rules
    }
  },
  methods: {
    changeValue () {
      this.obj[this.fieldname] = this.fieldItem
    }
  }
}
</script>
