<template>
  <div
    id="BusiSatisChart"
    style="width: 100%; height:100%;background-repeat: no-repeat;background-size: 100% 100%"
    :style="{backgroundImage:'url(' + require('@/static/img/Chart-BG.png') + ')'}"
  ></div>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
export default {
  name: "BusiSatis",
  setup () {
    let $echarts = inject("$echarts");
    let myChart = null;
    let baseOption = {
      "tooltip": {
        "formatter": "{a} <br/>{b} : {c}%"
      },
      "series": [
        {
          "name": "Pressure",
          "type": "gauge",
          "center": [
            "50%",
            "45%"
          ],
          "radius": "60%",
          "progress": {},
          "splitNumber": 5,
          "detail": {
            "formatter": "{r1|{value}}",
            "color": "auto",
            "rich": {
              "r1": {
                "fontSize": 14,
                "fontWeight": "bold",
                "color": "#2EC478",
                "verticalAlign": "bottom"
              }
            }
          },
          "title": {
            "show": true,
            "offsetCenter": [
              0,
              "100%"
            ],
            "color": "#000000",
            "fontSize": 14
          },
          "data": [
            {
              "value": 95,
              "name": "开通满意度"
            }
          ],
          "pointer": {
            "icon": "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
            "itemStyle": {
              "color": "#52586D"
            }
          },
          "anchor": {
            "show": true,
            "showAbove": true,
            "size": 6,
            "itemStyle": {
              "borderWidth": 1,
              "borderColor": "#52586D"
            }
          },
          "axisLine": {
            "show": true,
            "lineStyle": {
              "width": 1,
              "shadowBlur": 0,
              "color": [
                [
                  0.3,
                  "#FC7879"
                ],
                [
                  0.6,
                  "#FEA034"
                ],
                [
                  0.8,
                  "#86C260"
                ],
                [
                  1,
                  "#51CE8E"
                ]
              ]
            }
          },
          "axisTick": {
            "show": true,
            "distance": 0,
            "lineStyle": {
              "color": "auto",
              "width": 1
            },
            "length": 5,
            "splitNumber": 1
          },
          "splitLine": {
            "show": true,
            "distance": 0,
            "length": 5,
            "lineStyle": {
              "color": "auto",
              "width": 2
            }
          },
          "axisLabel": {
            "distance": 5,
            "color": "#9BA5BC",
            "fontSize": 12
          }
        },
        {
          "type": "gauge",
          "center": [
            "50%",
            "45%"
          ],
          "min": 0,
          "max": 100,
          "radius": "70%",
          "bottom": 0,
          "itemStyle": {
            "color": "#40E792"
          },
          "progress": {
            "show": true,
            "width": 6
          },
          "pointer": {
            "show": false
          },
          "axisLine": {
            "show": false
          },
          "axisTick": {
            "show": false
          },
          "splitLine": {
            "show": false
          },
          "axisLabel": {
            "show": false
          },
          "detail": {
            "show": false
          },
          "title": {
            "show": false,
            "offsetCenter": [
              0,
              "90%"
            ],
            "color": "#000000"
          },
          "data": [
            {
              "value": 100,
              "name": "开通满意度"
            }
          ]
        },
        {
          "name": "Pressure",
          "type": "gauge",
          "center": [
            "16%",
            "65%"
          ],
          "radius": "50%",
          "progress": {},
          "splitNumber": 5,
          "detail": {
            "formatter": "{r1|{value}}",
            "color": "auto",
            "rich": {
              "r1": {
                "fontSize": 14,
                "fontWeight": "bold",
                "color": "#2EC478",
                "verticalAlign": "bottom"
              }
            }
          },
          "title": {
            "show": true,
            "offsetCenter": [
              0,
              "100%"
            ],
            "color": "#000000",
            "fontSize": 14
          },
          "data": [
            {
              "value": 95,
              "name": "故障满意度"
            }
          ],
          "pointer": {
            "icon": "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
            "itemStyle": {
              "color": "#52586D"
            }
          },
          "anchor": {
            "show": true,
            "showAbove": true,
            "size": 6,
            "itemStyle": {
              "borderWidth": 1,
              "borderColor": "#52586D"
            }
          },
          "axisLine": {
            "show": true,
            "lineStyle": {
              "width": 1,
              "shadowBlur": 0,
              "color": [
                [
                  0.3,
                  "#FC7879"
                ],
                [
                  0.6,
                  "#FEA034"
                ],
                [
                  0.8,
                  "#86C260"
                ],
                [
                  1,
                  "#51CE8E"
                ]
              ]
            }
          },
          "axisTick": {
            "show": true,
            "distance": 0,
            "lineStyle": {
              "color": "auto",
              "width": 1
            },
            "length": 5,
            "splitNumber": 1
          },
          "splitLine": {
            "show": true,
            "distance": 0,
            "length": 6,
            "lineStyle": {
              "color": "auto",
              "width": 2
            }
          },
          "axisLabel": {
            "distance": 5,
            "color": "#9BA5BC",
            "fontSize": 12
          }
        },
        {
          "type": "gauge",
          "center": [
            "16%",
            "65%"
          ],
          "radius": "60%",
          "min": 0,
          "max": 100,
          "bottom": 0,
          "itemStyle": {
            "color": "#40E792"
          },
          "progress": {
            "show": true,
            "width": 6
          },
          "pointer": {
            "show": false
          },
          "axisLine": {
            "show": false
          },
          "axisTick": {
            "show": false
          },
          "splitLine": {
            "show": false
          },
          "axisLabel": {
            "show": false
          },
          "detail": {
            "show": false
          },
          "title": {
            "show": false,
            "offsetCenter": [
              0,
              "90%"
            ],
            "color": "#000000"
          },
          "data": [
            {
              "value": 100,
              "name": "故障满意度"
            }
          ]
        },
        {
          "name": "Pressure",
          "type": "gauge",
          "center": [
            "84%",
            "65%"
          ],
          "radius": "50%",
          "progress": {},
          "splitNumber": 5,
          "detail": {
            "formatter": "{r1|{value}}",
            "color": "auto",
            "rich": {
              "r1": {
                "fontSize": 14,
                "fontWeight": "bold",
                "color": "#2EC478",
                "verticalAlign": "bottom"
              }
            }
          },
          "title": {
            "show": true,
            "offsetCenter": [
              0,
              "100%"
            ],
            "color": "#000000",
            "fontSize": 14
          },
          "data": [
            {
              "value": 95,
              "name": "投诉满意度"
            }
          ],
          "pointer": {
            "icon": "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
            "itemStyle": {
              "color": "#52586D"
            }
          },
          "anchor": {
            "show": true,
            "showAbove": true,
            "size": 6,
            "itemStyle": {
              "borderWidth": 1,
              "borderColor": "#52586D"
            }
          },
          "axisLine": {
            "show": true,
            "lineStyle": {
              "width": 1,
              "shadowBlur": 0,
              "color": [
                [
                  0.3,
                  "#FC7879"
                ],
                [
                  0.6,
                  "#FEA034"
                ],
                [
                  0.8,
                  "#86C260"
                ],
                [
                  1,
                  "#51CE8E"
                ]
              ]
            }
          },
          "axisTick": {
            "show": true,
            "distance": 0,
            "lineStyle": {
              "color": "auto",
              "width": 1
            },
            "length": 5,
            "splitNumber": 1
          },
          "splitLine": {
            "show": true,
            "distance": 0,
            "length": 6,
            "lineStyle": {
              "color": "auto",
              "width": 2
            }
          },
          "axisLabel": {
            "distance": 5,
            "color": "#9BA5BC",
            "fontSize": 12
          }
        },
        {
          "type": "gauge",
          "center": [
            "84%",
            "65%"
          ],
          "radius": "60%",
          "min": 0,
          "max": 100,
          "bottom": 0,
          "itemStyle": {
            "color": "#40E792"
          },
          "progress": {
            "show": true,
            "width": 6
          },
          "pointer": {
            "show": false
          },
          "axisLine": {
            "show": false
          },
          "axisTick": {
            "show": false
          },
          "splitLine": {
            "show": false
          },
          "axisLabel": {
            "show": false
          },
          "detail": {
            "show": false
          },
          "title": {
            "show": false,
            "offsetCenter": [
              0,
              "90%"
            ],
            "color": "#000000"
          },
          "data": [
            {
              "value": 100,
              "name": "投诉满意度"
            }
          ]
        }
      ]
    };


    const initCharts = function () {
      // 基于准备好的dom，初始化echarts实例
      myChart = $echarts.init(document.getElementById("BusiSatisChart"));
      // 绘制图表
      myChart.setOption(baseOption);
    }

    const setValues = (val) => {
      // val = [
      //   { val: 99, name: '开通满意度' },
      //   { val: 98, name: '故障满意度' },
      //   { val: 97, name: '投诉满意度' },
      // ]
      myChart.resize()
      baseOption.series[0].data[0].value = val[0].val
      baseOption.series[0].data[0].name = val[0].name
      baseOption.series[1].data[0].name = val[0].name

      baseOption.series[2].data[0].value = val[1].val
      baseOption.series[2].data[0].name = val[1].name
      baseOption.series[3].data[0].name = val[1].name

      baseOption.series[4].data[0].value = val[2].val
      baseOption.series[4].data[0].name = val[2].name
      baseOption.series[5].data[0].name = val[2].name

      myChart.setOption(baseOption, true);
    }

    onMounted(() => {

      initCharts();
    })

    return {
      setValues
    }
  }
}
</script>

<style scoped>
</style>