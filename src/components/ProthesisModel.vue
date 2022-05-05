<template>
  <div class="main" id="container"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { defineComponent, onMounted, ref, reactive, toRefs, unref } from 'vue';

// 声明场景
let scene: any
// 声明相机
let camera: any
let mesh: any
let controls: any
// 声明渲染器
let renderer: any

onMounted(() => {
  init()
})

// 初始化
const init = () => {
  createScene() // 创建场景
  loadSTL() // 加载STL模型
  createLight() // 创建光源
  createCamera() // 创建相机
  createRender() // 创建渲染器
  createControls() // 创建控件对象
  render() // 渲染
}

// 创建场景
const createScene = () => {
  scene = new THREE.Scene()
}

// 加载STL模型
const loadSTL = () => {
  const loader = new STLLoader()
  loader.load(`./demo.stl`, (geometry) => {
    // 创建材质
    const material = new THREE.MeshLambertMaterial({ color: 0x7777ff })
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -0.5 * Math.PI
    geometry.center()
    mesh.scale.set(1.5, 1.5, 1.5)
    scene.add(mesh)
  })
}

// 创建光源
const createLight = () => {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1) // 创建环境光
  scene.add(ambientLight) // 将环境光添加到场景

  const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
  spotLight.position.set(150, 150, 150)
  spotLight.castShadow = true
  scene.add(spotLight)
}

// 创建相机
const createCamera = () => {
  const element = document.getElementById('container') as Element
  const width = element.clientWidth // 窗口宽度
  const height = element.clientHeight // 窗口高度
  const k = width / height // 窗口宽高比
  // PerspectiveCamera( fov, aspect, near, far )
  camera = new THREE.PerspectiveCamera(35, k, 0.1, 1000)
  camera.position.set(250, 250, 150) // 设置相机位置

  camera.lookAt(new THREE.Vector3(10, 40, 0)) // 设置相机方向
  scene.add(camera)
}

// 创建渲染器
const createRender = () => {
  const element = document.getElementById('container') as Element
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
  renderer.shadowMap.enabled = true // 显示阴影
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0x3f3f3f, 1) // 设置背景颜色
  element.appendChild(renderer.domElement)
}

const render = () => {
  if (mesh) {
    // mesh.rotation.z += 0.006
  }
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

// 创建控件对象
const createControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>