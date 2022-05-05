<template>
  <div class="user-content">
    <img />
    <span>您好！</span>
    <a href="#">退出</a>
  </div>
  <ul>
    <li>假体列表</li>
    <li>器械列表</li>
    <li>模型商城</li>
    <li>器械分布</li>
    <li>假体管理</li>
    <li>器械管理</li>
    <li>用户管理</li>
    <li>角色管理</li>
    <li>权限管理</li>
  </ul>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.user-content {
  height: 100px;
  text-align: center;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: inline-block;
  }
  span {
    display: block;
  }
}
ul {
    list-style: none;
    height: 100%;
    width: 100%;
    text-align: center;
  li {
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  li:hover {
    background: #04856f;
  }
}
</style>