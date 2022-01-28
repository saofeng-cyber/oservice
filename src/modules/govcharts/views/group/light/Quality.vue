<template>
  <div class="page-wrapper">
    <el-row
      class="row-1"
      :gutter="15"
    >
      <el-col :span="14">
        <div
          class="card-left"
          style="position:relative;"
        >
          <img
            class="floated-image"
            src="@/assets/resource/toubu-light.png"
          />
          <MapHeader
            ref="mapHeader"
            :hideTime="true"
            @handleBack="handleBack"
          />
          <div class="map-top">
            <el-row :gutter="12">
              <el-col
                :span="6"
                v-for="(item, index) in mapTopCardList"
                :key="index"
              >
                <MapTopCard
                  :data="item"
                  :isActive="curCard === item.name"
                  @handleCardChange="handleCardChange"
                />
              </el-col>
            </el-row>
          </div>
          <div v-if="!isNation">
            <div
              class="float-menu-btn"
              @mouseenter="showLeftMenu = true"
              @mouseleave="showLeftMenu = false"
            >
              <div class="float-menu-btn-inner">
                <i class="el-icon-s-unfold"></i>
              </div>
            </div>
            <div
              class="float-menu-body"
              v-show="showLeftMenu"
              @mouseenter="showLeftMenu = true"
              @mouseleave="showLeftMenu = false"
            >
              <div
                class="link"
                v-for="(menu, $index) in leftMenus"
                :key="$index"
                @click="openLeftMenu(menu)"
              >
                {{ menu.menuCnname }}
              </div>
            </div>
          </div>
          <Map
            ref="mapChart"
            :data="mapData"
            :curCard="curCard"
            @handleMapChange="handleMapChange"
          ></Map>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="card-right card-1">
          <BusiSatis
            ref="refBusiSatis"
            style="height: 280px;"
          ></BusiSatis>
        </div>
        <div
          class="card-right card-2"
          style="margin-left:-4px;margin-right:-4px;"
        >
          <Rotate ref="rotate" />
        </div>
        <div class="card-right card-3">
          <EffectWarning ref="refEffectWarning"></EffectWarning>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="row-2"
      :gutter="15"
    >
      <el-col
        :span="12"
        style="background-color:#fff;"
      >
        <div class="case-distribution">
          <div class="float-title">
            <span class="i"></span>
            业务可用度分省排名
          </div>
        </div>
        <div class="leftcard">
          <div class="card-bottom card-1">
            <WarnRanking1
              ref="refWarn_1"
              :title="'开通满意度分省排名'"
            ></WarnRanking1>
          </div>
          <div class="card-bottom card-1">
            <WarnRanking1
              ref="refWarn_2"
              :title="'开通满意度分省排名'"
            ></WarnRanking1>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card-bottom card-2">
          <LineChart
            ref="refLineChart"
            :title="'业务可用率近30日变化趋势'"
            @lineChartRefresh="lineChart_Refresh"
            style="height: 256px;"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/topicsupport/MapLight.vue";
import BusiSatis from "@/components/topicsupport/BusiSatisLight.vue";
import LineChart from "@/components/common/LineChartLight.vue";
import MapTopCard from "@/components/common/MapTopCardLight.vue";
import MapHeader from "@/components/common/MapHeaderLight.vue";
import WarnRanking1 from "@/components/emergency/WarnRanking1Light.vue";
import EffectWarning from "@/components/qualityservice/EffectWarningLight"
import Rotate from '@/components/common/RotateLight.vue'

import { ref } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import { computed } from "@vue/reactivity";

