<template>
  <div class="res-main">
    <div class="top-title">
      <div
        class="float-title"
        v-if="title"
      >
        <span class="i"></span>
        {{title}}
      </div>
       <div style="float: left; padding-top: 3px; width: 15%;padding-left:200px">
        <el-form :inline="true">
          <el-select
            :popper-append-to-body="false" placeholder="云主机"
            v-model="data.list"
          >
          </el-select>
        </el-form>
      </div>
      <div class="float-title-right">
        <el-radio-group
          v-model="type"
          @change="tabChange"
        >
          <el-radio-button
            size="medium"
            v-for="(item,index) of data"
            :label="item.name"
          ></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div
      class="res-info"
      style="padding:10px;"
    >
     
      <div>
        <div
          class="res-column"
          style="width:50%;height:250px;"
          ref="lineChart"
        >
        </div>
        
        <div
          class="res-column"
          style="width:50%;height:250px;"
          ref="lineChartm"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity';
export default {
  name: "BusRank",
  setup () {
    let title = ref('故障处理即评分析')
    let data = ref([
      {name: '全部', cpu: 95.56,memory:99,list:[{label:'云主机',value:1}]},
      {name: '统建', cpu: 96.56,memory:96,list:[{label:'云主机',value:1}]},
      {name: '省建', cpu: 95.56,memory:94,list:[{label:'云主机',value:1}]}
    ]);
    let currentTab = ref(0);
    let type = ref('全部');
    let typeIndex = ref(0);
    let colorArray = ref(['#FFA800', '#2EC478', '#0066FF', '#0EACDA', '#8A91A6']);

    let $echarts = inject("$echarts");
    let myChart = null;
    let lineChart = ref(null);
    let myChartm = null;
    let lineChartm = ref(null);


    let baseOption = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 5,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -20,
            length: 0,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },
          axisLabel: {
            color: 'auto',
            distance: 40,
            fontSize: 12
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} ',
            color: 'auto',
            fontSize: 16
          },
          data: [
            {
              value: data.value[0].cpu,
              name:'CPU利用率'
            }
          ],
          title:{
            offsetCenter : [0, '80%'],
            fontSize: 14

          }
        }
      ]
    };
    let baseOptionm = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 5,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -20,
            length: 0,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },
          axisLabel: {
            color: 'auto',
            distance: 40,
            fontSize: 12
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} ',
            color: 'auto',
            fontSize: 16

          },
          data: [
            {
              value: data.value[0].memory,
              name:'内存利用率'
            }
          ],
          title:{
            offsetCenter : [0, '80%'],
            fontSize: 14

          }
        }
      ]
    };
    


    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      myChart = $echarts.init(lineChart.value);
      console.log('lineChart===',lineChart.value)
      // 绘制图表
      myChart.setOption(baseOption);

      myChartm = $echarts.init(lineChartm.value);
      console.log('lineChartm===',lineChartm.value)
      // 绘制图表
      myChartm.setOption(baseOptionm);
    }

    /** 设置标题 */
    const setTitle = val => {
      title.value = val
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
    };

    const tabChange = function () {
      for (var i = 0; i < data.value.length; i++) {
        if (data.value[i].name == type.value) {
          typeIndex.value = i;
          break;
        }
      }
      
      baseOption.series[0].data[0].value = data.value[typeIndex.value].cpu
      myChart.setOption(baseOption);
      console.log('type===', type.value, typeIndex.value)
      baseOptionm.series[0].data[0].value = data.value[typeIndex.value].memory
      myChartm.setOption(baseOptionm);
    }

    onMounted(() => {
      initCharts()
    })

    return {
      title,
      setTitle,
      setValue,
      data,
      colorArray,
      type,
      typeIndex,
      lineChart,
      lineChartm,
      tabChange
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
.res-main {
  padding: 0 10px;
  background-color: #fff;
}
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  font-size: 14px;
}
.float-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.res-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.res-column {
  display: block;
  min-height: 1px;
  width: 50%;
  float: left;
  vertical-align:middle;
}
.res-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
}
</style>
