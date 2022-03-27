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
    
    <div class="centered">
      <s-dropdown>
        <template v-slot:reference>
          <s-button>Click Me</s-button>
        </template>

        <s-dropdown-menu>
          <s-dropdown-item>
            <s-icon :name="Add"></s-icon> Action 1
          </s-dropdown-item>
          <s-dropdown-item>
            <s-icon :name="Subtract"></s-icon> Action 2
          </s-dropdown-item>
          <s-dropdown-item>
            <s-icon :name="DeleteBin"></s-icon> Action 3
          </s-dropdown-item>
          <s-dropdown submenu placement="right-start">
            <template v-slot:reference>
              <s-dropdown-item>
                <s-icon :name="User"></s-icon> With Submenu
              </s-dropdown-item>
            </template>

            <s-dropdown-menu>
              <s-dropdown-item>Sub-Action 1</s-dropdown-item>
              <s-dropdown-item>Sub-Action 2</s-dropdown-item>
              <s-dropdown-item>Sub-Action 3</s-dropdown-item>
            </s-dropdown-menu>
          </s-dropdown>
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
import {
  Add,
  Subtract,
  DeleteBin,
  User
} from '@salmon-ui/icons'
</script>

<style lang="scss" scoped>
.centered {
  text-align: center;

  & + & {
    margin-top: 16px;
  }
}

.sui-icon {
  margin-right: 4px;
  font-size: 16px;
}
</style>