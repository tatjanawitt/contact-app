<template>
  <div>
    <div class="display-1 mt-5 mb-7 center" v-text="$t('tags.choice')" />
    <TagsSelectRow :contact="contact" :full-name="fullName" />
    <v-row justify="center">
      <v-col cols="12" sm="12">
        <div class="subtitle-1" v-html="$t('contacts.notice')" />
        <v-card class="cardColor">
          <v-card-title class="secondary">
            <v-avatar v-if="contact.img" size="70px">
              <v-img :src="contact.img" />
            </v-avatar>
            <span class="headline white--text ml-4" v-text="fullName" />
            <v-spacer />
            <ContactRating :rating="contact.rating" :readonly="false" :large="true" />
          </v-card-title>
          <ContactDetail :contact="contact" :show-footer="false" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactDetail from '@/components/contacts/contact-detail'
import ContactRating from '@/components/contact-rating'
import TagsSelectRow from '@/components/forms/tags-select-row'
export default {
  components: {
    ContactDetail,
    ContactRating,
    TagsSelectRow
  },
  computed: {
    ...mapGetters({
      getContact: 'contacts/get',
      getFullName: 'contacts/getFullName'
    }),
    contact () {
      return this.getContact(this.$route.params.id)
    },
    fullName () {
      return this.getFullName(this.$route.params.id)
    }
  }
}
</script>
