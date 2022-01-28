<template>
  <div class="chart-bg">
    <img class="map-bg" src="../../assets/map/Disk-A.png" alt="">
    <img class="map-bg" src="../../assets/map/Disk-B.png" alt="">
    <img class="map-bg" src="../../assets/map/Disk-C.png" alt="">
    <img v-if="region.id === '0'" class="map-nanhai" src="../../assets/map/MapShape.png" alt="">
    <div
      ref="chart"
      class="map-chart"
      @click="onBackClick"
    ></div>
    <div :class="region.id === '0' ? 'legend-group': 'legend-group-province'">
      <div v-for="(item, index) in legendList" :key="index">
        <span class="legend-icon" :style="{background: item.color}"></span>
        {{ item.label }}
      </div>
    </div>
    <div class="view-type">
      <div v-for="(name, index) in data.names" :key="index" class="view-item" @click="handleChangeView(name, index)">
        <img :src="require(`../../assets/map/${icons[index]}.png`)" alt="">
        <span>
          {{ name }}
        </span>
      </div>
    </div>
    <div v-if="false" class="menus">
      <div class="menu-button" @click="handleTriggerMenu">
        <i class="el-icon-menu"></i>
      </div>
      <div v-if="showMenuInfo" class="menu-group card-4-angle">
        <div class="menu-item" v-for="(item, index) in menuList" :key="index" @click="handleClickMenu(item)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    data: {
      type: Object,
      default: () => ({
        names: ['开通满意度', '故障满意度', '投诉满意度'],
        maxValues: [100, 600, 400], // 每项指标理论数据最大值
        info: [
          {
            id: '110000',
            value: [98, 45, 76],
          },
          {
            id: '370000',
            value: [34, 25, 57],
          },
          {
            id: '350000',
            value: [12, 78, 99],
          },
        ]
      })
    },
    curCard: { // 地图上方卡片名称，通过这个参数卡片与地图联动 取值为data.names的元素
      type: String,
      default: '',
    },
    menuList: {
      type: Array,
      default: () => ([
        { name: '集团客户', key: '1' },
        { name: '单客户信息查询', key: '2' },
        { name: 'DNN信息查询', key: '3' },
        { name: '5G产品实例', key: '4' },
        { name: '业务切片', key: '5' },
        { name: '网络切片', key: '6' },
      ])
    }
  },
  data () {
    return {
      region: { id: '0', name: '全国' },
      loadedMap: {},
      mapItems: {},
      mapData: [],
      otherMapData: [],
      centerDatas: {}, // 中心点经纬度
      charts: null,
      colors: [ // 严格按颜色顺序
        ['rgba(46, 196, 120, 0.8)', 'rgba(46, 196, 120, 0.4)', 'rgba(46, 196, 120, 1)'],
        ['rgba(14, 172, 218, 0.8)', 'rgba(14, 172, 218, 0.4)', 'rgba(14, 172, 218, 1)'],
        ['rgba(255, 168, 0, 0.8)', 'rgba(255, 168, 0, 0.4)', 'rgba(255, 168, 0, 1)'],
        ['rgba(0, 102, 255, 0.8)', 'rgba(0, 102, 255, 0.4)', 'rgba(0, 102, 255, 1)'],
      ], // 不同视图颜色
      icons: ['Green-Bar', 'LightBlue-Bar', 'Yellow-Bar', 'DarkBlue-Bar', 'Purple-Bar', 'Plain-Bar'], // 严格按颜色顺序
      viewIndex: 0, // 地图显示指标索引
      isMapClick: false,
      isMapDbllick: false,
      showMenuInfo: true,
      timer: null,
    }
  },
  computed: {
    legendList () {
      const maxValue = this.data.maxValues[this.viewIndex]
      const list = [
        { label: `0 - ${Math.ceil(maxValue * 0.25)}`, min: 0, max: Math.ceil(maxValue * 0.25), color: '#001937' },
        { label: `${Math.ceil(maxValue * 0.25) + 1} - ${Math.ceil(maxValue * 0.5)}`, min: Math.ceil(maxValue * 0.25), max: Math.ceil(maxValue * 0.5), color: '#001e42' },
        { label: `${Math.ceil(maxValue * 0.5) + 1} - ${Math.ceil(maxValue * 0.75)}`, min: Math.ceil(maxValue * 0.5), max: Math.ceil(maxValue * 0.75), color: '#002e64' },
        { label: `${Math.ceil(maxValue * 0.75) + 1} - ${maxValue}`, min: Math.ceil(maxValue * 0.75), max: maxValue, color: '#003879' },
      ]
      return list
    },
    divisor () {
      let val = 1
      if (this.region.id === '0') { // 全国
        val = 2
      } else if (this.region.id.substr(2, 4) === '0000') { // 省级
        val = 0.5
      } else if (this.region.id.substr(4, 2) === '00') { // 地市
        val = 0.2
      }
      return val
    }
  },
  watch: {
    curCard: {
      handler (newVal) {
        if (newVal) {
          this.data.names.forEach((name, index) => {
            if (name === newVal) {
              this.handleChangeView(name, index)
            }
          });
        }
      },
      immediate: true,
    }
  },
  mounted () {
    this.charts = this.$echarts.init(this.$refs.chart)
    this.charts.on('click', params => { // 单击选中省份
      this.isMapClick = true
      if (this.region.id === '0' && params.data) { // 只在全国地图下点击有数据的省份有效
        const newRegion = this.mapItems[this.region.id].filter(item => item.name === params.name)[0]
        if (newRegion) {
          if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
          }
          this.timer = setTimeout(() => {
            this.$emit('handleMapSelect', newRegion)
          }, 1000);
        }
      }
    })
    this.charts.on('dblclick', params => { // 双击钻取
      this.isMapDbllick = true
      if (this.region.id === '0' && params.data && params.data.id === 'yun_nan') { // 只在全国地图下双击有数据的省份(云南省)可以钻取
        const newRegion = this.mapItems[this.region.id].filter(item => item.name === params.name)[0]
        if (newRegion) {
          if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
          }
          this.loadedMap[this.region.id] = false
          newRegion.parent = this.region
          this.region = newRegion
          // this.loadMapData()
          this.$emit('handleMapChange', this.region)
          this.isMapDbllick = false
        }
      }
    })
  },
  methods: {
    loadMapData () {
      const fileName = this.getfileName()
      if (!fileName) return
      if (this.loadedMap[this.region.id]) {
        this.createMap()
      } else {
        this.$axios.post(`/ser-govplat-comservice/api/rest/commService/v1/getData`, { jsonFile: fileName, desc: '地图文件', spe: 'common'}).then(d => {
          this.setMapData(d)
          // this.setChartOption()
        })
      }
    },
    getOption () {
      const option = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(177, 216, 255, 0.34)',
          formatter: val => {
            return val.data ? this.createTooltip(val.data) : ''
          }
        },
        geo: {
          map: this.region.name,
          // zoom: this.region.id === '0' ? 1 : 1,
          aspectScale: 1,
          // top: this.region.id === '0' ? 60 : 60,
          silent: true,
          label: {
            normal: {
              show: false,
              fontSize: 10
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(28,199,242,0.9)',
              borderWidth: 1,
              areaColor: '#061E3D',
              shadowColor: '#6d91a1',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              shadowBlur: 6
            },
            emphasis: {
              areaColor: '#061E3D',
              borderWidth: 0
            }
          }
        },
        dataRange: {
          show:false,
          seriesIndex: [0],
          splitList: this.legendList.map(item => ({ start: item.min, end: item.max, color: item.color }))
        },
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 100,
        //   left: '3%',
        //   bottom: '5%',
        //   calculable: true,
        //   seriesIndex: [0],
        //   inRange: {
        //     color: ['#00142C', '#003A7D']
        //   }
        // },
        series: [
          { // 地图
            name: '',
            type: 'map',
            map: this.region.name,
            aspectScale: 1,
            selectedMode: false,
            // zoom: this.region.id === '0' ? 1 : 1,
            // top: this.region.id === '0' ? 50 : 50,
            itemStyle: {
              normal: {
                borderColor: 'rgba(0,255,255,.1)',
                borderWidth: 1,
                areaColor: '#061E3D',
                shadowColor: '#6d91a1',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0
              },
              emphasis: {
                areaColor: '#061E3D',
                borderWidth: 1,
                label: {
                  show: false
                }
              }
            },
            data: this.mapData
          },
          // 柱状体的主干
          {
            type: 'lines',
            zlevel: 5,
            effect: {
              show: false,
              symbolSize: 5 // 图标大小
            },
            lineStyle: {
              width: 10, // 尾迹线条宽度
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [{
                    offset: 0, color: this.colors[this.viewIndex][0] // 0% 处的颜色#1C6A51
                }, {
                    offset: 1, color: this.colors[this.viewIndex][1] // 100% 处的颜色#2AA97E
                }],
                global: false // 缺省为 false
              },
              opacity: 1, // 尾迹线条透明度
              curveness: 0 // 尾迹线条曲直度
            },
            label: {
              show: 0,
              position: 'end',
              formatter: '245'
            },
            silent: true,
            data: this.lineData()
          },
          // 柱状体的顶部
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 5,
            label: {
              show: true,
              formatter: val => {
                return val.value[2]
              },
              color: this.colors[this.viewIndex][2],
              position: "top",
              distance: 0,
            },
            symbol: 'circle',
            symbolSize: [10, 5],
            itemStyle: {
              color: this.colors[this.viewIndex][0],
              opacity: 1
            },
            silent: true,
            data: this.scatterData()
          },
          // 柱状体的底部
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 4,
            symbol: 'circle',
            symbolSize: [10, 5],
            label: { // 地市名称
              formatter: '{b}',
              position: 'bottom',
              color: '#B1D8FF',
              fontSize: 10,
              distance: 5,
              show: true
            },
            itemStyle: {
              // color: '#F7AF21',
              color: this.colors[this.viewIndex][1],
              opacity: 1
            },
            silent: true,
            data: this.scatterData2()
          },
          // {
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   geoIndex: 0,
          //   zlevel: 10,
          //   symbol: 'image://assets/images/Point-BG.png',
          //   symbolSize: [20, 21],
          //   label: {
          //     show: false
          //   },
          //   itemStyle: {
          //     // color: '#F7AF21',
          //     color: '#2EC478',
          //     opacity: 1
          //   },
          //   silent: true,
          //   data: this.scatterData2()
          // },
          { // 没有数据地市名称
            type: 'scatter',
            coordinateSystem: 'geo',
            silent: true,
            label: {
              formatter: (p) => {
                return p.data.name
              },
              offset: [0, 0],
              position: 'inside',
              fontSize: 10,
              color: '#B1D8FF',
              show: true
            },
            symbolSize: 0,
            itemStyle: {
              show: false
            },
            data: this.otherMapData
          },
        ]
      }
      return option
    },
    setChartOption () {
      const option = this.getOption()
      this.charts.setOption(option, true)
    },
    createMap () { // 查询地图数据，生成地图数据mapData
      // await getData()
      // eslint-disable-next-line no-debugger
      // debugger
      this.mapData = []
      this.otherMapData = []
      const regionIds = []
      this.mapItems[this.region.id].forEach(item => {
        this.data.info.forEach(ele => {
          if (item.id === ele.id) {
            if (item.name) { // 去除脏数据
              regionIds.push(ele.id)
              const valList = ele.value
              // const valList = [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)]
              this.mapData.push({
                id: item.id,
                name: item.name,
                value: valList[this.viewIndex],
                list: valList,
                coords: [...this.centerDatas[this.region.id][item.id]]
              })
            }
          }
        })
      })
      this.mapItems[this.region.id].forEach(item => {
        if (regionIds.indexOf(item.id) === -1) {
          this.otherMapData.push({
            id: item.id,
            name: item.name,
            value: [...this.centerDatas[this.region.id][item.id]]
          })
        }
      })
      this.setChartOption()
    },
    setMapData (d) { // 保存地图信息
      if (!this.centerDatas) { // 组件已释放
        return
      }
      this.$echarts.registerMap(this.region.name, d)
      this.loadedMap[this.region.id] = true
      // 保存中心点
      this.centerDatas[this.region.id] = {}
      this.mapItems[this.region.id] = []
      if (this.region.id === '0') {
        d.features.forEach(elm => {
          if (elm.properties.cp) {
            if (elm.properties.cp.includes(',')) {
              this.centerDatas[this.region.id][elm.id] = [parseFloat(elm.properties.cp.split(',')[0]), parseFloat(elm.properties.cp.split(',')[1])]
            } else {
              this.centerDatas[this.region.id][elm.id] = elm.properties.cp
            }
          } else {
            let point = this.calcCenter(elm.geometry.coordinates)
            if (Math.abs(point[0] - 100) < 0.0001 && Math.abs(point[1] - 100) < 0.0001) {
              if (elm.properties.cp.includes(',')) {
                point = [parseFloat(elm.properties.cp.split(',')[0]), parseFloat(elm.properties.cp.split(',')[1])]
              } else {
                point = elm.properties.cp
              }
            }
            this.centerDatas[this.region.id][elm.id] = point
          }
          this.mapItems[this.region.id].push({
            id: elm.id + '',
            name: elm.properties.name,
            center: this.centerDatas[this.region.id][elm.id]
          })
        })
      } else {
        d.features.forEach(elm => {
          if (elm.properties.center) {
            if (elm.properties.center.includes(',')) {
              this.centerDatas[this.region.id][elm.properties.adcode] = [parseFloat(elm.properties.center.split(',')[0]), parseFloat(elm.properties.center.split(',')[1])]
            } else {
              this.centerDatas[this.region.id][elm.properties.adcode] = elm.properties.center
            }
          } else {
            let point = this.calcCenter(elm.geometry.coordinates)
            if (Math.abs(point[0] - 100) < 0.0001 && Math.abs(point[1] - 100) < 0.0001) {
              if (elm.properties.center.includes(',')) {
                point = [parseFloat(elm.properties.center.split(',')[0]), parseFloat(elm.properties.center.split(',')[1])]
              } else {
                point = elm.properties.center
              }
            }
            this.centerDatas[this.region.id][elm.properties.adcode] = point
          }
          this.mapItems[this.region.id].push({
            id: elm.properties.adcode + '',
            name: elm.properties.name,
            center: this.centerDatas[this.region.id][elm.properties.adcode]
          })
        })
      }
      this.createMap()
    },
    // 地图tooltip提示框
    createTooltip (data) {
      const subItems = []
      this.data.names.forEach((item, index) => {
        subItems.push(`<div style="margin: 0 5px; color: ${this.viewIndex === index ? '#fff' : ''}">
          <div style="display: block; white-space: nowrap;">${item}</div>
          <div style="display: block; white-space: nowrap;">${data.list[index]}</div>
        </div>`)
      })
      let html = `
      <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; filter: blur(20px);"></div>
      <div>
        <div style="font-size: 14px; font-weight: 500; color: #fff;" line-height: 20px;>${data.name}</div>
        <div style="display: flex; align-items: center; font-size: 12px; color: #B1D8FF;">
          ${subItems.join('')}
        </div>
      </div>`
      return html
    },
    // 动态计算柱形图的高度（定一个max）
    lineMaxHeight () {
        const maxValue = Math.max(...this.mapData.map(item => item.value)) || 1
        return this.divisor/maxValue
    },
    // 柱状体的主干
    lineData () {
        return this.mapData.map((item) => {
          return {
            coords: [item.coords, [item.coords[0], item.coords[1] + item.value * this.lineMaxHeight()]]
          }
        })
    },
    // 柱状体的顶部
    scatterData () {
        return this.mapData.map((item) => {
          return [item.coords[0], item.coords[1] + item.value * this.lineMaxHeight(), item.value]
        })
    },
    // 柱状体的底部
    scatterData2 () {
        return this.mapData.map((item) => {
          return {
            name: item.name,
            value: item.coords
          }
        })
    },
    handleClickMenu (item) {
      console.log('点击菜单', item)
    },
    handleTriggerMenu () {
      this.showMenuInfo = !this.showMenuInfo
    },
    // 切换地图数据视图
    handleChangeView (name, index) {
      if (this.viewIndex === index) return
      this.viewIndex = index
      this.loadMapData()
    },
    calcCenter (coordinates) {
      let xmin = 200
      let ymin = 200
      let xmax = 0
      let ymax = 0
      if (coordinates && coordinates.length > 0) {
        coordinates.forEach(ring => {
          ring[0].forEach(p => {
            const x = p[0]
            const y = p[1]
            if (xmin > x) {
              xmin = x
            }
            if (ymin > y) {
              ymin = y
            }
            if (xmax < x) {
              xmax = x
            }
            if (ymax < y) {
              ymax = y
            }
          })
        })
      }
      return [(xmin + xmax) / 2, (ymin + ymax) / 2]
    },
    getfileName () { // 获取地图json文件路径
      let file = '0'
      if (this.region.id === '0') { // 全国
        file = 'china_geo'
      } else if (this.region.id === 'yun_nan') { // 云南省
        file = '530000'
      } else {
        return ''
      }
      return `${file}.json`
    },
    onBackClick () {
      if (this.region.id === '0' && !this.isMapClick) {
        const newRegion = this.region.parent
        if (newRegion) {
          this.$emit('handleMapSelect', this.region) // 选中省份
        }
      } else {
        this.isMapClick = false
      }
    },
    onBackDblclick () {
      if (!this.isMapDbllick) {
        const newRegion = this.region.parent
        if (newRegion) {
          this.region = newRegion
          // this.loadMapData()
          this.$emit('handleMapChange', this.region) // 切换视图
        }
      } else {
        this.isMapDbllick = false
      }
    },
  }
}
</script>

