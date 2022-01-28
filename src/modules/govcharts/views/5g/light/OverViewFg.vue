<template>
  <!-- 界面元素 -->
  <div class="page-wrapper1">
    <el-row class="row-1" :gutter="15">
      <!-- 左上角 -->
      <el-col :span="6">
        <div class="card-left card-1">
          <div class="case-distribution">
            <div class="float-title">
              <span class="i"></span>
              <span @click="gongdanXingqing('业务发展')" class="pointer"
                >业务发展</span
              >

              <img
                class="pointer"
                style="float: right; padding: 8px 40px 0 0"
                @click="zhiBiaoListSwitch('前')"
                :src="require('@/static/img/Icon-ArrowRight.png')"
              />
              <img
                class="pointer"
                style="float: right; padding: 8px 30px 0 0"
                @click="zhiBiaoListSwitch('后')"
                :src="require('@/static/img/Icon-ArrowLeft.png')"
              />
              <div class="float-title-right">
                <i
                  class="el-icon-setting"
                  style="float: right"
                  @click="
                    busiSetting();
                    dialogTitle = '业务发展配置';
                    dialogVisible = true;
                  "
                ></i>
              </div>
            </div>
          </div>
          <div
            class="
              dp-top-left-top-panel
              dp-top-left-top-panel-49
              dp-top-left-top-panel-49-new
            "
            v-for="(item, index) in dpdata.showlist"
            :key="index"
            v-show="startZhibiao <= index && index < endZhibiao"
          >
            <div
              style="float: left; height: 100%; width: 70%; padding-top: 1.5vh"
              class="pointer"
              @click="gongdanXingqing(item.INDEX_ITEM)"
            >
              {{ item["INDEX_ITEM"]
              }}<span
                style="
                  color: deepskyblue;
                  font-weight: bold;
                  display: block;
                  line-height: 20px;
                "
                >{{ zhibiaodata[item.INDEX_ITEM_EN] }}</span
              >
            </div>
            <div
              style="float: left; height: 100%; width: 30%; text-align: center"
            >
              <img
                class="pointer"
                @click="zhibiaoChanges(item.INDEX_ITEM, item.INDEX_ITEM_EN)"
                style="width: 90%; margin-top: 2.5vh"
                :src="iconArray[index % 8].icon"
              />
            </div>
          </div>
        </div>
        <div class="card-left card-2">
          <el-select
            v-model="dropDownValue1"
            @change="setRankTitle()"
            placeholder="开卡数"
            size="small"
            style="
              width: 100px;
              padding-right: 10px;
              float: right;
              padding-top: 5px;
              z-index: 99;
            "
          >
            <el-option
              v-for="item in dropDownOptions1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="TOP行业" name="first"></el-tab-pane>
            <el-tab-pane label="TOP客户" name="second"></el-tab-pane>
          </el-tabs>

          <WarnRanking
            ref="warnRank1"
            :Title="rank1Title"
            :RankingData="ywToplist"
            v-show="activeName == 'first'"
          ></WarnRanking>
          <WarnRanking
            ref="warnRank2"
            :RankingData="kktopList"
            :Title="rank2Title"
            v-show="activeName == 'second'"
          ></WarnRanking>
        </div>
      </el-col>
      <!-- 中间区域 -->
      <el-col :span="12">
        <!-- 中间区域上半部分 -- 地图 -->

        <div
          class="card-left"
          style="
            height: 70vh;
            background-color: transparent;
            position: relative;
          "
        >
          <ExcelExport
            :TableDatas="excelData"
            :FileName="fileName"
            style="
              position: absolute;
              z-index: 99;
              top: 10px;
              right: 0px;
              width: 20px;
              height: 20px;
            "
            class="pointer"
          ></ExcelExport>
          <MapHeader
            ref="mapHeader"
            style="width: 100%"
            class="pointer"
            @click="backToDefault()"
          />
          <el-select
            v-model="dropDownValue"
            placeholder="全部行业"
            style="width: 150px"
            size="small"
          >
            <el-option
              v-for="(item, index) in dpdata.industrylist"
              :key="item.INDUSTRY_NAME"
              :label="item.INDUSTRY_NAME"
              :value="item.INDUSTRY_NAME"
              @click="changeTrade(index)"
            >
            </el-option>
          </el-select>

          <div class="map-top" style="float: right">
            <div style="z-index: 99">
              <el-radio-group v-model="radio2" size="small">
                <el-radio-button
                  label="全部"
                  @click="handleCardChange('')"
                ></el-radio-button>
                <el-radio-button
                  label="优享"
                  @click="handleCardChange('优')"
                ></el-radio-button>
                <el-radio-button
                  label="专享"
                  @click="handleCardChange('专')"
                ></el-radio-button>
                <el-radio-button
                  label="尊享"
                  @click="handleCardChange('尊')"
                ></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <Map
            ref="mapChart"
            style="height: calc(100% - 70px)"
            @handleMapChange="handleMapChange"
            @handleBack="handleBack"
            :data="mapData"
            :cur-card="curCard"
          ></Map>
        </div>
        <!-- 地图下边区域-业务质量概况 -->
        <div
          class="card-left"
          style="margin-top: 1vh; height: 27vh; position: relative"
        >
          <div class="float-title">
            <span class="i"></span>
            <span class="pointer" @click="gongdanXingqing('业务质量')"
              >业务质量</span
            >
            <el-select
              v-model="dropDownValue2"
              placeholder="粒度选择"
              style="
                width: 120px;
                position: absolute;
                cursor: pointer;
                right: 30px;
                top: 2px;
              "
              size="small"
            >
              <el-option
                v-for="(item, index) in granularityList"
                :key="item"
                :label="item"
                :value="item"
                @click="changeTrade(index)"
              >
              </el-option>
            </el-select>
            <div class="float-title-right">
              <i
                class="el-icon-setting"
                style="float: right"
                @click="
                  pieSettings();
                  dialogTitle2 = '业务质量指标配置';
                  dialogVisible2 = true;
                "
              ></i>
            </div>
          </div>
          <!--<RingChart
                      :ref="item.name"
                      style="height: 120%;width:23%;display: inline-block"
                      v-for="(item,index) in ringChartList"
                      :key="index"
                    />-->
          <RingChart
            :ref="item.name"
            style="height: calc(100% - 40px); width: 25%; display: inline-block"
            v-for="(item, index) in ringChartList"
            :key="index"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-right card-1">
          <div class="top-title">
            <div class="float-title">
              <span class="i"></span>
              <span @click="gongdanXingqing('网络运行')" class="pointer"
                >网络运行</span
              >
            </div>
            <div class="float-title-right" @click="selfRefresh">
              <i class="el-icon-refresh" style="float: right"></i>
            </div>
          </div>
          <el-radio-group
            style="text-align: center; width: 100%"
            v-model="warnSelected"
            size="small"
          >
            <el-radio-button
              label="告警总数"
              @click="
                zhibiaoChanges('告警总数', 'WARN_COUNT');
                initAlarmPie('告警总数');
              "
            >
              <div>告警总数</div>
              <div style="margin-top: 10px">
                {{ zhibiaodata.WARN_COUNT || 0 }}
              </div>
            </el-radio-button>
            <el-radio-button
              label="设备告警"
              @click="
                zhibiaoChanges('设备告警', 'EQUIPMENT_WARN');
                initAlarmPie('设备告警');
              "
            >
              <div>设备告警</div>
              <div style="margin-top: 10px">
                {{ zhibiaodata.EQUIPMENT_WARN || 0 }}
              </div>
            </el-radio-button>
            <el-radio-button
              label="业务告警"
              @click="
                zhibiaoChanges('业务告警', 'SERVE_WARN');
                initAlarmPie('业务告警');
              "
            >
              <div>业务告警</div>
              <div style="margin-top: 10px">
                {{ zhibiaodata.SERVE_WARN || 0 }}
              </div>
            </el-radio-button>
            <el-radio-button
              label="拨测告警"
              @click="
                zhibiaoChanges('拨测告警', 'BOCE_WARN');
                initAlarmPie('拨测告警');
              "
            >
              <div>拨测告警</div>
              <div style="margin-top: 10px">
                {{ zhibiaodata.BOCE_WARN || 0 }}
              </div>
            </el-radio-button>
          </el-radio-group>
          <div
            style="width: 100%; height: calc(100% - 145px); text-align: center"
          >
            <RingPieChart ref="ringPieChart"> </RingPieChart>
          </div>
          <div style="width: 100%; text-align: center">
            <div
              class="pointer"
              style="
                width: 40%;
                height: 100%;
                display: inline-block;
                margin: 0 4%;
                padding: 6px;
                background: #f9f9fc;
              "
              @click="zhibiaoChanges('影响客户数', 'INFLUNCE_CUST')"
            >
              <div>影响客户数</div>
              <div style="color: orange; margin-top: 6px">
                {{ zhibiaodata.INFLUNCE_CUST || 0 }}
              </div>
            </div>
            <div
              class="pointer"
              style="
                width: 40%;
                height: 100%;
                display: inline-block;
                margin: 0px 4%;
                padding: 6px;
                background: #f9f9fc;
              "
              @click="zhibiaoChanges('影响业务数', 'INFLUNCE_SERVE')"
            >
              <div>影响业务数</div>
              <div style="color: deepskyblue; margin-top: 6px">
                {{ zhibiaodata.INFLUNCE_SERVE || 0 }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-right card-2">
          <div class="float-title">
            <span class="i"></span>
            <span class="pointer" @click="gongdanXingqing('服务质量')"
              >服务质量</span
            >
            <el-switch
              v-model="swichBtn"
              active-color="#13ce66"
              inactive-color="#4a8af4"
              style="float: right; margin-top: 8px"
            >
            </el-switch>
          </div>
          <EffectWarningFgOverview
            style="width: 100%; height: calc(100% - 40px)"
            :RankingData="refEffectWarnings"
            v-if="!swichBtn"
          ></EffectWarningFgOverview>

          <div
            id="chart"
            ref="refChart"
            style="
              width: calc(100% - 45px);
              height: calc(100% - 40px);
              display: inline-block;
            "
            v-show="swichBtn"
          ></div>
          <div
            v-show="swichBtn"
            style="width: 40px; height: 135px; display: inline-block"
          >
            <!--<div-->
            <!--@click="gongdanXingqing(0)"-->
            <!--class=""-->
            <!--style="position: absolute;z-index:99;height: 25px;-->
            <!--margin-top:0%;color: orange"-->
            <!--&gt;{{kanchazongshu}}-->
            <!--</div>-->
            <!--<div-->
            <!--@click="gongdanXingqing(1)"-->
            <!--class=""-->
            <!--style="position: absolute;z-index:99;height: 25px;-->
            <!--margin-top:1.5%;color: cornflowerblue"-->
            <!--&gt;{{kaitongzongshu}}-->
            <!--</div>-->
            <!--<div-->
            <!--@click="gongdanXingqing(2)"-->
            <!--class=""-->
            <!--style="position: absolute;z-index:99;height: 25px;-->
            <!--margin-top:3%;color: green"-->
            <!--&gt;{{tousuzongshu}}-->
            <!--</div>-->
            <!--<div-->
            <!--@click="gongdanXingqing(3)"-->
            <!--class=""-->
            <!--style="position: absolute;z-index:99;height: 25px;-->
            <!--margin-top:4.5%;color: red"-->
            <!--&gt;{{guzhangzongshu}}-->
            <!--</div>-->
          </div>
        </div>
        <div class="card-right card-3">
          <div class="float-title">
            <span class="i"></span>
            <span class="pointer" @click="gongdanXingqing('满意度')"
              >满意度</span
            >
            <i class="el-icon-setting" style="float: right"></i>
          </div>
          <BusiSatis
            :style="{
              backgroundImage:
                'url(' + require('@/static/img/Chart-BG.png') + ')',
            }"
            style="
              background-repeat: no-repeat;
              background-size: 100% 100%;
              height: calc(100% - 40px);
            "
            :Values="myddata"
            v-if="ismyddata"
            ref="refBusiSatis"
          ></BusiSatis>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-2" :gutter="15" v-if="ismyddata">
      <el-col :span="6">
        <div class="card-bottom card-1">
          <LineChart
            ref="refLineChart"
            :chartsData="lineChartsData1"
            @lineChartRefresh="lineChart_Refresh"
            style="height: 256px; display: inline-block"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-bottom card-1">
          <LineChart
            ref="refLineChart"
            :chartsData="lineChartsData2"
            @lineChartRefresh="lineChart_Refresh"
            style="height: 256px"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-bottom card-1">
          <LineChart
            ref="refLineChart"
            :chartsData="lineChartsData3"
            @lineChartRefresh="lineChart_Refresh"
            style="height: 256px"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-bottom card-1">
          <LineChart
            ref="refLineChart"
            :chartsData="lineChartsData4"
            @lineChartRefresh="lineChart_Refresh"
            style="height: 256px"
          />
        </div>
      </el-col>
    </el-row>
    <!-- 弹框组件 -->
    <div class="dialog-dataaaa">
      <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
        <div style="width: 100%; height: 80vh; overflow-y: auto">
          <el-table :data="tableData" align="center" style="width: 100%">
            <el-table-column prop="INDEX_ITEM" label="指标名称">
            </el-table-column>
            <el-table-column label="是否展示">
              <template #default="scope">
                <el-link
                  style="color: cornflowerblue"
                  @click="indexShowClick(scope.$index)"
                  >{{ scope.row.IS_SHOW }}</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>

      <el-dialog :title="dialogTitle2" v-model="dialogVisible2" width="50%">
        <div style="width: 100%; height: 80vh; overflow-y: auto">
          <el-table :data="indextableData" align="center" style="width: 100%">
            <el-table-column prop="INDEX_ITEM" label="指标名称">
            </el-table-column>
            <el-table-column label="是否展示">
              <template #default="scope">
                <el-link @click="indexDataShowClick(scope.$index, scope.row)">{{
                  scope.row.IS_SHOW
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="呈现方式">
              <template #default="scope">
                <el-select v-model="scope.row.SHOW_FORM" placeholder="请选择">
                  <el-option
                    v-for="item in indexShowType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="changePieType(item.value, scope.row)"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>

      <el-dialog :title="iframeTitle" v-model="dialogVisible1" width="80%">
        <iframe
          :src="gongDanUrl"
          style="width: 100%; height: 80vh; border: 0"
          frameborder="0"
          scrolling="auto"
        ></iframe>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";
import Map from "@/components/topicsupport/CommonMap";
import LineChart from "@/components/common/LineChartLightFg.vue";
import MapTopCard from "@/components/common/MapTopCardLightFg";
import WarnRanking from "@/components/emergency/WarnRankingLightFg";
import TableDialog from "@/components/common/TableDialogLightFg";
import { provide } from "vue";
import MapHeader from "@/components/common/MapHeaderLightFg";
import BusiSatis from "@/components/topicsupport/BusiSatisLight";
import EffectWarningFgOverview from "@/components/qualityservice/EffectWarningFgOverview";
import RingPieChart from "@/components/common/RingPieChartFg.vue";
import RingChart from "@/components/common/CircleProgressBarFg";
import ExcelExport from "@/components/common/ExcelExport";

export default {
  components: {
    MapHeader,
    TableDialog,
    LineChart,
    Map,
    WarnRanking,
    ExcelExport,
    BusiSatis,
    EffectWarningFgOverview,
    RingPieChart,
    RingChart,
  },
  setup() {
    let sysConfig = {};
    let preid = "all";
    let bigJson = ref("");
    let dpdata = ref("");
    let zhibiaodata = ref([]);
    let kktopList = ref([]);
    let ywToplist = ref([]);
    let refEffectWarnings = ref([]);
    let zhengchang = ref([]);
    let yujing = ref([]);
    let chaoshi = ref([]);
    let myddata = ref([]);
    let ismyddata = ref(false);
    let lineChartsData1 = ref({});
    let lineChartsData2 = ref({});
    let lineChartsData3 = ref({});
    let lineChartsData4 = ref({});
    let xdata = ref([]);
    let yAxis1 = ref([]);
    let yAxis2 = ref([]);
    let yAxis3 = ref([]);
    let yAxis4 = ref([]);
    let yAxis12 = ref([]);
    let yAxis13 = ref([]);
    let yAxis22 = ref([]);
    let yAxis23 = ref([]);
    let yAxis32 = ref([]);
    let yAxis33 = ref([]);
    let yAxis42 = ref([]);
    let yAxis43 = ref([]);
    let radios1 = ref("影响客户数");
    let iframeTitle = ref("");
    let dialogTitle = ref("");
    let dialogTitle2 = ref("");
    let swichBtn = ref(true);
    let refLineChart = ref("");
    let startZhibiao = ref(0);
    let endZhibiao = ref(8);

    let indexShowType = ref([
      {
        value: "饼图",
        label: "饼图",
      },
      {
        value: "仪表盘",
        label: "仪表盘",
      },
      {
        value: "环形图",
        label: "环形图",
      },
      {
        value: "水球图",
        label: "水球图",
      },
    ]);

    let kanchazongshu = ref([]);
    let kaitongzongshu = ref([]);
    let tousuzongshu = ref([]);
    let guzhangzongshu = ref([]);
    let warnSelected = ref("告警总数");

    const changePieType = (val, e) => {
      console.log(val);
      console.log(e);
      dpdata.value.configlist.forEach(function (item) {
        if (item.INDEX_ITEM_EN == e.INDEX_ITEM_EN) {
          item.SHOW_FORM = val;
        }
      });
      initRingPieData(dpdata);
    };
    let iconArray = ref([
      {
        icon: require("@/static/img/SIcon-A.png"),
      },
      {
        icon: require("@/static/img/SIcon-B.png"),
      },
      {
        icon: require("@/static/img/SIcon-C.png"),
      },
      {
        icon: require("@/static/img/SIcon-D.png"),
      },
      {
        icon: require("@/static/img/SIcon-E.png"),
      },
      {
        icon: require("@/static/img/SIcon-F.png"),
      },
      {
        icon: require("@/static/img/SIcon-F.png"),
      },
      {
        icon: require("@/static/img/SIcon-G.png"),
      },
    ]);

    let rank1Data = [];
    let rank2Data = [];

    let mapData = ref({
      area_name: "", //默认传空，地市下钻时传递地市名称
      info: {},
      list: [],
    });
    let mapChart = ref("");
    let packageName = ref(""); //优专尊
    let industryName = ref(""); //优专尊

    const dataFormate = (date) => {
      var date = new Date(date);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return MM + DD;
    };
    // 声明axios
    const $axios = inject("$axios");
    const url = "/ser-govplat-comservice/api/rest/commService/v1/getData";
    const queryDataUrl = "/ser-ge-main/api/v1/tgedpdatacontroller/getFgDpData";
    const queryDataUrl2 =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getFgDpData2";
    const queryTopDataUrl =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getFgDpTopData";
    let orgtype = ref("省");
    let orgname = ref("");
    const queryTopData = function () {
      $axios
        .post(queryTopDataUrl, {
          orgType: orgtype.value,
          city: orgname.value,
          industryName: industryName.value,
          timeType: dropDownValue2.value,
          packageName: packageName.value,
          tabType: activeName.value == "second" ? "客户" : "行业",
          indexType: dropDownValue1.value,
        })
        .then((res) => {
          console.log(res);
          kktopList.value = [];
          ywToplist.value = [];
          res.topList.forEach(function (item, index) {
            if (
              item.TAB_TYPE == "客户" &&
              item.INDEX_TYPE == dropDownValue1.value
            ) {
              kktopList.value.push({
                province: item.NAME,
                color: "#4e89a4",
                num: item.VALUE || item.COUNT,
                process: item.VALUE || item.COUNT,
                rank: item.RANK,
              });
            } else if (
              item.TAB_TYPE == "行业" &&
              item.INDEX_TYPE == dropDownValue1.value
            ) {
              ywToplist.value.push({
                province: item.NAME,
                color: "#4e89a4",
                num: item.VALUE || item.COUNT,
                process: item.VALUE || item.COUNT,
                rank: item.RANK,
              });
            }
          });
        });
    };
    const queryData = function (orgType, city) {
      let url = queryDataUrl;
      if (sysConfig.dataShowType == "实时查询") {
        url = queryDataUrl2;
      }
      $axios
        .post(url, {
          orgType: orgtype.value,
          city: orgname.value,
          industryName: industryName.value,
          timeType: dropDownValue2.value,
          packageName: packageName.value,
          tabType: activeName.value == "second" ? "客户" : "行业",
          indexType: dropDownValue1.value,
        })
        .then((res) => {
          myddata.value = [
            { val: res.data.FG_MYD_KT || 100, name: "开通满意度" },
            { val: res.data.FG_MYD_GZ || 100, name: "故障满意度" },
            { val: res.data.FG_MYD_TS || 100, name: "投诉满意度" },
          ];

          refEffectWarnings.value = [
            {
              name: "资源勘查",
              values: res.data.FG_FWZL_ZYKC,
              rate: res.data.ZYCK_JSL,
            },
            {
              name: "业务开通",
              values: res.data.FG_FWZL_YWKT,
              rate: res.data.YWKT_JSL,
            },
            {
              name: "投诉处理",
              values: res.data.FG_FWZL_TSCL,
              rate: res.data.TSCL_JSL,
            },
            {
              name: "故障处理",
              values: res.data.FG_FWZL_GZCL,
              rate: res.data.GZCL_JSL,
            },
          ];

          zhibiaodata.value = res.data;
          kktopList.value = [];
          ywToplist.value = [];
          let tradeDataExport = [];
          let busiDataExport = [];
          res.kkToplist.forEach(function (item, index) {
            if (
              item.TAB_TYPE == "客户" &&
              item.INDEX_TYPE == dropDownValue1.value
            ) {
              kktopList.value.push({
                province: item.NAME,
                color: "#4e89a4",
                num: item.VALUE || item.COUNT,
                process: item.VALUE || item.COUNT,
                rank: item.RANK,
              });

              tradeDataExport.push({
                行业名称: item.NAME,
                开卡数: item.VALUE || item.COUNT,
              });
            } else if (
              item.TAB_TYPE == "行业" &&
              item.INDEX_TYPE == dropDownValue1.value
            ) {
              ywToplist.value.push({
                province: item.NAME,
                color: "#4e89a4",
                num: item.VALUE || item.COUNT,
                process: item.VALUE || item.COUNT,
                rank: item.RANK,
              });

              busiDataExport.push({
                地市: item.CITY_NAME,
                业务总量: item.VALUE || item.COUNT,
                客户总量: item.VALUE || item.COUNT,
              });
            }
          });
          /*res.ywToplist.forEach(function (item, index) {
  ywToplist.value.push({
    province: item.CITY_NAME,
    color: '#4e89a4',
    num: item.FG_GM_YWZL,
    process: item.FG_GM_YWZL / 10,
    rank: item.VALUE / 100
  })

  busiDataExport.push({
    "地市": item.CITY_NAME,
    "业务总量": item.FG_GM_YWZL,
    "客户总量": item.FG_GM_KHZL
  })
})*/

          zhengchang.value.push();
          yujing.value.push(
            res.data.FG_ORDER_GZ_YJ,
            res.data.FG_ORDER_TS_YJ,
            res.data.FG_ORDER_KT_YJ,
            res.data.FG_ORDER_KC_YJ
          );
          chaoshi.value.push(
            res.data.FG_ORDER_GZ_CS,
            res.data.FG_ORDER_TS_CS,
            res.data.FG_ORDER_KT_CS,
            res.data.FG_ORDER_KC_CS
          );
          option.series[0].data = [
            res.data.FG_ORDER_GZ_ZC,
            res.data.FG_ORDER_TS_ZC,
            res.data.FG_ORDER_KT_ZC,
            res.data.FG_ORDER_KC_ZC,
          ];
          option.series[1].data = yujing.value;
          option.series[2].data = chaoshi.value;
          kaitongzongshu.value =
            parseInt(res.data.FG_ORDER_KT_YJ) +
            parseInt(res.data.FG_ORDER_KT_CS) +
            parseInt(res.data.FG_ORDER_KT_ZC);
          kanchazongshu.value =
            parseInt(res.data.FG_ORDER_KC_YJ) +
            parseInt(res.data.FG_ORDER_KC_CS) +
            parseInt(res.data.FG_ORDER_KC_ZC);
          tousuzongshu.value =
            parseInt(res.data.FG_ORDER_TS_YJ) +
            parseInt(res.data.FG_ORDER_TS_CS) +
            parseInt(res.data.FG_ORDER_TS_ZC);
          guzhangzongshu.value =
            parseInt(res.data.FG_ORDER_GZ_YJ) +
            parseInt(res.data.FG_ORDER_GZ_CS) +
            parseInt(res.data.FG_ORDER_GZ_ZC);

          //右上角 告警数据导出
          let warnDataExport = [
            {
              告警总数: zhibiaodata.value.WARN_COUNT,
              设备告警: zhibiaodata.value.EQUIPMENT_WARN,
              业务告警: zhibiaodata.value.SERVE_WARN,
              拨测告警: zhibiaodata.value.BOCE_WARN,
              影响客户数: zhibiaodata.value.INFLUNCE_CUST,
              影响业务数: zhibiaodata.value.INFLUNCE_SERVE,
            },
          ];
          //服务质量导出
          let serveQualityExport = [
            {
              资源勘查: res.data.FG_FWZL_ZYKC,
              资源勘查数量: res.data.FG_FWZL_ZYKC,
              "及时率-勘察": res.data.FG_FWZL_ZYKC + "%",
              业务开通: res.data.FG_FWZL_YWKT,
              业务开通数量: res.data.FG_FWZL_YWKT,
              "及时率-开通": res.data.FG_FWZL_YWKT + "%",
              投诉处理: res.data.FG_FWZL_TSCL,
              投诉处理数量: res.data.FG_FWZL_TSCL,
              "及时率-投诉": res.data.FG_FWZL_TSCL + "%",
              故障处理: res.data.FG_FWZL_GZCL,
              故障处理数量: res.data.FG_FWZL_GZCL,
              "及时率-故障": res.data.FG_FWZL_GZCL + "%",
            },
          ];

          dpdata.value = res;
          dpdata.value.industrylist.unshift({ INDUSTRY_NAME: "全部" });
          dpdata.value.showlist = [];
          dpdata.value.indexshowlist = [];
          initLineChartData(dpdata);
          var index = 0;
          dpdata.value.configlist.map((item) => {
            if (item.MODULE == "业务发展" && item.IS_SHOW == "是") {
              dpdata.value.showlist.push(item);
              index++;
            }
            if (
              item.MODULE == "业务质量" &&
              item.IS_SHOW == "是" &&
              index < 8
            ) {
              dpdata.value.indexshowlist.push(item);
              index++;
            }
          });
          //地图数据导出
          let mapExportData = [];
          res.gmlist.forEach(function (item, index) {
            mapExportData.push({
              地市名称: item.CITY_NAME,
              客户总量:
                item.TOTAL_CUST_YOU +
                item.TOTAL_CUST_ZHUAN +
                item.TOTAL_CUST_ZUN,
              "客户量-优": item.TOTAL_CUST_YOU,
              "客户量-专": item.TOTAL_CUST_ZHUAN,
              "客户量-尊": item.TOTAL_CUST_ZUN,
            });
          });

          mapData.value.area_name = city || "";
          mapData.value.info = dpdata.value.data;
          mapData.value.list = dpdata.value.gmlist;

          ismyddata.value = true;
          mapChart.value.loadMapData();
          initCharts();

          initAlarmPie();

          initRingPieData(dpdata);
          //左上角指标导出-业务发展
          let str = {};
          res.configlist.forEach(function (item, index) {
            str[item.INDEX_ITEM] = res.gmlist[0][item.INDEX_ITEM_EN];
          });
          //工单数据导出
          let workOrderDataExport = [
            {
              工单类型: "勘察",
              正常: res.data.FG_ORDER_KC_ZC,
              预警: res.data.FG_ORDER_KC_YJ,
              超时: res.data.FG_ORDER_KC_CS,
            },
            {
              工单类型: "开通",
              正常: res.data.FG_ORDER_KT_ZC,
              预警: res.data.FG_ORDER_KT_YJ,
              超时: res.data.FG_ORDER_KT_CS,
            },
            {
              工单类型: "投诉",
              正常: res.data.FG_ORDER_TS_ZC,
              预警: res.data.FG_ORDER_TS_YJ,
              超时: res.data.FG_ORDER_TS_CS,
            },
            {
              工单类型: "故障",
              正常: res.data.FG_ORDER_GZ_ZC,
              预警: res.data.FG_ORDER_GZ_YJ,
              超时: res.data.FG_ORDER_GZ_CS,
            },
          ];
          //业务质量导出数据
          let busiQualityExport = [
            {
              平均PDU会话数: res.data.PDU_AVG,
              最大PDU会话数: res.data.PDU_MAX,
              平均QOS会话数: res.data.QOS_AVG,
              最大QOS会话数: res.data.QOS_MAX,
            },
          ];
          let mydExport = [
            {
              开通满意度: res.data.FG_MYD_CL,
              故障满意度: res.data.FG_MYD_KH,
              投诉满意度: res.data.FG_MYD_JF,
            },
          ];

          excelData.value.push({ sheetName: "业务发展", tableList: [str] });
          excelData.value.push({
            sheetName: "Top行业",
            tableList: tradeDataExport,
          });
          excelData.value.push({
            sheetName: "业务数据",
            tableList: busiDataExport,
          });
          excelData.value.push({
            sheetName: "地图数据",
            tableList: mapExportData,
          });

          excelData.value.push({
            sheetName: "业务告警",
            tableList: warnDataExport,
          });
          excelData.value.push({
            sheetName: "服务质量",
            tableList: serveQualityExport,
          });
          excelData.value.push({
            sheetName: "工单数量",
            tableList: workOrderDataExport,
          });
          excelData.value.push({
            sheetName: "业务质量",
            tableList: busiQualityExport,
          });
          excelData.value.push({ sheetName: "满意度", tableList: mydExport });
        });
    };
    let configBusiList = [
      {
        name: "客户数",
        value: "2",
        icon: require("@/static/img/SIcon-A.png"),
        isShow: true,
      },
      {
        name: "行业数",
        value: "2",
        icon: require("@/static/img/SIcon-B.png"),
        isShow: true,
      },
      {
        name: "开卡数",
        value: "2",
        icon: require("@/static/img/SIcon-C.png"),
        isShow: true,
      },
      {
        name: "项目数",
        value: "2",
        icon: require("@/static/img/SIcon-D.png"),
        isShow: true,
      },
      {
        name: "设备数",
        value: "2",
        icon: require("@/static/img/SIcon-E.png"),
        isShow: true,
      },
      {
        name: "在线用户数",
        value: "2",
        icon: require("@/static/img/SIcon-F.png"),
        isShow: true,
      },
      {
        name: "活跃用户数",
        value: "2",
        icon: require("@/static/img/SIcon-F.png"),
        isShow: true,
      },
      {
        name: "活跃用户占比",
        value: "2",
        icon: require("@/static/img/SIcon-G.png"),
        isShow: true,
      },

      {
        name: "通用切片",
        value: "2",
        icon: require("@/static/img/SIcon-A.png"),
        isShow: false,
      },
      {
        name: "专用切片",
        value: "2",
        icon: require("@/static/img/SIcon-B.png"),
        isShow: false,
      },
      {
        name: "通用DNN",
        value: "2",
        icon: require("@/static/img/SIcon-C.png"),
        isShow: false,
      },
      {
        name: "专用DNN",
        value: "2",
        icon: require("@/static/img/SIcon-D.png"),
        isShow: false,
      },
      {
        name: "园区UPF",
        value: "2",
        icon: require("@/static/img/SIcon-E.png"),
        isShow: false,
      },
      {
        name: "园区MEC",
        value: "2",
        icon: require("@/static/img/SIcon-F.png"),
        isShow: false,
      },
      {
        name: "5G基站",
        value: "2",
        icon: require("@/static/img/SIcon-F.png"),
        isShow: false,
      },
      {
        name: "边缘云数",
        value: "2",
        icon: require("@/static/img/SIcon-G.png"),
        isShow: false,
      },

      {
        name: "开卡数",
        value: "2",
        icon: require("@/static/img/SIcon-A.png"),
        isShow: false,
      },
      {
        name: "正常数",
        value: "2",
        icon: require("@/static/img/SIcon-B.png"),
        isShow: false,
      },
      {
        name: "待激活数",
        value: "2",
        icon: require("@/static/img/SIcon-C.png"),
        isShow: false,
      },
      {
        name: "营业停机数",
        value: "2",
        icon: require("@/static/img/SIcon-D.png"),
        isShow: false,
      },
      {
        name: "注册用户数",
        value: "2",
        icon: require("@/static/img/SIcon-E.png"),
        isShow: false,
      },
      {
        name: "注册用户占比",
        value: "2",
        icon: require("@/static/img/SIcon-F.png"),
        isShow: false,
      },
      {
        name: "设备数",
        value: "2",
        icon: require("@/static/img/SIcon-F.png"),
        isShow: false,
      },
      {
        name: "在线用户数",
        value: "2",
        icon: require("@/static/img/SIcon-G.png"),
        isShow: false,
      },
    ];
    let mapHeader = ref("");
    let dialogVisible = ref(false);
    let dialogVisible1 = ref(false);
    let dialogVisible2 = ref(false);
    let dialogVisibleTow = ref(false);
    let dialogVisibleTow1 = ref(false);
    let refWarn_1 = ref("");
    let refWarn_2 = ref("");

    let refPullOut = ref("");
    let lineTitle = ref("在线用户数近30天增长趋势");
    // 地图顶部的卡片初始化
    let curCard = ref("在线用户数");
    let mapTopCardList = ref([]);
    let ringPieChart = ref("");

    let warnRank1 = ref("");
    let warnRank2 = ref("");

    let ringChart = ref("");
    let ringChart1 = ref("");
    let ringChart2 = ref("");
    let ringChart3 = ref("");
    let activeName = ref("first");
    let activeName1 = ref("second1");
    let dropDownOptions = ref("");
    let dropDownValue = ref("");
    let dropDownValue2 = ref("天");
    let granularityList = ref(["15分钟", "小时", "天", "月"]);
    let dropDownOptions1 = ref("");
    let dropDownValue1 = ref("开卡数");
    let $echarts = inject("$echarts");
    let chart = null;
    let gongDanUrl = ref(
      "/5G/plugins/fg/order/vieworderinfo.jsp?current_state=2&ordertype=explore"
    );

    const refChart = ref(null);
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: { data: ["正常", "预警", "超时"] },
      grid: {
        top: "12%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: ["故障", "投诉", "开通", "勘察"],
      },
      series: [
        {
          name: "正常",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            color: "#91CC75",
          },
          data: zhengchang.value,
        },
        {
          name: "预警",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            color: "#5470C6",
          },
          data: yujing.value,
        },
        {
          name: "超时",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          itemStyle: {
            color: "#FAC858",
          },
          data: chaoshi.value,
        },
        {
          name: "总计",
          type: "bar",
          stack: "total",
          label: {
            show: true,
            position: "inside",
            padding: [0, 0, 0, 30],
            formatter: function (params) {
              if (params.name == "勘察") {
                return kanchazongshu.value;
              } else if (params.name == "开通") {
                return kaitongzongshu.value;
              } else if (params.name == "投诉") {
                return tousuzongshu.value;
              } else if (params.name == "故障") {
                return guzhangzongshu.value;
              } else {
                return "";
              }
            },
          },
          emphasis: {
            focus: "series",
          },
          data: [0, 0, 0, 0],
        },
      ],
    };
    const initCharts = function () {
      chart = $echarts.init(refChart.value);
      chart.setOption(option, true);
      chart.on("click", (params) => {
        if (params.name == "勘察") {
          gongdanXingqing(0);
        } else if (params.name == "开通") {
          gongdanXingqing(1);
        } else if (params.name == "投诉") {
          gongdanXingqing(2);
        } else if (params.name == "故障") {
          gongdanXingqing(3);
        } else {
          return "";
        }
      });
    };

    const setRankTitle = () => {
      if (sysConfig.dataShowType == "实时查询") {
        queryTopData();
      } else {
        kktopList.value = [];
        ywToplist.value = [];
        dpdata.value.kkToplist.forEach(function (item, index) {
          if (
            item.TAB_TYPE == "客户" &&
            item.INDEX_TYPE == dropDownValue1.value
          ) {
            kktopList.value.push({
              province: item.NAME,
              color: "#4e89a4",
              num: item.VALUE,
              process: item.VALUE,
              rank: item.RANK,
            });
          } else if (
            item.TAB_TYPE == "行业" &&
            item.INDEX_TYPE == dropDownValue1.value
          ) {
            ywToplist.value.push({
              province: item.NAME,
              color: "#4e89a4",
              num: item.VALUE,
              process: item.VALUE,
              rank: item.RANK,
            });
          }
        });
      }
    };
    // 业务质量-接入指标
    let accessQuotaRef = ref(null);
    /** ----------------------------TODO 地图初始化 ---------------------------------------------- */
    let isNation = ref(true); // 是否是全国视图
    // 获取左侧菜单
    const $topstore = inject("$topstore");
    let leftMenus;
    if ($topstore)
      leftMenus = computed(() => $topstore.getters["layout/getLeftMenus"]);
    // 打开浮动的左菜单
    const showLeftMenu = ref(false);
    const dialogClick = (val) => {
      setTableHeader(val);
      provide("tableHeaderConfig", tableHeader);
    };
    const initAlarmPie = (val) => {
      ringPieChart.value.setTitle("网络运行概况");
      if (val == "设备告警") {
        ringPieChart.value.setValues({
          title: "",
          info: [
            {
              num: "39.42%",
              name: "核心侧网元告警\t" + dpdata.value.data.CORE_NET_ALARM,
              color: "#0066ff",
              value: dpdata.value.data.CORE_NET_ALARM,
            },
            {
              num: "39.01%",
              name: "传输侧网元告警\t" + dpdata.value.data.TRANS_NET_ALARM,
              color: "#2fc479",
              value: dpdata.value.data.TRANS_NET_ALARM,
            },
            {
              num: "26.56%",
              name: "接入侧网元告警\t" + dpdata.value.data.ACCESS_NET_ALARM,
              color: "#fdb527",
              value: dpdata.value.data.ACCESS_NET_ALARM,
            },
            {
              num: "26.56%",
              name: "承载侧网元告警\t" + dpdata.value.data.BEARER_NET_ALARM,
              color: "#9df6fd",
              value: dpdata.value.data.BEARER_NET_ALARM,
            },
          ],
        });
      } else if (val == "业务告警") {
        ringPieChart.value.setValues({
          title: "",
          info: [
            {
              num: "39.42%",
              name: "业务质差告警\t" + dpdata.value.data.BUSI_QUALITY_ALARM,
              color: "#0066ff",
              value: dpdata.value.data.BUSI_QUALITY_ALARM,
            },
            {
              num: "39.01%",
              name:
                "业务中断告警\t" + dpdata.value.data.BUSI_INTERRUPTION_ALARM,
              color: "#2fc479",
              value: dpdata.value.data.BUSI_INTERRUPTION_ALARM,
            },
          ],
        });
      } else if (val == "拨测告警") {
        ringPieChart.value.setValues({
          title: "",
          info: [
            {
              num: "39.42%",
              name:
                "拨测劣化告警数\t" + dpdata.value.data.DIAL_DETERIORATION_ALARM,
              color: "#0066ff",
              value: dpdata.value.data.DIAL_DETERIORATION_ALARM,
            },
            {
              num: "39.01%",
              name:
                "拨测中断告警数\t" + dpdata.value.data.DIAL_INTERRUPTION_ALARM,
              color: "#2fc479",
              value: dpdata.value.data.DIAL_INTERRUPTION_ALARM,
            },
          ],
        });
      } else {
        ringPieChart.value.setValues({
          title: "",
          info: [
            {
              num: "39.42%",
              name: "设备告警 \t" + dpdata.value.data.EQUIPMENT_WARN,
              color: "#0066ff",
              value: dpdata.value.data.EQUIPMENT_WARN,
            },
            {
              num: "39.01%",
              name: "业务告警\t" + dpdata.value.data.SERVE_WARN,
              color: "#2fc479",
              value: dpdata.value.data.SERVE_WARN,
            },
            {
              num: "39.01%",
              name: "拨测告警\t" + dpdata.value.data.BOCE_WARN,
              color: "#faf640",
              value: dpdata.value.data.BOCE_WARN,
            },
          ],
        });
      }
    };

    const initLineChartData = (e, flag) => {
      let li = [];
      e.value.configlist.forEach(function (item, index) {
        if (item.MODULE == "业务质量" && item.IS_SHOW == "是") li.push(item);
      });

      for (var i = e.value.trendlist.length - 1; i--; i >= 0) {
        let item = e.value.trendlist[i];
        xdata.value.push(dataFormate(item.CDATE));
        yAxis1.value.push(item[li[0].INDEX_ITEM_KEY || li[0].INDEX_ITEM_EN]);
        yAxis2.value.push(item[li[1].INDEX_ITEM_KEY || li[1].INDEX_ITEM_EN]);
        yAxis3.value.push(item[li[2].INDEX_ITEM_KEY || li[2].INDEX_ITEM_EN]);
        yAxis4.value.push(item[li[3].INDEX_ITEM_KEY || li[3].INDEX_ITEM_EN]);
        yAxis12.value.push(
          item[(li[0].INDEX_ITEM_KEY || li[0].INDEX_ITEM_EN) + "_ZR"]
        );
        yAxis13.value.push(
          item[(li[0].INDEX_ITEM_KEY || li[0].INDEX_ITEM_EN) + "_YZ"]
        );
        yAxis22.value.push(
          item[(li[1].INDEX_ITEM_KEY || li[1].INDEX_ITEM_EN) + "_ZR"]
        );
        yAxis23.value.push(
          item[(li[1].INDEX_ITEM_KEY || li[1].INDEX_ITEM_EN) + "_YZ"]
        );
        yAxis32.value.push(
          item[(li[2].INDEX_ITEM_KEY || li[2].INDEX_ITEM_EN) + "_ZR"]
        );
        yAxis33.value.push(
          item[(li[2].INDEX_ITEM_KEY || li[2].INDEX_ITEM_EN) + "_YZ"]
        );
        yAxis42.value.push(
          item[(li[3].INDEX_ITEM_KEY || li[3].INDEX_ITEM_EN) + "_ZR"]
        );
        yAxis43.value.push(
          item[(li[3].INDEX_ITEM_KEY || li[3].INDEX_ITEM_EN) + "_YZ"]
        );
      }
      lineChartsData1.value = {
        title: li[0].INDEX_ITEM,
        title2: "昨日" + li[0].INDEX_ITEM,
        title3: "阈值",
        tag: { name1: li[0].INDEX_ITEM },
        xAxisData: xdata,
        yAxisData1: yAxis1,
        yAxisData2: yAxis12,
        yAxisData3: yAxis13,
      };
      lineChartsData2.value = {
        title: li[1].INDEX_ITEM,
        title2: "昨日" + li[1].INDEX_ITEM,
        title3: "阈值",
        tag: { name1: li[1].INDEX_ITEM },
        xAxisData: xdata,
        yAxisData1: yAxis2,
        yAxisData2: yAxis22,
        yAxisData3: yAxis23,
      };
      lineChartsData3.value = {
        title: li[2].INDEX_ITEM,
        title2: "昨日" + li[2].INDEX_ITEM,
        title3: "阈值",
        tag: { name1: li[2].INDEX_ITEM },
        xAxisData: xdata,
        yAxisData1: yAxis3,
        yAxisData2: yAxis32,
        yAxisData3: yAxis33,
      };
      lineChartsData4.value = {
        title: li[3].INDEX_ITEM,
        title2: "昨日" + li[3].INDEX_ITEM,
        title3: "阈值",
        tag: { name1: li[3].INDEX_ITEM },
        xAxisData: xdata,
        yAxisData1: yAxis4,
        yAxisData2: yAxis42,
        yAxisData3: yAxis43,
      };

      if (flag) refLineChart.value.initCharts();
    };

    const initRingPieData = (e) => {
      let li = [];
      e.value.configlist.forEach(function (item, index) {
        if (item.MODULE == "业务质量" && item.IS_SHOW == "是") li.push(item);
      });
      ringChart.value.setValue([
        {
          title: li[0].INDEX_ITEM,
          num: e.value.data[li[0].INDEX_ITEM_KEY || li[0].INDEX_ITEM_EN],
          name: "网络业务",
          number: e.value.data[li[0].INDEX_ITEM_KEY || li[0].INDEX_ITEM_EN],
          type: li[0].SHOW_FORM,
        },
      ]);
      ringChart1.value.setValue([
        {
          title: li[1].INDEX_ITEM,
          num: e.value.data[li[1].INDEX_ITEM_KEY || li[1].INDEX_ITEM_EN],
          name: "网络业务",
          number: e.value.data[li[1].INDEX_ITEM_KEY || li[1].INDEX_ITEM_EN],
          type: li[1].SHOW_FORM,
        },
      ]);
      ringChart2.value.setValue([
        {
          title: li[2].INDEX_ITEM,
          num: e.value.data[li[2].INDEX_ITEM_KEY || li[2].INDEX_ITEM_EN],
          name: "网络业务",
          number: e.value.data[li[2].INDEX_ITEM_KEY || li[2].INDEX_ITEM_EN],
          type: li[2].SHOW_FORM,
        },
      ]);
      ringChart3.value.setValue([
        {
          title: li[3].INDEX_ITEM,
          num: e.value.data[li[3].INDEX_ITEM_KEY || li[3].INDEX_ITEM_EN],
          name: "网络业务",
          number: e.value.data[li[3].INDEX_ITEM_KEY] || li[3].INDEX_ITEM_EN,
          type: li[3].SHOW_FORM,
        },
      ]);
    };
    const openLeftMenu = (menu) => {
      $topstore.dispatch("global/openDialog", {
        type: "iframe",
        app: {
          entry: menu.menuUrl,
        },
      });
    };

    const backToDefault = () => {
      mapData.value.index_list = [
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
      ];
      mapChart.value.loadMapData();
    };
    const zhibiaoChanges = (name, val) => {
      mapData.value.index_list = [
        {
          name: name,
          column: val,
        },
      ];
      mapChart.value.loadMapData();
    };

    const dataExportTest = () => {
      excelExport.value.btnClickExport();
    };

    /**------------------------------------ */

    // ---------------------------------------> 下钻 子组件双击后传给父级的数据   云南数据
    function handleMapChange(val) {
      console.log("打印下钻数据");
      console.log(val);
      orgtype.value = "地市";
      orgname.value = val.name;
      queryData("地市", val.name);
    }

    // ----------------------------------------------------------------------->>返回
    const handleBack = () => {
      // 返回全国视图
      orgtype.value = "省";
      orgname.value = "";
      queryData("省");
    }; // 返回

    /** ----------------------------------------与弹框组件数据交互------------------------------------------------- */
    let tableInfoUrl = ref("");
    let tableDatas = ref(); // 声明 表格数据
    let tableHeader = ref([]); // 声明 表头
    let tableData = ref([]);
    let indextableData = ref([]);
    let radio2 = ref("全部");
    let excelData = ref([]);
    let fileName = ref("5G全景概况");
    let excelDataStr = ref([]);
    let excelExport = ref("");
    let ringChartList = ref([
      {
        name: "ringChart",
        status: true,
      },
      {
        name: "ringChart1",
        status: true,
      },
      {
        name: "ringChart2",
        status: true,
      },
      {
        name: "ringChart3",
        status: true,
      },
    ]);
    // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表格, 4.将响应数据发送给子组件
    //设置弹出表头
    const setTableHeader = (val) => {
      console.log(val);
      tableData.value = [
        {
          number: {
            value: 1,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9; font-weight: 600;",
          },
          sex: {
            value: "A",
            style:
              "color: #F9A400;border: 2px solid #F9A400;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          option: {
            value: "金牌",
            style: "color: #FFCE57;",
          },
          test1: {
            value: "昆明",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "霍咏",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: 18345681564,
            style: "color: #dfe4e9;",
          },
        },
        {
          number: {
            value: 2,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9;font-weight: 600;",
          },
          sex: {
            value: "B",
            style:
              "color: #2DC277;border: 2px solid #2DC277;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          option: {
            value: "标准",
            style: "color: #4CE2FF;",
          },
          test1: {
            value: "昆明",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "霍咏",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: 18345681564,
            style: "color: #dfe4e9;",
          },
        },
      ];
      switch (val) {
        case "客户数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "客户名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "客户编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "行业数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "行业名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "客户编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "开卡数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "号卡名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "客户编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "项目数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "项目名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "项目编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "项目行业",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "设备数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "设备名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "设备实例标识",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "在线用户数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "用户名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "用户编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "活跃用户数":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "用户名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "用户编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
        case "活跃用户占比":
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "用户名称",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "用户编号",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "联系电话",
              order: true,
              width: "220px",
              sortable: true,
            },
            {
              fieldName: "option",
              label: "客户等级",
              order: true,
              width: "220px",
              sortable: true,
            },
          ];
          break;
      }
    };

    function searchShow(val) {
      tableDatas.value = [];
      if (val && val.dialogVisible) {
        // -------------------->没有表单的情况
        // 查询条件
        console.log(val.condition); // 从子组件传来的查询条件
        // TODO 接口
        $axios
          .post(url, {
            desc: "质量可视化",
            spe: "5g",
            jsonFile: "quality_and_visualization_table.json",
          })
          .then((res) => {
            // 设置表头
            tableHeader.value = [
              {
                fieldName: "test1",
                label: "客户名称",
                order: true,
                width: "250px",
                sortable: true,
              },
              {
                fieldName: "test4",
                label: "省份",
                order: true,
                width: "200px",
                sortable: true,
              },
              {
                fieldName: "test2",
                label: "客户服务模式",
                order: true,
                width: "200px",
                sortable: true,
              },
              {
                fieldName: "test3",
                label: "客户行业",
                order: true,
                width: "200px",
                sortable: true,
              },
            ];
            // 表格数据
            tableDatas.value = res;
            console.log("-=-=-=-=-=-=-=-=-=后台-=-=-=-=-==--=");
            console.log(res);
          });
        dialogVisible.value = val.dialogVisible;
      } else {
        // -------------------------->有表单的情况
        dialogVisibleTow.value = val;
      }
      $axios
        .post("/ser-govplat-comservice/api/rest/commService/v1/getURL", {
          spe: "5g",
          buz: "customer",
        })
        .then((res) => {
          tableInfoUrl = res;
        });
    }

    const zhiBiaoListSwitch = (type) => {
      if (type == "前" && startZhibiao.value < 16) {
        startZhibiao.value = parseInt(startZhibiao.value) + 8;
        endZhibiao.value = parseInt(endZhibiao.value) + 8;
      }

      if (type == "后" && startZhibiao.value >= 8) {
        startZhibiao.value = parseInt(startZhibiao.value) - 8;
        endZhibiao.value = parseInt(endZhibiao.value) - 8;
      }
      console.log(type + "|" + startZhibiao.value + "|" + endZhibiao.value);
    };

    // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表单, 4.将响应数据发送给子组件
    function getCondition(val) {
      let condition = val;
      console.log("-------表单的查询条件--------");
      console.log(condition);
      // TODO 接口
      $axios
        .post(url, {
          desc: "质量可视化",
          spe: "5g",
          jsonFile: "quality_and_visualization_table.json",
        })
        .then((res) => {
          // 设置表头
          tableHeader.value = [
            {
              fieldName: "test1",
              label: "客户名称",
              order: true,
              width: "250px",
              sortable: true,
            },
            {
              fieldName: "test4",
              label: "省份",
              order: true,
              width: "200px",
              sortable: true,
            },
            {
              fieldName: "test2",
              label: "客户服务模式",
              order: true,
              width: "200px",
              sortable: true,
            },
            {
              fieldName: "test3",
              label: "客户行业",
              order: true,
              width: "200px",
              sortable: true,
            },
          ];
          // 表格数据
          tableDatas.value = res;
        });
    }

    // 配置表头数据
    provide("tableHeaderConfig", tableHeader);
    // 配置单元格数据及属性/ 分页配置默认值
    provide("tableDataConfig", {
      page: {
        currentPage: 1,
        size: 10,
        total: 2,
      },
      tableData: tableDatas,
    });
    // 配置表单类型
    provide("formTypeConfig", [
      {
        label: "客户名称",
        type: "input",
        placeholder: "请输入. . .",
        value: "",
      },
      {
        label: "省份",
        type: "input",
        placeholder: "请输入. . .",
        value: "",
      },
      {
        label: "客户服务模式",
        type: "input",
        placeholder: "请输入. . .",
        value: "",
      },
      {
        label: "客户行业",
        type: "input",
        placeholder: "请输入. . .",
        value: "",
      },
    ]);

    // 获取表格组件返回的数据
    function getTableMessage(val) {
      if (val.scope) {
        $topstore.dispatch("global/openDialog", {
          type: "iframe",
          app: {
            entry: tableInfoUrl,
          },
        });
        dialogVisible.value = false;
        dialogVisibleTow.value = false;
      }
      $axios
        .post("/ser-govplat-comservice/api/rest/commService/v1/getURL", {
          spe: "5g",
          buz: "customer",
        })
        .then((res) => {
          tableInfoUrl = res;
        });
    }

    /** -----------------------------------------------END-------------------------------------------------- */

    /**
     * 点击卡片事件
     */
    const handleCardChange = (item) => {
      console.log(item);
      packageName.value = item;
      queryData("省", "");
    };
    // 业务质量-接入指标
    const accessQuotaRefresh = () => {
      console.log("业务质量-接入指标刷新按钮被点击");
    };
    const handleClick = (tab, event) => {
      console.log(tab, event);
      if (sysConfig.dataShowType == "实时查询") {
        queryTopData();
      }
    };

    const reloadMapData = (index) => {
      mapChart.value.handleChangeView("PDU", index);
    };

    const changeTrade = (index) => {
      industryName.value =
        dpdata.value.industrylist[index].INDUSTRY_NAME == "全部"
          ? ""
          : dpdata.value.industrylist[index].INDUSTRY_NAME;
      queryData("省", "");
    };

    //弹出表格父子组件通信
    const tableFunc = (data) => {
      console.log(data + "on parent" + tableData.value[data].test3.value);

      configBusiList[data].isShow = !configBusiList[data].isShow;
      if (tableData.value[data].test3.value == "显示") {
        tableData.value[data].test3.value = "隐藏";
      } else {
        tableData.value[data].test3.value = "显示";
      }
    };
    //优专尊数据切换
    const youzhuanzunSwitch = (val) => {
      mapChart.value.handleChangeView("PDU", val);
    };
    //左上角配置
    const busiSetting = () => {
      tableData.value = [];
      dpdata.value.configlist.map((item) => {
        if (item.MODULE == "业务发展") {
          tableData.value.push(item);
        }
      });
    };

    const indexShowClick = (row) => {
      let show = tableData.value[row].IS_SHOW;
      if ("是" == show) {
        tableData.value[row].IS_SHOW = "否";
      } else {
        tableData.value[row].IS_SHOW = "是";
      }
      var index = 0;
      dpdata.value.showlist = [];
      tableData.value.map((item) => {
        if (item.IS_SHOW == "是" && index < 8) {
          dpdata.value.showlist.push(item);
          index++;
        }
      });
    };

    //左上角配置
    const pieSettings = () => {
      indextableData.value = [];
      dpdata.value.configlist.map((item) => {
        if (item.MODULE == "业务质量") {
          indextableData.value.push(item);
        }
      });
    };

    const indexDataShowClick = (row, param) => {
      let show = indextableData.value[row].IS_SHOW;
      if ("是" == show) {
        indextableData.value[row].IS_SHOW = "否";
      } else {
        indextableData.value[row].IS_SHOW = "是";
      }
      var index = 0;
      dpdata.value.indexshowlist = [];
      indextableData.value.map((item) => {
        if (item.IS_SHOW == "是" && index < 8) {
          dpdata.value.indexshowlist.push(item);
          index++;
        }
      });
      console.log("param: ");
      console.log(param);
      dpdata.value.configlist.forEach(function (item) {
        if (item.INDEX_ITEM_EN == param.INDEX_ITEM_EN)
          item.IS_SHOW = param.IS_SHOW;
      });
      initRingPieData(dpdata);
      initLineChartData(dpdata, true);
    };

    const gongdanSetting = () => {
      tableHeader.value = [
        {
          fieldName: "test1",
          label: "工单类型",
          order: true,
          width: "220px",
          sortable: true,
        },
        {
          fieldName: "test2",
          label: "工单编号",
          order: true,
          width: "220px",
          sortable: true,
        },
        {
          fieldName: "test3",
          label: "工单状态",
          order: true,
          width: "220px",
          sortable: true,
        },
      ];

      tableData.value = [
        {
          number: {
            value: 1,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9; font-weight: 600;",
          },
          sex: {
            value: "A",
            style:
              "color: #F9A400;border: 2px solid #F9A400;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          test1: {
            value: "开通工单",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "3891",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: "显示",
            style: "color: #dfe4e9;",
          },
        },
        {
          number: {
            value: 2,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9;font-weight: 600;",
          },
          sex: {
            value: "B",
            style:
              "color: #2DC277;border: 2px solid #2DC277;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          test1: {
            value: "开通工单",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "3891",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: "显示",
            style: "color: #dfe4e9;",
          },
        },
      ];
    };

    const gongdanXingqing = (val) => {
      console.log("asdas: ---==: " + val);
      dialogVisible1.value = false;
      //getTokenVue();
      iframeTitle.value = val;
      switch (val) {
        case 0:
          gongDanUrl.value =
            "/5G/plugins/fg/order/vieworderinfo.jsp?current_state=2&ordertype=故障";
          iframeTitle.value = "故障工单列表";
          dialogVisible1.value = true;
          break;
        case 1:
          gongDanUrl.value =
            "/5G/plugins/fg/order/vieworderinfo.jsp?current_state=2&ordertype=投诉";
          iframeTitle.value = "投诉工单列表";
          dialogVisible1.value = true;
          break;
        case 2:
          gongDanUrl.value =
            "/5G/plugins/fg/order/vieworderinfo.jsp?current_state=2&ordertype=create";
          iframeTitle.value = "开通工单列表";
          dialogVisible1.value = true;
          break;
        case 3:
          gongDanUrl.value =
            "/5G/plugins/fg/order/vieworderinfo.jsp?current_state=2&ordertype=explore";
          iframeTitle.value = "勘察工单列表";
          dialogVisible1.value = true;
          break;
        case "客户数":
          gongDanUrl.value =
            "/5G/plugins/gedp/busiscalefg.jsp?model_name=t_ge_customer_project&module_id=tgecustomerproject";
          iframeTitle.value = "客户列表";
          dialogVisible1.value = true;
          break;
        case "行业数":
          gongDanUrl.value = "";
          dialogVisible1.value = false;
          break;
        case "开卡数":
          gongDanUrl.value =
            "/5G/plugins/gedp/busiscalefg.jsp?model_name=t_ge_res_5g_userinfo&module_id=t_ge_res_5g_userinfo";
          iframeTitle.value = "开卡列表";
          dialogVisible1.value = true;
          break;
        case "项目数":
          gongDanUrl.value = "";
          dialogVisible1.value = false;
          break;
        case "业务发展":
          gongDanUrl.value = "/5G/plugins/fg/resoverview.jsp";
          dialogVisible1.value = true;
          break;
        case "业务质量":
          gongDanUrl.value = "/5G/plugins/fg/quality/busquality/index.jsp";
          dialogVisible1.value = true;
          break;
        case "网络运行":
          gongDanUrl.value =
            "/5G/plugins/fg/t5gtabshow.jsp?pagename=netquality_all&closeShow=false";
          dialogVisible1.value = true;
          break;
        case "服务质量":
          gongDanUrl.value =
            "/5G/plugins/fg/businessstandard/tgeslabusi5G.jsp?PRODUCT=5G";
          dialogVisible1.value = true;
          break;
        case "满意度":
          gongDanUrl.value =
            "/5G/plugins/fg/satisfaction/satisfaction_fg.jsp?product=5G&module_id=satisfactionfg&module_name=satisfaction_fg";
          dialogVisible1.value = true;
          break;
      }
    };

    const mydSetting = () => {
      tableHeader.value = [
        {
          fieldName: "test1",
          label: "满意度类型",
          order: true,
          width: "220px",
          sortable: true,
        },
        {
          fieldName: "test2",
          label: "满意度",
          order: true,
          width: "220px",
          sortable: true,
        },
        {
          fieldName: "test3",
          label: "状态",
          order: true,
          width: "220px",
          sortable: true,
        },
      ];

      tableData.value = [
        {
          number: {
            value: 1,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9; font-weight: 600;",
          },
          sex: {
            value: "A",
            style:
              "color: #F9A400;border: 2px solid #F9A400;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          test1: {
            value: "开通满意度",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "88%",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: "显示",
            style: "color: #dfe4e9;",
          },
        },
        {
          number: {
            value: 2,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9;font-weight: 600;",
          },
          sex: {
            value: "B",
            style:
              "color: #2DC277;border: 2px solid #2DC277;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          test1: {
            value: "故障满意度",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "88%",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: "显示",
            style: "color: #dfe4e9;",
          },
        },
        {
          number: {
            value: 2,
            style: "color: #dfe4e9;",
          },
          name: {
            value: "Huzz",
            style: "color: #dfe4e9;font-weight: 600;",
          },
          sex: {
            value: "B",
            style:
              "color: #2DC277;border: 2px solid #2DC277;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;",
          },
          test1: {
            value: "投诉处理满意度",
            style: "color: #dfe4e9;",
          },
          test2: {
            value: "88%",
            style: "color: #dfe4e9;",
          },
          test3: {
            value: "显示",
            style: "color: #dfe4e9;",
          },
        },
      ];
    };

    const createTable = (JSONData, filter) => {
      var title = [];
      Object.keys(JSONData[0]).forEach(function (key) {
        title.push(key);
      });

      if (!JSONData) return;
      //转化json为object
      var arrData =
        typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
      var excel = "<table>";
      //设置表头
      var row = "<tr>";
      if (title) {
        //使用标题项
        for (var i in title) {
          row += "<th align='center'>" + title[i] + "</th>";
        }
      } else {
        //不使用标题项
        for (var i in arrData[0]) {
          row += "<th align='center'>" + i + "</th>";
        }
      }
      excel += row + "</tr>";
      //设置数据
      for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";
        for (var index in arrData[i]) {
          //判断是否有过滤行
          if (filter) {
            if (filter.indexOf(index) == -1) {
              var value = arrData[i][index] == null ? "" : arrData[i][index];
              row += "<td>" + value + "</td>";
            }
          } else {
            var value = arrData[i][index] == null ? "" : arrData[i][index];
            row += "<td align='center'>" + value + "</td>";
          }
        }
        excel += row + "</tr>";
      }
      excel += "</table>";

      return excel;
    };

    onMounted(() => {
      mapHeader.value.setTitle("5G全景概况");
      $axios.get("/config/govcharts/map/config.json").then((d) => {
        sysConfig = d;
        queryData("省", "");
      });

      dropDownOptions.value = [
        {
          value: "选项1",
          label: "全部行业",
        },
        {
          value: "选项2",
          label: "医疗",
        },
        {
          value: "选项3",
          label: "教育",
        },
        {
          value: "选项4",
          label: "新能源",
        },
        {
          value: "选项5",
          label: "金融",
        },
      ];
      dropDownOptions1.value = [
        {
          value: "开卡数",
          label: "开卡数",
        },
        {
          value: "项目数",
          label: "项目数",
        },
        {
          value: "设备数",
          label: "设备数",
        },
        {
          value: "活跃数",
          label: "活跃数",
        },
        {
          value: "活跃用户数占比",
          label: "活跃用户数占比",
        },
      ];
    });

    return {
      iconArray, //大json对象
      preid, //当前钻取地市id,all标识全省
      leftMenus,
      showLeftMenu,
      openLeftMenu,
      pieSettings,
      isNation,
      changePieType,
      getTableMessage,
      accessQuotaRef,
      accessQuotaRefresh,
      initAlarmPie,
      mapData,
      refWarn_1,
      refWarn_2,
      refEffectWarnings,
      refPullOut,
      zhibiaoChanges,
      lineTitle,
      mapTopCardList,
      configBusiList,
      refChart,
      handleCardChange,
      mydSetting,
      curCard,
      dialogVisible,
      dialogVisible1,
      dialogVisible2,
      dialogVisibleTow,
      dialogVisibleTow1,
      gongdanSetting,
      setRankTitle,
      searchShow,
      getCondition,
      handleMapChange,
      mapChart,
      excelExport,
      handleBack,
      excelData,
      fileName,
      excelDataStr,
      mapHeader,
      refLineChart,
      reloadMapData,
      setTableHeader,
      dialogClick,
      tableFunc,
      warnRank1,
      ringPieChart,
      ringChart,
      ringChart1,
      ringChart2,
      youzhuanzunSwitch,
      ringChart3,
      activeName,
      activeName1,
      gongDanUrl,
      handleClick,
      rank1Data,
      rank2Data,
      radios1,
      dpdata,
      zhibiaodata,
      kktopList,
      ywToplist,
      myddata,
      ismyddata,
      lineChartsData1,
      lineChartsData2,
      lineChartsData3,
      lineChartsData4,
      createTable,
      dataFormate,
      rank1Title: {
        province: "行业名称",
        ranking: "排名",
        warn: "数量",
      },
      rank2Title: {
        province: "客户名称",
        ranking: "排名",
        warn: "数量",
      },
      tableData,
      tableHeader,
      busiSetting,
      ringChartList,
      startZhibiao,
      endZhibiao,
      dropDownOptions,
      swichBtn,
      dropDownValue,
      dropDownOptions1,
      dropDownValue1,
      dropDownValue2,
      backToDefault,
      granularityList,
      changeTrade,
      gongdanXingqing,
      initLineChartData,
      radio2,
      xdata,
      yAxis1,
      yAxis2,
      yAxis3,
      yAxis4,
      yAxis12,
      yAxis13,
      yAxis22,
      yAxis23,
      yAxis32,
      yAxis33,
      zhiBiaoListSwitch,
      yAxis42,
      yAxis43,
      kanchazongshu,
      kaitongzongshu,
      tousuzongshu,
      guzhangzongshu,
      indexShowClick,
      indexDataShowClick,
      indextableData,
      warnSelected,
      dataExportTest,
      indexShowType,
      iframeTitle,
      dialogTitle,
      dialogTitle2,
    };
  },
};
</script>
<style>
.dialog-data .dialog {
  margin-top: 40vh;
  width: 70%;
}

