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

  export default defineComponent({
    name: 'SAccordion',
    props: {
      multiple: {
        type: Boolean,
        default: true
      },
      modelValue: {
        type: [Number, String, Array] as
          PropType<number | string | Array<number | string>>,
        default: () => []
      },
      outlined: Boolean,
      headerStyle: {
        type: Object,
        default: undefined
      },
      headerActiveStyle: {
        type: Object,
        default: undefined
      },
      bodyStyle: {
        type: Object,
        default: undefined
      },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const activeNames = ref([].concat(props.modelValue as any))

      // methods
      const setActiveNames = names => {
        activeNames.value = [].concat(names)
        const activeValue = props.multiple ? activeNames.value : activeNames.value[0]
        emit('update:modelValue', activeValue)
        emit('change', activeValue)
      }

      const handleItemClick = name => {
        if (props.multiple) {
          let names: any[] = activeNames.value
          const index = names.indexOf(name)

          if (index > -1) {
            names.splice(index, 1)
          } else {
            names.push(name)
          }

          setActiveNames(names)
        } else {
          setActiveNames(
            (activeNames.value[0] || activeNames.value[0] === 0) &&
            activeNames.value[0] === name
              ? ''
              : name,
          )
        }
      }

      // watcher
      watch(() => props.modelValue, () => {
        activeNames.value = [].concat(props.modelValue as any)
      })

      // provider
      provide('accordion', {
        activeNames,
        handleItemClick,
        headerStyle: computed(() => props.headerStyle),
        headerActiveStyle: computed(() => props.headerActiveStyle),
        bodyStyle: computed(() => props.bodyStyle)
      })

      return {
        activeNames,
        setActiveNames,
        handleItemClick,
      }
    }
  })
</script>
