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
      <div
        class="res-item"
        v-for="(item,index) in data.but"
      >
        <span>{{item.name}}</span>
        <span>{{item.num}}</span>
      </div>
    </div>
    <div class="res-table-title">
      <span>{{data.table[0]}}</span>
      <span>{{data.table[1]}}</span>
      <span>{{data.table[2]}}</span>
      <span>{{data.table[3]}}</span>
    </div>
    <div class="res-table-list">
      <span style="
        width: 7px;
        height: 7px;
        display: inline-block;
        text-align: center;
        border: 3px solid #ffa800;
      "></span>
      <span v-for="(item,index) in data.device">{{item}}</span>

    </div>
    <div class="res-table-list">
      <span style="
        width: 7px;
        height: 7px;
        display: inline-block;
        text-align: center;
        border: 3px solid #ffa800;
      "></span>
      <span v-for="(item,index) in data.alarmdevices">{{item}}</span>

    </div>
    <div class="res-table-list">
      <span style="
        width: 7px;
        height: 7px;
        display: inline-block;
        text-align: center;
        border: 3px solid #ffa800;
      "></span>
      <span v-for="(item,index) in data.dnn">{{item}}</span>

    </div>
  </div>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import { ref } from "@vue/reactivity";
export default {
  name: "Rate",
  setup () {
    let title = ref('业务统计')
    let data = ref({
      but: [{ name: '核心网告警', num: '742' },
      { name: '无线网告警', num: '446' },
      { name: '传输网告警', num: '163' }
      ],
      table: ['类型', 'AMF', 'SMF', 'UPF'],
      device: ['设备告警数', '5', '3', '4'],
      alarmdevices: ['告警设备数', '4', '3', '5'],
      dnn: ['影响DNN数', '3', '3', '6']
    });
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
    const setValues = val => {
      data.value = val
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
  margin-top: 5px;
}

.res-item {
  width: 30%;
  display: inline-block;
  text-align: center;
  border: 1px solid #ebeef5;
  margin-right: 2%;
}
.res-info div:first-child {
  background-color: #ffa800;
  color: #fff;
}
.res-item span {
  display: block;
  margin-top: 6px;
}
.res-info div:nth-child(2) span:first-child,
.res-info div:nth-child(3) span:first-child {
  color: #4b5575;
}
.res-info div:nth-child(2) span:last-child,
.res-info div:nth-child(3) span:last-child {
  color: #ffa800;
}
.res-table-title {
  width: 96%;
  height: 30px;
  border: 1px solid #ebeef5;
  float: none;
  line-height: 30px;
  margin-top: 5px;
}
.res-table-title span {
  display: inline-block;
  width: 20%;
  text-align: center;
  color: #4b5575;
}
.res-table-title span:first-child {
  width: 36%;
}
.res-table-list {
  width: 96%;
  height: 30px;
  border: 1px solid #ebeef5;
  float: none;
  line-height: 30px;
  margin-top: 5px;
}
.res-table-list span {
  display: inline-block;
  width: 20%;
  height: 30px;
  text-align: center;
}
.res-table-list span:nth-child(2) {
  width: 32%;
}
.res-table-list span:nth-child(3),
.res-table-list span:nth-child(4),
.res-table-list span:nth-child(5) {
  color: #ffa800;
}
</style>
