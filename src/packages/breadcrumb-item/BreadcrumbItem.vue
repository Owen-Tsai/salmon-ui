<script lang="ts">
import {
  h,
  defineComponent,
  Slot,
} from 'vue'
import SIcon from '../icon'
import { ArrowRightSFill } from '@salmon-ui/icons'

export default defineComponent({
  name: 'SBreadcrumbItem',
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
  },
  render() {
    const namePrefix = 'sui-breadcrumb-item'
    let hasCustomSeparator = false

    const attrs = {
      class: namePrefix
    }
    const contentElAttrs = {
      class: [
        `${namePrefix}__content`,
        this.to ? 'is-link' : null
      ],
    }
    const separatorElAttrs = {
      class: `${namePrefix}__separator`
    }
    if (this.$parent?.$slots?.separator) {
      hasCustomSeparator = true
    }

    return h(
      'span',
      attrs,
      [
        h('span', contentElAttrs, this.$slots.default?.()),
        h('span', separatorElAttrs,
          hasCustomSeparator ?
            (this.$parent?.$slots?.separator as Slot)() :
            h(SIcon, () => h(ArrowRightSFill))
        )
      ]
    )
  },
})
</script>
