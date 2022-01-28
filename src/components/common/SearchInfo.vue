<template>
  <div class="content-search-info" style="width: 100%; height: 100%">
    <!-- 标签 -->
    <div class="content-label">
      <i class="el-icon-caret-right"></i>
      <span style="padding: 4px">信息查询</span>
    </div>
    <!-- 输入框 -->
    <div class="content-search">
      <div style="float: left; padding-top: 3px; width: 32%">
        <el-form :inline="true">
          <el-select :popper-append-to-body="false" v-model="data.keywords">
            <el-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form>
      </div>
      <div style="float: right; width: 65%">
        <el-input v-model="data.input" placeholder="请输入 . . ."></el-input>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="content-btn">
      <div class="btn-search" style="float: left" @click="getQuery(1)">
        <i class="el-icon-search"></i>
      </div>
      <div class="btn-history" style="float: right" @click="getQuery(2)">
        <i class="el-icon-tickets"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";

export default {
  name: "SearchInfo",
  emits: ["searchShow"],
  setup(props, context) {
    let data = ref({ keywords: "客户", input: "" });
    let selectOptions = ref([{ label: "客户", value: "客户" }]);
    /** 弹框 */
    const getQuery = (val) => {
      // 输入的条件
      if (val === 1) {
        context.emit("searchShow", {
          condition: data.value,
          dialogVisible: true,
        });
      } else {
        context.emit("searchShow", true, { condition: data.value });
      }
    };
    const setSelectOptions = (val) => {
      selectOptions.value = val;
    };
    const setSelectInitOption = (val) => {
      data.value.keywords = val;
    };

    return {
      data,
      getQuery,
      selectOptions,
      setSelectOptions,
      setSelectInitOption,
    };
  },
};
</script>
<style>
.content-search-info .content-search > div .el-input__inner {
  border: 2px solid #285267;
  height: 35px;
  background-color: #111d30;
  color: #7995b0;
}
.content-search-info .el-select-dropdown {
  background: #1f3758e0;
}
.content-search-info .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #314665a1;
}
</style>
<style scoped>
.content-search-info {
  display: -webkit-flex;
  color: #ffffff;
}

.content-search-info > div {
  float: left;
}

.content-search-info .content-label {
  position: relative;
  margin-left: -10px;
  color: #ffffff;
  font-size: 16px;
  padding: 15px;
  text-align: center;
  text-shadow: 0px 0px 10px #26a7ff;
}
.content-search-info .content-label::before {
  position: absolute;
  top: 35%;
  bottom: 35%;
  right: 0;
  width: 0.5px;
  height: 30%;
  border-left: 2px solid #a6e4e4;
  box-shadow: 0px 0px 10px #7e8b95;
  content: "";
}

.content-search-info .content-search {
  position: relative;
  width: 65%;
  display: flow-root;
  margin: 7px 15px;
}
.content-search-info .content-btn {
  display: flow-root;
}
/*事件*/
.btn-search:hover {
  color: #aa8383;
}
.btn-history:hover {
  color: #aa8383;
}
.content-search-info .content-btn > div {
  margin: 10px 4px;
  cursor: pointer;
}
.content-search-info .content-btn > div:first-child {
  border: 2px solid #328597;
  height: 30px;
  width: 27px;
  text-align: center;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  background-image: linear-gradient(#347489, #0e1d32);
}
.content-search-info .content-btn > div:last-child {
  border: 2px solid #415770;
  height: 30px;
  width: 27px;
  text-align: center;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  background-color: #1a2942;
}
</style>