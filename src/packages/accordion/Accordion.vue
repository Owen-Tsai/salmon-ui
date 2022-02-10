<template>
  <div
    :class="[
      'sui-accordion',
      {
        'is-outlined': outlined
      }
    ]"
    role="tablist"
    :aria-multiselectable="multiple"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watch,
  provide,
  computed
} from 'vue'

import { Model } from '../accordion-item/accordion-item'

export default defineComponent({
  name: 'SAccordion',
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: [Number, String, Array] as
        PropType<number | string | Array<Model>>,
      default: () => []
    },
    outlined: Boolean,
    headerClass: String,
    bodyClass: String
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const activeNames = ref(
      ([] as Array<number | string>).concat(props.modelValue)
    )

    // methods
    const setActiveNames = (names: Model[] | Model) => {
      activeNames.value = ([] as Model[]).concat(names)
      const activeValue = props.multiple
        ? activeNames.value
        : activeNames.value[0]
      emit('update:modelValue', activeValue)
      emit('change', activeValue)
    }

    const handleItemClick = (name: Model) => {
      if (props.multiple) {
        let names: Model[] = activeNames.value
        const index = names.indexOf(name)

        if (index > -1) {
          names.splice(index, 1)
        } else {
          names.push(name)
        }

        setActiveNames(names)
      } else {
        setActiveNames(
          (activeNames.value[0] || 
            activeNames.value[0] === 0
          ) && activeNames.value[0] === name
            ? ''
            : name,
        )
      }
    }

    // watcher
    watch(() => props.modelValue, () => {
      activeNames.value = ([] as Model[]).concat(props.modelValue)
    })

    // provider
    provide('accordion', {
      activeNames,
      handleItemClick,
      headerClass: computed(() => props.headerClass),
      bodyClass: computed(() => props.bodyClass)
    })

    return {
      activeNames,
      setActiveNames,
      handleItemClick,
    }
  }
})
</script>
