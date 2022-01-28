<template>
  <div class="page-wrapper onCase">
    <!-- <Map ref="mapChart" :data="mapData1" :curCard="curCard"></Map> -->
    <!--上半部分地图、省客户分布、制造业-->
    <el-row class="row-1" :gutter="15">
      <!--分布和地图-->
      <el-col :span="14">
        <div class="card-left card-4-angle">
          <MapHeader ref="mapHeader" @handleBack="handleBack" />
          <!--4个模块-->
          <div class="map-top">
            <el-row :gutter="12">
              <el-col :span="6" v-for="(item, index) in mapTopCardList" :key="index">
                <MapTopCard :data="item" :isActive="curCard === item.name" @handleCardChange="handleCardChange" />
              </el-col>
            </el-row>
          </div>
          <!--中国地图-->
          <Map ref="mapChart" :data="mapData" :curCard="curCard" @handleMapChange="handleMapChange"></Map>
        </div>
      </el-col>
      <!--右半部分-->
      <el-col :span="10">
        <div class="card-right card-4-angle card-1">
          <!--检索框-->
          <OneSearch @searchShow="searchShow"></OneSearch>
        </div>
        <!--省份排名-->
        <div class="oncase-provinces card-right card-with-title card-2">
          <!--省客户分布-->
          <div class="case-distribution">
            <div class="float-title">
              <i class="el-icon-caret-right"></i>
              省客户分布
            </div>
            <!--不规则四边形-->
            <div class="case-distribution-line">
              <div class="case-distribution-one">
                <p>全部</p>
              </div>
              <div class="case-distribution-two">
                <p>优享</p>
              </div>
              <div class="case-distribution-three">
                <p>专享</p>
              </div>
              <div class="case-distribution-fore">
                <p>尊享</p>
              </div>
            </div>
          </div>
          <!--合计客户数-->
          <div class="case-total">
            <div class="case-total-left">
              <p>合计客户数</p>
              <NumberWrap :endVal="3"></NumberWrap>
              <NumberWrap :endVal="5"></NumberWrap>
              <NumberWrap :endVal="6"></NumberWrap>
              <NumberWrap :endVal="8"></NumberWrap>
              <NumberWrap :endVal="2"></NumberWrap>
            </div>
          </div>
          <div style="
              margin: 20px auto 0;
              display: flex;
              justify-content: space-between;
              max-width: 731px;
            ">
            <div class="card-bottom card-with-title card-1">
              <WarnRanking ref="refWarn_1"></WarnRanking>
            </div>
            <div class="card-bottom card-with-title card-2">
              <WarnRanking ref="refWarn_2"></WarnRanking>
            </div>
          </div>
        </div>
        <!--行业分布-->
        <div class="card-right card-4-angle card-3">
          <Industry ref="industryData"></Industry>
        </div>
      </el-col>
    </el-row>
    <!--折线图和用户开卡数-->
    <el-row class="row-2" :gutter="15">
      <el-col :span="14">
        <!--近一个月用户趋势折线图-->
        <div class="card-bottom card-with-title card-3">
          <LineChart :title="lineTitle" style="height: 256px"></LineChart>
        </div>
      </el-col>
      <el-col :span="10">
        <!--用户开卡数TOP排行-->
        <div class="card-bottom card-with-title card-3">
          <UserCard ref="UserCardData"></UserCard>
        </div>
      </el-col>
    </el-row>
    <!-- 弹框组件 -->
    <el-dialog v-model="dialogVisible" width="90%">
      <div class="dialog-all">
        <div class="dialog-left">
          <!-- 下拉选择框 -->
          <CheckCity></CheckCity>
          <!-- 卡片按钮 -->
          <CardList ref=customerCard></CardList>
          <!-- 地图 -->
          <div style="background: #081322; width: 100%; margin-top: 20px">
            <Map ref="mapChart" :data="mapData1" :curCard="curCard"></Map>
          </div>
        </div>
        <div class="dialog-right">
          <!-- 用户信息 -->
          <CustomerInfo ref="customerInfo" @tableMessage="getTableMessage"></CustomerInfo>
        </div>
      </div>
    </el-dialog>
    <!-- 详情弹出框 -->
    <el-dialog v-model="dialogVisible1" width="90%">
      <iframe :src="customerDetail" frameborder="0" style="width:100%;height:100vh"></iframe>
    </el-dialog>
  </div>
</template>

