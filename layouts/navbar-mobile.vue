<template>
  <v-navigation-drawer v-model="nav.drawer" app temporary persistent class="secondary" dark>
    <v-list class="d-flex flex-column">
      <div v-if="$auth.loggedIn" class="d-flex flex-column">
        <v-chip class="justify-start primary" x-large label tile>
          <v-icon left v-text="'mdi-account'" />{{ $auth.user.name }}
        </v-chip>
        <v-divider class="mx-4" />
      </div>

      <div v-else class="d-flex flex-column">
        <span v-for="item in users" :key="item.icon + Math.random()" class="d-flex flex-column">
          <v-btn class="justify-start" x-large text tile :to="item.route">
            <v-icon left v-text="item.icon" />{{ item.text }}
          </v-btn>
        </span>
      </div>

      <v-btn class="justify-start" x-large text :to="start.route">
        <v-icon left v-text="start.icon" />{{ start.text }}
      </v-btn>
      <v-divider class="mx-4" />

      <div v-for="item in items" :key="item.icon + Math.random()" class="d-flex flex-column">
        <v-btn v-if="$auth.user" class="justify-start" x-large text tile :to="item.route">
          <v-icon left v-text="item.icon" />{{ item.text }}
        </v-btn>
        <v-divider v-if="$auth.user" class="mx-4" />
      </div>

      <div v-if="$auth.user && $auth.user.admin" class="d-flex flex-column">
        <v-btn class="justify-start" x-large text tile :to="admin.route">
          <v-icon left v-text="admin.icon" />{{ admin.text }}
        </v-btn>
        <v-divider class="mx-4" />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    start: { type: Object, required: true },
    items: { type: Array, required: true },
    admin: { type: Object, required: true },
    users: { type: Array, required: true },
    nav: { type: Object, required: true }
  }
}
</script>
