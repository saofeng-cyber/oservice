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
        @click="$emit('selfRefresh')"
      >
        <button class="el-icon-back" ></button>
        <button class="el-icon-right"></button>
      </div>
      
      <div class="null-warn">
        <div class="warn-main">
          <div class="warn-div">
            <span style="width: 60px;
                display:inline-block;
                text-align:center;
                color: #989EB3;
                font-size: 14px;
                font-weight: bold;
                margin:0 auto;
                height: 40px;
                line-height: 35px;">{{data.ranking}}</span>
            <span style="width: 30px;
                display:inline-block;
                text-align:center;
                color: #989EB3;
                font-size: 14px;
                font-weight: bold;
                height: 40px;
                line-height: 35px;">{{data.province}}</span>
            <span class="warn-span">{{data.meeting}}</span>
            <span class="warn-span">{{data.alarmsNumber}}</span>
            <span class="warn-span">{{data.uplinkRate}}</span>
            <span class="warn-span">{{data.linkdownRate}}</span>
            <span class="warn-span">{{data.jitter}}</span>
            <span class="warn-span">{{data.averagepacketlossRate}}</span>
            <span class="warn-span">{{data.maximumpacketlossRate}}</span>
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
                margin-left:20px;
              ">1</span>
            <span style="width: 27px;margin-left:22px;
                text-align:center;
                font-size:14px;">{{data.provalue[0]}}</span>
            <span class="warn-data">{{data.mevalue[0]}}</span>
            <span class="warn-al">{{data.alvalue[0]}}</span>
            <span class="warn-data">{{data.upvalue[0]}}</span>
            <span class="warn-data">{{data.downvalue[0]}}</span>
            <span class="warn-data">{{data.jivalue[0]}}</span>
            <span class="warn-data">{{data.avvalue[0]}}</span>
            <span class="warn-max">{{data.mavalue[0]}}</span>
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
                margin-left:20px;
              ">2</span>
            <span style="width: 27px;margin-left:22px;
                text-align:center;
                font-size:14px;">{{data.provalue[1]}}</span>
            <span class="warn-data">{{data.mevalue[1]}}</span>
            <span class="warn-al">{{data.alvalue[1]}}</span>
            <span class="warn-data">{{data.upvalue[1]}}</span>
            <span class="warn-data">{{data.downvalue[1]}}</span>
            <span class="warn-data">{{data.jivalue[1]}}</span>
            <span class="warn-data">{{data.avvalue[1]}}</span>
            <span class="warn-max">{{data.mavalue[1]}}</span>
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
                margin-left:20px;
              ">3</span>
            <span style="width: 27px;margin-left:22px;
                text-align:center;
                font-size:14px;">{{data.provalue[2]}}</span>
            <span class="warn-data">{{data.mevalue[2]}}</span>
            <span class="warn-al">{{data.alvalue[2]}}</span>
            <span class="warn-data">{{data.upvalue[2]}}</span>
            <span class="warn-data">{{data.downvalue[2]}}</span>
            <span class="warn-data">{{data.jivalue[2]}}</span>
            <span class="warn-data">{{data.avvalue[2]}}</span>
            <span class="warn-max">{{data.mavalue[2]}}</span>
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
                margin-left:20px;
              ">4</span>
            <span style="width: 27px;margin-left:22px;
                text-align:center;
                font-size:14px;">{{data.provalue[3]}}</span>
            <span class="warn-data">{{data.mevalue[3]}}</span>
            <span class="warn-al">{{data.alvalue[3]}}</span>
            <span class="warn-data">{{data.upvalue[3]}}</span>
            <span class="warn-data">{{data.downvalue[3]}}</span>
            <span class="warn-data">{{data.jivalue[3]}}</span>
            <span class="warn-data">{{data.avvalue[3]}}</span>
            <span class="warn-max">{{data.mavalue[3]}}</span>
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
      meeting: "在线会议",
      alarmsNumber: "近一周告警数",
      uplinkRate:"链路上行速率",
      linkdownRate:"链路下行速率",
      jitter:"抖动",
      averagepacketlossRate:"平均丢包率",
      maximumpacketlossRate:"最大丢包率",
      provalue: ["北京", "上海", "广东", "浙江"],
      mevalue: ["7281", "7281", "7281", "7281"],
      alvalue: ["21", "21", "21", "21"],
      upvalue: ["3.0M/s", "3.0M/s", "3.0M/s", "3.0M/s"],
      downvalue: ["1.6M/s", "1.6M/s", "1.6M/s", "1.6M/s"],
      jivalue: ["50MS", "50MS", "50MS", "50MS"],
      avvalue: ["0.6%", "0.6%", "0.6%", "0.6%"],
      mavalue: ["3.1%", "3.1%", "3.1%", "3.1%"]
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
.warn-main {
  width: 100%;
  /* padding: 40px 0; */
}
.warn-div {
  width: 100%;
  background-color: #fafbfc;
  margin:8px 0;
}
.warn-span {
  display:inline-block;
  width: 13%;
  height: 40px;
  line-height: 35px;
  
  margin:0 auto;
  text-align:center;
  color: #989EB3;
  font-size: 14px;
  font-weight: bold;

}
.warn-data {
  display:inline-block;
  width: 13%;
  height: 40px;
  line-height: 35px;
  background-color: #fafbfc;
  margin:0 auto;
  text-align:center;
  color: #0A6DF2;
  font-size: 14px;
  font-weight: bold;
 
}
.warn-al {
  display:inline-block;
  width: 13%;
  height: 40px;
  line-height: 35px;
  background-color: #fafbfc;
  margin:0 auto;
  text-align:center;
  color: red;
  font-size: 14px;
  font-weight: bold;

}
.warn-max {
  display:inline-block;
  width: 13%;
  height: 40px;
  line-height: 35px;
  background-color: #fafbfc;
  margin:0 auto;
  text-align:center;
  color: #FCB936;
  font-size: 14px;
  font-weight: bold;

}
</style>