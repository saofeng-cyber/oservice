<template>
  <div
    style="width: 100%; height: 100%"
    class="form-condition"
  >
    <div class="search-header">
      <div class="header-left">
        <div class="search-first">
          <ul style="position: relative">
            <li>
              <div>全部</div>
            </li>
            <li>
              <div>金牌</div>
            </li>
            <li>
              <div>银牌</div>
            </li>
            <li>
              <div>铜牌</div>
            </li>
          </ul>
        </div>
        <div class="search-second">
          <div>
            <img src="../../assets/icons/shaixuan.png">
          </div>
          <div>筛选</div>
          <div>
            <img
              src="../../assets/icons/xiangxia.png"
              width="20px"
              height="21px"
            >
          </div>
        </div>
        <div class="search-third">
          <el-input
            v-model="input"
            placeholder="请输入. . ."
          ></el-input>
        </div>
      </div>
      <div class="header-right">
        <div class="header-right-button">
          <i class="el-icon-download"></i>
          导出
        </div>
        <div class="header-right-button">
          <i class="el-icon-s-operation"></i>
          配置列管理
        </div>
      </div>
    </div>
    <div class="form-content">
      <el-form label-width="100px">
        <el-row
          v-for="(formType, indexs) in formTypeArray"
          :key="indexs"
        >
          <el-col
            :span="span"
            v-for="(data, index) in formTypeArray[indexs]"
            :key="index"
          >
            <el-form-item :label="data.label">
              <!-- 输入框类型 -->
              <el-input
                v-if="data.type == 'input'"
                v-model="formTypeArray[indexs][index].value"
                :placeholder="data.placeholder"
              ></el-input>
              <!-- 时间类型 -->
              <el-date-picker
                popper-class="date-style"
                v-if="data.type == 'date'"
                type="date"
                :placeholder="data.placeholder"
                v-model="formTypeArray[indexs][index].value"
              ></el-date-picker>
              <!-- 下拉框类型 -->
              <el-select
                :popper-append-to-body="false"
                v-if="data.type == 'select'"
                v-model="formTypeArray[indexs][index].value"
                :placeholder="data.placeholder"
              >
                <el-option
                  v-for="(item, i) in data.option"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="span">
            <el-form-item label="">
              <div class="content-btn">
                <div
                  class="btn-search"
                  style="float: left"
                  @click="getCondition"
                >
                  <i class="el-icon-search"></i>搜索
                </div>
                <div
                  class="btn-clean"
                  style="float: left"
                  @click="cleanFormValue"
                >
                  清空
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>

</template>

<script>
import { inject, ref } from "@vue/runtime-core";
import { watchEffect } from "vue";

export default {
  name: "QueryCondition",
  emits: ["conditionParams"],
  setup (props, context) {
    let span = ref(6)
    // 定义表单类型配置         ----------不用了
    // let formTypeArray = ref([
    //   [
    //     {label: '流水号', type: 'input', placeholder: '请输入. . .', value: ''},
    //     {label: '宽带账号', type: 'input', placeholder: '请输入. . .', value: ''},
    //     {
    //       label: '工单状态',
    //       type: 'select',
    //       placeholder: '请选择',
    //       option: [{label: '第一项', value: '1'}, {label: '第二项', value: '2'}],
    //       value: ''
    //     },
    //     {
    //       label: '分公司',
    //       type: 'select',
    //       placeholder: '请选择',
    //       option: [{label: '第一项', value: '1'}, {label: '第二项', value: '2'}],
    //       value: ''
    //     }
    //   ],
    //   [
    //     {label: '受理员工号', type: 'input', placeholder: '请输入. . .', value: ''},
    //     {label: '流水号', type: 'date', placeholder: '请选择', value: ''},
    //   ]
    // ])
    let formTypeArray = ref(new Array())
    const formTypeConfig = inject("formTypeConfig");
    /**
     * 给父组件返回表单输入的内容
     */
    const getCondition = () => {
      context.emit('conditionParams', formTypeArray.value)
    }
    const cleanFormValue = () => {
      console.log('----------------------清空表单-------------')
      formTypeArray.value.forEach((e, index) => {
        for (let i = 0; i < e.length; i++) {
          formTypeArray.value[index][i].value = ''
        }
      })
      console.log(formTypeArray)
    }
    // 监听表单配置数据
    watchEffect(() => {
      console.log('-------监听formTypeConfig--------')
      console.log(formTypeConfig)
      setFormType(formTypeConfig, 4)
    })
    /**
     * 设置表单类型
     * @param array 表单配置
     * @param col 每行表单项个数
     */
    function setFormType (array, col) {
      if (col == null || col == '' || array == null || array == '') {
        col = 4 // 默认分4列
        console.log('--未定义--')
        // array = [
        //   {label: '流水号', type: 'input', placeholder: '请输入. . .', value: ''},
        //   {label: '宽带账号', type: 'input', placeholder: '请输入. . .', value: ''},
        //   {
        //     label: '工单状态',
        //     type: 'select',
        //     placeholder: '请选择',
        //     option: [{label: '第一项', value: '1'}, {label: '第二项', value: '2'}],
        //     value: ''
        //   },
        //   {
        //     label: '分公司',
        //     type: 'select',
        //     placeholder: '请选择',
        //     option: [{label: '第一项', value: '1'}, {label: '第二项', value: '2'}],
        //     value: ''
        //   },
        //   {label: '受理员工号', type: 'input', placeholder: '请输入. . .', value: ''},
        //   {label: '流水号', type: 'date', placeholder: '请选择', value: ''},
        //
      }
      span.value = 24 / col
      console.log('接受到的数据');
      console.log(array)
      console.log('-----------');
      // 只有一行
      if (col >= array.length) {
        formTypeArray.value.push(array)
      } else {
        // 超过一行
        let deb = col
        let i = 0
        while (i < array.length) {
          let item = [] //null
          while (i < deb) {
            item.push(array[i])
            console.log(deb)
            i++
          }
          formTypeArray.value.push(item)
          if (array.length - i < col) {
            deb = array.length
          } else {
            deb = i + col
          }
        }
      }
      console.log('---------初始化获取表单配置数据----------');
      console.log(formTypeArray.value);
      console.log('---------表单配置数据 SUCCESS----------');
    }
    return {
      formTypeArray, span, getCondition, cleanFormValue
    }
  }
}
</script>
<style>
.form-condition .el-input__inner {
  border: 2px solid #285267;
  height: 35px;
  background-color: #fff;
}
.form-condition .el-select-dropdown {
  background: #1f3758e0;
}
.form-condition .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #314665a1;
}
.date-style .el-picker__popper .date-style .el-popper .is-light .is-pure {
  background: #1f3758e0;
}
.date-style .el-picker-panel {
  background: #1f3758e0;
}
.search-third .el-input__inner {
  height: 36px;
}
.search-third .el-input {
  margin-top: -3px;
}
</style>
<style scoped>
.form-condition {
  border-radius: 3px 3px 3px 3px;
  background: #fff;
  padding-top: 16px;
  margin-bottom: 8px;
}
.form-condition .el-dialog__header {
  padding-top: 0px;
}

