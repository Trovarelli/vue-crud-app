import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Clientes from "@/views/Clientes.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Clientes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
