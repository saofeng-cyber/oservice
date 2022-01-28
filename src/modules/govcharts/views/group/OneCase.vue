<template>
  <div class="page-wrapper onCase onCase-broad">
    <!--上半部分地图、省客户分布、制造业-->
    <el-row class="row-1" :gutter="15">
      <!--分布和地图-->
      <el-col :span="14">
        <div class="card-left">
          <img src="../../../../assets/oncase/map-group.png" alt="">
        </div>
      </el-col>
      <!--右半部分-->
      <el-col :span="10">
        <div class="card-right card-4-angle card-1">
          <!--检索框-->
          <OneSearch @searchShow="searchShow"></OneSearch>
          <div class="card-right-bottom">
            <img src="../../../../assets/oncase/list1.png" alt="">
          </div>
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
  // import { getCurrentInstance } from "vue";
  import Map from "@/components/topicsupport/Map"; //中国地图
  import OneSearch from "@/components/common/OneSearch"; //搜索框
  import CheckCity from "@/components/common/CheckCity"; //引入弹框的下拉框
  import CardList from "@/components/common/CardList"; //引入弹框的卡片
  import CustomerInfo from "@/components/common/CustomerInfo"; //引入弹框的客户
  export default {
    components: {
      OneSearch,
      Map,
      CheckCity,
      CardList,
      CustomerInfo,
    },
    setup() {
      // const { proxy } = getCurrentInstance();
      const $axios = inject("$axios");
      const mapChart = ref(null);
      let dialogVisible = ref(false); //弹框默认关闭
      let dialogVisible1 = ref(false); //弹框默认关闭
      let customerDetail = ref(""); //弹框客户详情
      let customerInfo = ref(); //弹框客户
      let customerCard = ref(); //弹框卡片
      let mapData1 = ref({
        names: [],
        maxValues: [],
        info: [],
      });
      let mapTopCardList = ref("");
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
            customerCard.value.menuCard(res.data.cardGroup)
          })
          .then(() => {
            mapChart.value.loadMapData();
          });
      };
      function getTableMessage() {
        dialogVisible1.value = true;
        $axios
          .post("/ser-govplat-comservice/api/rest/commService/v1/getURL", {
            spe: "group",
            buz: "customer",
          })
          .then((res) => {
            customerDetail.value = res;
          });
      }
      onMounted(() => {

      });

      return {
        mapTopCardList,
        searchShow,
        mapChart,
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

  .card-right.card-1 {
    height: 54px;
    margin-bottom: 15px;
  }

  .card-right.card-2 {
    height: 315px;
    margin-bottom: 15px;
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

  .onCase-broad {
    /* height: calc(100vh - 60px); */
  }

  .onCase img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .card-right-bottom {
    width: 100%;
    margin-top: 15px;
    max-width: 770px;
    height: 1000px;
    margin: 0 auto;
  }

  .card-left {
    height: 1050px;
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
