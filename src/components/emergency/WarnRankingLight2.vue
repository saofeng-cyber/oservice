<template>
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
    <div
      class="warn-left"
      ng-if="data.list && data.list.length > 0 "
    >
      <div class="warn-div">
        <span style="margin-left: 15px">{{data.ranking}}</span>
        <span style="margin-left: 30px">{{data.province}}</span>
        <span style="margin-left: 145px">{{data.warn}}</span>
      </div>
      <div
        class="warn-div"
        v-for="(item , index) in data.list"
        :key="index"
      >
        <span
          style="margin-left: 15px;width: 17px;
              height: 17px;
              color:#fff;
              display: inline-block;
              text-align: center;
              line-height: 17px;"
          :style="{'background-color': getColor(index)}"
        >{{index+1}}</span>
        <span style="margin-left: 30px">{{item.NAME}}</span>
        <span
          class=""
          style="margin-left: 10px"
        >
          <el-progress
            class="warn-progress"
            style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;"
            :show-text="false"
            :stroke-width='10'
            stroke-linecap='square'
            :percentage="95-index*5"
            :color="getColor(index)"
          >
            <!-- <div id="warn-progress-bar"></div> -->
          </el-progress>
        </span>
        <span
          style="position: absolute; left: 375px; top:1px; font-weight:700"
          :style="{'color': getColor(index)}"
        >{{item.COUNT}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core"
export default {
  setup () {
    let title = ref('')
    // let ranking = ref('')
    let data = ref({
      ranking: ' 排名',
      province: "省份",
      warn: "告警数",
      provinces: "北京",
      prov: "上海",
      pros: "广东",
      provins: "浙江",
      one: "55",
      two: "50",
      three: "45",
      four: "40",
      numberone: "5007",
      numbertwo: "4730",
      numberthree: "3985",
      numberfour: "3492",
      list: []
    })
    // 设置标题
    const setTitle = (val) => {
      title.value = val
    };
    const setRanking = (val) => {
      data.value = val
    };
    const getColor = (index) => {
      const colorArray = ['rgb(255, 168, 0)', 'rgb(46, 196, 120)', 'rgb(0, 102, 255)', 'rgb(152, 158, 179)'];
      if (index < 3) {
        return colorArray[index]
      } else {
        return colorArray[3]
      }
    };
    return { title, setTitle, data, setRanking, getColor }
  }
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
.warn-left {
  position: absolute;
  top: 30px;
  left: 10px;
  right: 10px;
  bottom: 0px;
  overflow-y: auto;
}
.warn-div {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #fafbfc;
  margin-top: 6px;
  position: relative;
  /* display: flex; */
}
.warn-progress {
  position: relative;
  top: -30px;
  left: 105px;
  background-color: #f3f6f9;
}
</style>
<style>
.sapn-box .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}
.sapn-box1 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #2ec478, #2ec478) !important;
}
.sapn-box1 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}
.sapn-box2 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #0066ff, #0066ff) !important;
}
.sapn-box2 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}
.sapn-box3 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #989eb3, #989eb3) !important;
}
.sapn-box3 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}
.isActive {
  top: 0 !important;
}
</style>
