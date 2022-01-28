<template>
    <div style="width: 100%; height:100%;position:relative;">
        <div id="SupportSatisCharts" style="width: 100%; height:100%;"></div>
        <div class="float-title" v-if="title">
            <i class="el-icon-caret-right"></i>
            {{title}}
        </div>
        <div class="float-title-right" @click="$emit('selfRefresh')">
            <i class="el-icon-refresh"></i>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'
export default {
    name: "GaugeColored3",
    setup(){
        let $echarts = inject("$echarts");
        let myChart = null;
        let title = ref("")
        let baseOption = {
            series: [{
                // 优享 - 表盘
                center: ['20%', '60%'],
                type: 'gauge',
                radius: '70%',
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [
                            [0.2, '#F81D22'],
                            [0.4, '#FF5D00'],
                            [0.6, '#FFA800'],
                            [0.8, '#0066FF'],
                            [1  , '#2EC478']
                        ]
                    }
                },
                pointer: {
                    icon: 'roundRect',
                    itemStyle: {
                        color: '#71778C'
                    }
                },
                anchor: {
                    show: true,
                    size: 25,
                    itemStyle: {
                        color: '#121A2A',
                        borderColor: '#95EDFF',
                        borderWidth: 2
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    distance: -6,
                    length: 7,
                    lineStyle: {
                        color: '#121A2A',
                        width: 4,
                    }
                },
                axisLabel: {
                    color: '#B1D8FF',
                    fontSize: 10
                },
                title: {
                    show: true,
                    fontSize: 12,
                    offsetCenter: [0, '90%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                detail: {
                    offsetCenter: [0, '65%'],
                    valueAnimation: true,
                    formatter: '{value}',
                    color: '#2EC478',
                    fontSize: 20,
                    fontWeight: 500,
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                data: [{
                    value: 100,
                    name: ''
                }]
            },{
                // 优享 - 表盘阴影
                center: ['20%', '60%'],
                type: 'gauge',
                radius: '63%',
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [
                            [0.2, '#F81D22'],
                            [0.4, '#FF5D00'],
                            [0.6, '#FFA800'],
                            [0.8, '#0066FF'],
                            [1  , '#2EC478']
                        ],
                        opacity: 0.3
                    }
                },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: {
                    distance: -6,
                    length: 7,
                    lineStyle: {
                        color: '#121A2A',
                        width: 4,
                    }
                },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{
                    value: 100,
                }]
            },{
                // 专享 - 表盘
                center: ['50%', '60%'],
                type: 'gauge',
                radius: '70%',
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [
                            [0.2, '#F81D22'],
                            [0.4, '#FF5D00'],
                            [0.6, '#FFA800'],
                            [0.8, '#0066FF'],
                            [1  , '#2EC478']
                        ]
                    }
                },
                pointer: {
                    icon: 'roundRect',
                    itemStyle: {
                        color: '#71778C'
                    }
                },
                anchor: {
                    show: true,
                    size: 25,
                    itemStyle: {
                        color: '#121A2A',
                        borderColor: '#95EDFF',
                        borderWidth: 2
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    distance: -6,
                    length: 7,
                    lineStyle: {
                        color: '#121A2A',
                        width: 4,
                    }
                },
                axisLabel: {
                    color: '#B1D8FF',
                    fontSize: 10
                },
                title: {
                    show: true,
                    fontSize: 12,
                    offsetCenter: [0, '90%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                detail: {
                    offsetCenter: [0, '65%'],
                    valueAnimation: true,
                    formatter: '{value}',
                    color: '#2EC478',
                    fontSize: 20,
                    fontWeight: 500,
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                data: [{
                    value: 100,
                    name: ''
                }]
            },{
                // 专享 - 阴影
                center: ['50%', '60%'],
                type: 'gauge',
                radius: '63%',
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [
                            [0.2, '#F81D22'],
                            [0.4, '#FF5D00'],
                            [0.6, '#FFA800'],
                            [0.8, '#0066FF'],
                            [1  , '#2EC478']
                        ],
                        opacity: 0.3
                    }
                },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: {
                    distance: -6,
                    length: 7,
                    lineStyle: {
                        color: '#121A2A',
                        width: 4,
                    }
                },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{
                    value: 100,
                }]
            },{
                // 尊享 - 表盘
                center: ['80%', '60%'],
                type: 'gauge',
                radius: '70%',
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [
                            [0.2, '#F81D22'],
                            [0.4, '#FF5D00'],
                            [0.6, '#FFA800'],
                            [0.8, '#0066FF'],
                            [1  , '#2EC478']
                        ]
                    }
                },
                pointer: {
                    icon: 'roundRect',
                    itemStyle: {
                        color: '#71778C'
                    }
                },
                anchor: {
                    show: true,
                    size: 25,
                    itemStyle: {
                        color: '#121A2A',
                        borderColor: '#95EDFF',
                        borderWidth: 2
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    distance: -6,
                    length: 7,
                    lineStyle: {
                        color: '#121A2A',
                        width: 4,
                    }
                },
                axisLabel: {
                    color: '#B1D8FF',
                    fontSize: 10
                },
                title: {
                    show: true,
                    fontSize: 12,
                    offsetCenter: [0, '90%'],
                    color: '#FFFFFF',
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                detail: {
                    offsetCenter: [0, '65%'],
                    valueAnimation: true,
                    formatter: '{value}',
                    color: '#2EC478',
                    fontSize: 20,
                    fontWeight: 500,
                    textShadowColor: '#0066FF',
                    textShadowBlur: 8
                },
                data: [{
                    value: 100,
                    name: ''
                }]
            },{
                // 尊享 - 阴影
                center: ['80%', '60%'],
                type: 'gauge',
                radius: '63%',
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [
                            [0.2, '#F81D22'],
                            [0.4, '#FF5D00'],
                            [0.6, '#FFA800'],
                            [0.8, '#0066FF'],
                            [1  , '#2EC478']
                        ],
                        opacity: 0.3
                    }
                },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: {
                    distance: -6,
                    length: 7,
                    lineStyle: {
                        color: '#121A2A',
                        width: 4,
                    }
                },
                axisLabel: { show: false },
                detail: { show: false },
                data: [{
                    value: 100,
                }]
            }]
        };

        const initCharts = function(){
            // 基于准备好的dom，初始化echarts实例
            myChart = $echarts.init(document.getElementById('SupportSatisCharts'));
            // 绘制图表
            myChart.setOption(baseOption);
        }

        // 设置标题
        const setTitle = (val) => {
            title.value = val;
        }

        // 设置数值
        const setValues = (values) => {
            let key1 = 0, key2 = 1;
            values.some(({name, value})=>{
                if(baseOption.series.length > key2){
                    baseOption.series[key1].data[0].value=value;
                    baseOption.series[key1].data[0].name=name;
                    baseOption.series[key2].data[0].value=value;
                    key1 += 2;
                    key2 += 2;
                }
            })
            myChart.setOption(baseOption);
        }
        
        onMounted(()=>{
            initCharts();
        })

        return {
            setValues, title, setTitle
        }
    }
}
</script>

<style scoped>
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
    cursor: pointer;
    right: 10px;
    top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #B1D8FF;
    border-radius: 50%;
    border: 1px solid #B1D8FF;
}
</style>