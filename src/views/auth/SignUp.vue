<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Sign up for
              <i>Workspaces?</i>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form id="signupForm" v-if="!loading">
              <h1>Sign up</h1>
              <v-text-field
                v-model="user.name"
                v-validate="'required|max:25'"
                :counter="25"
                :error-messages="errors.collect('name')"
                label="Name"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="E-mail"
                data-vv-name="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.username"
                v-validate="'required'"
                :error-messages="errors.collect('username')"
                label="Username"
                hint="Enter a username you will remember"
                data-vv-name="username"
                required
              ></v-text-field>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="user.password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  hint="At least 8 characters"
                  data-vv-name="password"
                  counter
                  v-validate="{is: user.confirmPassword}"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="user.confirmPassword"
                  :append-icon="show2 ? 'visibility' : 'visibility_off'"
                  :type="show2 ? 'text' : 'password'"
                  name="password_confirmation"
                  v-validate="{is: user.password}"
                  label="Confirm password"
                  hint="Must match above."
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-flex>
            </v-form>
            <v-progress-circular :size="70" v-if="loading"></v-progress-circular>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn form="signupForm" @click="submit" color="primary">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
function userTemplate() {
  return {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    githubId: null
  };
}
import Vue from "vue";
import { mapState } from "vuex";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      show1: false,
      is_loading: false,
      show2: false,
      user: userTemplate(),
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        },
        custom: {
          name: {
            required: () => "Name can not be empty",
            max: "The name field may not be greater than 25 characters"
            // custom messages
          },
          username: {
            required: () => "Username is required!"
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) {
          return;
        }
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user
          .save()
          .then(_user => {
            this.clear();
            this.$router.push("/auth/login");
          })
          .catch(err => {
            console.log(err);
            Object.keys(err.errors).forEach(key => {
              this.$validator.errors.add({
                field: key,
                msg: err.message
              });
            });
          })
          .finally(() => {});
      });
    },
    clear() {
      this.user = userTemplate();
      this.$validator.reset();
    }
  },
  computed: {
    ...mapState("users", { loading: "isCreatePending" }),
    isLoading() {
      return this.is_loading;
    }
  }
};
</script>

<style>
</style>
