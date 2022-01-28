<template>
    <div
        class="container"
        style="width: 100%; height:100%;position:relative;"
    >
        <div class="float-title" style="width: 80%">
            <span style="width: 40%;display: inline-block"></span>
            {{title}}
        </div>
        <div
            class="float-title-right"
            @click="$emit('lineChartRefresh')"
        >
            <i class="el-icon-refresh"></i>
        </div>
        <div
            ref="lineChart"
            style="width: 100%; height:100%;"
        ></div>
    </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'
export default {
    name: 'lineChartFg',
    props: {
        title: {
            type: String,
            default: '',

        },
        tag:{
            name1: '寻呼成功率',
            name2: '昨日寻呼成功率',
            name3:'阈值'
        }
    },
    setup () {
        let $echarts = inject("$echarts");
        let myChart = null;
        let lineChart = ref(null);
        let options=ref([{
            value: '选项1',
            label: '趋势图'
        }, {
            value: '选项2',
            label: '柱状图'
        }])
        let value = ref('')

        let baseOption = {
            legend: {
                show: true,
                icon: 'rectangle',
                top: '15%',
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#000000',
                },
            },
            toolbox: {
                show: true,
                feature: {
                    // dataView: {
                    //     readOnly: false
                    // }, //数据视图
                    magicType: {
                        type: ['line', 'bar']
                    },  //切换为折线图，切换为柱状图
                    restore: {},  //还原
                    // saveAsImage: {}   //保存为图片
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#2D303B',
                borderColor: '',
                borderWidth: 0,
                textStyle: {
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: 12,
                },
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#2D303B'
                    }
                }
            },
            grid: { // 网格线
                top: '30%',
                bottom: '11%',
                left: '5%',
                right: '5%',
                show: true,
                borderColor: 'rgba(177, 216, 255, 0.08)',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['06-01', '06-05', '06-10', '06-15', '06-20', '06-25', '06-30'],
                axisLabel: {
                    textStyle: {
                        color: '#000000',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(234, 149, 149, 1)"
                            }
                        }
                    },
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(177, 216, 255, 0.08)"
                    }
                }
            },
            yAxis: {
                name: '单位: %',
                type: 'value',
                max: '100',
                nameTextStyle: {
                    fontSize: 12,
                    color: '#000000',
                },

                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#B1D8FF']
                    }
                },
            },
            series: [
                {
                    name: '寻呼成功率',
                    data: [65, 62, 72, 59, 55, 69, 72],
                    type: 'line',
                    symbol: 'none',
                    smooth: '0.35',
                    color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(46, 196, 120, 0.16)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(46, 196, 120, 1)'
                        }
                    ]),
                    areaStyle: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(46, 196, 120, 0.24)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(46, 196, 120, 0.08)'
                            },
                        ])
                    },
                },
                {
                    name: '昨日寻呼成功率',
                    data: [43, 50, 15, 93, 60, 64, 46],
                    type: 'line',
                    symbol: 'none',
                    smooth: '0.35',
                    color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(7, 155, 255, 0.16)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(7, 155, 255, 1)'
                        }
                    ]),
                    areaStyle: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(7, 155, 255, 0.24)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(7, 155, 255, 0.08)'
                            },
                        ])
                    },
                },
                {
                    name: '阈值',
                    data: [65, 62, 72, 59, 55, 69, 72],
                    type: 'line',
                    symbol: 'none',
                    smooth: '0.35',
                    color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255, 187, 59, 0.16)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 187, 59, 1)'
                        }
                    ]),
                    areaStyle: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(255, 187, 59, 0.24)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 187, 59, 0.08)'
                            },
                        ])
                    },
                }
            ]
        }

        const initCharts = function () {
            // 基于准备好的dom，初始化echarts实例
            myChart = $echarts.init(lineChart.value);
            // 绘制图表
            myChart.setOption(baseOption);
        }

        // 设置数值
        const setValues = (values) => {
            values.some(({ name, data, xData, yName }) => {
                if (baseOption.series.length > 0) {
                    baseOption.series[0].name = name
                    baseOption.series[0].data = data
                    baseOption.xAxis.data = xData
                    baseOption.yAxis.name = yName
                }
            })
            myChart.setOption(baseOption);
        }


        onMounted(() => {
            initCharts()
        })

        return {
            setValues, lineChart,
            options,
            value
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