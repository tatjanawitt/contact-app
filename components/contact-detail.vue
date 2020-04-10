<template>
  <v-list>
    <ContactDetailItem icon="mdi-phone" :content="contact.fon" />
    <v-divider inset />
    <ContactDetailItem icon="mdi-cellphone-wireless" :content="contact.mobil" />
    <v-divider inset />
    <ContactDetailItem icon="mdi-email" :content="contact.email" />
    <v-divider inset />
    <ContactDetailItem icon="mdi-map-marker" :content="address" />
    <v-divider inset />
    <ContactDetailItem icon="mdi-cake-variant" :content="birthday" :color="color" />
    <span v-if="showFooter">
      <v-divider inset />
      <v-list-item>
        <v-list-item-action>
          <v-icon v-text="'mdi-tag-multiple'" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-wrap">
            <TagsBar :contact="contact" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-img v-if="contact.img" :src="contact.img" max-height="500px" />
    </span>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactDetailItem from '@/components/contact-detail-item'
import TagsBar from '@/components/tags-bar'
export default {
  components: {
    ContactDetailItem,
    TagsBar
  },
  props: {
    contact: { type: Object, required: true },
    showFooter: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({
      getAddress: 'contacts/getAddress',
      getDateFormat: 'contacts/getDateFormat',
      getBirthdayToday: 'contacts/getBirthdayToday'
    }),
    address () {
      return this.getAddress(this.contact.id)
    },
    birthday () {
      return this.getDateFormat(this.contact.id, this.$i18n.locale)
    },
    color () {
      return this.getBirthdayToday(this.contact.id) ? 'red darken-2' : 'grey'
    }
  }
}
</script>
