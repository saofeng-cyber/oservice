<template>
  <div class="res-main">
    <div class="res-info">
      
        <div
          v-for="(item,index) of data"
          :style="widthStyle"
        >
        <div class="res-item">
                <span class="item-title">{{item.name}}:</span>
                <span class="item-num">{{item.num}}</span>
                <span class="item-tongbi">同比：</span>
                <span class="item-percent">{{item.percent}}</span>
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
    let data = ref([
      {name:'告警云专线数',num:'30', percent:'10.0%↓' },
      {name:'告警云专线数',num:'30', percent:'10.0%↓' },
      {name:'告警云专线数',num:'30', percent:'10.0%↓' }
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
    


   
    /** 设置data */
    const setValue = val => {
      data.value = val
      initData()
    };

    onMounted(() => {
      //initData()
    })

    return {
      setValue,
      data,
      widthStyle,
      styleArray
      }
  }
}
</script>

<style scoped>

.res-main {
  padding: 0 10px;
  background-color: #fff;
}


.res-info{
  width: 100%;
}


.res-item {
  line-height: 30px;
  justify-content: space-between;
  margin:20px 0 10px 0;
  height: 45px;
  width: 350px;
  line-height: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
}


.item-title {
  padding-left: 5px;
  font-size: 14px;
  line-height: 45px;
  margin-left:5px;
  display:inline-block;
  width:130px;
}

.item-num {
  font-size: 16px;
  color: #FCB936;
  font-weight: bold;
  line-height: 45px;
  display:inline-block;
  width:60px;
  text-align:center;
}
.item-tongbi{
  font-size: 14px;
  color: #656e89;
  line-height: 45px;
  display:inline-block;
  width:70px;
  text-align:center;

}

.item-percent{
  font-size: 14px;
  color: #14D071;
  line-height: 45px;
  display:inline-block;
  width:60px;
}
</style>
