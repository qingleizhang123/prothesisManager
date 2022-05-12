<template>
  <div class="store-main" ref="storeRef">
    <a-row :gutter="16">
      <a-col :span="4" v-for="item of arr" :key="item">
        <a-card hoverable >
          <template #cover>
            <img
              alt="example"
              style="height: 150px"
              src="assets/images/avatar.jpg"
            />
          </template>
          <template #actions>
            <eye-outlined tooltip="查看三维模型" key="eye" @click="onShowProthesis"/>
            <shopping-cart-outlined alt="加入购物车" key="shoppingcart" @click="onAddShoppingCart(item)"/>
            <star-outlined alt="收藏" key="star" @click="onAddCollect(item)"/>
          </template>
          <a-card-meta :title="item" description="This is the prothesis">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-modal :height="600" :width="800" wrapClassName="model-wrapper" v-model:visible="visible" :closable="false" :footer="null" :get-container="storeRef">
      <div style="height: 600px; width: 800px">
        <prothesis-model></prothesis-model>
      </div>
    </a-modal>

    <a-modal :height="600" :width="800" :title="'消息中心'" wrapClassName="message-wrapper" @cancel="onCancel" :destoryOnClose="true"  v-model:visible="messageVisible" :closable="true" :footer="null" :get-container="storeRef">
      <div style="height: 100%; width: 100%">
        <message-center></message-center>
      </div>
    </a-modal>

    <block-sidebar @showMessage="showMessage"></block-sidebar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { EyeOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons-vue';
import BlockSidebar from '../BlockSidebar.vue';
import MessageCenter from '../MessageCenter/MessageCenter.vue';
import { Modal } from 'ant-design-vue';
import store from '../../store/index';
const visible = ref(false);
const messageVisible = ref(false);
const storeRef = ref(null);
const arr = ['假体1','假体2','假体3','假体4','假体5','假体6','假体7','假体8','假体1','假体2','假体3','假体4','假体5','假体6','假体7','假体8'];
const shoppingInfo = computed(() => {
  return store.state.shoppingInfo;
})

const collectInfo = computed(() => {
  return store.state.collectInfo;
})

const onShowProthesis = () => {
  visible.value = true;
}

const onAddShoppingCart = (item) => {
  shoppingInfo.value.push(item);
};

const onAddCollect = (item) => {
  collectInfo.value.push(item);
}

const showMessage = () => {
  messageVisible.value = true;
};

const onCancel = () => {
  Modal.destroyAll();
};
</script>

<style lang="less" scoped>
.store-main {
  width: 100%;
  height: 95%;
  padding: 0 20px;
  overflow-y: auto;
  overflow-x: hidden;
  :deep(.model-wrapper .ant-modal-body) {
    padding: 0px;
  }
  :deep(.message-wrapper .ant-modal-body) {
    height: 600px;
    width: 800px;
  }
}
</style>
