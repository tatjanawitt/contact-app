<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="indigo lighten-2">
          <span class="headline white--text">
            {{ contact.fName }} {{ contact.lName }}
          </span>
          <v-spacer />
          <ContactRating :rating="contact.rating" :readonly="false" :large="true" />
        </v-card-title>
        <v-list>
          <ContactDetail icon="mdi-phone" :content="contact.fon" />
          <v-divider inset />
          <ContactDetail icon="mdi-cellphone-wireless" :content="contact.mobil" />
          <v-divider inset />
          <ContactDetail icon="mdi-email" :content="contact.email" />
          <v-divider inset />
          <ContactDetail icon="mdi-map-marker" :content="address" />
          <v-divider inset />
          <ContactDetail icon="mdi-cake-variant" :content="birthday" />
          <v-divider inset />
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-tag-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <TagsBar :contact="contact" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img :src="contact.img" max-height="500px" />
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
import ContactDetail from '@/components/contact-detail'
import ContactRating from '@/components/contact-rating'
import TagsBar from '@/components/tags-bar'

export default {
  components: {
    ContactDetail,
    ContactRating,
    TagsBar
  },
  computed: {
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
    contact () {
      return this.contacts.find(c => c.id === this.$route.params.id)
    },
    address () {
      return `${this.contact.street}, ${this.contact.zip} ${this.contact.place}`
    },
    birthday () {
      if (!this.contact.born) { return '' }
      return this.contact.born.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>
