<template>
  <div class="container ranlist" style="width: 100%; height: 100%; position: relative">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="6">
        <el-button>2021一期TOP分析</el-button>
      </el-col>
      <el-col :span="6">
        <el-button> 2021二期TOP分析</el-button>
      </el-col>
      <el-col :span="6">
        <el-button>2021三期TOP分析</el-button>
      </el-col>
    </el-row>
    <el-row @click="$emit('getTableData')">
      <el-table
        :data="tableData"
        :height="tableHeight"
        style="width: 100%"
        :header-cell-style="headStyle"
        :cell-style="cellstyle"
        :row-style="rowstyle"
      >
        <el-table-column label="排名" width="80" class="ranking">
          <template v-slot="scope">
            <span
              :class="`class_${
                scope.row.ranking < '5' ? scope.row.ranking : '5'
              }`"
              >{{ scope.row.ranking }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="province" label="区域" width="80">
        </el-table-column>
        <el-table-column prop="open" label="业务开通"> </el-table-column>
        <el-table-column prop="reliable" label="业务可靠"> </el-table-column>
        <el-table-column prop="handle" label="故障处理"> </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
export default {
  props: ["tableData","tableHeigh"],

  setup(props) {
    let oneclass = ref(false);
    let twoclass = ref(false);
    let threeclass = ref(false);
    let fourclass = ref(false);
    let otherclass = ref(false);
    let timer = ref("");
    let tableHeight = ref(80);
    console.log("props",props);
    if(props.tableHeigh){
      // eslint-disable-next-line vue/no-setup-props-destructure
      tableHeight.value = props.tableHeigh
    }
    // const setTableH = (val) => {
    //   tableHeight.value = val;
    // };

    onMounted(()=>{
      // setTableH()
    })
    return {
      oneclass,
      twoclass,
      threeclass,
      fourclass,
      otherclass,
      timer,
      props,
      tableHeight,
      // setTableH,
      //  tableData,
      //  settableData,
    };
  },
  methods: {
    headStyle() {
      return "text-align:center; background:rgb(10, 20, 30);border-top:rgb(40, 90, 110);";
    },
    cellstyle({ column,}) {
      if (column.property === "reliable" || column.property === "handle") {
        return "color: rgb(40, 200, 130);text-align:center;  background:rgb(10, 20, 30);";
      }
      if (column.property === "province" || column.property === "open") {
        return "color: rgb(100, 190, 220);text-align:center;  background:rgb(10, 20, 30);";
      } else {
        return "text-align:center;  background:rgb(10, 20, 30); display: flex; justify-content: center; height:47px" ;
      }
    }, 
  },
  // created() {
  // setTimeout(this.movelist, 1500);
  // this.timer = setInterval(this.move, 500);
  // },

  // methods: {
  // //鼠标移入列表停止滚动
  // moveOver() {
  //   clearTimeout(this.timer);
  // },
  // //鼠标移出列表滚动
  // moveOut() {
  //   this.timer = setInterval(this.move, 50);
  // },
  // movelist() {
  //   let div = document.getElementsByClassName("el-table__body-wrapper")[0];
  //   let table = document.getElementsByClassName("el-table__body")[0];
  //   let cloned = table.cloneNode(true);
  //   div.appendChild(cloned);
  // },
  // move() {
  //   let div = document.getElementsByClassName("el-table__body-wrapper")[0];
  //   let table = document.getElementsByClassName("el-table__body")[0];
  //   if (div.scrollTop >= table.offsetHeight) {
  //     div.scrollTop = 0;
  //   } else {
  //     div.scrollTop++;
  //   }
  // },
  // isScroll() {
  //   let div = document.getElementsByClassName("el-table__body-wrapper")[0];
  //   this.addEvent(div, "mouseenter", function () {
  //     clearTimeout(this.timer);
  //     this.timer = null;
  //   });
  //   this.addEvent(div, "mouseleave", function () {
  //     setTimeout(this.movelist, 1500);
  //     this.timer = setInterval(this.move, 50);
  //   });
  // },
  // },

  // beforeUnmount() {
  //   clearTimeout(this.timer);
  //   this.timer = null;
  // },
};
</script>

<style scoped>
.el-row {
  padding: 10px 0;
}
.el-button {
  min-height: 30px;
  padding: 8px 20px;
  color: #fff;
  font-weight: 600;
  background-color: rgb(20, 35, 50);
  border-color: rgb(40, 90, 110);
}
.el-table {
  --el-table-background-color:none !important;
  --el-table-border: none;
  --el-table-row-hover-background-color: none;
  color: #fff;
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
  display: none
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