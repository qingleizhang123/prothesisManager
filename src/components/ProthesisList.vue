<template>
  <a-table
  style="height: 100%"
  :columns="columns"
  :data-source="data"
  :pagination="{ pageSize: 20 }"
  :scroll="{ y: 600 }"
  />
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [...Array(100)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
</script>

<style>

</style>