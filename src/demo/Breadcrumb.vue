<template>
  <demo name="Breadcrumb">
    <s-breadcrumb>
      <s-breadcrumb-item>Home</s-breadcrumb-item>
      <s-breadcrumb-item>Blogs</s-breadcrumb-item>
      <s-breadcrumb-item>My Trip to Asia</s-breadcrumb-item>
    </s-breadcrumb>

    <s-breadcrumb>
      <template v-slot:separator>
        <s-icon :name="ArrowRightS"></s-icon>
      </template>
      <s-breadcrumb-item to="/home">Home</s-breadcrumb-item>
      <s-breadcrumb-item>Blogs</s-breadcrumb-item>
      <s-breadcrumb-item>My Trip to Asia</s-breadcrumb-item>
    </s-breadcrumb>

    <s-breadcrumb>
      <template v-slot:separator>
        <span style="margin: 0 4px;">/</span>
      </template>
      <s-breadcrumb-item>Home</s-breadcrumb-item>
      <s-breadcrumb-item>Blogs</s-breadcrumb-item>
      <s-breadcrumb-item>My Trip to Asia</s-breadcrumb-item>
    </s-breadcrumb>
  </demo>
</template>

<script lang="ts" setup>
import SBreadcrumb from 'salmon-ui/breadcrumb'
import SBreadcrumbItem from 'salmon-ui/breadcrumb-item'
import { ArrowRightS } from '@salmon-ui/icons'
</script>