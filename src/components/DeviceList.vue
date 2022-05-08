<template>
  <div class="main-content">
    <a-table
      style="height: 100%"
      :columns="columns"
      :data-source="list"
      :pagination="{ pageSize: 20 }"
      :scroll="{ y: 605 }"
      @change="onChangePage($event)"
      >
      <template #action="{ record }">
        <a>修改</a>
        <a-divider type="vertical" />
        <a @click="onScanModel">浏览</a>
        <a-divider type="vertical" />
        <a @click="onDelete(record.id)">删除</a>
      </template>
    </a-table>

    <a-modal :height="600" :width="800" wrapClassName="model-wrapper" v-model:visible="visible" :closable="false" :footer="null">
      <div style="height: 600px; width: 800px">
        <prothesis-model></prothesis-model>
      </div>

    </a-modal>
  </div>


</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { ref, defineComponent, onMounted } from 'vue';
import ProthesisModel from '../components/ProthesisModel.vue';
import { getProthesisList, deleteProthesis } from '../service/prothesis';
import store from '../store/index';
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: '器械名称',
    dataIndex: 'name',
  },
  {
    title: '器械类型',
    dataIndex: 'type',
  },
  {
    title: '器械厂商',
    dataIndex: 'factory',
  },
  {
    title: '标签',
    dataIndex: 'tag',
  },
  {
    title: '器械描述',
    dataIndex: 'description'
  },
  {
    title: '库存',
    dataIndex: 'storeAccount'
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'action' },
    width: 200,
  },
];
const visible = ref(false);
const list = ref([]);

onMounted(() => {
  getData();
});

const getData = async () => {
  const param = {
    page: 1,
    pageSize: 20
  }
  const res: any = await getProthesisList(param);

  try {
    if (res.code === 200) {
      const data = res.data.rows;
      list.value = data.map((item) => ({
        id: item.id,
        name: item.prothesisName,
        type: item.prothesisType,
        factory: item.prothesisFactory,
        tag: item.tag,
        description: '',
        storeAccount: 100
      }))
    } else {
      message.error('假体列表获取失败');
    }
  } catch(err) {
      message.error('接口请求错误');
  }
}

const onScanModel = () => {
  visible.value = true;
}

const onChangePage = (pagination) => {
  console.log(pagination);
}

const onDelete = async (id: number) => {
  const param = {
    id: id
  };
  const res = await deleteProthesis(param);

  try {
    if (res.code === 200) {
      message.success('删除成功！');
      getData();
    } else {
      message.error('假体删除失败');
    }
  } catch(err) {
      message.error('接口请求错误');
  }
}

</script>

<style lang="less" scoped>
.main-content {
  height: 100%;
  width: 100%;
}
</style>
