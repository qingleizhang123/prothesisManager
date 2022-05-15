<template>
  <div class="main">
    <div class="container">
      <div class="video-box">
        <video id="remote-video" autoplay controls></video>
        <video id="local-video" autoplay controls muted></video>
        <button v-if="startVisible" class="start" @click="start()">
          {{ label }}
        </button>
      </div>
      <div class="logger"></div>
    </div>
    <div class="message">
      <div class="sender">
      <div class="message-list">
        <message-item v-for="message of messageList" :key="message" :userid="message.userid" :role="message.role" :content="message.constent"></message-item>
      </div>
      <a-input class="message-input" v-model:value="value" @keydown.enter="onMessageSend"></a-input>
      <button class="send-btn" @click="onMessageSend">发送</button>
    </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
import MessageItem from '../MessageCenter/MessageItem.vue';
interface MessageItem {
  userid: number,
  role: string,
  constent: string
}
const props = defineProps<{
  userid: 0,
  role: ''
}>();
let value = ref('');
const startVisible = ref(true);
const messageList = ref(new Array<MessageItem>());

const label = props.role === 'sender' ? '打开视频' : '加入视频';

let socket, offer, peer, localStream, answer, el, button, recieveid, localVideo, remoteVideo;

const message =  {
  log (msg) {
    el.innerHTML += `<span>${new Date().toLocaleTimeString()}：${msg}</span><br/>`;
  },
  error (msg) {
    el.innerHTML += `<span class="error">${new Date().toLocaleTimeString()}：${msg}</span><br/>`;
  }
};

const target = props.role;

onMounted(() => {
  localVideo = document.querySelector('#local-video');
  remoteVideo = document.querySelector('#remote-video');
  button = document.querySelector('.start');
  el = document.querySelector('.logger');
  localVideo.onloadeddata = () => {
    message.log('播放本地视频');
    localVideo.play();
  }
  remoteVideo.onloadeddata = () => {
    message.log('播放对方视频');
    startVisible.value = false;
    remoteVideo.play();
  }

  createConnect();
});

const createConnect = () => {
  socket = new WebSocket(`ws://localhost:3000/webrtc/${props.role}/${props.userid}`);

  if (props.role === 'sender') {
    socket.onmessage = evt => {
      let string = evt.data
      let value = string.split('|')
      if (value[0] == 'join') {
        peerInit(value[1]);
        recieveid = value[1];
        message.log(`用户${recieveid}已加入房间！`);
        socket.send(`join|${recieveid}|成功加入视频房间${props.userid}`);
      }
      if (value[0] == 'answer') {
        answer = new RTCSessionDescription({
          type: 'answer',
          sdp: value[2]
        })
        peer.setLocalDescription(offer)
        peer.setRemoteDescription(answer)
      }
      if (value[0] == 'candid') {
        let json = JSON.parse(value[2])
        let candid = new RTCIceCandidate(json)
        peer.addIceCandidate(candid)
      }
      if (value[0] == 'message') {
        let message = value[1];
        console.log(message, 'value1');
        messageList.value.push({
          userid: Number(recieveid),
          role: 'reciever',
          constent: message
        });
      }
    }
  } else {
    socket.onmessage = evt => {
      let string = evt.data
      let value = string.split('|')
      if (value[0] == 'join') {
        recieveid = value[1];
        message.log(`成功加入视频房间${recieveid}!`);
      }
      if (value[0] == 'offer') {
        transMedia(value)
      }
      if (value[0] == 'candid') {
        let json = JSON.parse(value[2])
        let candid = new RTCIceCandidate(json)
        peer.addIceCandidate(candid)
      }
      if (value[0] == 'message') {
        let message = value[1];
        console.log(message, 'value2');
        messageList.value.push({
          userid: Number(recieveid),
          role: 'reciever',
          constent: message
        });
      }
    }
  }
};

const peerInit = async usid => {
  // 1.新建连接
  peer = new RTCPeerConnection();
  // 2. 添加视频流轨道

  message.log(`------ WebRTC ${target === 'sender' ? '发起方' : '接收方'}流程开始 ------`);
  message.log('将媒体轨道添加到轨道集');

  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream)
  })

  peer.ontrack = e => {
    if (e && e.streams) {
      message.log('收到对方音频/视频流数据...');
      remoteVideo.srcObject = e.streams[0];
    }
  };

  peer.onconnectionstatechange = event => {
    if (peer.connectionState === 'connected') {
      message.log('对等连接成功！')
    }
    if (peer.connectionState === 'disconnected') {
      message.log('连接已断开！')
    }
  }

  // 3. 创建 SDP
  offer = await peer.createOffer()
  // 4. 发送 SDP
  socket.send(`offer|${usid}|${offer.sdp}`)

}

