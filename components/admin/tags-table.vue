<template>
  <div>
    <SearchField :label="$t('tags.tabSearch')"
                 icon="mdi-magnify"
                 :search="search"
    />
    <v-data-table :items="tags" :headers="headers" :search="search.item"
                  sort-by="id" :sort-desc="true" :items-per-page="5"
                  :no-results-text="$t('noData')"
    >
      <template v-if="startNew.tag" #body.prepend="{}">
        <tr>
          <td>
            <v-text-field
              v-model="newTagName" :label="$t('tags.name')"
              autofocus single-line counter
              @blur="createTag()"
              @keydown.enter="createTag()"
            />
          </td>
        </tr>
      </template>
      <template #item.name="{item}">
        <div v-if="updateTag.id == item.id">
          <v-text-field v-model="updateTag.name" label="Edit"
                        autofocus single-line counter
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
                color="secondary"
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
        <DialogConfirm :item="item"
                       :content="`${$t('tags.alertDel')} <b>${item.name}</b>?`"
                       :agree-action="deleteTag"
                       agree-img="mdi-delete"
                       :agree-btn="$t('cForm.delBtn')"
                       :header="$t('tags.delHeader')"
                       :disabled="item.contact_ids.length > 0"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DialogConfirm from '@/components/dialog-confirm'
import SearchField from '@/components/search-field'
export default {
  components: { DialogConfirm, SearchField },
  props: {
    startNew: { type: Object, required: true },
    tags: { type: Array, required: true },
    headers: { type: Array, required: true }
  },
  data () {
    return {
      newTagName: '',
      updateTag: { id: '', name: '' },
      search: { item: '' }
    }
  },
  methods: {
    setToEditing (tag) { this.updateTag = { ...tag } },
    async updateTagName (tag) {
      if (this.updateTag.name.length > 0) {
        const editTag = { ...tag, name: this.updateTag.name }
        const updatedTag = await this.$store.dispatch('tags/update', { editTag })
        this.$store.dispatch('snackbar/create', {
          text: this.$t('tags.editSuccess') + updatedTag.name + '.'
        })
      }
      this.updateTag.id = ''
    },
    async deleteTag (tag) {
      const res = await this.$store.dispatch('tags/delete', { tag })
      const info = { text: this.$t('tags.delSuccess') + tag.name + '.' }
      if (res.status !== 200 && res.status !== 204) {
        info.text = this.$t('errorMsg')
        info.color = 'error'
      }
      this.$store.dispatch('snackbar/create', { ...info })
    },
    async createTag () {
      if (this.newTagName.length > 0) {
        const newTag = await this.$store.dispatch('tags/create', { name: this.newTagName })
        this.newTagName = ''
        this.$store.dispatch('snackbar/create', {
          text: this.$t('tags.newSuccess') + newTag.name + '.'
        })
      }
      this.startNew.tag = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table {
  background-color:rgba(255, 255, 255, 0.8);
}
::v-deep thead.v-data-table-header {
    background-color: rgba(121, 134, 203, 0.3);
    white-space: nowrap;
}
</style>
