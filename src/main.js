import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";




// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

