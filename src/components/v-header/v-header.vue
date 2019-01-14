<template>
<div class="header" @click="ShowDetail">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" width="64" height="64">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div class="support" v-if="seller.supports">
          <SupportIcon class="icon" :size=1 :type="seller.supports[0].type"></SupportIcon>
          <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div class="support-count" v-if="seller.supports">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
  <div class="bulletin-wrapper">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%"/>
  </div>
</div>
</template>

<script>
  import SupportIcon from '../support-ico/support-ico'

  export default {
    name: 'v-header',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      SupportIcon
    },
    methods: {
      ShowDetail() {
        this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
          $props: {
            seller: this.seller
          }
        })
        this.headerDetailComp.show()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .header
    position:relative
    overflow :hidden
    color: #fff
    background :$color-background-ss
    .content-wrapper
      position:relative
      padding :24px 12px 18px 24px
      font-size :0
      .avatar
        display :inline-block
        vertical-align :top
        img
          border-radius :2px
      .content
        display :inline-block
        margin-left :16px
        .title
          margin: 2px 0 8px 0
          .brand
            display:inline-block
            vertical-align:top
            width :30px
            height:18px
            bg-image('brand')
            background-size :30px 18px
            background-repeat :no-repeat
          .name
            margin-left :6px
            font-size :$fontsize-large
            font-weight :bold
            line-height :18px
        .description
          margin-bottom:10px
          line-height :12px
          font-weight :100
          font-size :12px
        .support
          .icon
            vertical-align :top
            margin-right :4px
          .text
            line-height :12px
            display :inline-block
            font-size :$fontsize-small-s
      .support-count
        position:absolute
        right :12px
        bottom :14px
        padding:0 8px
        height :24px
        line-height :24px
        border-radius :14px
        background :rgba(0,0,0,0.2)
        text-align :center
        .count
          font-size :$fontsize-small-s
          vertical-align :top
        .icon-keyboard_arrow_right
          margin-left :2px
          line-height :24px
          font-size :$fontsize-small-s
    .bulletin-wrapper
      position:relative
      height :28px
      line-height :28px
      padding :0 12px
      ellipsis()
      background :$color-background-sss
      .bulletin-title
        display:inline-block
        vertical-align :top
        width :22px
        height:12px
        margin-top :8px
        bg-image('bulletin')
        background-size :22px 12px
        background-repeat :no-repeat
      .bulletin-text
        vertical-align :top
        margin :0 4px
        font-size :$fontsize-small-s
      .icon-keyboard_arrow_right
        position :absolute
        font-size :$fontsize-small-s
        right :12px
        top:0px
        line-height :28px
    .background
      position:absolute
      top :0
      left :0
      width :100%
      z-index :-1
      filter: blur(10px)
</style>
