import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/login.vue";
import SignUp from "./views/auth/SignUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
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
    },
    {
      path: "/dashboard",
      component: () => import("./views/Dashboard.vue"),
      children: [
        {
          path: "/",
          name: "dashboard",
          component: () => import("./views/About.vue")
        }
      ]
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
});