.dialog-data .el-dialog {
  background: #fff !important;
  margin-top: 10vh !important;
}

.dialog-data .el-dialog__header {
  padding-top: 0px;
}

.dialog-data .el-dialog__body {
  padding: 0 10px 10px;
}

.dialog-data .dialog .el-dialog {
  border-radius: 10px 10px 10px 10px;
}

/*.dialog-data .el-dialog__headerbtn {*/
/*  top: 14.1px;*/
/*}*/
</style>
<style scoped>
.page-wrapper1 {
  padding: 15px;
}

.page-wrapper1 * {
  box-sizing: border-box;
}

.row-1 {
  margin-bottom: 15px;
}

.card-left {
  height: 100%;
  background-color: #fff;
}

.card-left.card-1 {
  height: 55vh;
}

.card-left.card-2 {
  height: 42vh;
  margin-top: 1vh;
}

.card-right.card-1 {
  height: 38vh;
  margin-bottom: 15px;
  background-color: #fff;
}

.card-right.card-2 {
  height: 29vh;
  margin-top: 1vh;
  background-color: #fff;
}

.card-right.card-3 {
  height: 29vh;
  margin-top: 1vh;
  background-color: #fff;
}
.card-right.card-4 {
  height: 136px;
  background-color: #fff;
}

