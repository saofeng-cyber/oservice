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
      <div
        class="float-title-right"
        @click="selfRefresh"
      >
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div
      class="res-info"
      ref="lineChart"
    >
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
      { name: '开通及时率', num: 98.15 },
      { name: '投诉处理及时率', num: 98.15 },
      { name: '故障处理及时率', num: 98.15 },
    ]);
    let currentTab = ref(0);
    let type = ref('全部');
    let typeIndex = ref(0);
    let colorArray = ref(['#FFA800', '#2EC478', '#0066FF', '#0EACDA', '#8A91A6']);

    let $echarts = inject("$echarts");
    let myChart = null;
    let lineChart = ref(null);
    let series = [];
    let x = ['15%', '45%', '75%'];
    let baseOption = {
      series: series
    };



    /** 设置标题 */
    const setTitle = val => {
      title.value = val
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
      for (let i = 0; i < data.value.length; i++) {
        series.push({
          type: 'gauge',
          center: [x[i], '40%'],
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.2, '#f81d22'],
                [0.4, '#ff5d00'],
                [0.6, '#ffa800'],
                [0.8, '#0066ff'],
                [1, '#2ec478']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -10,
            length: 10,
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
              value: data.value[i].num,
              name: data.value[i].name
            }
          ],
          title: {
            offsetCenter: [0, '90%'],
            fontSize: 14

          }
        })
      }
      myChart = $echarts.init(lineChart.value);

      myChart.setOption(baseOption);
    };



    return {
      title,
      setTitle,
      setValue,
      data,
      colorArray,
      type,
      typeIndex,
      lineChart,
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
.res-main {
  padding: 0 10px;
  background-color: #fff;
  height: 100%;
}
.res-info {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
