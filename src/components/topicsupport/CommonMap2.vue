<template>
  <div class="chart-bg">
    <img class="map-bg" src="../../assets/map/Disk-A.png" alt="" />
    <img class="map-bg" src="../../assets/map/Disk-B.png" alt="" />
    <img class="map-bg" src="../../assets/map/Disk-C.png" alt="" />
    <el-button
      round
      size="small"
      style="position: absolute; right: 5%; top: 5%; z-index: 999"
      @click="$emit('handleBack')"
      v-show="data.area_name != ''"
      >返回</el-button
    >
    <div class="legend-group">
      <div v-for="(item, index) in legendList" :key="index">
        <span class="legend-icon" :style="{ background: item.color }"></span>
        {{ item.label }}
      </div>
    </div>
    <div class="view-type">
      <div
        v-for="(item, index) in indexList"
        :key="index"
        class="view-item"
        @click="handleIndexChange(item.name, index)"
      >
        <img :src="require(`../../assets/map/${icons[index]}.png`)" alt="" />
        <span>
          {{ item.name }}
          <span :style="{ color: barColor[index], fontSize: 15 + 'px' }">{{
            data.info[item.column]
          }}</span>
        </span>
      </div>
    </div>
    <div ref="mapChart" class="map-chart"></div>
  </div>
</template>

