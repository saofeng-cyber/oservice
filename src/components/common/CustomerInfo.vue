<template>
  <div class="customer">
    <!--顶部icon图标-->
    <div class="usercard-top">
      <div class="float-title">
        <i class="el-icon-caret-right"></i>
        客户信息
      </div>
      <div class="float-title-right">
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <!-- 客户信息 -->
    <div class="customer-info card-4-angle">
      <div
        class="customer-list"
        v-for="(item, index) in customerInfo"
        :key="index"
      >
        <p>{{ item.name }}</p>
        <span>{{ item.title }}</span>
      </div>
    </div>
    <!-- 客户信息排名 -->
    <div class="customer-rank card-4-angle">
      <div class="customer-title">
        <p>序号</p>
        <p>客户</p>
        <p>编号</p>
        <p>省份</p>
        <p>城市</p>
        <p>区县</p>
        <p>行业</p>
        <p>级别</p>
        <p>保障模式</p>
      </div>
      <div class="customer-rank-all">
        <div
          class="customer-rank-list"
          v-for="(item, index) in customerRank"
          :key="index"
          @click="submitData"
        >
          <!-- 序列号 -->
          <div class="customer-rank-lable">{{ item.lable }}</div>
          <!-- 客户 -->
          <div class="customer-rank-name">{{ item.name }}</div>
          <!-- 编号 -->
          <div class="customer-rank-num">{{ item.num }}</div>
          <!-- 省 -->
          <div class="customer-rank-province">{{ item.province }}</div>
          <!-- 市 -->
          <div class="customer-rank-city">{{ item.city }}</div>
          <!-- 县 -->
          <div class="customer-rank-county">{{ item.couny }}</div>
          <!-- 行业 -->
          <div class="customer-rank-industry">{{ item.industry }}</div>
          <!-- 级别 -->
          <div class="customer-rank-leaval">{{ item.leaval }}</div>
          <!-- 模式 -->
          <div class="customer-rank-model">{{ item.model }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup(props, context) {
    let customerInfo = ref();
    let customerRank = ref();
    const customerValue = (val) => {
      customerInfo.value = val.customerinfo;
      customerRank.value = val.customerData
    };
     function submitData() {
      context.emit('tableMessage')
    }
    onMounted(() => {
      // getData();
    });
    return {
      customerInfo,
      // getData,
      customerRank,
      customerValue,
      submitData
    };
  },
};
</script>

<style scoped>
.usercard-top {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.float-title {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 24px;
  text-shadow: 0px 0px 6px #26a7ff;
}

.float-title-right {
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
  width: 14px;
  height: 16px;
}
.customer-info {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px;
}
.customer-list {
  width: 45%;
  margin-top: 10px;
  background: #081322;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.customer-list p {
  color: #fff;
}
.customer-list span {
  color: #acfcff;
}
.customer-rank {
  margin: 20px 0;
  padding: 0 15px;
  overflow: hidden;
}
.customer-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
  background: #081322;
}
.customer-title p {
  font-size: 14px;
  color: #fff;
}
.customer-rank-all {
  width: 100%;
}
.customer-rank-list {
  height: 40px;
  background: #081322;
  line-height: 40px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}
.customer-rank-lable,
.customer-title p:first-child {
  width: 30px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  color: #fff;
  margin-top: 10px;
}
.customer-title p:first-child {
  margin-top: 0;
}
.customer-rank-name,
.customer-rank-num,
.customer-title p:nth-child(2),
.customer-title p:nth-child(3) {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.customer-rank-province,
.customer-rank-city,
.customer-rank-county,
.customer-title p:nth-child(4),
.customer-title p:nth-child(5),
.customer-title p:nth-child(6) {
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.customer-rank-industry,
.customer-rank-model,
.customer-title p:nth-child(7),
.customer-title p:nth-child(9) {
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.customer-rank-leaval,
customer-title p:nth-child(8) {
  width: 30px;
  text-align: center;
}
.customer-rank-label {
  background: cornflowerblue;
  color: #fff;
}
.customer-rank-list:first-child .customer-rank-lable {
  background: #6e4e15;
}
.customer-rank-list:nth-child(2) .customer-rank-lable {
  background: #195c47;
}
.customer-rank-list:nth-child(3) .customer-rank-lable {
  background: #0d2b5d;
}
.customer-rank-list:first-child .customer-rank-leaval {
  color: #6e4e15;
}
.customer-rank-list:nth-child(2) .customer-rank-leaval {
  color: #195c47;
}
.customer-rank-list:nth-child(3) .customer-rank-leaval {
  color: #0d2b5d;
}
.customer-rank-model {
  width: 40px !important;
  height: 20px;
  margin-left: 10px;
  margin-top: 10px;
  line-height: 20px;
  text-align: center;
}
.customer-rank-list:first-child .customer-rank-model {
  color: #6e4e15;
  border: 1px solid #6e4e15;
}
.customer-rank-list:nth-child(2) .customer-rank-model {
  color: #195c47;
  border: 1px solid #195c47;
}
.customer-rank-list:nth-child(3) .customer-rank-model {
  color: #0d2b5d;
  border: 1px solid #0d2b5d;
}
.customer-rank-list {
  color: #8ea0aa;
  cursor: pointer;
}
</style>