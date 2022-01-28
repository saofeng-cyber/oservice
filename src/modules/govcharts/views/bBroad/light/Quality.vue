<template>
  <!-- 界面元素 -->
  <div class="page-wrapper2">
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
          <Map
            ref="mapChart"
            @handleMapChange="handleMapChange"
            :data="mapData"
            :cur-card="curCard"
          ></Map>
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
          <BusiSatis ref="refBusiSatis"></BusiSatis>
        </div>
        <div class="card-right card-3">
          <!-- Echarts -->
          <BarChart ref="refBarChart"></BarChart>
        </div>
        <div class="card-right card-4">
          <EffectWeb ref="refEffectWeb"></EffectWeb>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="row-2"
      :gutter="15"
    >
      <el-col :span="6">
        <div class="card-bottom card-1">
          <WarnRanking ref="refWarn_1"></WarnRanking>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-bottom card-2">
          <WarnRanking ref="refWarn_2"></WarnRanking>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card-bottom card-3">
          <LineChart
            :title="lineTitle"
            style="height: 256px"
          ></LineChart>
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
        <TableDialog @tableMessage="getTableMessage"></TableDialog>
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
import Map from "@/components/topicsupport/MapLight";
import MapTopCard from "@/components/common/MapTopCardLight";
import WarnRanking from "@/components/emergency/WarnRankingLight";
import LineChart from "@/components/common/LineChartLight";
import SearchInfo from "@/components/common/SearchInfoLight";
import TableDialog from "@/components/common/TableDialogLight";
import QueryCondition from "@/components/common/QueryConditionLight";
import { provide } from "vue";
import MapHeader from "@/components/common/MapHeaderLight";
import BarChart from "@/components/common/BarChartLight";
import BusiSatis from "@/components/topicsupport/BusiSatisLight";
import EffectWeb from "@/components/qualityservice/EffectWebLight";

export default {
  components: {
    EffectWeb,
    BusiSatis,
    BarChart,
    MapHeader,
    QueryCondition,
    TableDialog,
    SearchInfo,
    LineChart,
    Map,
    WarnRanking,
    MapTopCard
  },
  setup () {
    // 声明axios
    const $axios = inject('$axios')
    const url = '/ser-govplat-comservice/api/rest/commService/v1/getData'
    let mapHeader = ref('')
    let dialogVisible = ref(false)
    let dialogVisibleTow = ref(false)
    let refWarn_1 = ref('')
    let refWarn_2 = ref('')
    let refEffectWeb = ref('')
    let refBarChart = ref('业务质量-覆盖率')
    let lineTitle = ref('影响业务无线告警数近30天增长趋势')
    // 地图顶部的卡片初始化
    let curCard = ref('WIFI弱覆盖家庭量(万)')
    let mapTopCardList = ref([])
    $axios.post(url, {
      "desc": "质量可视化",
      "spe": "5g",
      "jsonFile": "quality_and_visualization_map_top_card_broad.json"
    }).then(res => {
      mapTopCardList.value = res
    })
    // 业务质量-接入指标
    let refBusiSatis = ref(null);
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
      "jsonFile": "quality_and_visualization_map_all_broad.json"
    }).then(res => {
      mapHeader.value.setTitle('质量可视化')
      mapData.value = res
      mapChart.value.loadMapData()
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
        "jsonFile": "quality_and_visualization_map_broad_yunnan.json"
      }).then(res => {
        mapData.value = res
        console.log('云南数据');
        console.log(res)
        mapChart.value.loadMapData()
      })
      //TODO 仪表盘
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_busi_yunnan.json"
      }).then(res => refBusiSatis.value.setValues(res[0], res[1], res[2]))
      // --TODO:  业务质量-覆盖率 --
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_barchart_web_yunnan.json"
      }).then(res => refBarChart.value.setValue(false, res))
      // --TODO:  业务质量-告警 --
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_network_web_web_yunnan.json"
      }).then(res => refEffectWeb.value.setValue(res))
      // --TODO 省排名 云南数据 --
      refWarn_1.value.setTitle("影响业务无线告警数分市排名");
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_waring_1_yunnan.json"
      }).then(res => refWarn_1.value.setRanking(res));
      // --TODO 省排名 云南数据 --
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_waring_2_yunnan.json"
      }).then(res => refWarn_2.value.setRanking(res));
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
      //TODO 业务质量-接入指标组件数据设置
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_busi.json"
      }).then(res => refBusiSatis.value.setValues(res[0], res[1], res[2]))
      // --TODO:  业务质量-覆盖率 --
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_barchart_web.json"
      }).then(res => refBarChart.value.setValue(false, res))
      // --TODO:  告警 --
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_network_web_web.json"
      }).then(res => refEffectWeb.value.setValue(res))
      // --TODO 省排名 --
      refWarn_1.value.setTitle("影响业务无线告警数分省排名");
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_waring_1.json"
      }).then(res => refWarn_1.value.setRanking(res));
      // --TODO 行业排名 --
      refWarn_2.value.setTitle("影响业务无线告警数分行业排名");
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_waring_2.json"
      }).then(res => refWarn_2.value.setRanking(res))
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

    /**
     * 点击卡片事件
     */
    const handleCardChange = item => {
      if (item.name === curCard.value) return
      curCard.value = item.name
    }
    // 业务质量-接入指标
    const accessQuotaRefresh = () => {
      console.log("业务质量-接入指标刷新按钮被点击")
    }
    onMounted(() => {
      // setInterval(() => {
      // }, 3000);
      // 业务质量-接入指标组件数据设置
      refBusiSatis.value.setLabel('拨号成功率', '接收光功率', '活跃率');
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_busi.json"
      }).then(res => refBusiSatis.value.setValues(res[0], res[1], res[2]))
      // --TODO: 业务质量-覆盖率 --
      refBarChart.value.setTitle('业务质量-覆盖率')
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_barchart_web.json"
      }).then(res => refBarChart.value.setValue(false, res))
      // --TODO: 网络质量-影响业务告警--
      refEffectWeb.value.setTitle('网络质量-影响业务告警');
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_network_web_web.json"
      }).then(res => refEffectWeb.value.setValue(res))
      // --TODO 省排名 --
      refWarn_1.value.setTitle("影响业务无线告警数分省排名");
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_waring_1.json"
      }).then(res => refWarn_1.value.setRanking(res));
      // --TODO 行业排名 --
      refWarn_2.value.setTitle("影响业务无线告警数分行业排名");
      $axios.post(url, {
        "desc": "质量可视化",
        "spe": "5g",
        "jsonFile": "quality_and_visualization_waring_2.json"
      }).then(res => refWarn_2.value.setRanking(res))
    })

    return {
      leftMenus,
      showLeftMenu,
      openLeftMenu,
      isNation,
      getTableMessage,
      refBusiSatis,
      accessQuotaRefresh,
      mapData,
      refWarn_1,
      refWarn_2,
      refEffectWeb,
      refBarChart,
      lineTitle,
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
      mapHeader
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

/* .page-wrapper2 .el-col-6 {
  max-width: 30%;
  flex: 0 0 33%;
} */
</style>
<style scoped>
.page-wrapper2 {
  padding: 15px;
}

.page-wrapper2 * {
  box-sizing: border-box;
}

.row-1 {
  margin-bottom: 15px;
}

.card-left {
  height: 100%;
  background-color: #fff;
}

.card-right.card-1 {
  height: 54px;
  margin-bottom: 15px;
  background-color: #fff;
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
</style>
