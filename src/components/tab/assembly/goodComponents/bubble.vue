<template>
  <span class="bubble">
    {{num}}
  </span>
</template>

<script>
  export default {
    name: 'bubble',
    props: {
      num: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/variable"
  .bubble
    display :inline-block
    padding :0 5px
    height :16px
    line-height :16px
    text-align :center
    font-family :Helvetica
    font-size :$fontsize-small-s
    color: #ffffff
    font-weight :700
    color: #ffffff
    background :$color-red
    border-radius :50%
</style>
