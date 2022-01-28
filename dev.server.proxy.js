module.exports = {
  '/ser-govplat-comservice/': {
    target: 'http://10.110.74.187:9098',
    pathRewrite: {
      '^/ser-govplat-comservice/': '/',
    },
  },
  '/ser-ge-main/': {
    target: 'http://10.110.74.187:51001',
    changeOrigin: true,
    pathRewrite: {
      '^/ser-ge-main/': '/',
    },
  },
  // '/ser-ge-main/': {
  //     target: 'http://10.110.74.187:51001',
  //     changeOrigin: true,
  //     pathRewrite: {
  //         '^/ser-ge-main/': '/',
  //     },
  // },
  // 政企运维招标后台
  // '/oservice-server': {
  //   target: 'http://10.110.74.183:9009',
  //   changeOrigin: true,
  //   pathRewrite: {
  //     '^/oservice-server': '/',
  //   },
  // },

  // 政企运维后台
  // '/oservice-server': {
  //   target: 'http://10.110.74.193:29000',
  //   changeOrigin: true,
  //   pathRewrite: {
  //     '^/oservice-server': '/',
  //   },
  // },
  // '/micro_main/ge': {
  //    target: 'http://localhost:5101',
  //     changeOrigin: true,
  // },
  // '/micro_main/topo': {
  //   target: 'http://localhost:5102',
  //   changeOrigin: true,
  // },
  // '/micro_main/dbapi': {
  //   target: 'http://localhost:8520',
  //   changeOrigin: true,
  // },
  '/micro_main/govcharts': {
    target: 'http://localhost:8087',
    changeOrigin: true,
  },
  '/micro_main': {
    target: 'http://10.110.74.187:18080',
    changeOrigin: true,
  }
}
