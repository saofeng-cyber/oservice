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
        style="height:100%"
      >
        <div class="card-left">
          <div class="button-img">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-select
                  :popper-append-to-body="false"
                  placeholder="全部行业"
                  v-model="allindustries"
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
                  v-model="busType"
                  size="small"
                  style="text-align:center;"
                >
                  <el-radio-button
                    v-for="(item,index) in busdata"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="changeTrade(index)"
                  >
                  </el-radio-button>
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
                <!--<el-select
                  :popper-append-to-body="false"
                  placeholder="选择客户"
                  v-model="customer"
                  size="small"
                >
                  <el-option
                    v-for="(item,index) in dropDownOptions1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click="changeTrade(index)"
                  >
                  </el-option>
                </el-select>-->
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
              :popper-append-to-body="false"
              placeholder="选择DNN"
              v-model="selectdnn"
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
              :popper-append-to-body="false"
              placeholder="选择切片"
              v-model="section"
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
          <div style="width:100%;height: calc(100% - 135px)">
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

        <div class="card-right card-2">
          <EquipmentStatus ref="equipmentStatus"></EquipmentStatus>
        </div>
        <div class="card-right card-3">
          <RotateData ref="rotateData"></RotateData>
        </div>
        <div class="card-right card-4">
          <div
            class="card-right card-4-left"
            style="width:49%;"
          >
            <ButList ref="butList"></ButList>
          </div>
          <div
            class="card-right card-4-right"
            style="width:49%;"
          >
            <ButProgress ref="butProgress"></ButProgress>
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
import { ref } from '@vue/reactivity';
import { inject, onMounted } from '@vue/runtime-core';
import MapTopCard from "@/components/common/MapTopCardLight.vue";
import Map from "@/components/topicsupport/CommonMap";
import ButList from "@/components/common/ButList";
import RotateData from "@/components/common/RotateData";
import BarChart from "@/components/common/BarChartAlarm";
import EquipmentStatus from "@/components/common/EquipmentStatus";
import ButProgress from "@/components/common/ButProgress";

