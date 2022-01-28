<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <div
        class="float-title"
        v-if="title"
      >
        <span class="i"></span>
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
        <div
          class="warn-div"
          :class="{ isActive: data.iconShow == false }"
        >
          <span style="float:left;width:10%;">{{ data.ranking }}</span>
          <span style="float:left;width:30%;text-align:center;">{{ data.province }}</span>
          <span style="float:left;width:60%;text-align:center;">{{ data.warn }}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top: 6px"
          :class="{ isActive: data.iconShow == false }"
          v-for="(item,index) in data.info"
          :key="index"
        >
          <div style="float:left;width:10%;">
            <span
              class="warn-div-rank"
              :style="{background:item.color}"
            >{{ item.rank }}</span>
          </div>
          <span class="warn-div-city">{{ item.city }}</span>
          <span
            class="sapn-box111"
            style="margin-left: 10px"
          >
            <el-progress
              class="warn-progress"
              :show-text="false"
              :stroke-width="10"
              stroke-linecap="square"
              :percentage="item.process"
              :color="item.color"
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
  setup () {
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
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
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
  width: 30%;
  text-align: center;
}
.sapn-box111 {
  float: left;
  width: 30%;
}
.warn-div-number {
  float: left;
  width: 30%;
  position: absolute;
  text-align: center;
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
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #fafbfc;
  /* margin-top: 6px; */
  position: relative;
  top: 40px;
  /* display: flex; */
}
.warn-progress {
  position: relative;
  height: 15px;
  margin-top: 10px;
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
