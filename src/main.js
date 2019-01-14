import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import '&common/index.styl'
import '&common/border.styl'
import './register'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
