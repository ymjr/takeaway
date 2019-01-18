<template>
    <div class="tab">
      <cube-tab-bar
        :showSlider="true"
        ref="taBar"
        :data="tabs"
        :useTransition="false"
        v-model="selectedLabel"
        @click="onclick"
      >
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide
          :loop="false"
          :auto-play="false"
          :show-dots="false"
          :initial-index="index"
          ref="slide"
          :options="slideOptions"
          @change="onChange"
          @scroll="onScroll"
        >
          <cube-slide-item v-for="(tab,index) in tabs" :key="index">
              <component :is="tab.component" :data="tab.data" ref="component"></component>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script>

  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        selectedLabel: '商品',
        index: 0,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    },
    mounted() {
      this.onChange(this.index)
    },
    methods: {
      onChange(current) {
        this.selectedLabel = this.tabs[current].label
        const component = this.$refs.component[current]
        component.fetch && component.fetch()
      },
      onclick(value) {
        this.index = this.tabs.findIndex((tab) => {
          return tab.label === value
        })
      },
      onScroll(pos) {//Cube-UI滚动事件
        const PosX = Math.abs(pos.x)
        const taBarWidth = this.$refs.taBar.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth //组件宽度
        const tranfrom = PosX / slideScrollerWidth * taBarWidth
        this.$refs.taBar.setSliderTransform(tranfrom)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~&common/variable"
  .tab
    >>> .cube-tab
      padding:10px 0
    display :flex
    flex-direction :column
    height : 100%
    .slide-wrapper
      flex :1
      overflow :hidden

</style>
