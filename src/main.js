import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import app from "./app.vue";
import fixtures from "./fixtures.vue";
import tables from "./tables.vue";
import team from "./team.vue";

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: "/", redirect: "/fixtures"},
    {path: "/fixtures", component: fixtures},
    {path: "/tables", component: tables},
    {path: "/team/:teamId", component: team}
  ]
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(app)
});