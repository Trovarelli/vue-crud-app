import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faPencil,
  faTrash,
  faListDots,
} from "@fortawesome/free-solid-svg-icons";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import "./assets/scss/global.scss";
import "vue3-toastify/dist/index.css";

library.add(faBars);
library.add(faPencil);
library.add(faTrash);
library.add(faListDots);

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
