<template>
  <fade-animation>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line border-bottom"></div>
            <div class="text">优惠信息</div>
            <div class="line border-bottom"></div>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="(support,index) in seller.supports" :key="support.type">
              <SupportIcon :size=2 class="icon" :type="seller.supports[index].type"></SupportIcon>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line border-bottom"></div>
            <div class="text">商家公告</div>
            <div class="line border-bottom"></div>
          </div>
          <div class="bulletin">
            <p class="content">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="detailShowClick">
        <i class="icon-close"></i>
      </div>
    </div>
  </fade-animation>
</template>

<script>
  import SupportIcon from '../support-ico/support-ico'
  import star from '../star/star'
  import FadeAnimation from '../fade/FadeAnimation'

  export default {
    name: 'header-detail',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    mounted () {
      var _this = this
      this.bus.$on('change', function(msg) {
        _this.detailShow = msg
      })
    },
    methods: {
      detailShowClick() {
        this.detailShow = !this.detailShow
      }
    },
    components: {
      SupportIcon,
      star,
      FadeAnimation
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .detail
    position:fixed
    z-index :100
    top:0
    left:0
    width :100%
    height: 100%
    overflow :auto
    backdrop-filter: blur(10px)
    background:$color-background-s
    .detail-wrapper
      width :100%
      min-height :100%
      .detail-main
        box-sizing :border-box
        padding :64px 0
        .name
          line-height :16px
          text-align :center
          font-size :16px
          font-weight :700
          color:#fff
        .star-wrapper
          margin-top :18px
          padding:2px 0
          text-align :center
        .title
          display :flex
          width :80%
          margin :28px auto 24px auto
          .text
            padding: 0 12px
            font-weight :700
            font-size :14px
            color:#fff
          .line
            flex :1
            position:relative
            top:-6px
        .supports
          width :80%
          margin :0 auto
          .support-item
            padding :0 12px
            margin-bottom :12px
            font-size :0
            &:last-child
              margin-bottom :0
            .icon
              display :inline-block
              width:16px
              height :16px
              vertical-align :top
            .text
              line-height :16px
              font-size :12px
              font-weight :100px
              color:#fff
              margin-left :6px
        .bulletin
          width :80%
          margin :0 auto
          .content
            padding :0 12px
            line-height :24px
            font-size :12px
            color:#fff
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px
</style>
