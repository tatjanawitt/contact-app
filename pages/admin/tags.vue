<template>
  <v-container>
    <v-row class="ma-2">
      <div class="display-1" v-text="$t('tags.header')" />
      <v-spacer />
      <v-btn class="primary" @click="startNewTag=!startNewTag">
        <v-icon left v-text="'mdi-tag-plus'" />{{ $t('new') }}
      </v-btn>
    </v-row>
    <v-text-field
      v-model="search"
      :label="$t('tags.tabSearch')"
      class="mb-6"
      clearable
      append-icon="mdi-magnify"
      single-line
      hide-details
    />
    <v-data-table :items="tags"
                  :headers="headers"
                  :search="search"
                  sort-by="id"
                  :sort-desc="true"
                  :items-per-page="5"
    >
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
        <v-chip v-if="item.contact_ids.length"
                :to="`/contacts/tags/${item.id}`"
                :color="btnColor"
                small dark label
        >
          <v-icon left v-text="'mdi-account-multiple'" />
          {{ item.contact_ids.length }} - {{ item.name }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn small class="primary" @click="setToEditing(item)">
          <v-icon v-text="'mdi-pencil'" />
        </v-btn>
        <DialogConfirm
          :item="item"
          :content="`${$t('tags.alertDel')} <b>${item.name}</b>?`"
          :agree-action="deleteTag"
          agree-img="mdi-delete"
          :agree-btn="$t('cForm.delBtn')"
          :header="$t('tags.delHeader')"
          :disabled="item.contact_ids.length > 0"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DialogConfirm from '@/components/dialog-confirm'
export default {
  components: { DialogConfirm },
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
    ...mapState({ tags: state => state.tags.tags }),
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: this.$t('tags.name'), value: 'name' },
        { text: this.$t('tags.numContacts'), value: 'contact_ids.length' },
        { text: this.$t('action'), value: 'actions', sortable: false, width: '150px' }
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
      this.$store.dispatch('tags/delete', { tag })
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

<style lang="scss" scoped>
.v-data-table {
  background-color:rgba(255, 255, 255, 0.8);
}
::v-deep thead.v-data-table-header {
    background-color: rgba(121, 134, 203, 0.5);
    white-space: nowrap;
}
</style>
