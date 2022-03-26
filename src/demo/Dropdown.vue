<template>
  <demo name="Dropdown">
    <div class="centered">
      <s-dropdown>
        <template v-slot:reference>
          <s-button>Click Me</s-button>
        </template>

        <s-dropdown-menu>
          <s-dropdown-item>Action 1</s-dropdown-item>
          <s-dropdown-item>Action 2</s-dropdown-item>
          <s-dropdown-item>Action 3 With Long Text</s-dropdown-item>
          <s-dropdown-item disabled>Disabled Action</s-dropdown-item>
          <s-dropdown-item>Action 4</s-dropdown-item>
          <s-dropdown-item divided danger>Dangerous Action</s-dropdown-item>
        </s-dropdown-menu>
      </s-dropdown>
    </div>
    
  </demo>
</template>

<script lang="ts" setup>
import SDropdown from 'salmon-ui/dropdown'
import SDropdownMenu from 'salmon-ui/dropdown-menu'
import SDropdownItem from 'salmon-ui/dropdown-item'
import SButton from 'salmon-ui/button'
</script>

<style lang="scss" scoped>
.centered {
  text-align: center;
}
</style>