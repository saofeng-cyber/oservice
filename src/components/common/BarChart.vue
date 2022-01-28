<template>
  <div class="container" style="width: 100%; height:100%;position:relative;">
    <div class="float-title">
      <i class="el-icon-caret-right"></i>
      {{title}}
      <div v-if="type" style="float: right;width: 79px;height: 22px;line-height: 22px;margin-left: 324px;">
        <div style="float: left;border: 1px solid #4f7ddb;border-radius: 5px 5px 5px 5px;background: #0e0b33;">CPU</div>
        <div style="float: right;border: 1px solid #408f99;border-radius: 5px 5px 5px 5px;background: #1b292e;">内存</div>
      </div>
    </div>
    <div class="float-title-right" @click="$emit('lineChartRefresh')">
      <i class="el-icon-refresh"></i>
    </div>
    <div id="BarChart" style="width: 100%; height:100%;"></div>
  </div>
</template>

<script>
import { inject, onMounted} from '@vue/runtime-core'
import {ref} from '@vue/reactivity';

export default {
  name: 'BarChart',
  setup () {
    let $echarts = inject("$echarts");
    let myChart = null;
    let type = ref(false);
    let title = ref('请设置标题')
    let option = {
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
        data: ['CPU', '内存'],
        itemGap: 5,
        left: "65%",
        top: "15%"
      },
      grid: {
        top: '35%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ["北京-","上海-","深圳-","浙江-","江苏-","广州-","河北-","湖北-","河南-"],
          axisTick: {
            show: false
          },
          axisLine: {
            show:true,
            lineStyle:{
              lineStyle: {
                color: "rgba(95, 119, 146, 1)",
                width: 2.5
              }
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '单位: 条',
          offset: -22.5,
          axisLabel: {
            show: false,//不显示坐标轴上的文字
          },
          splitLine: {
            show: false
          }
        },
      ],
      series: [
        {
          name: 'CPU',
          type: 'bar',
          data: [54,2,65,86,35,23,7,67,9]
        },
        {
          name: '内存',
          type: 'bar',
          data: [46,27,43,4,87,67,7,68,97]
        }
      ]
    };

    const initCharts = function(){
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
    const setValue = (bool,val) => {
      $echarts.init(document.getElementById('BarChart')).setOption(val)
      type.value = bool
    }
    onMounted(() => {
      initCharts()
    })

    return {
      setValue, title, setTitle, type
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height:100%;
  position:relative;
}
.float-title {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 24px;
  text-shadow: 0px 0px 6px #26A7FF;
}
.float-title-right {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #B1D8FF;
  border-radius: 50%;
  border: 1px solid #B1D8FF;
  z-index: 1;
}
</style>