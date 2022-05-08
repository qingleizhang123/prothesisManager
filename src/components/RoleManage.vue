<template>
  <div class="main-content">
    <a-table
      style="height: 100%"
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 20 }"
      :scroll="{ y: 605 }"
      :change="onChangePage(pagination)"
      >
      <template #action="{ record }">
        <a @click="onAddRole">新增</a>
        <a-divider type="vertical" />
        <a @click="onDelete(record.roleName)">删除</a>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" title="新增角色" :footer="null">
      <a-form
        ref="formRef"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
      >
        <a-form-item :name="'roleName'" label="角色" :rules="[{ required: true,  message: 'Please input your username!'}]">
          <a-input v-model:value="formState.roleName" />
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
import { ref, reactive, onMounted } from 'vue';
import store from '../store/index';
import { accountList,verigyAccount, deleteAccount } from '../service/login';
import { message } from 'ant-design-vue';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
  },
  {
    title: '创建日期',
    dataIndex: 'createDate',
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'action' },
    width: 400,
  },
];
const visible = ref(false);

const formState = reactive({
  roleName: ''
});
const formRef = ref(null);
const list = ref([]);

onMounted(() => {
  getData();
})

const now = new Date();
const data = [...Array(100)].map((_, i) => ({
  id: i,
  roleName: '普通用户',
  createDate: now.toLocaleString()
}));

const getData = async () => {
}

const getStateStrByState = (state) => {
  switch(state) {
    case -1:
      return '不通过';
    case 0:
      return '待审核';
    case 1:
      return '通过';
  }
}

const onAddRole = () => {
  visible.value = true;
}

const onDelete = async (id) => {
  const param = {
    id: id
  }
  const res: any = await deleteAccount(param);

  try {
    if (res.code === 200) {
      message.success(`账号${id}删除成功！`);
      getData();
    } else {
      message.error('账号删除失败');
    }
  } catch(err) {
    message.error('接口请求错误');
  }
}

const onSubmit = () => {
  formRef.value.validate().then(async () => {
    const param = {
      userName: formState.roleName,
    }
    const res: any = await verigyAccount(param);

    try {
      if (res.code === 200) {
        message.success(`角色${formState.roleName}创建成功`);
        visible.value = false;
        getData();
      } else {
        message.error(`角色${formState.roleName}创建成功`);
      }
    } catch(err) {
       message.error('接口请求错误');
    }
  })
}

const onChangePage = (pagination) => {
  console.log(pagination);
}
</script>

<style lang="less" scoped>
.main-content {
  height: 100%;
  width: 100%;
}
</style>
