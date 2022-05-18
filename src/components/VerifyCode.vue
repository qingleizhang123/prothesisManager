<template>
  <span class="canvas-container" @click="changeCode">
    <canvas id="code-canvas" :width="props.contentWidth" :height="props.contentHeight"></canvas>
  </span>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, computed, onMounted, defineExpose } from 'vue';
interface Props {
  identifyCodes: string,
  fontSizeMin: number,
  fontSizeMax: number,
  backgroundColorMin: number,
  backgroundColorMax: number,
  dotColorMin: number,
  dotColorMax: number,
  contentWidth: number,
  contentHeight: number
}
const props = withDefaults(defineProps<Props>(), {
  identifyCodes: '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  fontSizeMin: 25,
  fontSizeMax: 35,
  backgroundColorMin: 200,
  backgroundColorMax: 220,
  dotColorMin: 60,
  dotColorMax: 120,
  contentWidth: 100,
  contentHeight: 44
});

const emits = defineEmits<{
  (e: 'update:changeCode', value: string): void
}>();

let identifyCode = ref('');

watch(identifyCode, (newVal) => {
  drawPic();
})

onMounted(() => {
  makeCode(props.identifyCodes, 4);
  drawPic();
});

// 生成一个随机数
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

// 生成一个随机的颜色
const randomColor = (min, max) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

const drawPic = () => {
  let canvas = document.getElementById("code-canvas");
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = "bottom";
  // 绘制背景
  ctx.fillStyle = randomColor(
    props.backgroundColorMin,
    props.backgroundColorMax
  );
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);
  // 绘制文字
  for (let i = 0; i < identifyCode.value.length; i++) {
    drawText(ctx, identifyCode.value[i], i);
  }
  drawLine(ctx);
  drawPot(ctx);
}

const drawText = (ctx, txt, i) => {
  ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
  ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei"; //随机生成字体大小
  let x = (i + 1) * (props.contentWidth / (identifyCode.value.length + 1));
  let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
  var deg = randomNum(-30, 30);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
}

const drawLine = (ctx) => {
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight)
    );
    ctx.lineTo(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight)
    );
    ctx.stroke();
  }
}

const drawPot = (ctx) => {
  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight),
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

const changeCode = () => {
  identifyCode.value = '';
  makeCode(props.identifyCodes, 4);
}

const makeCode = (e, n) => {
  for (let i = 0; i < n; i++) {
    identifyCode.value += e[randomNum(0, e.length)];
  }
  emits("update:changeCode", identifyCode.value);
}

defineExpose({
  changeCode
});

</script>

<style lang="less" scoped>
.canvas-container {
  vertical-align: top;
  #code-canvas {
    vertical-align: top;
  }
}
</style>