import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from './components/v-header/header-detail/header-detail'
import ShopCartList from './components/tab/assembly/goodComponents/shop-cart-list'
import ShopCartSticky from './components/tab/assembly/goodComponents/shop-cart-sticky'

createAPI(Vue, HeaderDetail, ['click'], true)
createAPI(Vue, ShopCartList, ['click'], true)
createAPI(Vue, ShopCartSticky, ['click'], true)