const transMedia = async arr => {
  let [_, roomid, sdp] = arr
  offer = new RTCSessionDescription({ type: 'offer', sdp })
  peer = new RTCPeerConnection();

  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream);
  });

  peer.ontrack = e => {
    if (e && e.streams) {
      message.log('收到对方音频/视频流数据...');
      remoteVideo.srcObject = e.streams[0];
    }
  };

  peer.onicecandidate = event => {
    if (event.candidate) {
      let candid = event.candidate.toJSON()
      socket.send(`candid|${recieveid}|${JSON.stringify(candid)}`)
    }
  };

  peer.onconnectionstatechange = event => {
    if (peer.connectionState === 'connected') {
      console.log('对等连接成功！')
    }
    if (peer.connectionState === 'disconnected') {
      console.log('连接已断开！')
    }
  }

  await peer.setRemoteDescription(offer)
  answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  socket.send(`answer|${roomid}|${answer.sdp}`)


}

const start = async () => {
  try {
    message.log('尝试调取本地摄像头/麦克风');
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    message.log('摄像头/麦克风获取成功！');
    localVideo.srcObject = localStream;

  } catch {
    message.error('摄像头/麦克风获取失败！');
  }
  if (props.role == 'reader') {
    message.log('尝试加入视频房间');
    socket.send(`join|1`);
  }
}

const onMessageSend = () => {
  messageList.value.push({
    userid: props.userid,
    role: 'sender',
    constent: value.value
  });
  socket.send(`message|${recieveid}|${value.value}`); // 发送信息
  value.value = ''; // 发送后清空输入框
}

/* message.log('信令通道（WebSocket）创建中......');

socket.onopen = () => {
  message.log('信令通道创建成功！');
  target === 'offer' && (button.style.display = 'block');
}
socket.onerror = () => message.error('信令通道创建失败！');
socket.onmessage = e => {
  const { type, sdp, iceCandidate } = JSON.parse(e.data)
  if (type === 'answer') {
    peer.setRemoteDescription(new RTCSessionDescription({ type, sdp }));
  } else if (type === 'answer_ice') {
    peer.addIceCandidate(iceCandidate);
  } else if (type === 'offer') {
    startLive(new RTCSessionDescription({ type, sdp }));
  } else if (type === 'offer_ice') {
    peer.addIceCandidate(iceCandidate);
  }
};

const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
!PeerConnection && message.error('浏览器不支持WebRTC！');
const peer = new PeerConnection();

peer.ontrack = e => {
  if (e && e.streams) {
    message.log('收到对方音频/视频流数据...');
    remoteVideo.srcObject = e.streams[0];
  }
};

peer.onicecandidate = e => {
  if (e.candidate) {
    message.log('搜集并发送候选人');
    socket.send(JSON.stringify({
      type: `${target}_ice`,
      iceCandidate: e.candidate
    }));
  } else {
    message.log('候选人收集完成！');
  }
};

const startLive = async (offerSdp) => {
  target === 'offer' && (button.style.display = 'none');
  let stream;
  try {
    message.log('尝试调取本地摄像头/麦克风');
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    message.log('摄像头/麦克风获取成功！');
    localVideo.srcObject = stream;
  } catch {
    message.error('摄像头/麦克风获取失败！');
    return;
  }

  message.log(`------ WebRTC ${target === 'offer' ? '发起方' : '接收方'}流程开始 ------`);
  message.log('将媒体轨道添加到轨道集');
  stream.getTracks().forEach(track => {
    peer.addTrack(track, stream);
  });

  if (!offerSdp) {
    message.log('创建本地SDP');
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    message.log(`传输发起方本地SDP`);
    socket.send(JSON.stringify(offer));
  } else {
    message.log('接收到发送方SDP');
    await peer.setRemoteDescription(offerSdp);

    message.log('创建接收方（应答）SDP');
    const answer = await peer.createAnswer();
    message.log(`传输接收方（应答）SDP`);
    socket.send(JSON.stringify(answer));
    await peer.setLocalDescription(answer);
  }
} */

</script>

<style lang="less" scoped>
.main {
  .container {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    padding-top: 20px;
    .video-box {
      position: relative;
      width: 800px;
      height: 400px;
      #remote-video {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        border: 1px solid #eee;
        background-color: #F2F6FC;
      }
      #local-video {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 240px;
        height: 120px;
        object-fit: cover;
        border: 1px solid #eee;
        background-color: #EBEEF5;
      }
      .start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100px;
        line-height: 40px;
        color: #fff;
        background-color: #409eff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transform: translate(-50%, -50%);
      }
    }
    .logger {
      width: 40%;
      padding: 14px;
      line-height: 1.5;
      color: #4fbf40;
      border-radius: 6px;
      background-color: #272727;
    }
    .logger .error {
      color: #DD4A68;
    }
  }
  .message {
    flex: 1;
    margin-top:20px;
    .message-list {
      height: 300px;
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
}

</style>
