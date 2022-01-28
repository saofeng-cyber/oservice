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
    <hr style="background-color:#f3f5f9; height:1px; border:none;"/>
    <div class="res-info">
      
      <div class="res-row">
        <div
          class="res-column"
          v-for="(item,index) of data"
          :style="widthStyle"
        >
        <div class="res-item">
                <img :src="item.src">
                <span class="item-titlel">{{item.pe}}</span>
                <span class="item-titler">设备数：</span>
                <span class="item-number">{{item.number}}</span>
                <div class="item-jg">
                  <span class="item-gaojing">告警数：</span>
                  <span class="item-num">{{item.num}}</span>
                  <span class="item-gaojing">告警率：</span>
                  <span class="res-el"><el-progress type="line"
                    :percentage="item.gaojing"
                    color="#FCB936"
                    :stroke-width="10"
                    

                  ></el-progress></span>

                </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity';
export default {
  name: "Rate",
  setup () {
    let title = ref('业务统计')
    let data = ref([
      {pe:'云PE',number:'451', num: 1354,gaojing: 4.4 },
      {pe:'云PE',number:'451', num: 1354,gaojing: 9.4 }
    ]);
    let styleArray = ref([]);
    let widthStyle = ref({});
    let colorArray = ['#0A6DF2', '#14D071', '#FCB936', '#2FAACF'];

    const initData = function () {
      
      widthStyle.value = { 'width': (100 / data.value.length - 1) + '%', 'margin-right': '1%' };
      let array = [];
      var total = 0;
      for (let i = 0; i < data.value.length; i++) {
        if (typeof data.value[i].num !== 'number' && data.value[i].num.indexOf('%') > -1) {

        } else {
          total += data.value[i].num;
        }
      }
      for (let i = 0; i < data.value.length; i++) {
        let style = { 'height': '25px' };
        style['background-color'] = colorArray[i % 4];
        if (typeof data.value[i].num !== 'number' && data.value[i].num.indexOf('%') > -1) {
          style['width'] = data.value[i].num;
        } else {
          if (total > 0) {
            style['width'] = data.value[i].num / total * 100 + '%';
          } else {
            style['width'] = 100 / data.value.length * 100 + '%';
          }
        }

        array.push(style);
        styleArray.value = array
      }
    }
 

    /** 设置标题 */
    const setTitle = val => {
      title.value = val
      
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
      initData()
    };

    onMounted(() => {
      //initData()
    })

    return {
      title,
      setTitle,
      setValue,
      data,
      widthStyle,
      styleArray
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
  padding: 0 10px;
  background-color: #fff;
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
.res-info{
  padding:20px 0;
}
.res-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.res-column {
  display: block;
  min-height: 1px;
  width: 50%;
}
.res-el {
  display: inline-block;
  min-height: 20px;
  width: 42%;
  border-radius: 0px;

}
.res-item {
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  height: 80px;
  width:270px;
  line-height: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
}

img{
  vertical-align:middle;
}
.item-titlel {
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
}
.item-titler {
  margin-top: 20px;
  padding-left: 100px;
  font-size: 16px;
  color: #656e89;
}
.item-number {
  font-size: 20px;
  color: #1e78fe;
  font-weight: bold;
}
.item-jg{
  padding-top: 30px;
}
.item-gaojing {
  font-size: 14px;
  color: #656e89;
}
.item-num {
  font-size: 16px;
  color: red;
  font-weight: bold;
  padding-right:8px;
}
</style>
