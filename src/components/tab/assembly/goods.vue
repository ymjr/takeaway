<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side=true
        :data="goods"
        :options="scrollOptions"
        :current="current"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts = "barTxts"
            :current = "props.current"
          >
            <template slot-scope="props">
              <div class="text">
                  <support-icon
                    v-if="props.txt.type>=1"
                    :size=3
                    :type="props.txt.type"
                  ></support-icon>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul style="padding:0 18px; box-sizing: border-box;">
            <li v-for="food in good.foods" :key="food.name"  :label="label"  class="food-item border-bottom">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <span class="desc" v-show="food.description">{{food.description}}</span>
                <div class="extra">
                  <span class="count">月销售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <div class="cart-control">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-car-wrapper">
      <shop-cart
        :selectFoods="selectFoods"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      ></shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoods } from '&api'
  import ShopCart from './goodComponents/shop-cart'
  import CartControl from './goodComponents/cart-control'
  import SupportIcon from '&assembly/support-ico/support-ico'
  import Bubble from './goodComponents/bubble'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      seller() {
        return this.data.seller
      },
      selectFoods () {
        let ret = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              ret.push(food)
            }
          })
        })
        return ret
      },
      barTxts () {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            count +=food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      }
    },
    components: {
      ShopCart,
      CartControl,
      SupportIcon,
      Bubble
    },
      data () {
        return {
          current: '精选热菜',
          label: '',
          goods: [],
          scrollOptions: {
            click: false,
            directionLockThreshold: 0
          }
        }
      },
      methods: {
        fetch () {
          getGoods().then((goods) => {
            this.goods = goods
          })
        }
      }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .goods
    position:relative
    text-align :left
    height :100%
    .scroll-nav-wrapper
      position:absolute
      width :100%
      top:0
      left :0
      bottom :48px
    >>> .cube-scroll-nav-bar
        width :80px
        white-space:normal
        overflow :hidden
    >>> .cube-scroll-nav-bar-item
        padding :0 10px
        display :flex
        align-items :center
        height :56px
        line-height :14px
        font-size :$fontsize-small
        background :$color-background-ssss
    >>>.cube-scroll-nav-bar-item_active
        color: #07111B
        .text
          flex:1
          position :relative
        .num
          position:absolute
          right :-8px
          top:-10px
        .support-ico
          display :inline-block
          vertical-align :top
    >>>.cube-scroll-nav-panel-title
        font-size :$fontsize-small
        line-height :26px
        color:#939E9F
        padding-left :14px
        border-left:2px #d9dde1 solid
        @media screen and (-webkit-min-device-pixel-ratio: 2)
          border-left:1.6px #d9dde1 solid
        @media screen and (-webkit-min-device-pixel-ratio: 3)
          border-left:1px #d9dde1 solid
      .food-item
        padding :18px 0
        box-sizing :border-box
        .icon
          display:inline-block
          width: 22%
          height: 22%
          margin-right :10px
          vertical-align: top
          & img
            width :100%
            height 100%
        .content
          display :inline-block
          width :77%
          height :100%
          white-space: pre-wrap
          .name
            line-height :14px
            color:rgb(7,17,27)
            font-size :$fontsize-medium
          .desc
            font-size :$fontsize-small-s
            color:rgb(147,153,159)
            line-height :10px
            margin-top:8px
            word-break: break-all
            word-wrap:break-word
          .extra
            margin-top :8px
            font-size :$fontsize-small-s
            color:rgb(147,153,159)
            line-height :10px
            margin-top:8px
            .count
              margin-right :12px
          .price
            line-height :24px
            .now
              font-size :14px
              font-weight :700
              color:$color-red
            .old
              font-size :10px
              font-weight :700
              line-height :24px
              color:rgb(147,153,159)
              text-decoration:line-through
            .cart-control
              float :right
    .shop-car-wrapper
      position:absolute
      bottom :0
      left :0
      z-index :50
      width :99.95%
      box-sizing :border-box
</style>
