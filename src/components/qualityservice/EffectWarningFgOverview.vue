<template>
  <div
    style="
      width: 100%;
      height: 100%;
      position: relative;
      padding: 10px;
      box-sizing: border-box;
    "
  >
    <!-- 内容 -->
    <div class="listq">
      <div>
        <el-row :gutter="20">
          <el-col :span="15">
            <div style="font-weight: bold">{{ RankingData[0].name }}</div>
          </el-col>
          <el-col :span="9">
            <div style="color: #2ec478; font-size: 24px">
              {{ RankingData[0].values }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <span style="text-shadow: none; color: #4b5575">及时率</span>
        <span style="color: #ffa800; float: right"
          >{{ RankingData[0].rate }}%</span
        >
      </div>
      <div class="progress-bar-line kancha" style="margin-left: -15%">
        <el-progress
          :show-text="false"
          :percentage="RankingData[0].rate"
        ></el-progress>
      </div>
    </div>
    <div class="listq">
      <div>
        <el-row :gutter="20">
          <el-col :span="15">
            <div style="font-weight: bold">{{ RankingData[1].name }}</div>
          </el-col>
          <el-col :span="9">
            <div style="color: #2ec478; font-size: 24px">
              {{ RankingData[1].values }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <span style="text-shadow: none; color: #4b5575">及时率</span>
        <span style="color: #ffa800; float: right"
          >{{ RankingData[1].rate }}%</span
        >
      </div>
      <div class="progress-bar-line kaitong" style="margin-left: -15%">
        <el-progress
          :show-text="false"
          :percentage="RankingData[1].rate"
        ></el-progress>
      </div>
    </div>
    <div class="listq">
      <div>
        <el-row :gutter="20">
          <el-col :span="15">
            <div style="font-weight: bold">{{ RankingData[2].name }}</div>
          </el-col>
          <el-col :span="9">
            <div style="color: #2ec478; font-size: 24px">
              {{ RankingData[2].values }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <span style="text-shadow: none; color: #4b5575">及时率</span>
        <span style="color: #f81d22; float: right"
          >{{ RankingData[2].rate }}%</span
        >
      </div>
      <div class="progress-bar-line tousu" style="margin-left: -15%">
        <el-progress
          :show-text="false"
          :percentage="RankingData[2].rate"
        ></el-progress>
      </div>
    </div>
    <div class="listq">
      <div>
        <el-row :gutter="20">
          <el-col :span="15">
            <div style="font-weight: bold">{{ RankingData[3].name }}</div>
          </el-col>
          <el-col :span="9">
            <div style="color: #2ec478; font-size: 24px">
              {{ RankingData[3].values }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <span style="text-shadow: none; color: #4b5575">及时率</span>
        <span style="color: #ffa800; float: right"
          >{{ RankingData[3].rate }}%</span
        >
      </div>
      <div class="progress-bar-line guzhang" style="margin-left: -15%">
        <el-progress
          :show-text="false"
          :percentage="RankingData[3].rate"
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";

export default {
  name: "EffectWarningFgOverView",
  props: {
    RankingData: [],
  },
  setup() {
    let title = ref("服务质量概况");
    let data = ref([
      {
        name: "无线网",
        num: 703,
        effect: 5,
        line: 40,
      },
      {
        name: "传输网",
        num: 593,
        effect: 5,
        line: 20,
      },
      {
        name: "核心网",
        num: 614,
        effect: 5,
        line: 70,
      },
      {
        name: "影响客户数",
        num: 660,
        effect: null,
        line: null,
      },
    ]);

    /** 设置标题 */
    const setTitle = (val) => {
      title.value = val;
    };
    /** 设置data */
    const setValue = (val) => {
      data.value = val;
    };

    return {
      title,
      setTitle,
      setValue,
      data,
    };
  },
};
</script>

<style>
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}

.content-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0px;
  background-image: linear-gradient(to right, #0066ff, #0066ff) !important;
}

.content-box .el-progress-bar__inner::before {
  position: absolute;
  top: 0px;
  right: 0px;
  border: 0px solid #ffffff !important;
  width: 0px !important;
  height: 10px;
  content: "";
}

.content-box .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
}
.kancha .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #ffc554, #ffa800) !important;
}
.kaitong .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #40e792, #2ec478) !important;
}
.tousu .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #ff4c50, #f81d22) !important;
}
.guzhang .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #ffc554, #ffa800) !important;
}
</style>
<style scoped>
li {
  list-style: none;
}

.listq {
  width: 48%;
  height: 48%;
  display: inline-block;
  margin: 1%;
  padding: 2%;
  background-color: #000000;
  box-sizing: border-box;
}

.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
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

/* 中部内容 */
.center-center {
  position: absolute;
  top: 46px;
  left: 10px;
  right: 10px;
}

/*内容 box*/
.content-box {
  display: -webkit-flex;
  margin-top: -7px;
}

.content-box li {
  float: left;
  display: flex;
  flex-direction: column;
  background-color: #fafbfc;
  width: 23.5%;
  height: 80px;
  padding: 3px 14px;
  line-height: 30px;
}

.content-box li span:first-child {
  text-align: center;
  font-size: 14px;
}

.content-box li span:last-child {
  float: right;
  margin-right: 0px;
  font-size: 19px;
  line-height: 22px;
}

.content-box li .progress-bar-line {
  margin-top: 4px;
}
</style>
