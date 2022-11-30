import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import axios from 'axios'

import './assets/main.css'

axios.defaults.baseURL = 'http://127.0.0.1:3000/api/v1'


const app = createApp(App)

app.use(router)
app.use(naive)

app.mount('#app')
