<template>
    <div class="chart-bg">
      <img class="map-bg" src="../../assets/map/Disk-A.png" alt="">
      <img class="map-bg" src="../../assets/map/Disk-B.png" alt="">
      <img class="map-bg" src="../../assets/map/Disk-C.png" alt="">
      <img v-if="region.id === '0'" class="map-nanhai" src="../../assets/map/MapShape.png" alt="">
      <div class="legend-group">
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
      <div ref="mapChart" class="map-chart"></div>
    </div>
</template>

<script>
import { inject, onMounted, computed, watch } from 'vue';
import { ref, reactive } from '@vue/reactivity';

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
              id: 'bei_jing',
              value: [98, 45, 76],
            },
            {
              id: 'shan_dong',
              value: [34, 25, 57],
            },
            {
              id: 'fu_jian',
              value: [12, 78, 99],
            },
          ]
        })
      },
      curCard: { // 地图上方卡片名称，通过这个参数卡片与地图联动 取值为data.names的元素
        type: String,
        default: '',
      },
    },
    setup(props, context) {
        let $echarts = inject('$echarts');
        const mapChart = ref(null)
        let $axios = inject('$axios')
        // eslint-disable-next-line no-unused-vars
        let charts = null;
        let region = reactive({ id: '0', name: '全国' })
        let loadedMap = reactive({})
        let mapItems = reactive({})
        let mapData = reactive([])
        let otherMapData = reactive([])
        let centerDatas = reactive({}) // 中心点经纬度
        let colors = reactive([ // 严格按颜色顺序
          ['rgba(46, 196, 120, 0.8)', 'rgba(46, 196, 120, 0.4)', 'rgba(46, 196, 120, 1)'],
          ['rgba(14, 172, 218, 0.8)', 'rgba(14, 172, 218, 0.4)', 'rgba(14, 172, 218, 1)'],
          ['rgba(255, 168, 0, 0.8)', 'rgba(255, 168, 0, 0.4)', 'rgba(255, 168, 0, 1)'],
          ['rgba(0, 102, 255, 0.8)', 'rgba(0, 102, 255, 0.4)', 'rgba(0, 102, 255, 1)'],
          ['rgba(14, 172, 218, 0.8)', 'rgba(14, 172, 218, 0.4)', 'rgba(14, 172, 218, 1)'],
        ]) // 不同视图颜色
        let icons = reactive(['Green-Bar', 'LightBlue-Bar', 'Yellow-Bar', 'DarkBlue-Bar', 'Purple-Bar', 'Plain-Bar', 'Green-Bar']) // 严格按颜色顺序
        let viewIndex = ref(0) // 地图显示指标索引
        let isMapClick = ref(false)
        let isMapDbllick = ref(false)
        let timer = null

        const legendList = computed(() => {
          const maxValue = props.data.maxValues[viewIndex.value]
          const list = [
            { label: `0 - ${Math.ceil(maxValue * 0.25)}`, min: 0, max: Math.ceil(maxValue * 0.25), color: '#001937' },
            { label: `${Math.ceil(maxValue * 0.25) + 1} - ${Math.ceil(maxValue * 0.5)}`, min: Math.ceil(maxValue * 0.25), max: Math.ceil(maxValue * 0.5), color: '#001e42' },
            { label: `${Math.ceil(maxValue * 0.5) + 1} - ${Math.ceil(maxValue * 0.75)}`, min: Math.ceil(maxValue * 0.5), max: Math.ceil(maxValue * 0.75), color: '#002e64' },
            { label: `${Math.ceil(maxValue * 0.75) + 1} - ${maxValue}`, min: Math.ceil(maxValue * 0.75), max: maxValue, color: '#003879' },
          ]
          return list
        })
        watch(() => props.curCard, (newVal) =>  {
          if (newVal) {
            props.data.names.forEach((name, index) => {
              if (name === newVal) {
                handleChangeView(name, index)
              }
            });
          }
        })
        const loadMapData = () => {
          const fileName = getfileName()
          if (!fileName) return
          if (loadedMap[region.id]) {
            createMap()
          } else {
            $axios.post(`/ser-govplat-comservice/api/rest/commService/v1/getData?t=${new Date().getTime()}`, { jsonFile: fileName, desc: '地图文件', spe: 'common'}).then(d => {
              setMapData(d)
              // setChartOption()
            })
          }
        }
        const getOption = () => {
          const option = {
            tooltip: {
              show: true,
              backgroundColor: 'rgba(177, 216, 255, 0.34)',
              formatter: val => {
                return val.data ? createTooltip(val.data) : ''
              }
            },
            geo: {
              map: region.name,
              zoom: region.id === '0' ? 1 : 1,
              aspectScale: 1,
              // top: region.id === '0' ? 60 : 60,
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
              splitList: legendList.value.map(item => ({ start: item.min, end: item.max, color: item.color }))
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
                map: region.name,
                aspectScale: 1,
                selectedMode: false,
                zoom: region.id === '0' ? 1 : 1,
                // top: region.id === '0' ? 50 : 50,
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
                data: mapData
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
                        offset: 0, color: colors[viewIndex.value][0] // 0% 处的颜色#1C6A51
                    }, {
                        offset: 1, color: colors[viewIndex.value][1] // 100% 处的颜色#2AA97E
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
                data: lineData()
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
                  color: colors[viewIndex.value][2],
                  position: "top",
                  distance: 0,
                },
                symbol: 'circle',
                symbolSize: [10, 5],
                itemStyle: {
                  color: colors[viewIndex.value][0],
                  opacity: 1
                },
                silent: true,
                data: scatterData()
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
                  color: colors[viewIndex.value][1],
                  opacity: 1
                },
                silent: true,
                data: scatterData2()
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
              //   data: scatterData2()
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
                data: otherMapData
              },
            ]
          }
          return option
        }
        const setChartOption = () => {
          const option = getOption()
          charts.setOption(option, true)
        }
        const createMap = () => { // 查询地图数据，生成地图数据mapData
          mapData = []
          otherMapData = []
          const regionIds = []
          mapItems[region.id].forEach(item => {
            props.data.info.forEach(ele => {
              if (item.id === ele.id) {
                if (item.name) { // 去除脏数据
                  regionIds.push(ele.id)
                  const valList = ele.value
                  // const valList = [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)]
                  mapData.push({
                    id: item.id,
                    name: item.name,
                    value: valList[viewIndex.value],
                    list: valList,
                    coords: [...centerDatas[region.id][item.id]]
                  })
                }
              }
            })
          })
          mapItems[region.id].forEach(item => {
            if (regionIds.indexOf(item.id) === -1) {
              otherMapData.push({
                id: item.id,
                name: item.name,
                value: [...centerDatas[region.id][item.id]]
              })
            }
          })
          setChartOption()
        }
        const setMapData = (d) => { // 保存地图信息
          if (!centerDatas) { // 组件已释放
            return
          }
          $echarts.registerMap(region.name, d)
          loadedMap[region.id] = true
          // 保存中心点
          centerDatas[region.id] = {}
          mapItems[region.id] = []
          if (region.id === '0') {
            d.features.forEach(elm => {
              if (elm.properties.cp) {
                if (elm.properties.cp.includes(',')) {
                  centerDatas[region.id][elm.id] = [parseFloat(elm.properties.cp.split(',')[0]), parseFloat(elm.properties.cp.split(',')[1])]
                } else {
                  centerDatas[region.id][elm.id] = elm.properties.cp
                }
              } else {
                let point = calcCenter(elm.geometry.coordinates)
                if (Math.abs(point[0] - 100) < 0.0001 && Math.abs(point[1] - 100) < 0.0001) {
                  if (elm.properties.cp.includes(',')) {
                    point = [parseFloat(elm.properties.cp.split(',')[0]), parseFloat(elm.properties.cp.split(',')[1])]
                  } else {
                    point = elm.properties.cp
                  }
                }
                centerDatas[region.id][elm.id] = point
              }
              mapItems[region.id].push({
                id: elm.id + '',
                name: elm.properties.name,
                center: centerDatas[region.id][elm.id]
              })
            })
          } else {
            d.features.forEach(elm => {
              if (elm.properties.center) {
                if (elm.properties.center.includes(',')) {
                  centerDatas[region.id][elm.properties.adcode] = [parseFloat(elm.properties.center.split(',')[0]), parseFloat(elm.properties.center.split(',')[1])]
                } else {
                  centerDatas[region.id][elm.properties.adcode] = elm.properties.center
                }
              } else {
                let point = calcCenter(elm.geometry.coordinates)
                if (Math.abs(point[0] - 100) < 0.0001 && Math.abs(point[1] - 100) < 0.0001) {
                  if (elm.properties.center.includes(',')) {
                    point = [parseFloat(elm.properties.center.split(',')[0]), parseFloat(elm.properties.center.split(',')[1])]
                  } else {
                    point = elm.properties.center
                  }
                }
                centerDatas[region.id][elm.properties.adcode] = point
              }
              mapItems[region.id].push({
                id: elm.properties.adcode + '',
                name: elm.properties.name,
                center: centerDatas[region.id][elm.properties.adcode]
              })
            })
          }
          createMap()
        }
        const createTooltip = (data) => {
          const subItems = []
          props.data.names.forEach((item, index) => {
            subItems.push(`<div style="margin: 0 5px; color: ${viewIndex.value === index ? '#fff' : ''}">
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
        }
        // 动态计算柱形图的高度（定一个max）
        const lineMaxHeight = () => {
            const divisor = region.id === '0' ? 2 : 0.5
            const maxValue = Math.max(...mapData.map(item => item.value)) || 1
            return divisor/maxValue
        }
        // 柱状体的主干
        const lineData = () => {
            return mapData.map((item) => {
              return {
                coords: [item.coords, [item.coords[0], item.coords[1] + item.value * lineMaxHeight()]]
              }
            })
        }
        // 柱状体的顶部
        const scatterData = () => {
            return mapData.map((item) => {
              return [item.coords[0], item.coords[1] + item.value * lineMaxHeight(), item.value]
            })
        }
        // 柱状体的底部
        const scatterData2 = ()  => {
            return mapData.map((item) => {
              return {
                name: item.name,
                value: item.coords
              }
            })
        }
        // 切换地图数据视图
        const handleChangeView = (name, index) => {
          if (viewIndex.value === index) return
          viewIndex.value = index
          loadMapData()
        }
        const calcCenter = (coordinates) => {
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
        }
        const getfileName = () => { // 获取地图json文件路径
          let file = '0'
          if (region.id === '0') { // 全国
            file = 'china_geo'
          } else if (region.id === 'yun_nan') { // 云南省
            file = '530000'
          } else {
            return ''
          }
          return `${file}.json`
        }
        const onBackClick = () => {
          if (region.id === '0' && !isMapClick.value) {
            const newRegion = region.parent
            if (newRegion) {
              context.emit('handleMapSelect', region) // 选中省份
            }
          } else {
            isMapClick.value = false
          }
        }
        const onBackDblclick = () => {
          if (!isMapDbllick.value) {
            const newRegion = region.parent
            if (newRegion) {
              Object.assign(region, newRegion)
              // loadMapData()
              context.emit('handleMapChange', region) // 切换视图
            }
          } else {
            isMapDbllick.value = false
          }
        }
        onMounted(()=>{
            charts = $echarts.init(mapChart.value)
            charts.on('click', params => { // 单击选中省份
              isMapClick.value = true
              if (region.id === '0' && params.data) { // 只在全国地图下点击有数据的省份有效
                const newRegion = mapItems[region.id].filter(item => item.name === params.name)[0]
                if (newRegion) {
                  if (timer) {
                    clearTimeout(timer)
                    timer = null
                  }
                  timer = setTimeout(() => {
                    context.emit('handleMapSelect', newRegion)
                  }, 1000);
                }
              }
            })
            charts.on('dblclick', params => { // 双击钻取
              isMapDbllick.value = true
              if (region.id === '0' && params.data && params.data.id === 'yun_nan') { // 只在全国地图下双击有数据的省份(云南省)可以钻取
                const newRegion = mapItems[region.id].filter(item => item.name === params.name)[0]
                if (newRegion) {
                  if (timer) {
                    clearTimeout(timer)
                    timer = null
                  }
                  loadedMap[region.id] = false
                  newRegion.parent = {...region}
                  // region = newRegion
                  Object.assign(region, newRegion)
                  // loadMapData()
                  context.emit('handleMapChange', region)
                  isMapDbllick.value = false
                }
              }
            })
        })
      
        return {
          mapChart, region, loadedMap, colors, icons, viewIndex, isMapClick, isMapDbllick, loadMapData, onBackClick, onBackDblclick, legendList, handleChangeView
        }
    },
}
</script>
<style scoped>
.chart-bg {
  position: relative;
  width: 100%;
}
.map-chart {
  width: 100%;
  height: 559px;
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
.view-type {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 16px;
  left: 16px;
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
  left: 16px;
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
</style>