/*事件*/
.btn-search:hover {
  color: #aa8383;
  background: #2fce7c;
}

.btn-clean:hover {
  color: #aa8383;
}

.content-btn > div {
  margin-right: 16px;
}

.content-btn > div:first-child {
  border: 2px solid #328597;
  height: 28px;
  width: 69px;
  text-align: center;
  line-height: 28px;
  border-radius: 3px 3px 3px 3px;
  font-size: 10px;
  cursor: pointer;
}

.content-btn > div:last-child {
  border: 2px solid #415770;
  height: 28px;
  width: 69px;
  text-align: center;
  line-height: 28px;
  border-radius: 3px 3px 3px 3px;
  font-size: 10px;
  cursor: pointer;
}
.search-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 16px;
}
.search-first {
  float: left;
  border: 1px solid rgba(102, 226, 251, 1);
  border-radius: 5px 5px 5px 5px;
}
/* 搜索框 */
.search-first > ul {
  list-style: none;
  display: flow-root;
}
.search-first > ul li {
  float: left;
  margin: 3px 9px;
  line-height: 22px;
}
.search-first > ul li:not(:first-child)::after {
  content: "";
  width: 1px;
  height: 14px;
  background: linear-gradient(180deg, #b1d8ff 0%, rgba(177, 216, 255, 0) 100%);
  display: inline-block;
  position: absolute;
  top: 10px;
  margin: 0 -9px;
}
.search-first > ul li div {
  /*border: 2px solid #328597;*/
  height: 22px;
  width: 54px;
  text-align: center;
  line-height: 27px;
  /*border-radius: 3px 3px 3px 3px;*/
  /*background-image: linear-gradient(#347489, #0E1D32);*/
  font-size: 10px;
  cursor: pointer;
}
/* 选中*/
.search-first > ul li:first-child div {
  border: 1px solid #328597;
  height: 22px;
  width: 54px;
  text-align: center;
  line-height: 22px;
  border-radius: 2px;
  background-image: linear-gradient(
    180deg,
    rgba(102, 226, 251, 0.4) 0%,
    rgba(102, 226, 251, 0.4) 100%
  );
  font-size: 10px;
}
.header-right {
  display: flex;
  align-items: center;
}
.header-right-button {
  padding: 5px 10px;
  margin-right: 16px;
  background: linear-gradient(
    180deg,
    rgba(102, 226, 251, 0.4) 0%,
    rgba(102, 226, 251, 0) 100%
  );
  border-radius: 2px;
  border: 1px solid;
  font-size: 12px;
  cursor: pointer;
}
.search-second {
  display: flow-root;
  float: left;
  margin-top: 1px;
  height: 26px;
  border: 1px solid #21dde6;
  border-radius: 4px 4px 4px 4px;
  padding: 5px 4px 1px 7px;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
}
.search-second > div {
  float: left;
}
.search-second div:first-child img {
  width: 18px;
  height: 19px;
}
.search-second div:last-child img {
  width: 20px;
  height: 21px;
}
.search-third {
  float: left;
  margin-top: 1px;
}
.form-content {
  padding: 16px 16px 0;
}
</style>