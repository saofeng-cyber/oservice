<template>
  <div
    class="page-wrapper"
    :style="globalStyle"
  >
    <el-row
      class="row-1"
      :gutter="15"
    >
      <el-col
        :span="14"
        style="height:100%;"
      >
        <div class="card-left ">
          <MapHeader
            ref="mapHeader"
            @handleBack="handleBack"
          />
          <div class="map-top">
            <el-row
              :gutter="12"
              :span="24"
            >
              <el-col :span="24">
                <MapHeard
                  ref="mapHeard"
                  @handleCardChange="handleCardChange"
                />
              </el-col>
            </el-row>
          </div>
          <div style="width:100%;height: calc(100% - 150px);">
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
      <el-col
        :span="10"
        style="height:100%;"
      >
        <div class="card-right card-1">
          <SearchInfo
            ref="searchInfo"
            @searchShow="searchShow"
          ></SearchInfo>
        </div>
        <div class="card-right card-2">
          <div style="float:left;width:50%;height:100%;padding-right:10px;box-sizing: border-box;">
            <!-- 集团工单数左边 -->
            <div style="line-height:40px;padding-left:10px;box-sizing: border-box;">
              <span class="i"></span>集团工单总数
              <div style="float:right; parring-right:10px;">
                {{formInfo.GROUP_ORDER_COUNT || 0}}
              </div>
            </div>
            <div>
              <div style="
                    width: 90%;
                    height: 40px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                  ">
                <div style="
                      display: flex;
                      justify-content: space-between;
                      padding: 0 5px;
                    ">
                  <span style="font-size: 12px">处理及时率</span>
                  <span style="color: #2EC478; font-size: 12px">{{formInfo.GROUP_ORDER_RATE || 100}}%</span>
                </div>
                <el-progress
                  :show-text="false"
                  :stroke-width="20"
                  :percentage="formInfo.GROUP_ORDER_RATE || 100"
                  color="#2EC478"
                ></el-progress>
              </div>
            </div>
            <RingChart
              style="height: calc(100% - 80px)"
              ref="ringchart"
            ></RingChart>
          </div>
          <div style="float:left;width:50%;height:100%;padding-right:10px;box-sizing: border-box;">
            <!-- 集团工单数右边 -->
            <div style="line-height:40px;padding-left:10px;box-sizing: border-box;">
              <span class="i"></span>省内工单数总数
              <div style="float:right;padding-right:10px;">
                {{formInfo.PROVINCE_ORDER_COUNT || 0}}
              </div>
            </div>
            <div>
              <div style="
                    width: 80%;
                    height: 40px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                  ">
                <div style="
                      display: flex;
                      justify-content: space-between;
                      padding: 0 5px;
                    ">
                  <span style="font-size: 12px">处理及时率</span>
                  <span style="color: #2EC478; font-size: 12px">{{formInfo.PROVINCE_ORDER_RATE || 100}}%</span>
                </div>
                <el-progress
                  :show-text="false"
                  :stroke-width="20"
                  :percentage="formInfo.PROVINCE_ORDER_RATE||100"
                  color="#2EC478"
                ></el-progress>
              </div>
            </div>
            <RingChart
              style="height: calc(100% - 80px)"
              ref="ringchart2"
            ></RingChart>
          </div>
        </div>
        <div class="card-right card-3">
          <!-- 工单分析 -->
          <el-row style="width: 100%; height: 15%">
            <!-- 工单分享 -->
            <div class="float-title">
              <span class="i"></span>
              工单分享
            </div>
            <div class="float-title-right">
              <div class="case-distribution-line">
                <div class="case-distribution-one">
                  <p
                    :style="{color:packageType=='全部'?'red':'#fff'}"
                    @click="packageType='全部';packageTypeChange();"
                  >全部</p>
                </div>
                <div class="case-distribution-two">
                  <p
                    style="margin-top: 4px"
                    :style="{color:packageType=='优享'?'red':'#fff'}"
                    @click="packageType='优享';packageTypeChange();"
                  >优享</p>
                </div>
                <div class="case-distribution-three">
                  <p
                    style="margin-top: 4px"
                    :style="{color:packageType=='专享'?'red':'#fff'}"
                    @click="packageType='专享';packageTypeChange();"
                  >专享</p>
                </div>
                <div class="case-distribution-fore">
                  <p
                    style="margin-top: -5px"
                    :style="{color:packageType=='尊享'?'red':'#fff'}"
                    @click="packageType='尊享';packageTypeChange();"
                  >尊享</p>
                </div>
              </div>
            </div>
          </el-row>
          <el-row style="width: 100%; height: 85%">
            <!--  雷达图 -->
            <div style="width: 50%;height:100%;">
              <WorkOrder ref="workorder"></WorkOrder>
            </div>
            <!-- 轮播图 -->
            <div style="width: 50%;height:100%;">
              <Carousel ref="carousel"></Carousel>
            </div>
          </el-row>
        </div>
        <!--        <div class="card-right card-with-title card-4">-->
        <!--          <EffectWarning ref="refEffectWarning"></EffectWarning>-->
        <!--        </div>-->
      </el-col>
    </el-row>
    <el-row
      class="row-2 card-bottom card-1"
      :gutter="15"
      style="width: 100%"
    >
      <!-- 头部 -->
      <el-row style="width: 100%">
        <el-radio-group
          v-model="formType"
          size="small"
          @change="formTypeChange"
        >
          <el-radio-button label="工单数"></el-radio-button>
          <el-radio-button label="超时工单数"></el-radio-button>
          <el-radio-button label="处理平均时长"></el-radio-button>
          <el-radio-button label="处理及时率"></el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row style="width: 100%;height: calc(100% - 48px)">
        <!-- 警告 -->
        <div style="width: 50%;height:100%;">
          <Process ref="processVis"></Process>
        </div>
        <!-- 折线图 -->
        <div style="width: 50%; height:100%;">
          <LineChart
            ref="lineChart"
            :title="lineChartTitle"
            style="height: 100%;"
          />
        </div>
      </el-row>
    </el-row>
    <!-- 弹框组件 -->
    <div class="dialog-dataaaa">
      <el-dialog
        title="客户查询"
        v-model="dialogVisible"
        width="80%"
      >
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
              <el-option
                label="全部"
                value=""
              ></el-option>
              <el-option
                label="金牌"
                value="金牌"
              ></el-option>
              <el-option
                label="银牌"
                value="银牌"
              ></el-option>
              <el-option
                label="铜牌"
                value="铜牌"
              ></el-option>
              <el-option
                label="标准"
                value="标准"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="queryCustomerPage"
            >查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableDatas"
          style="width: 100%"
        >
          <el-table-column
            prop="CUSTOMER_CODE"
            label="客户编号"
          >
          </el-table-column>
          <el-table-column
            prop="ZH_LABEL"
            label="客户名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="CUSTOMER_TRADE"
            label="客户行业"
          >
          </el-table-column>
          <el-table-column
            prop="SERVICE_LEVEL"
            label="客户服务等级"
          >
          </el-table-column>
          <el-table-column
            prop="SERVICE_MODE"
            label="服务模式"
          >
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
import { ref } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
import Map from "@/components/topicsupport/CommonMap";
import SearchInfo from "@/components/common/SearchInfoLight";
import Process from "@/components/visualization/ProcessLight";
import LineChart from '@/components/common/LineChartLight.vue'
import Carousel from "@/components/emergency/CarouselLight";
import WorkOrder from "@/components/emergency/WorkOrder";
import RingChart from "@/components/common/RingChartLight";
import MapHeader from "@/components/common/MapHeaderLight";
import MapHeard from "@/components/emergency/MapHeardLight";

