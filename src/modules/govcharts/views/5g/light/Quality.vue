<template>
  <!-- 界面元素 -->
  <div
    class="page-wrapper1"
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
          <div style="width:100%;height: calc(100% - 140px);">
            <Map
              ref="mapChart"
              @handleMapChange="handleMapChange"
              @handleBack="handleBack"
              :data="mapData"
              :cur-card="curCard"
            ></Map>
          </div>
        </div>
      </el-col>
      <el-col
        :span="10"
        style="height:100%;"
      >
        <div class="card-right card-1">
          <SearchInfo @searchShow="searchShow"></SearchInfo>
        </div>
        <div class="card-right card-2">
          <GaugeColored3
            ref="accessQuotaRef"
            @self-refresh="accessQuotaRefresh"
          ></GaugeColored3>
        </div>
        <div class="card-right card-3">
          <PullOutTest ref="refPullOut"></PullOutTest>
        </div>
        <div class="card-right card-4">
          <EffectWarning ref="refEffectWarning"></EffectWarning>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="row-2"
      :gutter="15"
    >
      <el-col
        :span="6"
        style="height:100%;"
      >
        <div class="card-bottom card-1">
          <WarnRanking ref="refWarn_1"></WarnRanking>
        </div>
      </el-col>
      <el-col
        :span="6"
        style="height:100%;"
      >
        <div class="card-bottom card-2">
          <WarnRanking ref="refWarn_2"></WarnRanking>
        </div>
      </el-col>
      <el-col
        :span="12"
        style="height:100%;"
      >
        <div class="card-bottom card-3">
          <LineChart
            :title="lineTitle"
            ref="lineChart"
          ></LineChart>
        </div>
      </el-col>
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
import { ref } from '@vue/reactivity';
import { inject, onMounted } from '@vue/runtime-core';
import GaugeColored3 from '@/components/common/GaugeColored3Light.vue';
import PullOutTest from "@/components/qualityservice/PullOutTestLight";
import EffectWarning from "@/components/qualityservice/EffectWarningLight"
import Map from "@/components/topicsupport/CommonMap";
import MapTopCard from "@/components/common/MapTopCardLight";
import WarnRanking from "@/components/emergency/WarnRankingLight2";
import LineChart from "@/components/common/LineChartLight";
import SearchInfo from "@/components/common/SearchInfoLight";
import MapHeader from "@/components/common/MapHeaderLight";