export default {
  components: {
    Map,
    ButList,
    RotateData,
    BarChart,
    EquipmentStatus,
    ButProgress,
    MapTopCard
  },
  setup () {
    // 声明axios
    const $axios = inject('$axios')
    let sysConfig = {};
    const url = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgAlarmData'
    const url2 = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgAlarmData2'
    let globalStyle = ref({});
    let dialogVisible = ref(false)
    let dialogVisibleTow = ref(false)
    // 地图顶部的卡片初始化
    let curCard = ref('拨测告警')
    let busType = ref('全部');
    let allindustries = ref('全部行业');
    let customer = ref('选择客户');
    let selectdnn = ref('选择DNN');
    let section = ref('选择切片');
    let formType = ref('开通');
    let butList = ref('');
    let rotateData = ref('');
    let equipmentStatus = ref('');
    let refBarChart = ref('');
    let ringChart = ref('');
    let butProgress = ref('');
    let ismyddata = ref(false)
    let dpdata = ref('')
    let busdata = ref('')
    let dropDownOptions = ref('')
    let dropDownOptions1 = ref('')
    let dropDownOptions2 = ref('')
    let dropDownOptions3 = ref('')
    let mapTopCardList = ref([
      {
        "key": "0",
        "name": "拨测告警",
        "value": 12493,
        "img": "CIcon-Avatar",
        "color": "rgba(46, 196, 120, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)"
      },
      {
        "key": "1",
        "name": "业务告警",
        "value": 32351,
        "img": "CIcon-Sound-One",
        "color": "rgba(17, 174, 220, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(17, 174, 220, 0.64) 0%, rgba(17, 174, 220, 0.32) 100%)"
      },
      {
        "key": "2",
        "name": "设备告警",
        "value": 867.13,
        "img": "CIcon-Card-Two",
        "color": "rgba(255, 170, 6, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(255, 170, 6, 0.64) 0%, rgba(255, 170, 6, 0.32) 100%)"
      }
    ]);
    let index_list = ref([{
      name: '拨测告警',
      column: 'TOP_CARD_BC',
    }, {
      name: '业务告警',
      column: 'TOP_CARD_YW',
    }, {
      name: '设备告警',
      column: 'TOP_CARD_SB',
    }])


    let curTab = ref(0);
    /** ----------------------------TODO 地图初始化 ---------------------------------------------- */
    let isNation = ref(true) // 是否是全国视图
    const initData = () => {
      busdata.value = [{ value: '全部', label: '全部' },
      { value: '优享', label: '优享' },
      { value: '专享', label: '专享' },
      { value: '尊享', label: '尊享' }
      ]
      dropDownOptions.value = [{ value: '全部行业', label: '全部行业' },
      { value: '医疗', label: '医疗' },
      { value: '教育', label: '教育' },
      { value: '新能源', label: '新能源' },
      { value: '金融', label: '金融' }]
      dropDownOptions1.value = [{ value: '选择客户', label: '选择客户' },
      { value: '爱康科技', label: '爱康科技' },
      { value: '阳煤化工', label: '阳煤化工' },
      { value: '美锦能源', label: '美锦能源' },
      { value: '科达制造', label: '科达制造' }]
      dropDownOptions2.value = [{ value: '选择DNN', label: '选择DNN' },
      { value: '专用DNN', label: '专用DNN' },
      { value: '通用DNN', label: '通用DNN' }]
      dropDownOptions3.value = [{ value: '选择切片', label: '选择切片' },
      { value: '业务切片', label: '业务切片' },
      { value: '网络切片', label: '网络切片' },
      { value: '无线子切片', label: '无线子切片' },
      { value: '核心子切片', label: '核心子切片' },
      { value: '传输子切片', label: '传输子切片' }]
    }


    let mapData = ref({
      names: [],
      maxValues: [],
      info: []
    });
    let mapChart = ref('');

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
      customer.value = '';
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
      customer.value = tableDatas.value[index].CUSTOMER_CODE;
      queryData();
      dialogVisible.value = false
    }

    const queryData = function (orgType, city) {
      let u = url;
      if (sysConfig.dataShowType == '实时查询') {
        u = url2;
      }
      $axios.post(u, {
        "orgType": orgType || '省',
        "city": city || '',
        "packageName": busType.value == '全部' ? "" : busType.value || "",
        "industryName": allindustries.value == '全部行业' ? "" : allindustries.value || "",
        "selectcustomer": customer.value == '选择客户' ? "" : customer.value || "",
        "selectdnn": selectdnn.value == '选择DNN' ? "" : selectdnn.value || "",
        "selectsection": section.value == '选择切片' ? "" : section.value || ""
      }).then(res => {
        dpdata.value = res;
        console.log(JSON.stringify(res.gmlist))

        mapTopCardList.value[0].value = res.data.TOP_CARD_BC || 0
        mapTopCardList.value[1].value = res.data.TOP_CARD_YW || 0
        mapTopCardList.value[2].value = res.data.TOP_CARD_SB || 0

        mapData.value.area_name = city || '';
        mapData.value.info = res.data;
        mapData.value.list = res.gmlist;
        mapData.value.index_list = index_list.value;
        mapData.value.view_index = curTab.value;
        mapChart.value.loadMapData();


        equipmentStatus.value.setValue([
          { src: require('@/assets/resource/AMF.png'), name: 'AMF', num: res.data.EQUIPMENT_AMF || 0, color: '#ffa800' },
          { src: require('@/assets/resource/SMF.png'), name: 'SMF', num: res.data.EQUIPMENT_SMF || 0, color: '#0eacda' },
          { src: require('@/assets/resource/UPF.png'), name: 'UPF', num: res.data.EQUIPMENT_UPF || 0, color: '#0066ff' },
          { src: require('@/assets/resource/AMF.png'), name: '无线基站', num: res.data.EQUIPMENT_WIRELESS || 0, color: '#2ec478' },
          { src: require('@/assets/resource/AMF.png'), name: 'MEC', num: res.data.EQUIPMENT_MEC || 0, color: '#4b5575' },
          { src: require('@/assets/resource/AMF.png'), name: 'IP承载网', num: res.data.EQUIPMENT_IP || 0, color: '#f81d22' }
        ])

        rotateData.value.setNumber(res.data.NETWORK_GD || 0);
        rotateData.value.setValue([
          { name: '鉴权成功率', num: res.data.NETWORK_JQ || 0 },
          { name: '5G注册平均时延', num: res.data.NETWORK_ZC || 0 },
          { name: '会话更新成功率', num: res.data.NETWORK_HH || 0 },
          { name: '业务请求成功率', num: res.data.NETWORK_YW || 0 }
        ])


        butList.value.setValues({
          but: [{ name: '核心网告警', num: res.data.ALARM_CORE || 0 },
          { name: '无线网告警', num: res.data.ALARM_WIRELESS || 0 },
          { name: '传输网告警', num: res.data.ALARM_TRANSMISSION || 0 }
          ],
          table: ['类型', 'AMF', 'SMF', 'UPF'],
          device: ['设备告警数', res.data.AMF_EQUIPMENT || 0, res.data.SMF_EQUIPMENT || 0, res.data.UPF_EQUIPMENT || 0],
          alarmdevices: ['告警设备数', res.data.AMF_ALARM || 0, res.data.SMF_ALARM || 0, res.data.UPF_ALARM || 0],
          dnn: ['影响DNN数', res.data.AMF_DNN || 0, res.data.SMF_DNN || 0, res.data.UPF_DNN || 0]
        })

        let number = ['0', '0', '0'];
        if (null != res.data.AFFECT_CUSTOMER) {
          if (parseInt(res.data.AFFECT_CUSTOMER) < 10) {
            number = ['0', '0', res.data.AFFECT_CUSTOMER]
          } else if (parseInt(res.data.AFFECT_CUSTOMER) >= 10 && parseInt(res.data.AFFECT_CUSTOMER) < 100) {
            number = ['0', res.data.AFFECT_CUSTOMER.substring(0, 1), res.data.AFFECT_CUSTOMER.substring(1, 2)]
          } else if (parseInt(res.data.AFFECT_CUSTOMER) > 100) {
            number = [res.data.AFFECT_CUSTOMER.substring(0, 1), res.data.AFFECT_CUSTOMER.substring(1, 2), res.data.AFFECT_CUSTOMER.substring(2, 3)]
          }
        }
        butProgress.value.setValues({
          but: [{ name: '设备告警', num: parseInt(res.data.TOP_CARD_BC) },
          { name: '业务告警', num: parseInt(res.data.TOP_CARD_YW) },
          { name: '拨测告警', num: parseInt(res.data.TOP_CARD_SB) }
          ],
          number: number
        })

        let xdata = ref([]);
        let ydata1 = ref([]);
        let ydata2 = ref([]);
        let ydata3 = ref([]);

        for (var i = res.trendlist.length; i--; i >= 0) {
          let item = res.trendlist[i];
          xdata.value.push(item.CDATE_STR.substring(11, 16));
          ydata1.value.push(item.TOP_CARD_BC);
          ydata2.value.push(item.TOP_CARD_YW);
          ydata3.value.push(item.TOP_CARD_SB);
        }

        refBarChart.value.setValue([
          { yname: '拨测告警', xname: xdata.value, ynum: ydata1.value, colorb: '#ffa800', colort: '#ffe1a6' },
          { yname: '业务告警', xname: xdata.value, ynum: ydata2.value, colorb: '#f81d22', colort: '#fec4c5' },
          { yname: '设备告警', xname: xdata.value, ynum: ydata3.value, colorb: '#0eacda', colort: '#abe4f4' }
        ])


      })
    }
    // ---------------------------------------> 下钻 子组件双击后传给父级的数据   云南数据
    function handleMapChange (val) {
      console.log('打印下钻数据');
      console.log(val);
      queryData('地市', val.name);

    }

    // ----------------------------------------------------------------------->>返回
    const handleBack = () => { // 返回全国视图
      queryData('省');
    } // 返回

    onMounted(() => {
      var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
      globalStyle.value = { height: h + 'px', 'box-sizing': 'border-box' }
      $axios.get('/config/govcharts/map/config.json').then(d => {
        sysConfig = d;
        queryData('省', '')
      })
      initData()
      equipmentStatus.value.setTitle('设备概况')
      rotateData.value.setTitle('网络性能质量分析');
      rotateData.value.setName('性能预警');
      butList.value.setTitle('网络设备告警');
      butProgress.value.setTitle('故障细分');
      refBarChart.value.setTitle('质量趋势')
    })
    const changeTrade = (index) => {
      queryData()
    }
    const changeBus = (label) => {
      console.log("====label====" + label)
    }
    /** ---------------------------------------------END----------------------------------------------------------------- */


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
      mapData.value.view_index = ii;
      mapChart.value.loadMapData();
    }


    return {
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
      butList,
      refBarChart,
      formType,
      equipmentStatus,
      ringChart,
      rotateData,
      butProgress,
      ismyddata, dpdata, initData, dropDownOptions, dropDownOptions1, dropDownOptions2, dropDownOptions3,
      changeTrade, busdata, globalStyle,
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

.card-right.card-2 {
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-3 {
  height: calc(calc(100% - 152px) * 0.45 - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}

.card-right.card-4 {
  height: calc(calc(100% - 152px) * 0.55);
}
.card-right.card-4-left {
  height: 100%;
  width: calc(100% - 10px);
  background-color: #fff;
  float: left;
}
.card-right.card-4-right {
  height: 100%;
  width: calc(100% - 10px);
  background-color: #fff;
  margin-left: 10px;
  float: left;
}
.card-bottom.card-1 {
  height: 100%;
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
</style>
