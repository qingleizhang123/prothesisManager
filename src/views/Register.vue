<template>
  <div class="main">
    <div class="register-content">
      <div class="user-interface-title">注册</div>
      <a-form
        ref="formRef"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
      >
        <a-form-item :name="'username'" label="账号" :rules="[{ required: true,  message: '请输入您的账号名称!', trigger: 'blur'}]">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item :name="'password'" label="密码" :rules="[{ required: true, message: '请输入您的密码!', trigger: 'blur'}]">
          <a-input v-model:value="formState.password" />
        </a-form-item>
        <a-form-item :name="'email'" label="邮箱" :rules="[{ required: true, type: 'email', message: '请输入正确的邮箱!', trigger: 'blur'}]">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item :name="'verifycode'" label="验证码" :rules="[{ required: true, len: 4, message: '请输入正确的验证码!', trigger: 'blur' }]">
          <a-input class="verifycode-input" v-model:value="formState.verifycode"/>
          <verify-code v-model:changeCode="identifyCode" :contentWidth="100" :contentHeight="32"></verify-code>
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-button type="primary" style="width: 100%" html-type="submit" @click="onRegister">注册</a-button>
          <span style="color:#fff">已有账号？</span>
          <a @click="onToLogin">立即登录</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref, defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router'
import VerifyCode from '../components/VerifyCode.vue';
import { accountRegister } from '@/service/login';
import { message } from 'ant-design-vue';
interface FormState {
  username: string;
  password: string;
  email: string;
  verifycode: string
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
let identifyCode = ref('');
const formRef = ref(null);
const router = useRouter();

const formState = reactive<FormState>({
  username: '',
  password: '',
  email: '',
  verifycode: ''
});

const onRegister = () => {
  formRef.value.validate().then(async () => {
    if (formState.verifycode !== identifyCode.value) {
      message.error("验证码错误");
      return;
    }
    const param = {
      userName: formState.username,
      password: formState.password,
      email: formState.email
    }
    const res: any = await accountRegister(param);
    try {
      if (res.code === 200) {
        router.push('./login');
      } else {
        message.error('账号注册失败');
      }
    } catch(err) {
       message.error('接口请求错误');
    }
  })
}

const onToLogin = () => {
  router.push('./login');
}
</script>

<style lang="less" scoped>
.main {
  width: 100;
  height: 100%;
  background: url('../../public/assets/images/bg.jpeg');
  .register-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 26%;
    height: 60%;
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
    .verifycode-input {
      width: calc(100% - 100px);
    }
    :deep(.ant-form) {
      color: #fff;
      .ant-form-item-label > label {
        color: #fff;
      }
      .ant-checkbox-wrapper {
        color: #fff;
      }
    }
  }
}


</style>