<style scoped>
.chart-bg {
  position: relative;
  /* height: 100%; */
  width: 100%;
}
.map-bg {
  position: absolute;
  left: 220px;
  top: 50px;
  height: 540px;
  width: 737px;
}
.map-nanhai {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
@keyframes kf-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.beam-animate {
  animation: kf-rotate 30s linear infinite;
}
.map-chart {
  width: 100%;
  height: 559px;
}
.view-type {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 16px;
  left: 24px;
  font-size: 12px;
  color: #B1D8FF;
}
.view-item {
  display: flex;
  margin-right: 16px;
  cursor: pointer;
}
.legend-group {
  position: absolute;
  top: 16px;
  left: 24px;
  font-size: 12px;
  color: #B1D8FF;
  line-height: 18px;
}
.legend-group-province {
  position: absolute;
  /* bottom: 16px;
  right: 16px; */
  top: 16px;
  left: 24px;
  font-size: 12px;
  color: #B1D8FF;
  line-height: 18px;
}
.legend-icon {
  display: inline-block;
  width: 16px;
  height: 8px;
  margin-right: 8px;
}
.menus {
  position: absolute;
  top: 150px;
  left: 16px;
}
.menu-button {
  width: 24px;
  height: 24px;
  background: rgba(102, 226, 251, 0.08);
  border: 1px solid #66E2FB;
  color: #66E2FB;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
}
.menu-group {
  position: absolute;
  left: 30px;
  top: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.32);
}
.menu-item {
  height: 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #B1D8FF;
  line-height: 24px;
  margin-bottom: 6px;
  white-space: nowrap;
  cursor: pointer;
}
.menu-item-active {
  color: #fff;
}
</style>