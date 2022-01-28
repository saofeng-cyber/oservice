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
          :class="{isActive : data.iconShow == false}"
        >
          <span style="margin-left: 15px">{{data.ranking}}</span>
          <span style="margin-left: 30px">{{data.province}}</span>
          <span style="margin-left: 145px">{{data.warn}}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top:6px"
          :class="{isActive : data.iconShow == false}"
        >
          <span style="margin-left: 15px;width: 17px;
              height: 17px;
              background-color: #FFA800;
              color:#fff;
              display: inline-block;
              text-align: center;
              line-height: 17px;">1</span>
          <span style="margin-left: 50px">{{data.provinces}}</span>
          <span
            class="sapn-box"
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
              :percentage="+data.one"
              color="#FFA800"
            >
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span style="position: absolute; left: 375px; top:1px; color: #FFA800;font-weight:700">{{data.numberone}}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top:6px"
          :class="{isActive : data.iconShow == false}"
        >
          <span style=" margin-left: 15px;
              width: 17px;
              height: 17px;
              background-color: #2EC478;
              color:#fff;
              display: inline-block;
              text-align: center;
              line-height: 17px;">2</span>
          <span style="margin-left: 45px"> {{data.prov}}</span>
          <span
            class="sapn-box1"
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
              :percentage="+data.two"
              color="#2EC478"
            >
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span style="position: absolute; left: 375px; top:1px; color: #2EC478;font-weight:700">{{data.numbertwo}}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top:6px"
          :class="{isActive : data.iconShow == false}"
        >
          <span style="margin-left: 15px;
              width: 17px;
              height: 17px;
              background-color: #0066FF;
              color:#fff;
              display: inline-block;
              text-align: center;
              line-height: 17px;">3</span>
          <span style="margin-left: 45px">{{data.pros}}</span>
          <span
            class="sapn-box2"
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
              :percentage="+data.three"
              color="#0066FF"
            >
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span style="position: absolute; left: 375px; top:1px; color: #0066FF;font-weight:700">{{data.numberthree}}</span>
        </div>
        <div
          class="warn-div"
          style="margin-top:6px"
          :class="{isActive : data.iconShow == false}"
        >
          <span style="margin-left: 15px;
              width: 17px;
              height: 17px;
              background-color: #989EB3;
              color: #fff;
              display: inline-block;
              text-align: center;
              line-height: 17px;">4</span>
          <span style="margin-left: 45px">{{data.provins}}</span>
          <span
            class="sapn-box3"
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
              :percentage="+data.four"
              color="#989EB3"
            >
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span style="position: absolute; left: 375px; top:1px; color: #989EB3;font-weight:700">{{data.numberfour}}</span>
        </div>
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
      numberfour: "3492"
    })
    // 设置标题
    const setTitle = (val) => {
      title.value = val
    };
    const setRanking = (val) => {
      data.value = val
    };
    return { title, setTitle, data, setRanking }
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
  top: -30px;
  left: 105px;
  background-color: #f3f6f9;
}
</style>
<style>
.sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #ffa800, #ffa800) !important;
}
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
