<template>
    <div id="BusiSatisChart" style="width: 100%; height:100%;"></div>
</template>

<script>
import { inject, onMounted} from '@vue/runtime-core'
export default {
  name: "BusiSatis",
  setup(){
    let $echarts = inject("$echarts");
    let myChart = null;
    let baseOption = {
        series: [
            // 开通满意度 - 仪表盘
            {
                type: 'gauge',
                center: ["50%", "30%"],
                radius: '48%',
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                splitNumber: 12,
                itemStyle: {
                    color: '#40E792',
                    opacity: 0.2,
                },
                progress: {
                    show: true,
                    width: '100%',
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1
                    }
                },
                axisTick: {
                    distance: 0,
                    length: 3,
                    lineStyle: {
                        width: 1,
                        color: '#B1D8FF'
                    }
                },
                splitLine: {
                    distance: 0,
                    length: 10,
                    lineStyle: {
                        width: 1,
                        color: '#B1D8FF'
                    }
                },
                axisLabel: {
                    show:false,
                },
                anchor: {
                    show: false
                },
                title: {
                    show: true,
                    offsetCenter: [0, '40%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 24,
                    height: '15%',
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 24,
                    fontWeight: 'normal',
                    formatter: '{value}',
                    color: '#40E792'
                },
                data: [{
                    value: 100,
                    name: '%'
                }]
            },
            // 开通满意度 - 进度条
            {
                type: 'gauge',
                center: ["50%", "30%"],
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                radius: '39%',
                itemStyle: {
                    color: '#40E792',
                },
                progress: {
                    show: true,
                    width: 10
                },
                pointer: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                title: {
                    show:true,
                    offsetCenter: [0, '90%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                data: [{
                    value: 100,
                    name: '开通满意度'
                }]
            },
            // 故障满意度 - 仪表盘
            {
                type: 'gauge',
                center: ["27%", "71%"],
                radius: '42%',
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                splitNumber: 12,
                itemStyle: {
                    color: '#48D6FF',
                    opacity: 0.2,
                },
                progress: {
                    show: true,
                    width: '100%',
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1
                    }
                },
                axisTick: {
                    distance: 0,
                    length: 3,
                    lineStyle: {
                        width: 1,
                        color: '#B1D8FF'
                    }
                },
                splitLine: {
                    distance: 0,
                    length: 10,
                    lineStyle: {
                        width: 1,
                        color: '#B1D8FF'
                    }
                },
                axisLabel: {
                    show:false,
                },
                anchor: {
                    show: false
                },
                title: {
                    show: true,
                    offsetCenter: [0, '40%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 24,
                    height: '15%',
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 24,
                    fontWeight: 'normal',
                    formatter: '{value}',
                    color: '#48D6FF'
                },
                data: [{
                    value: 100,
                    name: '%'
                }]
            },
            // 故障满意度 - 进度条
            {
                type: 'gauge',
                center: ["27%", "71%"],
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                radius: '33%',
                itemStyle: {
                    color: '#48D6FF',
                },
                progress: {
                    show: true,
                    width: 10
                },
                pointer: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                title: {
                    show:true,
                    fontSize: 14,
                    offsetCenter: [0, '100%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                data: [{
                    value: 100,
                    name: '故障满意度'
                }]
            },
            // 投诉满意度 - 仪表盘
            {
                type: 'gauge',
                center: ["73%", "71%"],
                radius: '42%',
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                splitNumber: 12,
                itemStyle: {
                    color: '#FFC554',
                    opacity: 0.2,
                },
                progress: {
                    show: true,
                    width: '100%',
                },
                pointer: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1
                    }
                },
                axisTick: {
                    distance: 0,
                    length: 3,
                    lineStyle: {
                        width: 1,
                        color: '#B1D8FF'
                    }
                },
                splitLine: {
                    distance: 0,
                    length: 10,
                    lineStyle: {
                        width: 1,
                        color: '#B1D8FF'
                    }
                },
                axisLabel: {
                    show:false,
                },
                anchor: {
                    show: false
                },
                title: {
                    show: true,
                    offsetCenter: [0, '40%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 24,
                    height: '15%',
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 24,
                    fontWeight: 'normal',
                    formatter: '{value}',
                    color: '#FFC554'
                },
                data: [{
                    value: 100,
                    name: '%'
                }]
            },
            // 投诉满意度 - 进度条
            {
                type: 'gauge',
                center: ["73%", "71%"],
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                radius: '33%',
                itemStyle: {
                    color: '#FFC554',
                },
                progress: {
                    show: true,
                    width: 10
                },
                pointer: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { show: false },
                title: {
                    show:true,
                    fontSize: 14,
                    offsetCenter: [0, '100%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                data: [{
                    value: 100,
                    name: '投诉满意度'
                }]
            }
        ],
    };


    const initCharts = function(){
        // 基于准备好的dom，初始化echarts实例
        myChart = $echarts.init(document.getElementById("BusiSatisChart"));
        // 绘制图表
        myChart.setOption(baseOption);
    }

    const setValues = (ktNum=0, gzNum=0, tsNum=0) => {
        if(ktNum > 0){
            baseOption.series[0].data[0].value=ktNum;
            baseOption.series[1].data[0].value=ktNum;
        }
        if(gzNum > 0){
            baseOption.series[2].data[0].value=gzNum;
            baseOption.series[3].data[0].value=gzNum;
        }
        if(tsNum > 0){
            baseOption.series[4].data[0].value=tsNum;
            baseOption.series[5].data[0].value=tsNum;
        }
        myChart.setOption(baseOption);
    }

    /** 在设置值之前调用 */
    const setLabel = (ktNum='', gzNum='', tsNum='') => {
      baseOption.series[1].data[0].name = ktNum
      baseOption.series[3].data[0].name = gzNum
      baseOption.series[5].data[0].name = tsNum
    }


    onMounted(()=>{

        initCharts();
    })

    return {
        setValues, setLabel
    }
  }
}
</script>

<style scoped>
#BusiSatisChart {
    background-image: url('~@/assets/common/Chart-BG.png');
    background-repeat: no-repeat;
    background-position: center;
    /* background-size: 100%; */
}
</style>