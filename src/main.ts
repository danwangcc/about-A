import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'fullpage.js/dist/fullpage.css'
import VueFullPage from 'vue-fullpage.js'

const app = createApp(App)

app.use(VueFullPage)

app.mount('#app')
