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
      <div class="res-row">
        <div
          class="res-column"
          v-for="(item,index) of styleArray"
          :style="styleArray[index]"
        >
        </div>
      </div>
      <div class="res-row">
        <div
          class="res-column"
          v-for="(item,index) of data"
          :style="widthStyle"
        >
          <div class="res-item">
            <div class="item-name">{{item.name}}</div>
            <div class="item-value" :style="{'color': item.color}">{{item.num}}</div>
            <div class="item-gaojing">告警总数:<span class="item-number">{{item.number}}</span></div>
            <el-progress type="line"
                    :percentage="item.number"
                    :color="item.color"
                    :stroke-width="10"
                    :show-text="false"

                  ></el-progress>
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
  name: "BusSta",
  setup () {
    let title = ref('业务统计')
    let data = ref([
      { name: '省内', num: 1354 },
      { name: '跨省', num: 1354 },
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
  padding: 0 16px;
  height: 100px;
  line-height: 30px;
  cursor: pointer;
  background-color: #fafbfc;
}
.item-name {
  margin-top:15px;
  float: left;
  align-items: center;
  font-size: 14px;
}
.item-value {
  margin-top:15px;
  float: right;
  font-size: 16px;
  font-weight: bold;
}
.item-gaojing {
  overflow: hidden;
  clear:both;
  font-size: 16px;
  background-color: #fafbfc;
}
.item-number {
  float:right;
  font-size: 16px;
  background-color: #fafbfc;

}
</style>