export default {
  components: {
    MapHeard,
    MapHeader,
    RingChart,
    WorkOrder,
    Carousel,
    SearchInfo,
    Map,
    Process,
    LineChart
  },
  setup () {
    const $axios = inject('$axios')
    //const url = '/ser-govplat-comservice/api/rest/commService/v1/getData'
    let globalStyle = ref({});
    let processVis = ref("");
    let refPullOut = ref("");
    let lineTitle = ref("影响业务无线告警数近30天增长趋势");
    let resource = ref("");
    let mapChart = ref(null)
    let mapHeard = ref("")
    const isNation = ref(true) // 是否是全国视图
    //搜索框
    let searchInfo = ref("")
    const lineChart = ref(null)
    const lineChartTitle = ref('')
    //轮播
    let carousel = ref("");
    let dialogVisible = ref(false)
    let dialogVisibleTow = ref(false)
    // 地图顶部的卡片初始化
    let curCard = ref("全部");

    let currentPage = ref(1);
    let length = ref(10);
    let totalSize = ref(0);
    let tableDatas = ref([]);
    let conditions = ref({
      customerCode: '',
      customerName: '',
      serviceLevel: '',
      customerTrade: ''
    });
    const handleSizeChange = function (val) {
      console.log(`每页 ${val} 条`);
      length.value = val;
      queryCustomerPage()
    }
    const handleCurrentChange = function (val) {
      console.log(`当前页: ${val}`);
      currentPage.value = val;
      queryCustomerPage()
    }

    const queryCustomerPage = function () {
      $axios.post(queryCustomerUrl, {
        "page": currentPage.value,
        "length": length.value,
        "customerCode": conditions.value.customerCode || '',
        "customerName": conditions.value.customerName || '',
        "serviceLevel": conditions.value.serviceLevel || '',
        "customerTrade": conditions.value.customerTrade || ''
      }).then(res => {
        console.log(res)
        tableDatas.value = res.data;
        totalSize.value = res.count;
      })
    }

    //集团工单数
    let rightChart = ref(null);
    //集团工单数  左边环形图
    let ringchart = ref(null);
    //集团工单数  右边环形图
    let ringchart2 = ref(null);
    //雷达图
    let workorder = ref(null);
    const mapHeader = ref(""); // 地图标题
    // --TODO 地图初始化 --
    let mapData = ref({
      names: [],
      maxValues: [],
      info: []
    });
    let cardData = ref([
      { name: '全部', num: 666, effect: 34, line: 40 },
      { name: '勘察', num: 141, effect: 10, line: 20 },
      { name: '开通', num: 163, effect: 8, line: 20 },
      { name: '故障', num: 167, effect: 11, line: 30 },
      { name: '投诉', num: 163, effect: 5, line: 20 },
    ])

    let sysConfig = {};
    const queryDataUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgOrderData';
    const queryDataUrl2 = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgOrderData2';
    const queryCustomerUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/queryCustomerPage';
    let customerCode = ref('');
    let dpdata = ref({})
    let index_list = ref([{
      name: '全部',
      column: 'ORDER_COUNT',
    }, {
      name: '勘察',
      column: 'EXPLOR_ORDER_COUNT',
    }, {
      name: '开通',
      column: 'OPEN_ORDER_COUNT',
    }, {
      name: '故障',
      column: 'FAULT_ORDER_COUNT',
    }, {
      name: '投诉',
      column: 'COMPLAINT_ORDER_COUNT',
    }])
    let orgtype = ref('省');
    let orgname = ref('');
    let curTab = ref(0);
    let formInfo = ref({})
    const getCount = function (count) {
      let result = 0
      if (count) {
        count = count + ''
        if (count.indexOf('.') > -1) {
          count = count.substring(0, count.indexOf('.'))
        }
        let max = count.substring(0, 1);
        let f = parseInt(max) + 1;
        for (var i = 0; i < count.length - 1; i++) {
          f += '0'
        }
        result = parseInt(f)
      }
      return result
    }
    const queryData = function () {
      let url = queryDataUrl;
      if (sysConfig.dataShowType == '实时查询') {
        url = queryDataUrl2;
      }
      $axios.post(url, {
        "orgtype": orgtype.value || '省',
        "orgname": orgname.value || '',
        "customerCode": customerCode.value || ''
      }).then(res => {
        console.log(res)
        dpdata.value = res;
        formInfo.value = res.data
        cardData.value[0].num = res.data.ORDER_COUNT || 0;
        cardData.value[0].effect = res.data.CUSTOMER_COUNT || 0;

        cardData.value[1].num = res.data.EXPLOR_ORDER_COUNT || 0;
        cardData.value[1].effect = res.data.EXPLOR_CUSTOMER_COUNT || 0;
        cardData.value[2].num = res.data.OPEN_ORDER_COUNT || 0;
        cardData.value[2].effect = res.data.OPEN_CUSTOMER_COUNT || 0;
        cardData.value[3].num = res.data.FAULT_ORDER_COUNT || 0;
        cardData.value[3].effect = res.data.FAULT_CUSTOMER_COUNT || 0;
        cardData.value[4].num = res.data.COMPLAINT_ORDER_COUNT || 0;
        cardData.value[4].effect = res.data.COMPLAINT_CUSTOMER_COUNT || 0;
        mapHeard.value.setValue(cardData.value)

        mapData.value.area_name = orgname.value || '';
        mapData.value.info = res.data;
        mapData.value.list = res.regionList;
        mapData.value.index_list = index_list.value;
        mapData.value.view_index = curTab.value;
        mapChart.value.loadMapData();

        ringchart.value.setValues({
          title: "工单信息",
          info: [
            {
              value: res.data.GROUP_RUNNING_COUNT || 0,
              name: "正常在途",
              color: "#66E2F9",
            },
            {
              value: res.data.GROUP_WARNING_COUNT || 0,
              name: "即将超时",
              color: "#FCA703",
            },
            {
              value: res.data.GROUP_OVERTIME_COUNT || 0,
              name: "超时",
              color: "#F81D22",
            },
          ],
        });

        ringchart2.value.setValues({
          title: "工单信息",
          info: [
            {
              value: res.data.PROVINCE_RUNNING_COUNT || 0,
              name: "正常在途",
              color: "#66E2F9",
            },
            {
              value: res.data.PROVINCE_WARNING_COUNT || 0,
              name: "即将超时",
              color: "#FCA703",
            },
            {
              value: res.data.PROVINCE_OVERTIME_COUNT || 0,
              name: "超时",
              color: "#F81D22",
            },
          ],
        });

        var processObj = {
          ranking: "排名",
          province: "区域",
          Warn: "数量",
          Working: "数量",
          //value: ["昆明", "临沧", "普洱", "玉溪", "邵通", "丽江"],
          value: [],
          nun: [],
          //number: ["142", "126", "112", "52", "46", "16"],
          number: []
        };
        for (let i = 0; i <= 5; i++) {
          processObj.value.push(res.regionList[i].SHOWNAME);
          processObj.nun.push(95 - 5 * i);
          processObj.number.push(res.regionList[i].ORDER_COUNT);
        }

        processVis.value.setValues(processObj);

        var max = 0
        var toparray = [];
        for (let i = 0; i < res.topList.length; i++) {
          if (res.topList[i].TOP_TYPE == '全部') {
            if (res.topList[i].ORDER_COUNT > max) {
              max = res.topList[i].ORDER_COUNT
            }
            toparray.push({
              rank: res.topList[i].NAME,
              title: res.topList[i].ORDER_COUNT || 0,
              num: res.topList[i].OVERTIME_COUNT || 0,
              dispose: (res.topList[i].DEAL_RATE || 100) + '%',
            });
          }
        }
        carousel.value.setValues(toparray);

        max = getCount(max)
        var obj = {
          indicator: [],
          value: []
        }
        for (let i = 0; i < res.topList.length; i++) {
          if (res.topList[i].TOP_TYPE == '全部') {
            obj.indicator.push({ text: res.topList[i].NAME, max: max })
            obj.value.push(res.topList[i].ORDER_COUNT || 0);
          }
        }
        workorder.value.setValues(obj)

        lineChartTitle.value = '工单数近30日增长趋势'
        let lineChartData = [{
          "name": "数量",
          //"data": [89, 70, 67, 88, 59, 98, 50],
          data: [],
          //"xData": ["06-01", "06-05", "06-10", "06-15", "06-20", "06-25", "06-30"],
          xData: [],
          "yName": "单位： 个"
        }]
        for (let i = res.trendList.length - 1; i >= 0; i--) {
          lineChartData[0].xData.push(res.trendList[i].CDATE_STR);
          lineChartData[0].data.push(res.trendList[i].ORDER_COUNT || 0);
        }
        lineChart.value.setValues(lineChartData)

      })
    }

    const handleMapChange = val => {
      console.log('地图变化', val)
      orgtype.value = '地市';
      orgname.value = val.name;
      queryData();
    }
    const searchShow = val => {
      tableDatas.value = []
      conditions.value.customerName = ''
      conditions.value.customerCode = ''
      conditions.value.customerTrade = ''
      conditions.value.serviceLevel = ''
      dialogVisible.value = true
      if (val && val.dialogVisible) {
        conditions.value.customerName = val.condition.input
        dialogVisibleTow.value = false
      } else {
        dialogVisibleTow.value = true
      }
      queryCustomerPage();
    }

    const customerClick = (index) => {
      customerCode.value = tableDatas.value[index].CUSTOMER_CODE;
      queryData();
      dialogVisible.value = false
    }
    let packageType = ref('全部');
    const packageTypeChange = () => {
      let res = dpdata.value;
      var max = 0
      var toparray = [];
      for (let i = 0; i < res.topList.length; i++) {
        if (res.topList[i].TOP_TYPE == packageType.value) {
          if (res.topList[i].ORDER_COUNT > max) {
            max = res.topList[i].ORDER_COUNT
          }
          toparray.push({
            rank: res.topList[i].NAME,
            title: res.topList[i].ORDER_COUNT || 0,
            num: res.topList[i].OVERTIME_COUNT || 0,
            dispose: (res.topList[i].DEAL_RATE || 100) + '%',
          });
        }
      }
      carousel.value.setValues(toparray);

      max = getCount(max)
      var obj = {
        indicator: [],
        value: []
      }
      for (let i = 0; i < res.topList.length; i++) {
        if (res.topList[i].TOP_TYPE == packageType.value) {
          obj.indicator.push({ text: res.topList[i].NAME, max: max })
          obj.value.push(res.topList[i].ORDER_COUNT || 0);
        }
      }
      workorder.value.setValues(obj)
    }

    let formType = ref('工单数');
    let formTypeObj = {
      '工单数': 'ORDER_COUNT', '超时工单数': 'OVERTIME_COUNT', '处理平均时长': 'DEAL_LENGTH', '处理及时率': 'DEAL_RATE',
      '全部': '', '勘察': 'EXPLOR_', '开通': 'OPEN_', '故障': 'FAULT_', '投诉': 'COMPLAINT_'
    };
    const formTypeChange = () => {
      var key = formTypeObj[curCard.value] + formTypeObj[formType.value];
      processVis.value.setTitle(formType.value + "排名");
      var processObj = {
        ranking: "排名",
        province: "区域",
        Warn: "数量",
        Working: "数量",
        //value: ["昆明", "临沧", "普洱", "玉溪", "邵通", "丽江"],
        value: [],
        nun: [],
        //number: ["142", "126", "112", "52", "46", "16"],
        number: []
      };
      var array = dpdata.value.regionList;
      array.sort(function (a, b) { return b[key] - a[key] });
      for (let i = 0; i <= 5; i++) {
        processObj.value.push(array[i].SHOWNAME);
        processObj.nun.push(95 - 5 * i);
        processObj.number.push(array[i][key]);
      }
      processVis.value.setValues(processObj);

      lineChartTitle.value = formType.value + '近30日增长趋势'
      let lineChartData = [{
        "name": "",
        //"data": [89, 70, 67, 88, 59, 98, 50],
        data: [],
        //"xData": ["06-01", "06-05", "06-10", "06-15", "06-20", "06-25", "06-30"],
        xData: [],
        "yName": ""
      }]
      for (let i = dpdata.value.trendList.length - 1; i >= 0; i--) {
        lineChartData[0].xData.push(dpdata.value.trendList[i].CDATE_STR);
        lineChartData[0].data.push(dpdata.value.trendList[i][key] || 0);
      }
      lineChart.value.setValues(lineChartData)

    }
    const handleCardChange = (item) => {
      if (item.name === curCard.value) return;
      curCard.value = item.name;

      let ii = 0;
      cardData.value.forEach(function (data, index) {
        if (item.name == data.name) {
          ii = index;
        }
      })
      mapData.value.area_name = orgname.value || '';
      mapData.value.info = dpdata.value.data;
      mapData.value.list = dpdata.value.regionList;
      mapData.value.index_list = index_list.value;
      mapData.value.view_index = ii;
      mapChart.value.loadMapData();

      formTypeChange();

    };

    const handleBack = () => {
      orgtype.value = '省';
      orgname.value = '';
      queryData();
    };
    onMounted(() => {
      var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
      globalStyle.value = { height: h + 'px', 'box-sizing': 'border-box' }
      mapHeader.value.setTitle("流程可视化");
      processVis.value.setTitle("工单数排名");
      lineChartTitle.value = "工单数进30日趋势"
      $axios.get('/config/govcharts/map/config.json').then(d => {
        sysConfig = d;
        queryData()
      })
    });

    return {
      mapData,
      refPullOut,
      lineTitle,
      handleCardChange,
      curCard,
      processVis,
      resource,
      rightChart,
      workorder,
      carousel,
      ringchart,
      ringchart2,
      handleBack,
      mapHeader,
      mapChart,
      mapHeard,
      handleMapChange,
      searchShow,
      dialogVisible,
      dialogVisibleTow,
      isNation,
      searchInfo,
      formInfo,
      lineChart,
      lineChartTitle,
      currentPage, totalSize, handleSizeChange, handleCurrentChange, conditions, tableDatas, customerClick,
      formType,
      formTypeChange,
      packageType,
      packageTypeChange,
      globalStyle
    };
  },
};
</script>
<style>
/*----------------------*/

