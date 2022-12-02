import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faHatWizard } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHatWizard);

const app = createApp(App);

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const api = axios.create({
  baseURL: "http://localhost",
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(VueAxios, api);

app.use(router);

app.mount("#app");
