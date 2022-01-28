<template>
  <div style="width: 100%; height:100%;position:relative;">
    <div class="float-title">
      <i class="el-icon-caret-right"></i>
      {{ title }}
    </div>
    <div class="float-title-right" @click="$emit('selfRefresh')">
      <i class="el-icon-refresh"></i>
    </div>
    <!-- 内容 -->
    <div class="center-center">
      <ul class="title-top">
        <li style="width: 15%; text-align: left">省份</li>
        <li style="width: 30%; text-align: left">项目名称</li>
        <li style="width: 30%; text-align: left">业务名称</li>
        <li style="width: 25%; text-align: center">拨测日期</li>
      </ul>
      <ul class="content-center">
        <li style="width: 15%; text-align: left">{{ data.province }}</li>
        <li style="width: 30%; text-align: left">{{ data.projectName }}</li>
        <li style="width: 30%; text-align: left">{{ data.businessName }}</li>
        <li style="width: 25%; text-align: center">{{ data.date }}</li>
      </ul>
      <ul class="content-box">
        <li>
          <span>时延</span>
          <span>{{ data.delay }}ms</span>
        </li>
        <li style="margin-left: 2%">
          <span>抖动</span>
          <span>{{ data.shake }}ms</span>
        </li>
        <li style="margin-left: 2%">
          <span>上行速率均值</span>
          <span>{{ data.upload }}mbps</span>
        </li>
        <li style="margin-left: 2%">
          <span>下行速率均值</span>
          <span>{{ data.download }}mbps</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref} from '@vue/runtime-core'

export default {
  name: "PullOutTest",
  setup() {
    let title = ref("业务质量-拨测业务指标")
    let data = ref({
      province: '上海',
      projectName: '上海港ABS项目',
      businessName: '上海港港口龙头吊',
      date: '2021-06-12',
      delay: 31,
      shake: 5,
      upload: 675.2,
      download: 65.42
    })

    const setValue = val => {
      data.value = val
    }

    return {
      title,
      data,
      setValue
    }
  }
}
</script>

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
  color: #FFFFFF;
  line-height: 24px;
  text-shadow: 0px 0px 6px #26A7FF;
}

.float-title-right {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #B1D8FF;
  border-radius: 50%;
  border: 1px solid #B1D8FF;
}
/* 中部内容 */
.center-center {
  position: absolute;
  top: 46px;
  left: 10px;
  right: 10px;
}
/*列表-表头*/
.center-center .title-top {
  display: -webkit-flex;
  width: 100%;
  height: 100%;
  line-height: 32px;
  font-size: 9px;
  color: #A5C7E5;
  background-color: #07111D;
}
.center-center .title-top li {
  position: relative;
  float: left;
  padding-left: 16px;

}
.center-center .title-top li::before {
  position: absolute;
  top: 25%;
  bottom: 25%;
  right: 0;
  width: .5px;
  height: 50%;
  border-left: 1px solid #a6e4e4;
  box-shadow: 0px 0px 7px #26a7ff;
  content: '';

}
.center-center .title-top li:last-child::before {
  display: none;
}
/*列表-内容*/
.center-center .content-center {
  margin-top: 5px;
  display: -webkit-flex;
  width: 100%;
  height: 100%;
  line-height: 34px;
  font-size: 14px;
  color: #ffffff;
  text-shadow: 0px 0px 6px #26A7FF;
  background-color: #07111D;
}
.center-center .content-center li {
  float: left;
  padding-left: 16px;
}
/*内容 box*/
.content-box {
  display: -webkit-flex;
  margin-top: 14px;
}
.content-box li {
  float: left;
  display: flex;
  flex-direction: column;
  background-color: #0c1627;
  line-height: 31px;
  text-align: center;
  width: 23.5%;
  height: 64px;
}
.content-box li span:first-child{
  text-align: center;
  font-size: 14px;
  color: #FFFFFF;
  text-shadow: 0px 0px 6px #26A7FF;
}
.content-box li span:last-child{
  text-align: center;
  font-size: 19px;
  color: #4EE3F2;
  line-height: 22px;
  text-shadow: 0px 0px 6px #26A7FF;
}
</style>
