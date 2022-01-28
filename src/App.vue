<template>
  <div
    class="govcharts-main"
    id="govchartdiv-id"
    :style="mainStyle"
  >
    <el-container
      direction="vertical"
      style="height:100%;"
    >
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        v-show="showstand"
      >
        <el-sub-menu
          :index="index + item.name"
          v-for="(item, index) of showmenus"
          :key='index + item.name'
        >
          <template #title> {{item.name}}</template>
          <el-menu-item
            v-for="(citem, cindex) of item.childrens"
            :key='cindex + citem.path'
            @click="toIndex(citem.path)"
          >
            {{citem.name}}</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div :style="govChartStyle">
        <router-view id="govcharts-id"></router-view>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      indexurl: 'report',
      showstand: false,
      govChartStyle: {},
      mainStyle: {},
      showmenus: [
        {
          name: "5G",
          childrens: [
            {
              name: "质量可视化",
              path: "/5g/quality"
            }, {
              name: "资源可视化",
              path: "/5g/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/5g/visualization"
            }, {
              name: "满意度可视化",
              path: "/5g/satisfaction"
            }, {
              name: "质量可视化-Light",
              path: "/5g/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/5g/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/5g/light/visualization"
            }, {
              name: "满意度可视化-Light",
              path: "/5g/light/satisfaction"
            }, {
              name: "满意度可视化-Light1",
              path: "/5g/light/satisfaction"
            }, {
              name: "5G全景概览-Light1",
              path: "/5g/light/OverViewFg"
            }, {
              name: "5G业务质量-Light1",
              path: "/5g/light/qualityserve"
            }, {
              name: "告警可视化-Light",
              path: "/5g/light/alarm"
            }, {
              name: "及时率可视化-Light",
              path: "/5g/light/timelyrate"
            }
          ]
        },
        {
          name: "专线",
          childrens: [
            {
              name: "质量可视化",
              path: "/group/quality"
            }, {
              name: "资源可视化",
              path: "/group/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/group/visualization"
            }, {
              name: "满意度可视化",
              path: "/group/satisfaction"
            },
            {
              name: "质量可视化-Light",
              path: "/group/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/group/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/group/light/visualization"
            }, {
              name: "满意度可视化-Light",
              path: "/group/light/satisfaction"
            }, {
              name: "资源可视化-管理视图",
              path: "/group/light/resourcevisualizationgl"
            }
          ]
        },
        {
          name: "物联网",
          childrens: [
            {
              name: "质量可视化",
              path: "/iot/quality"
            }, {
              name: "资源可视化",
              path: "/iot/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/iot/wide"
            }, {
              name: "满意度可视化",
              path: "/iot/satisfaction"
            },
            {
              name: "质量可视化-Light",
              path: "/iot/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/iot/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/iot/light/wide"
            }, {
              name: "满意度可视化-Light",
              path: "/iot/light/satisfaction"
            }
          ]
        },
        {
          name: "企宽",
          childrens: [
            {
              name: "质量可视化",
              path: "/bBroad/quality"
            }, {
              name: "资源可视化",
              path: "/bBroad/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/bBroad/visBroad"
            }, {
              name: "满意度可视化",
              path: "/bBroad/satisfaction"
            }, {
              name: "质量可视化-Light",
              path: "/bBroad/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/bBroad/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/bBroad/light/visBroad"
            }, {
              name: "满意度可视化-Light",
              path: "/bBroad/light/satisfaction"
            }
          ]
        },
        {
          name: "云网",
          childrens: [
            {
              name: "质量可视化",
              path: "/cNet/quality"
            }, {
              name: "资源可视化",
              path: "/cNet/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/cNet/visualization"
            }, {
              name: "满意度可视化",
              path: "/cNet/satisfaction"
            },
            {
              name: "质量可视化-Light",
              path: "/cNet/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/cNet/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/cNet/light/visualization"
            }, {
              name: "满意度可视化-Light",
              path: "/cNet/light/satisfaction"
            }
          ]
        },
        {
          name: "云视讯",
          childrens: [
            {
              name: "质量可视化",
              path: "/cVideo/quality"
            }, {
              name: "资源可视化",
              path: "/cVideo/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/cVideo/visualization"
            }, {
              name: "满意度可视化",
              path: "/cVideo/satisfaction"
            },
            {
              name: "质量可视化-Light",
              path: "/cVideo/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/cVideo/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/cVideo/light/visualization"
            }, {
              name: "满意度可视化-Light",
              path: "/cVideo/light/satisfaction"
            }
          ]
        },
        {
          name: "千里眼",
          childrens: [
            {
              name: "质量可视化",
              path: "/sCamera/quality"
            }, {
              name: "资源可视化",
              path: "/sCamera/resourcevisualization"
            }, {
              name: "流程可视化",
              path: "/sCamera/visualization"
            }, {
              name: "满意度可视化",
              path: "/sCamera/satisfaction"
            },
            {
              name: "质量可视化-Light",
              path: "/sCamera/light/quality"
            }, {
              name: "资源可视化-Light",
              path: "/sCamera/light/resourcevisualization"
            }, {
              name: "流程可视化-Light",
              path: "/sCamera/light/visualization"
            }, {
              name: "满意度可视化-Light",
              path: "/sCamera/light/satisfaction"
            }
          ]
        }

      ]
    }
  },
  mounted () {
    if (!window.__POWERED_BY_QIANKUN__ && window.location.hostname == 'localhost')
      this.showstand = true;
    window.addEventListener("resize", () => {
      this.resizeData();
    })
  },
  watch: {
    $route (to) {
      console.log('123123123123123123123', to);
      if (to && to.path && to.path.indexOf('/light/') > -1) {
        this.mainStyle = {
          "background-image": "none",
          "background-color": "#F7F8FB"
        };
      }
      if (to.path.indexOf("5g/light") > -1) {
        return;
      }
      let _this = this;
      var box = document.getElementById("govcharts-id");
      if (box == null) {
        //首次加载
        setTimeout(function () { 
          // _this.resizeData(); 
          }, 500)
      } else {
        // _this.resizeData();
      }
    }
  },

  methods: {
    toIndex (url) {
      if (url && url.indexOf('/light/') > -1) {
        this.mainStyle = {
          "background-image": "none",
          "background-color": "#F7F8FB"
        };
      }
      this.$router.push(url);
    }, resizeData () {
      //当前窗口的高度
      var box = document.getElementById("govcharts-id");
      let equipmentwidth = box.clientWidth;
      let equipmentheight = box.clientHeight;

      //视窗的高度 govchartdiv-id
      //var docEl = document.documentElement;
      var docEl = document.getElementById("govcharts");
      let equipmentsheight = docEl.clientHeight;
      let ratioEquipment = docEl.clientWidth / equipmentwidth;

      //独立运行-70h
      if (!window.__POWERED_BY_QIANKUN__ && window.location.hostname == 'localhost')
        equipmentsheight = equipmentsheight - 70;
      let ratioEquipmentheight = equipmentsheight / equipmentheight;
      this.govChartStyle = {
        "background-position": "0% 0%",
        transform: `scale(${ratioEquipment}, ${ratioEquipmentheight})`,
        "transform-origin": "0 0",
        "height": equipmentheight * ratioEquipmentheight + "px"
      };
    }
  }
}
</script>
<style>
.layout {
  width: 100%;
  height: calc(100%-70px);
  text-align: center;
}

.govcharts-main {
  min-height: 100%;
  width: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("~@/assets/common/Body-BG.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: initial;
  background-clip: inherit;
  background-origin: initial;
}

.govcharts-main *{
  padding: 0;
  margin: 0;
}
.govcharts-main .card-4-angle {
  background-image: url("~@/assets/common/Corner-TL.png"),
    url("~@/assets/common/Corner-TR.png"), url("~@/assets/common/Corner-BL.png"),
    url("~@/assets/common/Corner-BR.png");
  background-position: -5px -6px, calc(100% + 5px) -6px, -5px calc(100% + 6px),
    calc(100% + 5px) calc(100% + 6px);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-color: rgba(0, 0, 0, 0.32);
  box-shadow: 0px 1px 0px 0px rgba(102, 226, 251, 0.24),
    0px -1px 0px 0px rgba(102, 226, 251, 0.24);
}

.govcharts-main .card-with-title {
  background-image: url("~@/assets/common/Decorate-L.png");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.32);
  box-shadow: 0px 0px 6px -2px rgba(255, 255, 255, 0);
}
</style>
