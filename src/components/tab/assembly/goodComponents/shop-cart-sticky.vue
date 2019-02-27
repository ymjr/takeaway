<template>
    <div class="shop-cart-sticky" v-show="visible" >
      <shop-cart
        ref="shopCart"
        :selectFoods = "selectFoods"
        :deliveryPrice = "deliveryPrice"
        :minPrice = "minPrice"
        :fold="fold"
        :sticky="true"
      >

      </shop-cart>
    </div>
</template>

<script>
  import ShopCart from './shop-cart'
  import popupMixin from 'common/mixins/mixins.js'
  export default {
    mixins: [popupMixin],
    name: 'shop-cart-sticky',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {//配送费
        type: Number,
        default: 0
      },
      minPrice: {//最小起送费
        type: Number,
        default: 0
      },
      fold: {
        type: Boolean,
        default: false
      },
      list: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      ShopCart
    }
  }
</script>

<style lang="stylus" scoped>
  .shop-cart-sticky
    position: absolute
    left:0
    bottom:0
    z-index :999
    width :100%
    height :48px

</style>
