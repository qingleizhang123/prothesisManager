<template>
  <div class="register-content">
    <div class="user-interface-title">注册</div>
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish"
    >
      <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <a-form-item :name="['user', 'age']" label="Age" :rules="[{ type: 'number', min: 0, max: 99 }]">
        <a-input-number v-model:value="formState.user.age" />
      </a-form-item>
      <a-form-item :name="['user', 'website']" label="Website">
        <a-input v-model:value="formState.user.website" />
      </a-form-item>
      <a-form-item :name="['user', 'introduction']" label="Introduction">
        <a-textarea v-model:value="formState.user.introduction" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive } from 'vue';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  user: {
    name: '',
    age: undefined,
    email: '',
    website: '',
    introduction: '',
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
</script>

<style lang="less" scoped>
.register-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 26%;
  height: 70%;
  margin: auto;
  background-color: rgba(221, 230, 248, 0.18);
  border-radius: 30px;
  box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.5);
  opacity: 0.9;
  .user-interface-title {
    margin-top: 10%;
    margin-bottom: 10%;
    color: #1e2126;
    font-weight: 700;
    font-size: 30px;
    font-family: MicrosoftYaHei-Bold, inherit, sans-serif;
    text-align: center;
  }
}
</style>