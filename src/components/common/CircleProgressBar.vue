<template>
  <div class="ring-chart">
    <div
      id="chart"
      ref="refChart"
      style="width: 100%; height:100%;"
    ></div>
  </div>
</template>
<script>
import { ref, onMounted, inject, onUnmounted } from '@vue/runtime-core'
export default {
  //name: 'RingChart',
  setup () {
    let title = ref('业务统计')
    let data = ref([
          { title:'云主专线数',num: 90, name: '网络业务', color: '#2EC478' }
    ]);
    let $echarts = inject('$echarts')
    let chart = null
    let refChart = ref(null)
    let myChart = null;

    let  option = {
      
      tooltip: {
        show: false,
        trigger: 'item'
      },

      legend: {
        show: false,
        top: '5%',
        left: 'center'
      },
      color: ["#14D071","#D8D8D8"],
     
      series: [
        {
          name: '测试',
          type: 'pie',
          radius: ['65%', '80%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
            formatter: params => {
                return `{title|${params.seriesName}}\n{name|${params.name}}\n{percent|${data.value[0].number}}`
              },
              rich: {
                title: {
                  fontSize: 14,
                  color: '#1a1a1a',
                  lineHeight: 24
                },
                name: {
                  fontSize: 12,
                  color: '#1a1a1a',
                  lineHeight: 24
                },
                percent: {
                  fontSize: 20,
                  lineHeight: 24,
                  color: '#14D071'
                }
              }
          },
          
          labelLine: {
              show: false,
          },
         data: [
            {value: 60,name:''},
            {value: 40,name:''}
          ],
        }
        
      ]
    }
    
    const setValue = val => {
      data.value = val
      option.series[0].name = data.value[0].title
      option.series[0].data[0].value = data.value[0].num
      var zong = 100
      var num = data.value[0].num
      var sy = zong-num
      option.series[0].data[1].value = sy
      myChart = $echarts.init(refChart.value);
      myChart.setOption(option,true)
      myChart.dispatchAction({
          type: 'highlight',
          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
          name: data.value[0].name
        })
    }
    onMounted(() => {
      // initCharts()
    })
    
    return {
      refChart, setValue,data
    }
  }
}
</script>
<style scoped>
.ring-chart {
  height: 100%;
}
</style>