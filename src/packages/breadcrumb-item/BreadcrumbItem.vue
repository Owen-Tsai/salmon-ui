<script lang="ts">
import {
  h,
  defineComponent,
} from 'vue'

import { buildProp } from '@/utils/props'

import SIcon from '../icon'
import { ArrowRightSFill } from '@salmon-ui/icons'

export default defineComponent({
  name: 'SBreadcrumbItem',
  props: {
    to: buildProp({
      type: [String, Object],
    } as const),
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
            this.$parent?.$slots?.separator!() :
            h(SIcon, () => h(ArrowRightSFill))
        )
      ]
    )
  },
})
</script>
