<template>
  <div class="industry">
    <!--左侧三部分-->
    <div class="industry-all">
      <div class="industry-list" v-for="(item,index) in data" :key="index">
        <div>
          <span>{{ item.name }}</span>
          <span  style="color: #0f8fe8; font-size: 24px">{{ item.num }}</span>
        </div>
        <div>
          <span style="text-shadow: none; color: #6D86A2;">占比</span>
          <span  style="color: #a7bfde;">{{ item.effect }}</span>
        </div>
        <div class="progress-bar-line">
          <el-progress :show-text=false :percentage="item.line"></el-progress>
        </div>
      </div>
    </div>
    <!--图像转动-->
    <div class="industry-circle"></div>
    <P class="industry-circle-word">行业分布</P>
    <!--导向线-->
    <div class="industry-line">
      <div class="industry-line-list industry-line-one">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-two">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-three">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-fore">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-five">
        <span></span>
      </div>
      <div class="industry-line-list industry-line-six">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
    import {ref} from '@vue/reactivity';
    export default {
        name: "Industry",
        setup(){
            let data = ref([

            ]);
            /** 设置data */
            const setValue = val => {
                data.value = val
            };
            return {
                setValue,
                data
            }
        }
    }
</script>

<style scoped>
  .industry{
    width: 100%;
    max-width: 731px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }
  .industry-circle{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 192px;
    height: 192px;
    background: url("../../../public/assets/images/circle.png") no-repeat center;
    background-size: cover;
    animation:mymove 3s linear infinite;
    z-index: 10;
  }
  @keyframes  mymove{
    0%{
      transform: rotateZ(180deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }
  .industry-circle-word {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    font-size: 14px;
    color: #fff;
  }
  .industry-list{
    width: 145px;
    height: 60px;
    background: rgb(13,20,32);
    overflow: hidden;
    padding: 5px 10px;
    margin-top: 10px;
  }
  .industry-list span:first-child{
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    text-shadow: 0px 0px 6px #26A7FF;
  }
  .industry-list span:last-child{
    float: right;
    margin-right: 0px;
    font-size: 19px;
    line-height: 22px;
    color: #FFFFFF;
  }
  .industry-list .progress-bar-line {
    display: block!important;
    margin-top: 4px;
  }
  .industry-list>div{
    display: flex;
    justify-content: space-between;
    line-height: 22px;
    margin-top: 5px;
  }
  .industry-all{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .industry-all .industry-list:nth-child(2n){
    margin-left: 370px;
  }
  .industry-line{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    width: 420px;
    height: 100%;
  }
  .industry-line-list{
    height: 4px;
    background: #182535;
    position: absolute;
  }
  .industry-line-one{
    top: 75px;
    left: 0;
    width: 130px;
    transform: rotateZ(25deg);
  }
  .industry-line-two{
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 110px;
  }
  .industry-line-three{
    bottom: 75px;
    left: 0;
    width: 130px;
    transform: rotateZ(-25deg);
  }
  .industry-line-fore{
    top: 75px;
    right: 0;
    width: 130px;
    transform: rotateZ(155deg);
  }
  .industry-line-five{
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 110px;
    transform: rotateZ(180deg);
  }
  .industry-line-six{
    bottom: 75px;
    right: 0;
    width: 130px;
    transform: rotateZ(-155deg);
  }
  .industry-line-list span{
    position: absolute;
    right: 0;
    top: 0;
    width: 14px;
    height: 4px;
    background: url("../../assets/common/bg-color.png") no-repeat center;
    background-size: cover;
  }
  .industry-line-one span,.industry-line-three span,.industry-line-fore span,.industry-line-six span{
    animation:myline 3s linear infinite;
  }
  .industry-line-two span,.industry-line-five span{
    animation:mylines 3s linear infinite;
  }
  @keyframes myline{
    0%{
      transform: translateX(0px);
    }
    100%{
      transform: translateX(-120px);
    }
  }
  @keyframes mylines {
    0%{
      transform: translateX(0px);
    }
    100%{
      transform: translateX(-100px);
    }
  }
</style>
