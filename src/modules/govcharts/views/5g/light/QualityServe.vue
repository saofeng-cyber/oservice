<template>
  <div class="page-wrapper" :style="globalStyle">
    <el-row class="row-1" :gutter="15">
      <el-col :span="14" style="height: 100%">
        <div class="card-left">
          <div class="map-top">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-select
                  v-model="dropDownValue"
                  placeholder="全部行业"
                  size="small"
                >
                  <el-option
                    v-for="(item, index) in dropDownOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="changeTrade(index)"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-radio-group
                  v-model="radio2"
                  size="small"
                  style="text-align: center"
                >
                  <el-radio-button
                    label="全部"
                    @click="handleCardChange('1')"
                  ></el-radio-button>
                  <el-radio-button
                    label="优享"
                    @click="handleCardChange('2')"
                  ></el-radio-button>
                  <el-radio-button
                    label="专享"
                    @click="handleCardChange('3')"
                  ></el-radio-button>
                  <el-radio-button
                    label="尊享"
                    @click="handleCardChange('4')"
                  ></el-radio-button>
                </el-radio-group>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="customerName"
                  placeholder="请选择客户"
                  size="small"
                  :clearable="true"
                  @change="customerChange"
                  @clear="customerChange"
                ></el-input>
              </el-col>
              <el-col :span="1" style="padding-top: 6px">
                <i class="el-icon-search" @click="searchShow"></i>
              </el-col>
            </el-row>
          </div>
          <div class="card">
            <el-row>
              <el-col :span="5">
                <div class="pad-10">
                  <img :src="require('@/static/img/SIcon-C@2x.png')" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="text">性能预警工单数</div>
              </el-col>
              <el-col :span="7">
                <div class="count">
                  {{ dpdata.data.WARN_WORKORDER_COUNT || 0 }}
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="width: 100%; height: calc(100% - 55px)">
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
        <div class="card-right card-1">
          <div class="float-title">
            <span class="i"></span>
            活跃度
            <i
              class="el-icon-setting"
              style="float: right"
              @click="
                busiSetting();
                dialogVisible = true;
              "
            ></i>
          </div>
          <div style="padding: 5px 10px">
            <el-row :gutter="20">
              <el-col :span="8">
                <div style="border: 1px solid #eee">
                  <el-row style="padding: 10px">
                    <el-col :span="16">开卡数 </el-col>
                    <el-col
                      :span="8"
                      style="
                        font-weight: bold;
                        color: #2a6fff;
                        text-align: right;
                      "
                    >
                      {{ dpdata.data.CARD_OPEN_COUNT }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="border: 1px solid #eee">
                  <el-row style="padding: 10px">
                    <el-col :span="16">活跃数 </el-col>
                    <el-col
                      :span="8"
                      style="
                        font-weight: bold;
                        color: #2a6fff;
                        text-align: right;
                      "
                    >
                      {{ dpdata.data.ACTIVE_COUNT }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="border: 1px solid #eee">
                  <el-row style="padding: 10px">
                    <el-col :span="16">活跃度 </el-col>
                    <el-col
                      :span="8"
                      style="
                        font-weight: bold;
                        color: #2a6fff;
                        text-align: right;
                      "
                    >
                      {{ dpdata.data.ACTIVE_RATE }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="card-right card-2">
          <div class="float-title">
            <span class="i"></span>
            接入指标分析
            <i
              class="el-icon-setting"
              style="float: right"
              @click="
                busiSetting();
                dialogVisible = true;
              "
            ></i>
          </div>
          <el-row style="padding: 10px; height: calc(100% - 32px)">
            <el-col :span="6" style="height: 100%">
              <RingChart ref="pie1" />
            </el-col>
            <el-col :span="6">
              <RingChart ref="pie2" />
            </el-col>
            <el-col :span="6" style="height: 100%">
              <RingChart ref="pie3" />
            </el-col>
            <el-col :span="6" style="height: 100%">
              <RingChart ref="pie4" />
            </el-col>
          </el-row>
        </div>

        <div class="card-right card-3">
          <div class="float-title">
            <span class="i"></span>
            业务质量分析
            <i
              class="el-icon-setting"
              style="float: right"
              @click="
                busiSetting();
                dialogVisible = true;
              "
            ></i>
          </div>
          <div style="height: calc(100% - 32px)">
            <Rotate ref="rotate" />
          </div>
        </div>

        <div class="card-right card-4">
          <div class="float-title">
            <span class="i"></span>
            拨测质量分析
            <i
              class="el-icon-setting"
              style="float: right"
              @click="
                busiSetting();
                dialogVisible = true;
              "
            ></i>
          </div>
          <div style="padding: 5px 10px">
            <el-row :gutter="20">
              <el-col :span="12">
                <div style="border: 1px solid #eee">
                  <el-row style="padding: 10px">
                    <el-col :span="16">PDU会话建立成功率 </el-col>
                    <el-col
                      :span="8"
                      style="
                        font-weight: bold;
                        color: #ffb033;
                        text-align: right;
                      "
                    >
                      {{ dpdata.data.PDU_SESSION_RATE }}%
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="border: 1px solid #eee">
                  <el-row style="padding: 10px">
                    <el-col :span="16">PDU会话建立时延 </el-col>
                    <el-col
                      :span="6"
                      style="
                        font-weight: bold;
                        color: #ffb033;
                        text-align: right;
                      "
                    >
                      {{ dpdata.data.PDU_SESSION_DELAY }}ms
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="row-2">
      <div class="float-title">
        <span class="i"></span>
        质量趋势
      </div>
      <el-row style="height: calc(100% - 32px)">
        <el-col :span="8" style="height: 100%">
          <LineChart
            ref="refLineChart"
            :chartsData="lineChartsData1"
            @lineChartRefresh="lineChart_Refresh"
          />
        </el-col>
        <el-col :span="8" style="height: 100%">
          <LineChart
            ref="refLineChart2"
            :chartsData="lineChartsData2"
            @lineChartRefresh="lineChart_Refresh"
          />
        </el-col>
        <el-col :span="8" style="height: 100%">
          <LineChart
            ref="refLineChart3"
            :chartsData="lineChartsData3"
            @lineChartRefresh="lineChart_Refresh"
          />
        </el-col>
      </el-row>
    </div>
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
import Map from "@/components/topicsupport/CommonMap.vue";
import Rotate from "@/components/common/RotateLightFg.vue";
import LineChart from "@/components/common/LineChartLightFg.vue";
import { ref } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
import RingChart from "@/components/common/PieChart.vue";

export default {
  components: {
    Map,
    LineChart,
    Rotate,
    RingChart,
  },
  setup() {
    const $axios = inject("$axios");
    let sysConfig = {};
    let globalStyle = ref({});
    let dialogVisible = ref(false);
    const mapTopCardList = ref([]); // 地图上方卡片数据
    const tableData = ref([]); // 省份各期数据
    const mapData2 = ref({}); // 云南各市数据
    const curCard = ref("开通满意度");
    const refLineChart = ref(null); // 开通满意度近 30 日增长趋势
    const refLineChart2 = ref(null);
    const refLineChart3 = ref(null);
    const tableHeigh = ref(180); // 开通满意度近 30 日增长趋势
    let rotate = ref("");
    let pie1 = ref("");
    let pie2 = ref("");
    let pie3 = ref("");
    let pie4 = ref("");
    let dpdata = ref({ data: {} });
    let lineChartsData1 = ref({});
    let lineChartsData2 = ref({});
    let lineChartsData3 = ref({});
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
    const table = ref(0); // 列表高度
    const mapChart = ref(null);
    let dropDownValue = ref("");
    let dropDownValue1 = ref("");
    let dropDownValue2 = ref("");
    let dropDownValue3 = ref("");
    let dropDownOptions = ref("");
    let dropDownOptions1 = ref("");
    let dropDownOptions2 = ref("");
    let dropDownOptions3 = ref("");
    let radio2 = ref("全部");
    let vif = ref(false);

    let xdata = ref([]);
    let yAxis1 = ref([]);
    let yAxis2 = ref([]);
    let yAxis3 = ref([]);

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
    const queryDataUrl =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getBusiServeDpData";
    const queryDataUrl2 =
      "/ser-ge-main/api/v1/tgedpdatacontroller/getBusiServeDpData2";
    const queryCustomerUrl =
      "/ser-ge-main/api/v1/tgedpdatacontroller/queryCustomerPage";

    let customerName = ref("");
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

    const customerChange = function () {
      customerName.value = "";
      dropDownValue1.value = "";
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

    function searchShow() {
      tableDatas.value = [];
      conditions.value.customerName = "";
      conditions.value.customerCode = "";
      conditions.value.customerTrade = "";
      conditions.value.serviceLevel = "";
      dialogVisible.value = true;
      queryCustomerPage();
    }

    const customerClick = (index) => {
      customerName.value = tableDatas.value[index].ZH_LABEL;
      dropDownValue1.value = tableDatas.value[index].CUSTOMER_CODE;
      queryData();
      dialogVisible.value = false;
    };

    const queryData = function (orgType, city) {
      let url = queryDataUrl;
      if (sysConfig.dataShowType == "实时查询") {
        url = queryDataUrl2;
      }
      $axios
        .post(url, {
          orgType: orgType || "省",
          orgName: city || "",
          packageName: radio2.value == "全部" ? "" : radio2.value || "",
          customer: dropDownValue1.value || "",
          trade: dropDownValue.value || "",
          dnn: dropDownValue2.value || "",
          snssai: dropDownValue3.value || "",
          granularity: "",
        })
        .then((res) => {
          console.log(res);
          dpdata.value = res;

          console.log(res.trendlist.length + "rrr");
          for (var i = res.trendlist.length - 1; i >= 0; i--) {
            let item = res.trendlist[i];
            console.log(item);
            xdata.value.push(dataFormate(item.CDATE));
            yAxis1.value.push(item.PDU_SESSION_MODIFY);
            yAxis2.value.push(item.SMF_SESSION_UPDATE);
            yAxis3.value.push(item.FGTCP_CREATE_DELAY);
          }
          console.log("xdata: ");
          console.log(xdata.value);
          // lineChartsData1.value = {
          //   title: 'PDU会话修改成功率',
          //   tag: { name1: 'PDU会话修改成功率', }, xAxisData: xdata, yAxisData1: yAxis1
          // }
          refLineChart.value.setValues({
            title: "PDU会话修改成功率",
            tag: { name1: "PDU会话修改成功率" },
            xAxisData: xdata.value,
            yAxisData1: yAxis1.value,
          });

          // lineChartsData2.value = {
          //   title: 'SMF会话更新成功率',
          //   tag: { name1: 'SMF会话更新成功率', }, xAxisData: xdata, yAxisData1: yAxis2
          // }

          refLineChart2.value.setValues({
            title: "SMF会话更新成功率",
            tag: { name1: "SMF会话更新成功率" },
            xAxisData: xdata.value,
            yAxisData1: yAxis2.value,
          });

          // lineChartsData3.value = {
          //   title: '5GTCP建立时延',
          //   tag: { name1: '5GTCP建立时延', }, xAxisData: xdata, yAxisData1: yAxis3
          // }

          refLineChart3.value.setValues({
            title: "TCP建立成功率",
            tag: { name1: "TCP建立成功率" },
            xAxisData: xdata.value,
            yAxisData1: yAxis3.value,
          });

          vif.value = true;

          mapData.value.area_name = city || "";
          mapData.value.info = dpdata.value.data;
          mapData.value.list = dpdata.value.gmlist;
          mapData.value.index_list = [
            {
              name: "性能预警工单数",
              column: "WARN_WORKORDER_COUNT",
            },
          ];

          mapChart.value.loadMapData();

          // table.value.setTableH(500)

          var tradeArray = [{ value: "", label: "全部行业" }];
          res.industrylist.forEach(function (item) {
            tradeArray.push({
              value: item.INDUSTRY_NAME,
              label: item.INDUSTRY_NAME,
            });
          });
          dropDownOptions.value = tradeArray;

          // dropDownOptions.value = [{ value: '选项1', label: '全部行业' },
          // { value: '选项2', label: '医疗' },
          // { value: '选项3', label: '教育' },
          // { value: '选项4', label: '新能源' },
          // { value: '选项5', label: '金融' }]
          dropDownOptions1.value = [
            { value: "选项1", label: "全部客户" },
            { value: "选项2", label: "爱康科技" },
            { value: "选项3", label: "阳煤化工" },
            { value: "选项4", label: "美锦能源" },
            { value: "选项5", label: "科达制造" },
          ];
          // dropDownOptions2.value = [{ value: '选项1', label: '全部DNN' },
          // { value: '选项2', label: '专用DNN' },
          // { value: '选项3', label: '通用DNN' }]
          // dropDownOptions3.value = [{ value: '选项1', label: '全部切片' },
          // { value: '选项2', label: '业务切片' },
          // { value: '选项3', label: '网络切片' },
          // { value: '选项4', label: '无线子切片' },
          // { value: '选项5', label: '核心子切片' },
          // { value: '选项6', label: '传输子切片' }]
          rotate.value.setTitle("性能预警");
          rotate.value.setValue([
            {
              name: "鉴权成功率",
              num: res.data.AUTHENTICATION_RATE,
              effect: 5,
              line: 15,
            },
            {
              name: "5G注册平均时延",
              num: res.data.FG_REGIST_DELAYAVG,
              effect: 5,
              line: 15,
            },
            {
              name: "会话更新成功率",
              num: res.data.SESSION_UPDATE_RATE,
              effect: 5,
              line: 15,
            },
            {
              name: "业务请求成功率",
              num: res.data.BUSI_REQ_RATE,
              effect: 5,
              line: 15,
            },
          ]);

          pie1.value.setValue([
            {
              title: "5GHTTP\n请求成功率",
              num: 80,
              name: "网络业务",
              number: res.data.FGHTTP_REQ_RATE,
              color: "#1A83FF",
            },
          ]);
          pie2.value.setValue([
            {
              title: "N6接口\n发送流量",
              num: 80,
              name: "网络业务",
              number: res.data.NSINTER_SEND_FLOW,
              color: "#3ADB8A",
            },
          ]);
          pie3.value.setValue([
            {
              title: "PFCP会话\n建立成功率",
              num: 80,
              name: "网络业务",
              number: res.data.PFCP_SUC_RATE,
              color: "#FFBD3D",
            },
          ]);
          pie4.value.setValue([
            {
              title: "鉴权\n成功率",
              num: 80,
              name: "网络业务",
              number: res.data.AUTHENTICATION_RATE,
              color: "#39CBF6",
            },
          ]);

          // mapHeader.value.setTitle("满意度可视化");
        });
    };

    const changeTrade = (index) => {
      queryData();
    };

    /**
     * 点击卡片事件
     */
    const handleCardChange = (item) => {
      queryData();
    };
    const lineChart_Refresh = () => {};

    const handleMapChange = (val) => {
      console.log("打印下钻数据");
      console.log(val);
      queryData("地市", val.name);
    };

    //初始化数据接口
    const handleBack = () => {
      // 返回全国视图
      mapChart.value.onBackDblclick();
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
    });

    return {
      refBusiSatis,
      lineChart_Refresh,
      refLineChart,
      refLineChart2,
      refLineChart3,
      refSpurWarn,
      quarterLine,
      handleMapChange,
      isNation,
      mapHeader,
      mapData,
      mapChart,
      handleBack,
      mapTopCardList,
      tableData,
      mapData2,
      dropDownValue,
      dropDownValue1,
      dropDownValue2,
      dropDownValue3,
      curCard,
      xdata,
      yAxis1,
      yAxis2,
      yAxis3,
      table,
      tableHeigh,
      changeTrade,
      dropDownOptions,
      dropDownOptions1,
      dropDownOptions2,
      dropDownOptions3,
      handleCardChange,
      queryData,
      radio2,
      rotate,
      pie1,
      pie2,
      pie3,
      pie4,
      dpdata,
      vif,
      lineChartsData1,
      lineChartsData2,
      lineChartsData3,
      dataFormate,
      globalStyle,
      currentPage,
      totalSize,
      handleSizeChange,
      handleCurrentChange,
      conditions,
      tableDatas,
      customerClick,
      searchShow,
      customerName,
      customerChange,
      dialogVisible,
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
  background-color: #fff;
}

.map-top {
  padding: 10px;
}

.selectorStyle {
  width: 160px;
  padding: 10px 10px 10px 10px;
}
.card-left {
  height: 100%;
  background-color: #fff;
}

.card-left .card {
  float: left;
  border: 1px solid #ddd;
  width: 300px;
  margin-left: 10px;
}
.pad-10 {
  padding: 10px;
}
.card-left .card img {
  width: 40px;
  height: 40px;
}
.card-left .card .text {
  font-size: 16px;
  padding: 20px 10px;
}
.card-left .card .count {
  font-size: 18px;
  padding: 20px 10px;
  color: #ffb11a;
}

.card-right.card-1 {
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-2 {
  height: calc(calc(100% - 180px) * 0.45 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-3 {
  height: calc(calc(100% - 180px) * 0.55 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-4 {
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
}

.case-distribution {
  width: 100%;
  overflow: hidden;
  float: left;
}

.float-title {
  padding: 5px 10px;
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