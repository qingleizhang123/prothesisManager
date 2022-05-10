<template>
  <div class="device-container" >
    <div class="left-region">
      <a-row :gutter="16">
        <a-col :span="8" v-for="item of arr" :key="item">
          <a-card hoverable>
            <template #cover>
              <div id="echart-main" class="echarts-container" style="height: 200px;width: 100%; padding: 10px">
              </div>
            </template>
            <template #actions>
              <setting-outlined key="setting" />
              <edit-outlined key="edit" />
              <ellipsis-outlined key="ellipsis" />
            </template>
            <a-card-meta :title="item" description="This is the description">
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="right-region">
      <device-statistic></device-statistic>
    </div>
  </div>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import DeviceStatistic from './DeviceStatistics.vue';
import * as echarts from 'echarts';
const arr = ['骨科','神外','脊柱','消化','内科一','内科二','皮肤科'];
const color = ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']

onMounted(() => {
});



</script>

<style lang="less" scoped>
.device-container {
  display: flex;
  background-color: #ececec;
  padding: 20px;
  height: 100%;
  .left-region {
    height: 96%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .right-region {
    height: 96%;
    width: 30%;
    overflow: auto;
  }
}

</style>
