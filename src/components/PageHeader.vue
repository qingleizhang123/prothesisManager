<template>
  <a-breadcrumb>
    <a-breadcrumb-item href="">
      <home-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item href="">
      <user-outlined />
      <span>首页</span>
    </a-breadcrumb-item>
    <a-breadcrumb-item>{{ pageHeader }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue';
import store from '../store/index';
const pageHeader = computed(() => {
  return store.state.currentNavLabel;
})
</script>

<style lang="less" scoped></style>