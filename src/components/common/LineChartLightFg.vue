<template>
  <div
    class="container"
    style="width: 100%; height:100%;position:relative;"
  >
    <div
      class="float-title"
      style="width: 80%"
    >
      <span style="width: 40%;display: inline-block"></span>
      {{chartsData.title}}
    </div>
    <div
      class="float-title-right"
      @click="$emit('lineChartRefresh')"
    >
      <!--<i class="el-icon-refresh"></i>-->
    </div>
    <div
      ref="lineChart"
      style="width: 100%; height:100%;"
    ></div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'

export default {
  name: 'lineChartFg',
  props: {
    chartsData: {
      title: '',
      title2: '',
      title3: '',
      tag: {
        name1: '寻呼成功率',
      },
      xAxisData: [],
      yAxisData1: [],
      yAxisData2: [],
      yAxisData3: [],
    }
  },
  setup (props) {
    let $echarts = inject("$echarts");
    let myChart = null;
    let lineChart = ref(null);
    let options = ref([{
      value: '选项1',
      label: '趋势图'
    }, {
      value: '选项2',
      label: '柱状图'
    }])
    let value = ref('')

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
      toolbox: {
        show: true,
        feature: {
          // dataView: {
          //     readOnly: false
          // }, //数据视图
          magicType: {
            type: ['line', 'bar']
          },  //切换为折线图，切换为柱状图
          restore: {},  //还原
          // saveAsImage: {}   //保存为图片
        }
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
        top: '30%',
        bottom: '11%',
        left: '5%',
        right: '5%',
        show: true,
        borderColor: 'rgba(177, 216, 255, 0.08)',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.chartsData.xAxisData,
        axisLabel: {
          textStyle: {
            color: '#000000',
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(234, 149, 149, 1)"
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
          name: props.chartsData.title,
          data: props.chartsData.yAxisData1,
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(46, 196, 120, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(46, 196, 120, 1)'
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
        },
        {
          name: props.chartsData.title2,
          data: props.chartsData.yAxisData2,
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(254, 194, 65, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(254, 194, 65, 1)'
            }
          ]),
          areaStyle: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(254, 194, 65, 0.24)'
              },
              {
                offset: 1,
                color: 'rgba(254, 194, 65, 0.08)'
              },
            ])
          },
        },
        {
          name: props.chartsData.title3,
          data: props.chartsData.yAxisData3,
          type: 'line',
          symbol: 'none',
          smooth: '0.35',
          color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(128, 179, 255, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(128, 179, 255, 1)'
            }
          ]),
          areaStyle: {
            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(128, 179, 255, 0.24)'
              },
              {
                offset: 1,
                color: 'rgba(128, 179, 255, 0.08)'
              },
            ])
          },
        }
      ]
    }

    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      myChart = $echarts.init(lineChart.value);
      // 绘制图表
      myChart.resize();
      myChart.setOption(baseOption);
    }

    // 设置数值
    const setValues = (values) => {
      // eslint-disable-next-line vue/no-mutating-props
      props.chartsData.title = values.title;
      baseOption.xAxis.data = values.xAxisData;
      baseOption.series[0].name = values.title;
      baseOption.series[0].data = values.yAxisData1;
      myChart.resize();
      myChart.setOption(baseOption);
    }

    onMounted(() => {
      initCharts()
    })

    return {
      setValues, lineChart,
      options,
      value,
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