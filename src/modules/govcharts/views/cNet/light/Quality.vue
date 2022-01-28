<template>
  <!-- 界面元素 -->
  <div class="page-wrapper">
    <el-row
      class="row-1"
      :gutter="15"
    >
      <el-col :span="14">
        <div class="card-left">
          <MapHeader
            ref="mapHeader"
            @handleBack="handleBack"
          />
          <div class="button-img">
            <el-radio-group
              v-model="busType"
              size="small"
            >
              <el-radio-button label="全部业务"></el-radio-button>
              <el-radio-button label="PTN"></el-radio-button>
              <el-radio-button label="PON"></el-radio-button>
              <el-radio-button label="云联网"></el-radio-button>
              <el-radio-button label="OTN"></el-radio-button>
            </el-radio-group>
          </div>
          <MapLines
            ref="mapChart"
            :data="mapData"
            :curCard="curCard"
            @handleMapSelect="handleMapSelect"
            @handleMapChange="handleMapChange"
          ></MapLines>
          <!--          \-->
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
          <!--          -->
        </div>
      </el-col>
      <el-col :span="10">
        <div class="card-right card-1">
          <SearchInfo @searchShow="searchShow"></SearchInfo>
        </div>
        <div class="card-right card-2">
        <div style="float:left;height: 210px;width:200px;background-color: #fafbfc;">
          <RingChart ref="ringChart" style="height: 180px;width:200px;" />
          <span style="margin-left:70px;">网络质量</span>
        </div>
        <div style="float:right;width:400px;height:200px;">
          <DateCompared ref="dateCompared"></DateCompared>
        </div>
        </div>
        <div class="card-right card-3">
          <Rate ref="rate"></Rate>
        </div>
        <div class="card-right card-4">
          <BusSta ref="busSta"></BusSta>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="row-2"
      :gutter="15"
    >
      <el-col :span="12">
        <div class="card-bottom card-1">
          <div style="position:absolute;top:5px;right:30px;">
            <el-radio-group
              v-model="formType"
              size="small"
            >
              <el-radio-button label="开通"></el-radio-button>
              <el-radio-button label="投诉"></el-radio-button>
            </el-radio-group>
          </div>
          <BarChart ref="refBarChart"></BarChart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card-bottom card-3">
          <ResourceSta ref="resourceSta"></ResourceSta>
        </div>
      </el-col>
    </el-row>
    <!-- 弹框组件 -->
    <div class="dialog-data">
      <el-dialog
        title=""
        v-model="dialogVisible"
        width="60%"
      >
        <TableDialog></TableDialog>
      </el-dialog>
      <el-dialog
        title=""
        v-model="dialogVisibleTow"
        width="70%"
      >
        <QueryCondition @conditionParams="getCondition"></QueryCondition>
        <TableDialog @tableMessage="getTableMessage"></TableDialog>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { inject, onMounted } from '@vue/runtime-core';
// import MapTopCard from "@/components/common/MapTopCard";
import SearchInfo from "@/components/common/SearchInfoLight";
import TableDialog from "@/components/common/TableDialogLight";
import QueryCondition from "@/components/common/QueryConditionLight";
import { provide } from "vue";
import MapHeader from "@/components/common/MapHeaderLight";
import MapLines from "@/components/topicsupport/MapLinesLight";
import BusSta from "@/components/common/BusSta";
import Rate from "@/components/common/Rate";
import BarChart from "@/components/common/BarChartLight";
import ResourceSta from "@/components/common/ResourceSta";
import DateCompared from "@/components/common/DateCompared";
import RingChart from "@/components/common/CircleProgressBar";