.card-bottom.card-1 {
  height: 256px;
  background-color: #fff;
}

.card-bottom.card-2 {
  height: 256px;
  background-color: #fff;
}

.pointer {
  cursor: pointer;
}

.card-bottom.card-3 {
  height: 256px;
  background-color: #fff;
}

/*-----------map-top------------*/
.map-top {
  margin: 0;
}

/*--二级菜单--*/
.float-menu-btn {
  position: absolute;
  top: 205px;
  left: 31px;
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
  top: 205px;
  left: 65px;
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

.dp-top-icon-common {
  background-size: 100% 100%;
  width: 1.5vw;
  height: 1.5vw;
  margin: auto 0.3vw;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.qk-dp-top-top-title-right {
  margin-left: auto;
  padding-right: 1vw;
}

.qk-dp-top-top-title {
  margin: 0 0.3vw;
  font-size: 1.9vh;
  font-family: BebasNeue;
  color: #52586d;
  font-weight: bold;
  font-size: 16px;
}

.qk-dp-top-unit {
  opacity: 0.6;
}

.dp-top-left-top-panel-49 {
  width: 49%;
  line-height: 5vh;
  background: #f9f9fc;
}

.dp-top-left-top-panel-49-new:nth-child(odd) {
  margin: 0.5vh 2% 0.5vh 1%;
  display: inline-block;
  height: 20%;
  width: 47%;
  padding: 0px 2%;
}

.dp-top-left-top-panel-49-new:nth-child(even) {
  margin: 0.5vh 1% 0.5vh 2%;
  display: inline-block;
  height: 20%;
  width: 47%;
  padding: 0px 2%;
}

.top-title,
case-distribution,
.case-distribution {
  position: relative;
}

.float-title {
  font-weight: 500;
  line-height: 36px;
  padding-left: 10px;
}

.float-title-right {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
}
</style>
