<template>
  <v-container class="px-0">
    <v-text-field
      v-model="search"
      :label="$t('tags.tabSearch')"
      class="mb-6"
      clearable
      append-icon="mdi-magnify"
      single-line
      hide-details
    />
    <v-data-table :items="tags" :headers="headers" :search="search"
                  sort-by="id" :sort-desc="true" :items-per-page="5"
                  :no-results-text="$t('noData')"
    >
      <template v-if="startNew.tag" #body.prepend="{}">
        <tr>
          <td>
            <v-text-field
              v-model="newTagName" label="Edit"
              autofocus single-line counter
              @blur="createTag()"
              @keydown.enter="createTag()"
            />
          </td>
        </tr>
      </template>

      <template #item.name="{item}">
        <div v-if="updateTag.id == item.id">
          <v-text-field
            v-model="updateTag.name" label="Edit"
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
import DialogConfirm from '@/components/dialog-confirm'
export default {
  components: { DialogConfirm },
  props: {
    startNew: { type: Object, required: true },
    tags: { type: Array, required: true },
    headers: { type: Array, required: true }
  },
  data () {
    return {
      newTagName: '',
      updateTag: { id: '', name: '' },
      btnColor: 'indigo lighten-2',
      search: ''
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
    background-color: rgba(121, 134, 203, 0.5);
    white-space: nowrap;
}
</style>
