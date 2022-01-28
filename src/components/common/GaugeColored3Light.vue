<template>
  <div style="width: 100%; height:100%;position:relative;">
    <div
      id="SupportSatisCharts"
      style="width: 100%; height:100%;"
    ></div>
    <div
      class="float-title"
      v-if="title"
    >
      <span class="i"></span>
      {{title}}
    </div>
    <div
      class="float-title-right"
      @click="$emit('selfRefresh')"
    >
      <i class="el-icon-refresh"></i>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'
export default {
  name: "GaugeColored3",
  setup () {
    let $echarts = inject("$echarts");
    let myChart = null;
    let title = ref("")
    let baseOption = {
      series: [{
        // 优享 - 表盘
        center: ['20%', '60%'],
        type: 'gauge',
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 5,
            color: [
              [0.25, '#2EC478'],
              [0.5, '#40E792'],
              [0.75, '#F4A89A'],
              [1, '#F29DAD']
            ]
          }
        },
        pointer: {
          icon: 'roundRect',
          itemStyle: {
            color: '#52586D'
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 15,
          itemStyle: {
            borderColor: '#52586D',
            borderWidth: 5
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          distance: -6,
          length: 7,
          lineStyle: {
            color: '#121A2A',
            width: 1,
          }
        },
        axisLabel: {
          color: '#000000',
          fontSize: 10
        },
        title: {
          show: true,
          fontSize: 12,
          offsetCenter: [0, '90%'],
          color: '#000000',
        },
        detail: {
          offsetCenter: [0, '65%'],
          valueAnimation: true,
          formatter: '{value}',
          color: '#2EC478',
          fontSize: 20,
          fontWeight: 500,
        },
        data: [{
          value: 100,
          name: ''
        }]
      }, {
        // 优享 - 表盘阴影
        center: ['20%', '60%'],
        type: 'gauge',
        radius: '63%',
        axisLine: {
          lineStyle: {
            width: 5,
            color: [
              [0.25, '#2EC478'],
              [0.5, '#40E792'],
              [0.75, '#F4A89A'],
              [1, '#F29DAD']
            ],
            opacity: 0.3
          }
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: {
          distance: -6,
          length: 7,
          lineStyle: {
            color: '#121A2A',
            width: 1,
          }
        },
        axisLabel: { show: false },
        detail: { show: false },
        data: [{
          value: 100,
        }]
      }, {
        // 专享 - 表盘
        center: ['50%', '60%'],
        type: 'gauge',
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 5,
            color: [
              [0.25, '#2EC478'],
              [0.5, '#40E792'],
              [0.75, '#F4A89A'],
              [1, '#F29DAD']
            ]
          }
        },
        pointer: {
          icon: 'roundRect',
          itemStyle: {
            color: '#52586D'
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 15,
          itemStyle: {
            borderColor: '#52586D',
            borderWidth: 5
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          distance: -6,
          length: 7,
          lineStyle: {
            color: '#121A2A',
            width: 1,
          }
        },
        axisLabel: {
          color: '#000000',
          fontSize: 10
        },
        title: {
          show: true,
          fontSize: 12,
          offsetCenter: [0, '90%'],
          color: '#000000',
        },
        detail: {
          offsetCenter: [0, '65%'],
          valueAnimation: true,
          formatter: '{value}',
          color: '#2EC478',
          fontSize: 20,
          fontWeight: 500,
        },
        data: [{
          value: 100,
          name: ''
        }]
      }, {
        // 专享 - 阴影
        center: ['50%', '60%'],
        type: 'gauge',
        radius: '63%',
        axisLine: {
          lineStyle: {
            width: 5,
            color: [
              [0.25, '#2EC478'],
              [0.5, '#40E792'],
              [0.75, '#F4A89A'],
              [1, '#F29DAD']
            ],
            opacity: 0.3
          }
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: {
          distance: -6,
          length: 7,
          lineStyle: {
            color: '#121A2A',
            width: 1,
          }
        },
        axisLabel: { show: false },
        detail: { show: false },
        data: [{
          value: 100,
        }]
      }, {
        // 尊享 - 表盘
        center: ['80%', '60%'],
        type: 'gauge',
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 5,
            color: [
              [0.25, '#2EC478'],
              [0.5, '#40E792'],
              [0.75, '#F4A89A'],
              [1, '#F29DAD']
            ]
          }
        },
        pointer: {
          icon: 'roundRect',
          itemStyle: {
            color: '#52586D'
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 15,
          itemStyle: {
            borderColor: '#52586D',
            borderWidth: 5
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          distance: -6,
          length: 7,
          lineStyle: {
            color: '#121A2A',
            width: 1,
          }
        },
        axisLabel: {
          color: '#000000',
          fontSize: 10
        },
        title: {
          show: true,
          fontSize: 12,
          offsetCenter: [0, '90%'],
          color: '#000000',
        },
        detail: {
          offsetCenter: [0, '65%'],
          valueAnimation: true,
          formatter: '{value}',
          color: '#2EC478',
          fontSize: 20,
          fontWeight: 500,
        },
        data: [{
          value: 100,
          name: ''
        }]
      }, {
        // 尊享 - 阴影
        center: ['80%', '60%'],
        type: 'gauge',
        radius: '63%',
        axisLine: {
          lineStyle: {
            width: 1,
            color: [
              [0.25, '#2EC478'],
              [0.5, '#40E792'],
              [0.75, '#F4A89A'],
              [1, '#F29DAD']
            ],
            opacity: 0.3
          }
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: {
          distance: -6,
          length: 7,
          lineStyle: {
            color: '#121A2A',
            width: 1,
          }
        },
        axisLabel: { show: false },
        detail: { show: false },
        data: [{
          value: 100,
        }]
      }]
    };

    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      if (!myChart) {
        myChart = $echarts.init(document.getElementById('SupportSatisCharts'));
      }
      // 绘制图表
      myChart.setOption(baseOption);
    }

    // 设置标题
    const setTitle = (val) => {
      title.value = val;
    }

    // 设置数值
    const setValues = (values) => {
      myChart.resize();
      let key1 = 0, key2 = 1;
      values.some(({ name, value }) => {
        if (baseOption.series.length > key2) {
          baseOption.series[key1].data[0].value = value;
          baseOption.series[key1].data[0].name = name;
          baseOption.series[key2].data[0].value = value;
          key1 += 2;
          key2 += 2;
        }
      })
      myChart.setOption(baseOption);
    }

    onMounted(() => {
      initCharts()
    })

    return {
      setValues, title, setTitle
    }
  }
}
</script>

<style scoped>
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}
.float-title {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
.float-title-right {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
}
</style>