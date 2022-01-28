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
      <!--<ul class="title-top">
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
      </ul>-->
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
import { ref } from '@vue/runtime-core'

export default {
  name: "PullOutTest",
  setup () {
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
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}
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
/*列表-表头*/
.center-center .title-top {
  display: -webkit-flex;
  width: 100%;
  height: 100%;
  line-height: 32px;
  font-size: 9px;
  background-color: #fafbfc;
  border-bottom: 1px solid #ebeef5;
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
  width: 0.5px;
  height: 50%;
  border-left: 1px solid #ebeef5;
  content: "";
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
  border-bottom: 1px solid #ebeef5;
}
.center-center .content-center li {
  float: left;
  padding-left: 16px;
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
  line-height: 50px;
  text-align: center;
  width: 24.5%;
  height: 100%;
}
.content-box li span:first-child {
  text-align: center;
  font-size: 14px;
}
.content-box li span:last-child {
  text-align: center;
  font-size: 19px;
  color: #0066ff;
  line-height: 22px;
  font-weight: 500;
}
</style>
