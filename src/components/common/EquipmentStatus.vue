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

      <div class="res-item">
        <div class="res-data">
          <img :src="data[0].src">
          <span class="item-name">{{data[0].name}}</span>
          <span
            class="item-num"
            :style="{'color':data[0].color}"
          >{{data[0].num}}</span>
        </div>
        <div class="res-data">
          <img :src="data[1].src">
          <span class="item-name">{{data[1].name}}</span>
          <span
            class="item-num"
            :style="{'color':data[1].color}"
          >{{data[1].num}}</span>
        </div>
        <div class="res-data">
          <img :src="data[2].src">
          <span class="item-name">{{data[2].name}}</span>
          <span
            class="item-num"
            :style="{'color':data[2].color}"
          >{{data[2].num}}</span>
        </div>
      </div>
      <div class="res-item">
        <div class="res-data">
          <img :src="data[3].src">
          <span class="item-name">{{data[3].name}}</span>
          <span
            class="item-num"
            :style="{'color':data[3].color}"
          >{{data[3].num}}</span>
        </div>
        <div class="res-data">
          <img :src="data[4].src">
          <span class="item-name">{{data[4].name}}</span>
          <span
            class="item-num"
            :style="{'color':data[4].color}"
          >{{data[4].num}}</span>
        </div>
        <div class="res-data">
          <img :src="data[5].src">
          <span class="item-name">{{data[5].name}}</span>
          <span
            class="item-num"
            :style="{'color':data[5].color}"
          >{{data[5].num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity';
export default {
  name: "Rate",
  setup () {
    let title = ref('业务统计')
    let data = ref([
      { src: '全部', name: 'AMF', num: 16, color: '#ffa800' },
      { src: '全部', name: 'AMF', num: 16, color: '#ffa800' },
      { src: '全部', name: 'AMF', num: 16, color: '#ffa800' },
      { src: '全部', name: 'AMF', num: 16, color: '#ffa800' },
      { src: '全部', name: 'AMF', num: 16, color: '#ffa800' },
      { src: '全部', name: 'AMF', num: 16, color: '#ffa800' }
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
.res-data {
  width: calc(33% - 20px);
  height: 40px;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.32);
  margin: 5px 10px;
}
img {
  vertical-align: middle;
  margin: 0 10px;
}

.item-name {
  display: inline-block;
  font-size: 16px;
  color: #656e89;
  width: 90px;
  line-height: 40px;
}

.item-num {
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  float: right;
  margin-right: 10px;
}
</style>
