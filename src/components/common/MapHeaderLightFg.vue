<template>
  <div>
    <div class="top-title">
      <div
        v-if="title"
        style="text-align: center;font-size: 20px;width:100%;"
      >
        <img
          style="position: absolute;left: 35%;top: 8px;height:20px;"
          src="@/static/img/Icon-ArrowLeft@2x.png"
        />
        <div style="display: inline-block;font-weight: bold;">{{title}}</div>
        <img
          style="position: absolute;right: 35%;top: 8px;height:20px;"
          src="@/static/img/Icon-ArrowRight@2x.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from '@vue/runtime-core'
export default {
  props: ["hideTime"],
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
    onMounted(() => {
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
.i {
  display: inline-block;
  width: 3px;
  height: 15px;
  border-radius: 3px;
  background-color: #1890ff;
  margin-bottom: -3px;
  margin-right: 5px;
}
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 0 16px;
  /*border-bottom: 1px solid #ebeef5;*/
}
.title-left {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}
.back-button {
  width: 24px;
  height: 24px;
  background: linear-gradient(
    180deg,
    rgba(102, 226, 251, 0.4) 0%,
    rgba(102, 226, 251, 0) 100%
  );
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  margin-right: 8px;
}
.title-left::after {
  content: "";
  width: 1px;
  height: 16px;
  /* display: inline-block; */
  background: linear-gradient(180deg, #b1d8ff 0%, rgba(177, 216, 255, 0) 100%);
  margin-left: 32px;
}
.title-right {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
</style>