<template>
  <div class="res-main">
    <div class="top-title">
      <div class="float-title" v-if="title">
          <i class="el-icon-caret-right"></i>
          {{title}}
      </div>
      <div class="float-title-right" @click="selfRefresh">
          <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div class="res-info">
      <el-row :gutter="16">
        <el-col :span="12" v-for="(item, index) in resInfo" :key="index">
          <div class="res-item" :class="{'active-res-item': activeRes === item.name}" @click="handleResChange(item)">
            <div class="item-name">
              <img class="res-icon" :src="require(`../../assets/resource/${item.img}`)" alt="">
              {{ item.name }}
            </div>
            <div class="item-value" :style="{ color: colors[index]}">
              {{ item.value }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'NetResource',
  setup (props, context) {
    let title = ref('')
    let activeRes = ref('')
    let resInfo = ref([])
    const colors = ['#26A7FF', '#40E792', '#FFC554', '#48D6FF']
    const handleResChange = item => {
      if (item.name !== activeRes) {
        activeRes.value = item.name
        context.emit('handleResChange', item)
      }
    }
    const setTitle = val => {
      title.value = val
    }
    const selfRefresh = () => {
      activeRes.value = ''
      context.emit('handleResChange')
    }
    const setValues = list => {
      resInfo.value = list
    }
    return {
      resInfo, colors, title, activeRes, handleResChange, setTitle, selfRefresh, setValues
    }
  }
}
</script>
<style scoped>
.res-main {
  padding: 0 16px;
}
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  font-size: 14px;
}
.float-title {
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 24px;
  text-shadow: 0px 0px 6px #26A7FF;
}
.float-title-right {
  width: 16px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #B1D8FF;
  border-radius: 50%;
  border: 1px solid #B1D8FF;
  cursor: pointer;
}
.res-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 5px;
  cursor: pointer;
  color: #fff;
}
.item-name {
  display: flex;
  align-items: center;
  font-size: 12px;
}
.item-value {
  font-size: 16px;
}
.res-icon {
  margin-right: 8px;
}
.active-res-item {
  border: 1px solid #66E2FB;
}
</style>