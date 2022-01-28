<template>
  <!-- 雷达图 -->
  <div style="width: 100%;height: 100%">
    <div
      id="myChart"
      ref="refmyChart"
      style="width: 100%;height: 100%"
    ></div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "@vue/runtime-core"
// import {getCurrentInstance} from "vue"
export default {
  name: "WorkOrder",
  setup () {
    // const {proxy} = getCurrentInstance();
    let $echarts = inject("$echarts")
    let myChart = null
    const refmyChart = ref(null)
    // let  legendData = []
    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: "-20px",
      },
      radar: [{
        indicator: [
          { text: '制造业', max: 100 },
          { text: '其他', max: 100 },
          { text: '邮政', max: 100 },
          { text: '农业', max: 100 },
          { text: '交通', max: 100 },
          { text: '电力', max: 100 },
          { text: '化工', max: 100 }
        ],
        radius: 90,
        center: ['50%', '60%']
      }],
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          areaStyle: {
          },
          data: [
            {
              value: [60, 73, 85, 40, 60, 85, 90],
              name: '',
              areaStyle: {
                normal: {
                  color: '#239160' // 选择区域颜色
                }
              }
            }
          ]
        },
      ],
      splitArea: {
        areaStyle: {
          color: ['rgba(114, 172, 209, 0.1)',
            'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)',
            'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)'
          ], //圆环颜色
          shadowColor: '#f2f6fc', // 圆背景颜色
          shadowBlur: 10
        }
      }
    }
    const initCharts = function () {
      myChart = $echarts.init(document.getElementById('myChart'))
      myChart.setOption(option)
    }
    onMounted(() => {
      initCharts()
    })
    const setValues = (val) => {
      option.radar[0].indicator = val.indicator
      option.series[0].data[0].value = val.value
      if (!myChart)
        myChart = $echarts.init(document.getElementById('myChart'))
      myChart.clear();
      myChart.setOption(option, true)
    }
    return {
      refmyChart,
      initCharts,
      option,
      setValues
    }
  }
}
</script>

<style scoped>
</style>
<style>
#myChart canvas {
  top: -30px;
}
</style>