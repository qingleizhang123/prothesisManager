<template>
  <div class="main-content" ref="accountManage">
    <a-table
      style="height: 100%"
      :columns="columns"
      :data-source="list"
      :pagination="{ pageSize: 20 }"
      :scroll="{ y: 605 }"
      :change="onChangePage(pagination)"
      >
      <template #action="{ record }">
        <a @click="onEdit(record.userName, record.email)">修改</a>
        <a-divider type="vertical" />
        <a @click="onVerify(record.userName, record.email)">审核</a>
        <a-divider type="vertical" />
        <a @click="onDelete(record.userName)">删除</a>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" title="账号审核" :footer="null" :get-container="() => accountManage">
      <a-form
        ref="formRef"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
      >
        <a-form-item :name="'userName'" label="账号" :rules="[{ required: true,  message: 'Please input your username!'}]">
          <a-input disabled v-model:value="formState.userName" />
          <a-input type="hidden" v-model:value="formState.email"></a-input>
        </a-form-item>
        <a-form-item label="审核状态" :rules="[{ required: true,  message: 'Please select verifyState!'}]">
          <a-select v-model:value="formState.verifyState">
            <a-select-option :value="0">-请选择-</a-select-option>
            <a-select-option :value="1">审核通过</a-select-option>
            <a-select-option :value="-1">审核不通过</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-button type="primary" @click.prevent="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="onCancle">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="editAccountVisible" title="账号修改" :footer="null" :get-container="() => accountManage">
      <a-form
        ref="accountFormRef"
        :model="accountFormState"
        v-bind="layout"
        name="edit-account"
      >
        <a-form-item :name="'userName'" label="账号" :rules="[{ required: true,  message: 'Please input your username!'}]">
          <a-input v-model:value="accountFormState.userName" />
        </a-form-item>
        <a-form-item label="角色" :rules="[{ required: true,  message: 'Please select role!'}]">
          <a-select v-model:value="accountFormState.role">
            <a-select-option value="">-请选择-</a-select-option>
            <a-select-option value="'normal'">普通用户</a-select-option>
            <a-select-option value="dev">开发</a-select-option>
            <a-select-option value="test">测试</a-select-option>
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="supper">超级管理员</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="邮箱"> 
          <a-input v-model:value="accountFormState.email" :rules="[{ required: true,  message: 'Please input your email!'}]"></a-input>
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
import { ref, reactive, defineComponent, onMounted } from 'vue';
import store from '../../store/index';
import { accountList,verigyAccount, deleteAccount } from '../../service/login';
import { message } from 'ant-design-vue';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 150,
  },
  {
    title: '账号',
    dataIndex: 'userName',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'stateStr',
  },
  {
    title: '注册日期',
    dataIndex: 'createDate',
  },
  {
    title: '审核日期',
    dataIndex: 'updateDate',
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'action' },
    width: 200,
  },
];
const accountManage = ref(null);
const visible = ref(false);
const editAccountVisible = ref(false);

const formState = reactive({
  userName: '',
  email: '',
  verifyState: 0
});
const accountFormState = reactive({
  userName: '',
  email: '',
  role: ''
});
const formRef = ref(null);
const accountFormRef = ref(null);
const list = ref([]);

onMounted(() => {
  getData();
})

const getData = async () => {
  const param = {
    page: 1,
    pageSize: 20
  }
  const res: any = await accountList(param);

  try {
    if (res.code === 200) {
      const data = res.data.rows;
      const now = new Date();
      list.value = data.map((item, i) => ({
        index: i + 1,
        id: item.id,
        userName: item.userName,
        roleName: '普通用户',
        email: item.email,
        state: item.state,
        stateStr: getStateStrByState(item.state),
        createDate: now.toLocaleString(),
        updateDate: now.toLocaleString()
      }))
    } else {
      message.error('账号状态更新失败');
    }
  } catch(err) {
      message.error('接口请求错误');
  }
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

const onEdit = (userName, email) => {
  editAccountVisible.value = true;
}

const onVerify = (userName, email) => {
  visible.value = true;
  formState.userName = userName;
  formState.email = email;
}

const onDelete = async (userName) => {
  const param = {
    userName: userName
  }
  const res: any = await deleteAccount(param);

  try {
    if (res.code === 200) {
      message.success(`账号${userName}删除成功！`);
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
      userName: formState.userName,
      email: formState.email,
      state: formState.verifyState
    }
    const res: any = await verigyAccount(param);

    try {
      if (res.code === 200) {
        message.success(`账号${formState.userName}审核完成`);
        visible.value = false;
        getData();
      } else {
        message.error('账号状态更新失败');
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
  :deep(.ant-modal-body) {
    padding: 24px;
  }
}
</style>
