<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

      <div class="tab-wrapper">
        <keep-alive>
          <tab :tabs="tabs"></tab>
        </keep-alive>
      </div>

  </div>
</template>

<script>
  import VHeader from './components/v-header/v-header'
  import Tab from './components/tab/tab'
  import Goods from './components/tab/assembly/goods'
  import Ratings from './components/tab/assembly/ratings'
  import Seller from './components/tab/assembly/seller'
  import { getSeller } from '&api'

  export default {
    name: 'app',
    components: {
      VHeader,
      Tab
    },
    data () {
      return {
        seller: {}
      }
    },
    computed: {
      tabs() {
        return [{
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
          {
            label: '评价',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }]
      }
    },
    methods: {
      _getSeller() {
        getSeller().then((seller) => {
          this.seller = seller
        })
      }
    },
    mounted () {
      this._getSeller()
    }
  }
</script>

<style lang="stylus">
  #app
    .tab-wrapper
      position: fixed
      top:136px
      left:0
      right :0
      bottom :0
</style>
