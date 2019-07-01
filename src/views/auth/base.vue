<template>
  <div>
    <v-toolbar app title="test">
      <v-toolbar-title>
        Welcome back to
        <i>Workspaces?</i>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>&copy; 2019 NathanaelDev</v-footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
