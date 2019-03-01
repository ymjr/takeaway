<template>
    <transition name="move" @after-leave="onLeave">
      <div class="food" v-show="visible">
        <cube-scroll ref="scroll">
          <div class="food-content">
            <div class="image-header">
              <img :src="food.image">
              <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>
              </div>
            </div>
            <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cart-control-wrapper" v-show="food.count">
                <cart-control :food="food"></cart-control>
              </div>
                <transition name="fade">
                  <div class="buy" v-show="!food.count || food.count ===0" @click.stop="addFirst">
                    加入购物车
                  </div>
                </transition>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
              <h1 class="title">商品信息</h1>
              <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
              <h1 class="title">商品评价</h1>
              <rating-select
                :ratings = 'ratings'
                :onlyContent = 'onlyContent'
                :selectType = 'selectType'
                :desc ='desc'
                @select="onSelectType"
                @toggle="onToggle"
              ></rating-select>
              <div class="rating-wrapper">
                <ul v-show="ratings && ratings.length">
                  <li
                    v-for="(rating,index) in computedRatings"
                    class="rating-item border-bottom-1px"
                    :key="index"
                  >
                    <div class="user">
                      <span class="name">{{rating.ursername}}</span>
                      <img class="avatar" width="12" height="12" :src="rating.avatar"></img>
                    </div>
                    <div class="time">{{format(rating.rateTime)}}</div>
                    <p class="text">
                      <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                      {{rating.text}}
                    </p>
                  </li>
                </ul>
                <div class="no-rating" v-show="!ratings || !ratings.length">
                  暂无评论
                </div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </div>
    </transition>
</template>

<script>
  import cartControl from '&components/tab/assembly/goodComponents/cart-control'
  import popupMixin from 'common/mixins/mixins.js'
  import split from './split'
  import moment from 'moment'
  import RatingSelect from './rating-select'
  const ALL = 2
  export default {
    mixins: [popupMixin],
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        onlyContent: true,
        selectType: ALL,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created() {
      this.$on('show', () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
    },
    computed: {
      ratings() {
        return this.food.ratings
      },
      computedRatings() {
        let ret = []
        this.ratings.forEach((rating) => {
          if (this.onlyContent && !rating.text) {
            return
          }
          if (this.selectType === ALL || this.selectType === rating.rateType) {
            ret.push(rating)
          }
        })
        return ret
      }
    },
    methods: {
      onLeave() {
        this.$emit('leave')
      },
      addFirst() {
        this.$set(this.food, 'count', 1)
      },
      format(time) {
        return moment(time).format('YYYY-MM-DD hh:mm')
      },
      onSelectType(type) {
        this.selectType = type
      },
      onToggle() {
        this.onlyContent = !this.onlyContent
      }
    },
    components: {
      cartControl,
      split,
      RatingSelect
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .food
    position :fixed
    left :0
    top :0
    bottom :48px
    z-index :30
    width :100%
    background :$color-white
    &.move-enter-active,&.move-leave-active
      transition: all 0.3s linear
    &.move-enter,&.move-leave-active
      transform:translate3d(100%,0,0)
    .image-header
      position :relative
      width :100%
      height:0
      padding-top: 100%
      img
        position: absolute
        top:0
        left:0
        width :100%
        height: 100%
      .back
        position: absolute
        top:10px
        left:0
        .icon-arrow_lift
          display :block
          padding: 10px
          font-size :$fontsize-large-xx
          color:$color-white
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom:8px
        font-size :$fontsize-medium
        font-weight :700
        color:$color-dark-grey
      .detail
        margin-bottom: 18px
        line-height :10px
        height:10px
        .sell-count,.rating
          font-size :10px
          color:rgb(147,153,159)
        .sell-count
          margin-right :12px
      .price
        font-weight: 700
        line-height :24px
        .now
          margin-right :8px
          font-size :14px
          color:rgb(240,20,20)
        .old
          text-decoration :line-through
          font-size :10px
          color: rgb(147,153,159)
      .cart-control-wrapper
        line-height :24px
        position: absolute;
        right: 18px;
        bottom: 18px;
      .buy
        line-height :24px
        font-size :10px
        color: #fff
        background: rgb(0, 160, 220)
        padding :0 8px
        border-radius :6px
        position: absolute;
        right: 18px;
        bottom: 18px;
        &.fade-enter-active,&.fade-leave-active
          transition: all 0.3s linear
        &.fade-enter,&.fade-leave-active
          transform:translate3d(100%,0,0)
    .info
      padding:18px
      .title
        line-height :14px
        margin-bottom :6px
        font-size :14px
        color: rgb(7,17,27)
      .text
        line-height :24px
        padding:0 8px
        font-size :12px
        color:rgb(77,85,93)
    .rating
      padding:18px
      .title
        line-height :14px
        margin-left :18px
        font-size :14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position :relative
          padding:16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position :absolute
            right :0
            top:16px
            line-height :12px
            .name
              display :inline-block
              margin-right:6px
              vertical-align :top
              font-size :10px
              color:rgb(147,153,159)
            .avatar
              border-radius :50%
          .time
            margin-bottom:6px
            line-height :12px
            font-size:10px
            color: rgb(147,153,159)
          .text
            line-height :16px
            font-size :12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right:4px
              line-height :16px
              font-size :12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
        .no-rating
          padding: 16px 0
          font-size :12px
          color: rgb(147,153,159)
</style>
