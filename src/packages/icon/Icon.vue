<template>
  <span class="sui-icon" v-html="renderedIcon" aria-hidden="true"></span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import feather from 'feather-icons'

  export default defineComponent({
    name: 'SIcon',
    props: {
      name: {
        type: String,
        required: true
      },
      color: String,
      duoToneColor: String,
      strokeWidth: {
        type: [Number, String],
        default: 1.6
      }
    },
    computed: {
      renderedIcon(): any {
        const fill: string = this.duoToneColor ? this.duoToneColor : 'none'
        const stroke: string = this.color ? this.color : 'currentColor'

        return feather.icons[this.name]?.toSvg({
          'stroke-width': this.strokeWidth as string | number,
          'width': '1em',
          'height': '1em',
          'fill': fill,
          'stroke': stroke
        })
      }
    }
  })
</script>

<style lang="stylus" scoped>
  .sui-icon {
    display inline-block
    width 1em
    height 1em
    vertical-align middle
    line-height 1
  }
</style>
