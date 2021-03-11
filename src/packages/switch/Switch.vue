<template>
  <div
    class="sui-switch"
    :class="{
      'is-disabled': disabled,
      'is-checked': checked
    }"
  >
    <input
      class="sui-switch__input"
      ref="input"
      type="checkbox"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @change="handleChange"
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SSwitch',
    props: {
      disabled: Boolean
    }
  })
</script>
