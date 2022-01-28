<template>
  <div class="choice-city card-4-angle">
    <!-- 下拉选择框 -->
    <div class="choice-all">
      <!-- 下拉框选择 -->
      <div
        class="choice-select"
        v-for="(item, index) in choiceAll"
        :key="index"
      >
        <div class="choice-lable">{{ item.name }}</div>
        <el-select class="choice-value" v-model="value" placeholder="请选择">
          <el-option
            v-for="items in item.options"
            :key="items.value"
            :label="items.label"
            :value="items.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 搜索框按钮 -->
    <div class="content-btn">
      <div class="btn-search" @click="getQuery(1)">
        <i class="el-icon-search"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onMounted, inject } from "@vue/runtime-core";
export default {
  setup() {
    const $axios = inject("$axios");
    let choiceAll = ref();
    const getData = () => {
      $axios
        .post("/ser-govplat-comservice/api/rest/commService/v1/getData", {
          desc: "一户一案选择",
          spe: "5g",
          jsonFile: "onecase.json",
        })
        .then((res) => {
          choiceAll.value = res.data.choice;
        });
    };
    onMounted(() => {
      getData();
    });
    return {
      choiceAll,
      getData,
    };
  },
};
</script>
<style>
.choice-value .el-input__inner {
  border: 2px solid #285267;
  height: 35px;
  background-color: #111d30;
}
.choice-value .el-input__inner:hover {
  border-color: #285267 !important;
}
</style>
<style scoped>
.choice-city {
  width: 100%;
  max-width: 1000px;
  background-color: #0b1a2f;
  overflow: hidden;
  padding:10px 0;

}
.choice-all {
  margin-right: 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
}
.choice-select {
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  line-height: 35px;
}
.choice-lable {
  width: 40%;
  color: #fff;
  margin-right: 10px;
  text-align: right;
  color: #94acc5;
}
.choice-value {
  flex: 1;
}
.content-btn {
  float: right;
  border: 2px solid #328597;
  height: 30px;
  width: 27px;
  text-align: center;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  background-image: linear-gradient(#347489, #0e1d32);
  margin-top: -40px;
  margin-right: 10px;
}
.btn-search:hover {
  color: #aa8383;
}
</style>
