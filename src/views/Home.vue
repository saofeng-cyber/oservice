<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <router-link to="/5g/resourcevisualization" style="color: #fff">5G - 专题支撑 - 资源可视化</router-link>
    </div>
    <div>
      <router-link to="/5g/quality" style="color: #fff">5G - 专题支撑 - 质量可视化</router-link>
    </div>
    <div>
      <router-link to="/5g/satisfaction" style="color: #fff">5G - 专题支撑 - 满意度可视化</router-link>
    </div>
    <div>
      <router-link to="/5g/onecase" style="color: #fff">5G - 专题支撑 - 一户一案</router-link>
    </div>
    <div>
      <router-link to="/5g/visualization" style="color: #fff">5G - 专题支撑 - 流程可视化</router-link>
    </div>
    <div>
      <router-link to="/iot/satisfaction" style="color: #fff">物联网 - 专题支撑 - 满意度可视化</router-link>
    </div>
    <div>
      <router-link to="/cNet/quality" style="color: #fff">云网 - 专题支撑 - 质量可视化</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    components: {},
  };
</script>

<style scoped>
  .home {
    font-size: 25px;
    margin-left: 500px;
  }
</style>
