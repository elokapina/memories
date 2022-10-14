import VueAgile from 'vue-agile'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

app.use(VueAgile)

app.config.productionTip = false

app.mount('#app')
