<template>
  <div class="menu-content">
    <a-form ref="formRef" :model="dynamicValidateForm" v-bind="layout">
      <a-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        v-bind="index === 0 ? formItemLayout : {}"
        :label="domain.label"
        :name="['domains', index, 'value']"
        :rules="{
          required: true,
          message: 'domain can not be null',
          trigger: 'change',
        }"
      >
        <a-input
          v-model:value="domain.value"
          placeholder="please input domain"
          style="width: 80%;margin-right: 8px"
        />
        <MinusCircleOutlined
          v-if="dynamicValidateForm.domains.length > 1"
          class="dynamic-delete-button"
          :disabled="dynamicValidateForm.domains.length === 1"
          @click="removeDomain(domain)"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
        <a-button type="dashed" style="width: 80%" @click="addDomain">
          <PlusOutlined />
          增加子菜单
        </a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
        <a-button type="primary" html-type="submit" @click="submitForm">添加</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';

interface Domain {
  value: string;
  label: string;
  key: number;
}

const formRef = ref(null);
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const dynamicValidateForm: UnwrapRef<{ domains: Domain[] }> = reactive({
  domains: [],
});
const submitForm = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', dynamicValidateForm.domains);
    })
    .catch((error: ValidateErrorEntity<any>) => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
const removeDomain = (item: Domain) => {
  let index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

let count = 0;
const addDomain = () => {
  count++;
  dynamicValidateForm.domains.push({
    value: '',
    label: `${count}级菜单`,
    key: Date.now(),
  });
};
</script>

<style lang="less" scoped>

</style>
