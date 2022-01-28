<template>
  <div class="content" style="width: 100%; height: 100%;max-width:760px;margin:0 auto">
    <!-- 标签 -->
    <div class="content-label">
      <i class="el-icon-caret-right"></i>
      <span style="padding: 4px">信息查询</span>
    </div>
    <!-- 输入框 -->
    <div class="content-search">
      <div style="float: left; padding-top: 3px; width: 25%">
        <el-form :inline="true">
          <el-select v-model="data.keywords" placeholder="省份">
            <el-option
              :label="item.nane"
              :value="item.value"
              :key="index"
              v-for="(item, index) in province"
            ></el-option>
          </el-select>
        </el-form>
      </div>
      <div style="float: left; padding-top: 3px; width: 35%; margin-left: 1%">
        <el-form :inline="true">
          <el-select v-model="datas.keywords" placeholder="客户模糊查询">
            <el-option label="客户模糊查询" value="客户模糊查询"></el-option>
            <el-option label="客户精准查询" value="客户精准查询"></el-option>
          </el-select>
        </el-form>
      </div>
      <div style="float: right; width: 38%">
        <el-input v-model="data.input" placeholder="请输入 . . ."></el-input>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="content-btn">
      <div class="btn-search" style="float: left" @click="getQuery(1)">
        <i class="el-icon-search"></i>
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
    let data = ref({ keywords: "", input: "" });
    let datas = ref({ keywords: "", input: "" });
    let province = ref([
      { nane: "北京", value: "bj" },
      { nane: "天津", value: "tj" },
      { nane: "上海", value: "sh" },
      { nane: "重庆", value: "cq" },
      { nane: "河北", value: "hb" },
      { nane: "山西", value: "sx" },
      { nane: "辽宁", value: "ln" },
      { nane: "吉林", value: "jl" },
      { nane: "黑龙江", value: "hlj" },
      { nane: "江苏", value: "js" },
      { nane: "浙江", value: "zj" },
      { nane: "安徽", value: "ah" },
      { nane: "福建", value: "fj" },
      { nane: "江西", value: "jx" },
      { nane: "山东", value: "sd" },
      { nane: "河南", value: "hn" },
      { nane: "湖北", value: "hb" },
      { nane: "湖南", value: "hn" },
      { nane: "广东", value: "gd" },
      { nane: "海南", value: "hn" },
      { nane: "四川", value: "sc" },
      { nane: "贵州", value: "gz" },
      { nane: "云南", value: "yn" },
      { nane: "陕西", value: "sx" },
      { nane: "甘肃", value: "gs" },
      { nane: "青海", value: "qh" },
      { nane: "台湾", value: "tw" },
      { nane: "内蒙古", value: "nmg" },
      { nane: "广西", value: "gx" },
      { nane: "宁夏", value: "nx" },
      { nane: "新疆", value: "xj" },
      { nane: "香港", value: "xg" },
      { nane: "澳门", value: "am" },
    ]);
    /** 请求接口, 返回数据 */
    const getQuery = (val) => {
      // 输入的条件
      if (val === 1) {
        context.emit("searchShow", {
          condition: data.value,
          dialogVisible: true,
        });
      } else {
        context.emit("searchShow", true);
      }
    };
    return {
      data,
      datas,
      getQuery,
      province,
    };
  },
};
</script>
<style>
.content .content-search > div .el-input__inner {
  border: 2px solid #285267;
  height: 35px;
  background-color: #111d30;
}
.content .content-search > div .el-select__popper.el-popper[role="tooltip"] {
  background: red;
}
</style>
<style scoped>
.content {
  display: -webkit-flex;
  color: #ffffff;
}

.content > div {
  float: left;
}

.content .content-label {
  position: relative;
  margin-left: 10px;
  color: #ffffff;
  font-size: 16px;
  padding: 15px;
  padding-left:0;
  text-align: center;
  text-shadow: 0px 0px 10px #26a7ff;
}
.content .content-label::before {
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

.content .content-search {
  position: relative;
  width: 560px;
  display: flow-root;
  margin: 7px 15px;
}
.content .content-btn {
  display: flow-root;
}
/*事件*/
.btn-search{
  cursor: pointer;
}
.btn-search:hover {
  color: #aa8383;
}
.btn-history:hover {
  color: #aa8383;
}
.content .content-btn > div {
  margin: 10px 4px;
}
.content .content-btn > div:first-child {
  border: 2px solid #328597;
  height: 30px;
  width: 27px;
  text-align: center;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  background-image: linear-gradient(#347489, #0e1d32);
}
.content .content-btn > div:last-child {
  border: 2px solid #415770;
  height: 30px;
  width: 27px;
  text-align: center;
  line-height: 31px;
  border-radius: 3px 3px 3px 3px;
  background-color: #1a2942;
}
</style>
