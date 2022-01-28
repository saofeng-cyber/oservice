<template>
    <div
        class="content-table"
        style="width: 100%"
    >
        <el-table
            :data="TableData"
            row-class-name="row-style"
            header-row-class-name="row-style"
        >
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column
                v-for="(head, index) in TableHeader"
                :key="index"
                :label="head.label"
                :prop="head.fieldName"
                :sortable="head.sortable"
            >
                <template #default="scope">
                    <div>
                        {{ scope.row[head.fieldName].value }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">状态切换</el-button>
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
    name: "TableDialogLightFg",
    emits: ["tableMessage"],
    props: {
        TableData: [],
        TableHeader: []
    },
    setup(props, context) {
        // 数据及配置
        let tableData = reactive()
        // let tableData = reactive([])
        let page = reactive({})

        const tableDataConfig = inject("tableDataConfig");
        // 监听表单配置数据
        watchEffect(() => {
            console.log('-------监听tableHeaderConfig,tableDataConfig--------')
            //tableData = tableDataConfig ? tableDataConfig: []
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

        const handleEdit = (index,row) =>{
            console.log('sss')
            console.log(row.test3.value)

            if (row.test3.value == '显示'){
                row.test3.value = '隐藏'
            } else {
                row.test3.value = '显示'
            }
            context.emit('handleEdit',index)
        }

        return {
            tableData, submitData, handleSizeChange, handleCurrentChange, page,handleEdit
        }
    }
}
</script>
<style scoped>
.content-table :deep(.el-table) {
    background: #fff;
}

:deep(.row-style) {
    background: #fff;
    color: #000000;
}

:deep(.el-table::before) {
    height: 0;
}

.content-table :deep(.el-table th.el-table__cell) {
    background: #fafbfc;
    border-bottom: #ddd;
}

.content-table .el-table tr {
    background-color: #202c5d00;
    font-size: 10px;
}

.content-table :deep(.el-table td.el-table__cell) {
    border-bottom: #fff;
}

.content-table
:deep(.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td.el-table__cell) {
    background-color: #fafbfc;
    border-bottom: #ddd;
}

.content-table :deep(.el-checkbox__inner) {
    background-color: #12203c2b;
}

.pagination {
    margin-top: 16px;
    text-align: right;
}
</style>