<template>
  <div class="ring-chart">
    <div id="chart" ref="refChart" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
import { ref, onMounted, inject, onUnmounted } from "@vue/runtime-core";
export default {
  name: "RingChartFg",
  setup() {
    let title = ref("业务统计");
    let data = ref([
      {
        title: "云主专线数",
        num: 90,
        name: "网络业务",
        color: "#0cc474",
        type: "圆环",
        isShow: "是",
      },
    ]);
    let $echarts = inject("$echarts");
    let chart = null;
    let refChart = ref(null);
    let myChart = null;
    var Pietype = ref("圆环");

    let baseOption = {
      series: [
        {
          min: 0,
          max: 5000,
          type: "gauge",
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.3, "#67e0e3"],
                [0.7, "#37a2da"],
                [1, "#fd666d"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            distance: -15,
            length: 5,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          splitLine: {
            distance: -20,
            length: 0,
            lineStyle: {
              color: "#fff",
              width: 4,
            },
          },
          axisLabel: {
            color: "auto",
            distance: 40,
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value} ",
            color: "auto",
          },
          data: [
            {
              value: data.value[0].num,
            },
          ],
        },
      ],
    };

    let optionPie = {
      tooltip: {
        show: false,
        trigger: "item",
      },

      legend: {
        show: false,
        top: "5%",
        left: "center",
      },
      color: ["#23d08e", "#D8D8D8"],

      series: [
        {
          name: "测试",
          type: "pie",
          radius: ["0%", "80%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
            formatter: (params) => {
              return `{title|${params.seriesName}}\n{name|${params.name}}\n{percent|${data.value[0].number}}`;
            },
            rich: {
              title: {
                fontSize: 14,
                color: "#1a1a1a",
                lineHeight: 24,
              },
              name: {
                fontSize: 12,
                color: "#1a1a1a",
                lineHeight: 24,
              },
              percent: {
                fontSize: 20,
                lineHeight: 24,
                color: "#1f6ad0",
              },
            },
          },

          labelLine: {
            show: false,
          },
          data: [
            { value: 60, name: "" },
            { value: 40, name: "" },
          ],
        },
      ],
    };

    //水球图
    var max = 500; //满刻度大小
    var scroe = 56,
      scroePer = scroe / 100;
    let data1 = max * scroePer;
    let optionshuiqiu = {
      backgroundColor: "#fff",
      title: {
        top: "47%",
        left: "center",
        text: scroe + " 分",
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 32,
        },
      },
      series: [
        {
          type: "liquidFill",
          itemStyle: {
            opacity: 0.8, //波浪的透明度
            shadowBlur: 10, //波浪的阴影范围
            shadowColor: "#FFB931", //阴影颜色
          },
          radius: "80%",
          //水波
          color: [
            new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FE8704",
              },
              {
                offset: 1,
                color: "#FFB931",
              },
            ]),
          ],
          data: [
            {
              value: scroePer,
            },
          ],
          // background: '#000',
          center: ["50%", "50%"],
          backgroundStyle: {
            color: "#fff",
          },
          label: {
            normal: {
              formatter: "",
              textStyle: {
                fontSize: 12,
                color:'#fff'
              },
            },
          },
          outline: {
            itemStyle: {
              borderColor: "transparent",
              borderWidth: 5,
            },
            borderDistance: 0,
          },
        },
        //外环线
        {
          color: ["#FF8B00", "transparent"],
          type: "pie",
          center: ["50%", "50%"],
          radius: ["80%", "82%"],
          hoverAnimation: false,
          data: [
            {
              name: "",
              value: data1,
              label: {
                show: false,
                position: "center",
                color: "#fff",
                fontSize: 38,
                fontWeight: "bold",
                formatter: function (o) {
                  return data1;
                },
              },
            },
          ],
        },
      ],
    };

    let option = {
      tooltip: {
        show: false,
        trigger: "item",
      },

      legend: {
        show: false,
        top: "5%",
        left: "center",
      },
      color: ["#23d08e", "#D8D8D8"],

      series: [
        {
          name: "测试",
          max: 1000,
          type: "pie",
          radius: ["65%", "80%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
            formatter: (params) => {
              return `{title|${params.seriesName}}\n{name|${params.name}}\n{percent|${data.value[0].number}}`;
            },
            rich: {
              title: {
                fontSize: 14,
                color: "#ffffff",
                lineHeight: 24,
              },
              name: {
                fontSize: 12,
                color: "#1a1a1a",
                lineHeight: 24,
              },
              percent: {
                fontSize: 20,
                lineHeight: 24,
                color: "#1f6ad0",
              },
            },
          },

          labelLine: {
            show: false,
          },
          data: [
            { value: 60, name: "" },
            { value: 40, name: "" },
          ],
        },
      ],
    };

    const setValue = (val) => {
      console.log("------=======");
      console.log(val);
      data.value = val;
      option.series[0].name = data.value[0].title;
      optionPie.series[0].name = data.value[0].title;
      option.series[0].data[0].value = data.value[0].num;
      optionPie.series[0].data[0].value = data.value[0].num;
      var zong = 100;
      var num = data.value[0].num;
      var sy = zong - num;
      option.series[0].data[1].value = sy;
      myChart = $echarts.init(refChart.value);

      if (val[0].type == "仪表盘") {
        myChart.setOption(baseOption, true);
      } else if (val[0].type == "饼图") {
        myChart.setOption(optionPie, true);
      } else if (val[0].type == "水球图") {
        myChart.setOption(optionshuiqiu, true);
      } else {
        myChart.setOption(option, true);
      }

      // myChart.setOption(option, true)
      myChart.dispatchAction({
        type: "highlight",
        // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
        name: data.value[0].name,
      });
    };
    const changeType = () => {
      if (Pietype == "饼图") {
        myChart.setOption(optionPie, true);
        Pietype = "饼图";
      } else if (Pietype == "环形图") {
        myChart.setOption(option, true);
        Pietype = "环形图";
      } else if (Pietype == "仪表盘") {
        myChart.setOption(baseOption, true);
        Pietype = "仪表盘";
      }
    };
    onMounted(() => {
      // initCharts()
    });

    return {
      refChart,
      setValue,
      data,
      Pietype,
      changeType,
    };
  },
};
</script>
<style scoped>
.ring-chart {
  height: 100%;
}
</style>