import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [


  {
    path: "/",
    name: "index",
    component: () => import("../views/Home/Home.vue"),
  },
  {
    path: "/home1",
    name: "Homegd",
    component: () => import("../views/Home/Home1.vue"),
  },
  {
    path: "/home2",
    name: "Home2",
    component: () => import("../views/Home/Home2.vue"),
  },

  {
    path: "/home3",
    name: "Home3",
    component: () => import("../views/Home/Home3.vue"),
  },

  {
    path: "/planting",
    name: "planting",
    component: () => import("../views/Planting/index.vue"), 
  },

  {
    path: "/planting2",
    name: "planting2",
    component: () => import("../views/Planting/index2.vue"), 
  },
  {
    path: "/planting3",
    name: "planting3",
    component: () => import("../views/Planting/index3.vue"), 
  },

  {
    path: "/monitoring",
    name: "monitoring",
    component: () =>
      import("../views/Monitoring/Monitoring.vue"),
  },


  {
    path: "/hmg",
    name: "hmg",
    component: () => import("../views/CantaloupeDeal/CantaloupeDeal.vue"),
  },
  {
    path: "/hmg2",
    name: "hmg2",
    component: () => import("../views/CantaloupeDeal/CantaloupeDeal2.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
