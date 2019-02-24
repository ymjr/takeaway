<template>
    <FadeAnimation>
      <cube-popup
        v-show="visible"
        :mask-closable = true
        :z-index = 90
        position = "bottom"
        type="shop-cart-list"
        @mask-click = "maskClick"
      >
        <transition
          name="move"
        >
          <div v-show="visible">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty">清空</span>
            </div>
            <cube-scroll class="list-content" ref="listContent">
              <ul>
                <li
                  class="food"
                  v-for="food in selectFoods"
                  :key="food.name"
                >
                  <span class="name">{{food.name}}</span>
                  <div class="food-content">
                    <div class="price">
                      <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cart-control-wrapper">
                      <cart-control :food="food"></cart-control>
                    </div>
                  </div>
                </li>
              </ul>
            </cube-scroll>
          </div>
        </transition>
      </cube-popup>
    </FadeAnimation>
</template>

<script>
  import CartControl from './cart-control'
  import FadeAnimation from '&assembly/fade/FadeAnimation'

  const EVENT_HIDE = 'hide'
  export default {
    name: 'shop-cart-list',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
        this.$emit(EVENT_HIDE)
      },
      maskClick() {
        this.hide()
      }
    },
    components: {
      CartControl,
      FadeAnimation
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .cube-shop-cart-list
    bottom:48px
    .move-enter,.move-leave-active
      transform :translate3d(0,100%,0)
    .move-enter-active,.move-leave-active
      transition: all .3s ease-in-out
    .list-header
      height:40px
      line-height:40px
      padding:0 18px
      background: $color-background-ssss
      .title
        float: left
        font-size: $fontsize-medium
        color:$color-dark-grey
      .empty
        float:right
        font-size:$fontsize-small
        color: $color-blue
    .list-content
      padding: 0 18px
      max-height:217px
      overflow: hidden
      background: $color-white
      ul
        li
          height :60px
          .name
            font-size :14px
            color:#07111b
          .food-content
            display :flex
            justify-content :space-between
            line-height :24px
            margin-top :8px
            .price
              color :#f01414
              font-size :14px


</style>
