
import { inject } from '@vue/runtime-core';

export default {
  // 获取json
  getData: obj => {
    const $axios = inject('$axios')
    return $axios.get('/config/govcharts/'+obj.spe+"/"+obj.jsonFile);
    //return $axios.post('/ser-govplat-comservice/api/rest/commService/v1/getData', obj)
  },
  getUrL:obj=>{
    const $axios = inject('$axios')
    return $axios.get('/ser-govplat-comservice/api/rest/commService/v1/getURL',obj);

  }
  

}
