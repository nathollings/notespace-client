<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  mounted() {
    this.authenticate()
      .then(() => {
        this.$router.push("/dashboard");
      })
      .catch(() => {
        this.$router.push("/auth/login");
      });
  },
  methods: {
    ...mapActions("auth", ["authenticate"])
  }
};
</script>
