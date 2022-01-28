<template>
  <div class="card-item" :class="{angle: !isActive}" :style="{background: isActive ? data.backgroundColor : ''}" @click="handleClick">
    <el-row :span="24">
      <el-col :span="6" class="col-box">
        <div style="position: relative">
          <div class="cart-div">
            <span style="color: #FFFFFF">{{ data[0].name }}</span>
            <span  style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[0].num }}</span>
          </div>
          <div class="cart-div">
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span  style="color: #a7bfde;">{{ data[0].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress :show-text=false :percentage="data[0].line"></el-progress>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="col-box">
        <div style="position: relative">
          <div class="cart-div">
            <span style="color: #FFFFFF">{{ data[1].name }}</span>
            <span  style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[1].num }}</span>
          </div>
          <div class="cart-div">
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span  style="color: #a7bfde;">{{ data[1].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress :show-text=false :percentage="data[1].line"></el-progress>
          </div>
        </div>
     </el-col >
      <el-col :span="6" class="col-box">
        <div style="position: relative">
          <div class="cart-div">
            <span style="color: #FFFFFF">{{ data[2].name }}</span>
            <span  style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[2].num }}</span>
          </div>
          <div class="cart-div">
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span  style="color: #a7bfde;">{{ data[2].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress :show-text=false :percentage="data[2].line"></el-progress>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="col-box">
        <div style="position: relative">
          <div class="cart-div">
            <span style="color: #FFFFFF">{{ data[3].name }}</span>
            <span  style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[3].num }}</span>
          </div>
          <div class="cart-div">
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span  style="color: #a7bfde;">{{ data[3].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress :show-text=false :percentage="data[3].line"></el-progress>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="col-box">
        <div style="position: relative">
          <div class="cart-div">
            <span style="color: #FFFFFF">{{ data[4].name }}</span>
            <span  style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[4].num }}</span>
          </div>
          <div class="cart-div">
            <span style="text-shadow: none; color: #6D86A2;">影响客户数</span>
            <span  style="color: #a7bfde;">{{ data[4].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress :show-text=false :percentage="data[4].line"></el-progress>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ref} from '@vue/runtime-core'
export default {
  name: "MapHeard",
  setup(){
    let data = ref([
      {name: '全部', num: 666, effect: 34, line: 40},
      {name: '勘察', num: 441, effect: 10, line: 20},
      {name: '开通', num: 563, effect: 8, line: 20},
      {name: '故障', num: 867, effect: 11, line: 30},
      {name: '投诉', num: 563, effect: 5, line: 20},
    ])
    const setValue = val => {
      data.value = val
    }
    return{data,setValue}
  },
    methods: {
      handleClick () {
        this.$emit('handleCardChange', this.data)
      }
    },
}
</script>

<style scoped>
.card-item {
  position: relative;
  /*display: flex;*/
  align-items: center;
  background: rgba(0, 0, 0, 0.16);
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.angle::after {
  content: '';
  width: 15px;
  position: absolute;
  height: 30px;
  right: -10px;
  bottom: -8px;
  background: #66E2FB;
  border-top: 10px;
  border-bottom: 10px;
  transform: rotate(45deg);
}
li{
  list-style: none;
}
.cart-div{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0 4px 0;
}
.col-box>div::before {
    position: absolute;
    top: 10px;
    right: 0px;
    border: 1px solid #477bbf;
    width: 0px;
    height: 55px;
    content: '';
}
.col-box:last-child div::before {
  display: none;
}
</style>
<style scoped>
.map-top div .el-col-6 {
  max-width: 20%;
}
</style>
<style>
.map-top[data-v-91810dbe] {
  margin: -10px 16px -17px 16px;
}
.progress-bar-line {
  padding-bottom: 8px;
  padding-top: 3px;
  padding-left: 5px;
}
.progress-bar-line .el-progress-bar__outer {
  width: 75%;
  border-radius: 0px;
  background-color: #060C18;
  margin-left: 20px;
}
.progress-bar-line .el-progress-bar__inner{
  border-radius: 0px;
  background-image: linear-gradient(to right, rgb(77, 95, 116) , #CCF8FF);
}
</style>