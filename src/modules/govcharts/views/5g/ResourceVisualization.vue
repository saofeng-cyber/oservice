<template>
  <div class="page-wrapper">
    <el-row class="row-1" :gutter="15">
      <el-col :span="14">
        <div class="card-left card-4-angle">
          <MapHeader ref="mapHeader" @handleBack="handleBack" />
          <div class="map-top">
            <el-row :gutter="12">
              <el-col :span="6" v-for="(item, index) in mapTopCardList" :key="index">
                <MapTopCard :data="item" :isActive="curCard === item.name" @handleCardChange="handleCardChange" />
              </el-col>
            </el-row>
          </div>
          <div v-if="!isNation">
            <div class="float-menu-btn" @mouseenter="showLeftMenu = true" @mouseleave="showLeftMenu = false">
              <div class="float-menu-btn-inner">
                <i class="el-icon-s-unfold"></i>
              </div>
            </div>
            <div class="float-menu-body" v-show="showLeftMenu" @mouseenter="showLeftMenu = true"
              @mouseleave="showLeftMenu = false">
              <div class="link" v-for="(menu, $index) in leftMenus" :key="$index" @click="openLeftMenu(menu)">
                {{menu.menuCnname}}
              </div>
            </div>
          </div>
          <Map ref="mapChart" :data="mapData" :curCard="curCard" @handleMapSelect="handleMapSelect"
            @handleMapChange="handleMapChange"></Map>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="card-right card-4-angle card-0">
          <SearchInfo ref="searchInfo" @searchShow="searchShow"></SearchInfo>
        </div>
        <el-row :gutter="15">
          <el-col :span="12">
            <div class="card-right card-4-angle card-1">
              <RingChart ref="customServiceRingChart" style="height: 255px;" />
              <div class="ring-chart-legend">
                <div class="legend-item" v-for="(item, index) in customServiceData.info" :key="index">
                  <img :src="item.url" alt="">
                  <div class="legend-name">
                    {{ item.name }}
                  </div>
                  <div class="legend-value" :style="{color: item.color}">
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-right card-4-angle card-1">
              <RingChart ref="dnnRingChart" style="height: 255px;" />
              <div class="ring-chart-legend">
                <div class="legend-item" v-for="(item, index) in dnnData.info" :key="index">
                  <img :src="item.url" alt="">
                  <div class="legend-name">
                    {{ item.name }}
                  </div>
                  <div class="legend-value" :style="{color: item.color}">
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="card-right card-with-title card-2">
          <NetResource ref="coreNetRes5G" @handleResChange="handleResChange" />
        </div>
        <div class="card-right card-with-title card-3">
          <NetResource ref="honorNetRes5G" @handleResChange="handleResChange" />
        </div>
      </el-col>
    </el-row>
    <el-row class="row-2" :gutter="15">
      <el-col v-show="isNation && !isProvinceSelect" :span="6">
        <div class="card-bottom card-with-title card-1">
          <WarnRanking ref="warnRanking1" />
        </div>
      </el-col>
      <el-col v-show="isNation && !isProvinceSelect" :span="6">
        <div class="card-bottom card-with-title card-2">
          <WarnRanking ref="warnRanking2" />
        </div>
      </el-col>
      <el-col v-show="!isNation || isProvinceSelect" :span="12">
        <div class="card-bottom card-with-title card-2">
          <Warn ref="warnRanking3" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card-bottom card-with-title card-2">
          <LineChart ref="lineChart" :title="lineChartTitle" style="height: 256px;" />
        </div>
      </el-col>
    </el-row>
    <!-- 弹框组件 -->
    <div class="dialog">
      <el-dialog title="" v-model="dialogVisible" width="60%" @closed="handleCloseDialog">
        <TableDialog @tableMessage="getTableMessage"></TableDialog>
      </el-dialog>
      <el-dialog title="" v-model="dialogVisibleTow" width="70%" @closed="handleCloseDialog">
        <QueryCondition @conditionParams="getCondition"></QueryCondition>
        <TableDialog @tableMessage="getTableMessage"></TableDialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { getRingIconUrl } from '@/utils/canvasUtil'
  import LineChart from '@/components/common/LineChart.vue'
  import Map from '@/components/topicsupport/Map.vue';
  import MapHeader from '@/components/common/MapHeader.vue'
  import MapTopCard from '@/components/common/MapTopCard.vue'
  import NetResource from '@/components/topicsupport/NetResource.vue'
  import { onMounted, ref, inject } from '@vue/runtime-core';
  import { computed } from '@vue/reactivity';
  import RingChart from '@/components/common/RingChart.vue'
  import SearchInfo from '@/components/common/SearchInfo.vue'
  import Warn from '@/components/emergency/Warn'
  import WarnRanking from '@/components/emergency/WarnRanking'
  import TableDialog from "@/components/common/TableDialog";
  import QueryCondition from "@/components/common/QueryCondition";
  import { provide } from "vue";
  import Api from '@/modules/govcharts/api/api_ResourceVisualization.js'
  export default {
    components: {
      Map, MapTopCard, RingChart, NetResource, MapHeader, WarnRanking, LineChart, SearchInfo, Warn, TableDialog, QueryCondition
    },
    setup() {
      const isNation = ref(true) // 是否是全国视图
      const isProvinceSelect = ref(false) // 是否选中省份
      const mapTopCardList = ref([]) // 地图上方卡片数据
      const mapData = ref({
        names: [],
        maxValues: [],
        info: []
      }) // 地图数据}
      const curCard = ref('5G专网客户数')
      let customServiceData = ref({})
      let dnnData = ref({}) // 客户服务模式数据
      const mapHeader = ref('') // 地图标题
      const coreNetRes5G = ref(null) // 5G核心网络资源
      const honorNetRes5G = ref(null) // 5G尊享专属网络资源
      const customServiceRingChart = ref(null) // 5G尊享专属网络资源
      const dnnRingChart = ref(null) // 5G尊享专属网络资源
      const warnRanking1 = ref(null)
      const warnRanking2 = ref(null)
      const warnRanking3 = ref(null)
      const lineChart = ref(null)
      const lineChartTitle = ref('')
      const mapChart = ref(null)
      const searchInfo = ref(null)
      let activeRes = null
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
      const handleCardChange = function (item) {
        if (item.name === curCard.value) return
        curCard.value = item.name
      }
      const handleMapSelect = region => {
        isProvinceSelect.value = region.id !== '0'
        initProvinceSelect()
        mapHeader.value.setTitle('资源可视化')
        console.log('选中省份', region)
      }
      const handleMapChange = region => {
        console.log('地图变化', region)
        isNation.value = region.id === '0'
        isProvinceSelect.value = false
        mapHeader.value.setTitle('资源可视化' + (region.id === '0' ? '' : '-' + region.name))
        mapHeader.value.setIsNation(isNation.value)
        initProvinceData()
      }
      const handleBack = () => { // 返回全国视图
        mapChart.value.onBackDblclick()
        initData()
      }
      // --------------------------- 表格弹窗----------------------------------------------------------
      let tableInfoUrl = ''
      let tableDatas = ref([]) // 声明 表格数据
      let tablePage = ref({ currentPage: 1, size: 10, total: 0 }) // 声明 表格数据
      let tableHeader = ref([{ fieldName: 'test1', label: '无数据', order: true, width: '220px', sortable: true }]) // 声明 表头
      let dialogVisible = ref(false)
      let dialogVisibleTow = ref(false)
      const searchShow = val => {
        if (val && val.dialogVisible) { // -------------------->没有表单的情况
          // TODO 接口
          Api.getData({
            "desc": "资源可视化",
            "spe": "5g",
            "jsonFile": "quality_and_visualization_table.json"
          }
          ).then(res => {
            // 设置表头
            tableHeader.value = [
              { fieldName: 'test1', label: '客户名称', order: true, width: '200px', sortable: true },
              { fieldName: 'test4', label: '省份', order: true, width: '200px', sortable: true },
              { fieldName: 'test2', label: '客户服务模式', order: true, width: '200px', sortable: true },
              { fieldName: 'test3', label: '客户行业', order: true, width: '200px', sortable: true },
            ]
            // 表格数据
            tableDatas.value = res
            tablePage.value = { currentPage: 1, size: 10, total: res.length }
          })
          dialogVisible.value = val.dialogVisible
        } else {      // -------------------------->有表单的情况
          dialogVisibleTow.value = val
        }
        Api.getUrL({ spe: '5g', buz: 'customer' }).then(res => {
          tableInfoUrl = res
        })
      }
      // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表单, 4.将响应数据发送给子组件
      function getCondition() {
        Api.getData({
          "desc": "资源可视化",
          "spe": "5g",
          "jsonFile": "resource-visualization-5g-table.json"
        }
        ).then(res => {
          // 设置表头
          tableHeader.value = res.tableHeader
          // 表格数据
          tablePage.value = { currentPage: 1, size: 10, total: res.tableData.length }
          tableDatas.value = res.tableData.slice(0, 10)
        })
      }
      // 获取表格组件返回的数据
      function getTableMessage(val) {
        if (val.scope) {
          $topstore.dispatch("global/openDialog", {
            type: 'iframe',
            app: {
              entry: tableInfoUrl
            }
          });
        }
        dialogVisible.value = false
        dialogVisibleTow.value = false
      }
      // 配置表头数据
      provide("tableHeaderConfig", tableHeader)
      // 配置单元格数据及属性/ 分页配置默认值
      provide("tableDataConfig", { page: tablePage, tableData: tableDatas })
      // 配置表单类型
      provide("formTypeConfig", [
        { label: '客户名称', type: 'input', placeholder: '请输入. . .', value: '' },
        { label: '省份', type: 'input', placeholder: '请输入. . .', value: '' },
        { label: '客户服务模式', type: 'input', placeholder: '请输入. . .', value: '' },
        { label: '客户行业', type: 'input', placeholder: '请输入. . .', value: '' }
      ]);
      // --------------------------- 表格弹窗------------------------------------------------
      const handleCloseDialog = () => {
        tableDatas.value = []
        tablePage.value = { currentPage: 1, size: 10, total: 0 }
      }
      const handleResChange = item => { // 点击资源类型
        if (item) { // 选中资源
          activeRes = item
        } else { // 刷新
          activeRes = null
        }
        resChange()
      }
      const resChange = () => {
        const data = { jsonFile: 'speSupport-resVisual-resView-res-select.json', desc: '支撑专题-资源可视化', spe: '5g' }
        Api.getData(data).then(d => {
          if (activeRes) {
            if (warnRanking3.value) {
              warnRanking3.value.setTitle(activeRes.name + '分地市排名')
              warnRanking3.value.setValues(d.warningRanking3Data1)
            }
            lineChart.value.setValues(d.lineChartData)
            lineChartTitle.value = activeRes.name + '近30日增长趋势'
          } else {
            if (warnRanking3.value) {
              warnRanking3.value.setTitle('共享型UPF数分地市排名')
              warnRanking3.value.setValues(d.warningRanking3Data2)
            }
            lineChart.value.setValues(d.lineChartData)
            lineChartTitle.value = '5G专网客户数近30日增长趋势'
          }
        })
      }
      const initData = () => {
        const data = { jsonFile: 'speSupport-resVisual-resView-all.json', desc: '支撑专题-资源可视化', spe: '5g' }
        Api.getData(data).then((d) => {
          mapTopCardList.value = d.mapTopCardList
          mapData.value = d.mapData
          coreNetRes5G.value.setValues(d.coreNetRes5GData)
          honorNetRes5G.value.setValues(d.honorNetRes5GData)
          const val1 = d.customServiceData
          val1.info.forEach(item => {
            item.url = getRingIconUrl({ color: item.color })
          })
          customServiceData.value = val1
          customServiceRingChart.value.setValues(customServiceData.value)
          const val2 = d.dnnData
          val2.info.forEach(item => {
            item.url = getRingIconUrl({ color: item.color })
          })
          dnnData.value = val2
          dnnRingChart.value.setValues(dnnData.value)
          warnRanking1.value.setTitle('5G专网客户数分省排名')
          warnRanking1.value.setRanking(d.warningRanking1Data)
          warnRanking2.value.setTitle('5G专网客户数分行业排名')
          warnRanking2.value.setRanking(d.warningRanking2Data)
          lineChartTitle.value = '5G专网客户数近30日增长趋势'
          lineChart.value.setValues(d.lineChartData)
        }).then(() => {
          mapChart.value.loadMapData()
        })
      }
      const initProvinceData = () => {
        const data = { jsonFile: 'speSupport-resVisual-resView-province.json', desc: '支撑专题-资源可视化-省份视图', spe: '5g' }
        Api.getData(data).then(d => {
          mapTopCardList.value = d.mapTopCardList
          mapData.value = d.mapData
          coreNetRes5G.value.setValues(d.coreNetRes5GData)
          honorNetRes5G.value.setValues(d.honorNetRes5GData)
          const val = d.customServiceData
          val.info.forEach(item => {
            item.url = getRingIconUrl({ color: item.color })
          })
          customServiceData.value = val
          customServiceRingChart.value.setValues(customServiceData.value)
          const val2 = d.dnnData
          val2.info.forEach(item => {
            item.url = getRingIconUrl({ color: item.color })
          })
          dnnData.value = val2
          dnnRingChart.value.setValues(dnnData.value)
          warnRanking3.value.setTitle('共享型UPF数分地市排名')
          warnRanking3.value.setValues(d.warningRanking3Data)
          lineChartTitle.value = '共享型UPF数近30日增长趋势'
          lineChart.value.setValues(d.lineChartData)
        }).then(() => {
          mapChart.value.loadMapData()
        })
      }
      const initProvinceSelect = () => {
        const data = { jsonFile: 'speSupport-resVisual-resView-provselect.json', desc: '支撑专题-资源可视化-省份视图', spe: '5g' }
        Api.getData(data).then(d => {
          coreNetRes5G.value.setValues(d.coreNetRes5GData)
          honorNetRes5G.value.setValues(d.honorNetRes5GData)
          const val = d.customServiceData
          val.info.forEach(item => {
            item.url = getRingIconUrl({ color: item.color })
          })
          customServiceData.value = val
          customServiceRingChart.value.setValues(customServiceData.value)
          const val2 = d.dnnData
          val2.info.forEach(item => {
            item.url = getRingIconUrl({ color: item.color })
          })
          dnnData.value = val2
          dnnRingChart.value.setValues(dnnData.value)
          warnRanking3.value.setTitle('共享型UPF数分地市排名')
          warnRanking3.value.setValues(d.warningRanking3Data)
          lineChartTitle.value = '共享型UPF数近30日增长趋势'
          lineChart.value.setValues(d.lineChartData)
        })
      }
      onMounted(() => {
        initData()
        mapHeader.value.setTitle('资源可视化')
        // mapHeader.value.setDateTime('2021-09-04')
        coreNetRes5G.value.setTitle('5G核心网资源')
        honorNetRes5G.value.setTitle('5G尊享专属网络资源')
      })

      return {
        isNation, mapHeader, mapTopCardList, mapData, curCard, handleCardChange, coreNetRes5G, honorNetRes5G, customServiceData, dnnData, customServiceRingChart,
        dnnRingChart, handleMapSelect, handleMapChange, warnRanking1, warnRanking2, warnRanking3, lineChartTitle, lineChart, mapChart, handleBack, isProvinceSelect,
        handleResChange, showLeftMenu, leftMenus, openLeftMenu, searchShow, getCondition, getTableMessage, dialogVisible, dialogVisibleTow, handleCloseDialog, searchInfo
      }
    }
  }
