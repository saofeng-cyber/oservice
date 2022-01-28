
/**
 * axios安装
 * @param {} app 
 */
exports.install = function(app,$inspurConfig) {
   let axios= require('axios');
   let _= require('lodash');
   let {Message} = require('element-plus');
   const service = axios.create({
    timeout: $inspurConfig.TIMEOUT || 5000 // 请求超时时间
  })

  // respone拦截器
  service.interceptors.response.use(
    response => {
      // const requestData = getRequestIdentify(response.$inspurConfig)
      // service.removePending(requestData)
      const res = response.data;
      return handleResponseByCode(app, response.status, res, response.config.url)
    },
    error => {
      return handleResponseByCode(app, error?.response?.status || error.message, error.message || error.response.data, error.config ? error.config.url : error)
    }
  )
  
  
  // request拦截器，模拟登录
  service.interceptors.request.use(
    config => {
        if ($inspurConfig.token) {
          _.merge(config.headers, { Authorization: $inspurConfig.token})
        }
      return config
   },
      error => {
        Promise.reject(error)
      }
  )

  let requestCount = 0
  // const Notification = () => import('element-ui')


  /**
   * 结束请求
   * @param {*} app 
   */
  function finishLoading () {
    requestCount--
    if (requestCount <= 0) {
      // app.prototype.$Progress.finish()
      // Spin.hide()
      requestCount = 0
    }
  }

  /**
   *  处理成功处理
   * @param {*} app 
   * @param {*} code 
   * @param {*} res 
   * @param {*} url 
   * @returns 
   */
  function handleResponseByBusinessCode (app, code,  res, url) {
    code = parseInt(code)
    // const codeObj = _.find(messageDictionary, { code: code })
    // 2000或200为操作成功
    if (_.isEqual(20000, code) || _.isEqual(200, code)) {
      finishLoading(app)
      return (res instanceof Blob) || ((res + '') === '[object Blob]') ? res : res.data
    } else if (_.isEqual(30002, code)) {
      window.location.reload()
    } else if ([30004, 30005, 30006].includes(code)) {
      return res
    } else {
      let error = url + '后台服务异常';
      Message({
        message:error,
        type: 'warning',
      })
      return Promise.reject(new Error(error))
    }
  }


  /**
   * 响应处理
   * @param {} app 
   * @param {*} statusCode 
   * @param {*} res 
   * @param {*} url 
   * @returns 
   */
function handleResponseByCode (app, statusCode, res, url) {
  if (Math.floor(statusCode / 100) !== 2) {
    if (statusCode === 401) {
      Message({
        message:"认证失败或者token过期，请尝试重新登陆！",
        type: 'warning',
      })
    } else if (statusCode === 404 && $inspurConfig.ERRORSERVICE) {
      Message({
        message:url + '未找到',
        type: 'warning',
      })
    } else if (statusCode === 600 && $inspurConfig.ERRORSERVICE) {
      Message({
        message:url + '取消重复请求',
        type: 'warning',
      })
    } else if (statusCode === 700 && $inspurConfig.ERRORSERVICE) {
      Message({
        message:url + '取消未完成请求',
        type: 'warning',
      })
    } else if ($inspurConfig.ERRORSERVICE) {
      Message({
        message:url + '后台服务异常',
        type: 'warning',
      })
    }
    return Promise.reject(new Error(url + '后台服务异常~'))
  } else {
    if ((res instanceof Blob) || ((res + '') === '[object Blob]')) {
      // 若是文件流，则直接返回
      finishLoading(app)
      return res
    } else {
      if (res.code) {
        return handleResponseByBusinessCode(app, res.code,  res, url)
      } else if (res.meta && res.meta.code) {
        return handleResponseByBusinessCode(app, res.meta.code, res, url)
      } else {
        finishLoading(app)
        return res
      }
    }
  }
}
   // vue3.0方式注入全局配置
   app.provide("$axios", service)

   // vue2.0方式注入全局配置，可在组件中通过this.xxx获取
   app.config.globalProperties.$axios = service
}
