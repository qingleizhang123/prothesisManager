<template>
  <div class="main-container">
    <section class="left">
      <navigation></navigation>
    </section>
    <section class="right">
      <page-header></page-header>
      <component :is="currentTab"></component>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Navigation from '../components/Navigation.vue';
import PageHeader from '../components/PageHeader.vue';
import store from '../store/index';
const currentTab = computed(() => {
  return store.state.currentTab;
})
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100vh;
  .left {
    width: 160px;
    background: #dbb17c;
  }
  .right {
    padding-top: 120px;
    flex: 1;
  }
}
</style>
