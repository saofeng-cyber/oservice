<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <div class="warn-left">
        <div class="warn-div" :class="{ isActive: data.iconShow == false }">
          <span style="float: left; width: 15%;">{{ data.ranking }}</span>
          <span style="float: left; width: 45%; text-align: left;">{{
            data.province
          }}</span>
          <span style="float: left; width: 25%; text-align: left">{{
            data.warn
          }}</span>
          <span style="float: left; width: 15%; text-align: center">{{
            data.ratio
          }}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top: 6px"
          :class="{ isActive: data.iconShow == false }"
          v-for="(item, index) in data.info"
          :key="index"
        >
          <div style="float: left; width: 10%;text-align:right">
            <span class="warn-div-rank" :style="{ background: item.color }">{{
              item.rank
            }}</span>
          </div>
          <span class="warn-div-city">{{ item.groupType }}</span>
          <span :style="{color:item.color}" class="sapn-box111" style="margin-left: 5px">{{ item.process }}</span>
          <span class="warn-div-number">{{ item.num }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";
export default {
  setup() {
    let data = ref("");
    // 设置标题
    const setRanking = (val) => {
      data.value = val;
    };
    return { data, setRanking };
  },
};
</script>

<style scoped>
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}
.warn-left{
  padding: 0 15px;
}
.warn-div-rank {
  width: 17px;
  height: 17px;
  background-color: #684a0a;
  display: inline-block;
  text-align: center;
  line-height: 17px;
  color: #fff;
}
.warn-div-city {
  float: left;
  width: 40%;
  text-align: left;
  /* background-color: cadetblue; */
  padding-left: 20px;
}
.sapn-box111 {
  float: left;
  width: 20%;
  font-weight: bold;
}
.warn-div-number {
  float: left;
  position: absolute;
  color: rgb(64, 216, 64);
  font-weight: 600;
  margin-left: -5px;
}
.float-title {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
.float-title-right {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
}
.warn-div {
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  line-height: 25px;
  font-size: 14px;
  background-color: #fafbfc;
  /* margin-top: 6px; */
  position: relative;
  top: 40px;
  /* display: flex; */
  padding:5px 10px;
  border: 1px solid #ccc;
  margin-top: 15px;
}
</style>
