<template>
  <div class="usercard">
    <!--顶部icon图标-->
    <div class="usercard-top">
      <div class="float-title">
        <i class="el-icon-caret-right"></i>
        {{ title }}
      </div>
      <div class="float-title-right" @click="$emit('selfRefresh')">
        <i class="el-icon-refresh"></i>
      </div>
    </div>
    <!--底部排行-->
    <div class="user-ranking">
      <!--左边前3-->
      <div class="user-ranking-left" v-if="listData">
        <!--金牌-->
        <div class="user-ranking-list">
          <!--奖牌图标-->
          <div class="user-ranking-gold user-ranking-gold1"></div>
          <!--公司icon-->
          <div class="user-ranking-icon user-ranking-icon1"></div>
          <div class="user-ranking-detail user-ranking-detail1">
            <p>{{listData[0].title}}</p>
            <span>{{listData[0].num}}</span>
          </div>
        </div>
        <!--银牌-->
        <div class="user-ranking-list">
          <!--奖牌图标-->
          <div class="user-ranking-gold user-ranking-gold2"></div>
          <!--公司icon-->
          <div class="user-ranking-icon user-ranking-icon2"></div>
          <div class="user-ranking-detail user-ranking-detail2">
            <p>{{listData[1].title}}</p>
            <span>{{listData[1].num}}</span>
          </div>
        </div>
        <!--铜牌-->
        <div class="user-ranking-list">
          <!--奖牌图标-->
          <div class="user-ranking-gold user-ranking-gold3"></div>
          <!--公司icon-->
          <div class="user-ranking-icon user-ranking-icon3"></div>
          <div class="user-ranking-detail user-ranking-detail3">
            <p>{{listData[2].title}}</p>
            <span>{{listData[2].num}}</span>
          </div>
        </div>
      </div>
      <!--右边无缝滚动-->
      <div class="marquee-wrap" id="scroll-box" @mouseout="moveOut" @mouseover="moveOver">
        <ul class="marquee-list" id="scroll-list">
          <li v-for="(item, index) in listData" :key="index">
            <div class="marquee-list-number">
              <p>{{item.rank}}</p>
            </div>
            <span>{{item.title}}</span>
            <em>{{item.num}}</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import {ref} from '@vue/runtime-core'
    import {getCurrentInstance} from 'vue';
    import {onMounted,onUnmounted} from '@vue/runtime-core';
    export default {
        name: "UserCard",
        setup() {
            const {proxy} = getCurrentInstance();
            let title = ref('用户开卡数TOP排行');
            let listData = ref();
            let timer =  ref('null');
            /** 设置data */
            const setValue = val => {
                listData.value = val
            };
            // 无缝轮播滚动事件
            const movelist=()=>{
                var area = document.getElementById('scroll-box');
                var con1 = document.getElementById('scroll-list');
                var cloned = con1.cloneNode(true);
                area.appendChild(cloned)
            };
            // 无缝轮播滚动事件
            const move= () =>{
                var area = document.getElementById('scroll-box');
                var con1 = document.getElementById('scroll-list');
                if (area.scrollTop >= con1.offsetHeight) {
                    area.scrollTop = 0;
                } else {
                    area.scrollTop++
                }
            };
            // 移入事件
            const moveOver=()=>{
                clearInterval(proxy.timer);
            };
            // 移出事件
            const moveOut=()=>{
                proxy.timer = setInterval(proxy.move, 50);
            };
            onMounted(()=>{
                setTimeout(proxy.movelist, 1500);
                proxy.timer = setInterval(proxy.move, 50);

            });
            // 离开页面销毁定时器
            onUnmounted(()=>{
                clearTimeout(proxy.timer)
                proxy.timer = null;
            });
            return {
                title,
                setValue,
                listData,
                timer,
                move,
                movelist,
                moveOver,
                moveOut
            }
        },
    }
</script>

<style scoped>
  .usercard {
    width: 100%;
    max-width: 770px;
    height: 100%;
    margin: 0 auto;
  }

  .usercard-top {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .float-title {
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 24px;
    text-shadow: 0px 0px 6px #26A7FF;
  }

  .float-title-right {
    font-size: 14px;
    font-weight: 500;
    color: #B1D8FF;
    border-radius: 50%;
    border: 1px solid #B1D8FF;
    width: 14px;
    height: 16px;
  }

  .user-ranking {
    width: 100%;
    max-width: 731px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .user-ranking-left {
    width: 40%;
  }

  .user-ranking-list {
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    padding: 10px 0;
    background: #0a0f1a;
  }

  .user-ranking-gold {
    width: 17px;
    height: 23px;
    float: left;
    margin-left: 10px;
    margin-top: 16px;
    background-size: cover;
  }

  .user-ranking-gold1 {
    background: url("../../assets/common/gold1.png") no-repeat center;
  }

  .user-ranking-gold2 {
    background: url("../../assets/common/gold2.png") no-repeat center;
  }

  .user-ranking-gold3 {
    background: url("../../assets/common/gold3.png") no-repeat center;
  }

  .user-ranking-icon {
    float: left;
    margin-left: 10px;
    width: 33px;
    height: 39px;
    margin-top: 5px;
    background-size: cover;
  }

  .user-ranking-icon1 {
    background: url("../../assets/common/bank1.png") no-repeat center;
  }

  .user-ranking-icon2 {
    background: url("../../assets/common/bank2.png") no-repeat center;
  }

  .user-ranking-icon3 {
    background: url("../../assets/common/bank3.png") no-repeat center;
  }

  .user-ranking-detail {
    float: left;
    margin-left: 10px;
  }

  .user-ranking-detail p {
    font-size: 14px;
    color: #fff;
    line-height: 14px;
    margin-top: 10px;
  }

  .user-ranking-detail span {
    display: block;
    font-size: 14px;
    line-height: 14px;
    margin-top: 5px;
  }

  .user-ranking-detail1 span {
    color: gold;
  }

  .user-ranking-detail2 span {
    color: #9fc1e3;
  }

  .user-ranking-detail3 span {
    color: #6efcff;
  }
  .marquee-wrap  {
    width: 58%;
    height: 210px;
    overflow: hidden;
  }
  .marquee-list li {
    width: 100%;
    height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 20px;
    list-style: none;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-weight: 400;
    background: #0a0f1a;
    margin-bottom: 14px;
  }
  .marquee-list-number{
    width:60px;
    height: 100%;
    float: left;
  }
  .marquee-list li p{
    float: left;
    font-size: 14px;
    line-height: 14px;
    padding: 3px 5px;
    background: #3f4e63;
    color: #fff;
    margin-left: 10px;
    margin-top: 10px;
  }
  .marquee-list li span{
    display: block;
    height: 100%;
    float: left;
    margin-left: 10px;
    font-size: 14px;
    color: #fff;
    line-height: 40px;
  }
  .marquee-list li em{
    display: block;
    float: right;
    font-size: 14px;
    font-style: normal;
    color: #fff;
    line-height: 40px;
    margin-right: 20px;
    padding-right: 20px;
  }
</style>
