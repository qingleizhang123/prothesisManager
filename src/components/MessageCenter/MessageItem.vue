<template>
  <div class="message-wrapper">
    <div class="sender" v-if="props.role === 'sender'">
      <span class="avatar">
        <img :src="url"/>
      </span>

      <div class="content">
        <div class="triangle"></div>
        <p>{{ props.content }}</p>
      </div>

    </div>
    <div class="reciever" v-if="props.role === 'reciever'">
      <div class="content">
        <div class="triangle"></div>
        <p>{{ props.content }}</p>
      </div>
      <span class="avatar">
        <img :src="url"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps} from 'vue';
const props = defineProps<{
  userid: 1,
  role: '',
  content: ''
}>();

const url = props.userid === 1 ? 'assets/images/avatar.jpg' : 'assets/images/bg.jpg';
</script>

<style lang="less" scoped>
.message-wrapper {
  display: flow-root;
  margin-top: 10px;
  width: 100%;
  .sender {
    // float: left;
    display: flex;
    .avatar {
      width: 40px;
      height: 40px;
      margin-left: 10px;
      img {
        height: 40px;
        width: 40px;
        border-radius: 4px;
      }
    }
    .content {
      margin-left: 20px;
      padding-right: 70px;
      position: relative;
      .triangle {
        width: 0;
        height: 0;
        border: 8px solid;
        border-left-color: transparent;
        border-top-color: transparent;
        border-right-color: white;
        border-bottom-color: transparent;
        position: absolute;
        top: 5px;
        left: -16px;
      }
      p {
        background: white;
        font-size: 18px;
        padding: 5px 10px;
        border-radius: 5px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .reciever {
    float: right;
    display: flex;
    .avatar {
      margin-left: 20px;
      margin-right: 10px;
      width: 40px;
      height: 40px;
      img {
        height: 40px;
        width: 40px;
        border-radius: 4px;
      }
    }
    .content {
      position: relative;
      padding-left: 70px;
      .triangle {
        width: 0;
        height: 0;
        border: 8px solid;
        border-left-color: yellowgreen;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        position: absolute;
        top: 5px;
        right: -16px;
      }
      p {
        background: yellowgreen;
        font-size: 18px;
        padding: 5px 10px;
        border-radius: 5px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
}
</style>