export default {
  components: {
    Map,
    BusiSatis,
    LineChart,
    MapTopCard,
    MapHeader,
    WarnRanking1,
    EffectWarning,
    Rotate
  },
  setup () {
    const { proxy } = getCurrentInstance();
    const $axios = inject("$axios");
    const postUrl = "/ser-govplat-comservice/api/rest/commService/v1/getData";
    const mapTopCardList = ref([]); // 地图上方卡片数据
    const mapData2 = ref({}); // 云南各市数据
    const curCard = ref();
    const refLineChart = ref({}); // 开通满意度近 30 日增长趋势
    let refEffectWarning = ref('')
    let rotate = ref('')
    const mapData = ref({
      names: [],
      maxValues: [],
      info: [],
    }); // 地图数据}
    // 业务满意度
    const refBusiSatis = ref();
    // 开通满意度分省排名
    const refSpurWarn = ref(null);
    // 开通满意度-各省季度对比分析
    const quarterLine = ref(null);
    const isNation = ref(true); // 是否是全国视图
    const mapHeader = ref(""); // 地图标题
    const mapChart = ref(null);
    // 获取左侧菜单
    const $topstore = inject("$topstore");
    const leftMenus = computed(() => $topstore.getters["layout/getLeftMenus"]);
    // 打开浮动的左菜单
    const showLeftMenu = ref(false);
    const openLeftMenu = (menu) => {
      $topstore.dispatch("global/openDialog", {
        type: "iframe",
        app: {
          entry: menu.menuUrl,
        },
      });
    };
    const refWarn_1 = ref("");
    const refWarn_2 = ref("");
    const lineChart_Refresh = () => { };

    const handleMapChange = (region) => {
      isNation.value = region.id === "0";
      mapHeader.value.setTitle(
        "质量可视化" + (region.id === "0" ? "" : "-" + region.name)
      );
      mapHeader.value.setIsNation(isNation.value);
      initProvinceData();
      initCustumer();
    };
    const initProvinceData = () => {
      const data = {
        jsonFile: "Satisfaction.json",
        desc: "质量可视化",
        spe: "group",
      };
      $axios
        .post(postUrl, data)
        .then((d) => {
          console.log(d);
          mapTopCardList.value = d.data.mapTopCardList;
          mapData.value = d.data.mapData2;
          refLineChart.value.setValues(d.data.trendLine2);
          refBusiSatis.value.setLabel("弱光率", "宽带利用率", "时延")
          refBusiSatis.value.setValues(
            d.data.refBusiSatis2[0],
            d.data.refBusiSatis2[1],
            d.data.refBusiSatis2[2]
          );
        })
        .then(() => {
          mapChart.value.loadMapData();
        });
    };
    //初始化数据接口
    const getSatData = () => {
      $axios
        .post("/ser-govplat-comservice/api/rest/commService/v1/getData", {
          desc: "质量可视化",
          spe: "group",
          jsonFile: "Satisfaction.json",
        })
        .then((resp) => {
          console.log(resp, "<0-----------");
          mapData.value = resp.data.mapData;
          mapTopCardList.value = resp.data.mapTopCardList;
          refWarn_1.value.setRanking(resp.data.province1);
          refWarn_2.value.setRanking(resp.data.province2);
          refLineChart.value.setValues(resp.data.trendLine);
          refBusiSatis.value.setLabel("弱光率", "宽带利用率", "时延")
          refBusiSatis.value.setValues(
            resp.data.refBusiSatis[0],
            resp.data.refBusiSatis[1],
            resp.data.refBusiSatis[2]
          );
        })
        .then(() => {
          mapChart.value.loadMapData();
        });
    };
    //切换地市数据
    const handleBack = () => {
      // 返回全国视图
      mapChart.value.onBackDblclick();
      getSatData();
    };
    const handleCardChange = (item) => {
      if (item.name === proxy.curCard) return;
      proxy.curCard = item.name;
    };

    // 各省数据接口
    const initCustumer = () => {
      const data = { jsonFile: "onecaseyn.json", desc: "满意度", spe: "5g" };
      $axios
        .post("/ser-govplat-comservice/api/rest/commService/v1/getData", data)
        .then((res) => {
          refWarn_1.value.setRanking(res.data.province1);
          refWarn_2.value.setRanking(res.data.province2);
          refWarn_2.refBusiSatis2.setValues(res.data.refBusiSatis2);
        });
    };

    onMounted(() => {
      // table.value.setTableH(500)
      getSatData();
      mapHeader.value.setTitle("质量可视化");
      // --TODO: 网络质量-影响业务告警--
      const url = '/ser-govplat-comservice/api/rest/commService/v1/getData'
      refEffectWarning.value.setTitle('网络质量-影响业务告警');
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "group",
        "jsonFile": "quality_and_visualization_network_yunnan.json"
      }).then(res => refEffectWarning.value.setValue(res))

      rotate.value.setTitle('故障专线分析');
      rotate.value.setValue([
        { name: '数据专线', num: 30, effect: 5, line: 15 },
        { name: '互联网专线', num: 30, effect: 5, line: 15 },
        { name: 'MPLS_VPN', num: 40, effect: 5, line: 15 },
        { name: '政企专网', num: 60, effect: 5, line: 15 },
      ]);
    });

    return {
      refBusiSatis,
      lineChart_Refresh,
      refLineChart,
      refSpurWarn,
      quarterLine,
      handleMapChange,
      isNation,
      mapHeader,
      getSatData,
      mapData,
      mapChart,
      handleBack,
      handleCardChange,
      refWarn_1,
      refWarn_2,
      mapTopCardList,
      mapData2,
      curCard,
      showLeftMenu,
      leftMenus,
      openLeftMenu,
      refEffectWarning,
      rotate
    };
  },
};
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
.page-wrapper {
  padding: 15px;
}

.page-wrapper * {
  box-sizing: border-box;
}

.row-1 {
  margin-bottom: 15px;
}

.card-left {
  height: 100%;
  background-color: #fff;
}

.card-right.card-1 {
  height: 300px;
  margin-bottom: 15px;
  background-color: #fff;
}

.card-right.card-2 {
  height: 236px;
  margin-bottom: 15px;
  background-color: #fff;
}

.card-right.card-3 {
  height: 144px;
  background-color: #fff;
}

.card-bottom.card-1 {
  width: 48%;
  background-color: #fff;
}

.card-bottom.card-2 {
  height: 256px;
  background-color: #fff;
}

.leftcard {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}

.case-distribution {
  width: 100%;
  overflow: hidden;
  float: left;
  background-color: #fff;
}

.float-title {
  margin: 10px 0;
}

.float-menu-btn {
  position: absolute;
  top: 300px;
  left: 24px;
  color: #66e2fb;
  font-size: 18px;
  cursor: pointer;
  padding-right: 15px;
  z-index: 10;
}

.float-menu-btn-inner {
  border: 1px solid #66e2fb;
  padding: 3px 3px 0 3px;
}

.float-menu-body {
  position: absolute;
  top: 300px;
  left: 56px;
  color: #66e2fb;
  font-size: 12px;
  padding: 15px;
  z-index: 10;
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

.float-menu-body .link {
  cursor: pointer;
}

.float-menu-body .link:not(:last-child) {
  margin-bottom: 5px;
}

.floated-image {
  position: absolute;
  top: 7px;
  right: 10px;
}
</style>
