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
        @click="selfRefresh"
      >
        <i class="el-icon-refresh"></i>
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
            <span style="width: 60px;
                display:inline-block;
                text-align:center;
                color: #989EB3;
                font-size: 14px;
                font-weight: bold;
                height: 40px;
                line-height: 35px;">{{data.terminalType}}</span>
            <span class="warn-span">{{data.terminalNum}}</span>
            <span class="warn-span">{{data.factory}}</span>
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
            <span style="width: 70px;margin-left:35px;
                text-align:center;
                font-size:14px;">{{data.tetvalue[0]}}</span>
            <span class="warn-data" style="color:#FFA800;">{{data.tenvalue[0]}}</span>
            <span class="warn-data">{{data.favalue[0]}}</span>
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
            <span style="width: 70px;margin-left:35px;
                text-align:center;
                font-size:14px;">{{data.tetvalue[1]}}</span>
            <span class="warn-data" style="color:#2EC478;">{{data.tenvalue[1]}}</span>
            <span class="warn-data">{{data.favalue[1]}}</span>
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
            <span style="width: 70px;margin-left:35px;
                text-align:center;
                font-size:14px;">{{data.tetvalue[2]}}</span>
            <span class="warn-data" style="color:#0066FF;">{{data.tenvalue[2]}}</span>
            <span class="warn-data">{{data.favalue[2]}}</span>
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
            <span style="width: 70px;margin-left:35px;
                text-align:center;
                font-size:14px;">{{data.tetvalue[3]}}</span>
            <span class="warn-data" style="color:#989EB3;">{{data.tenvalue[3]}}</span>
            <span class="warn-data">{{data.favalue[3]}}</span>
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
          terminalType: "终端型号",
          terminalNum: "终端数量",
          factory: "厂家",
          tetvalue: ["S21", "S22", "M21", "A21"],
          tenvalue: ["241", "24", "21", "4"],
          favalue: ["海康威视", "大华", "大华", "海康威视"],
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
  width: 40%;
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
  width: 35%;
  height: 40px;
  line-height: 35px;
  background-color: #fafbfc;
  margin:0 auto;
  text-align:center;
  font-size: 14px;
  margin-left:38px;

 
}

</style>