<template>
  <div class="page-wrapper" :style="globalStyle">
    <el-row class="row-1" :gutter="15">
      <el-col :span="14" style="height: 100%">
        <div class="card-left">
          <MapHeader ref="mapHeader" />
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
          <div style="width: 100%; height: calc(100% - 140px)">
            <Map
              ref="mapChart"
              :data="mapData"
              :curCard="curCard"
              @handleMapChange="handleMapChange"
              @handleBack="handleBack"
            ></Map>
          </div>
        </div>
      </el-col>
      <el-col :span="10" style="height: 100%">
        <div class="card-right card-0">
          <SearchInfo ref="searchInfo" @searchShow="searchShow"></SearchInfo>
        </div>
        <el-row :gutter="15" class="card-right card-1">
          <el-col :span="12" style="height: 100%">
            <RingChart
              ref="customServiceRingChart"
              style="height: calc(100% - 60px)"
            />
            <div class="ring-chart-legend">
              <div
                class="legend-item"
                v-for="(item, index) in customServiceData.info"
                :key="index"
              >
                <img :src="item.url" alt="" />
                <div class="legend-name">
                  {{ item.name }}
                </div>
                <div class="legend-value" :style="{ color: item.color }">
                  {{ item.value }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="height: 100%">
            <RingChart ref="dnnRingChart" style="height: calc(100% - 60px)" />
            <div class="ring-chart-legend">
              <div
                class="legend-item"
                v-for="(item, index) in dnnData.info"
                :key="index"
              >
                <img :src="item.url" alt="" />
                <div class="legend-name">
                  {{ item.name }}
                </div>
                <div class="legend-value" :style="{ color: item.color }">
                  {{ item.value }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="card-right card-2">
          <NetResource ref="coreNetRes5G" @handleResChange="handleResChange" />
        </div>
        <div class="card-right card-3">
          <NetResource ref="honorNetRes5G" @handleResChange="handleResChange" />
        </div>
      </el-col>
    </el-row>
    <el-row class="row-2" :gutter="15">
      <el-col :span="6">
        <div class="card-bottom card-1">
          <WarnRanking ref="warnRanking1" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-bottom card-2">
          <WarnRanking ref="warnRanking2" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card-bottom card-2">
          <LineChart
            ref="lineChart"
            :title="lineChartTitle"
            style="height: 100%"
          />
        </div>
      </el-col>
    </el-row>
    <!-- 弹框组件 -->
    <div class="dialog-dataaaa">
      <el-dialog title="客户查询" v-model="dialogVisible" width="80%">
        <el-form
          :inline="true"
          :model="conditions"
          class="demo-form-inline"
          v-show="dialogVisibleTow"
          size="small"
        >
          <el-form-item label="客户编号">
            <el-input
              v-model="conditions.customerCode"
              placeholder="客户编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input
              v-model="conditions.customerName"
              placeholder="客户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户行业">
            <el-input
              v-model="conditions.customerTrade"
              placeholder="客户行业"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户服务等级">
            <el-select
              v-model="conditions.serviceLevel"
              placeholder="客户服务等级"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="金牌" value="金牌"></el-option>
              <el-option label="银牌" value="银牌"></el-option>
              <el-option label="铜牌" value="铜牌"></el-option>
              <el-option label="标准" value="标准"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryCustomerPage"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <el-table :data="tableDatas" style="width: 100%">
          <el-table-column prop="CUSTOMER_CODE" label="客户编号">
          </el-table-column>
          <el-table-column prop="ZH_LABEL" label="客户名称" width="180">
          </el-table-column>
          <el-table-column prop="CUSTOMER_TRADE" label="客户行业">
          </el-table-column>
          <el-table-column prop="SERVICE_LEVEL" label="客户服务等级">
          </el-table-column>
          <el-table-column prop="SERVICE_MODE" label="服务模式">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-link @click="customerClick(scope.$index)">操作</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize"
        >
        </el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRingIconUrl } from "@/utils/canvasUtil";
import LineChart from "@/components/common/LineChartDark.vue";
import Map from "@/components/topicsupport/CommonMapDark.vue";
import MapHeader from "@/components/common/MapHeader.vue";
import MapTopCard from "@/components/common/MapTopCard.vue";
import NetResource from "@/components/topicsupport/NetResource.vue";
import { onMounted, ref, inject } from "@vue/runtime-core";
import RingChart from "@/components/common/RingChartLight.vue";
import SearchInfo from "@/components/common/SearchInfo.vue";
import WarnRanking from "@/components/emergency/WarnRankingDark2.vue";
export default {
  components: {
    Map,
    MapTopCard,
    RingChart,
    NetResource,
    MapHeader,
    WarnRanking,
    LineChart,
    SearchInfo,
  },
  setup() {
    const $axios = inject("$axios");
    let sysConfig = {};
    const queryDataUrl =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getFgResourceData";
    const queryDataUrl2 =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getFgResourceData2";
    const queryTopDataUrl =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getFgResourceTopData";
    const queryCustomerUrl =
      "/ser-ge-main/api/v1/tgedpdatacontroller/queryCustomerPage";
    let globalStyle = ref({});
    const isNation = ref(true); // 是否是全国视图
    const isProvinceSelect = ref(false); // 是否选中省份
    const mapData = ref({
      names: [],
      maxValues: [],
      info: [],
    }); // 地图数据}
    const curCard = ref("5G专网客户数");
    let customServiceData = ref({});
    let dnnData = ref({}); // 客户服务模式数据
    const mapHeader = ref(""); // 地图标题
    const coreNetRes5G = ref(null); // 5G核心网络资源
    const honorNetRes5G = ref(null); // 5G尊享专属网络资源
    const customServiceRingChart = ref(null); // 5G尊享专属网络资源
    const dnnRingChart = ref(null); // 5G尊享专属网络资源
    const warnRanking1 = ref(null);
    const warnRanking2 = ref(null);
    const warnRanking3 = ref(null);
    const lineChart = ref(null);
    const lineChartTitle = ref("");
    const mapChart = ref(null);
    const searchInfo = ref(null);
    let activeRes = { name: "5G专网客户数" };
    let resObj = ref({
      "5G专网客户数": ["FG_CUSTOMER_COUNT", "customer"],
      共享型UPF数: ["SHARED_UPF_COUNT", "shared_upf"],
      独享型UPF数: ["UNSHARED_UPF_COUNT", "unshared_upf"],
      AMF数: ["AMF_COUNT", "amf"],
      SMF数: ["SMF_COUNT", "smf"],
      独享型无线基站数: ["SITE_COUNT", "site"],
      独享型MEC资源数: ["MEC_COUNT", "mec"],
    });

    let currentPage = ref(1);
    let length = ref(10);
    let totalSize = ref(0);
    let tableDatas = ref([]);
    let conditions = ref({
      customerCode: "",
      customerName: "",
      serviceLevel: "",
      customerTrade: "",
    });
    const handleSizeChange = function (val) {
      console.log(`每页 ${val} 条`);
      length.value = val;
      queryCustomerPage();
    };
    const handleCurrentChange = function (val) {
      console.log(`当前页: ${val}`);
      currentPage.value = val;
      queryCustomerPage();
    };

    const queryCustomerPage = function () {
      $axios
        .post(queryCustomerUrl, {
          page: currentPage.value,
          length: length.value,
          customerCode: conditions.value.customerCode || "",
          customerName: conditions.value.customerName || "",
          serviceLevel: conditions.value.serviceLevel || "",
          customerTrade: conditions.value.customerTrade || "",
        })
        .then((res) => {
          console.log(res);
          tableDatas.value = res.data;
          totalSize.value = res.count;
        });
    };

    let mapTopCardList = ref([
      {
        key: "0",
        name: "5G专网客户数",
        value: 12493,
        img: "CIcon-Avatar",
        color: "rgba(46, 196, 120, 1)",
        backgroundColor:
          "linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)",
      },
      {
        key: "1",
        name: "专用DNN数",
        value: 867,
        img: "CIcon-Sound-One",
        color: "rgba(17, 174, 220, 1)",
        backgroundColor:
          "linear-gradient(360deg, rgba(17, 174, 220, 0.64) 0%, rgba(17, 174, 220, 0.32) 100%)",
      },
      {
        key: "2",
        name: "专用切片数",
        value: 563,
        img: "CIcon-Card-Two",
        color: "rgba(255, 170, 6, 1)",
        backgroundColor:
          "linear-gradient(360deg, rgba(255, 170, 6, 0.64) 0%, rgba(255, 170, 6, 0.32) 100%)",
      },
      {
        key: "3",
        name: "专用开卡数",
        value: 867324,
        img: "CIcon-Sim-Card",
        color: "rgba(2, 106, 255, 1)",
        backgroundColor:
          "linear-gradient(360deg, rgba(2, 106, 255, 0.64) 0%, rgba(2, 106, 255, 0.32) 100%)",
      },
    ]);
    let customerCode = ref("");
    let dpdata = ref({});
    let index_list = ref([
      {
        name: "5G专网客户数",
        column: "FG_CUSTOMER_COUNT",
      },
      {
        name: "专用DNN数",
        column: "DNN_COUNT",
      },
      {
        name: "专用切片数",
        column: "SLICE_COUNT",
      },
      {
        name: "专用号卡数",
        column: "CARD_FLOW",
      },
    ]);
    let orgtype = ref("省");
    let orgname = ref("");
    let curTab = ref(0);
    const queryData = function () {
      let url = queryDataUrl;
      if (sysConfig.dataShowType == "实时查询") {
        url = queryDataUrl2;
      }
      $axios
        .post(url, {
          orgtype: orgtype.value || "省",
          orgname: orgname.value || "",
          customerCode: customerCode.value || "",
        })
        .then((res) => {
          console.log(res);
          dpdata.value = res;

          mapTopCardList.value[0].value = res.data.FG_CUSTOMER_COUNT || 0;
          mapTopCardList.value[1].value = res.data.DNN_COUNT || 0;
          mapTopCardList.value[2].value = res.data.SLICE_COUNT || 0;
          mapTopCardList.value[3].value = res.data.CARD_COUNT || 0;

          mapData.value.area_name = orgname.value || "";
          mapData.value.info = res.data;
          mapData.value.list = res.regionList;
          mapData.value.index_list = index_list.value;
          mapData.value.view_index = curTab.value;
          mapChart.value.loadMapData();

          coreNetRes5G.value.setValues([
            {
              name: "共享型UPF数",
              value: res.data.SHARED_UPF_COUNT || 0,
              img: "UPF.png",
            },
            {
              name: "独享型UPF数",
              value: res.data.UNSHARED_UPF_COUNT || 0,
              img: "UPF.png",
            },
            { name: "AMF数", value: res.data.AMF_COUNT || 0, img: "AMF.png" },
            { name: "SMF数", value: res.data.SMF_COUNT || 0, img: "SMF.png" },
          ]);
          honorNetRes5G.value.setValues([
            {
              name: "独享型无线基站数",
              value: res.data.SITE_COUNT || 0,
              img: "BaseStation.png",
            },
            {
              name: "独享型MEC资源数",
              value: res.data.MEC_COUNT || 0,
              img: "MEC.png",
            },
          ]);

          const val1 = {
            title: "客户服务模式",
            info: [
              {
                value: res.data.YOUXIANG_COUNT || 0,
                name: "优享",
                color: "#0066FF",
                url: "",
              },
              {
                value: res.data.ZHUANXIANG_COUNT || 0,
                name: "专享",
                color: "#FFA800",
                url: "",
              },
              {
                value: res.data.ZUNXIANG_COUNT || 0,
                name: "尊享",
                color: "#2EC478",
                url: "",
              },
            ],
          };
          val1.info.forEach((item) => {
            item.url = getRingIconUrl({ color: item.color });
          });
          customServiceData.value = val1;
          customServiceRingChart.value.setValues(customServiceData.value);
          const val2 = {
            title: "DNN类型",
            info: [
              {
                value: res.data.NATIONAL_DNN_COUNT || 0,
                name: "全国",
                color: "#2EC478",
                url: "",
              },
              {
                value: res.data.PROVINCE_DNN_COUNT || 0,
                name: "省内",
                color: "#0066FF",
                url: "",
              },
            ],
          };
          val2.info.forEach((item) => {
            item.url = getRingIconUrl({ color: item.color });
          });
          dnnData.value = val2;
          dnnRingChart.value.setValues(dnnData.value);
          warnRanking1.value.setTitle("5G专网客户数分区域排名");
          var array = [];
          for (let i = 0; i <= 4; i++) {
            array.push({
              NAME: res.regionList[i].SHOWNAME,
              COUNT: res.regionList[i].FG_CUSTOMER_COUNT,
            });
          }
          warnRanking1.value.setRanking({
            ranking: " 排名",
            province: "区域",
            warn: "数量",
            list: array,
          });

          //warnRanking1.value.setRanking(d.warningRanking1Data)
          warnRanking2.value.setTitle("5G专网客户数分行业排名");

          var toparray = [];
          for (let i = 0; i < res.topList.length; i++) {
            if (res.topList[i].TOP_TYPE == "customer") {
              toparray.push({
                NAME: res.topList[i].NAME,
                COUNT: res.topList[i].COUNT,
              });
            }
          }
          warnRanking2.value.setRanking({
            ranking: " 排名",
            province: "行业",
            warn: "数量",
            list: toparray,
          });
          //warnRanking2.value.setRanking(d.warningRanking2Data)
          lineChartTitle.value = "5G专网客户数近30日增长趋势";
          let lineChartData = [
            {
              name: "数量",
              //"data": [89, 70, 67, 88, 59, 98, 50],
              data: [],
              //"xData": ["06-01", "06-05", "06-10", "06-15", "06-20", "06-25", "06-30"],
              xData: [],
              yName: "单位： 个",
            },
          ];
          for (let i = res.trendList.length - 1; i >= 0; i--) {
            lineChartData[0].xData.push(res.trendList[i].CDATE_STR);
            lineChartData[0].data.push(res.trendList[i].FG_CUSTOMER_COUNT || 0);
          }
          lineChart.value.setValues(lineChartData);
        });
    };

    const queryTopData = function () {
      var type = resObj.value[activeRes.name][1];
      $axios
        .post(queryTopDataUrl, {
          orgtype: orgtype.value || "省",
          orgname: orgname.value || "",
          customerCode: customerCode.value || "",
          type: type,
        })
        .then((res) => {
          console.log(res);
          var topList = res.topList;
          if (topList.length === 0) {
            topList = dpdata.value.topList;
          }
          var toparray = [];
          for (let i = 0; i < topList.length; i++) {
            if (topList[i].TOP_TYPE == type) {
              toparray.push({
                NAME: topList[i].NAME,
                COUNT: topList[i].COUNT,
              });
            }
          }
          warnRanking2.value.setRanking({
            ranking: " 排名",
            province: "行业",
            warn: "数量",
            list: toparray,
          });
        });
    };

    const handleCardChange = function (item) {
      if (item.name === curCard.value) return;
      curCard.value = item.name;

      let ii = 0;
      mapTopCardList.value.forEach(function (data, index) {
        if (item.name == data.name) {
          ii = index;
        }
      });
      mapData.value.area_name = orgname.value || "";
      mapData.value.info = dpdata.value.data;
      mapData.value.list = dpdata.value.regionList;
      mapData.value.index_list = index_list.value;
      mapData.value.view_index = ii;
      mapChart.value.loadMapData();
    };
    const handleMapChange = (val) => {
      console.log("地图变化", val);
      orgtype.value = "地市";
      orgname.value = val.name;
      queryData();
    };
    const handleBack = () => {
      // 返回全国视图
      orgtype.value = "省";
      orgname.value = "";
      queryData();
    };
    // --------------------------- 表格弹窗----------------------------------------------------------
    let dialogVisible = ref(false);
    let dialogVisibleTow = ref(false);
    const searchShow = (val) => {
      tableDatas.value = [];
      conditions.value.customerName = "";
      conditions.value.customerCode = "";
      conditions.value.customerTrade = "";
      conditions.value.serviceLevel = "";
      dialogVisible.value = true;
      if (val && val.dialogVisible) {
        conditions.value.customerName = val.condition.input;
        dialogVisibleTow.value = false;
      } else {
        dialogVisibleTow.value = true;
      }
      queryCustomerPage();
    };

    const customerClick = (index) => {
      customerCode.value = tableDatas.value[index].CUSTOMER_CODE;
      queryData();
      dialogVisible.value = false;
    };

    const handleResChange = (item) => {
      // 点击资源类型
      if (item) {
        // 选中资源
        activeRes = item;
      } else {
        // 刷新
        activeRes = { name: "5G专网客户数" };
      }
      resChange();
    };
    const resChange = () => {
      warnRanking1.value.setTitle(activeRes.name + "分区域排名");
      var key = resObj.value[activeRes.name][0];
      var array = [];
      for (let i = 0; i <= 4; i++) {
        array.push({
          NAME: dpdata.value.regionList[i].SHOWNAME,
          COUNT: dpdata.value.regionList[i][key],
        });
      }
      warnRanking1.value.setRanking({
        ranking: " 排名",
        province: "区域",
        warn: "数量",
        list: array,
      });

      //warnRanking1.value.setRanking(d.warningRanking1Data)
      warnRanking2.value.setTitle(activeRes.name + "分行业排名");

      if (sysConfig.dataShowType == "实时查询") {
        queryTopData();
      } else {
        var type = resObj.value[activeRes.name][1];
        var toparray = [];
        for (let i = 0; i < dpdata.value.topList.length; i++) {
          if (dpdata.value.topList[i].TOP_TYPE == type) {
            toparray.push({
              NAME: dpdata.value.topList[i].NAME,
              COUNT: dpdata.value.topList[i].COUNT,
            });
          }
        }
        warnRanking2.value.setRanking({
          ranking: " 排名",
          province: "行业",
          warn: "数量",
          list: toparray,
        });
      }

      lineChartTitle.value = activeRes.name + "近30日增长趋势";
      let lineChartData = [
        {
          name: "数量",
          //"data": [89, 70, 67, 88, 59, 98, 50],
          data: [],
          //"xData": ["06-01", "06-05", "06-10", "06-15", "06-20", "06-25", "06-30"],
          xData: [],
          yName: "单位： 个",
        },
      ];
      for (let i = dpdata.value.trendList.length - 1; i >= 0; i--) {
        lineChartData[0].xData.push(dpdata.value.trendList[i].CDATE_STR);
        lineChartData[0].data.push(dpdata.value.trendList[i][key] || 0);
      }
      lineChart.value.setValues(lineChartData);
    };
    onMounted(() => {
      var h =
        window.innerHeight ||
        window.document.documentElement.clientHeight ||
        window.document.body.clientHeight;
      globalStyle.value = { height: h + "px", "box-sizing": "border-box" };
      $axios.get("/config/govcharts/map/config.json").then((d) => {
        sysConfig = d;
        queryData();
      });
      //initData()
      mapHeader.value.setTitle("资源可视化");
      // mapHeader.value.setDateTime('2021-09-04')
      coreNetRes5G.value.setTitle("5G核心网资源");
      honorNetRes5G.value.setTitle("5G尊享专属网络资源");
    });

    return {
      isNation,
      mapHeader,
      mapTopCardList,
      mapData,
      curCard,
      handleCardChange,
      coreNetRes5G,
      honorNetRes5G,
      customServiceData,
      dnnData,
      customServiceRingChart,
      dnnRingChart,
      handleMapChange,
      warnRanking1,
      warnRanking2,
      warnRanking3,
      lineChartTitle,
      lineChart,
      mapChart,
      handleBack,
      isProvinceSelect,
      handleResChange,
      searchShow,
      dialogVisible,
      dialogVisibleTow,
      searchInfo,
      currentPage,
      totalSize,
      handleSizeChange,
      handleCurrentChange,
      conditions,
      tableDatas,
      customerClick,
      globalStyle,
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
  height: 65%;
}
.row-2 {
  height: 34.5%;
  margin-top: 0.5%;
}

.card-left {
  height: 100%;
  background-color: rgb(0, 0, 0, 0.32);
}

.map-top {
  margin: 10px 10px 0;
}

.card-right.card-0 {
  margin-bottom: 10px;
  background-color: rgb(0, 0, 0, 0.32);
}

.card-right.card-1 {
  height: calc(calc(100% - 68px) * 0.5 - 10px);
  margin: 0 0 10px 0 !important;
  background-color: rgb(0, 0, 0, 0.32);
}

.card-right.card-2 {
  height: calc(calc(100% - 68px) * 0.3 - 10px);
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0,0.32);
}

.card-right.card-3 {
  height: calc(calc(100% - 68px) * 0.2);
  background-color: rgba(0, 0, 0,0.32);
}

.ring-chart-legend {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.legend-item {
  text-align: center;
  line-height: 18px;
}

.legend-name {
  font-size: 12px;
}

.legend-value {
  font-size: 14px;
}

.card-bottom.card-1 {
  height: 100%;
  background-color: rgb(0, 0, 0,0.32);
}

.card-bottom.card-2 {
  height: 100%;
  background-color: rgb(0, 0, 0,0.32);
}

.card-bottom.card-3 {
  background-color: rgb(0, 0, 0,0.32);
}

.float-menu-btn {
  position: absolute;
  top: 235px;
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
  top: 235px;
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

.dialog :deep(.el-dialog) {
  background: #fff !important;
}

.dialog :deep(.el-dialog__body) {
  padding: 0 10px 10px;
}

.dialog .dialog :deep(.el-dialog) {
  border-radius: 10px 10px 10px 10px;
}

:deep(.el-dialog__headerbtn) {
  z-index: 10;
  top: 5px;
}
</style>
