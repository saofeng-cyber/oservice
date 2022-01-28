<template>
  <div
    class="container ranlist"
    style="width: 100%; height: 100%; position: relative"
  >
    <el-row
      :gutter="20"
      type="flex"
      justify="center"
    >
      <el-radio-group
        v-model="quarter"
        size="small"
        @change="quarterChange"
      >
        <el-radio-button
          :label="item"
          v-for="(item,index) in quarterList"
          :key="index"
        ></el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row
      @click="$emit('getTableData')"
      style="height: calc(100% - 50px);overflow-y: auto;"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="排名"
          width="80"
        >
          <template v-slot="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="区域"
          width="80"
        >
          <template v-slot="scope">
            <span>{{ scope.row.SHOWNAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务开通">
          <template v-slot="scope">
            <span>{{ scope.row['OPEN_SATISFACTION'+showIndex] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务可靠">
          <template v-slot="scope">
            <span>{{ scope.row['COMPLAINT_SATISFACTION'+showIndex] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="故障处理">
          <template v-slot="scope">
            <span>{{ scope.row['FAULT_SATISFACTION'+showIndex] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
export default {
  props: ["tableData", "tableHeigh"],

  setup (props) {
    let tableHeight = ref(80);
    console.log("props", props);
    if (props.tableHeigh) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      tableHeight.value = props.tableHeigh
    }

    var year = new Date().getFullYear()
    var currMonth = new Date().getMonth() + 1
    var currQuarter = Math.floor((currMonth % 3 == 0 ? (currMonth / 3) : (currMonth / 3 + 1)));
    let quarterList = ref([]);
    let quarter = ref('');
    let showIndex = ref('1');
    for (var i = 1; i <= currQuarter; i++) {
      var name = year + '-第' + i + '期TOP分析';
      quarterList.value.push(name);
      if (i == 1) {
        quarter.value = name
      }
    }

    const quarterChange = () => {
      let s = quarter.value.substring(quarter.value.indexOf('-第') + 2, quarter.value.indexOf('期TOP分析'));
      showIndex.value = s;
      props.tableData.sort(function (a, b) { return b['OPEN_SATISFACTION' + s] - a['OPEN_SATISFACTION' + s] });
    }
    onMounted(() => {
    })
    return {
      tableHeight,
      quarterList,
      quarter,
      showIndex,
      quarterChange
    };
  }
};
</script>

<style scoped>
.el-row {
  padding: 10px 0;
}
.el-button {
  min-height: 30px;
  padding: 8px 20px;
  font-weight: 600;
}
.el-table {
  --el-table-background-color: none !important;
  --el-table-border: none;
  --el-table-row-hover-background-color: none;
  /* overflow: hidden; */
}
.el-row[data-v-687436a9] {
  --el-color-white: rgba(0, 0, 0, 0);
}
.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: rgb(40, 90, 110);
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 0px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  display: none;
}
.el-table--scrollable-y ::-webkit-scrollbar {
  display: none;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 0px;
}
.el-table .el-table__body tr:hover td {
  border: 1px solid rgb(40, 90, 110);
}
.class_1 {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(104, 74, 10);
}
.class_2 {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(23, 87, 63);
}
.class_3 {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(9, 48, 112);
}
.class_4 {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(47, 98, 115);
}
.class_5 {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(60, 80, 100);
}
.tbody:nth-child(1):nth-child(1):nth-child(1):nth-child(1) {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(104, 74, 10);
}
.ranking:nth-child(2) {
  display: block;
  width: 16px;
  height: 18px;
  background-color: rgb(23, 87, 63);
}
</style>