</script>

<style scoped>
  .page-wrapper {
    padding: 15px;
  }

  .page-wrapper * {
    box-sizing: border-box;
  }

  .row-1 {
    margin-bottom: 16px;
  }

  .card-left {
    height: 100%;
  }

  .map-top {
    margin: 0 16px 16px 16px;
  }

  .card-right.card-0 {
    margin-bottom: 16px;
  }

  .card-right.card-1 {
    height: 333px;
    margin-bottom: 16px;
  }

  .card-right.card-2 {
    margin-bottom: 16px;
  }

  .ring-chart-legend {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .legend-item {
    text-align: center;
    color: #B1D8FF;
    line-height: 18px;
  }

  .legend-name {
    font-size: 12px;
  }

  .legend-value {
    font-size: 14px;
  }

  .card-bottom.card-1 {
    height: 256px;
  }

  .card-bottom.card-2 {
    height: 256px;
  }

  .float-menu-btn {
    position: absolute;
    top: 235px;
    left: 24px;
    color: #66E2FB;
    font-size: 18px;
    cursor: pointer;
    padding-right: 15px;
    z-index: 10;
  }

  .float-menu-btn-inner {
    border: 1px solid #66E2FB;
    padding: 3px 3px 0 3px;
  }

  .float-menu-body {
    position: absolute;
    top: 235px;
    left: 56px;
    color: #66E2FB;
    font-size: 12px;
    padding: 15px;
    z-index: 10;
    background-image: url('~@/assets/common/Corner-TL.png'), url('~@/assets/common/Corner-TR.png'), url('~@/assets/common/Corner-BL.png'), url('~@/assets/common/Corner-BR.png');
    background-position: -5px -6px, calc(100% + 5px) -6px, -5px calc(100% + 6px), calc(100% + 5px) calc(100% + 6px);
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-color: rgba(0, 0, 0, 0.32);
    box-shadow: 0px 1px 0px 0px rgba(102, 226, 251, 0.24), 0px -1px 0px 0px rgba(102, 226, 251, 0.24);
  }

  .float-menu-body .link {
    cursor: pointer;
  }

  .float-menu-body .link:not(:last-child) {
    margin-bottom: 5px;
  }

  .dialog :deep(.el-dialog) {
    background-color: #141b2dcc;
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
