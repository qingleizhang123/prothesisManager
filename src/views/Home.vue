<template>
  <div class="main-container">
    <section class="left">
      <navigation></navigation>
    </section>
    <section class="right">
      <component :is="currentTab"></component>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Navigation from '../components/Navigation.vue';
const currentTab = 'prothesis-list';
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100vh;
  .left {
    width: 160px;
    background: #ccc;
  }
  .right {
    padding-top: 100px;
    flex: 1;
  }
}
</style>