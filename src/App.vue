<template>
  <div class="header">
    <button @click="toggleDarkMode">Toggle Theme</button>
  </div>
  <div class="demo-page">
    <div class="demo-row">
      <demo-button />
      <demo-button-group />
      <demo-tag />
      <!-- <demo-dropdown></demo-dropdown>
      <demo-input></demo-input>
      <demo-progress></demo-progress> -->
    </div>
    <div class="demo-row">
      <demo-icon />
      <demo-alert />
      <!-- <demo-breadcrumb></demo-breadcrumb>
      <demo-rating></demo-rating>
      <demo-switch></demo-switch>
      <demo-checkbox></demo-checkbox>
      <demo-checkbox-button></demo-checkbox-button> -->
    </div>
    <div class="demo-row">
      <demo-avatar />
      <!-- <demo-badge></demo-badge>
      <demo-card></demo-card>
      <demo-radio></demo-radio>
      <demo-radio-button></demo-radio-button>
      <demo-select></demo-select> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import DemoButton from '@/demo/Button.vue'
import DemoAlert from '@/demo/Alert.vue'
import DemoButtonGroup from '@/demo/ButtonGroup.vue'
import DemoIcon from '@/demo/Icon.vue'
import DemoAvatar from '@/demo/Avatar.vue'
// import DemoBadge from '@/demo/Badge.vue'
// import DemoCard from '@/demo/Card.vue'
// import DemoBreadcrumb from '@/demo/Breadcrumb.vue'
import DemoTag from '@/demo/Tag.vue'
// import DemoRating from '@/demo/Rating.vue'
// import DemoDropdown from '@/demo/Dropdown.vue'
// import DemoSwitch from '@/demo/Switch.vue'
// import DemoInput from '@/demo/Input.vue'
// import DemoRadio from '@/demo/Radio.vue'
// import DemoRadioButton from '@/demo/RadioButton.vue'
// import DemoCheckbox from '@/demo/Checkbox.vue'
// import DemoCheckboxButton from '@/demo/CheckboxButton.vue'
// import DemoProgress from '@/demo/Progress.vue'
// import DemoSelect from '@/demo/Select.vue'

let isDarkMode = !!window.localStorage.getItem('theme')
if (isDarkMode) {
  document.body.setAttribute('data-sui-theme', 'dark')
  isDarkMode = true
}

const toggleDarkMode = () => {
  if (!isDarkMode) {
    document.body.setAttribute('data-sui-theme', 'dark')
    isDarkMode = true
    window.localStorage.setItem('theme', 'dark')
  } else {
    document.body.removeAttribute('data-sui-theme')
    isDarkMode = false
    window.localStorage.removeItem('theme')
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.demo-page {
  display: flex;
}
.demo-row {
  width: 33.333%;
  padding: 8px;
  flex-shrink: 0;
  flex-grow: 0;
}
.demo-container {
  margin-bottom: 16px;
}
.header {
  position: sticky;
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
  top: 0;
  background-color: var(--sui-fill-1);
  z-index: 99;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
