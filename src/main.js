import Vue from 'vue'
import VueAgile from 'vue-agile'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'

library.add(faChevronLeft, faChevronRight, faInfoCircle)

Vue.use(VueAgile)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
