<template>
  <v-container>
    <v-row class="ma-2">
      <h1>Tag List</h1>
      <v-spacer />
      <v-btn :color="btnColor" class="mt-4" @click="startNewTag()">
        Add Tag
      </v-btn>
    </v-row>
    <v-text-field
      v-model="search"
      label="Search"
      class="mb-3"
      clearable
      append-icon="mdi-magnify"
      single-line
      hide-details
    />
    <v-data-table :items="tags" :headers="headers" :search="search">
      <template v-if="isEditingNewTag" #body.prepend="{}">
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
        <div v-if="tagEditingId == item.id">
          <v-text-field
            v-model="editTagName"
            label="Edit"
            autofocus
            single-line
            counter
            @blur="updateTagName(item, editTagName)"
            @keydown.enter="updateTagName(item, editTagName)"
          />
        </div>
        <div v-else @click="setToEditing(item)">
          {{ item.name }}
        </div>
      </template>

      <template #item.contact_ids.length="{item}">
        <router-link v-if="item.contact_ids.length" :to="`/contacts/tags/${item.id}`">
          {{ item.contact_ids.length }} Kontakte
        </router-link>
      </template>

      <template #item.actions="{ item }">
        <v-btn x-small :color="btnColor" @click="setToEditing(item)">
          Edit
        </v-btn>
        <v-btn x-small :color="btnColor" :disabled="disabled(item)" @click="deleteTag(item)">
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
      tagEditingId: '',
      isEditingNewTag: false,
      newTagName: '',
      editTagName: '',
      btnColor: 'indigo lighten-4',
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
    disabled (tag) {
      return tag.contact_ids.length > 0
    },
    setToEditing (tag) {
      this.tagEditingId = tag.id
      this.editTagName = tag.name
    },
    updateTagName (tag) {
      const editTag = { ...tag, name: this.editTagName }
      this.$store.dispatch('tags/update', { editTag })
      this.tagEditingId = ''
      this.editTagName = ''
    },
    deleteTag (tag) {
      const confirmed = confirm(
        `Are you sure you want to delete tag ${tag.name}?`
      )
      if (confirmed) {
        this.$store.dispatch('tags/delete', { tag })
      }
    },
    startNewTag () {
      this.isEditingNewTag = true
    },
    createTag () {
      if (this.newTagName.length > 0) {
        this.$store.dispatch('tags/create', { name: this.newTagName })
        this.newTagName = ''
      }
      this.isEditingNewTag = false
    }
  }
}
</script>
