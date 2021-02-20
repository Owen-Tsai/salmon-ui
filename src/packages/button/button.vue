<template>
  <button
    :class="[
      'sui-button',
      `sui-button--${type}`,
      size ? `sui-button--${size}` : ''
    ]"
  ></button>
</template>

<script>
  export default {
    name: 'SButton',
    
  }
</script>
