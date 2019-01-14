import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import '&common/index.styl'
import '&common/border.styl'

Vue.config.productionTip = false

Vue.prototype.bus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