<script>
import { inject, onMounted } from "vue";
import { ref, reactive } from "@vue/reactivity";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        area_name: "", //默认传空，地市下钻时传递地市名称
        //info：全省数据，下钻到地市后的地市数据
        info: {
          ind1: 178,
          ind2: 168,
          ind3: 158,
          ind4: 148,
          ind5: 138,
        },
        //地市数据列表，下钻到地市后的区县数据列表
        list: [],
        //指标列表
        index_list: [],
        //默认呈现第几个指标
        view_index: 0,
      }),
    },
  },
  setup(props, context) {
    const indexList = ref([
      {
        name: "活动告警",
        column: "ACTIVE_WARN",
      },
      {
        name: "故障工单",
        column: "FAULT_GD",
      },
      {
        name: "投诉工单",
        column: "COMPLAIN_GD",
      },
      {
        name: "在建项目",
        column: "BUILDING_PROJECT",
      },
      {
        name: "已建项目",
        column: "BUILDED_PROJECT",
      },
    ]);
    let barColor = ref(["orange", "#B07CFF", "lightblue", "skyblue", "green"]);
    let $echarts = inject("$echarts");
    let $axios = inject("$axios");
    let sysConfig = {};
    const mapChart = ref(null);
    let mapJsonPath = null;
    let charts = null;
    let areaName = null;
    let loadedMap = reactive({});
    let mapData = reactive([
      /*{
        "name": "曲靖市",
        "value": 365
      },
      {
        "name": "玉溪市",
        "value": 111
      },
      {
        "name": "保山市",
        "value": 178
      },
      {
        "name": "昭通市",
        "value": 123
      },
      {
        "name": "丽江市",
        "value": 456
      },
      {
        "name": "普洱市",
        "value": 789
      },
      {
        "name": "临沧市",
        "value": 12
      },
      {
        "name": "楚雄彝族自治州",
        "value": 45
      },
      {
        "name": "红河哈尼族彝族自治州",
        "value": 67
      },
      {
        "name": "文山壮族苗族自治州",
        "value": 89
      },
      {
        "name": "西双版纳傣族自治州",
        "value": 134
      },
      {
        "name": "大理白族自治州",
        "value": 156
      },
      {
        "name": "德宏傣族景颇族自治州",
        "value": 178
      },
      {
        "name": "怒江傈僳族自治州",
        "value": 220
      },
      {
        "name": "迪庆藏族自治州",
        "value": 234
      },
      {
        "name": "昆明市",
        "value": 998
      }*/
    ]);
    let viewIndex = ref(0);
    let colors = reactive([
      [
        "rgba(255, 168, 0, 0.8)",
        "rgba(255, 168, 0, 0.4)",
        "rgba(255, 168, 0, 1)",
      ],
      [
        "RGBA(177, 125, 255, 0.8)",
        "rgba(177, 125, 255, 0.4)",
        "rgba(177, 125, 255, 1)",
      ],
      [
        "rgba(14, 172, 218, 0.8)",
        "rgba(14, 172, 218, 0.4)",
        "rgba(14, 172, 218, 1)",
      ],
      [
        "rgba(0, 102, 255, 0.8)",
        "rgba(0, 102, 255, 0.4)",
        "rgba(0, 102, 255, 1)",
      ],
      [
        "rgba(46, 196, 120, 0.8)",
        "rgba(46, 196, 120, 0.4)",
        "rgba(46, 196, 120, 1)",
      ],
    ]);
    let icons = reactive([
      "Yellow-Bar",
      "Purple-Bar",
      "LightBlue-Bar",
      "DarkBlue-Bar",
      "Green-Bar",
      "Plain-Bar",
    ]); // 严格按颜色顺序
    const legendList = ref([]);

    const getLegendList = () => {
      legendList.value = [];
      let maxValue = 0;
      mapData.map((item) => {
        if (item.value > maxValue) {
          maxValue = item.value;
        }
      });
      const list = [
        {
          label: `0 - ${Math.ceil(maxValue * 0.25)}`,
          min: 0,
          max: Math.ceil(maxValue * 0.25),
          color: "#dcf3f9",
        },
        {
          label: `${Math.ceil(maxValue * 0.25) + 1} - ${Math.ceil(
            maxValue * 0.5
          )}`,
          min: Math.ceil(maxValue * 0.25),
          max: Math.ceil(maxValue * 0.5),
          color: "#D9E9FF",
        },
        {
          label: `${Math.ceil(maxValue * 0.5) + 1} - ${Math.ceil(
            maxValue * 0.75
          )}`,
          min: Math.ceil(maxValue * 0.5),
          max: Math.ceil(maxValue * 0.75),
          color: "#E9FFE9",
        },
        {
          label: `${Math.ceil(maxValue * 0.75) + 1} - ${maxValue}`,
          min: Math.ceil(maxValue * 0.75),
          max: maxValue,
          color: "#FFF5E1",
        },
      ];
      legendList.value = list;
    };
    const lineMaxHeight = () => {
      //const divisor = areaName === sysConfig.province ? 2 : 0.5
      let divisor = areaName === sysConfig.province ? 0.5 : 0.1;
      let maxValue = Math.max(...mapData.map((item) => item.value || 0));
      return divisor / maxValue;
    };
    // 柱状体的主干
    const lineData = () => {
      return mapData.map((item) => {
        console.log(item.name);
        var geo = sysConfig.geoPostionCoordMap[item.name];
        var lon = sysConfig.geoPostionCoordMap[item.name][0];
        var lat = sysConfig.geoPostionCoordMap[item.name][1];
        return {
          //coords: [item.coords, [item.coords[0], item.coords[1] + item.value * lineMaxHeight()]]
          //coords: [sysConfig.geoPostionCoordMap[item.name], [sysConfig.geoPostionCoordMap[item.name][0], sysConfig.geoPostionCoordMap[item.name][1] + item.value * lineMaxHeight()]]
          coords: [geo, [lon, lat + item.value * lineMaxHeight()]],
        };
      });
    };
    // 柱状体的顶部
    const scatterData = () => {
      return mapData.map((item) => {
        //return [item.coords[0], item.coords[1] + item.value * lineMaxHeight(), item.value]
        return [
          sysConfig.geoPostionCoordMap[item.name][0],
          sysConfig.geoPostionCoordMap[item.name][1] +
            item.value * lineMaxHeight(),
          item.value,
        ];
      });
    };
    // 柱状体的底部
    const scatterData2 = () => {
      return mapData.map((item) => {
        return {
          name: item.name,
          //value: item.coords
          value: sysConfig.geoPostionCoordMap[item.name],
        };
      });
    };

    const getOption = () => {
      getLegendList();
      const option = {
        tooltip: {
          show: true,
          backgroundColor: "rgba(45, 48, 59, 0.80)",
          formatter: function (params) {
            return params.data ? createTooltip(params.data) : "";
          },
        },
        geo: [
          {
            map: areaName,
            zoom: 1,
            aspectScale: 1,
            silent: true,
            //layoutSize: '95%',
            layoutCenter: ["50%", "50%"],
            label: {
              normal: {
                show: false,
                fontSize: 10,
              },
              emphasis: {
                show: false,
              },
            },
            zlevel: 3,
            itemStyle: {
              normal: {
                areaColor: "#5BB6FF",
                shadowColor: "#5BB6FF",
                shadowOffsetX: 0,
                shadowOffsetY: 8,
                borderColor: "rgba(28,199,242,0.9)",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
                label: {
                  show: false,
                },
              },
            },
          },
          {
            map: areaName,
            zoom: 1,
            aspectScale: 1,
            silent: true,
            //layoutSize: '95%',
            layoutCenter: ["50%", "50%"],
            label: {
              normal: {
                show: false,
                fontSize: 20,
              },
              emphasis: {
                show: false,
              },
            },
            zlevel: 2,
            itemStyle: {
              areaColor: "#DCEFFF",
              shadowColor: "#DCEFFF",
              shadowOffsetX: 0,
              shadowOffsetY: 16,
            },
            emphasis: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
              label: {
                show: false,
              },
            },
          },
          {
            map: areaName,
            zoom: 1,
            aspectScale: 1,
            silent: true,
            //layoutSize: '95%',
            layoutCenter: ["50%", "50%"],
            label: {
              normal: {
                show: false,
                fontSize: 20,
              },
              emphasis: {
                show: false,
              },
            },
            zlevel: 1,
            itemStyle: {
              areaColor: "#408CFD",
              shadowColor: "#408CFD",
              shadowOffsetX: 0,
              shadowOffsetY: 18,
            },
            emphasis: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
              label: {
                show: false,
              },
            },
          },
        ],
        dataRange: {
          show: false,
          seriesIndex: [0],
          splitList: legendList.value.map((item) => ({
            start: item.min,
            end: item.max,
            color: item.color,
          })),
        },
        series: [
          {
            // 地图
            name: "",
            type: "map",
            map: areaName,
            aspectScale: 1,
            selectedMode: false,
            zoom: 1,
            zlevel: 4,
            itemStyle: {
              normal: {
                borderColor: "rgba(0,255,255,.1)",
                borderWidth: 1,
                areaColor: "#dcf3f9",
                shadowColor: "#6d91a1",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
              },
              emphasis: {
                areaColor: "#0055E9",
                borderWidth: 1,
                label: {
                  show: false,
                },
              },
            },
            data: mapData,
          },
          // 柱状体的主干
          {
            type: "lines",
            zlevel: 5,
            effect: {
              show: false,
              symbolSize: 5, // 图标大小
            },
            lineStyle: {
              width: 10, // 尾迹线条宽度
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: colors[viewIndex.value][0], // 0% 处的颜色#1C6A51
                  },
                  {
                    offset: 1,
                    color: colors[viewIndex.value][1], // 100% 处的颜色#2AA97E
                  },
                ],
                global: false, // 缺省为 false
              },
              opacity: 1, // 尾迹线条透明度
              curveness: 0, // 尾迹线条曲直度
            },
            label: {
              show: 0,
              position: "end",
              formatter: "245",
            },
            silent: true,
            data: lineData(),
          },
          // 柱状体的顶部
          {
            type: "scatter",
            coordinateSystem: "geo",
            geoIndex: 0,
            zlevel: 5,
            label: {
              show: true,
              formatter: (val) => {
                return val.value[2];
              },
              color: colors[viewIndex.value][2],
              position: "top",
              distance: 0,
            },
            symbol: "circle",
            symbolSize: [10, 5],
            itemStyle: {
              color: colors[viewIndex.value][0],
              opacity: 1,
            },
            silent: true,
            data: scatterData(),
          },
          // 柱状体的底部
          {
            type: "scatter",
            coordinateSystem: "geo",
            geoIndex: 0,
            zlevel: 4,
            symbol: "circle",
            symbolSize: [10, 5],
            label: {
              // 地市名称
              formatter: "{b}",
              position: "bottom",
              color: "#000000",
              fontSize: 10,
              distance: 5,
              show: true,
            },
            itemStyle: {
              color: colors[viewIndex.value][1],
              opacity: 1,
            },
            silent: true,
            data: scatterData2(),
          },
        ],
      };
      return option;
    };
    const createTooltip = (params) => {
      const subItems = [];
      indexList.value.forEach((item, index) => {
        subItems.push(`<div style="margin: 0 5px; color: ${
          viewIndex.value === index ? "#fff" : ""
        }">
            <div style="display: block; white-space: nowrap;">${item.name}</div>
            <div style="display: block; white-space: nowrap;">${
              params.value2[index]
            }</div>
          </div>`);
      });
      let html = `
          <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;background-color: "rgba(45, 48, 59, 0.80)", filter: blur(10px);"></div>
          <div>
            <div style="font-size: 14px; font-weight: 500; color: #fff;" line-height: 20px;>${
              params.name
            }</div>
            <div style="display: flex; align-items: center; font-size: 12px; color: #B1D8FF;">
              ${subItems.join("")}
            </div>
          </div>`;
      return html;
    };
    const instanceOption = (d) => {
      var option = getOption();
      return option;
    };
    const renderMapData = () => {
      mapData = [];
      props.data.list.forEach((item) => {
        var list = [];
        indexList.value.forEach((obj) => {
          list.push(item[obj.column] || 0);
        });
        mapData.push({
          name: item.SHOWNAME,
          value: item[indexList.value[viewIndex.value].column] || 0,
          value2: list,
        });
      });
      var option = instanceOption(mapData);
      charts.clear();
      charts.setOption(option, true);
    };
    const loadMapData = () => {
      if (!charts) {
        charts = $echarts.init(mapChart.value);
        charts.on("click", (params) => {
          // 单击选中省份
          var name = params.name;
          context.emit("handleMapChange", { id: name, name: name });
        });
      }

      if (props.data.index_list && props.data.index_list.length > 0) {
        indexList.value = props.data.index_list;
      }
      if (props.data.view_index || props.data.view_index === 0) {
        viewIndex.value = props.data.view_index;
      }

      $axios.get("/config/govcharts/map/config.json").then((d) => {
        sysConfig = d;
        if (!props.data.area_name) {
          areaName = sysConfig.province;
          mapJsonPath = sysConfig.mapJsonPath;
        } else {
          areaName = props.data.area_name;
          mapJsonPath =
            "/config/govcharts/map/citys/" +
            sysConfig.cityMap[areaName] +
            ".json";
        }
        if (loadedMap[areaName]) {
          renderMapData();
        } else {
          let geoCoordMap = [];
          $axios.get(mapJsonPath).then((mapJson) => {
            let mapFeatures = mapJson;
            mapFeatures.features.forEach((f) => {
              if (sysConfig.geoPostionCoordMap[f.properties.name])
                // 使用自己的坐标
                geoCoordMap[f.properties.name] =
                  sysConfig.geoPostionCoordMap[f.properties.name];
              else geoCoordMap[f.properties.name] = f.geometry.coordinates[0];
            });
            $echarts.registerMap(areaName, mapFeatures);
            loadedMap[areaName] = true;
            renderMapData();
          });
        }
      });
    };

    const handleIndexChange = (name, index) => {
      if (viewIndex.value === index) return;
      viewIndex.value = index;
      loadMapData();
    };

    onMounted(() => {});

    return {
      mapChart,
      loadMapData,
      legendList,
      icons,
      viewIndex,
      indexList,
      handleIndexChange,
      barColor,
    };
  },
};
</script>
<style scoped>
.chart-bg {
  position: relative;
  width: 100%;
  height: 100%;
}
.map-bg {
  position: absolute;
  left: 17%;
  top: 0;
  height: 100%;
  width: 70%;
}
.map-chart {
  width: 100%;
  height: 100%;
}
.legend-group {
  position: absolute;
  top: 20px;
  font-size: 12px;
  color: #52586d;
  line-height: 18px;
}
.legend-icon {
  display: inline-block;
  width: 16px;
  height: 8px;
  margin-right: 8px;
}
.view-type {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  bottom: 0px;
  left: 0px;
  font-size: 12px;
  color: #52586d;
  z-index: 99;
}
.view-item {
  display: flex;
  margin-right: 16px;
  cursor: pointer;
}
</style>