export default {
  components: {
    MapLines,
    MapHeader,
    QueryCondition,
    TableDialog,
    SearchInfo,
    BusSta,
    Rate,
    BarChart,
    ResourceSta,
    DateCompared,
    RingChart
    // MapTopCard
  },
  setup () {
    // 声明axios
    const $axios = inject('$axios')
    const url = '/ser-govplat-comservice/api/rest/commService/v1/getData'
    let mapHeader = ref('')
    let dialogVisible = ref(false)
    let dialogVisibleTow = ref(false)
    // 地图顶部的卡片初始化
    let curCard = ref('在线用户数')
    let mapTopCardList = ref([])
    let busType = ref('全部业务');
    let formType = ref('开通');
    let busSta = ref('');
    let rate = ref('');
    let dateCompared = ref('');
    let refBarChart = ref('');
    let resourceSta = ref('');
    let ringChart = ref('');
    $axios.post(url, {
      "desc": "质量可视化",
      "spe": "5g",
      "jsonFile": "quality_and_visualization_map_top_card_web.json"
    }).then(res => {
      mapTopCardList.value = res
    })
    /** ----------------------------TODO 地图初始化 ---------------------------------------------- */
    let isNation = ref(true) // 是否是全国视图
    // 获取左侧菜单
    const $topstore = inject('$topstore');
    let leftMenus = computed(() => $topstore.getters["layout/getLeftMenus"]);
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
    let mapChart = ref('');
    $axios.post(url, {
      "desc": "质量可视化",
      "spe": "5g",
      "jsonFile": "quality_and_visualization_map_all_web.json"
    }).then(res => {
      mapHeader.value.setTitle('质量可视化')
      mapData.value = res
      mapChart.value.loadMapData()

      busSta.value.setTitle('不同接入类型告警统计');
      busSta.value.setValue([
        { name: 'PTN', num: 742 },
        { name: 'OTN', num: 354 },
        { name: '5G云梯', num: 554 },
        { name: '云联网', num: 454 },
        { name: 'PON', num: 254 }
      ])

      rate.value.setTitle('网络设备')
      rate.value.setValue([
        {src:require('@/assets/resource/AMF.png'),pe:'云PE',number:'45', num: 2,gaojing: 4.4 },
        {src:require('@/assets/resource/AMF.png'),pe:'网PE',number:'43', num: 2,gaojing: 9.3 }
      ])

      refBarChart.value.setTitle('工单达标率')
      refBarChart.value.setValue(false, {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        calculable: true,
        legend: {
          data: ['工单数', '及时率'],
          itemGap: 5,
          left: "65%",
          top: "15%"
        },
        grid: {
          top: '35%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ["北京-", "上海-", "深圳-", "浙江-", "江苏-", "广州-", "河北-", "湖北-", "河南-"],
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                lineStyle: {
                  color: "rgba(95, 119, 146, 1)",
                  width: 2.5
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位: 条',
            offset: -22.5,
            axisLabel: {
              show: false,//不显示坐标轴上的文字
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: '工单数',
            type: 'bar',
            data: [54, 2, 65, 86, 35, 23, 7, 67, 9],
            barWidth: '15%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(46, 196, 120, 0.64)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(46, 196, 120, 0.32)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          {
            name: '及时率',
            type: 'line',
            data: [46, 27, 43, 4, 87, 67, 7, 68, 97],
            barWidth: '15%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(255, 168, 0, 0.64)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255, 168, 0, 0.32)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      })

      
      resourceSta.value.setTitle('资源池统计')
      resourceSta.value.setValue([
        {name: '全部', cpu: 95.56,memory:99},
        {name: '统建', cpu: 96.56,memory:99},
        {name: '省建', cpu: 95.56,memory:99}
      ])

      dateCompared.value.setValue([
        {name:'告警云专线数',num:'30', percent:'10.0%↓' },
        {name:'告警云专线数',num:'30', percent:'20.0%↓' },
        {name:'云专线业务告警数',num:'30', percent:'30.0%↓' }
      ])

      ringChart.value.setValue([
        
          { title:'云主专线数',num: 80, name: '网络业务', number: '3891' }
        
        
      ])
       
    })

    // ---------------------------------------> 下钻 子组件双击后传给父级的数据   云南数据
    function handleMapChange (val) {
      console.log('打印下钻数据');
      console.log(val);

      mapHeader.value.setTitle('质量可视化' + (val.id === '0' ? '' : '-' + val.name))
      mapHeader.value.setIsNation(val.id === '0')
      isNation.value = val.id === '0'
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_map_iot_yunnan.json"
      }).then(res => {
        mapData.value = res
        console.log('云南数据');
        console.log(res)
        mapChart.value.loadMapData()
      })
    }

    // ----------------------------------------------------------------------->>返回
    const handleBack = () => { // 返回全国视图
      mapChart.value.onBackDblclick()
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_map_all.json"
      }).then(res => {
        mapData.value = res
        mapChart.value.loadMapData()
      })
    } // 返回

    /** ---------------------------------------------END----------------------------------------------------------------- */

    /** ----------------------------------------与弹框组件数据交互------------------------------------------------- */
    let tableInfoUrl = ref('')
    let tableDatas = ref([]) // 声明 表格数据
    let tableHeader = ref([{ fieldName: 'test1', label: '无数据', order: true, width: '220px', sortable: true }]) // 声明 表头
    // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表格, 4.将响应数据发送给子组件
    function searchShow (val) {
      tableDatas.value = []
      if (val && val.dialogVisible) { // -------------------->没有表单的情况
        // 查询条件
        console.log(val.condition) // 从子组件传来的查询条件
        // TODO 接口
        $axios.post(url, {
          "desc": "质量可视化",
          "spe": "5g",
          "jsonFile": "quality_and_visualization_table.json"
        }
        ).then(res => {
          // 设置表头
          tableHeader.value = [
            { fieldName: 'test1', label: '客户名称', order: true, width: '250px', sortable: true },
            { fieldName: 'test4', label: '省份', order: true, width: '200px', sortable: true },
            { fieldName: 'test2', label: '客户服务模式', order: true, width: '200px', sortable: true },
            { fieldName: 'test3', label: '客户行业', order: true, width: '200px', sortable: true },
          ]
          // 表格数据
          tableDatas.value = res
          console.log("-=-=-=-=-=-=-=-=-=后台-=-=-=-=-==--=")
          console.log(res)
        })
        dialogVisible.value = val.dialogVisible
      } else {      // -------------------------->有表单的情况
        dialogVisibleTow.value = val
      }
      $axios.post('/ser-govplat-comservice/api/rest/commService/v1/getURL', { spe: '5g', buz: 'customer' }).then(res => {
        tableInfoUrl = res
      })
    }

    // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表单, 4.将响应数据发送给子组件
    function getCondition (val) {
      let condition = val
      console.log('-------表单的查询条件--------');
      console.log(condition);
      // TODO 接口
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_table.json"
      }
      ).then(res => {
        // 设置表头
        tableHeader.value = [
          { fieldName: 'test1', label: '客户名称', order: true, width: '250px', sortable: true },
          { fieldName: 'test4', label: '省份', order: true, width: '200px', sortable: true },
          { fieldName: 'test2', label: '客户服务模式', order: true, width: '200px', sortable: true },
          { fieldName: 'test3', label: '客户行业', order: true, width: '200px', sortable: true },
        ]
        // 表格数据
        tableDatas.value = res
      })
    }

    // 配置表头数据
    provide("tableHeaderConfig", tableHeader)
    // 配置单元格数据及属性/ 分页配置默认值
    provide("tableDataConfig", { page: { currentPage: 1, size: 10, total: 2 }, tableData: tableDatas })
    // 配置表单类型
    provide("formTypeConfig", [
      { label: '客户名称', type: 'input', placeholder: '请输入. . .', value: '' },
      { label: '省份', type: 'input', placeholder: '请输入. . .', value: '' },
      { label: '客户服务模式', type: 'input', placeholder: '请输入. . .', value: '' },
      { label: '客户行业', type: 'input', placeholder: '请输入. . .', value: '' }
      // {
      //   label: '标签',
      //   type: 'select',
      //   placeholder: '请选择',
      //   option: [{label: '第一项', value: '1'}, {label: '第二项', value: '2'}],
      //   value: ''
      // },
      // {
      //   label: '分公司',
      //   type: 'select',
      //   placeholder: '请选择',
      //   option: [{label: '第一项', value: '1'}, {label: '第二项', value: '2'}],
      //   value: ''
      // },
      // {label: '受理员工号', type: 'input', placeholder: '请输入. . .', value: ''},
      // {label: '流水号', type: 'date', placeholder: '请选择', value: ''},
      // {label: '流水号', type: 'input', placeholder: '请输入. . .', value: ''},
      // {label: '流水号', type: 'input', placeholder: '请输入. . .', value: ''},
      // {label: '流水号', type: 'input', placeholder: '请输入. . .', value: ''},
      // {label: '流水号', type: 'input', placeholder: '请输入. . .', value: ''},
    ]);

    // 获取表格组件返回的数据
    function getTableMessage (val) {
      if (val.scope) {
        $topstore.dispatch("global/openDialog", {
          type: 'iframe',
          app: {
            entry: tableInfoUrl
          }
        });
        dialogVisible.value = false
        dialogVisibleTow.value = false
      }
    }

    /** -----------------------------------------------END-------------------------------------------------- */
    const handleMapSelect = region => {
      isNation.value = region.id !== '0'
      mapChart.value.loadMapData()
    }
    /**
     * 点击卡片事件
     */
    const handleCardChange = item => {
      if (item.name === curCard.value) return
      curCard.value = item.name
    }
    onMounted(() => {
      mapHeader.value.setDateTime('')
    })

    return {
      leftMenus,
      showLeftMenu,
      openLeftMenu,
      isNation,
      getTableMessage,
      mapData,
      mapTopCardList,
      handleCardChange,
      curCard,
      dialogVisible,
      dialogVisibleTow,
      searchShow,
      getCondition,
      handleMapChange,
      mapChart,
      handleBack,
      mapHeader,
      handleMapSelect,
      busType,
      busSta,
      rate,
      refBarChart,
      formType,
      resourceSta,
      dateCompared,
      ringChart
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
  margin-bottom: 15px;
}

.card-left {
  position: relative;
  height: 100%;
  background-color: #fff;
}

.card-right.card-1 {
  height: 54px;
  margin-bottom: 15px;
  background-color: #fff;
  position: relative;
}

.card-right.card-2 {
  height: 206px;
  margin-bottom: 15px;
  background-color: #fff;
}

.card-right.card-3 {
  height: 204px;
  margin-bottom: 15px;
  background-color: #fff;
}

.card-right.card-4 {
  height: 136px;
  background-color: #fff;
}

.card-bottom.card-1 {
  height: 256px;
  background-color: #fff;
  position: relative;
}

.card-bottom.card-2 {
  height: 256px;
  background-color: #fff;
}

.card-bottom.card-3 {
  height: 256px;
  background-color: #fff;
}

/*-----------map-top------------*/
.map-top {
  margin: 0 16px -15px 16px;
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

.button-img {
  position: absolute;
  top: 8px;
  right: 16px;
  cursor: pointer;
}
</style>
