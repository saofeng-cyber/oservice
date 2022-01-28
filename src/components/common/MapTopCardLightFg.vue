<template>
  <div>
    <div
      class="card-item"
      :class="{angle: !isActive}"
      :style="{background: isActive ? data.backgroundColor : ''}"
      @click="handleClick"
    >
      <div class="item-left">
        <div
          class="item-label"
          :style="{ color: isActive ? '' : '#1E222D'}"
        >
          {{ data.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        key: '0', // 唯一标识
        label: '5G专网客户数', // 名称
        value: 12493, // 数值
        img: 'CIcon-Avatar', // 图片(不含后缀，选中状态为img-A) @/assets/resource/
        color: 'rgba(46, 196, 120, 1)', // 数值文字颜色
        backgroundColor: 'linear-gradient(360deg, rgba(46, 196, 120, 0.64) 0%, rgba(46, 196, 120, 0.32) 100%)' // 选中状态背景色
      })
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    hideImg: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      this.$emit('handleCardChange', this.data)
    }
  }
}
</script>
<style scoped>
.card-item {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
}
.item-left {
  padding: 16px;
  color: #fff;
  font-size: 12px;
}
.item-value {
  font-size: 16px;
  line-height: 18px;
  padding-bottom: 10px;
}
</style>