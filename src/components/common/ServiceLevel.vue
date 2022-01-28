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
        <span class="res-name">勘察及时率</span>
        <span style="color:#0A6DF2" class="res-span">{{item.kancha}}</span>
        </div>
        <div class="res-item">
        <span class="res-name">开通及时率</span>
        <span style="color:#14D071" class="res-span">{{item.kaitong}}</span>
        </div>
        <div class="res-item">
        <span class="res-name">故障处理及时率</span>
        <span style="color:#FCB936" class="res-span">{{item.guzhang}}</span>
        </div>
        <div class="res-item">
        <span class="res-name">投诉处理及时率</span>
        <span style="color:red" class="res-span">{{item.tousu}}</span>
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
      {kancha: '97.17%', kaitong: '97.17%',guzhang: '97.17%',tousu: '97.17%',}
    ]);
    let styleArray = ref([]);
    let widthStyle = ref({});
    let colorArray = ['#0A6DF2', '#14D071', '#FCB936', '#2FAACF'];

    const initData = function () {
      
      widthStyle.value = { 'width': (100 / data.value.length - 1) + '%', 'margin-right': '1%' };
      let array = [];
      var total = 0;
      for (let i = 0; i < data.value.length; i++) {
        if (typeof data.value[i].kancha !== 'number' && data.value[i].kancha.indexOf('%') > -1) {

        } else {
          total += data.value[i].kancha;
        }
      }
      for (let i = 0; i < data.value.length; i++) {
        let style = { 'height': '25px' };
        style['background-color'] = colorArray[i % 4];
        if (typeof data.value[i].kancha !== 'number' && data.value[i].kancha.indexOf('%') > -1) {
          style['width'] = data.value[i].kancha;
        } else {
          if (total > 0) {
            style['width'] = data.value[i].kancha / total * 100 + '%';
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

.res-item {
  align-items: center;
  justify-content: space-between;
  margin: 5px 5px;
  height: 70px;
  width:137px;
  line-height: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
  float:left;
  font-size: 16px;
  font-weight: bold;

}
.res-name{
  display:block;
  margin:15px 5px;
}
.res-span{
  display:block;
  margin:15px 5px;
}

</style>
