<template>
  <div class="block-sidebar">
    <button>
      <img title="购物车" src="assets/images/shopping-cart.svg" />
      <span>{{ shoppingInfo.length }}</span>
    </button>
    <button>
      <img title="收藏夹" src="assets/images/collect.svg" />
      <span>{{ collectInfo.length }}</span>
    </button>
    <button @click="showMessage">
      <img title="消息通知" src="assets/images/message.svg" />
      <span>0</span>
    </button>
    <button>
      <img title="回到顶部" src="assets/images/back-top.svg" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue';
import store from '../store/index';
const emits = defineEmits<{
  (e: 'showMessage'): void
}>();
const shoppingInfo = computed(() => {
  return store.state.shoppingInfo;
});

const collectInfo = computed(() => {
  return store.state.collectInfo;
});

const showMessage = () => {
  emits('showMessage');
};
</script>

<style lang="less" scoped>
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
    background: rgba(204, 204, 204, 0.5);
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
</style>
