<template>
  <v-container>
    <div class="display-2 my-6 center" v-text="title" />
    <ContactBirthday />
  </v-container>
</template>

<script>
import ContactBirthday from '@/components/contact-birthday'
export default {
  middleware: ['auth-user'],
  components: { ContactBirthday },
  computed: {
    nowYear () {
      return new Date().getFullYear()
    },
    title () {
      return `${this.$t('birthdays.title')} ${this.nowYear}`
    }
  }
}
</script>
