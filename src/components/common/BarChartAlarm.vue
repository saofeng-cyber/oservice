<template>
  <div style="height:100%;height:100%;">
    <div class="top-title">
      <div
        class="float-title"
        v-if="title"
      >
        <span class="i"></span>
        {{title}}
      </div>
      <div
        class="float-title-right"
        @click="selfRefresh"
      >
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div class="industry">
      <div
        id="Chart0"
        ref="barChart0"
        style="width: 33%; height:100%;float:left;"
      ></div>
      <div
        id="Chart1"
        ref="barChart1"
        style="width: 33%; height:100%;float:left;"
      ></div>
      <div
        id="Chart2"
        ref="barChart2"
        style="width: 33%; height:100%;float:left;"
      ></div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, inject, onUnmounted } from '@vue/runtime-core'


export default {
  name: 'BarChart',
  setup () {
    let $echarts = inject("$echarts");
    let barChart0 = ref(null)
    let myChart0 = null;
    let barChart1 = ref(null)
    let myChart1 = null;
    let barChart2 = ref(null)
    let myChart2 = null;
    let type = ref(false);
    let title = ref('请设置标题')
    let data = ref([
      { yname: '拨测告警', xname: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'], ynum: [30, 40, 50, 60, 40, 40] },
      { yname: '业务告警', xname: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'], ynum: [30, 40, 50, 60, 40, 40] }

    ])


    let option0 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['告警数'],
        itemGap: 5,
        left: "80%",
        top: "15%"
      },
      grid: {
        top: '35%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {},
      yAxis: {},
      series: {},
    };
    let option1 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['告警数'],
        itemGap: 5,
        left: "80%",
        top: "15%"
      },
      grid: {
        top: '35%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {},
      yAxis: {},
      series: {},
    };
    let option2 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['告警数'],
        itemGap: 5,
        left: "80%",
        top: "15%"
      },
      grid: {
        top: '35%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {},
      yAxis: {},
      series: {},
    };

    // 设置数值
    const setTitle = (val) => {
      title.value = val
    }
    // 设置数值
    const setValue = val => {
      data.value = val
      let series0 = []
      let xAxis0 = []
      let yAxis0 = []
      let series1 = []
      let xAxis1 = []
      let yAxis1 = []
      let series2 = []
      let xAxis2 = []
      let yAxis2 = []

      yAxis0.push({
        type: 'value',
        name: val[0].yname,
        nameGap: 35,
        offset: -26.5,
        axisLabel: {
          show: false,//不显示坐标轴上的文字
        },
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: "black",
          fontSize: 16,
        }
      })

      xAxis0.push({
        type: 'category',
        data: val[0].xname,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            lineStyle: {
              color: "rgba(95, 119, 146, 1)",
              width: 2.5
            }
          }
        }
      })
      series0.push({
        name: '告警数',
        type: 'bar',
        data: val[0].ynum,
        barWidth: '15%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: val[0].colorb // 0% 处的颜色
            }, {
              offset: 1, color: val[0].colort // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      })
      option0.xAxis = xAxis0;
      option0.yAxis = yAxis0;
      option0.series = series0;
      myChart0 = $echarts.init(barChart0.value);
      myChart0.clear();
      console.log('option0', JSON.stringify(option0))
      myChart0.setOption(option0, true)
      yAxis1.push({
        type: 'value',
        name: val[1].yname,
        nameGap: 35,
        offset: -32.5,
        axisLabel: {
          show: false,//不显示坐标轴上的文字
        },
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: "black",
          fontSize: 16,
        }
      })
      xAxis1.push({
        type: 'category',
        data: val[1].xname,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            lineStyle: {
              color: "rgba(95, 119, 146, 1)",
              width: 2.5
            }
          }
        }
      })
      series1.push({
        name: '告警数',
        type: 'bar',
        data: val[1].ynum,
        barWidth: '15%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: val[1].colorb // 0% 处的颜色
            }, {
              offset: 1, color: val[1].colort // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      })
      option1.xAxis = xAxis1;
      option1.yAxis = yAxis1;
      option1.series = series1;
      myChart1 = $echarts.init(barChart1.value);
      myChart1.clear();
      myChart1.setOption(option1, true)
      yAxis2.push({
        type: 'value',
        name: val[2].yname,
        nameGap: 35,
        offset: -22.5,
        axisLabel: {
          show: false,//不显示坐标轴上的文字
        },
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: "black",
          fontSize: 16,
        }
      })
      xAxis2.push({
        type: 'category',
        data: val[2].xname,
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            lineStyle: {
              color: "rgba(95, 119, 146, 1)",
              width: 2.5
            }
          }
        }
      })
      series2.push({
        name: '告警数',
        type: 'bar',
        data: val[0].ynum,
        barWidth: '15%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: val[2].colorb // 0% 处的颜色
            }, {
              offset: 1, color: val[2].colort // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      })
      option2.xAxis = xAxis2;
      option2.yAxis = yAxis2;
      option2.series = series2;
      myChart2 = $echarts.init(barChart2.value);
      myChart2.clear();
      myChart2.setOption(option2, true)
    }
    onMounted(() => {
      //initCharts()
    })

    return {
      setValue, title, setTitle, barChart0, barChart1, barChart2, data
    }
  }
}
</script>

<style scoped>
.industry {
  width: 100%;
  height: calc(100% - 41px);
  margin: 0 auto;
  position: relative;
}
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border-bottom: 1px solid #eee;
}
.float-title {
  font-weight: 500;
  line-height: 24px;
}
.float-title-right {
  width: 16px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50%;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
  cursor: pointer;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
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
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
  z-index: 1;
}
</style>