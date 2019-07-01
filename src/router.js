import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/login.vue";
import ListCreate from "./views/ListCreate.vue";
import SignUp from "./views/auth/SignUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/list/create",
          name: "newlist",
          component: ListCreate
        },
        {
          path: "/dashboard",
          component: () => import("./views/Dashboard.vue")
        }
      ]
    },

    {
      path: "/auth/",
      component: () => import("./views/auth/base.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: Login
        },
        {
          path: "signup",
          name: "signup",
          component: SignUp
        }
      ]
    }
  ]
});
