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
        <div class="card-left">
          <MapHeader ref="mapHeader" />
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
          <div style="width:100%;height: calc(100% - 140px);">
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
          <BusiSatis ref="refBusiSatis"></BusiSatis>
        </div>
        <div class="card-right card-2">
          <RanList
            :tableData="tableData"
            :tableHeigh="tableHeigh"
            ref="table"
          ></RanList>
        </div>
        <div class="card-right card-3">
          <ContrastChart
            ref="contrastChart"
            :title="contrastTitle"
          ></ContrastChart>
        </div>
      </el-col>
    </el-row>
    <el-row
      class="row-2"
      :gutter="15"
    >
      <el-col
        :span="12"
        style="background-color: #fff;height:100%;"
      >
        <div class="case-distribution">
          <div class="float-title">
            <span class="i"></span>
            {{topTitle}}
          </div>
        </div>
        <div class="leftcard">
          <div class="card-bottom card-1">
            <WarnRanking1
              ref="refWarn_1"
              :title="'开通满意度分省排名'"
            ></WarnRanking1>
          </div>
          <div class="card-bottom card-1">
            <WarnRanking1
              ref="refWarn_2"
              :title="'开通满意度分省排名'"
            ></WarnRanking1>
          </div>
        </div>
      </el-col>
      <el-col
        :span="12"
        style="height:100%;"
      >
        <div class="card-bottom card-2">
          <LineChart
            ref="refLineChart"
            :title="refLineTitle"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/topicsupport/CommonMap.vue";
