<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped fixed>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>?NoteSpace?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class>
        <v-btn :to="{name: 'newlist'}" flat>New List?</v-btn>
        <v-btn flat>Donate</v-btn>
        <v-btn flat>Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>&copy; 2019 NathanaelDev</v-footer>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

export default {
  components: {},
  data() {
    return {
      drawer: null
    };
  }
};
</script>
