import { createRouter, createWebHashHistory} from "vue-router";
import { routes } from "./router";


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
