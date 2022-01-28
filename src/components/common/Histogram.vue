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

    <div
      id="Chart"
      ref="barChart"
      style="width: 100%; height: calc(100% - 40px);float:left;"
    ></div>

  </div>
</template>

<script>
import { ref, onMounted, inject, onUnmounted } from '@vue/runtime-core'


export default {
  name: 'BarChart',
  setup () {
    let $echarts = inject("$echarts");
    let barChart = ref(null)
    let myChart = null;
    let type = ref(false);
    let title = ref('请设置标题')
    let data = ref([
      { yname: '拨测告警', xname: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'], ynum: [30, 40, 50, 60, 40, 40] },
      { yname: '业务告警', xname: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'], ynum: [30, 40, 50, 60, 40, 40] }

    ])
    let series = []
    let xAxis = []
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
        data: ['告警数'],
        itemGap: 5,
        left: "80%",
        top: "15%"
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      yAxis: [
        {
          type: '',
          name: '',
          offset: -22.5,
          axisLabel: {
            show: false,//不显示坐标轴上的文字
          },
          splitLine: {
            show: false
          }
        },
      ],
      xAxis: xAxis,
      series: series,
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

      xAxis.push({
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
      series.push({
        name: '',
        type: 'bar',
        data: val[0].ynum,
        barWidth: '15%',
        itemStyle: {

          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                fontSize: 16
              }
            },
            color: function (params) {
              // 给出颜色组
              var colorList = ['#1183ff', '#34cf81', '#fb3236'];
              return colorList[params.dataIndex]
            },
          }
        }
      })
      myChart = $echarts.init(barChart.value);
      myChart.setOption(option)
    }
    onMounted(() => {
      //initCharts()
    })

    return {
      setValue, title, setTitle, barChart, data
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