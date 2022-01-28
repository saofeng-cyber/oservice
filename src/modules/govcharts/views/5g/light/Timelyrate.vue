<template>
  <!-- 界面元素 -->
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
        style="height: 100%;"
      >
        <div class="card-left">
          <div class="button-img">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-select
                  v-model="dropDownValue"
                  placeholder="全部行业"
                  size="small"
                >
                  <el-option
                    v-for="(item,index) in dropDownOptions"
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
                  style="text-align:center;"
                >
                  <el-radio-button
                    label="全部"
                    @click="queryData()"
                  ></el-radio-button>
                  <el-radio-button
                    label="优享"
                    @click="queryData()"
                  ></el-radio-button>
                  <el-radio-button
                    label="专享"
                    @click="queryData()"
                  ></el-radio-button>
                  <el-radio-button
                    label="尊享"
                    @click="queryData()"
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
              <el-col
                :span="1"
                style="padding-top: 6px;"
              >
                <i
                  class="el-icon-search"
                  @click="searchShow"
                ></i>
              </el-col>
            </el-row>
            <!--<el-select
              v-model="dropDownValue2"
              placeholder="选择DNN"
              class="elselect"
            >
              <el-option
                v-for="(item,index) in dropDownOptions2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="changeTrade(index)"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="dropDownValue3"
              placeholder="选择切片"
              class="elselect"
            >
              <el-option
                v-for="(item,index) in dropDownOptions3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="changeTrade(index)"
              >
              </el-option>
            </el-select>-->
          </div>
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
          <div style="width:100%;height: calc(100% - 135px);">
            <Map
              ref="mapChart"
              @handleMapChange="handleMapChange"
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
          <Dashboard ref="dashboard"></Dashboard>
        </div>
        <div class="card-right card-2">
          <SlaProcessLight ref="slaProcessLight"></SlaProcessLight>
        </div>
        <div class="card-right card-3">
          <Histogram ref="histogram"></Histogram>
        </div>
        <div class="card-right card-4">
          <div class="res-main">

            <div class="top-title">
              <div class="float-title">
                <span class="i"></span>
                售前工单分析
              </div>
              <div
                class="float-title-right"
                @click="selfRefresh"
              >
                <i class="el-icon-refresh"></i>
              </div>
            </div>
            <div style="padding: 5px 10px;background-color:#fff;height:52px;">
              <div class="res-num">
                <div style="color:#4b5575;">投诉在途工单数</div>
                <div style="color:#fa951d;background-color:#fafbfc;">{{dpdata.data.ORDER_TRANSIT || 0}}</div>
              </div>
              <div class="res-num">
                <div style="color:#4b5575;">投诉超时工单数</div>
                <div style="color:#fa951d;background-color:#fafbfc;">{{dpdata.data.ORDER_COMPLAINTS_OUT || 0}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="row-2"
      :gutter="15"
    >
      <div class="card-bottom card-1">
        <BarChart ref="refBarChart"></BarChart>
      </div>
    </el-row>
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
import { computed, ref } from '@vue/reactivity';
import { inject, onMounted } from '@vue/runtime-core';
import MapTopCard from "@/components/common/MapTopCardLight.vue";
import Map from "@/components/topicsupport/CommonMap";
import SlaProcessLight from "@/components/common/SlaProcessLight";
import Dashboard from "@/components/common/Dashboard";
import Histogram from "@/components/common/Histogram";
import BarChart from "@/components/common/BarChartTime";


export default {
  components: {
    Map,
    SlaProcessLight,
    Histogram,
    Dashboard,
    MapTopCard,
    BarChart
  },
  setup () {
    // 声明axios
    const $axios = inject('$axios')
    let sysConfig = {};
    let globalStyle = ref({});
    let dialogVisible = ref(false)
    let dialogVisibleTow = ref(false)
    // 地图顶部的卡片初始化
    let curCard = ref('在线用户数')
    let mapTopCardList = ref([])
    let busType = ref('全部');
    let allindustries = ref('全部行业');
    let customer = ref('选择客户');
    let selectdnn = ref('选择DNN');
    let section = ref('选择切片');
    let formType = ref('开通');
    let slaProcessLight = ref('');
    let dashboard = ref('');
    let histogram = ref('');
    let ringChart = ref('');
    let refBarChart = ref('');
    let dpdata = ref({ data: {} })
    let vif = ref(false)

    let dropDownOptions = ref('')
    let dropDownOptions1 = ref('')
    let dropDownOptions2 = ref('')
    let dropDownOptions3 = ref('')

    let dropDownValue = ref('')
    let dropDownValue1 = ref('')
    let dropDownValue2 = ref('')
    let dropDownValue3 = ref('')
    let radio2 = ref('全部')

    const mapChart = ref(null);
    const queryDataUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgTimelyRateData';
    const queryDataUrl2 = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgTimelyRateData2';
    const queryCustomerUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/queryCustomerPage';

    let customerName = ref('');
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

    const customerChange = function () {
      customerName.value = '';
      dropDownValue1.value = '';
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

    function searchShow () {
      tableDatas.value = []
      conditions.value.customerName = ''
      conditions.value.customerCode = ''
      conditions.value.customerTrade = ''
      conditions.value.serviceLevel = ''
      dialogVisible.value = true
      queryCustomerPage();
    }

    const customerClick = (index) => {
      customerName.value = tableDatas.value[index].ZH_LABEL;
      dropDownValue1.value = tableDatas.value[index].CUSTOMER_CODE;
      queryData();
      dialogVisible.value = false
    }

    const dataFormate = (date) => {
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return MM + DD
    }
    const initData = () => {
      dropDownOptions.value = [{ value: '选项1', label: '全部行业' },
      { value: '选项2', label: '医疗' },
      { value: '选项3', label: '教育' },
      { value: '选项4', label: '新能源' },
      { value: '选项5', label: '金融' }]
      dropDownOptions1.value = [{ value: '选项1', label: '全部客户' },
      { value: '选项2', label: '爱康科技' },
      { value: '选项3', label: '阳煤化工' },
      { value: '选项4', label: '美锦能源' },
      { value: '选项5', label: '科达制造' }]
      dropDownOptions2.value = [{ value: '选项1', label: '全部DNN' },
      { value: '选项2', label: '专用DNN' },
      { value: '选项3', label: '通用DNN' }]
      dropDownOptions3.value = [{ value: '选项1', label: '全部切片' },
      { value: '选项2', label: '业务切片' },
      { value: '选项3', label: '网络切片' },
      { value: '选项4', label: '无线子切片' },
      { value: '选项5', label: '核心子切片' },
      { value: '选项6', label: '传输子切片' }]
    }
    const queryData = function (orgType, city) {
      let url = queryDataUrl;
      if (sysConfig.dataShowType == '实时查询') {
        url = queryDataUrl2;
      }
      $axios.post(url, {
        "orgType": orgType || '省',
        "orgName": city || '',
        "packageName": radio2.value == '全部' ? "" : radio2.value || "",
        "customer": dropDownValue1.value == '全部客户' ? "" : dropDownValue1.value || "",
        "trade": dropDownValue.value == '全部行业' ? "" : dropDownValue.value || "",
        "dnn": dropDownValue2.value == '全部DNN' ? "" : dropDownValue2.value || "",
        "snssai": dropDownValue3.value == '全部切片' ? "" : dropDownValue3.value || "",
        "granularity": ""
      }).then(res => {
        console.log(res)
        dpdata.value = res;

        var tradeArray = [{ value: '', label: '全部行业' }];
        res.industrylist.forEach(function (item) {
          tradeArray.push({ value: item.INDUSTRY_NAME, label: item.INDUSTRY_NAME });
        })
        dropDownOptions.value = tradeArray;

        mapData.value.area_name = city || '';
        mapData.value.info = dpdata.value.data;
        mapData.value.list = dpdata.value.gmlist;
        mapData.value.index_list = [{
          name: '性能预警工单数',
          column: 'SLA_YW',
        }];
        mapChart.value.loadMapData();

        dashboard.value.setTitle('工单及时率')
        dashboard.value.setValue([
          { name: '开通及时率', num: res.data.RATE_OPEN || 100 },
          { name: '投诉处理及时率', num: res.data.RATE_COMOLAINT || 100 },
          { name: '故障处理及时率', num: res.data.RATE_FAULT || 100 },
        ])

        slaProcessLight.value.setTitle('网络性能质量分析');
        slaProcessLight.value.setValue([
          { name: 'SLA时率', num: res.data.SLA_SY || 0 },
          { name: 'SLA速率', num: res.data.SLA_SUL || 0 },
          { name: 'SLA业务可用', num: res.data.SLA_YW || 0 }
        ])

        histogram.value.setTitle('售前工单分析')
        histogram.value.setValue([
          { xname: ['正常工单数', '预警工单数', '超时工单数'], ynum: [res.data.ORDER_ZC || 0, res.data.ORDER_YJ || 0, res.data.ORDER_CS || 0], colorb: '#ffa800', colort: '#ffe1a6' }
        ])
        vif.value = true;

        refBarChart.value.setTitle('质量趋势')
        let xdata = []
        let y1data1 = []
        let y1data2 = []
        let y2data1 = []
        let y2data2 = []
        let y3data1 = []
        let y3data2 = []

        for (var i = res.trendlist.length - 1; i--; i >= 0) {
          let item = res.trendlist[i];
          xdata.push(dataFormate(item.CDATE));
          y1data1.push(item.ORDER_OPEN || 0);
          y1data2.push(item.RATE_OPEN || 0);
          y2data1.push(item.ORDER_COMPLAINTS || 0);
          y2data2.push(item.RATE_COMOLAINT || 0);
          y3data1.push(item.ORDER_FAULT || 0);
          y3data2.push(item.RATE_FAULT || 0);
        }

        refBarChart.value.setValue([
          { yname: '开通趋势图', xname: xdata, ynum: y1data1, ynumber: y1data2, colorb: '#2ec478', colort: '#d3f7e5' },
          { yname: '投诉趋势图', xname: xdata, ynum: y2data1, ynumber: y2data2, colorb: '#ffa800', colort: '#f2eed7' },
          { yname: '故障趋势图', xname: xdata, ynum: y3data1, ynumber: y3data2, colorb: '#0eacda', colort: '#d0f1fe' }
        ])

        mapTopCardList.value = [
          { "key": "0", "name": "开通及时率", "value": res.data.RATE_OPEN, "img": "CIcon-Avatar", "color": "rgba(46, 196, 120, 1)", "backgroundColor": "linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)" },
          { "key": "1", "name": "投诉处理及时率", "value": res.data.RATE_COMOLAINT, "img": "CIcon-Sound-One", "color": "rgba(17, 174, 220, 1)", "backgroundColor": "linear-gradient(360deg, rgba(17, 174, 220, 0.64) 0%, rgba(17, 174, 220, 0.32) 100%)" }, {
            "key": "2",
            "name": "故障处理及时率",
            "value": res.data.RATE_FAULT,
            "img": "CIcon-Card-Two",
            "color": "rgba(255, 170, 6, 1)",
            "backgroundColor": "linear-gradient(360deg, rgba(255, 170, 6, 0.64) 0%, rgba(255, 170, 6, 0.32) 100%)"
          }]
      })
    }

    const changeTrade = (index) => {
      queryData()
    }

    /** ----------------------------TODO 地图初始化 ---------------------------------------------- */
    let isNation = ref(true) // 是否是全国视图
    // 获取左侧菜单
    const $topstore = inject('$topstore');
    let leftMenus;
    if ($topstore)
      leftMenus = computed(() => $topstore.getters["layout/getLeftMenus"]);

    // 打开浮动的左菜单
    const showLeftMenu = ref(false);
    const openLeftMenu = (menu) => {
      $topstore.dispatch("global/openDialog", {
        type: 'iframe',
        app: {
          entry: menu.menuUrl
        }
      });
    }
    /**------------------------------------ */
    let mapData = ref({
      names: [],
      maxValues: [],
      info: []
    });


    // ---------------------------------------> 下钻 子组件双击后传给父级的数据   云南数据
    function handleMapChange (val) {
      console.log('打印下钻数据');
      console.log(val);
      queryData('地市', val.name);
    }

    // ----------------------------------------------------------------------->>返回
    const handleBack = () => { // 返回全国视图
      mapChart.value.onBackDblclick()
      mapChart.value.loadMapData()
    } // 返回

    onMounted(() => {
      var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
      globalStyle.value = { height: h + 'px', 'box-sizing': 'border-box' }
      $axios.get('/config/govcharts/map/config.json').then(d => {
        sysConfig = d;
        queryData()
      })
      //initData()
    })

    /** ---------------------------------------------END----------------------------------------------------------------- */

    /**
     * 点击卡片事件
     */
    const handleCardChange = item => {
      if (item.name === curCard.value) return
      curCard.value = item.name
    }

    return {
      leftMenus,
      showLeftMenu,
      openLeftMenu,
      isNation,


      mapData,
      mapTopCardList,
      handleCardChange,
      curCard,
      dialogVisible,
      dialogVisibleTow,

      handleMapChange,
      mapChart,
      handleBack,
      busType,
      allindustries,
      customer,
      selectdnn,
      section,
      histogram,
      formType,
      dashboard,
      ringChart,
      slaProcessLight,
      refBarChart,
      queryData,
      dpdata,
      vif,
      dataFormate,
      initData,
      dropDownOptions,
      dropDownOptions1,
      dropDownOptions2,
      dropDownOptions3,
      dropDownValue,
      dropDownValue1,
      dropDownValue2,
      dropDownValue3,
      radio2,
      changeTrade,
      globalStyle,
      currentPage, totalSize, handleSizeChange, handleCurrentChange, conditions, tableDatas, customerClick, searchShow,
      customerName, customerChange
    }
  }
}
</script>
<style>
.dialog-data .dialog {
  margin-top: 40vh;
  width: 70%;
}

.dialog-data .el-dialog {
  background: #fff !important;
  margin-top: 30vh !important;
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
.page-wrapper {
  padding: 15px;
}

.page-wrapper * {
  box-sizing: border-box;
}

.row-1 {
  height: 70%;
}
.row-2 {
  height: 29.5%;
  margin-top: 0.5%;
}

.card-left {
  height: 100%;
  background-color: #fff;
}

.card-right.card-1 {
  height: calc(calc(100% - 230px) * 0.6 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-2 {
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-3 {
  height: calc(calc(100% - 230px) * 0.4 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-4 {
  background-color: #fff;
}

.card-bottom.card-1 {
  height: 270px;
  width: 100%;
  background-color: #fff;
  position: relative;
}

/*-----------map-top------------*/
.map-top {
  margin: 0 10px;
}

/*--二级菜单--*/
.float-menu-btn {
  position: absolute;
  top: 165px;
  left: 21px;
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

.button-img {
  width: 100%;
  padding: 10px;
  cursor: pointer;
  display: inline-block;
}

.elselect {
  float: left;
  width: 110px;
  height: 50px;
  margin-right: 10px;
}

.elbutton {
  float: left;
  width: 250px;
  height: 50px;
  margin-right: 10px;
}

.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}

.res-main {
  padding: 0 10px;
  background-color: #fff;
}

.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 39px;
  border-bottom: 1px solid #eee;
}

.float-title {
  font-weight: 500;
  line-height: 24px;
}

.float-title-right {
  width: 16px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50%;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
  cursor: pointer;
}

.res-num {
  float: left;
  width: 45%;
  margin-right: 5%;
  border: 1px solid #ebeef5;
  padding: 0 2%;
}

.res-num div {
  float: left;
  width: 50%;
  line-height: 40px;
}
</style>
