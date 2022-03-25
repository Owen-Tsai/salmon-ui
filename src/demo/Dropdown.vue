<template>
  <demo name="Dropdown">
    <s-dropdown>
      <template v-slot:reference>
        <s-button>Click Me</s-button>
      </template>

      <s-dropdown-menu>
        <s-dropdown-item>Mao</s-dropdown-item>
        <s-dropdown-item>Xu</s-dropdown-item>
        <s-dropdown-item>Yue</s-dropdown-item>
        <s-dropdown-item>Lin</s-dropdown-item>
      </s-dropdown-menu>
    </s-dropdown>
  </demo>
</template>

<script lang="ts" setup>
import SDropdown from 'salmon-ui/dropdown'
import SDropdownMenu from 'salmon-ui/dropdown-menu'
import SDropdownItem from 'salmon-ui/dropdown-item'
import SButton from 'salmon-ui/button'
</script>