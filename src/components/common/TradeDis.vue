<template>
  <div class="res-main">
    <div class="top-title">
      <div class="float-title">
        <span class="i"></span>{{title}}
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
          style="width:10%;"
        >
          <div class="res-item">排名</div>
        </div>
        <div
          class="res-column"
          style="width:30%;"
        >
          <div class="res-item">行业</div>
        </div>
        <div
          class="res-column"
          style="width:20%;"
        >
          <div class="res-item">数量</div>
        </div>
        <div
          class="res-column"
          style="width:40%;"
        >
          <div class="res-item">占比</div>
        </div>
      </div>
      <div
        class="res-row"
        v-for="(item,index) of data"
      >
        <div
          class="res-column"
          style="width:10%;"
        >
          <div class="res-item">
            <span
              class="rank"
              :style="{'background-color': colorArray[index%5]}"
            >{{index+1}}</span>
          </div>
        </div>
        <div
          class="res-column"
          style="width:30%;"
        >
          <div class="res-item">{{item.name}}</div>
        </div>
        <div
          class="res-column"
          style="width:20%;"
        >
          <div
            class="res-item"
            :style="{'color':colorArray[index%5]}"
          >{{item.num}}</div>
        </div>
        <div
          class="res-column"
          style="width:40%;padding-top:15px;"
          :style="{'color': '#0066FF'}"
        >
          <el-progress
            :percentage="item.rate"
            :color="colorArray[index%5]"
          ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity';
export default {
  name: "BusRank",
  setup () {
    let title = ref('行业分布')
    let data = ref([
      { name: '金融业', num: 1641, rate: 49.01 },
      { name: '住宿和餐饮业', num: 1241, rate: 29.42 },
      { name: '服务业', num: 987, rate: 26.56 },
    ]);
    let colorArray = ref(['#FFA800', '#2EC478', '#0066FF', '#0EACDA', '#8A91A6']);

    /** 设置标题 */
    const setTitle = val => {
      title.value = val
    }
    /** 设置data */
    const setValue = val => {
      data.value = val
    };

    onMounted(() => {
      //initData()
    })

    return {
      title,
      setTitle,
      setValue,
      data,
      colorArray
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #fafbfc;
}
.rank {
  width: 15px;
  padding: 2px;
  background-color: rgb(255, 168, 0);
  color: rgb(255, 255, 255);
  display: inline-block;
  text-align: center;
  line-height: 17px;
}
</style>
