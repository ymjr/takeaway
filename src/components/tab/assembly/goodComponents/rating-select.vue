<template>
    <div class="ratings-select">
      <div class="rating-type border-bottom-1px">
        <span class="block positive" @click="selectdType(2)" :class="{'active':selectType ===2}">
          {{desc.all}}
          <span class="count">{{ratings.length}}</span>
        </span>
        <span class="block positive" @click="selectdType(0)" :class="{'active':selectType ===0}">
          {{desc.positive}}
          <span class="count">{{positives.length}}</span>
        </span>
        <span class="block negative" @click="selectdType(1)" :class="{'active':selectType ===1}">
          {{desc.negative}}
          <span class="count">{{negatives.length}}</span>
        </span>
      </div>
      <div class="switch" :class="{'on':onlyContent}">
        <span @click.stop="toggle" class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    name: 'rating-select',
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      selectdType(type) {
        this.$emit('select', type)
      },
      toggle() {
        this.$emit('toggle')
      }
    }

  }
</script>

<style lang="stylus" scoped>
  @import "~&common/mixin"
  @import "~&common/variable"
  .ratings-select
    .rating-type
      padding: 18px 0
      margin :0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size :0
      .block
        display :inline-block
        padding: 8px 12px
        margin-right:8px
        line-height :16px
        border-radius :1px
        font-size :$fontsize-small
        color:$color-grey
        &.active
          color: $color-white
        .count
          margin-left :2px
        &.positive
          background:$color-light-blue
          &.active
            background:$color-blue
        &.negative
          background: $color-light-grey-s
    .switch
      display :flex
      align-items :center
      padding: 12px 18px
      line-height :24px
      border-bottom :1px solid $color-row-line
      color:$color-light-grey
      &.on
        .icon-check_circle
          color:$color-grenn
      .icon-check_circle
        margin-right: 4px
        font-size :$fontsize-large-xxx
</style>