import BusiSatis from "@/components/topicsupport/BusiSatisLight2.vue";
import LineChart from "@/components/common/LineChartLight.vue";
import MapTopCard from "@/components/common/MapTopCardLight.vue";
import RanList from "@/components/common/RanListLight.vue";
import ContrastChart from "@/components/common/ContrastChartLight.vue";
import MapHeader from "@/components/common/MapHeaderLight.vue";
import WarnRanking1 from "@/components/emergency/WarnRanking1Light.vue";
import { ref } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
export default {
  components: {
    Map,
    BusiSatis,
    RanList,
    ContrastChart,
    LineChart,
    MapTopCard,
    MapHeader,
    WarnRanking1,
  },
  setup () {
    const { proxy } = getCurrentInstance();
    const $axios = inject("$axios");
    //const postUrl = "/ser-govplat-comservice/api/rest/commService/v1/getData";
    const queryDataUrl = '/ser-ge-main/api/v1/tgedpdatacontroller/getFgSatisfactionData';
    let globalStyle = ref({});
    const mapTopCardList = ref([
      {
        "key": "0",
        "name": "开通满意度",
        "value": "99.99%",
        "img": "CIcon-Avatar",
        "color": "rgba(46, 196, 120, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)"
      },
      {
        "key": "1",
        "name": "故障满意度",
        "value": "99.99%",
        "img": "CIcon-Sound-One",
        "color": "rgba(17, 174, 220, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(17, 174, 220, 0.64) 0%, rgba(17, 174, 220, 0.32) 100%)"
      },
      {
        "key": "2",
        "name": "投诉满意度",
        "value": "99.99%",
        "img": "CIcon-Card-Two",
        "color": "rgba(255, 170, 6, 1)",
        "backgroundColor": "linear-gradient(360deg, rgba(255, 170, 6, 0.64) 0%, rgba(255, 170, 6, 0.32) 100%)"
      }
    ]); // 地图上方卡片数据
    const tableData = ref([]); // 省份各期数据
    const mapData2 = ref({}); // 云南各市数据
    const curCard = ref("开通满意度");
    const refLineChart = ref({}); // 开通满意度近 30 日增长趋势
    const tableHeigh = ref(180); // 开通满意度近 30 日增长趋势
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
    const contrastChart = ref(null);
    const refWarn_1 = ref("");
    const refWarn_2 = ref("");
    let contrastTitle = ref('')
    let topTitle = ref('')
    let refLineTitle = ref('')

    let dpdata = ref({})
    let index_list = ref([{
      name: '开通满意度',
      column: 'OPEN_SATISFACTION',
    }, {
      name: '故障满意度',
      column: 'FAULT_SATISFACTION',
    }, {
      name: '投诉满意度',
      column: 'COMPLAINT_SATISFACTION',
    }])
    let orgtype = ref('省');
    let orgname = ref('');
    let curTab = ref(0);

    const queryData = function () {
      $axios.post(queryDataUrl, {
        "orgtype": orgtype.value || '省',
        "orgname": orgname.value || ''
      }).then(res => {
        console.log(res)
        dpdata.value = res;

        mapTopCardList.value[0].value = (res.data.OPEN_SATISFACTION || 100) + '%'
        mapTopCardList.value[1].value = (res.data.FAULT_SATISFACTION || 100) + '%'
        mapTopCardList.value[2].value = (res.data.COMPLAINT_SATISFACTION || 100) + '%'

        mapData.value.area_name = orgname.value || '';
        mapData.value.info = res.data;
        mapData.value.list = res.regionList;
        mapData.value.index_list = index_list.value;
        mapData.value.view_index = curTab.value;
        mapChart.value.loadMapData();

        refBusiSatis.value.setValues([
          { val: (res.data.OPEN_SATISFACTION || 100), name: '开通满意度' },
          { val: (res.data.FAULT_SATISFACTION || 100), name: '故障满意度' },
          { val: (res.data.COMPLAINT_SATISFACTION || 100), name: '投诉满意度' },
        ]);

        var anaObj = {
          x_data: [],
          data: []
        };
        var year = new Date().getFullYear()
        var currMonth = new Date().getMonth() + 1
        var currQuarter = Math.floor((currMonth % 3 == 0 ? (currMonth / 3) : (currMonth / 3 + 1)));
        for (var x = 1; x <= currQuarter; x++) {
          var name = year + '-第' + x + '期';
          var d = [];
          for (var i = 0; i < res.regionList.length; i++) {
            if (x === 1) {
              anaObj.x_data.push(res.regionList[i].SHOWNAME);
            }
            d.push(res.regionList[i]['OPEN_SATISFACTION' + x]);
          }
          anaObj.data.push({ name: name, data: d });
        }
        contrastChart.value.setValues(anaObj)


        tableData.value = res.regionList.sort(function (a, b) { return b['OPEN_SATISFACTION1'] - a['OPEN_SATISFACTION1'] });

        var top1 = {
          "iconShow": false,
          "ranking": " 排名",
          "province": "区域",
          "warn": "满意度",
          "info": [
            {
              "rank": 1,
              "city": "北京",
              "process": 93,
              "num": 9546,
              "color": "#A26E06"
            },
            {
              "rank": 2,
              "city": "上海",
              "process": 87,
              "num": 9100,
              "color": "#1d7d55"
            },
            {
              "rank": 3,
              "city": "广东",
              "process": 83,
              "num": 8894,
              "color": "#2395e3"
            },
            {
              "rank": 4,
              "city": "浙江",
              "process": 80,
              "num": 8088,
              "color": "#87d6e6"
            }
          ]
        }
        for (let i = 0; i <= 3; i++) {
          top1.info[i].city = res.regionList[i].SHOWNAME;
          top1.info[i].process = 95 - 5 * i;
          top1.info[i].num = (res.regionList[i].OPEN_SATISFACTION || 100) + '%';
        }
        refWarn_1.value.setRanking(top1);
        var top2 = {
          "iconShow": false,
          "ranking": " 排名",
          "province": "区域",
          "warn": "满意度",
          "info": [
            {
              "rank": 5,
              "city": "江苏",
              "process": 75,
              "num": 7695,
              "color": "#6e89a4"
            },
            {
              "rank": 6,
              "city": "四川",
              "process": 70,
              "num": 7300,
              "color": "#6e89a4"
            },
            {
              "rank": 7,
              "city": "山西",
              "process": 66,
              "num": 6789,
              "color": "#6e89a4"
            },
            {
              "rank": 8,
              "city": "天津",
              "process": 60,
              "num": 6000,
              "color": "#6e89a4"
            }
          ]
        }
        for (let i = 4; i <= 7; i++) {
          top2.info[i - 4].city = res.regionList[i].SHOWNAME;
          top2.info[i - 4].process = 95 - 5 * i;
          top2.info[i - 4].num = (res.regionList[i].OPEN_SATISFACTION || 100) + '%';
        }
        refWarn_2.value.setRanking(top2);

        let lineChartData = [{
          "name": "满意度",
          "data": [],
          "xData": [],
          "yName": "单位：%"
        }]
        for (let i = res.trendList.length - 1; i >= 0; i--) {
          lineChartData[0].xData.push(res.trendList[i].CDATE_STR);
          lineChartData[0].data.push(res.trendList[i].OPEN_SATISFACTION || 0);
        }
        refLineChart.value.setValues(lineChartData);
      })
    }


    const handleMapChange = (val) => {
      orgtype.value = '地市';
      orgname.value = val.name;
      queryData();
    };
    //切换地市数据
    const handleBack = () => {
      orgtype.value = '省';
      orgname.value = '';
      queryData();
    };
    const handleCardChange = (item) => {
      if (item.name === proxy.curCard) return;
      proxy.curCard = item.name;

      let ii = 0;
      mapTopCardList.value.forEach(function (data, index) {
        if (item.name == data.name) {
          ii = index;
          curTab.value = index;
        }
      })
      mapData.value.area_name = orgname.value || '';
      mapData.value.info = dpdata.value.data;
      mapData.value.list = dpdata.value.regionList;
      mapData.value.index_list = index_list.value;
      mapData.value.view_index = ii;
      mapChart.value.loadMapData();

      var res = dpdata.value;

      var anaObj = {
        x_data: [],
        data: []
      };
      var year = new Date().getFullYear()
      var currMonth = new Date().getMonth() + 1
      var currQuarter = Math.floor((currMonth % 3 == 0 ? (currMonth / 3) : (currMonth / 3 + 1)));
      for (var x = 1; x <= currQuarter; x++) {
        var name = year + '-第' + x + '期';
        var d = [];
        for (var i = 0; i < res.regionList.length; i++) {
          if (x === 1) {
            anaObj.x_data.push(res.regionList[i].SHOWNAME);
          }
          d.push(res.regionList[i][index_list.value[curTab.value].column + x]);
        }
        anaObj.data.push({ name: name, data: d });
      }
      contrastChart.value.setValues(anaObj)

      var top1 = {
        "iconShow": false,
        "ranking": " 排名",
        "province": "区域",
        "warn": "满意度",
        "info": [
          {
            "rank": 1,
            "city": "北京",
            "process": 93,
            "num": 9546,
            "color": "#A26E06"
          },
          {
            "rank": 2,
            "city": "上海",
            "process": 87,
            "num": 9100,
            "color": "#1d7d55"
          },
          {
            "rank": 3,
            "city": "广东",
            "process": 83,
            "num": 8894,
            "color": "#2395e3"
          },
          {
            "rank": 4,
            "city": "浙江",
            "process": 80,
            "num": 8088,
            "color": "#87d6e6"
          }
        ]
      }
      res.regionList.sort(function (a, b) { return b[index_list.value[curTab.value].column] - a[index_list.value[curTab.value].column] });
      for (let i = 0; i <= 3; i++) {
        top1.info[i].city = res.regionList[i].SHOWNAME;
        top1.info[i].process = 95 - 5 * i;
        top1.info[i].num = (res.regionList[i][index_list.value[curTab.value].column] || 100) + '%';
      }
      refWarn_1.value.setRanking(top1);
      var top2 = {
        "iconShow": false,
        "ranking": " 排名",
        "province": "区域",
        "warn": "满意度",
        "info": [
          {
            "rank": 5,
            "city": "江苏",
            "process": 75,
            "num": 7695,
            "color": "#6e89a4"
          },
          {
            "rank": 6,
            "city": "四川",
            "process": 70,
            "num": 7300,
            "color": "#6e89a4"
          },
          {
            "rank": 7,
            "city": "山西",
            "process": 66,
            "num": 6789,
            "color": "#6e89a4"
          },
          {
            "rank": 8,
            "city": "天津",
            "process": 60,
            "num": 6000,
            "color": "#6e89a4"
          }
        ]
      }
      for (let i = 4; i <= 7; i++) {
        top2.info[i - 4].city = res.regionList[i].SHOWNAME;
        top2.info[i - 4].process = 95 - 5 * i;
        top2.info[i - 4].num = (res.regionList[i][index_list.value[curTab.value].column] || 100) + '%';
      }
      refWarn_2.value.setRanking(top2);

      let lineChartData = [{
        "name": "满意度",
        "data": [],
        "xData": [],
        "yName": "单位：%"
      }]
      for (let i = res.trendList.length - 1; i >= 0; i--) {
        lineChartData[0].xData.push(res.trendList[i].CDATE_STR);
        lineChartData[0].data.push(res.trendList[i][index_list.value[curTab.value].column] || 0);
      }
      refLineChart.value.setValues(lineChartData);

      contrastTitle.value = index_list.value[curTab.value].name + '季度对比分析';
      topTitle.value = index_list.value[curTab.value].name + '排名';
      refLineTitle.value = index_list.value[curTab.value].name + '近30日趋势';

    };

    onMounted(() => {
      var h = (window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight));
      globalStyle.value = { height: h + 'px', 'box-sizing': 'border-box' }
      queryData()
      mapHeader.value.setTitle("满意度可视化");
      contrastTitle.value = index_list.value[curTab.value].name + '季度对比分析';
      topTitle.value = index_list.value[curTab.value].name + '排名';
      refLineTitle.value = index_list.value[curTab.value].name + '近30日趋势';
    });

    return {
      refBusiSatis,
      refLineChart,
      refSpurWarn,
      quarterLine,
      handleMapChange,
      isNation,
      mapHeader,
      mapData,
      mapChart,
      handleBack,
      handleCardChange,
      refWarn_1,
      refWarn_2,
      mapTopCardList,
      tableData,
      mapData2,
      curCard,
      table,
      tableHeigh,
      contrastChart,
      topTitle,
      refLineTitle,
      contrastTitle,
      globalStyle
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
.map-top {
  margin: 10px 10px 0;
}
.card-left {
  height: 100%;
  background-color: #fff;
}
.card-right.card-1 {
  height: calc(30% - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}
.card-right.card-2 {
  height: calc(40% - 10px);
  margin-bottom: 10px;
  background-color: #fff;
}
.card-right.card-3 {
  height: calc(30%);
  background-color: #fff;
}

.card-bottom.card-1 {
  width: 48%;
  background-color: #fff;
}
.card-bottom.card-2 {
  height: 100%;
  background-color: #fff;
}
.leftcard {
  width: 100%;
  height: calc(100% - 45px);
  display: flex;
  justify-content: space-between;
}
.case-distribution {
  width: 100%;
  overflow: hidden;
  float: left;
}
.float-title {
  margin: 10px 0;
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