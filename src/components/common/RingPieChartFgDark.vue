<template>
  <div class="res-main">
    <div
      id="chart"
      ref="refChart"
      style="width: 100%; height:100%;display: inline-block;"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, inject, onUnmounted } from '@vue/runtime-core'
export default {
  name: "RateFg",
  setup () {
    let title = ref('业务统计')
    let data = ref({
      title: "终端总数",
      info: [{ value: 39.42, name: "低成本C系列", color: "#0066ff", num: 993 },
      { value: 39.01, name: "桌面型D系列", color: "#2fc479", num: 540 },
      { value: 26.56, name: "行业定制H系列", color: "#fdb527", num: 529 },
      { value: 26.56, name: "专业型P系列", color: "#28b5dd", num: 445 },
      { value: 26.56, name: "保密会议终端P系列", color: "#d577ed", num: 415 }]
    });
    let styleArray = ref([]);
    let widthStyle = ref({});
    let colorArray = ['#0A6DF2', '#14D071', '#FCB936', '#2FAACF'];
    let $echarts = inject('$echarts')
    let chart = null
    const refChart = ref(null)
    let legendData = []
    let timer = null
    let select = ref(1)


    const initData = function () {

      widthStyle.value = { 'width': (100 / data.value.length - 1) + '%', 'margin-right': '1%' };
      let array = [];
      var total = 0;
      for (let i = 0; i < data.value.length; i++) {
        if (typeof data.value[i].num !== 'number' && data.value[i].num.indexOf('%') > -1) {

        } else {
          total += data.value[i].num;
        }
      }
      for (let i = 0; i < data.value.length; i++) {
        let style = { 'height': '25px' };
        style['background-color'] = colorArray[i % 4];
        if (typeof data.value[i].num !== 'number' && data.value[i].num.indexOf('%') > -1) {
          style['width'] = data.value[i].num;
        } else {
          if (total > 0) {
            style['width'] = data.value[i].num / total * 100 + '%';
          } else {
            style['width'] = 100 / data.value.length * 100 + '%';
          }
        }

        array.push(style);
        styleArray.value = array
      }
    }
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        icon: "circle",
        top: 'middle',
        right: '5%',
        orient: 'vertical',
        textStyle:{
          color:'#fff'
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['65%', '80%'],
          center: ["40%", "50%"],
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          label: {
            show: false,
            position: 'center',
            color:"#fff",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold',
            }
          },
        }
      ]
    };
    const initCharts = function () {
      chart = $echarts.init(refChart.value)
      chart.on('click', function eConsole (param) {
        if (param.data.name == '拨测告警') {
          select.value = 1
        } else if (param.data.name == '网络告警') {
          select.value = 2
        } else {
          select.value = 3
        }
      });
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

    /** 设置标题 */
    const setTitle = val => {
      title.value = val

    }
    /** 设置data */
    const setValues = val => {
      data.value = val

      option.color = val.info.map(item => item.color)
      option.series[0].name = val.title
      option.series[0].data = val.info
      legendData = val.info.map(item => item.name)
      initCharts()
      initData()
    };

    onMounted(() => {
      //initData()
    })
    onUnmounted(() => {

    })
    return {
      title,
      setTitle,
      setValues,
      data,
      widthStyle,
      styleArray,
      refChart,
      select
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
  width: 100%;
  height: 100%;
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
.res-info {
  padding: 20px 0;
}
.res-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.res-column {
  min-height: 1px;
  margin-left: 250px;
}

.res-item {
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  height: 30px;
  width: 300px;
  line-height: 30px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
}

.res-name {
  display: inline-block;
  width: 180px;
}
.res-value {
  display: inline-block;
  width: 60px;
}
.res-num {
  display: inline-block;
  width: 60px;
}
</style>
