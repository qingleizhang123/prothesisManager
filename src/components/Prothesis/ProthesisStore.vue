<template>
  <div class="store-main" ref="storeRef">
    <a-row :gutter="16">
      <a-col :span="4" v-for="item of list" :key="item.id">
        <a-card hoverable >
          <template #cover>
            <img
              alt="example"
              style="height: 150px"
              :src="item.imgPath"
            />
          </template>
          <template #actions>
            <eye-outlined tooltip="查看三维模型" key="eye" @click="onShowProthesis(item.modelPath)"/>
            <shopping-cart-outlined alt="加入购物车" key="shoppingcart" @click="onAddShoppingCart(item)"/>
            <star-outlined alt="收藏" key="star" @click="onAddCollect(item)"/>
          </template>
          <a-card-meta :title="item.name" :description="item.description">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-modal :height="600" :width="800" wrapClassName="model-wrapper" :destroyOnClose="true" v-model:visible="visible" :closable="false" :footer="null" :get-container="storeRef">
      <div style="height: 600px; width: 800px">
        <prothesis-model :modelPath="modelPath"></prothesis-model>
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
import { ref, computed, onMounted } from 'vue';
import { EyeOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons-vue';
import BlockSidebar from '../BlockSidebar.vue';
import MessageCenter from '../MessageCenter/MessageCenter.vue';
import { getProthesisList, deleteProthesis } from '../../service/prothesis';
import { Modal, message } from 'ant-design-vue';
import { ProthesisInfo } from '../../utils/interface';
import store from '../../store/index';
const visible = ref(false);
const messageVisible = ref(false);
const storeRef = ref(null);
const list = ref(new Array<ProthesisInfo>());
const modelPath = ref('');
const shoppingInfo = computed(() => {
  return store.state.shoppingInfo;
})

const collectInfo = computed(() => {
  return store.state.collectInfo;
})

const onShowProthesis = (path: string) => {
  visible.value = true;
  modelPath.value = path;
}

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
      list.value = data.map((item, i) => ({
        index: i + 1,
        id: item.id,
        name: item.prothesisName,
        type: item.prothesisType,
        factory: item.prothesisFactory,
        tag: item.tag,
        description: item.description,
        imgPath: `assets/images/${item.prothesisName}.png`,
        modelPath: './stl/model1.stl'
      }))
    } else {
      message.error('假体列表获取失败');
    }
  } catch(err) {
      message.error('接口请求错误');
  }
};

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
