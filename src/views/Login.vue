<template>
  <div class="main" style="height:100%;width:100%;">
    <div class="login-content">
      <div class="user-interface-title">登陆</div>
      <a-form
        ref="formRef"
        :model="formState"
        v-bind="layout"
        name="normal_login"
        class="login-form"
      >
        <a-form-item
          label="账号"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
          <a-form-item  :wrapper-col="{ ...layout.wrapperCol, offset: 6 }" name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
          </a-form-item>
        </div>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-button :disabled="disabled" style="width: 100%" type="primary" html-type="submit" class="login-form-button" @click="handleSubmit">
            登录
          </a-button>
          <span style="color:#fff">还没有账号？</span>
          <a @click="onToRegister">请先注册!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref, defineComponent, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { accountLogin } from '@/service/login';
import { message } from 'ant-design-vue';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const router = useRouter();
const formRef = ref(null);
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    const param = {
      userName: formState.username,
      password: formState.password
    }
    const res: any = await accountLogin(param);
    if (res.code === 200) {
      localStorage.setItem('userName', formState.username);
      localStorage.setItem('roles', 'normal');
      localStorage.setItem('token', res.token);
      router.push('./home');
    } else {
      message.error(res.msg);
    }
  })
}

const onToRegister = () => {
  router.push('./register');
}

</script>

<style lang="less" scoped>
.main {
  background: url('../../public/assets/images/bg.jpeg');
}
.login-content {
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
    color: #fff;
    font-weight: 700;
    font-size: 30px;
    font-family: MicrosoftYaHei-Bold, inherit, sans-serif;
    text-align: center;
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
</style>
