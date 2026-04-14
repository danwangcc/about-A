import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'fullpage.js/dist/fullpage.css'
import VueFullPage from 'vue-fullpage.js'

const app = createApp(App)
// 修复 fullpage.js v4 的 licenseKey 问题
app.use(VueFullPage, {
  licenseKey: "GPL-LICENSE", // 使用开源项目通用的 GPL 授权码
})
app.mount('#app')
