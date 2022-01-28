<template>
    <div>
        <!-- <i @click="btnClickExport()" class="el-icon-download"></i> -->
    </div>
</template>

<script>
import {inject, onMounted} from '@vue/runtime-core'
import {ref} from '@vue/reactivity';
import XLSX from 'xlsx'

export default {
    name: 'ExcelExport',
    props: {
        TableDatas:{
            type: Array,
            default: () => {
                return []
            }
        },
        FileName:{
            type: String,
            default: () => {
                return ''
            }
        }
    },

    setup(props) {

        let type = ref(false);
        let title = ref('请设置标题')

        const btnClickExport = () =>{
            console.log('aaaaaaaaaaaaaaaaaa')
            // let obj = new Object();
            // obj["ProjectNo"] = this.projectNo;
            // obj["ProjectName"] = this.projectName;
            // obj["EasNo"] = this.easNo;
            // obj["EasName"] = this.easName;
            // obj["CashflowRemark"] = this.cashflowRemark;
            // this.reportsDataTitle.push();
            //
            // // this.reportsDataTitle =[] 数据格式在下面
            // var Title = this.reportsDataTitle;
            //
            // var Cash = this.reportsDataCash;//表格
            // var CashFlow = this.reportsDataFlow;//表格
            var wb = XLSX.utils.book_new();

            props.TableDatas.forEach(function (item,index) {
                let sheet = XLSX.utils.json_to_sheet(item.tableList);
                XLSX.utils.book_append_sheet(wb, sheet, item.sheetName);
            })

            // var sheet2 = XLSX.utils.json_to_sheet(props.data.tableDatas);
            // var sheet3 = XLSX.utils.json_to_sheet(props.data.tableDatas);
            // XLSX.utils.book_append_sheet(wb, sheet2, "Cash");
            // XLSX.utils.book_append_sheet(wb, sheet3, "Cashflow");
            const workbookBlob = workbook2blob(wb);

            //获取当前时间
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var hours = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            var nowDate = year.toString() + month.toString() + day.toString() + hours.toString() + minute.toString() + second.toString();

            openDownloadDialog(workbookBlob, props.FileName+ '_' + nowDate + '.xlsx');

        }

        const workbook2blob = (workbook) =>{
            // 生成excel的配置项
            var wopts = {
                // 要生成的文件类型
                bookType: "xlsx",
                // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                bookSST: false,
                type: "binary"
            };
            var wbout = XLSX.write(workbook, wopts);
            // 将字符串转ArrayBuffer
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
                return buf;
            }
            var blob = new Blob([s2ab(wbout)], {
                type: "application/octet-stream"
            });
            return blob;

        }

        const openDownloadDialog =(blob,fileName)=>{
            if (typeof blob == "object" && blob instanceof Blob) {
                blob = URL.createObjectURL(blob); // 创建blob地址
            }
            var aLink = document.createElement("a");
            aLink.href = blob;
            // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file///模式下不会生效
            aLink.download = fileName || "";
            var event;
            if (window.MouseEvent) event = new MouseEvent("click");
            //   移动端
            else {
                event = document.createEvent("MouseEvents");
                event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);

        }

        onMounted(() => {
        })

        return {
            title,type,btnClickExport,workbook2blob,openDownloadDialog
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
}

.float-title {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 24px;
    text-shadow: 0px 0px 6px #26A7FF;
}

.float-title-right {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #B1D8FF;
    border-radius: 50%;
    border: 1px solid #B1D8FF;
    z-index: 1;
}
</style>