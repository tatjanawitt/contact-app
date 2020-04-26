<template>
  <v-list v-if="contact">
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
          <div class="d-flex justify-space-beetween">
            <v-list-item-title class="text-wrap">
              <TagsBar :contact="contact" />
            </v-list-item-title>
            <v-btn small class="secondary" @click="dialog.status=true">
              <v-icon v-text="'mdi-tag-plus'" />
            </v-btn>
            <v-dialog v-model="dialog.status" max-width="900">
              <v-card class="pa-1">
                <TagsSelectRow :contact="contact" :full-name="fullName" :dialog="dialog" />
              </v-card>
            </v-dialog>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-img :src="contact.img || imgPlaceholder" max-height="500px">
        <DialogConfirm :item="contact"
                       :content="`${$t('contacts.alertDel')} <b>${fullName}</b>?`"
                       :agree-action="deleteContact"
                       agree-img="mdi-delete"
                       :agree-btn="$t('cForm.delBtn')"
                       :header="$t('contacts.delHeader')"
                       :avatar="true"
        />
      </v-img>
    </span>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactDetailItem from '@/components/contact-detail-item'
import DialogConfirm from '@/components/dialog-confirm'
import TagsBar from '@/components/tags-bar'
import TagsSelectRow from '@/components/tags-select-row'
export default {
  components: {
    ContactDetailItem,
    TagsBar,
    DialogConfirm,
    TagsSelectRow
  },
  props: {
    contact: { type: Object, required: true },
    showFooter: { type: Boolean, required: true }
  },
  data () {
    return { dialog: { status: false } }
  },
  computed: {
    ...mapGetters({
      getAddress: 'contacts/getAddress',
      getDateFormat: 'contacts/getDateFormat',
      getBirthdayToday: 'contacts/getBirthdayToday',
      getFullName: 'contacts/getFullName',
      getImagePlaceholder: 'contacts/getImgagePlaceholder'
    }),
    address () {
      return this.getAddress(this.contact.id)
    },
    birthday () {
      return this.getDateFormat(this.contact.id, this.$i18n.locale)
    },
    color () {
      return this.getBirthdayToday(this.contact.id) ? 'error' : 'grey'
    },
    fullName () {
      return this.getFullName(this.contact.id)
    },
    imgPlaceholder () {
      return this.getImagePlaceholder()
    }
  },
  methods: {
    async deleteContact (contact) {
      this.$nuxt.$loading.start()
      const forDeleteContact = { ...contact }
      const name = this.getFullName(contact.id)
      await this.$store.dispatch('contacts/delete', forDeleteContact)
      this.$store.dispatch('snackbar/create', {
        text: this.$t('contacts.delSuccess') + name + '.'
      })
      this.$router.push('/contacts')
      this.$nuxt.$loading.finish()
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-list, .theme--light.v-sheet {
  background-color: rgba(255, 255, 255, 0.7) !important;
}
</style>
