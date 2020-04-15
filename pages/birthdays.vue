<template>
  <v-container>
    <div class="display-2 ma-4 center" v-text="$t('birthdays.title') + ' ' + nowYear" />
    <ContactBirthday />
  </v-container>
</template>

<script>
import ContactBirthday from '@/components/contact-birthday'
export default {
  middleware: ['auth-user'],
  components: { ContactBirthday },
  computed: {
    nowYear () { return new Date().getFullYear() }
  }
}
</script>
