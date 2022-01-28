<template>
  <div class="res-main">
    <div class="top-title">
      <div class="float-title">
        <el-button size="medium">跨省发起方TOP</el-button>
        <el-button
          size="medium"
          type="primary"
        >双跨业务量排名</el-button>
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
          <div class="res-item">
            排名
          </div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">
            A端省份
          </div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">
            Z端省份
          </div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">
            专线数量
          </div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">
            带宽(MB)
          </div>
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
            >{{item.index}}</span>
          </div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">{{item.a_name}}</div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">{{item.z_name}}</div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
          :style="{'color': colorArray[index%5]}"
        >
          <div class="res-item">{{item.line_num}}</div>
        </div>
        <div
          class="res-column"
          style="width:22%;"
        >
          <div class="res-item">{{item.bandwidth}}</div>
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
    let title = ref('业务统计')
    let data = ref([
      { index: 1, a_name: '北京', z_name: '北京', line_num: 533, bandwidth: 642.7 },
      { index: 2, a_name: '北京', z_name: '广东', line_num: 433, bandwidth: 737.7 },
      { index: 3, a_name: '上海', z_name: '四川', line_num: 333, bandwidth: 637.7 },
      { index: 4, a_name: '江苏', z_name: '四川', line_num: 233, bandwidth: 537.7 },
      { index: 5, a_name: '北京', z_name: '四川', line_num: 256, bandwidth: 437.7 },
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
  justify-content: center;
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
