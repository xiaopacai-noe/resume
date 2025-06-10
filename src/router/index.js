import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import EditResume from "@/views/EditResume.vue";
import Template from "@/views/Template.vue";
import Ai from "@/views/Ai.vue";
const routers = [
  {
    path: "/",
    name: "/",
    redirect: "/template",
    children: [
      {
        path: "edit/:id",
        name: "edit",
        component: EditResume,
      },
      {
        path: "template",
        name: "template",
        component: Template,
      },
      {
        path: "ai",
        name: "ai",
        component: Ai,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
