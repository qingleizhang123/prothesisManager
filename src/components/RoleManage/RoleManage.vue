<template>
  <div class="main-content">
    <a-table
      style="height: 100%"
      :columns="columns"
      :data-source="list"
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
        ref="roleformRef"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
      >
        <a-form-item :name="'roleName'" label="角色名称" :rules="[{ required: true,  message: 'Please input your rolename!'}]">
          <a-input v-model:value="formState.roleName" />
        </a-form-item>
        <a-form-item :name="'roleText'" label="角色说明" :rules="[{ required: true,  message: 'Please input your roletext!'}]">
          <a-input v-model:value="formState.roleText" />
          <!-- <a-select v-model:value="formState.roleText">
            <a-select-option value="普通用户">普通用户</a-select-option>
            <a-select-option value="开发">开发</a-select-option>
            <a-select-option value="测试">测试</a-select-option>
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="超级管理员">超级管理员</a-select-option>
          </a-select> -->
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-button type="primary" @click.prevent="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="onCancle">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

  <button v-drag @click="onAddRole" style="position:absolute;top: 10px;left:200px;width:200px;height:30px;">新增角色</button>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import store from '../../store/index';
import { getRoleList, createRole, deleteRole } from '../../service/role';
import { message } from 'ant-design-vue';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '角色说明',
    dataIndex: 'roleText',
  },
  {
    title: '创建日期',
    dataIndex: 'createdAt',
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
  roleName: '',
  roleText: ''
});
const roleformRef = ref(null);
const list = ref([]);

onMounted(() => {
  getData();
})

const getData = async () => {
    const param = {
    page: 1,
    pageSize: 20
  }

    const res = await getRoleList(param);

    try {
      if (res.code === 200) {
        const data = res.data.rows;
        list.value = data.map((item, i) => ({
          index: i + 1,
          id: item.id,
          roleName: item.roleName,
          roleText: item.roleText,
          createdAt: new Date(item.createdAt).toLocaleString()
        }));
      } else {
        message.error('接口请求错误！');
      }
    } catch (err) {
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

const onAddRole = () => {
  visible.value = true;
}

const onDelete = async (roleName) => {
  const param = {
    roleName: roleName
  }
  const res: any = await deleteRole(param);

  try {
    if (res.code === 200) {
      message.success(`${roleName}角色删除成功！`);
      getData();
    } else {
      message.error('角色删除失败');
    }
  } catch(err) {
    message.error('接口请求错误');
  }
}

const onSubmit = () => {
  roleformRef.value.validate().then(async () => {
    const param = {
      roleName: formState.roleName,
      roleText: formState.roleText
    }
    const res: any = await createRole(param);

    try {
      if (res.code === 200) {
        message.success(`${formState.roleName}角色创建成功`);
        visible.value = false;
        getData();
      } else {
        message.error(`${formState.roleName}角色创建失败`);
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
