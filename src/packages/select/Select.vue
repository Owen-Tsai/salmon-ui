<template>
  <div class="sui-select">
    <!-- reference -->
    <s-input
      ref="referenceEl"
      class="sui-select__input"
      v-model="selected"
      :placeholder="placeholder"
      readonly
      :disabled="disabled"
      :prefix-icon="prefixIcon"
    >
      <template #suffix>
        <s-icon name="chevron-down" ref="suffixEl"></s-icon>
      </template>
    </s-input>

    <div
      class="sui-select__popper"
      ref="popperEl"
    >
      <ul class="sui-select__menu">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    onMounted,
    PropType,
    watchEffect,
    watch
  } from 'vue'
  import tippy from 'tippy.js'
  import { Placement } from 'tippy.js'
  import {
    triggerType,
    themeType,
    dropdownPopperConfig
  } from '@/utils/popper-options'

  import SInput from '../input'
  import SIcon from '../icon'

  export default defineComponent({
    components: {
      SInput,
      SIcon
    },
    props: {
      placeholder: String,
      disabled: Boolean,
      prefixIcon: String,
      placement: {
        type: String as PropType<Placement>,
        default: 'bottom',
        validator: (v: string) => {
          return ['bottom', 'top'].includes(v)
        }
      },
      multiple: Boolean,
      limit: {
        type: Number,
        default: 0
      }
    },
    setup(props, ctx) {
      // refs
      const referenceEl = ref()
      const popperEl = ref()
      const suffixEl = ref()
      let tippyInstance: any = null

      const handleHide = () => {
        suffixEl.value.classList.add('')
      }

      const handleShow = () => {

      }

      const options = {
        placement: props.placement,
        hideOnClick: !props.multiple,
        trigger: triggerType('click'),
        theme: themeType('light'),
        interactive: true,
        classes: ['sui-popper--select'],
        onHide: handleHide,
        onShow: handleShow,
      }

      onMounted(() => {
        if(referenceEl.value) {
          tippyInstance = tippy(referenceEl.value, {
            ...options, ...dropdownPopperConfig, ...{
              content: popperEl.value
            }
          })
        }

        if(props.disabled) {
          tippyInstance.disable()
        }
      })

      watchEffect(() => {
        if(!tippyInstance) return
        tippyInstance.setProps({
          placement: props.placement,
          hideOnClick: !props.multiple
        })
      })

      watch(() => props.disabled, (val) => {
        if(val) {
          tippyInstance.disable()
        } else {
          tippyInstance.enable()
        }
      })
    }
  })
</script>
