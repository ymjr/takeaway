import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from './components/v-header/header-detail/header-detail'

createAPI(Vue, HeaderDetail, ['click'], true)
