<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
  </div>
</template>

<script>
  import VHeader from './components/v-header/v-header'

  import { getSeller } from '&api'

  export default {
    name: 'app',
    components: {
      VHeader
    },
    data () {
      return {
        seller: {}
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

<style>

</style>
