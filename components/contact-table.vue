<template>
  <div>
    <v-text-field v-model="search" label="Search" append-icon="mdi-magnify" single-line hide-details />
    <v-data-table
      :items="mungedContacts"
      :headers="headers"
      sort-by="sortablePublishedAt"
      :search="search"
      :sort-desc="true"
      @click:row="goToVideo"
    >
      <!--template #item.duration="{value}">
        <DurationDisplay :duration="value" />
      </template>
      <template #item.sortablePublishedAt="{item}">
        <DateDisplay :date="item.publishedAt" />
      </template-->
      <template #item.played="{item}">
        <div v-if="isPlayed(item.id)" class="indigo--text">
          <v-icon color="indigo" small>
            mdi-check
          </v-icon>
        </div>
      </template>
      <template #item.tags="{item}">
        <td class="non-clickable" @click.stop>
          <span v-for="tag_id in item.tag_ids" :key="tag_id">
            <v-btn
              color="orange lighten-4"
              :to="`/contacts/tags/${tag_id}`"
              x-small
              class="mr-1"
            >{{ getTag(tag_id).name }}</v-btn>
          </span>
        </td>
      </template>
      <template #item.actions="{item}">
        <td class="non-clickable" @click.stop>
          <v-btn x-small :to="`/contacts/detail/${item.id}`">
            Watch
          </v-btn>
          <v-btn x-small :to="`/admin/contacts/${item.id}/edit`">
            Edit
          </v-btn>
          <v-btn x-small @click="deleteContact(item)">
            Delete
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import _ from 'lodash'
// import DurationDisplay from '@/components/duration-display'
// import DateDisplay from '@/components/date-display'
// import VideoWatch from '@/components/video-watch'

export default {
  name: 'ContactTable',
  // components: {
  //   DurationDisplay,
  //   DateDisplay,
  //   VideoWatch
  // },
  props: {
    contacts: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    customClickAction: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      getTag: 'tags/get'
    }),
    mungedContacts () {
      return this.contacts.map((c) => {
        return {
          ...c,
          sortablePublishedAt: c.born && c.born.toISOString()
        }
      })
    }
  },
  methods: {
    goToVideo (item) {
      if (this.customClickAction) {
        this.customClickAction(item)
      } else {
        this.$router.push(`/contacts/detail/${item.id}`)
      }
    },
    // filter (value, search, item) {
    //   const inName = RegExp(search, 'i').test(item.lName)

    //   const tagMatches = item.tag_ids.map((id) => {
    //     const tag = this.getTag(id)
    //     return RegExp(search, 'i').test(tag.name)
    //   })
    //   const inTags = _.some(tagMatches)

    //   return inName || inTags
    // },
    deleteContact (contact) {
      const response = confirm(`Are you sure you want to delete ${contact.lName}`)
      if (response) {
        this.$store.dispatch('contacts/delete', contact)
        // this.$store.dispatch('snackbar/create', {
        //   text: `You have successfully deleted your video, ${contact.lName}.`
        // })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep tbody tr {
  cursor: pointer;
}
::v-deep tbody tr td.non-clickable {
  cursor: auto;
}
</style>
