<template>
  <div class="card card-4-angle">
    <div
      class="card-list"
      v-for="(item, index) in cardList"
      :key="index"
      :class="{ cardActive: index == nowIndex }"
      @click="menuClick(index)"
    >
      <p>{{ item.number }}</p>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    let cardList = ref();
    let nowIndex = ref(0);
    const menuClick = (item) => {
      nowIndex.value = item;
    };
    const menuCard = (item) => {
      cardList.value = item;
    };
    onMounted(() => {
     
    });
    return {
      cardList,
      menuClick,
      nowIndex,
      menuCard
    };
  },
};
</script>
<style scoped>
.card {
  /* width: 100%; */
  padding: 0 15px;
  max-width: 1000px;
  background-color: #0b1a2f;
  overflow: hidden;
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
  overflow: hidden;
  padding-bottom: 15px;
  margin-top:20px
}

.card-list {
  width: 24%;
  background: #081322;
  margin-top: 15px;
  padding: 15px 0;
  cursor: pointer;
}
.card-list:not(:nth-child(4n)){
  margin-right:calc(4% / 3)
}
.card-list p {
  font-size: 16px;
  line-height: 16px;
  margin-left: 13px;
}
.card-list span {
  display: block;
  font-size: 14px;
  color: #a8c6e5;
  line-height: 14px;
  margin-top: 5px;
  margin-left: 13px;
}
.cardActive {
  background: linear-gradient(180deg, #145044, #1d8258);
}
.cardActive p {
  color: #fff !important;
}
.card-list:nth-child(2) p {
  color: #3298e0;
}
.card-list:nth-child(3) p {
  color: #acfcff;
}
.card-list:nth-child(4) p {
  color: #b79e6b;
}
.card-list:nth-child(5) p {
  color: #9d88f8;
}
.card-list:nth-child(6) p {
  color: #64c9e4;
}
.card-list:nth-child(7) p {
  color: #ecf9ff;
}
.card-list:nth-child(8) p {
  color: #84343b;
}
</style>
