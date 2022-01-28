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
          v-for="(item,index) of data"
          :key="index"
        >
          <div class="res-item">
            <div class="item-titlel">{{item.name}}</div>
            <div style="padding-top: 10px;">
              <span class="item-titler">达标率：</span>
              <span class="item-number">{{item.num}}%</span>
            </div>
            <span class="res-el">
              <el-progress
                type="line"
                :percentage="item.num"
                :stroke-width="10"
                :show-text="false"
                :color="item.num==100 ? '#33cd7f': '#ffbb38'"
              ></el-progress>
            </span>

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
      { pe: '云PE', number: '451', num: 1354, gaojing: 4.4 },
      { pe: '云PE', number: '451', num: 1354, gaojing: 9.4 }
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
  height: 39px;
  border-bottom: 1px solid #eee;
}
.float-title {
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
.res-info {
}
.res-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.res-column {
  display: block;
  min-height: 1px;
  width: 33.3333%;
  padding: 5px 10px;
  box-sizing: border-box;
}
.res-el {
  display: block;
  margin-top: 5px;
}
.res-item {
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #fafbfc;
  border: 1px solid #eee;
}

.item-titlel {
  display: block;
}
.item-titler {
  display: inline-block;
  color: #656e89;
}
.item-number {
  display: inline-block;
  color: #1e78fe;
  float: right;
}
</style>
