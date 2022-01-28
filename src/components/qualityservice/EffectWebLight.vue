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
        </li>
        <li style="margin-left: 2%">
          <div>
            <span>{{ data[1].name }}</span>
            <span style="margin-top: 4px; color: #3BDB8C; font-size: 24px">{{ data[1].num }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/runtime-core'

export default {
  name: "EffectWeb",
  setup () {
    let title = ref('网络质量-影响业务告警')
    let data = ref([
      { name: '故障网关数', num: 256 },
      { name: 'WIFI弱覆盖数', num: 89 }
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
  background-image: linear-gradient(to right, rgb(77, 95, 116), #ccf8ff);
}
.content-box .el-progress-bar__inner::before {
  position: absolute;
  top: 0px;
  right: 0px;
  border: 1px solid #ffffff;
  width: 3px;
  height: 10px;
  content: "";
}
.content-box .el-progress-bar__outer {
  background-color: #060c18;
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
  top: 46px;
  left: 10px;
  right: 10px;
}
/*内容 box*/
.content-box {
  display: -webkit-flex;
  margin-top: -7px;
  padding: 0;
}
.content-box li {
  float: left;
  display: flex;
  flex-direction: column;
  background-color: #fafbfc;
  width: 50%;
  height: 80px;
  padding: 3px 14px;
  line-height: 30px;
}
.content-box li > div {
  padding-top: 25px;
}
.content-box li span:first-child {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.content-box li span:last-child {
  float: right;
  margin-right: 0px;
  font-size: 19px;
  line-height: 22px;
  color: #ffffff;
}
.content-box li .progress-bar-line {
  margin-top: 4px;
}
</style>