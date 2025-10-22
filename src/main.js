import { createApp } from 'vue'
import './style.css'
import './auth';
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import globalFunctions from "./globalFunctions";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createHead } from '@vueuse/head'

const pinia = createPinia()
const app = createApp(App)
const head = createHead()
app.use(pinia);
app.use(head)
app.use(router);
app.use(VueSweetalert2);
app.use(globalFunctions);
app.mount('#app')
// createApp(App).mount('#app')
