<template>
  <div class="content-table" style="width: 100%">
    <el-table :data="tableData" row-class-name="row-style" header-row-class-name="row-style">
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column v-for="(head, index) in tableHeader" :key="index" :label="head.label" :prop="head.fieldName"
                       :sortable="head.sortable">
        <template #default="scope">
          <div :style="scope.row[head.fieldName].style">
            {{ scope.row[head.fieldName].value }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="60px" label="操作">
        <template #default="scope">
          <div class="btn-option" @click="submitData(scope)"><i class="el-icon-tickets"></i></div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next"
          :total="page.total"
          popper-class='select_bottom'
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {inject, reactive} from "@vue/runtime-core";
import {watchEffect} from "vue";

export default {
  name: "TableDialog",
  emits: ["tableMessage"],
  setup(props, context) {
    // 数据及配置
    // let tableData = reactive([
    //   {
    //     number: {value: 1, style: 'color: #dfe4e9;'},
    //     name: {value: 'Huzz', style: 'color: #dfe4e9; font-weight: 600;'},
    //     sex: {
    //       value: 'A',
    //       style: 'color: #F9A400;border: 2px solid #F9A400;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;'
    //     },
    //     option: {value: '金牌', style: 'color: #FFCE57;'},
    //     test1: {value: '昆明', style: 'color: #dfe4e9;'},
    //     test2: {value: '霍咏', style: 'color: #dfe4e9;'},
    //     test3: {value: 18345681564, style: 'color: #dfe4e9;'}
    //   },
    //   {
    //     number: {value: 2, style: 'color: #dfe4e9;'},
    //     name: {value: 'Huzz', style: 'color: #dfe4e9;font-weight: 600;'},
    //     sex: {
    //       value: 'B',
    //       style: 'color: #2DC277;border: 2px solid #2DC277;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;'
    //     },
    //     option: {value: '标准', style: 'color: #4CE2FF;'},
    //     test1: {value: '昆明', style: 'color: #dfe4e9;'},
    //     test2: {value: '霍咏', style: 'color: #dfe4e9;'},
    //     test3: {value: 18345681564, style: 'color: #dfe4e9;'}
    //   },
    //   {
    //     number: {value: 3, style: 'color: #dfe4e9;'},
    //     name: {value: 'Huzz', style: 'color: #dfe4e9; font-weight: 600;'},
    //     sex: {
    //       value: 'C',
    //       style: 'color: #0FD1FF;border: 2px solid #0FD1FF;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;'
    //     },
    //     option: {value: '银牌', style: 'color: #FFFFFF;'},
    //     test1: {value: '昆明', style: 'color: #dfe4e9;'},
    //     test2: {value: '霍咏', style: 'color: #dfe4e9;'},
    //     test3: {value: 18345681564, style: 'color: #dfe4e9;'}
    //   },
    //   {
    //     number: {value: 4, style: 'color: #dfe4e9;'},
    //     name: {value: 'Huzz', style: 'color: #dfe4e9; font-weight: 600;'},
    //     sex: {
    //       value: 'D',
    //       style: 'color: #FFFFFF;border: 2px solid #FFFFFF;width: 20%;text-align: center;border-radius: 5px 5px 5px 5px;'
    //     },
    //     option: {value: '铜牌', style: 'color: #FF9945;'},
    //     test1: {value: '昆明', style: 'color: #dfe4e9;'},
    //     test2: {value: '霍咏', style: 'color: #dfe4e9;'},
    //     test3: {value: 18345681564, style: 'color: #dfe4e9;'}
    //   },
    // ])
    let tableData = reactive([])
    let page = reactive({})
    // 表头配置
    // let tableHeader = reactive([
    //   {fieldName: 'number', lebel: '客户集团编号', order: true, width: '144px', sortable: true},
    //   {fieldName: 'name', lebel: '客户名称', order: true, width: '220px', sortable: true},
    //   {fieldName: 'sex', lebel: '客户等级', order: true, width: '160px', sortable: true},
    //   {fieldName: 'option', lebel: '客户服务', order: true, width: '130px', sortable: true},
    //   {fieldName: 'test1', lebel: '客户所在城市', order: true, width: '150px', sortable: true},
    //   {fieldName: 'test2', lebel: '客户业务联系人', order: true, width: '150px', sortable: true},
    //   {fieldName: 'test3', lebel: '客户业务联系人电话', order: true, width: '180px', sortable: true},
    // ])
    let tableHeader = reactive([])
    const tableHeaderConfig = inject("tableHeaderConfig");
    const tableDataConfig = inject("tableDataConfig");
    // 监听表单配置数据
    watchEffect(() => {
      console.log('-------监听tableHeaderConfig,tableDataConfig--------')
      tableHeader = tableHeaderConfig
      tableData = tableDataConfig ? tableDataConfig.tableData : []
      page = tableDataConfig ? tableDataConfig.page : {}
    })

    function submitData(scope) {
      context.emit('tableMessage', {page: page, scope: scope})
    }

    function handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      context.emit('tableMessage', {page: page, scope: null})
    }

    function handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      context.emit('tableMessage', {page: page, scope: null})
    }

    return {
      tableHeader, tableData, submitData, handleSizeChange, handleCurrentChange, page
    }
  }
}
</script>
<style scoped>
.content-table :deep(.el-table) {
  background: rgba(8, 11, 21, 0.48);
}
:deep(.row-style) {
  background: rgba(8, 11, 21, 0.48);
}
:deep(.el-table::before) {
  height: 0;
}
.content-table :deep(.el-table th.el-table__cell) {
  background: rgba(8, 11, 21, 0.48);
  border-bottom: rgba(8, 11, 21, 0.48);
}


.content-table .el-table tr {
  background-color: #202c5d00;
  font-size: 10px;
}

.content-table :deep(.el-table td.el-table__cell) {
  border-bottom: rgba(8, 11, 21, 0.48);
}
.content-table :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #131A2B;
  border-bottom: rgba(8, 11, 21, 0.48);
}

.content-table :deep(.el-checkbox__inner) {
  background-color: #12203c2b;;
}
.pagination {
  margin-top: 16px;
  text-align: right;
}
.pagination :deep(.el-input__inner) {
  border: 2px solid #285267;
  height: 32px;
  background-color: #111D30;
  color: #B1D8FF;
}

.pagination :deep(.el-pager li) {
  border: 1px solid #285267;
  height: 30px;
  color: #B1D8FF;
  background-color: #111D30;
}
.pagination :deep(.el-pager li.active) {
  background: linear-gradient(180deg, rgba(102, 226, 251, 0.4) 0%, rgba(102, 226, 251, 0) 100%);;
}

.pagination :deep(.el-pagination .btn-prev) {
  background-color: #111D30;
  height: 30px;
  color: #B1D8FF;
  border: 1px solid rgba(177, 216, 255, 0.4);
}
.pagination :deep(.el-pagination .btn-next) {
  background-color: #111D30;
  height: 30px;
  color: #B1D8FF;
  border: 1px solid rgba(177, 216, 255, 0.4);
}
:deep(.el-pagination__total) {
  color: #B1D8FF;
}
.select_bottom :deep(.el-select-dropdown__item.selected) {
  color: #606266;
  background: #1f3758e0;
  border: 1px solid #517ca5
}

.select_bottom :deep(.el-select-dropdown) {
  background-color: #1f3758e0;
}
.btn-option {
  font-size: 22px;
  color: #78b7b1;
  text-shadow: 0px 0px 1px #26A7FF;
  cursor: pointer;
}
</style>