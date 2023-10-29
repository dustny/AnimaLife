import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FunFactView from "../views/FunFactView.vue";
import LoginPageView from "../views/LoginPage.vue";
import RegisterPageView from "../views/RegisterPage.vue";
import UpdatePageView from "../views/UpdatePage.vue";
import SubscribePageView from "../views/SubscribePage.vue";
import AsiaRegion from "../views/AsiaRegion.vue";
import AfricaRegion from "../views/AfricaRegion.vue";
import AmericaRegion from "../views/AmericaRegion.vue";
import AntarticaRegion from "../views/AntarticaRegion.vue";
import AustraliaRegion from "../views/AustraliaRegion.vue";
import EuropeRegion from "../views/EuropeRegion.vue";
import SearchAnimal from "../views/SearchAnimal.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/fun",
      name: "fun",
      component: FunFactView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPageView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPageView,
    },
    {
      path: "/update",
      name: "update",
      component: UpdatePageView,
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: SubscribePageView,
    },
    {
      path: "/asia",
      name: "asia",
      component: AsiaRegion,
    },
    {
      path: "/america",
      name: "america",
      component: AmericaRegion,
    },
    {
      path: "/europe",
      name: "europe",
      component: EuropeRegion,
    },
    {
      path: "/africa",
      name: "africa",
      component: AfricaRegion,
    },
    {
      path: "/australia",
      name: "autralia",
      component: AustraliaRegion,
    },
    {
      path: "/antartica",
      name: "antartica",
      component: AntarticaRegion,
    },
    {
      path: "/search",
      name: "search",
      component: SearchAnimal,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (localStorage.access_token) {
    if (to.name === "login" || to.name === "register") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          to.name === "login"
            ? "You cannot go to the login page if you are already logged in!"
            : "You cannot go to the register page if you are already logged in!",
      });
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    if (to.name === "home" || to.name === "login" || to.name === "register") {
      next();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to login first if you want to explore more!",
      });
      next({ name: "login" });
    }
  }
});

export default router;
