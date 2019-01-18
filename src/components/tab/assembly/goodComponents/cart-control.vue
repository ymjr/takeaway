<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="showInner" >
        <div class="inner icon-remove_circle_outline" @click.stop="decrease"></div>
      </div>
    </transition>
    <div class="cart-count-number"  v-show="showInner">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
  export default {
    name: 'cart-control',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add() {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decrease() {
        if (this.food.count) {
          this.food.count--
        }
      }
    },
    computed: {
      showInner () {
        let showInner = false
        if (this.food.count > 0 ) {
          showInner = true
        }
        return showInner
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .cartcontrol
    display :flex
    height :24px
    align-items :center
    .cart-decrease
      .inner
        font-size :$fontsize-large-xxx
        color:$color-blue
      &.move-enter, .move-leave-to
        opacity :0
        transform :translate3d(24px,0,0)
        .inner
          transform :rotate(180deg)
       &.move-enter-active, .move-leave-active
          transition :all 0.4s linear
    .cart-count-number
      height :100%
      width :24px
      text-align:center
      font-size :$fontsize-small-s
      color:rgb(147,153,159)
    .cart-add
      font-size :$fontsize-large-xxx
      color:$color-blue

</style>
