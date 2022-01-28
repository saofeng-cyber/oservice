<template>
  <div style="width: 100%;height: 40px;background-color: #FF5152">
    <ul class="marquee-list">
      <li>
        <p style="width:20%;color: #8AA3C0;">排名</p>
        <p style="width:20%;color: #8AA3C0">{{title}}</p>
        <span style="color: #8AA3C0;width: 20%">工单数</span>
        <em style="color: #8AA3C0;width: 20%"> 影响客户</em>
        <i style="color: #8AA3C0;width: 20%">影响切片</i>
      </li>
    </ul>
  <div class="marquee-warp" id="scroll-box2">
    <ul class="marquee-list" :class="{'animate-up': animateUp}" id="scroll-list2">
      <li v-for="(item, index) in listData" :key="index">
        <div style="float: left;width: 20%;text-align: center;" v-show="item.no==1"><span
              style="
          float: none;
          margin-top: 10px;
          width: 17px;
          height: 17px;
          background-color: #684A0A;
          color: #fff;
          display: inline-block;
          text-align: center;
          line-height: 17px;
        "
      >1</span></div>
        <div style="float: left;width: 20%;text-align: center;" v-show="item.no==2"><span
                style="
          margin-top: 10px;
          float: none;
          width: 17px;
          height: 17px;
          background-color: #17573F;
          color: #fff;
          display: inline-block;
          text-align: center;
          line-height: 17px;
        "
        >2</span></div>
        <div style="float: left;width: 20%;text-align: center;" v-show="item.no==3"><span
                style="
                float: none;
          margin-top: 10px;
          width: 17px;
          height: 17px;
          background-color: #093070;
          color: #fff;
          display: inline-block;
          text-align: center;
          line-height: 17px;
        "
        >3</span></div>
        <div style="float: left;width: 20%;text-align: center;" v-show="item.no==4||item.no==5||item.no==6"><span
                style="
                float: none;
          margin-top: 10px;
          width: 17px;
          height: 17px;
          background-color: #2F6273;
          color: #fff;
          display: inline-block;
          text-align: center;
          line-height: 17px;
        "
        >{{item.no}}</span></div>
        <p style="width:20%;">{{item.rank}}</p>
        <span style="width:20%;">{{item.title}}</span>
        <em style="width:20%;">{{item.num}}</em>
        <i style="width:20%;">{{item.dispose}}</i>
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
  name: "Carouse2",
  setup() {
    const { proxy } = getCurrentInstance();
    let listData = ref();
    let title = ref("");
    let timer =  ref('null');
  //  设置data
    const setValues = val =>{
      listData.value = val
    }
    const setTitle = val =>{
        title.value = val;
    }
    const movelist = ()=>{
      // alert(11)
      let area = document.getElementById('scroll-box2');
      let con1 = document.getElementById('scroll-list2');
      let cloned = con1.cloneNode(true);
      area.appendChild(cloned)
    }
    const  move = () =>{
      // alert(22)
      let area = document.getElementById('scroll-box2');
      let con1 = document.getElementById('scroll-list2');
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
      listData, movelist, move, setValues, timer, title, setTitle
    }
  }
}
</script>

<style scoped>

.marquee-warp  {
  width: 100%;
  height: 216px;
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
  padding: 3px 0px;
  width: 20%;
  color: #D0DEEE;
  /*background: #3f4e63;*/
  margin-top: 10px;
}
.marquee-list li span{
  display: block;
  height: 100%;
  width: 20%;
  float: left;
  font-size: 14px;
  color: #66E2FA;
  line-height: 40px;
}
.marquee-list li em{
  display: block;
  float: left;
  width: 20%;
  font-size: 14px;
  font-style: normal;
  color: #FC4B53;
  line-height: 40px;
  padding-right: 20px;
}
.marquee-list li i{
  display: block;
  /*float: right;*/
  font-size: 14px;
  font-style: normal;
  width: 20%;
  color: #E7A533;
  line-height: 40px;
  padding-right: 20px;
  font-style: normal;
}
.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-40px);
}
</style>