<template>
  <div class="user-content">
    <img src="assets/images/avatar.jpg"/>
    <div class="user">
      <span class="userName">{{ userName }}</span>
      <span style="margin-left: 5px">您好！</span>
    </div>
    <a href="#">退出</a>
  </div>
  <ul>
    <li v-for="item of navList" :key="item" :class="{'select': currentTab === item.tab}" @click="onChangeTab(item.tab, item.label)">{{ item.label }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { EnumListType } from '../utils/const';
import store from '../store/index'
interface listItem {
  type: EnumListType,
  label: string,
  tab: string
}
const currentTab = computed(() => {
  return store.state.currentTab;
})

const userName = ref('');

const navList: listItem[] = [{
  type: EnumListType.ProthesisList,
  label: '假体列表',
  tab: 'prothesis-list'
},{
  type: EnumListType.DeviceList,
  label: '器械列表',
  tab: 'device-list'
},{
  type: EnumListType.ProthesisModel,
  label: '模型商城',
  tab: 'prothesis-store'
},{
  type: EnumListType.DeviceDistribution,
  label: '器械分布',
  tab: 'device-distribute'
},{
  type: EnumListType.ProthesisManager,
  label: '假体管理',
  tab: 'prothesis-manager'
},{
  type: EnumListType.DeviceManage,
  label: '器械管理',
  tab: 'device-manage'
},{
  type: EnumListType.AccountManage,
  label: '账号管理',
  tab: 'account-manage'
},{
  type: EnumListType.RoleManage,
  label: '角色管理',
  tab: 'role-manage'
},{
  type: EnumListType.AuthorityManage,
  label: '权限管理',
  tab: 'permission-manage'
}];

onMounted(() => {
  userName.value = localStorage.getItem('userName');
});

const onChangeTab = (tab: string, label: string) => {
  store.commit('updateCurrentPage', tab);
  store.commit('updateCurrentNavLabel', label);
}

</script>

<style lang="less" scoped>
.user-content {
  height: 120px;
  text-align: center;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
  }
  .user {
    height: 20px;
    line-height: 20px;
    .userName {
      color: #04856f;
    }
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
    background: #e18a4b;
  }
}
.select {
  background: #e18a4b;
}
</style>
