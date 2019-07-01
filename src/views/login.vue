<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Sign in to
              <i>Workspaces?</i>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-if="!loading">
              <v-text-field
                v-validate="'required|email' "
                v-model="user.email"
                prepend-icon="person"
                data-vv-name="email"
                name="login"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="user.password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                data-vv-name="password"
                v-validate="'required'"
              ></v-text-field>
            </v-form>
            <v-progress-circular :value="100" color="primary" v-if="loading"></v-progress-circular>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn :href="github" color="secondary">Github</v-btn> -->
            <v-btn @click="login" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

export default {
  name: "login",
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      dictionary: {
        attributes: {
          email: "E-mail Address"
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    ...mapActions("auth", ["authenticate"]),
    login() {
      this.authenticate({
        strategy: "local",
        email: this.user.email,
        password: this.user.password
      })
        .then(res => {
          this.$router.push("/dashboard");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" })
  }
};
</script>
