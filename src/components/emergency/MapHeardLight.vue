<template>
  <div
    class="card-item"
    :class="{'': !isActive}"
    :style="{background: isActive ? data.backgroundColor : ''}"
  >
    <el-row :span="24">
      <el-col
        :span="6"
        class="col-box"
        @click="handleClick(0)"
      >
        <div
          class="card"
          :style="{'border-color': activeIndex==0?'#71acff':'#ebeef5'}"
        >
          <div class="cart-div">
            <span>{{ data[0].name }}</span>
            <span style="margin-top: 4px; color: #0f8fe8; font-size: 24px">{{ data[0].num }}</span>
          </div>
          <div class="cart-div">
            <span>影响客户数</span>
            <span>{{ data[0].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[0].line"
            ></el-progress>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        class="col-box"
        @click="handleClick(1)"
      >
        <div
          class="card"
          :style="{'border-color': activeIndex==1?'#71acff':'#ebeef5'}"
        >
          <div class="cart-div">
            <span>{{ data[1].name }}</span>
            <span style="margin-top: 4px; color: #2EC478; font-size: 24px">{{ data[1].num }}</span>
          </div>
          <div class="cart-div">
            <span>影响客户数</span>
            <span>{{ data[1].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[1].line"
            ></el-progress>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        class="col-box"
        @click="handleClick(2)"
      >
        <div
          class="card"
          :style="{'border-color': activeIndex==2?'#71acff':'#ebeef5'}"
        >
          <div class="cart-div">
            <span>{{ data[2].name }}</span>
            <span style="margin-top: 4px; color: #0EACDA; font-size: 24px">{{ data[2].num }}</span>
          </div>
          <div class="cart-div">
            <span>影响客户数</span>
            <span>{{ data[2].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[2].line"
            ></el-progress>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        class="col-box"
        @click="handleClick(3)"
      >
        <div
          class="card"
          :style="{'border-color': activeIndex==3?'#71acff':'#ebeef5'}"
        >
          <div class="cart-div">
            <span>{{ data[3].name }}</span>
            <span style="margin-top: 4px; color: #F81D22; font-size: 24px">{{ data[3].num }}</span>
          </div>
          <div class="cart-div">
            <span>影响客户数</span>
            <span>{{ data[3].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[3].line"
            ></el-progress>
          </div>
        </div>
      </el-col>
      <el-col
        :span="6"
        class="col-box"
        @click="handleClick(4)"
      >
        <div
          class="card"
          :style="{'border-color': activeIndex==4?'#71acff':'#ebeef5'}"
        >
          <div class="cart-div">
            <span>{{ data[4].name }}</span>
            <span style="margin-top: 4px; color: #FFA800; font-size: 24px">{{ data[4].num }}</span>
          </div>
          <div class="cart-div">
            <span>影响客户数</span>
            <span>{{ data[4].effect }}</span>
          </div>
          <div class="progress-bar-line">
            <el-progress
              :show-text=false
              :percentage="data[4].line"
            ></el-progress>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  name: "MapHeard",
  props: {
  },
  setup (props, context) {
    let data = ref([
      { name: '全部', num: 666, effect: 34, line: 40, },
      { name: '勘察', num: 441, effect: 10, line: 20 },
      { name: '开通', num: 563, effect: 8, line: 20 },
      { name: '故障', num: 867, effect: 11, line: 30 },
      { name: '投诉', num: 563, effect: 5, line: 20 },
    ])
    let activeIndex = ref(0);
    const setValue = val => {
      data.value = val
    }
    const handleClick = index => {
      activeIndex.value = index;
      context.emit('handleCardChange', data.value[index])
    }
    return { data, setValue, activeIndex, handleClick }
  }
}
</script>

<style scoped>
.card-item {
  position: relative;
  /*display: flex;*/
  align-items: center;

  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.angle::after {
  content: "";
  width: 15px;
  position: absolute;
  height: 30px;
  right: -10px;
  bottom: -8px;
  background: #66e2fb;
  border-top: 10px;
  border-bottom: 10px;
  transform: rotate(45deg);
}
li {
  list-style: none;
}
.cart-div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px 0;
}
.card {
  position: relative;
  border: 1px solid #ebeef5;
}
.active {
  border: 1px solid #71acff;
}
.col-box {
  padding: 0 10px;
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
  background-color: #f3f6f9 !important;
  margin-left: 20px;
}
.progress-bar-line .el-progress-bar__inner {
  border-radius: 0px;
  background-image: linear-gradient(to right, #0eacda, #0eacda) !important;
}
</style>