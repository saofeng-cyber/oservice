<template>
  <div class="page-wrapper">
    <el-row class="row-1" :gutter="15">
      <el-col :span="14">
        <div class="card-left card-4-angle">
          <MapHeader ref="mapHeader" @handleBack="handleBack" />
          <div class="map-top">
            <el-row :gutter="12">
              <el-col
                :span="8"
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
            @handleMapSelect="handleMapSelect"
            @handleMapChange="handleMapChange"
          ></Map>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="card-right card-with-title card-2">
          <RanList :tableData="tableData" tableHeigh="396"></RanList>
        </div>
        <div class="card-right card-with-title card-3">
          <ContrastChart
            ref="ContrastChart"
            :title="'开通满意度一各省季度对比分析999'"
          ></ContrastChart>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-2" :gutter="15">
      <el-col :span="12">
        <div class="case-distribution card-with-title">
          <div class="float-title">
            <i class="el-icon-caret-right"></i>
            开通满意度排名
          </div>
        </div>
        <div class="leftcard">
          <div class="card-bottom card-with-title card-1">
            <WarnRanking1
              ref="refWarn_1"
              :title="'开通满意度分省排名'"
            ></WarnRanking1>
          </div>
          <div class="card-bottom card-with-title card-1">
            <WarnRanking1
              ref="refWarn_2"
              :title="'开通满意度分省排名'"
            ></WarnRanking1>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card-bottom card-with-title card-2">
          <LineChart
            ref="refLineChart"
            :title="'开通满意度近30日增长趋势'"
            @lineChartRefresh="lineChart_Refresh"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/topicsupport/Map.vue";
import LineChart from "@/components/common/LineChart.vue";
import MapTopCard from "@/components/common/MapTopCard.vue";
import RanList from "@/components/common/RanList.vue";
import ContrastChart from "@/components/common/ContrastChart.vue";
import MapHeader from "@/components/common/MapHeader.vue";
import WarnRanking1 from "@/components/emergency/WarnRanking1.vue";

import { ref } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import { computed } from '@vue/reactivity';

export default {
  components: {
    Map,
    LineChart,
    MapTopCard,
    RanList,
    ContrastChart,
    MapHeader,
    WarnRanking1,
  },
  data() {
    return {
      // curCard: "开通满意度",
    };
  },
  created() {},
  setup() {
    const { proxy } = getCurrentInstance();
    const $axios = inject("$axios");
    const postUrl = "/ser-govplat-comservice/api/rest/commService/v1/getData";
    const mapTopCardList = ref([]); // 地图上方卡片数据
    const tableData = ref([]); // 省份各期数据
    const mapData2 = ref({}); // 云南各市数据
    const curCard = ref("开通满意度");
    const refLineChart = ref({}); // 开通满意度近 30 日增长趋势
    const mapData = ref({
      names: [],
      maxValues: [],
      info: [],
    }); // 地图数据}
    // 业务满意度
    let refBusiSatis = ref();
    // 开通满意度分省排名
    let refSpurWarn = ref(null);
    // 开通满意度-各省季度对比分析
    let quarterLine = ref(null);
    const isNation = ref(true); // 是否是全国视图
    const mapHeader = ref(""); // 地图标题
    const mapChart = ref(null);
      // 获取左侧菜单
      const $topstore = inject('$topstore');
      let leftMenus = computed(() => $topstore.getters["layout/getLeftMenus"]);
      // 打开浮动的左菜单
      const showLeftMenu = ref(false);
      const openLeftMenu = (menu) => {
        $topstore.dispatch("global/openDialog", {
          type:'iframe',
          app:{
            entry: menu.menuUrl
          }
        });
      }
    // const curCard = ref('开通满意度')
    let refWarn_1 = ref("");
    let refWarn_2 = ref("");
    const lineChart_Refresh = () => {};

    const handleMapChange = (region) => {
      isNation.value = region.id === "0";
      mapHeader.value.setTitle(
        "满意度可视化" + (region.id === "0" ? "" : "-" + region.name)
      );
      mapHeader.value.setIsNation(isNation.value);
      initProvinceData();
      initCustumer();
    };
    const initProvinceData = () => {
      const data = {
        jsonFile: "Satisfaction.json",
        desc: "满意度可视化",
        spe: "5g",
      };
      $axios
        .post(postUrl, data)
        .then((d) => {
          console.log("请求结果",d);
          mapTopCardList.value = d.data.mapTopCardList;
          mapData.value = d.data.mapData2;
          refLineChart.value.setValues(d.data.trendLine2);
          tableData.value = d.data.tableData_yn;
        })
        .then(() => {
          mapChart.value.loadMapData();
        });
    };
    //初始化数据接口
    const getSatData = () => {
      $axios
        .post("/ser-govplat-comservice/api/rest/commService/v1/getData", {
          desc: "满意度可视化",
          spe: "5g",
          jsonFile: "Satisfaction.json",
        })
        .then((resp) => {
          console.log(resp, "<0-----------");
          mapData.value = resp.data.mapData;
          tableData.value = resp.data.analysisList.tableData1;
          mapTopCardList.value = resp.data.mapTopCardList;
          refWarn_1.value.setRanking(resp.data.province1);
          refWarn_2.value.setRanking(resp.data.province2);
          refLineChart.value.setValues(resp.data.trendLine);
          // refBusiSatis.value.setValues(3,6,9);
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
          // tableData.value = res.data.analysisList.tableData_yn;
        });
    };

    onMounted(() => {
      getSatData();
      mapHeader.value.setTitle("满意度可视化");
      // refBusiSatis.value.setValues(1,23,3);
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
      // initCustumer,
      mapTopCardList,
      tableData,
      mapData2,
      curCard,
      showLeftMenu,
      leftMenus,
      openLeftMenu
    };
  },
};
</script>

<style scoped>
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
}
.card-right.card-1 {
  height: 280px;
  margin-bottom: 15px;
}
.card-right.card-2 {
  min-height: 220px;
  margin-bottom: 15px;
}
.card-right.card-3 {
  height: 200px;
}

.card-bottom.card-1 {
  width: 48%;
}
.card-bottom.card-2 {
  height: 256px;
}
.leftcard {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.case-distribution {
  width: 100%;
  overflow: hidden;
  color: #fff;
  float: left;
}
.float-title {
  margin: 10px 0;
}
.float-menu-btn {
  position: absolute;
  top: 220px;
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
  top: 220px;
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
</style>