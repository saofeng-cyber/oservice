<template>
  <div
    class="container"
    style="width: 100%; height:100%;position:relative;"
  >
    <div
      ref="lineChart"
      style="width: 100%; height:100%;"
    ></div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'
export default {
  name: 'lineChart',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    let $echarts = inject("$echarts");
    let myChart = null;
    let lineChart = ref(null);

    let baseOption = {
      legend: {
        show: false,
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
      series: [
        {
          name: '客户数',
          center: ['50%', '50%'],
          radius: ['80%', '99%'],
          clockWise: false,
          hoverAnimation: false,
          type: 'pie',
          data: [
            {
              value: 84,
              name: '',
              label: {
                normal: {
                  show: true,
                  formatter: '{r1|{a}}\n{r2|{c}}',
                  rich: {
                    r1: {
                      fontSize: 12,
                      // color: '#2EC478',
                      // verticalAlign: 'bottom',
                      padding: [0, 0, 5, 0],
                      color:'#66e2fb'
                    },
                    r2: {
                      fontSize: 16,
                      color: '#66e2fb',
                      fontWeight: 'bold'
                      // verticalAlign: 'bottom',
                    }
                  },
                  position: 'center'
                }
              },
              labelLine: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#5886f0',
                  borderColor: '#fff',
                  borderWidth: 1
                }
              }
            },
            {
              name: ' ',
              value: 16,
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(0,0,0,0)',
                  borderColor: '#fafbfd',
                  borderWidth: 1
                }
              }
            }
          ]
        }
      ]
    }

    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      if (!myChart) {
        myChart = $echarts.init(lineChart.value);
      }

      // 绘制图表
      myChart.setOption(baseOption);
    }

    const getCount = (count) => {
      let result = 0
      if (count) {
        count = count + ''
        if (count.indexOf('.') > -1) {
          count = count.substring(0, count.indexOf('.'))
        }
        const length = count.length
        let c = '1'
        for (let i = 0; i < length - 1; i++) {
          c += '0'
        }
        if ((parseInt(count) % parseInt(c)) > 0 || (parseInt(count) / parseInt(c)) < 10) {
          c += '0'
          result = parseInt(c) - parseInt(count)
        }
      }
      return result
    }

    // 设置数值
    const setValue = (values) => {
      myChart.resize();
      baseOption.series[0].name = values[0].title;
      baseOption.series[0].data[0].value = values[0].number;
      if (values[0].color) {
        baseOption.series[0].data[0].label.normal.rich.r2.color = values[0].color;
        baseOption.series[0].data[0].itemStyle.normal.color = values[0].color;
      }
      baseOption.series[0].data[1].value = getCount(values[0].number)
      console.log('baseOption', JSON.stringify(baseOption))
      myChart.setOption(baseOption);
    }


    onMounted(() => {
      initCharts()
    })

    return {
      setValue, lineChart
    }
  }
}
</script>

<style scoped>
</style>