import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Clientes from "@/views/Clientes.vue";
import Produtos from "@/views/Produtos.vue";

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
  {
    path: "/produtos",
    name: "Produtos",
    component: Produtos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
