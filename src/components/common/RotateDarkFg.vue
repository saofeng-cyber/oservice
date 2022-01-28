<template>
  <div class="industry">
    <!--左侧三部分-->
    <div class="industry-all">
      <div
        class="industry-list"
        :class="'industry-list-' + index"
        v-for="(item,index) in data"
        :key="index"
      >
        <span style="padding-bottom:6px;">
          {{ item.name }}
        </span>
        <span>
          {{ item.num }}
        </span>
        <!--<div>
          <span style="text-shadow: none; color: #6D86A2;">占比</span>
          <span style="color: #000000;">{{ item.effect }}</span>
        </div>-->
      </div>
    </div>
    <!--图像转动-->
    <div class="industry-circle"></div>
    <P class="industry-circle-word">{{ title }}</P>
    <!--导向线-->
    <div class="industry-line">
      <div class="industry-line-list industry-line-one">
        <span></span>
      </div>
      <!-- <div class="industry-line-list industry-line-two">
        <span></span>
      </div> -->
      <div class="industry-line-list industry-line-three">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-fore">
        <span></span>
      </div>
      <!-- <div class="industry-line-list industry-line-five">
        <span></span>
      </div> -->
      <div class="industry-line-list industry-line-six">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  name: "RotateFg",
  setup () {
    let title = ref('云专线统计')
    let data = ref([
      { name: 'PTN', num: 1354, effect: 5, line: 15 },
      { name: 'OTN', num: 1354, effect: 5, line: 15 },
      { name: 'PON', num: 1354, effect: 5, line: 15 },
      { name: '5G', num: 1354, effect: 5, line: 15 },
    ]);
    /** 设置标题 */
    const setTitle = val => {
      title.value = val
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
    };
    return {
      title,
      setTitle,
      setValue,
      data
    }
  }
}
</script>

<style scoped>
.industry {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.industry-circle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 140px;
  height: 140px;
  background: url("~@/assets/common/circle.png") no-repeat center;
  background-size: cover;
  animation: mymove 3s linear infinite;
  z-index: 10;
}
@keyframes mymove {
  0% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.industry-circle-word {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60px;
  height: 30px;
  font-size: 14px;
  text-align: center;
}
.industry-list {
  width: 145px;
  background: rgba(0,0,0,0.32);
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #66e2fb;
}
.industry-list span:first-child {
  color: #fff;
  font-size: 16px;
  text-align: center;
  width: 100%;
}
.industry-list span:last-child {
  color: #5eeb00;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}
.industry-list-0 {
  position: absolute;
  left: 10px;
  top: 5px;
}
.industry-list-1 {
  position: absolute;
  right: 10px;
  top: 5px;
}
.industry-list-2 {
  position: absolute;
  left: 10px;
  bottom: 5px;
}
.industry-list-3 {
  position: absolute;
  right: 10px;
  bottom: 5px;
}
.industry-list-1 .text,
.industry-list-3 .text {
  text-align: right;
}
.industry-list span:last-child {
  float: right;
  margin-right: 0px;
  font-size: 19px;
  line-height: 22px;
}
.industry-list .progress-bar-line {
  display: block !important;
  margin-top: 4px;
}
.industry-list > div {
  justify-content: space-between;
  line-height: 22px;
}
.industry-all {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
}
.industry-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  width: calc(100% - 300px);
  height: 100%;
}
.industry-line-list {
  height: 4px;
  background: #fafbfc;
  position: absolute;
}
.industry-line-one {
  top: calc(30%);
  left: 0;
  width: calc(45% - 70px);
  transform: rotateZ(25deg);
}
.industry-line-two {
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 110px;
}
.industry-line-three {
  bottom: calc(30%);
  left: 0;
  width: calc(45% - 70px);
  transform: rotateZ(-25deg);
}
.industry-line-fore {
  top: calc(30%);
  right: 0;
  width: 130px;
  transform: rotateZ(155deg);
}
.industry-line-five {
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: calc(45% - 70px);
  transform: rotateZ(180deg);
}
.industry-line-six {
  bottom: calc(30%);
  right: 0;
  width: calc(45% - 70px);
  transform: rotateZ(-155deg);
}
.industry-line-list span {
  position: absolute;
  right: 0;
  top: 0;
  width: 14px;
  height: 4px;
  background: url("../../assets/common/bg-color.png") no-repeat center;
  background-size: cover;
}
.industry-line-one span,
.industry-line-three span,
.industry-line-fore span,
.industry-line-six span {
  animation: myline 3s linear infinite;
}
.industry-line-two span,
.industry-line-five span {
  animation: mylines 3s linear infinite;
}
.progress-bar-line .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #0066ff, #0066ff) !important;
}
@keyframes myline {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-120px);
  }
}
@keyframes mylines {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-100px);
  }
}
</style>
