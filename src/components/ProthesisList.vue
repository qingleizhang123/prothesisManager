<template>
  <div class="main-content">
    <a-table
      style="height: 100%"
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 20 }"
      :scroll="{ y: 605 }"
      >
      <template #action>
        <a>修改</a>
        <a-divider type="vertical" />
        <a @click="onScanModel">浏览</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </template>
    </a-table>

    <a-model 
      v-model:visible="visible"
      title="假体模型"
      :width="1188"
      :height="600"
      >
      <prothesis-model></prothesis-model>
    </a-model>
  </div>
    
  
</template>

<script lang="ts" setup>
import { ref, defineComponent } from 'vue';
import ProthesisModel from '../components/ProthesisModel.vue';
import store from '../store/index';
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: '假体名称',
    dataIndex: 'name',
  },
  {
    title: '假体类型',
    dataIndex: 'type',
  },
  {
    title: '假体厂商',
    dataIndex: 'factory',
  },
  {
    title: '标签',
    dataIndex: 'tag',
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'action' },
    width: 400,
  },
];
const visible = ref(false);

const data = [...Array(100)].map((_, i) => ({
  id: i + 1,
  name: `Edward King ${i}`,
  type: 2,
  tag: 'feidu',
  factory: `feidu${i}`,
}));

const onScanModel = () => {
  visible.value = true;
}

</script>

<style lang="less" scoped>
.main-content {
  height: 100%;
  width: 100%;
}
.ant-modal-header {
  width: 1188px;
}

.ant-modal-body {
  padding: 0 !important;
  width: 1188px !important;
  height: 530px !important;
  padding: 32px 84px 35px 80px !important;
}

.ant-modal-content {
  height: 800px !important;
  width: 1188px !important;
}

.ant-modal-footer {
  margin-top: 0px;
  width: 1188px !important;
  padding: 0 0 32px 0;
}
</style>