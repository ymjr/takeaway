<template>
    <div>
      <div class="shopcart">
        <div class="content" @click="toggleList">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo" :class="showClass">
                <i class="icon-shopping_cart" :class="showClass"></i>
              </div>
              <div class="num" v-show="showClass">
                <Bubble :num="totalCount"></Bubble>
              </div>
            </div>
            <div class="price" :class="showClass">￥{{totaPrice}}</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
            <div class="pay" @click="pay" :class="payClass">{{payDesc}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Bubble from './bubble'

  export default {
    name: 'shop-cart',
    props: {
      selectFoods: {//已经选择的商品
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
      sticky: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        listFold: this.fold
      }
    },
    computed: {
      totaPrice () {//价钱总和
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
          return total
      },
      totalCount() {//购买数量
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totaPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totaPrice < this.minPrice) {
          let diff = this.minPrice - this.totaPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (!this.totaPrice || this.totaPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      showClass() {
        if (this.totalCount) {
          return 'highlight'
        }
      }
    },
    methods: {
      toggleList() {
        if (this.listFold === false) {
          if (!this.totalCount) {
            return
          }
          this.listFold = true
          this._showShopCartList()
          this._showShopCartSticky()
        } else {
          this.listFold = false
          this._hideShopCartList()
        }
      },
      _showShopCartList() {
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          $events: {
            hide: () => {
              this.listFold = false
            },
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
        this.shopCartListComp.show()
      },
      _showShopCartSticky() {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: 'deliveryPrice',
            minPrice: 'minPrice',
            fold: 'listFold',
            list: this.shopCartListComp
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartList() {
        const comp = this.sticky ? this.$parent.list : this.shopCartListComp
        comp.hide && comp.hide()
      },
      _hideShopCartSticky() {
        this.shopCartStickyComp.hide()
      },
      pay(e) {
        if (this.totaPrice < this.minPrice) {
          return
        }
        this.$createDialog({
          type: 'alert',
          title: '支付',
          content: `支付${this.totaPrice}元`
        }).show()
        e.stopPropagation()//阻止冒泡
      }
    },
    watch: {
      fold(newVal) {
        this.listFold = newVal
      },
      totalCount(newVal) {
        if (this.listFold === true && newVal === 0){
          this._hideShopCartList()
        }
      }
    },
    components: {
      Bubble
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .shopcart
    height :48px
    .content
      display :flex
      background :#141d27
      font-size :0
      color:rgba(255,255,255,0.4)
      .content-left
        flex :1
        .logo-wrapper
          display :inline-block
          vertical-align :top
          position:relative
          top: -10px
          margin:0 12px
          padding:6px
          width :56px
          height:56px
          box-sizing :border-box
          border-radius :50%
          background :#141d27
          .logo
            width :100%
            height :100%
            border-radius :50%
            text-align :center
            background :#2b343c
            &.highlight
              background :rgb(0,160,220)
            .icon-shopping_cart
              line-height :44px
              font-size :24px
              color:#80858a
              &.highlight
                color:#fff
          .num
            position:absolute
            top:0
            right:0
            width :24px
            height:16px
            line-height :16px
            text-align :center
            background :$color-red
            border-radius :16px
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display :inline-block
          vertical-align :top
          margin-top :12px
          line-height :24px
          padding-right :12px
          box-sizing :border-box
          border-right :1px solid rgba(255,255,255,0.1)
          font-size :16px
          font-weight :700
          &.highlight
            color:#fff
        .desc
          display :inline-block
          vertical-align :top
          margin:12px 0 0 12px
          font-size :10px
          line-height :24px
      .content-right
        flex: 0 0 105px
        width :105px
        .pay
          height :48px
          line-height :48px
          text-align :center
          font-size :12px
          font-weight :700
          &.not-enough
            background: #2b333b
          &.enough
            background :#00b43c
            color:#fff
</style>
