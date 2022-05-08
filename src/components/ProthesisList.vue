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

    <button @click="addModel" style="position:absolute;top: 10px;left:200px;width:200px;height:30px;">添加模型</button>

    <a-modal v-model:visible="addModelVisible" title="账号审核" :footer="null">
      <a-form
        ref="formRef1"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
      >
        <a-form-item :name="'model'" label="模型" :rules="[{ required: true,  message: 'Please input your model!'}]">
          <a-input v-model:value="formState.model"></a-input>
        </a-form-item>
        <a-form-item label="上传路径" :rules="[{ required: true,  message: 'Please select path!'}]">
          <a-tree-select
            v-model:value="formState.value"
            tree-data-simple-mode
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="treeData"
            placeholder="Please select"
            :load-data="onLoadData"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-button type="primary" @click.prevent="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="onCancle">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>


</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { ref, defineComponent, onMounted, reactive } from 'vue';
import ProthesisModel from '../components/ProthesisModel.vue';
import { getProthesisList, deleteProthesis } from '../service/prothesis';
import store from '../store/index';
interface TreeDataItem {
  id: string | number;
  pId: number;
  value: string;
  title: string;
  isLeaf?: boolean;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
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
    title: '假体描述',
    dataIndex: 'description'
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'action' },
    width: 200,
  },
];
const visible = ref(false);
const addModelVisible = ref(false);
const formRef1 = ref(null);
const formState = reactive({
  path: '',
  model: ''
})
const list = ref([]);

const value = ref<string>();
const treeData = ref<TreeDataItem[]>([
  { id: 1, pId: 0, value: '1', title: 'Expand to load' },
  { id: 2, pId: 0, value: '2', title: 'Expand to load' },
  { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
]);

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
        description: ''
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

const addModel = () => {
  addModelVisible.value = true;
}

const genTreeNode = (parentId: number, isLeaf = false): TreeDataItem => {
  const random = Math.random().toString(36).substring(2, 6);
  return {
    id: random,
    pId: parentId,
    value: random,
    title: isLeaf ? 'Tree Node' : 'Expand to load',
    isLeaf,
  };
};
const onLoadData = (treeNode: any) => {
  console.log(treeNode);
  return new Promise((resolve: (value?: unknown) => void) => {
    const { id } = treeNode.dataRef;
    setTimeout(() => {
      treeData.value = treeData.value.concat([genTreeNode(id, false), genTreeNode(id, true)]);
      resolve();
    }, 300);
  });
};

const onSubmit = () => {
  formRef1.value.validate().then(() => {
    console.log(formState.model, formState.path);
  })
}

</script>

<style lang="less" scoped>
.main-content {
  height: 100%;
  width: 100%;
}
</style>
