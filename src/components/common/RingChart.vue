<template>
  <div class="ring-chart">
    <div id="chart" ref="refChart" style="width: 100%; height:100%;"></div>
  </div>
</template>
<script>
import { ref, onMounted, inject, onUnmounted } from '@vue/runtime-core'
export default {
  name: 'RingChart',
  setup () {
    let $echarts = inject('$echarts')
    let chart = null
    const refChart = ref(null)
    let legendData = []
    let timer = null
    const option = {
        tooltip: {
          show: false,
          trigger: 'item'
        },
        legend: {
          show: false,
          top: '5%',
          left: 'center'
        },
        color: [],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['75%', '80%'],
            center: ['50%', '50%'],
            silent: true,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
                formatter: params => {
                  return `{title|${params.seriesName}}\n{name|${params.name}}\n{percent|${params.percent}%}`
                },
                rich: {
                  title: {
                    fontSize: 14,
                    color: '#fff',
                    lineHeight: 24
                  },
                  name: {
                    fontSize: 12,
                    color: '#B1D8FF',
                    lineHeight: 24
                  },
                  percent: {
                    fontSize: 14,
                    lineHeight: 24,
                    color: 'inherit'
                  }
                }
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
    }
    const initCharts = function () {
      chart = $echarts.init(refChart.value)
      chart.setOption(option, true)
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      startSelectAnimate(chart, legendData[0], legendData)
      function startSelectAnimate (myChart, firstSelectName, names) {
        myChart.dispatchAction({
          type: 'highlight',
          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
          name: firstSelectName
        })
        let selectIndex = 0
        timer = setInterval(() => {
          myChart.dispatchAction({
            type: 'downplay',
            name: names[selectIndex]
          })
          myChart.dispatchAction({
            type: 'highlight',
            // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
            name: names[(selectIndex + 1) % names.length]
          })
          selectIndex++
          if (selectIndex >= names.length) {
            selectIndex = 0
          }
        }, 2000)
      }
    }
    const setValues = data => {
      // const data = {
      //   title: '客户服务模式',
      //   info: [
      //     { value: 1048, name: '搜索引擎', color: '#0066FF' },
      //     { value: 735, name: '直接访问', color: '#FFA800' },
      //     { value: 580, name: '邮件营销', color: '#2EC478' },
      //   ]
      // }
      option.color = data.info.map(item => item.color)
      option.series[0].name = data.title
      option.series[0].data = data.info
      legendData = data.info.map(item => item.name)
      initCharts()
    }
    onMounted (() => {
      // initCharts()
    })
    onUnmounted (() => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    })
    return {
      refChart, setValues
    }
  }
}
</script>
<style scoped>
.ring-chart {
  height: 100%;
}
</style>