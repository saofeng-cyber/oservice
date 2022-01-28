<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <div class="float-title" v-if="title">
        <i class="el-icon-caret-right"></i>
        {{ title }}
      </div>
      <div
        class="float-title-right"
        v-if="data.iconShow"
        @click="$emit('selfRefresh')"
      >
        <i class="el-icon-refresh"></i>
      </div>
      <div class="warn-left">
        <div class="warn-div" :class="{ isActive: data.iconShow == false }">
          <span style="margin-left: 2%">{{ data.ranking }}</span>
          <span style="margin-left: 4%">{{ data.province }}</span>
          <span style="margin-left: 20%">{{ data.warn }}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top: 6px" 
          :class="{ isActive: data.iconShow == false }"
          v-for="(item,index) in data.info"
          :key="index"
        >
          <span class="warn-div-rank" :style="{background:item.color}">{{ item.rank }}</span>
          <span class="warn-div-city">{{ item.city }}</span>
          <span class="sapn-box" style="margin-left: 10px">
            <el-progress
              class="warn-progress"
              :show-text="false"
              :stroke-width="10"
              stroke-linecap="square"
              :percentage="item.process"
              color="#1F7A4F"
            >
            </el-progress>
          </span>
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
    let title = ref("");
    // let ranking = ref('')
    let data = ref('');
    // 设置标题
    const setTitle = (val) => {
      title.value = val;
    };
    const setRanking = (val) => {
      data.value = val;
    };
    return { title, setTitle, data, setRanking };
  },
};
</script>

<style scoped>
.warn-div-rank {
  margin-left: 2%;
  width: 17px;
  height: 17px;
  background-color: #684a0a;
  display: inline-block;
  text-align: center;
  line-height: 17px;
}
.warn-div-city{
  margin-left: 8%;
}
.warn-div-number {
  position: absolute;
  top: 0;
  right:2%;
  color: #ffcc58;
  font-weight: 700;
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
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #171e2f;
  /* margin-top: 6px; */
  color: white;
  position: relative;
  top: 40px;
  /* display: flex; */
}
.warn-progress {
  position: relative;
  top: -30px;
  left: 15%;
  background-color: #080c15;
  width: 45%;
  height: 15px;
  margin-left: 50px;
  margin-top: 5px;
}
</style>
<style>
.warn-left .warn-div:nth-child(2) .sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #64450e, #f9a401);
}
.sapn-box .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.warn-left .warn-div:nth-child(3) .sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #154f39, #2fce7c);
}
.sapn-box1 .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.warn-left .warn-div:nth-child(4) .sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #062a65, #016aff);
}
.sapn-box2 .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.warn-left .warn-div:nth-child(5) .sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #2b5a6a, #67e4fb);
}
.sapn-box3 .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.isActive {
  top: 0 !important;
}
</style>
