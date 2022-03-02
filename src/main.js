import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import hljs from 'highlight.js';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
VMdPreview.use(githubTheme, {
    Hljs: hljs,
});


axios.defaults.withCredentials=true;
// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
createApp(App).use(store).use(router).use(ElementPlus).use(VueMarkdownEditor).use(VMdPreview).mount('#app')

