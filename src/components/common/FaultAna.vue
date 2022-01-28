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
      <div class="res-row">
        <div
          class="res-column"
          style="width:40%;height:220px;"
          ref="lineChart"
        ></div>
        <div
          class="res-column"
          style="width:60%;"
        >
          <div
            class="res-row"
            v-for="(item,index) of data[typeIndex].list"
          >
            <div
              class="res-column"
              style="width:30%;"
            >
              <div class="res-item">
                {{item.name}}
              </div>
            </div>
            <div
              class="res-column"
              style="width:50%;padding-top: 15px;"
            >
              <el-progress
                :percentage="item.num"
                :show-text="false"
                :color="colorArray[index%5]"
              ></el-progress>
            </div>
            <div
              class="res-column"
              style="width:20%;"
            >
              <div
                class="res-item"
                :style="{'color':colorArray[index%5]}"
              >
                {{item.num}}
              </div>
            </div>
          </div>
        </div>
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
      {
        name: '处理及时性', num: 95.56, list: [
          { name: '等待时间过长', num: 97.17 }, { name: '未准时上门', num: 94.92 }, { name: '随意改约', num: 92.20 }, { name: '未提前预约', num: 88.20 },
        ]
      },
      {
        name: '解决专业性', num: 96.56, list: [
          { name: '等待时间过长', num: 96.17 }, { name: '未准时上门', num: 93.92 }, { name: '随意改约', num: 91.20 }, { name: '未提前预约', num: 89.20 },
        ]
      },
      {
        name: '维修人员服务', num: 97.56, list: [
          { name: '等待时间过长', num: 95.17 }, { name: '未准时上门', num: 92.92 }, { name: '随意改约', num: 90.20 }, { name: '未提前预约', num: 90.20 },
        ]
      },
    ]);
    let currentTab = ref(0);
    let type = ref('处理及时性');
    let typeIndex = ref(0);
    let colorArray = ref(['#FFA800', '#2EC478', '#0066FF', '#0EACDA', '#8A91A6']);

    let $echarts = inject("$echarts");
    let myChart = null;
    let lineChart = ref(null);

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
            color: 'auto'
          },
          data: [
            {
              value: data.value[0].num
            }
          ]
        }
      ]
    };




    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      myChart = $echarts.init(lineChart.value);
      // 绘制图表
      myChart.setOption(baseOption);
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
      console.log('type===', type.value, typeIndex.value)
      baseOption.series[0].data[0].value = data.value[typeIndex.value].num
      myChart.setOption(baseOption);
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