/*.dialog .el-dialog__headerbtn {*/
/*  top: 14.1px;*/
/*}*/
/*----------------------*/
</style>
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
  height: 65%;
}
.row-2 {
  height: 34.5%;
  margin-top: 0.5%;
}

.card-left {
  height: 100%;
  background-color: #fff;
}

.card-right.card-1 {
  height: 54px;
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-2 {
  width: 100%;
  height: calc(calc(100% - 65px) * 0.5 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-3 {
  width: 100%;
  height: calc(calc(100% - 65px) * 0.5);
  background-color: #fff;
}

.card-right.card-4 {
  height: 136px;
  background-color: #fff;
}

.card-bottom.card-1 {
  background-color: #fff;
}

.card-bottom.card-2 {
  height: 256px;
  background-color: #fff;
}

.card-bottom.card-3 {
  height: 256px;
  background-color: #fff;
}

.card-with-title {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAACCAYAAABfRCKeAAAAAXNSR0IArs4c6QAAADtJREFUOE9jTHv0+z/DKKAsBBgZGmbJsjamPf5dz/CfoYGB2nwmxun//v1fzjgaWZTFE9UjBkdEg1wJAN7BVIF2uvibAAAAAElFTkSuQmCC);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.32);
  /*box-shadow: 0px 0px 6px -2px rgb(255 255 255 / 0%);*/
}

/*-----------map-top------------*/
.map-top {
  margin: 10px 10px 0;
}

.bottom-ul {
  height: 30px;
  line-height: 30px;
  /*background-color: #2FCE7C;*/
  display: flex;
  justify-content: space-around;
}

.bottom-ul li {
  display: inline-block;
  width: auto;
  padding: 0 20px;
  text-align: center;
  list-style: none;
  background-color: #fafbfc;
  cursor: pointer;
}

.bottom-ul li:first-child {
  display: inline-block;
  text-align: center;
  list-style: none;
  color: #fff;
  background-image: linear-gradient(135deg, #26a7ff 0%, #0066ff 100%);
}

.float-title {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.float-titles {
  position: absolute;

  left: 1135px;
  top: 80px;

  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 24px;
  text-shadow: 0px 0px 6px #26a7ff;
}

.float-titles p {
  float: left;
  font-size: 14px;
  color: #fff;
  line-height: 20px;
  margin-right: 10px;
  margin-left: 10px;
}

.float-titles-right {
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

.float-title-right {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
  /*border: 1px solid #B1D8FF;*/
  z-index: 1;
}

/*不规则四边形*/
.case-distribution-line {
  position: relative;
  float: right;
  width: 324px;
  /*margin-top: 10px;*/
}

.case-distribution-line > div {
  color: #fff;
  text-align: center;
  line-height: 30px;
}

.case-distribution-one {
  position: absolute;
  left: 0;
  top: 0;
  width: 75px;
  height: 0;
  border-top: 30px solid #0066ff;
  border-left: 30px solid #0066ff;
  border-right: 11px solid transparent;
  cursor: pointer;
}

.case-distribution-two,
.case-distribution-three {
  position: absolute;
  left: 75px;
  top: 0;
  width: 75px;
  height: 30px;
  background: #0066ff;
  transform: skew(-20deg);
  cursor: pointer;
}

.case-distribution-three {
  left: 156px;
}

.case-distribution-fore {
  position: absolute;
  left: 231px;
  top: 0;
  width: 75px;
  height: 0;
  border-top: 30px solid #0066ff;
  border-left: 30px solid #0066ff;
  border-right: 11px solid transparent;
  transform: rotateZ(180deg);
  cursor: pointer;
}

.case-distribution-one p,
.case-distribution-fore p {
  position: absolute;
  left: -20px;
  right: 0;
  top: -25px;
  text-align: center;
  line-height: 24px;
  margin: auto;
}

.case-distribution-fore p {
  top: -24px;
}

.case-distribution-fore p {
  transform: rotateZ(180deg);
}

.case-distribution-two p,
.case-distribution-three p {
  transform: skew(20deg);
  line-height: 24px;
}

.float-menu-btn {
  position: absolute;
  top: 190px;
  left: 32px;
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
  top: 190px;
  left: 62px;
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
  background: #141b2dcc;
}

.dialog :deep(.el-dialog__headerbtn) {
  z-index: 10;
  top: 5px;
}

.dialog :deep(.el-dialog__body) {
  padding: 0 10px 10px;
}

.dialog .dialog :deep(.el-dialog) {
  border-radius: 10px 10px 10px 10px;
}
</style>
