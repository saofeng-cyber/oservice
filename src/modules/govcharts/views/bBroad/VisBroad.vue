<template>
  <div class="page-wrapper">
    <el-row class="row-1" :gutter="15">
      <el-col :span="14">
        <div class="card-left card-4-angle">
          <MapHeader ref="mapHeader" @handleBack="handleBack" />
          <div class="map-top">
            <el-row :gutter="12" :span="24">
              <el-col :span="24" v-for="(item, index) in mapTopCardList" :key="index">
                <MapHeard :data="item" :isActive="curCard === item.name" @handleCardChange="handleCardChange" />
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
          <Map ref="mapChart" :data="mapData" curCard="在线用户数" @handleMapChange="handleMapChange"></Map>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="card-right card-4-angle card-1">
          <SearchInfo ref="searchInfo" @searchShow="searchShow"></SearchInfo>
        </div>
        <el-col :span="6">
          <div class="card-right card-with-title card-2">
            <!-- 集团工单数左边 -->
            <div style="height: 50px">
              <div class="float-titles">
                <i class="el-icon-caret-right" style="margin-left: -125px"></i>
                <p>投诉工单影响性</p>
                <div class="float-title-right1">
                  <i class="el-icon-refresh"></i>
                </div>
              </div>
            </div>
            <div style="width: 100%">
              <WideWord ref="carousel2"></WideWord>
            </div>
            <!--            <RingChart style="height: 160px" ref="ringchart"></RingChart>-->

          </div>
        </el-col>
        <div class="card-right card-with-title card-3">
          <!-- 工单分析 -->
          <el-row style="width: 100%; height: 15%">
            <!-- 工单分享 -->
            <div class="float-title">
              <i class="el-icon-caret-right"></i>
              故障工单影响性
            </div>
            <div class="float-title-right">
              <i class="el-icon-refresh"></i>
            </div>
          </el-row>
          <el-row style="width: 100%; height: 85%">
            <!-- 轮播图 -->
            <div style="width: 100%">
              <Swiper ref="carousel"></Swiper>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-2 card-bottom card-with-title card-1" :gutter="15" style="width: 100%">
      <!-- 头部 -->
      <el-row style="width: 100%">
        <ul class="bottom-ul">
          <li>工单数</li>
          <li>超时工单数</li>
          <li>处理平均时长</li>
          <li>处理及时率</li>
        </ul>
      </el-row>
      <el-row style="width: 100%">
        <!-- 警告 -->
        <div style="width: 50%">
          <Process ref="processVis"></Process>
        </div>
        <!-- 折线图 -->
        <div style="width: 50%; height: 250px">
          <Resource ref="resource"></Resource>
        </div>
      </el-row>
    </el-row>
    <!--    弹框组件-->
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
  import { ref } from "@vue/reactivity";
  import { onMounted, inject, computed } from "@vue/runtime-core";
  import Map from "@/components/topicsupport/Map";
  import SearchInfo from "@/components/common/SearchInfo";
  import Process from "@/components/visualization/Process";
  import Resource from "@/components/emergency/Resource";
  import WideWord from "@/components/emergency/WideWord";
  // import NumberWrap from "@/components/common/NumberWrap";
  import MapHeader from "@/components/common/MapHeader";
  import { provide } from "vue";
  import MapHeard from "@/components/emergency/MapHeard";
  import QueryCondition from "@/components/common/QueryCondition";
  import TableDialog from "@/components/common/TableDialog";
  import Swiper from "@/components/emergency/Swiper";

  export default {
    components: {
      TableDialog,
      QueryCondition,
      MapHeard,
      MapHeader,
      WideWord,
      SearchInfo,
      Map,
      Process,
      Resource,
      // NumberWrap,
      Swiper
    },
    setup() {
      const $axios = inject('$axios')
      const url = '/ser-govplat-comservice/api/rest/commService/v1/getData'
      let processVis = ref("");
      let refPullOut = ref("");
      let lineTitle = ref("影响业务无线告警数近30天增长趋势");
      let resource = ref("");
      let mapChart = ref("")
      const isNation = ref(true) // 是否是全国视图
      //轮播
      let carousel = ref("");
      //搜索框
      let searchInfo = ref("")
      //轮播2
      let carousel2 = ref("")
      let dialogVisible = ref(false)
      let dialogVisibleTow = ref(false)
      // 地图顶部的卡片初始化
      let curCard = ref("5G专网客户数(个)");
      let mapTopCardList = ref({
        value: [
          {
            name: "无线网",
            num: 1354,
            effect: 5,
            line: 40,
            color: "rgba(46, 196, 120, 1)",
            backgroundColor:
              "linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)",
          },
          {
            name: "传输网",
            num: 89,
            effect: 5,
            line: 20,
            color: "rgba(17, 174, 220, 1)",
            backgroundColor:
              "linear-gradient(360deg, rgba(17, 174, 220, 0.64) 0%, rgba(17, 174, 220, 0.32) 100%)",
          },
          {
            name: "核心网",
            num: 329,
            effect: 5,
            line: 70,
            color: "rgba(255, 170, 6, 1)",
            backgroundColor:
              "linear-gradient(360deg, rgba(255, 170, 6, 0.64) 0%, rgba(255, 170, 6, 0.32) 100%)",
          },
          {
            name: "核心网",
            num: 329,
            effect: 5,
            line: 70,
            color: "rgba(2, 106, 255, 1)",
            backgroundColor:
              "linear-gradient(360deg, rgba(2, 106, 255, 0.64) 0%, rgba(2, 106, 255, 0.32) 100%)",
          },
          {
            name: "核心网",
            num: 329,
            effect: 5,
            line: 70,
            color: "rgba(2, 106, 255, 1)",
            backgroundColor:
              "linear-gradient(360deg, rgba(2, 106, 255, 0.64) 0%, rgba(2, 106, 255, 0.32) 100%)",
          },
        ],
      });
      // 业务质量-接入指标
      let accessQuotaRef = ref(null);
      //集团工单数
      let rightChart = ref(null);
      //雷达图
      // let workorder = ref(null);
      const mapHeader = ref(""); // 地图标题
      // --TODO 地图初始化 --
      let mapData = ref({
        names: [],
        maxValues: [],
        info: []
      });
      // 获取左侧菜单
      const $topstore = inject('$topstore');
      let leftMenus = computed(() => $topstore.getters["layout/getLeftMenus"]);
      console.log(leftMenus)
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
      //地图接口
      $axios.post(url, {
        "desc": "流程可视化",
        "spe": "5g",
        "jsonFile": "tsconfig.json"
      }).then(res => {
        mapHeader.value.setTitle("流程可视化")
        mapData.value = res
        mapChart.value.loadMapData()
      })

      //云南的数据
      function handleMapChange(item) {
        if (item.id === '0') {
          all()
        } else {
          wordYun()
          keHu()
          swiper()
          // wordLeft()
          // wordRight()
        }
        isNation.value = item.id === '0'
        mapHeader.value.setTitle('流程可视化' + (item.id === '0' ? '' : '-' + item.name))
        mapHeader.value.setIsNation(isNation.value)
        $axios.post(url, {
          "desc": "流程可视化",
          "spe": "5g",
          "jsonFile": "quality_and_visualization_yunnan.json"
        }).then(res => {
          mapData.value = res
          mapChart.value.loadMapData()
        })
      }
      //工单数分省排名
      function wordYun() {
        $axios.post(url, {
          "desc": "流程可视化",
          "spe": "5g",
          "jsonFile": ""
        })
        processVis.value.setValues({
          ranking: "排名",
          province: "地市",
          Warn: "工单数",
          Working: "工单数",
          value: ["昆明", "临沧", "普洱", "玉溪", "邵通", "丽江"],
          nun: [
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
          ],
          number: ["142", "126", "112", "52", "46", "16"],
        });
      }
      //客户数分布
      function keHu() {
        $axios.post(url, {
          "desc": "流程可视化",
          "spe": "5g",
          "jsonFile": ""
        })
        resource.value.setValues({
          name: "客户数",
          data: [20, 62, 14, 52, 64, 33, 76],
          xData: [
            "08-01",
            "08-05",
            "08-10",
            "08-15",
            "08-20",
            "08-25",
            "08-30",
          ],
          yName: "单位 个",
        });
      }
      //工单轮播
      function swiper() {
        $axios.post(url, {
          "desc": "流程可视化",
          "spe": "5g",
          "jsonFile": ""
        })
        carousel.value.setValues([
          {
            rank: "1",//排名
            title: "昆明",//省份
            num: "152",//工单数
            dispose: "80",//影像切片
            number: "162"//影响用户
          },
          {
            rank: "2",
            title: "丽江",
            num: "123",
            dispose: "53",
            number: "126"
          },
          {
            rank: "3",
            title: "大理",
            num: "62",
            dispose: "50",
            number: "175"
          },
          {
            rank: "4",
            title: "玉溪",
            num: "35",
            dispose: "62",
            number: "135"
          },
          {
            rank: "5",
            title: "普洱",
            num: "26",
            dispose: "42",
            number: "120"
          },
          {
            rank: "1",//排名
            title: "昆明",//省份
            num: "152",//工单数
            dispose: "80",//影像切片
            number: "162"//影响用户
          },
          {
            rank: "2",
            title: "丽江",
            num: "123",
            dispose: "53",
            number: "126"
          },
          {
            rank: "3",
            title: "大理",
            num: "62",
            dispose: "50",
            number: "175"
          },
          {
            rank: "4",
            title: "玉溪",
            num: "35",
            dispose: "62",
            number: "135"
          },
          {
            rank: "5",
            title: "普洱",
            num: "26",
            dispose: "42",
            number: "120"
          },
        ]);
        //  轮播
        carousel2.value.setValues([
          {
            rank: "1",//排名
            title: "昆明",//省份
            num: "152",//工单数
            dispose: "80",//影像切片
            number: "162"//影响用户
          },
          {
            rank: "2",
            title: "丽江",
            num: "123",
            dispose: "53",
            number: "126"
          },
          {
            rank: "3",
            title: "大理",
            num: "62",
            dispose: "50",
            number: "175"
          },
          {
            rank: "4",
            title: "玉溪",
            num: "35",
            dispose: "62",
            number: "135"
          },
          {
            rank: "5",
            title: "普洱",
            num: "26",
            dispose: "42",
            number: "120"
          },
          {
            rank: "1",//排名
            title: "昆明",//省份
            num: "152",//工单数
            dispose: "80",//影像切片
            number: "162"//影响用户
          },
          {
            rank: "2",
            title: "丽江",
            num: "123",
            dispose: "53",
            number: "126"
          },
          {
            rank: "3",
            title: "大理",
            num: "62",
            dispose: "50",
            number: "175"
          },
          {
            rank: "4",
            title: "玉溪",
            num: "35",
            dispose: "62",
            number: "135"
          },
          {
            rank: "5",
            title: "普洱",
            num: "26",
            dispose: "42",
            number: "120"
          },
        ]);
      }
      //左侧工单总数
      let tableInfoUrl = null
      // -------------------------------------------------------------------
      let tableDatas = ref([]) // 声明 表格数据
      let tablePage = ref({ currentPage: 1, size: 10, total: 0 })
      let tableHeader = ref([{ fieldName: 'test1', label: '无数据', order: true, width: '220px', sortable: true }]) // 声明 表头
      // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表格, 4.将响应数据发送给子组件
      function searchShow(val, cond) {
        if (val && val.dialogVisible) { // -------------------->没有表单的情况
          // 查询条件
          console.log(val.condition) // 从子组件传来的查询条件
          let dredge = ''
          if (val.condition) {
            dredge = val.condition.keywords === '开通' ? 'visualization-open-5g-table.json' : 'visualization-complain-5g-table.json'
          } else {
            dredge = cond.condition.keywords === '开通' ? 'visualization-open-5g-table.json' : 'visualization-complain-5g-table.json'
          }
          // TODO 接口
          $axios.post(url, {
            "desc": "质量可视化",
            "spe": "5g",
            "jsonFile": dredge
          }
          ).then(res => {
            // 设置表头
            tableHeader.value = res.tableHeader
            // 表格数据
            tableDatas.value = res.tableData
            tablePage.value = { currentPage: 1, size: 10, total: res.tableData.length }
            console.log("-=-=-=-=-=-=-=-=-=后台-=-=-=-=-==--=")
            console.log(res)
          })
          dialogVisible.value = val.dialogVisible
        } else {      // -------------------------->有表单的情况
          dialogVisibleTow.value = val
        }
        //判断是投诉还是开通
        let buz = null
        if (val.condition) {
          buz = val.condition.keywords === '开通' ? 'open' : 'complain'
        } else {
          buz = cond.condition.keywords === '开通' ? 'open' : 'complain'
        }
        $axios.post('/ser-govplat-comservice/api/rest/commService/v1/getURL', { spe: '5g', buz: buz }).then(res => {
          tableInfoUrl = res
        })
      }

      // 1.从子组件接收查询条件, 2.向后台请求数据, 3.配置表单, 4.将响应数据发送给子组件
      function getCondition(val, cond) {
        let condition = val
        console.log('-------表单的查询条件--------');
        console.log(condition);
        let dredge = ''
        if (val.condition) {
          dredge = val.condition.keywords === '开通' ? 'visualization-open-5g-table.json' : 'visualization-complain-5g-table.json'
        } else {
          dredge = cond.condition.keywords === '开通' ? 'visualization-open-5g-table.json' : 'visualization-complain-5g-table.json'
        }
        // TODO 接口
        $axios.post(url, {
          "desc": "流程可视化",
          "spe": "5g",
          "jsonFile": dredge
        }
        ).then(res => {
          // 设置表头
          tableHeader.value = res.tableHeader
          // 表格数据
          tableDatas.value = res.tableData
          tablePage.value = { currentPage: 1, size: 10, total: res.tableData.length }
        })
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
      //点击X清空数据
      const handleCloseDialog = () => {
        tableDatas.value = []
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
          dialogVisible.value = false
          dialogVisibleTow.value = false
        }
        // 实现分页, 删除等操作
        console.log('----获取表格组件返回的数据--------')
        console.log(val)
      }

      /** -------------------------------------------------------------------------------------------------------------- */
      /**
       * 点击卡片事件
       */
      const handleCardChange = (item) => {
        if (item.name === curCard.value) return;
        curCard.value = item.name;
      };
      const handleBack = () => {
        // 返回全国视图
        mapChart.value.onBackDblclick();
        $axios.post(url, {
          "desc": "流程可视化",
          "spe": "5g",
          "jsonFile": "tsconfig.json"
        }).then(res => {
          mapData.value = res
          mapChart.value.loadMapData()
        })
      };
      // 业务质量-接入指标
      const accessQuotaRefresh = () => {
        console.log("业务质量-接入指标刷新按钮被点击");
      };
      function all() {
        processVis.value.setTitle("工单数排名");
        resource.value.setTitle("工单数进30日趋势");
        resource.value.setValues({
          name: "客户数",
          data: [55, 59, 69, 59, 44, 33, 72],
          xData: [
            "08-01",
            "08-05",
            "08-10",
            "08-15",
            "08-20",
            "08-25",
            "08-30",
          ],
          yName: "单位 个",
        });
        //  工单分析轮播图
        carousel.value.setValues([
          {
            rank: "1",//排名
            title: "北京",//省份
            num: "241",//工单数
            dispose: "92",//影像切片
            number: "241"//影响用户
          },
          {
            rank: "2",
            title: "上海",
            num: "24",
            dispose: "82",
            number: "224"
          },
          {
            rank: "3",
            title: "广东",
            num: "21",
            dispose: "96",
            number: "212"
          },
          {
            rank: "4",
            title: "浙江",
            num: "14",
            dispose: "18",
            number: "210"
          },
          {
            rank: "5",
            title: "江苏",
            num: "15",
            dispose: "56",
            number: "121"
          },
        ]);
        carousel2.value.setValues([
          // {
          //   rank: "行业",
          //   title: "正常工单",
          //   num: "超时工单",
          //   dispose: "及时处理率"
          // }
          {
            rank: "1",//排名
            title: "北京",//省份
            num: "241",//工单数
            dispose: "92",//影像切片
            number: "241"//影响用户
          },
          {
            rank: "2",
            title: "上海",
            num: "24",
            dispose: "82",
            number: "224"
          },
          {
            rank: "3",
            title: "广东",
            num: "21",
            dispose: "96",
            number: "212"
          },
          {
            rank: "4",
            title: "浙江",
            num: "14",
            dispose: "18",
            number: "210"
          },
          {
            rank: "5",
            title: "江苏",
            num: "15",
            dispose: "56",
            number: "121"
          },
        ]);
        //集团工单数左侧环形图
        //  省内工单数 右侧环形图
        //  客户分布
        processVis.value.setValues({
          ranking: "排名",
          province: "省份",
          Warn: "工单数",
          Working: "工单数",
          value: ["北京", "上海", "广州", "浙江", "四川", "江苏"],
          nun: [
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
            "randomNum(0, 99)",
          ],
          number: ["5001", "1520", "3504", "3520", "1630", "1520"],
        });
      }
      onMounted(() => {
        all()
        searchInfo.value.setSelectOptions(
          [
            { label: '开通', value: '开通' },
            { label: '投诉', value: '投诉' },
          ]
        )
        searchInfo.value.setSelectInitOption("开通")
      });

      return {
        accessQuotaRef,
        accessQuotaRefresh,
        mapData,
        refPullOut,
        lineTitle,
        mapTopCardList,
        handleCardChange,
        curCard,
        processVis,
        resource,
        rightChart,
        carousel,
        carousel2,
        handleBack,
        mapHeader,
        mapChart,
        handleMapChange,
        searchShow,
        dialogVisible,
        dialogVisibleTow,
        getCondition,
        getTableMessage,
        isNation,
        showLeftMenu,
        leftMenus,
        openLeftMenu,
        handleCloseDialog,
        searchInfo
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
    height: 100%;
  }

  .card-right.card-1 {
    height: 54px;
    margin-bottom: 15px;
  }

  .card-right.card-2 {
    width: 760px;
    height: 250px;
    margin-bottom: 15px;
  }

  .card-right.card-3 {
    height: 304px;
    margin-top: 290px;
    /*margin-bottom: 15px;*/
  }

  .card-right.card-4 {
    height: 136px;
  }

  .card-bottom.card-1 {
    height: 256px;
  }

  .card-bottom.card-2 {
    height: 256px;
  }

  .card-bottom.card-3 {
    height: 256px;
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
    margin: -10px 16px -17px 16px;
  }

  .bottom-ul {
    width: 50%;
    height: 30px;
    line-height: 30px;
    /*background-color: #2FCE7C;*/
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .bottom-ul li {
    display: inline-block;
    width: 20%;
    border: 1px solid #aaa;
    text-align: center;
    list-style: none;
    background-color: #161d2d;
    color: white;
  }

  .bottom-ul li:first-child {
    display: inline-block;
    width: 20%;
    border: 1px solid #aaa;
    text-align: center;
    list-style: none;
    background-image: linear-gradient(#2a5766, #101a28);
  }

  .float-title {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    line-height: 24px;
    text-shadow: 0px 0px 6px #26a7ff;
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

  .float-title-right1 {
    position: absolute;
    right: -615px;
    top: 0px;
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

  .case-distribution-line>div {
    color: #fff;
    text-align: center;
    line-height: 30px;
  }

  .case-distribution-one {
    position: absolute;
    left: -125px;
    top: 0;
    width: 75px;
    height: 0;
    border-top: 30px solid #26a7ff38;
    border-left: 30px solid #26a7ff38;
    border-right: 11px solid transparent;
    cursor: pointer;
  }

  .case-distribution-two {
    position: absolute;
    left: -50px;
    top: 0;
    width: 75px;
    height: 30px;
    background: #26a7ff38;
    transform: skew(-20deg);
    cursor: pointer;
  }

  .case-distribution-three {
    position: absolute;
    left: 50px;
    top: 0;
    width: 75px;
    height: 30px;
    background: #26a7ff38;
    transform: skew(-20deg);
    cursor: pointer;
  }

  .case-distribution-three {
    left: 156px;
  }

  .case-distribution-fore {
    position: absolute;
    left: 235px;
    top: 0;
    width: 70px;
    height: 0;
    border-top: 30px solid #26a7ff38;
    border-left: 30px solid #26a7ff38;
    border-right: 11px solid transparent;
    transform: rotateZ(180deg);
    cursor: pointer;
  }

  .case-distribution-five {
    position: absolute;
    left: 25px;
    top: 0;
    width: 115px;
    height: 0;
    border-top: 30px solid #26a7ff38;
    border-left: 30px solid #26a7ff38;
    border-right: 11px solid transparent;
    transform: rotateZ(180deg);
    cursor: pointer;
  }

  .case-distribution-five p {
    transform: rotateZ(180deg);
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
    top: 190px;
    left: 62px;
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
