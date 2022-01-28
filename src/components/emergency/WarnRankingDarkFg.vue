<template>
  <div>
    <div style="width: 100%; height: 100%; position: relative">
      <!--<div-->
      <!--class="float-title"-->
      <!--v-if="title"-->
      <!--&gt;-->
      <!--<span class="i"></span>-->
      <!--{{ title }}-->
      <!--</div>-->
      <div
        class="float-title-right"
        v-if="data.iconShow"
        @click="$emit('selfRefresh')"
      >
        <i class="el-icon-refresh"></i>
      </div>
      <div class="warn-left">
        <div
          class="warn-div"
          :class="{isActive : data.iconShow == false}"
        >
          <div style="float:left;width:10%;text-align:center;">{{Title.ranking}}</div>
          <div style="float:left;width:65%;text-align:left;margin-left:5%">{{Title.province}}</div>
          <div style="float:left;width:20%;text-align:left;">{{title}}</div>
        </div>
        <div
          class="warn-div"
          style="margin-top:6px;width: 100%;"
          :class="{isActive : data.iconShow == false}"
          v-for="(item,index) in RankingData"
          :key="index"
        >
          <div style="float:left;width:10%;text-align:center;">
            <span
              style="width: 17px;
              height: 17px;
              display: inline-block;
              text-align: center;
              line-height: 17px;
              color:#fff;"
              :style="{'background-color': getColor(index)}"
            >{{index + 1}}</span>
          </div>
          <span style="float:left;width:40%;margin-left:3%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.province}}</span>
          <span
            class="sapn-box"
            style="float:left;width:28%;margin-right:2%;"
            :class="{ 'sapn-box0': index==0, 'sapn-box1': index==1, 'sapn-box2': index==2, 'sapn-box3': index==3, 'sapn-box': index>3}"
          >
            <el-progress
              class="warn-progress"
              style="
                  height: 15px;
                  margin-top: 10px;
                  align-item: center;"
              :show-text="false"
              :stroke-width='10'
              stroke-linecap='square'
              :percentage="+item.process"
              :color="item.color"
            >
              <!-- <div id="warn-progress-bar"></div> -->
            </el-progress>
          </span>
          <span
            style="float:left;  font-weight:700"
            :style="{'color': getColor(index)}"
          >{{item.num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref
} from "@vue/runtime-core"
export default {
  name: 'RankingDataFg',
  props: {
    RankingData: [],
    Title: {}
  },
  setup () {
    let title = ref('数量')
    // let ranking = ref('')
    let data = ref({
      ranking: ' 排名',
      province: "省份",
      warn: "告警数",
      provinces: "北京",
      prov: "上海",
      pros: "广东",
      provins: "浙江",
      one: "55",
      two: "50",
      three: "45",
      four: "40",
      numberone: "5007",
      numbertwo: "4730",
      numberthree: "3985",
      numberfour: "3492"
    })
    const colorArray = ref(['#FFA800', '#2EC478', '#0066FF', '#0EACDA', '#4B5575'])
    const colorArray2 = ref(['#FFC554', '#40E792', '#26A7FF', '#48D6FF', '#888FA7'])

    const getColor = (index) => {
      if (index > 3) {
        return colorArray.value[4];
      } else {
        return colorArray.value[index];
      }
    };

    const getCls = (index) => {
      if (index > 3) {
        return 'cls3';
      } else {
        return 'cls' + index;
      }
    };
    // 设置标题
    const setTitle = (val) => {
      title.value = val
    };
    const setRanking = (val) => {
      console.log('asdasdasdasd')
      title.value = val
    };

    return {
      title,
      setTitle,
      data,
      setRanking,
      getColor,
      getCls
    }
  }
};
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

.float-title {
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.float-title-right {
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #b1d8ff;
  border-radius: 50%;
  border: 1px solid #b1d8ff;
}

.warn-div {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.32);
  /* margin-top: 6px; */
  position: relative;
  /* display: flex; */
}

.warn-progress {
  position: relative;
  background-color: rgba(0, 0, 0, 0.32);
}
</style>
<style>
.sapn-box .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #888fa7, #4b5575) !important;
}

.sapn-box .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}

.sapn-box0 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #ffc554, #ffa800) !important;
}

.sapn-box0 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}

.sapn-box1 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #40e792, #2ec478) !important;
}

.sapn-box1 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}

.sapn-box2 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #26a7ff, #0066ff) !important;
}

.sapn-box2 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}

.sapn-box3 .el-progress-bar__inner {
  position: relative;
  border-radius: 0;
  background-image: linear-gradient(to right, #48d6ff, #0eacda) !important;
}

.sapn-box3 .el-progress-bar__outer {
  background-color: #f3f6f9 !important;
  border-radius: 0px;
}

.isActive {
  top: 0 !important;
}
</style>
