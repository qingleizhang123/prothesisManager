<template>
  <div class="main-content" ref="deviceStatisticRef">
    <div class="header">
      <span>{{ time }}</span>
      <a @click="onConnect">更多</a>
    </div>
    <div class="search">
      <a-input-search
      v-model:value="searchValue"
      placeholder="输入搜索的器械"
      style="width: 100%"
      @search="onSearch"
    />
    </div>

    <div class="chart1-container">
      <div class="left">
        <div class="title">今日库存</div>
        <div id="chart1"></div>
      </div>
      <div class="right">
        <div class="title">当前使用</div>
        <div id="chart2"></div>
      </div>
    </div>

    <div class="chart2-container">
      <div id="chart3"></div>
    </div>

    <div class="chart3-container">
      <div id="chart4"></div>
    </div>

    <a-modal :width="800" :height="600" v-model:visible="connectVisible" :footer="null" :get-container="deviceStatisticRef">
      <video-connect :userid="1" :role="'sender'"></video-connect>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { showTime } from '../../utils/showTime';
import VideoConnect from '../MessageCenter/VideoConnect.vue';
const searchValue = ref('');
const time = ref(showTime());
const connectVisible = ref(false);
const deviceStatisticRef = ref(null);

const onConnect = () => {
  connectVisible.value = true;
}

setInterval(() => {
  const now = showTime();
  time.value = now;
},1000)

onMounted(() => {
  const myChart1 = echarts.init(document.getElementById('chart1'));
  const myChart2 = echarts.init(document.getElementById('chart2'));
  const myChart3 = echarts.init(document.getElementById('chart3'));
  const myChart4 = echarts.init(document.getElementById('chart4'));
  const color= ['#b679fe', '#6271fd','#94d96c', '#0fbdd9','#f0f0f0'];

  const dataStyle = {
    normal: {
      label: {
          show: false
      },
      labelLine: {
          show: false
      },
      shadowBlur: 40,
      borderWidth: 10,
      shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
    }
  };

  // 第一个饼状图
  const optionCircle1 = {
    backgroundColor: '#fff',
    title: {
      text: '21345',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 14,
        color: "#b679fe",
      }
    },
    series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: [37, 45],
        center:['50%','50%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        label:{
          borderRadius:'10',
        },
        data: [{
          value: 54.6,
          name: '外',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color:color[0]
              }, {
                offset: 1,
                color: color[1]
              }])
            }
          }
        },
        {
          value: 0,
          name: '',
          tooltip: {
              show: false
          },
        },
        ]
      },
      {
        name: 'Line 2',
        type: 'pie',
        clockWise: false,
        radius: [30, 32],
        center:['50%','50%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        data: [{
          value: 56.7,
          name: '内',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[4]
              }, {
                offset: 1,
                color: color[4]
              }])
            }
          }
        },
          {
            value: 0,
            name: '',
            tooltip: {
                show: false
            },
          },
        ]
      },
    ]
  };

  //第二个饼状图
  const optionCircle2 = {
    backgroundColor: '#fff',
    title: {
      text: '16862',
      x: 'center',
      y: 'center',
      textStyle: {
          fontWeight: 'normal',
          fontSize: 14,
          color: "#94d96c",
      }
    },
    series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: [37, 45],
        center:['50%','50%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        label:{
          borderRadius:'10',
        },
        data: [{
          value: 54.6,
          name: '外',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color:color[2]
              }, {
                offset: 1,
                color: color[3]
              }])
            }
          }
        },
        {
          value: 0,
          name: '',
          tooltip: {
              show: false
          },
        },
        ]
      },
      {
        name: 'Line 2',
        type: 'pie',
        clockWise: false,
        radius: [30, 32],
        center:['50%','50%'],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        data: [{
          value: 56.7,
          name: '内',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[4]
              }, {
                offset: 1,
                color: color[4]
              }])
            }
          }
        },
        {
          value: 0,
          name: '',
          tooltip: {
              show: false
          },
        },
        ]
      },
    ]
  };

  //第三个图
  const option3 = {
    title: {
      show: true,
      text: '一周使用情况',
      x: 'center',
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: false,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.69)',
          fontSize: 14
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      axisLabel: {
        textStyle: {
          color: 'rgba(0, 0, 0, 0.69)',
          fontSize: 14
        }
      },
      name: '使用次数',
      type: 'value',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.69)',
        fontSize: 14
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: 20
      }
    ]
  }

  //第四个图
  const option4 = {
    title: {
      show: true,
      text: '科室分布',
      x: 'center',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: false
    },
    toolbox: {
      show: true
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      containLabel: true
    },
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
    calculable: true,
    xAxis: [{
      name: '器械类型',
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.69)'
      },
      axisLabel: {
        interval: false,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.69)',
          fontSize: 14
        }
      },
      data: ['骨科', '神外', '脊柱', '内科一', '内科二', '消化']
    }],
    yAxis: [{
      axisLine: {
        show: false
      },
      nameLocation: 'end',
      nameGap: 20,
      nameRotate: 0,
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: ['rgba(0, 0, 0, 0.2)']
        }
      },
      axisLabel: {
        textStyle: {
          color: 'rgba(0, 0, 0, 0.69)',
          fontSize: 14
        }
      },
      name: '数量',
      type: 'value',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.69)',
        fontSize: 14
      }
    }],
    series: [{
      name: '骨钉',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230]
    }, {
      name: '假体',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330]
    }, {
      name: '手术钳',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330]
    }, {
      name: '耗材',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330]
    }, {
      name: '支架',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330]
    }]
  }

  myChart1.setOption(optionCircle1);
  myChart2.setOption(optionCircle2);
  myChart3.setOption(option3);
  myChart4.setOption(option4);
});

const onSearch = () => {

};

</script>

<style lang="less" scoped>
.main-content {
  height: 100%;
  width: 100%;
  padding: 10px;
  .header {
    a {
      float: right;
    }
  }
  .search {
    padding-top: 10px;
  }
  .chart1-container {
    height: 200px;
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    background: #fff;
    .left, .right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
        margin-top: 20px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }
    }
    .left {
      border-radius: 10px 0 0 10px;
    }
    .right {
      border-radius: 0px 10px 10px 0;
    }
    #chart1,#chart2 {
      width: 100%;
      flex: 1;
      margin-bottom: 10px;
    }
  }

  .chart2-container {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    background: #fff;
    #chart3 {
      width: 100%;
      height: 100%;
    }
  }

  .chart3-container {
    width: 100%;
    height: 300px;
    margin-top: 10px;
    padding: 0 10px;
    border-radius: 10px;
    display: flex;
    background: #fff;
    #chart4 {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
