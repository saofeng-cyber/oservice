<template>
  <div>
    <div class="top-title">
      <div class="title-left" v-if="title">
          <i v-if="isNation" class="el-icon-caret-right"></i>
          <span v-else class="back-button" @click="$emit('handleBack')">
            <i class="el-icon-back"></i>
          </span>
          {{title}}
      </div>
      <div class="title-right" v-if="dateTime && !hideTime">
          {{ dateTime }}
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from '@vue/runtime-core'
export default {
  name: 'MapHeader',
  props:["hideTime"],
  setup () {
    let title = ref('')
    let dateTime = ref('')
    let isNation = ref(true) // 是否是全国视图
    const setTitle = val => {
      title.value = val
    }
    const setDateTime = val => {
      dateTime.value = val
    }
    const setIsNation = bool => {
      isNation.value = bool
    }
    onMounted (() => {
      const date = new Date()
      dateTime.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    })
    return {
      title, dateTime, setTitle, setDateTime, isNation, setIsNation
    }
  }
}
</script>
<style scoped>
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
}
.title-left {
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 24px;
  text-shadow: 0px 0px 6px #26A7FF;
}
.back-button {
  width: 24px;
  height: 24px;
  background: linear-gradient(180deg, rgba(102, 226, 251, 0.4) 0%, rgba(102, 226, 251, 0) 100%);
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  margin-right: 8px;
}
.title-left::after {
  content: '';
  width: 1px;
  height: 16px;
  /* display: inline-block; */
  background: linear-gradient(180deg, #B1D8FF 0%, rgba(177, 216, 255, 0) 100%);
  margin-left: 32px;
}
.title-right {
  font-size: 14px;
  font-weight: 500;
  color: #B1D8FF;
  line-height: 24px;
}
</style>