<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add new Chat</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="from" lazy-validation v-model="valid" v-if="!loading">
            <v-autocomplete
              :rules="emailRules"
              v-model="model"
              :hint="'Click the icon to save'"
              :items="contacts"
              item-text="email"
              label="Contacts E-mail..."
              autofocus="true"
              hide-no-data="true"
              prepend-icon="user"
            ></v-autocomplete>
          </v-form>
          <v-progress-circular :value="100" color="primary" v-if="loading"></v-progress-circular>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn :href="github" color="secondary">Github</v-btn> -->
          <v-btn :disabled="!isValid" @click="login" color="primary">
            Send Invite
            <v-icon right>send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mkdir } from "fs";
export default {
  data() {
    return {
      contacts: [
        {
          email: "nat@shift.org.nz"
        },
        {
          email: "nat@etec.org.nz"
        },
        {
          email: "nat@skills.org.nz"
        }
      ],
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    isValid() {
      return this.valid;
    }
  }
};
</script>

<style>
</style>