export default {
  components: {
    MapHeader,
    SearchInfo,
    LineChart,
    Map,
    GaugeColored3,
    PullOutTest,
    EffectWarning,
    WarnRanking,
    MapTopCard
  },
  setup () {
    // 声明axios
    const $axios = inject('$axios')
    let sysConfig = {};
    //const url = '/ser-govplat-comservice/api/rest/commService/v1/getData'
    const queryDataUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgQualityData';
    const queryDataUrl2 = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgQualityData2';
    const queryCustomerUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/queryCustomerPage';
    let globalStyle = ref({});
    let mapHeader = ref('')
    let dialogVisible = ref(false)
    let dialogVisibleTow = ref(false)
    let refWarn_1 = ref('')
    let refWarn_2 = ref('')
    let refEffectWarning = ref('')
    let refPullOut = ref('')
    let lineTitle = ref('在线用户数趋势')
    const lineChart = ref(null)
    // 地图顶部的卡片初始化
    let curCard = ref('在线用户数')
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
    let mapTopCardList = ref([
      {
        "key": "0",
        "name": "在线用户数",
        "value": 12493,
        "img": "CIcon-Avatar",
        "color": "rgba(46, 196, 120, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)"
      },
      {
        "key": "1",
        "name": "PDU会话数",
        "value": 32351,
        "img": "CIcon-Sound-One",
        "color": "rgba(17, 174, 220, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(17, 174, 220, 0.64) 0%, rgba(17, 174, 220, 0.32) 100%)"
      },
      {
        "key": "2",
        "name": "上行流量",
        "value": 867.13,
        "img": "CIcon-Card-Two",
        "color": "rgba(255, 170, 6, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(255, 170, 6, 0.64) 0%, rgba(255, 170, 6, 0.32) 100%)"
      },
      {
        "key": "3",
        "name": "下行流量",
        "value": 412.98,
        "img": "CIcon-Sim-Card",
        "color": "rgba(2, 106, 255, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(2, 106, 255, 0.64) 0%, rgba(2, 106, 255, 0.32) 100%)"
      }
    ])
    let customerCode = ref('');
    let dpdata = ref({})
    let index_list = ref([{
      name: '在线用户数',
      column: 'ONLINE_USER_COUNT',
    }, {
      name: 'PDU会话数',
      column: 'PDU_SESSION_COUNT',
    }, {
      name: '上行流量',
      column: 'UP_FLOW',
    }, {
      name: '下行流量',
      column: 'DOWN_FLOW',
    }])
    let orgtype = ref('省');
    let orgname = ref('');
    let curTab = ref(0);
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

        mapTopCardList.value[0].value = res.data.ONLINE_USER_COUNT || 0
        mapTopCardList.value[1].value = res.data.PDU_SESSION_COUNT || 0
        mapTopCardList.value[2].value = res.data.UP_FLOW || 0
        mapTopCardList.value[3].value = res.data.DOWN_FLOW || 0

        dpdata.value = res;
        mapData.value.area_name = orgname.value || '';
        mapData.value.info = res.data;
        mapData.value.list = res.regionList;
        mapData.value.index_list = index_list.value;
        mapData.value.view_index = curTab.value;
        mapChart.value.loadMapData();

        //业务质量接入指标
        accessQuotaRef.value.setValues([
          {
            "name": "无线接通率", "value": res.data.WIRELESS_CONNECT_RATE || 0
          },
          {
            "name": "注册成功率", "value": res.data.REGISTER_SUCCEED_RATE || 0
          },
          {
            "name": "PDU会话建立成功率", "value": res.data.PDU_SESSION_SUCCEED_RATE || 0
          }
        ])
        refPullOut.value.setValue({
          "province": "上海",
          "projectName": "上海港ABS项目",
          "businessName": "上海港港口龙头吊",
          "date": "2021-06-12",
          "delay": res.data.TIME_DELAY || 0,
          "shake": res.data.SHAKE || 0,
          "upload": res.data.AVG_UP_SPEED || 0,
          "download": res.data.AVG_DOWN_SPEED || 0
        })
        refEffectWarning.value.setValue([
          { "name": "无线网", "num": res.data.WIRELESS_ALARM_COUNT || 0, "effect": res.data.WIRELESS_ALARM_CUSTOMER_COUNT || 0, "line": 56 },
          { "name": "传输网", "num": res.data.TRANS_ALARM_COUNT || 0, "effect": res.data.TRANS_ALARM_CUSTOMER_COUNT || 0, "line": 92 },
          { "name": "核心网", "num": res.data.CORE_ALARM_COUNT || 0, "effect": res.data.CORE_ALARM_CUSTOMER_COUNT || 0, "line": 24 },
          { "name": "影响客户数", "num": res.data.ALARM_CUSTOMER_COUNT || 0, "effect": null, "line": null }
        ])
        var array = [];
        for (let i = 0; i <= 4; i++) {
          array.push({
            NAME: res.regionList[i].SHOWNAME,
            COUNT: res.regionList[i].ONLINE_USER_COUNT
          });
        }
        refWarn_1.value.setRanking({
          ranking: ' 排名',
          province: "区域",
          warn: "数量",
          list: array
        })
        refWarn_2.value.setRanking({
          ranking: ' 排名',
          province: "行业",
          warn: "数量",
          list: res.topList
        })
        let lineChartData = [{
          "name": "在线用户数",
          //"data": [89, 70, 67, 88, 59, 98, 50],
          data: [],
          //"xData": ["06-01", "06-05", "06-10", "06-15", "06-20", "06-25", "06-30"],
          xData: [],
          "yName": "单位： 个"
        }]
        for (let i = res.trendList.length - 1; i >= 0; i--) {
          lineChartData[0].xData.push(res.trendList[i].CDATE_STR);
          lineChartData[0].data.push(res.trendList[i].ONLINE_USER_INCREASE_COUNT || 0);
        }
        lineChart.value.setValues(lineChartData)
      })
    }
    // 业务质量-接入指标
    let accessQuotaRef = ref(null);
    /** ----------------------------TODO 地图初始化 ---------------------------------------------- */
    let isNation = ref(true) // 是否是全国视图
    /**------------------------------------ */
    let mapData = ref({
      names: [],
      maxValues: [],
      info: []
    });
    let mapChart = ref('');

    // ---------------------------------------> 下钻 子组件双击后传给父级的数据   云南数据
    function handleMapChange (val) {
      console.log('打印下钻数据');
      console.log(val);
      orgtype.value = '地市';
      orgname.value = val.name;
      queryData();

    }

    // ----------------------------------------------------------------------->>返回
    const handleBack = () => { // 返回全国视图
      orgtype.value = '省';
      orgname.value = '';
      queryData();
    } // 返回

    /** ---------------------------------------------END----------------------------------------------------------------- */

    /** ----------------------------------------与弹框组件数据交互------------------------------------------------- */
    //let tableInfoUrl = ref('')
    function searchShow (val) {
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


    /** -----------------------------------------------END-------------------------------------------------- */

    /**
     * 点击卡片事件
     */
    const handleCardChange = item => {
      if (item.name === curCard.value) return
      curCard.value = item.name
      let ii = 0;
      mapTopCardList.value.forEach(function (data, index) {
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
    }
    // 业务质量-接入指标
    const accessQuotaRefresh = () => {
      console.log("业务质量-接入指标刷新按钮被点击")
    }
    onMounted(() => {
      var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
      globalStyle.value = { height: h + 'px', 'box-sizing': 'border-box' }
      $axios.get('/config/govcharts/map/config.json').then(d => {
        sysConfig = d;
        queryData()
      })
      mapHeader.value.setTitle("质量可视化");
      // 业务质量-接入指标组件数据设置
      accessQuotaRef.value.setTitle("业务质量-接入指标");
      refEffectWarning.value.setTitle('网络质量-影响业务告警');
      refWarn_1.value.setTitle("在线用户数分区域排名");
      refWarn_2.value.setTitle("在线用户数分行业排名");
    })

    return {
      isNation,
      accessQuotaRef,
      accessQuotaRefresh,
      mapData,
      refWarn_1,
      refWarn_2,
      refEffectWarning,
      refPullOut,
      lineTitle,
      mapTopCardList,
      handleCardChange,
      curCard,
      dialogVisible,
      dialogVisibleTow,
      searchShow,
      handleMapChange,
      mapChart,
      handleBack,
      mapHeader,
      lineChart,
      currentPage, totalSize, handleSizeChange, handleCurrentChange, conditions, tableDatas, customerClick,
      globalStyle
    }
  }
}
</script>
<style>
.dialog-dataaaa .dialog {
  width: 70%;
}
.dialog-dataaaa .el-overlay {
  height: 120%;
}
.dialog-dataaaa .el-dialog {
  background: #fff !important;
  margin-top: 5vh !important;
}

.dialog-dataaaa .el-dialog__body {
  padding: 0 10px 10px;
}

.dialog-dataaaa .dialog .el-dialog {
  border-radius: 10px 10px 10px 10px;
}

/*.dialog-dataaaa .el-dialog__headerbtn {*/
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
  height: calc(calc(100% - 65px) * 0.4 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-3 {
  height: calc(calc(100% - 65px) * 0.3 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-4 {
  height: calc(calc(100% - 65px) * 0.3);
  background-color: #fff;
}

.card-bottom.card-1 {
  height: 100%;
  background-color: #fff;
}

.card-bottom.card-2 {
  height: 100%;
  background-color: #fff;
}

.card-bottom.card-3 {
  height: 100%;
  background-color: #fff;
}

/*-----------map-top------------*/
.map-top {
  margin: 10px 10px 0;
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
</style>
