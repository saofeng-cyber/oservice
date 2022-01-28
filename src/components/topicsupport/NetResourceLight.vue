<template>
  <div class="res-main">
    <div class="top-title">
      <div
        class="float-title"
        v-if="title"
      >
        <span class="i"></span>
        {{title}}
      </div>
      <div
        class="float-title-right"
        @click="selfRefresh"
      >
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <div class="res-info">
      <el-row :gutter="16">
        <el-col
          :span="12"
          v-for="(item, index) in resInfo"
          :key="index"
        >
          <div
            class="res-item"
            :class="{'active-res-item': activeRes === item.name}"
            @click="handleResChange(item)"
          >
            <div class="item-name">
              <img
                class="res-icon"
                :src="require(`../../assets/resource/${item.img}`)"
                alt=""
              >
              {{ item.name }}
            </div>
            <div
              class="item-value"
              :style="{ color: colors[index]}"
            >
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
  //name: 'NetResource',
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
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}
.res-main {
  padding: 0 16px;
}
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  font-size: 14px;
}
.float-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
.float-title-right {
  width: 16px;
  height: 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50%;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
  cursor: pointer;
}
.res-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
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
  border: 1px solid #66e2fb;
}
</style>