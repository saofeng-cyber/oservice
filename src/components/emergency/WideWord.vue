<template>
  <div style="width: 100%;height: 40px;background-color: #FF5152">
    <ul class="marquee-list">
      <li>
        <p>排名</p>
        <span style="color: #FFFFFF">区域</span>
        <em style="color: #FFFFFF">  影响切片</em>
        <p style="color: #FFFFFF;margin-left: 120px;">工单数</p>
        <span style="color: #FFFFFF;margin-left: 100px;" >影响客户</span>
      </li>
    </ul>
    <div class="marquee-warp" id="scroll-box">
      <ul class="marquee-list" :class="{'animate-up': animateUp}" id="scroll-list">
        <li v-for="(item, index) in listData" :key="index">
          <p style="margin-left: 20px;background-color: #694E15">{{item.rank}}</p>
          <span style="margin-left: 35px;color: #FFFFFF">{{item.title}}</span>
          <em style="color: #FFB703">{{item.dispose}}</em>
          <p style="margin-left: 130px;color: #21dde6">{{item.num}}</p>
          <span style="margin-left: 130px;color: red">{{item.number}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {ref} from '@vue/runtime-core'
import {getCurrentInstance} from 'vue';
import {onMounted,onUnmounted,ref} from '@vue/runtime-core';
export default {
  name: "Carousel",
  setup() {
    const { proxy } = getCurrentInstance();
    let listData = ref()
    let timer =  ref('null');
    //  设置data
    const setValues = val =>{
      listData.value = val
    }
    const movelist = ()=>{
      // alert(11)
      let area = document.getElementById('scroll-box');
      let con1 = document.getElementById('scroll-list');
      let cloned = con1.cloneNode(true);
      area.appendChild(cloned)
    }
    const  move = () =>{
      // alert(22)
      let area = document.getElementById('scroll-box');
      let con1 = document.getElementById('scroll-list');
      if (area.scrollTop >= con1.offsetHeight) {
        area.scrollTop = 0;
      } else {
        area.scrollTop++
      }
    }
    onMounted(()=>{
      // alert(555)
      setTimeout(proxy.movelist, 4500);
      proxy.timer = setInterval(proxy.move, 50);

    });
    onUnmounted(()=>{
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

.marquee-warp  {
  width: 100%;
  height: 155px;
  overflow: hidden;
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
  color: #fff;
  font-weight: 400;
  background: #0a0f1a;
  margin-bottom: 3px;
}
.marquee-list li p{
  float: left;
  font-size: 14px;
  line-height: 14px;
  padding: 3px 5px;
  /*background: #3f4e63;*/
  color: #fff;
  margin-left: 10px;
  margin-top: 10px;
}
.marquee-list li span{
  display: block;
  height: 100%;
  float: left;
  margin-left: 30px;
  font-size: 14px;
  color: #66E2FA;
  line-height: 40px;
}
.marquee-list li em{
  display: block;
  float: right;
  font-size: 14px;
  font-style: normal;
  color: #22905F;
  line-height: 40px;
  margin-right: 20px;
  padding-right: 20px;
}
.marquee-list li i{
  display: block;
  /*float: right;*/
  font-size: 14px;
  font-style: normal;
  color: #FC4B53;
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