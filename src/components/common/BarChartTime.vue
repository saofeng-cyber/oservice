<template>
  <div class="industry">
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
    <div style="width:100%;height: calc(100% - 40px)">
      <div
        id="Chart"
        ref="barChart0"
        style="width: 33%; height:100%;float:left;"
      ></div>
      <div
        id="Chart"
        ref="barChart1"
        style="width: 33%; height:100%;float:left;"
      ></div>
      <div
        id="Chart"
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
    let series0 = []
    let xAxis0 = []
    let yAxis0 = []
    let series1 = []
    let xAxis1 = []
    let yAxis1 = []
    let series2 = []
    let xAxis2 = []
    let yAxis2 = []
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
        data: ['开通工单数', '及时处理率'],
        itemGap: 5,
        left: "center",
        top: '5%',
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: xAxis0,
      yAxis: yAxis0,
      series: series0,
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
        data: ['投诉工单数', '及时处理率'],
        itemGap: 5,
        left: "center",
        top: '5%',
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: xAxis1,
      yAxis: yAxis1,
      series: series1,
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
        data: ['故障工单数', '及时处理率'],
        itemGap: 5,
        left: "center",
        top: '5%',
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: xAxis2,
      yAxis: yAxis2,
      series: series2,
    };

    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      myChart = $echarts.init(document.getElementById('BarChart'));
      // 绘制图表
      myChart.setOption(option);
    }

    // 设置数值
    const setTitle = (val) => {
      title.value = val
    }
    // 设置数值
    const setValue = val => {
      data.value = val
      yAxis0.push({
        type: 'value',
        name: val[0].yname,
        axisLabel: {
          show: false,//不显示坐标轴上的文字
        },
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: "black",
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
        name: '开通工单数',
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
      },
        {
          name: '及时处理率',
          data: val[0].ynumber,
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(103, 203, 231, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(103, 203, 231, 1)'
            }
          ]),
          areaStyle: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(46, 196, 120, 0.24)'
              },
              {
                offset: 1,
                color: 'rgba(46, 196, 120, 0.08)'
              },
            ])
          },
        }
      )
      myChart0 = $echarts.init(barChart0.value);
      myChart0.setOption(option0)
      yAxis1.push({
        type: 'value',
        name: val[1].yname,
        axisLabel: {
          show: false,//不显示坐标轴上的文字
        },
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: "black",
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
        name: '投诉工单数',
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
      },
        {
          name: '及时处理率',
          data: val[0].ynumber,
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(237, 249, 252, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(137, 215, 237, 1)'
            }
          ]),
          areaStyle: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(46, 196, 120, 0.24)'
              },
              {
                offset: 1,
                color: 'rgba(46, 196, 120, 0.08)'
              },
            ])
          },
        }
      )
      myChart1 = $echarts.init(barChart1.value);
      myChart1.setOption(option1)
      yAxis2.push({
        type: 'value',
        name: val[2].yname,
        axisLabel: {
          show: false,//不显示坐标轴上的文字
        },
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: "black",
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
        name: '故障工单数',
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
      },
        {
          name: '及时处理率',
          data: val[0].ynumber,
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(237, 249, 252, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(137, 215, 237, 1)'
            }
          ]),
          areaStyle: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(46, 196, 120, 0.24)'
              },
              {
                offset: 1,
                color: 'rgba(46, 196, 120, 0.08)'
              },
            ])
          },
        }
      )
      myChart2 = $echarts.init(barChart2.value);
      myChart2.setOption(option2)
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
  height: 100%;
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
  height: 39px;
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