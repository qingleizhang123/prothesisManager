<template>
  <div class="oper-container">
    <button @click="addModel">添加模型</button>
    <div class="search">
      <a-input-search
      v-model:value="searchValue"
      placeholder="输入搜索的内容"
      @search="onSearch"
    />
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
const emits = defineEmits<{
  (e: 'updateAddModel'): void
}>();

const addModel = () => {
  emits('updateAddModel');
};

const onSearch = () => {

};
</script>

<style lang="less" scoped>
.oper-container {
  display: flex;
  padding: 10px;
  height: 52px;
  position: relative;
  button {
    width: 100px;
    height: 100%;
  }
  .search {
    width: 200px;
    right: 20;
    right: 20px;
    position: absolute;
  }
}
</style>