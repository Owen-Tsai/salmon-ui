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
            <div class="item">
              <div class="icon-wrapper">
                <s-icon :name="Add"></s-icon>
              </div>
              <div class="text-wrapper">
                <div class="title">Add New Entry</div>
                <div class="info">Add a new entry to your inbox</div>
              </div>
            </div>
          </s-dropdown-item>
          <s-dropdown-item>
            <div class="item">
              <div class="icon-wrapper">
                <s-icon :name="DeleteBin"></s-icon>
              </div>
              <div class="text-wrapper">
                <div class="title">Remove Entry</div>
                <div class="info">Remove selected entry from your inbox</div>
              </div>
            </div>
          </s-dropdown-item>
          <s-dropdown-item divided>
            <div class="item">
              <div class="icon-wrapper">
                <s-icon :name="User"></s-icon>
              </div>
              <div class="text-wrapper">
                <div class="title">Profile</div>
                <div class="info">Check your profile page</div>
              </div>
            </div>
          </s-dropdown-item>
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

.item {
  display: flex;
  align-items: center;

  .icon-wrapper {
    background-color: #2563eb;
    color: #fff;
    width: 40px;
    height: 40px;
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .text-wrapper {
    flex-grow: 1;
    padding-left: 16px;

    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>