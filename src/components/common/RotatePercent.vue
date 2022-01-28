<template>
  <div class="industry">
    <!--左侧三部分-->
    <div class="industry-all" style="width: 630px; height:250px;">
      
        <div
          id="chart"
          ref="refChart"
          style="width: 100%; height:50%;"
        ></div>
        <div
          id="chartdown"
          ref="refChartdown"
          style="width: 100%; height:50%;"
        ></div>
    </div>
    <!--图像转动-->
    <div class="industry-circle"></div>
    <P class="industry-circle-word">{{ title }}</P>
    <!--导向线-->
    <div class="industry-line">
      <div class="industry-line-list industry-line-one">
        <span></span>
      </div>
      <!-- <div class="industry-line-list industry-line-two">
        <span></span>
      </div> -->
      <div class="industry-line-list industry-line-three">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-fore">
        <span></span>
      </div>
      <!-- <div class="industry-line-list industry-line-five">
        <span></span>
      </div> -->
      <div class="industry-line-list industry-line-six">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject, onUnmounted } from '@vue/runtime-core'

export default {
  name: "Rotate",
  setup () {
    let title = ref('云专线统计')
    let data = ref([
      { name: 'PTN', num: 1354, effect: 5, line: 15 },
      { name: 'OTN', num: 1354, effect: 5, line: 15 },
      { name: 'PON', num: 1354, effect: 5, line: 15 },
      { name: '5G', num: 1354, effect: 5, line: 15 },
    ]);

    let $echarts = inject('$echarts')
    let chart = null
    let refChart = ref(null)
    let myChart = null;
    let chartdown = null
    let refChartdown = ref(null)
    let myChartdown = null;
    let series = []
    let seriesdown = []
    let yAxis = [
        {x:'10%',y:'50%'},
        {x:'90%',y:'50%'},
        {x:'10%',y:'60%'},
        {x:'90%',y:'60%'}
    ]

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
      
      series: series
    }
    let  optiondown = {
      
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
      
      series: seriesdown
    }
    /** 设置标题 */
    const setTitle = val => {
      title.value = val
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
      for (let i = 0; i < 2; i++) {

        var zong = 100
        var num = data.value[i].num
        var sy = zong-num
        
        series.push({
          name: data.value[i].name,
          type: 'pie',
          radius: ['65%', '80%'],
          center: [yAxis[i].x, yAxis[i].y],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
            formatter: params => {
                return `{title|${params.seriesName}}\n{percent|${data.value[i].num}%}`
              },
              rich: {
                title: {
                  fontSize: 10,
                  color: '#1a1a1a',
                  lineHeight: 24
                },
                name: {
                  fontSize: 12,
                  color: '#1a1a1a',
                  lineHeight: 24
                },
                percent: {
                  fontSize: 14,
                  lineHeight: 24,
                  color: '#1a1a1a'
                }
              }
          },
          
          labelLine: {
              show: false,
          },
          data: [
              {value: data.value[i].num,name:''},
              {value: sy,name:''}
            ],
        })
      }
      for (let i = 2; i < data.value.length; i++) {
        console.log('打印下钻数据22'+data.value[i].num);

        var zong = 100
        var num = data.value[i].num
        var sy = zong-num
        
        seriesdown.push({
          name: data.value[i].name,
          type: 'pie',
          radius: ['65%', '80%'],
          center: [yAxis[i].x, yAxis[i].y],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
            formatter: params => {
                return `{title|${params.seriesName}}\n{percent|${data.value[i].num}%}`
              },
              rich: {
                title: {
                  fontSize: 10,
                  color: '#1a1a1a',
                  lineHeight: 24,
                },
                name: {
                  fontSize: 12,
                  color: '#1a1a1a',
                  lineHeight: 24
                },
                percent: {
                  fontSize: 14,
                  lineHeight: 24,
                  color: '#1a1a1a'
                }
              }
          },
          
          labelLine: {
              show: false,
          },
          data: [
              {value: data.value[i].num,name:''},
              {value: sy,name:''}
            ],
        })
      }
      myChart = $echarts.init(refChart.value);
      myChart.setOption(option)
      myChartdown = $echarts.init(refChartdown.value);
      myChartdown.setOption(optiondown)

    };
    return {
      title,
      setTitle,
      setValue,
      data,
      refChart,
      refChartdown
    }
  }
}
</script>

<style scoped>
.industry {
  width: 100%;
  max-width: 731px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.industry-circle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 192px;
  height: 192px;
  background: url("~@/assets/common/circle.png") no-repeat center;
  background-size: cover;
  animation: mymove 3s linear infinite;
  z-index: 10;
}
@keyframes mymove {
  0% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.industry-circle-word {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 45px;
  height: 30px;
  font-size: 14px;
  text-align: center;
}
.industry-list {
  width: 100px;
  height: 100px;
  background: #fafbfc;
  overflow: hidden;
  padding: 5px 10px;
  margin-top: 10px;
}
.industry-list-2,
.industry-list-3 {
  margin-top: 100px;
}
.industry-list span:first-child {
  text-align: center;
  font-size: 14px;
}
.industry-list span:last-child {
  float: right;
  margin-right: 0px;
  font-size: 19px;
  line-height: 22px;
}
.industry-list .progress-bar-line {
  display: block !important;
  margin-top: 4px;
}
.industry-list > div {
  display: flex;
  justify-content: space-between;
  line-height: 22px;
  margin-top: 5px;
}
.industry-all {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height:107px;
}

.industry-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  width: 420px;
  height: 100%;
}
.industry-line-list {
  height: 4px;
  background: #fafbfc;
  position: absolute;
}
.industry-line-one {
  top: 75px;
  left: 0;
  width: 130px;
  transform: rotateZ(25deg);
}
.industry-line-two {
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 110px;
}
.industry-line-three {
  bottom: 75px;
  left: 0;
  width: 130px;
  transform: rotateZ(-25deg);
}
.industry-line-fore {
  top: 75px;
  right: 0;
  width: 130px;
  transform: rotateZ(155deg);
}
.industry-line-five {
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 110px;
  transform: rotateZ(180deg);
}
.industry-line-six {
  bottom: 75px;
  right: 0;
  width: 130px;
  transform: rotateZ(-155deg);
}
.industry-line-list span {
  position: absolute;
  right: 0;
  top: 0;
  width: 14px;
  height: 4px;
  background: url("../../assets/common/bg-color.png") no-repeat center;
  background-size: cover;
}
.industry-line-one span,
.industry-line-three span,
.industry-line-fore span,
.industry-line-six span {
  animation: myline 3s linear infinite;
}
.industry-line-two span,
.industry-line-five span {
  animation: mylines 3s linear infinite;
}
.progress-bar-line .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #0066ff, #0066ff) !important;
}
@keyframes myline {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-120px);
  }
}
@keyframes mylines {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-100px);
  }
}
</style>
