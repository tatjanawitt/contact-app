<template>
  <v-list-item @click="goToContact(contact)">
    <v-list-item-avatar size="50px">
      <v-img :src="contact.img || imgPlaceholder" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-row>
        <v-col cols="12" sm="5" md="4">
          <v-list-item-title class="text-wrap" v-html="textContent" />
          <ContactRating :rating="contact.rating" :readonly="true" :large="false" />
        </v-col>
        <v-col cols="12" sm="7" md="8" class="non-clickable" @click.stop>
          <TagsBar :contact="contact" />
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon :color="color" v-text="'mdi-cake-variant'" />
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactRating from '@/components/contact-rating'
import TagsBar from '@/components/tags-bar'
export default {
  components: {
    ContactRating,
    TagsBar
  },
  props: {
    contact: { type: Object, required: true }
  },
  computed: {
    ...mapGetters({
      getAge: 'contacts/getAge',
      getBirthdayToday: 'contacts/getBirthdayToday',
      getImagePlaceholder: 'contacts/getImgagePlaceholder'
    }),
    age () {
      return this.getAge(this.contact.id)
    },
    imgPlaceholder () {
      return this.getImagePlaceholder()
    },
    textContent () {
      return `${this.$t('birthdays.on')} ${
        this.contact.born.toLocaleDateString(this.lang, {
          month: 'long',
          day: 'numeric'
        })}, <b>${this.contact.fName} ${this.contact.lName
        }</b> ${this.$t('birthdays.turns')} ${this.age + 1}`
    },
    color () {
      return this.getBirthdayToday(this.contact.id) ? 'error' : 'grey'
    },
    lang () {
      return this.$i18n.locale === 'de' ? 'de-DE' : 'en-EN'
    }
  },
  methods: {
    goToContact (contact) {
      this.$router.push(`/contacts/detail/${contact.id}`)
    }
  }
}
</script>
