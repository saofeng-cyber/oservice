<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <div class="float-title" v-if="title">
        <i class="el-icon-caret-right"></i>
        {{ title }}
      </div>
      <div class="float-title-right" v-if="data.iconShow" @click="$emit('selfRefresh')">
        <i class="el-icon-refresh"></i>
      </div>
      <div class="warn-left">
        <div class="warn-div" :class="{isActive : data.iconShow == false}">
          <span style="margin-left: 15px">{{data.ranking}}</span>
          <span style="margin-left: 30px">{{data.province}}</span>
          <span style="margin-left: 145px">{{data.warn}}</span>
        </div>
        <div class="warn-div" style="margin-top:6px" :class="{isActive : data.iconShow == false}">
          <span style="margin-left: 15px;width: 17px;
              height: 17px;
              background-color: #684A0A;
              display: inline-block;
              text-align: center;
              line-height: 17px;">1</span>
          <span style="margin-left: 50px">{{data.provinces}}</span>
          <span class="sapn-box" style="margin-left: 10px">
            <el-progress class="warn-progress" style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;" :show-text="false" :stroke-width='10' stroke-linecap='square'
              :percentage="+data.one" color="#A26E06">
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span
            style="position: absolute; left: 375px; top:1px; color: #ffcc58;font-weight:700">{{data.numberone}}</span>
        </div>
        <div class="warn-div" style="margin-top:6px" :class="{isActive : data.iconShow == false}">
          <span style=" margin-left: 15px;
              width: 17px;
              height: 17px;
              background-color: #17573F;
              display: inline-block;
              text-align: center;
              line-height: 17px;">2</span>
          <span style="margin-left: 45px"> {{data.prov}}</span>
          <span class="sapn-box1" style="margin-left: 10px">
            <el-progress class="warn-progress" style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;" :show-text="false" :stroke-width='10' stroke-linecap='square'
              :percentage="+data.two" color="#1F7A4F">
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span
            style="position: absolute; left: 375px; top:1px; color: #3DEE97;font-weight:700">{{data.numbertwo}}</span>
        </div>
        <div class="warn-div" style="margin-top:6px" :class="{isActive : data.iconShow == false}">
          <span style="margin-left: 15px;
              width: 17px;
              height: 17px;
              background-color: #093070;
              display: inline-block;
              text-align: center;
              line-height: 17px;">3</span>
          <span style="margin-left: 45px">{{data.pros}}</span>
          <span class="sapn-box2" style="margin-left: 10px">
            <el-progress class="warn-progress" style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;" :show-text="false" :stroke-width='10' stroke-linecap='square'
              :percentage="+data.three" color="#27A8F6">
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span
            style="position: absolute; left: 375px; top:1px; color: #27A8F6;font-weight:700">{{data.numberthree}}</span>
        </div>
        <div class="warn-div" style="margin-top:6px" :class="{isActive : data.iconShow == false}">
          <span style="margin-left: 15px;
              width: 17px;
              height: 17px;
              background-color: #2F6273;
              display: inline-block;
              text-align: center;
              line-height: 17px;">4</span>
          <span style="margin-left: 45px">{{data.provins}}</span>
          <span class="sapn-box3" style="margin-left: 10px">
            <el-progress class="warn-progress" style="
                  width: 160px;
                  height: 15px;
                  margin-left: 50px;
                  margin-top: 5px;
                  align-item: center;" :show-text="false" :stroke-width='10' stroke-linecap='square'
              :percentage="+data.four" color="#3E899C">
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span
            style="position: absolute; left: 375px; top:1px; color: #9AF6FF;font-weight:700">{{data.numberfour}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref
  } from "@vue/runtime-core"
  export default {
    setup() {
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
      return {
        title,
        setTitle,
        data,
        setRanking
      }
    }
  };
</script>

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
    left: 105px;
    background-color: #080c15;
  }
</style>
<style>
  .sapn-box .el-progress-bar__inner {
    position: relative;
    border-radius: 0;
    background-image: linear-gradient(to right, #64450E, #F9A401);
  }

  .sapn-box .el-progress-bar__outer {
    background-color: #060C18;
    border-radius: 0px;
  }

  .sapn-box1 .el-progress-bar__inner {
    position: relative;
    border-radius: 0;
    background-image: linear-gradient(to right, #154F39, #2FCE7C);
  }

  .sapn-box1 .el-progress-bar__outer {
    background-color: #060C18;
    border-radius: 0px;
  }

  .sapn-box2 .el-progress-bar__inner {
    position: relative;
    border-radius: 0;
    background-image: linear-gradient(to right, #062A65, #016AFF);
  }

  .sapn-box2 .el-progress-bar__outer {
    background-color: #060C18;
    border-radius: 0px;
  }

  .sapn-box3 .el-progress-bar__inner {
    position: relative;
    border-radius: 0;
    background-image: linear-gradient(to right, #2B5A6A, #67E4FB);
  }

  .sapn-box3 .el-progress-bar__outer {
    background-color: #060C18;
    border-radius: 0px;
  }

  .isActive {
    top: 0 !important;
  }
</style>
