<template>
  <div class="message-content">
    <div class="sender1">
      <div class="message-list">
        <message-item v-for="message of messageList1" :userid="message.userid" :key="message" :role="message.role" :content="message.constent"></message-item>
        <!-- <message-item :role="'reciever'" :content="'还没有，你呢？22222222222222222222222222222222222222222222222222222'"></message-item>
        <message-item :role="'sender'" :content="'准备吃点啥？'"></message-item>
        <message-item :role="'reciever'" :content="'蒸熊掌，蒸鹿尾儿，烧花鸭，烧雏鸡，烧子鹅，卤猪，卤鸭。'"></message-item>
        <message-item :role="'sender'" :content="'雷霆嘎嘎？'"></message-item> -->
      </div>
      <a-input class="message-input" v-model:value="value1" @keydown.enter="onMessageSend1"></a-input>
      <button class="send-btn" @click="onMessageSend1">发送</button>
    </div>
    <div class="sender2">
      <div class="message-list">
        <message-item v-for="message of messageList2" :key="message" :userid="message.userid" :role="message.role" :content="message.constent"></message-item>
      </div>
      <a-input class="message-input" v-model:value="value2" @keydown.enter="onMessageSend2"></a-input>
      <button class="send-btn" @click="onMessageSend2">发送</button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MessageItem from './MessageItem.vue';
interface MessageItem {
  userid: number,
  role: string,
  constent: string
}
let socketA, socketB;
let offer, peerA;
let answer, peerB;

let value1 = ref('');
let value2 = ref('');
const messageList1 = ref(new Array<MessageItem>());
const messageList2 = ref(new Array<MessageItem>());

onMounted(() => {
  createClient();
  onMessage();
});

onUnmounted(() => {
  closeClient();
});

// 建立发起端和接收端
const createClient = () => {
  socketA = new WebSocket('ws://localhost:3000/webrtc/sender/1');
  socketB = new WebSocket('ws://localhost:3000/webrtc/reader/2');
};

const closeClient = () => {
  socketA.close();
  socketB.close();
};

// 订阅消息
const onMessage = () => {
  // peerA
  socketA.onmessage = evt => {
    let string = evt.data
    let value = string.split('|')
    if (value[0] == 'join') {
      peerInit(value[1])
    }
    if (value[0] == 'candid') {
      let json = JSON.parse(value[1])
      let candid = new RTCIceCandidate(json)
      peerA.addIceCandidate(candid)
    }
    if (value[0] == 'message') {
      let message = value[1];
      console.log(message, 'value1');
      messageList1.value.push({
        userid: 2,
        role: 'reciever',
        constent: message
      });
    }

    /* peerA.onicecandidate = event => {
      if (event.candidate) {
        let candid = event.candidate.toJSON()
        socketA.send(`candid|${usid}|${JSON.stringify(candid)}`)
      }
    } */
  };
  // peerB
  socketB.onmessage = evt => {
    let string = evt.data
    let value = string.split('|')
    if (value[0] == 'offer') {
      transMedia(value)
    }
    if (value[0] == 'answer') {
      let answer = new RTCSessionDescription({
        type: 'answer',
        sdp: value[2]
      })
      peer.setLocalDescription(offer)
      peer.setRemoteDescription(answer)
    }
    if (value[0] == 'message') {
      let message = value[1];
      console.log(message, 'value2');
      messageList2.value.push({
        userid: 1,
        role: 'reciever',
        constent: message
      });
    }
  }
};

const peerInit = async usid => {
  // 1. 创建连接
  peerA = new RTCPeerConnection()
  // 2. 添加视频流轨道
  localStream.getTracks().forEach(track => {
    peerA.addTrack(track, localStream)
  })
  // 3. 创建 SDP
  offer = await peerA.createOffer()
  // 4. 发送 SDP
  socketA.send(`offer|${usid}|${offer.sdp}`)
};

const transMedia = async arr => {
  let [_, roomid, sdp] = arr
  let offer = new RTCSessionDescription({ type: 'offer', sdp })
  peerB = new RTCPeerConnection()
  await peerB.setRemoteDescription(offer)
  let answer = await peerB.createAnswer()
  await peerB.setLocalDescription(answer)
  socketB.send(`answer|${roomid}|${answer.sdp}`)
};

const onMessageSend1 = () => {
  messageList1.value.push({
    userid: 1,
    role: 'sender',
    constent: value1.value
  });
  socketA.send(`message|2|${value1.value}`); // 发送信息
  value1.value = ''; // 发送后清空输入框
}

const onMessageSend2 = () => {
  messageList2.value.push({
    userid: 2,
    role: 'sender',
    constent: value2.value
  });
  socketB.send(`message|1|${value2.value}`); // 发送信息
  value2.value = ''; // 发送后清空输入框
}

</script>

<style lang="less" scoped>
.message-content {
  display: flex;
  flex-direction: column;
  .sender1, .sender2 {
    flex: 1;
    .message-list {
      height: 230px;
      width: 100%;
      overflow: auto;
      background: #cccccc70;
      border: 1px solid #ccc
    }
    .message-input {
      width: calc(100% - 80px);
      height: 40px;
    }
    .send-btn {
      width: 80px;
      height: 40px;
      vertical-align: top;
    }
  }
  .sender2 {
    margin-top: 20px;
  }
}
</style>
