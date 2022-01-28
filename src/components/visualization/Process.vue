<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <div class="float-title" v-if="title">
        <i class="el-icon-caret-right"></i>
        {{ title }}
      </div>
      <div class="float-title-right" @click="$emit('selfRefresh')">
        <i class="el-icon-refresh"></i>
      </div>
      <div class="null-warn">
        <div class="warn-left">
          <div class="warn-div">
            <span style="margin-left: 15px">{{data.ranking}}</span>
            <span style="margin-left: 30px">{{data.province}}</span>
            <span style="margin-left: 145px">{{data.Warn}}</span>
          </div>
          <div class="warn-div">
            <span
                style="
                margin-left: 15px;
                width: 17px;
                height: 17px;
                background-color: #684A0A;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              "
            >1</span
            >
            <span style="margin-left: 50px">{{data.value[0]}}</span>
            <div class="sapn-box" style="margin-left: 10px">
              <el-progress
                  class="warn-progress"
                  style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;
                "
                  :show-text="false"
                  :stroke-width="10"
                  stroke-linecap="square"
                  :percentage="+data.nun[0]"
                  color="#A26E06"
              >
                <!-- <div id="warn-progress-bar"></div> -->
              </el-progress>
            </div>
            <span
                style="
                position: absolute;
                top: 55px;
                left: 375px;
                color: #ffcc58;
                font-weight: 700;
              "
            >{{data.number[0]}}</span
            >
          </div>
          <div class="warn-div">
            <span
                style="
                margin-left: 15px;
                width: 17px;
                height: 17px;
                background-color: #17573F;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              "
            >2</span
            >
            <span style="margin-left: 45px"> {{data.value[1]}}</span>
            <div class="sapn-box1" style="margin-left: 10px">
              <el-progress
                  class="warn-progress"
                  style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;
                "
                  :show-text="false"
                  :stroke-width="10"
                  stroke-linecap="square"
                  :percentage="+data.nun[1]"
                  color="#1F7A4F"
              >
                <!-- <div id="warn-progress-bar"></div> -->
              </el-progress>
            </div>
            <span
                style="
                position: absolute;
                top: 105px;
                left: 375px;
                color: #3dee97;
                font-weight: 700;
              "
            >{{data.number[1]}}</span
            >
          </div>
          <div class="warn-div">
            <span
                style="
                margin-left: 15px;
                width: 17px;
                height: 17px;
                background-color: #093070;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              "
            >3</span
            >
            <span style="margin-left: 45px">{{data.value[2]}}</span>
            <div class="sapn-box2" style="margin-left: 10px">
              <el-progress
                  class="warn-progress"
                  style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;
                "
                  :show-text="false"
                  :stroke-width="10"
                  stroke-linecap="square"
                  :percentage="+data.nun[2]"
                  color="#27A8F6"
              >
                <!-- <div id="warn-progress-bar"></div> -->
              </el-progress>
            </div>
            <span
                style="
                position: absolute;
                top: 145px;
                left: 375px;
                color: #27a8f6;
                font-weight: 700;
              "
            >{{data.number[2]}}</span
            >
          </div>
      </div>
        <div class="warn-right">
          <div class="warn-div">
            <span style="margin-left: 15px">{{data.ranking}}</span>
            <span style="margin-left: 30px">{{data.province}}</span>
            <span style="margin-left: 145px">{{data.Working}}</span>
          </div>
          <div class="warn-div">
            <span
                style="
                margin-left: 15px;
                width: 17px;
                height: 17px;
                background-color: #4c5c73;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              "
            >4</span
            >
            <span style="margin-left: 50px">{{data.value[3]}}</span>
            <div class="sapn-box4" style="margin-left: 10px">
              <el-progress
                  class="warn-progress"
                  style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;
                "
                  :show-text="false"
                  :stroke-width="10"
                  stroke-linecap="square"
                  :percentage="+data.nun[3]"
                  color="#90B1D2"
              >
                <!-- <div id="warn-progress-bar"></div> -->
              </el-progress>
            </div>
            <span
                style="
                position: absolute;
                top: 55px;
                left: 850px;
                color: #ecf8ff;
                font-weight: 700;
              "
            >{{data.number[3]}}</span
            >
          </div>
          <div class="warn-div">
            <span
                style="
                margin-left: 15px;
                width: 17px;
                height: 17px;
                background-color: #4c5c73;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              "
            >5</span
            >
            <span style="margin-left: 50px">{{data.value[4]}}</span>
            <div class="sapn-box4" style="margin-left: 10px">
              <el-progress
                  class="warn-progress"
                  style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;
                "
                  :show-text="false"
                  :stroke-width="10"
                  stroke-linecap="square"
                  :percentage="+data.nun[4]"
                  color="#90B1D2"
              >
                <!-- <div id="warn-progress-bar"></div> -->
              </el-progress>
            </div>
            <span
                style="
                position: absolute;
                top: 105px;
                left: 850px;
                color: #ecf8ff;
                font-weight: 700;
              "
            >{{data.number[4]}}</span
            >
          </div>
          <div class="warn-div">
            <span
                style="
                margin-left: 15px;
                width: 17px;
                height: 17px;
                background-color: #4c5c73;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              "
            >6</span
            >
            <span style="margin-left: 50px">{{data.value[5]}}</span>
            <div class="sapn-box4" style="margin-left: 10px">
              <el-progress
                  class="warn-progress"
                  style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;
                "
                  :show-text="false"
                  :stroke-width="10"
                  stroke-linecap="square"
                  :percentage="+data.nun[5]"
                  color="#90B1D2"
              >
                <!-- <div id="warn-progress-bar"></div> -->
              </el-progress>
            </div>
            <span
                style="
                position: absolute;
                top: 145px;
                left: 850px;
                color: #ecf8ff;
                font-weight: 700;
              "
            >{{data.number[5]}}</span
            >
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Warn",
  setup() {
    let title = ref("");
    let data = ref({
      ranking:'排名',
      province:"省份",
      Warn:"工单数",
      Working:"工单数",
      value:["北京","上海","广东","浙江","江苏","四川"],
      nun:["85","75","65","55","50","45",],
      number:["5007","4730","3985","2007","1730","985"]
    })
    // 设置标题
    const setTitle = (val) => {
      title.value = val;
    };
    const setValues = (val) => {
      data.value = val
    }
    return {
      title,
      setTitle,
      data,
      setValues
    };
  },
};
</script>
<style>
.sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #64450E , #F9A401);
}
.sapn-box .el-progress-bar__outer {
  background-color: #060C18;
  border-radius: 0px;
}
.sapn-box1 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #154F39 , #2FCE7C);
}
.sapn-box1 .el-progress-bar__outer {
  background-color: #060C18;
  border-radius: 0px;
}
.sapn-box2 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #062A65 , #016AFF);
}
.sapn-box2 .el-progress-bar__outer {
  background-color: #060C18;
  border-radius: 0px;
}
.sapn-box3 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #2B5A6A , #67E4FB);
}
.sapn-box3 .el-progress-bar__outer {
  background-color: #060C18;
  border-radius: 0px;
}
.sapn-box4 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #415264 , #BBE5FF);
}
.sapn-box4 .el-progress-bar__outer {
  background-color: #060C18;
  border-radius: 0px;
}
</style>
<style scoped>
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
.null-warn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 40px;
}
.warn-left {
  width: 45%;
  /* padding: 40px 0; */
}
.warn-right {
  width: 45%;
}
.warn-div {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #171e2f;
  margin-top: 10px;
  color: white;
  /* display: flex; */
}
.warn-progress {
  position: relative;
  top: -30px;
  left: 105px;
  background-color: #080c15;
}
#warn-progress-bar {
  width: 150px;
  background-image: linear-gradient(to right, #5c410c, #e99b01);
  height: 15px;
}
</style>