<template>
  <v-container>
    <v-row class="ma-2">
      <h1>Tag List</h1>
      <v-spacer />
      <v-btn :color="btnColor" dark class="mt-4" @click="startNewTag=!startNewTag">
        Add Tag
      </v-btn>
    </v-row>
    <v-text-field
      v-model="search"
      label="Tags suchen"
      class="mb-3"
      clearable
      append-icon="mdi-magnify"
      single-line
      hide-details
    />
    <v-data-table :items="tags" :headers="headers" :search="search">
      <template v-if="startNewTag" #body.prepend="{}">
        <tr>
          <td>
            <v-text-field
              v-model="newTagName"
              label="Edit"
              autofocus
              single-line
              counter
              @blur="createTag()"
              @keydown.enter="createTag()"
            />
          </td>
        </tr>
      </template>

      <template #item.name="{item}">
        <div v-if="updateTag.id == item.id">
          <v-text-field
            v-model="updateTag.name"
            label="Edit"
            autofocus
            single-line
            counter
            @blur="updateTagName(item)"
            @keydown.enter="updateTagName(item)"
          />
        </div>
        <div v-else @click="setToEditing(item)">
          {{ item.name }}
        </div>
      </template>

      <template #item.contact_ids.length="{item}">
        <v-chip
          v-if="item.contact_ids.length"
          :to="`/contacts/tags/${item.id}`"
          :color="btnColor"
          small dark label
        >
          <v-icon left>
            mdi-account-multiple
          </v-icon>
          {{ item.contact_ids.length }} - {{ item.name }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn x-small :color="btnColor" @click="setToEditing(item)">
          Edit
        </v-btn>
        <v-btn
          x-small
          :color="btnColor"
          :disabled="item.contact_ids.length > 0"
          @click="deleteTag(item)"
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      startNewTag: false,
      newTagName: '',
      updateTag: { id: '', name: '' },
      btnColor: 'indigo lighten-2',
      search: ''
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags
    }),
    headers () {
      return [
        { text: 'Name', value: 'name' },
        { text: '# Zuordnung', value: 'contact_ids.length' },
        { text: 'Actions', value: 'actions', sortable: false, width: '300px' }
      ]
    }
  },
  methods: {
    setToEditing (tag) {
      this.updateTag = { ...tag }
    },
    updateTagName (tag) {
      if (this.updateTag.name.length > 0) {
        const editTag = { ...tag, name: this.updateTag.name }
        this.$store.dispatch('tags/update', { editTag })
      }
      this.updateTag.id = ''
    },
    deleteTag (tag) {
      if (confirm(`Wollen Sie den Tag "${tag.name}" wirklich löschen?`)) {
        this.$store.dispatch('tags/delete', { tag })
      }
    },
    createTag () {
      if (this.newTagName.length > 0) {
        this.$store.dispatch('tags/create', { name: this.newTagName })
        this.newTagName = ''
      }
      this.startNewTag = false
    }
  }
}
</script>
