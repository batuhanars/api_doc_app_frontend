import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import VueSweetalert2 from 'vue-sweetalert2'

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.use(ToastPlugin)

app.use(VueSweetalert2)

app.mount('#app')
