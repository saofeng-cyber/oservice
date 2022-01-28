<template>
  <div style="width: 100%;height: 100%;">
    <ul class="marquee-list">
      <li>
        <p>行业</p>
        <p>正常工单</p>
        <p>及时处理率</p>
        <p>超时工单</p>
      </li>
    </ul>
    <div
      class="marquee-warp"
      id="scroll-box"
    >
      <ul
        class="marquee-list"
        :class="{'animate-up': animateUp}"
        id="scroll-list"
        style="margin:0;"
      >
        <li
          v-for="(item, index) in listData"
          :key="index"
        >
          <p>{{item.rank}}</p>
          <p>{{item.title}}</p>
          <p>{{item.dispose}}</p>
          <p>{{item.num}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {ref} from '@vue/runtime-core'
import { getCurrentInstance } from 'vue';
import { onMounted, onUnmounted, ref } from '@vue/runtime-core';
export default {
  name: "Carousel",
  setup () {
    const { proxy } = getCurrentInstance();
    let listData = ref()
    let timer = ref('null');
    //  设置data
    const setValues = val => {
      listData.value = val
    }
    const movelist = () => {
      // alert(11)
      let area = document.getElementById('scroll-box');
      let con1 = document.getElementById('scroll-list');
      let cloned = con1.cloneNode(true);
      area.appendChild(cloned)
    }
    const move = () => {
      // alert(22)
      let area = document.getElementById('scroll-box');
      let con1 = document.getElementById('scroll-list');
      if (area.scrollTop >= con1.offsetHeight) {
        area.scrollTop = 0;
      } else {
        area.scrollTop++
      }
    }
    onMounted(() => {
      //setTimeout(proxy.movelist, 4500);
      // proxy.timer = setInterval(proxy.move, 50);

    });
    onUnmounted(() => {
      clearTimeout(proxy.timer)
      proxy.timer = null;
    });
    return {
      listData, movelist, move, setValues, timer
    }
  }
}
</script>

<style scoped>
.marquee-warp {
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: auto;
}
.marquee-list {
  margin: 0;
  padding: 0;
}
.marquee-list li {
  width: 100%;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /*padding: 0 20px;*/
  list-style: none;
  line-height: 40px;
  text-align: center;
  font-weight: 400;
  background: #fafbfc;
  margin-bottom: 3px;
}
.marquee-list li p {
  float: left;
  width: 25%;
  font-size: 14px;
  line-height: 14px;
  padding: 3px 5px;
  /*background: #3f4e63;*/
  margin-top: 10px;
  box-sizing: border-box;
  text-align: left;
}
.marquee-list li span {
  display: block;
  height: 100%;
  float: left;
  margin-left: 30px;
  font-size: 14px;
  color: #0066ff;
  line-height: 40px;
}
.marquee-list li em {
  display: block;
  float: right;
  font-size: 14px;
  font-style: normal;
  color: #2ec478;
  line-height: 40px;
  margin-right: 20px;
  padding-right: 20px;
}
.marquee-list li i {
  display: block;
  /*float: right;*/
  font-size: 14px;
  font-style: normal;
  color: #fc4b53;
  line-height: 40px;
  margin-right: 20px;
  padding-right: 20px;
  font-style: normal;
}
.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-40px);
}
</style>