<template>
  <div
    class="container"
    style="width: 100%; height:100%;position:relative;"
  >
    <div class="float-title">
      <span class="i"></span>
      {{title}}
    </div>
    <div class="float-title-right">
      <i class="el-icon-refresh"></i>
    </div>
    <div
      id="ContrastChart"
      ref="ContrastChart"
      style="width: 100%; height:100%;"
    ></div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'
export default {
  name: 'ContrastChart',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    let $echarts = inject("$echarts");
    let myChart = null;
    let ContrastChart = ref(null);
    let sery = {
      name: '2021一期',
      data: [17, 62, 22, 92, 55, 95, 72],
      type: 'line',
      symbol: 'none',
      smooth: '0.35',
      color: 'rgba(190, 140, 0, 1)'

    };
    const colorArray = ['rgba(190, 140, 0, 1)', 'rgba(0, 140, 180, 1)', 'rgba(30, 160, 100, 1)', 'rgb(35, 149, 227)']
    let baseOption = {
      legend: {
        show: true,
        icon: 'rectangle',
        top: '15%',
        right: '4%',
        textStyle: {
          fontSize: 12,
          color: '#000000',
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#2D303B',
        borderColor: '',
        borderWidth: 0,
        textStyle: {
          color: '#fff',
          fontWeight: 500,
          fontSize: 12,
        },
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#2D303B'
          }
        }
      },
      grid: { // 网格线
        top: '40%',
        bottom: '15%',
        left: '5%',
        right: '5%',
        show: true,
        borderColor: 'rgba(177, 216, 255, 0.08)',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['北京', '上海', '济南', '江苏', '河北', '河南', '台湾'],
        axisLabel: {
          textStyle: {
            color: '#000000',
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1890ff"
              }
            }
          },
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(177, 216, 255, 0.08)"
          }
        }
      },
      yAxis: {
        name: '单位: %',
        type: 'value',
        max: '100',
        nameTextStyle: {
          fontSize: 12,
          color: '#000000',
        },

        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            // 使用深浅的间隔色
            color: ['#B1D8FF']
          }
        },
      },
      series: [
        {
          name: '2021一期',
          data: [17, 62, 22, 92, 55, 95, 72],
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(190, 140, 0, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(190, 140, 0, 1)'
            }
          ]),

        },
        {
          name: '2021二期',
          data: [65, 72, 27, 53, 35, 59, 82],
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 140, 180, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(0, 140, 180, 1)'
            }
          ]),

        },
        {
          name: '2021三期',
          data: [55, 62, 72, 69, 95, 69, 72],
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(30, 160, 100, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(30, 160, 100, 1)'
            }
          ]),

        },
      ]
    }

    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例 123
      myChart = $echarts.init(document.getElementById('ContrastChart'));
      // 绘制图表
      myChart.setOption(baseOption);
    }

    // 设置数值
    const setValues = (val) => {
      myChart.resize()
      baseOption.xAxis.data = val.x_data;
      baseOption.series = [];
      val.data.forEach(function (item, index) {
        const se = JSON.parse(JSON.stringify(sery))
        se.name = item.name;
        se.data = item.data;
        se.color = colorArray[index]
        baseOption.series.push(se);
      })
      myChart.setOption(baseOption);
    }


    onMounted(() => {
      initCharts()
    })

    return {
      setValues,
      ContrastChart
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