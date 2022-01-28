<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <div
        class="float-title"
        v-if="title"
      >
        {{ title }}
      </div>
      <div
        class="float-title-right"
        @click="$emit('selfRefresh')"
      >
        <button class="el-icon-back" ></button>
        <button class="el-icon-right"></button>
      </div>
      
      <div class="null-warn">
        <div class="warn-left">
          <div class="warn-div">
            <span style="margin-left: 10px">{{data.ranking}}</span>
            <span style="margin-left: 25px">{{data.province}}</span>
            <span style="margin-left: 80px">{{data.Warn}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #FFA800;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">1</span>
            <span style="margin-left: 40px">{{data.value[0]}}</span>
            <div
              class="sapn-box"
              style="margin-left: 10px"
            >
              <el-progress type="line"
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :percentage="+data.nun[0]"
                :show-text="false"
                :stroke-width="10"
                color="#ec1c24"
              ></el-progress>
              
            </div>
            <span style="
                position: absolute;
                top: 55px;
                left: 260px;
                color: #FFA800;
                font-weight: 700;
              ">{{data.nun[0]}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #2EC478;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">2</span>
            <span style="margin-left: 40px"> {{data.value[1]}}</span>
            <div
              class="sapn-box1"
              style="margin-left: 10px"
            >
              <el-progress
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :show-text="false"
                :stroke-width="10"
                stroke-linecap="square"
                :percentage="+data.nun[1]"
                color="#FF0000"
              >
              </el-progress>
            </div>
            <span style="
                position: absolute;
                top: 105px;
                left: 260px;
                color: #2EC478;
                font-weight: 700;
              ">{{data.nun[1]}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #0066FF;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">3</span>
            <span style="margin-left: 40px">{{data.value[2]}}</span>
            <div
              class="sapn-box2"
              style="margin-left: 10px"
            >
              <el-progress
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :show-text="false"
                :stroke-width="10"
                stroke-linecap="square"
                :percentage="+data.nun[2]"
                color="#0066FF"
              >
              </el-progress>
            </div>
            <span style="
                position: absolute;
                top: 145px;
                left: 260px;
                color: #0066FF;
                font-weight: 700;
              ">{{data.nun[2]}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #989EB3;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">4</span>
            <span style="margin-left: 40px">{{data.value[3]}}</span>
            <div
              class="sapn-box4"
              style="margin-left: 10px"
            >
              <el-progress type="line"
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :percentage="data.nun[3]"
                :show-text="false"
                :stroke-width="10"
                color="#ec1c24"
              ></el-progress>
              
            </div>
            <span style="
                position: absolute;
                top: 185px;
                left: 260px;
                color: #989eb3;
                font-weight: 700;
              ">{{data.nun[3]}}</span>
          </div>
        </div>
        <div class="warn-right">
          <div class="warn-div">
            <span style="margin-left: 10px">{{data.ranking}}</span>
            <span style="margin-left: 25px">{{data.province}}</span>
            <span style="margin-left: 80px">{{data.Working}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #989EB3;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">5</span>
            <span style="margin-left: 40px">{{data.value[4]}}</span>
            <div
              class="sapn-box4"
              style="margin-left: 10px"
            >
              <el-progress
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :show-text="false"
                :stroke-width="10"
                stroke-linecap="square"
                :percentage="+data.nun[4]"
                color="#989EB3"
              >
              </el-progress>
            </div>
            <span style="
                position: absolute;
                top: 55px;
                left: 560px;
                color: #989EB3;
                font-weight: 700;
              ">{{data.nun[4]}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #989EB3;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">6</span>
            <span style="margin-left: 40px">{{data.value[5]}}</span>
            <div
              class="sapn-box4"
              style="margin-left: 10px"
            >
              <el-progress
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :show-text="false"
                :stroke-width="10"
                stroke-linecap="square"
                :percentage="+data.nun[5]"
                color="#989EB3"
              >
              </el-progress>
            </div>
            <span style="
                position: absolute;
                top: 105px;
                left: 560px;
                color: #989EB3;
                font-weight: 700;
              ">{{data.nun[5]}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #989EB3;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">7</span>
            <span style="margin-left: 40px">{{data.value[6]}}</span>
            <div
              class="sapn-box4"
              style="margin-left: 10px"
            >
              <el-progress
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :show-text="false"
                :stroke-width="10"
                stroke-linecap="square"
                :percentage="+data.nun[6]"
                color="#989EB3"
              >
              </el-progress>
            </div>
            <span style="
                position: absolute;
                top: 145px;
                left: 560px;
                color: #989EB3;
                font-weight: 700;
              ">{{data.nun[6]}}</span>
          </div>
          <div class="warn-div">
            <span style="
                margin-left: 10px;
                width: 17px;
                height: 17px;
                background-color: #989EB3;
                color:#fff;
                display: inline-block;
                text-align: center;
                line-height: 17px;
              ">8</span>
            <span style="margin-left: 40px">{{data.value[7]}}</span>
            <div
              class="sapn-box4"
              style="margin-left: 10px"
            >
              <el-progress
                class="warn-progress"
                style="
                  width: 100px;
                  height: 15px;
                  margin-left: 20px;
                  margin-top: 5px;
                  align-item: center;
                "
                :show-text="false"
                :stroke-width="10"
                stroke-linecap="square"
                :percentage="+data.nun[7]"
                color="#989EB3"
              >
              </el-progress>
            </div>
            <span style="
                position: absolute;
                top: 185px;
                left: 560px;
                color: #989EB3;
                font-weight: 700;
              ">{{data.nun[7]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import { ref } from "@vue/reactivity";
export default {
  name: "Warn",
  setup () {
    let title = ref("");
    let data = ref({
      ranking: '排名',
      province: "省份",
      Warn: "工单数",
      Working: "工单数",
      value: ["北京", "上海", "广东", "浙江", "江苏", "四川", "江苏", "四川"],
      nun: ["97.17", "94.92", "92.20", "88.20", "97.17", "94.92", "92.20", "88.20"]
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
  background-image: linear-gradient(to right, #64450e, #f9a401);

}
.sapn-box .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.sapn-box1 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #154f39, #2fce7c);
}
.sapn-box1 .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.sapn-box2 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #062a65, #016aff);
}
.sapn-box2 .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.sapn-box3 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #2b5a6a, #67e4fb);
}
.sapn-box3 .el-progress-bar__outer {
  background-color: #060c18;
  border-radius: 0px;
}
.sapn-box4 .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #989eb3, #989eb3);
}
.sapn-box4 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
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
  line-height: 24px;
}
.float-title-right {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  font-size: 14px;
  
  
}
button{
  background-color:#fff;
  border: 1px solid #f0f3f6;
  margin-right:3px;

}
.null-warn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 40px;
}
.warn-left {
  width: 48%;
  /* padding: 40px 0; */
}
.warn-right {
  width: 48%;
}
.warn-div {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #fafbfc;
  margin-top: 10px;
  /* display: flex; */
}
.warn-progress {
  position: relative;
  top: -30px;
  left: 105px;
  background-color: #f3f6f9;
}
#warn-progress-bar {
  width: 150px;
  background-image: linear-gradient(to right, #5c410c, #e99b01);
  height: 15px;
}
</style>