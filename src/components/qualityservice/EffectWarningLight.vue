<template>
  <div style="width: 100%; height:100%;position:relative;">
    <div class="float-title">
      <span class="i"></span>
      {{ title }}
    </div>
    <div
      class="float-title-right"
      @click="$emit('selfRefresh')"
    >
      <i class="el-icon-refresh"></i>
    </div>
    <!-- 内容 -->
    <div class="center-center">
      <ul class="content-box">
        <li>
          <div>
            <span>{{ data[0].name }}</span>
            <span style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[0].num }}</span>
          </div>
          <div>
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span style="color: #a7bfde;">{{ data[0].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[0].line"
            ></el-progress>
          </div>
        </li>
        <li style="margin-left: 2%">
          <div>
            <span>{{ data[1].name }}</span>
            <span style="margin-top: 4px; color: #3BDB8C; font-size: 24px">{{ data[1].num }}</span>
          </div>
          <div>
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span style="color: #a7bfde;">{{ data[1].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[1].line"
            ></el-progress>
          </div>
        </li>
        <li style="margin-left: 2%">
          <div>
            <span>{{ data[2].name }}</span>
            <span style="margin-top: 4px; color: #FFE759; font-size: 24px">{{ data[2].num }}</span>
          </div>
          <div>
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span style="color: #a7bfde;">{{ data[2].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[2].line"
            ></el-progress>
          </div>
        </li>
        <li
          v-if="data[3].effect && data[3].line"
          style="margin-left: 2%"
        >
          <div>
            <span>{{ data[2].name }}</span>
            <span style="margin-top: 4px; color: #10c4b5; font-size: 24px">{{ data[2].num }}</span>
          </div>
          <div>
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span style="color: #a7bfde;">{{ data[2].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[2].line"
            ></el-progress>
          </div>
        </li>
        <li
          v-else
          style="margin-left: 2%; line-height: 36px;"
        >
          <span>{{ data[3].name }}</span>
          <span style="line-height: 32px; text-align: center;font-size: 24px; color: #FF5152">{{ data[3].num }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/runtime-core'

export default {
  name: "EffectWarning",
  setup () {
    let title = ref('网络质量-影响业务告警')
    let data = ref([
      { name: '无线网', num: 1354, effect: 5, line: 40 },
      { name: '传输网', num: 89, effect: 5, line: 20 },
      { name: '核心网', num: 329, effect: 5, line: 70 },
      { name: '影响客户数', num: 103, effect: null, line: null },
    ])

    /** 设置标题 */
    const setTitle = val => {
      title.value = val
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
    }

    return {
      title,
      setTitle,
      setValue,
      data
    }
  }
}
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
</style>
<style scoped>
li {
  list-style: none;
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
  top: 30px;
  left: 10px;
  right: 10px;
  bottom: 0px;
}
/*内容 box*/
.content-box {
  display: -webkit-flex;
  height: calc(100% - 30px);
  padding: 10px;
  margin: 0;
}
.content-box li {
  float: left;
  display: flex;
  flex-direction: column;
  background-color: #fafbfc;
  width: 23.5%;
  height: 100%;
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
.content-box li .progress-bar-line {
  margin: 5px -15%;
}
</style>