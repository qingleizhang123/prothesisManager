<template>
  <div class="store-main">
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

    <a-modal :height="600" :width="800" wrapClassName="model-wrapper" v-model:visible="visible" :closable="false" :footer="null">
      <div style="height: 600px; width: 800px">
        <prothesis-model></prothesis-model>
      </div>

    </a-modal>

    <div class="block-sidebar">
      <button>
        <img src="assets/images/shopping-cart.svg" />
        <span>{{shoppingInfo.length}}</span>
      </button>
      <button>
        <img src="assets/images/collect.svg" />
        <span>{{collectInfo.length}}</span>
        </button>
      <button>
        <img src="assets/images/message.svg" />
        <span>0</span>
      </button>
      <button>
        <img src="assets/images/back-top.svg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { EyeOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons-vue';
import store from '../store/index';
const visible = ref(false);
const arr = ['假体1','假体2','假体3','假体4','假体5','假体6','假体7','假体8','假体1','假体2','假体3','假体4','假体5','假体6','假体7','假体8'];
const shoppingInfo = computed(() => {
  return store.state.shoppingInfo;
})

const collectInfo = computed(() => {
  return store.state.colletInfo;
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
</script>

<style lang="less" scoped>
.store-main {
  width: 100%;
  height: 95%;
  padding: 0 20px;
  overflow-y: auto;
  overflow-x: hidden;
  .block-sidebar {
    position: fixed;
    top: 350px;
    width: 60px;
    z-index: 99;
    right: 2%;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    button {
      width: 50px;
      height: 50px;
      margin: 5px;
      border-radius: 50%;
      background: rgba(204,204,204,.5);
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      span {
        display: inline-block;
        position: absolute;
        right: 0;
        top: -5px;
        height: 20px;
        line-height: 20px;
        width: 20px;
        border-radius: 50%;
        background: red;
        font-size: 12px;
        color: #fff;
      }
    }
    button:hover {
      background: #b5b5b5;;
    }
  }
}
</style>