<script>
  import { ref } from "@vue/reactivity";
  import { onMounted, inject } from "@vue/runtime-core";
  import { getCurrentInstance } from "vue";
  import Map from "@/components/topicsupport/Map"; //中国地图
  import WarnRanking from "@/components/emergency/WarnRanking1"; //省份排名
  import LineChart from "@/components/common/LineChart"; //近一个月用户趋势折线图
  import OneSearch from "@/components/common/OneSearch"; //搜索框
  import MapTopCard from "@/components/common/MapTopCard.vue"; //司徒占比
  import NumberWrap from "@/components/common/NumberWrap.vue"; //数字跳动
  import Industry from "@/components/common/Industry.vue"; //行业分布
  import UserCard from "@/components/common/UserCard.vue"; //开卡用户排行
  import MapHeader from "@/components/common/MapHeader";
  import CheckCity from "@/components/common/CheckCity"; //引入弹框的下拉框
  import CardList from "@/components/common/CardList"; //引入弹框的卡片
  import CustomerInfo from "@/components/common/CustomerInfo"; //引入弹框的客户
  export default {
    components: {
      OneSearch,
      LineChart,
      Map,
      WarnRanking,
      MapTopCard,
      NumberWrap,
      Industry,
      UserCard,
      MapHeader,
      CheckCity,
      CardList,
      CustomerInfo,
    },
    setup() {
      const { proxy } = getCurrentInstance();
      const $axios = inject("$axios");
      let refWarn_1 = ref("");
      let refWarn_2 = ref("");
      let lineTitle = ref("近一个月用户趋势");
      let industryData = ref("");
      let UserCardData = ref("");
      let mapHeader = ref("");
      const isNation = ref(true); // 是否是全国视图
      const isProvinceSelect = ref(false); // 是否选中省份
      const mapChart = ref(null);
      let dialogVisible = ref(false); //弹框默认关闭
      let dialogVisible1 = ref(false); //弹框默认关闭
      let customerDetail = ref(""); //弹框客户详情
      let customerInfo = ref(); //弹框客户
      let customerCard = ref(); //弹框卡片
      // --TODO 地图初始化 --
      let mapData = ref({
        names: [],
        maxValues: [],
        info: [],
      });
      let mapData1 = ref({
        names: [],
        maxValues: [],
        info: [],
      });
      let mapData2 = ref({});
      let mapTopCardList = ref("");
      let curCard = ref("5G专网客户数");

      // 双击获取云南数据事件
      const handleMapChange = (region) => {
        console.log("地图变化", region);
        isNation.value = region.id === "0";
        mapHeader.value.setTitle(
          "一户一案" + (region.id === "0" ? "" : "-" + region.name)
        );
        mapHeader.value.setIsNation(isNation.value);
        initProvinceData();
        initCustumer();
      };
      //获取云南地图数据
      const initProvinceData = () => {
        const data = {
          jsonFile: "speSupport-resVisual-resView-province.json",
          desc: "支撑专题-资源可视化-省份视图",
          spe: "5g",
        };
        $axios
          .post("/ser-govplat-comservice/api/rest/commService/v1/getData", data)
          .then((d) => {
            mapTopCardList.value = d.mapTopCardList;
            mapData.value = d.mapData;
          })
          .then(() => {
            mapChart.value.loadMapData();
          });
      };
      // 云南客户数
      const initCustumer = () => {
        const data = { jsonFile: "onecaseyn.json", desc: "一户一案", spe: "5g" };
        $axios
          .post("/ser-govplat-comservice/api/rest/commService/v1/getData", data)
          .then((res) => {
            refWarn_1.value.setRanking(res.data.province1);
            refWarn_2.value.setRanking(res.data.province2);
          });
      };
      //卡片切换事件
      const handleCardChange = (item) => {
        if (item.name === proxy.curCard) return;
        proxy.curCard = item.name;
      };
      // 返回全国视图
      const handleBack = () => {
        mapChart.value.onBackDblclick();
        getData();
      };
      // 页面初始化请求接口
      const getData = () => {
        $axios
          .post("/ser-govplat-comservice/api/rest/commService/v1/getData", {
            desc: " 支撑专题",
            spe: "5g",
            jsonFile: "onecase.json",
          })
          .then((res) => {
            console.log("请求后台结果：", res);
            mapData.value = res.data.mapData; //地图数据
            UserCardData.value.setValue(res.data.ranking.splice(3)); //赋值给用户开卡数排行
            refWarn_1.value.setRanking(res.data.province1);
            refWarn_2.value.setRanking(res.data.province2);
            industryData.value.setValue(res.data.industry); //制造业数据
            mapTopCardList.value = res.data.mapTopCardList; //地图上4个卡片
          })
          .then(() => {
            mapChart.value.loadMapData();
          });
      };
      //搜索框点击事件
      const searchShow = () => {
        dialogVisible.value = true;
        getDig();
      };
      const getDig = () => {
        $axios
          .post("/ser-govplat-comservice/api/rest/commService/v1/getData", {
            desc: " 支撑专题",
            spe: "5g",
            jsonFile: "onecase.json",
          })
          .then((res) => {
            mapData1.value = res.data.mapData; //地图数据
            customerInfo.value.customerValue(res.data.customer);
            customerCard.value.menuCard(res.data.card)
          })
          .then(() => {
            mapChart.value.loadMapData();
          });
      };
      function getTableMessage() {
        dialogVisible1.value = true;
        $axios
          .post("/ser-govplat-comservice/api/rest/commService/v1/getURL", {
            spe: "5g",
            buz: "customer",
          })
          .then((res) => {
            customerDetail.value = res;
            console.log(customerDetail.value)
          });
      }
      onMounted(() => {
        getData();
        mapHeader.value.setTitle("一户一案");
        mapHeader.value.setDateTime("2021-09-04");
      });

      return {
        mapData,
        refWarn_1,
        refWarn_2,
        lineTitle,
        handleCardChange,
        curCard,
        mapTopCardList,
        industryData,
        UserCardData,
        searchShow,
        mapData2,
        handleMapChange,
        mapHeader,
        isNation,
        isProvinceSelect,
        initProvinceData,
        handleBack,
        mapChart,
        initCustumer,
        dialogVisible,
        dialogVisible1,
        getDig,
        mapData1,
        customerInfo,
        getTableMessage,
        customerDetail,
        customerCard
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
    margin-bottom: 15px;
  }

  .card-left {
    height: 100%;
  }

  .map-top {
    margin: 0 16px 16px 16px;
  }

  .card-right.card-1 {
    height: 54px;
    margin-bottom: 15px;
  }

  .card-right.card-2 {
    height: 315px;
    margin-bottom: 15px;
  }

  .card-right.card-3 {
    height: 252px;
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

  .float-title {
    float: left;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    line-height: 24px;
    text-shadow: 0px 0px 6px #26a7ff;
  }

  .case-distribution {
    overflow: hidden;
    margin: 0 auto;
    max-width: 731px;
  }

  .case-distribution-line {
    position: relative;
    float: right;
    width: 324px;
    margin-top: 10px;
  }

  .case-distribution-line>div {
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
    border-top: 30px solid #57c6de;
    border-left: 30px solid #57c6de;
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
    background: #26a7ff38;
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
    border-top: 30px solid #26a7ff38;
    border-left: 30px solid #26a7ff38;
    border-right: 11px solid transparent;
    transform: rotateZ(180deg);
    cursor: pointer;
  }

  .case-distribution-one p,
  .case-distribution-fore p {
    position: absolute;
    left: -20px;
    right: 0;
    top: -30px;
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

  .case-total {
    margin: 20px auto 0;
    max-width: 731px;
    overflow: hidden;
  }

  .case-total-left {
    float: left;
  }

  .case-total-left p {
    float: left;
    font-size: 14px;
    color: #fff;
    line-height: 20px;
    margin-right: 10px;
  }

  .dialog-all {
    width: 100%;
    position: relative;
    background: #0b1a2f;
    display: flex;
    justify-content: space-between;
  }

  .dialog-left {
    width: 1000px;
    margin-right: 20px;
  }

  .dialog-right {
    flex: 1;
    background: #0d1c31;
    overflow: hidden;
    padding: 0 15px;
  }
</style>
<style>
  .onCase .map-bg {
    left: 0 !important;
    right: 0 !important;
    margin: auto !important;
  }

  .oncase-provinces {
    width: 100%;
    overflow: hidden;
  }

  .oncase-provinces .card-bottom {
    width: 49%;
    overflow: hidden;
  }

  .onCase .el-dialog {
    background: rgba(255, 255, 255, 0.6);
    overflow: hidden;
  }

  .dialog-all .map-chart {
    width: 1000px;
  }

  .onCase .el-dialog__headerbtn {
    font-size: 24px;
  }

  .onCase .el-dialog__close {
    color: #0d1c31 !important;
  }

  .onCase .el-icon {
    --font-size: 24px;
  }

  .onCase .el-dialog__body {
    padding-top: 0
  }

  .onCase .el-dialog__header .el-dialog__headerbtn {
    top: 0
  }

  .onCase .el-dialog {
    margin: 0 auto !important
  }
</style>
