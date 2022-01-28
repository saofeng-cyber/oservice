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
    <div
      class="res-row"
      style="height: calc(100% - 41px);border:0;"
    >
      <div class="res-row">
        <div
          class="res-column"
          v-for="(item,index) of styleArray"
          :style="styleArray[index]"
          :key="index"
        >
        </div>
      </div>
      <div
        class="row-column-data"
        v-for="(item,index) of parentnum"
        :style="widthStyle"
        :key="index"
      >
        <div class="item-value">{{item}}%</div>

      </div>
      <div
        class="res-data"
        v-for="(item,index) in data.but"
        :key="index"
      >
        <span>{{item.name}}</span>
        <span>{{item.num}}</span>
      </div>
      <div class="res-color">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="res-num">
        <span> 影响客户数</span>
        <span
          v-for="(item,index) in data.number"
          :style="{color: item=='0' ? '#d1e2fc': '#0066ff' }"
          :key="index"
        >{{item}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { inject, onMounted, ref } from '@vue/runtime-core'

export default {
  name: "Rate",
  setup () {
    let title = ref('业务统计')
    let data = ref({
      but: [{ name: '设备告警', num: '742' },
      { name: '业务告警', num: '446' },
      { name: '拨测告警', num: '163' }
      ],
      number: ['0', '0', '4'],
    });
    let styleArray = ref([]);
    let widthStyle = ref({});
    let colorArray = ['#ffb21f', '#dc373a', '#39b6db', '#2FAACF'];
    let parentnum = ref([]);

    const initData = function () {

      widthStyle.value = { 'width': (100 / data.value.but.length - 1) + '%', 'margin-right': '1%' };
      let array = [];
      let parentarray = [];
      var total = 0;
      for (let i = 0; i < data.value.but.length; i++) {
        if (typeof data.value.but[i].num !== 'number' && data.value.but[i].num.indexOf('%') > -1) {

        } else {
          total += data.value.but[i].num;
        }
      }
      for (let i = 0; i < data.value.but.length; i++) {
        let style = { 'height': '25px' };
        style['background-color'] = colorArray[i % 4];
        if (typeof data.value.but[i].num !== 'number' && data.value.but[i].num.indexOf('%') > -1) {
          style['width'] = data.value.but[i].num;
        } else {
          if (total > 0) {
            parentarray.push(parseInt(data.value.but[i].num / total * 100));
            style['width'] = data.value.but[i].num / total * 100 + '%';
          } else {
            style['width'] = 100 / data.value.but.length * 100 + '%';
          }

        }
        array.push(style);
        styleArray.value = array
        parentnum.value = parentarray
      }
    }


    /** 设置标题 */
    const setTitle = val => {
      title.value = val

    }
    /** 设置data */
    const setValues = val => {
      data.value = val

      initData();
    };

    onMounted(() => {
      //initData()
    })

    return {
      title,
      setTitle,
      setValues,
      data,
      widthStyle,
      styleArray,
      parentnum
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
  height: 100%;
  padding: 0 10px;
  background-color: #fff;
}
.top-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
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
  width: 100%;
  height: 80px;
}

.res-data {
  width: 30%;
  float: left;
  text-align: center;
  border: 1px solid #ebeef5;
  margin-right: 2%;
  margin-top: 5px;
}
.res-data:nth-child(2) {
  color: #ffb21f;
}
.res-data:nth-child(3) {
  color: #dc373a;
}
.res-data:nth-child(4) {
  color: #39b6db;
}
.res-item {
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 20px;
  line-height: 30px;
  cursor: pointer;
  background-color: #fafbfc;
}
.item-value {
  float: right;
}
.res-data span {
  display: block;
  margin-top: 6px;
}

.res-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 2px;
  border: 1px solid #ebeef5;
}
.res-column {
  display: block;
  min-height: 1px;
  width: 50%;
}

.row-column-data:nth-child(2) {
  color: #ffb21f;
}
.row-column-data:nth-child(3) {
  color: #dc373a;
}
.row-column-data:nth-child(4) {
  color: #39b6db;
}
.res-color {
  width: 100%;
  float: left;
  margin-right: 5px;
  margin-top: 5px;
}
.res-color div {
  display: inline-block;
  width: 5px;
  height: 15px;
  background: linear-gradient(#fff, #2ec478);
  margin-left: 15%;
  margin-right: 15%;
}
.res-num {
  width: 100%;
  height: 30px;
  float: left;
  border: 2px solid #ebeef5;
  margin-right: 5px;
  margin-top: 5px;
  line-height: 30px;
}
.res-num span {
  font-size: 16px;
  margin: 0 auto;
}
.res-num span:first-child {
  color: #4b5575;
  width: 35%;
  display: inline-block;
  margin-left: 20px;
}
.res-num span:nth-child(2) {
  margin-left: 20%;
  width: 20px;
  background-color: #fafbfc;
  display: inline-block;
}
.res-num span:nth-child(3) {
  width: 20px;
  background-color: #fafbfc;
  display: inline-block;
  margin-left: 2%;
}
.res-num span:last-child {
  width: 20px;
  background-color: #fafbfc;
  display: inline-block;
  margin-left: 2%;
}
</style>
