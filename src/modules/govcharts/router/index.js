import ResourceVisualization5G from '../views/5g/ResourceVisualization.vue';
import ResourceVisualization5GLight from '../views/5g/light/ResourceVisualization.vue';
import ResourceVisualization5GDark from '../views/5g/dark/ResourceVisualizationDark.vue';
import ResourceVisualizationBBroad from '../views/bBroad/ResourceVisualization.vue';
import ResourceVisualizationBBroadLight from '../views/bBroad/light/ResourceVisualization.vue';
import ResourceVisualizationCCnet from '../views/cNet/ResourceVisualization.vue';
import ResourceVisualizationCCnetLight from '../views/cNet/light/ResourceVisualization.vue';
import ResourceVisualizationCVideo from '../views/cVideo/ResourceVisualization.vue';
import ResourceVisualizationCVideoLight from '../views/cVideo/light/ResourceVisualization.vue';
import ResourceVisualizationGroup from '../views/group/ResourceVisualization.vue';
import ResourceVisualizationGroupLight from '../views/group/light/ResourceVisualization.vue';
import ResourceVisualizationGroupLightGl from '../views/group/light/ResourceVisualizationGl.vue';
import RunServe from '../views/group/light/RunServe.vue';
import ResourceVisualizationIOT from '../views/iot/ResourceVisualization.vue';
import ResourceVisualizationIOTLight from '../views/iot/light/ResourceVisualization.vue';
import ResourceVisualizationSCamera from '../views/sCamera/ResourceVisualization.vue';
import ResourceVisualizationSCameraLight from '../views/sCamera/light/ResourceVisualization.vue';
import QualityCNet from '../views/cNet/Quality'
import QualityCNetLight from '../views/cNet/light/Quality'
import Satisfaction5G from '../views/5g/Satisfaction.vue';// 5G-满意度
import Satisfaction5GLight from '../views/5g/light/Satisfaction.vue';
import Quality5G from '../views/5g/Quality.vue';
import Quality5GLight from '../views/5g/light/Quality.vue';
import OneCase5G from '../views/5g/OneCase.vue';
import OneCaseBBroad from '../views/bBroad/OneCase.vue';
import OneCaseCNet from '../views/cNet/OneCase.vue';
import OneCaseCVideo from '../views/cVideo/OneCase.vue';
import OneCaseIot from '../views/iot/OneCase.vue';
import OneCaseScamear from '../views/sCamera/OneCase.vue';
import OneCaseGroup from '../views/group/OneCase.vue';
import Visualization5G from '../views/5g/Visualization.vue';
import Visualization5GLight from '../views/5g/light/Visualization.vue';
import SatisfactionIot from '../views/iot/Satisfaction.vue'; //物联网-满意度
import SatisfactionIotLight from '../views/iot/light/Satisfaction.vue'; //物联网-满意度
import QualityNet5GLight from '../views/5g/light/QualityNet.vue';//5g-网络质量
import QualityServe5GDark from '../views/5g/dark/QualityServeDark.vue';//5g-业务质量-dark
import QualityServe5GLight from '../views/5g/light/QualityServe.vue';//5g-业务质量-light
import OverViewFgLight from '../views/5g/light/OverViewFg.vue'//5g-全景概览
import OverViewFgDark from '../views/5g/dark/OverViewFgDark.vue'//5g-全景概览
import Wide from '../views/iot/Wide.vue';
import WideLight from '../views/iot/light/Wide.vue';
import VisBroad from '../views/bBroad/VisBroad.vue';
import VisBroadLight from '../views/bBroad/light/VisBroad.vue';
import QualityIOT from '../views/iot/Quality.vue';
import QualityIOTLight from '../views/iot/light/Quality.vue';
import QualityBBroad from '../views/bBroad/Quality.vue';
import QualityBBroadLight from '../views/bBroad/light/Quality.vue';
import SatisfactionBB from '../views/bBroad/Satisfaction.vue';//企宽-满意度
import SatisfactionBBLight from '../views/bBroad/light/Satisfaction.vue';//企宽-满意度
import SatisfactionCNet from '../views/cNet/Satisfaction.vue';
import SatisfactionCNetLight from '../views/cNet/light/Satisfaction.vue';
import SatisfactionCV from '../views/cVideo/Satisfaction.vue';
import SatisfactionCVLight from '../views/cVideo/light/Satisfaction.vue';
import SatisfactionGroup from '../views/group/Satisfaction.vue'; //专线-满意度
import SatisfactionGroupLight from '../views/group/light/Satisfaction.vue'; //专线-满意度
import SatisfactionSc from '../views/sCamera/Satisfaction.vue'; //千里眼-满意度
import SatisfactionScLight from '../views/sCamera/light/Satisfaction.vue'; //千里眼-满意度
import VisualizationCNet from "../views/cNet/Visualization.vue"; //云网-满意度
import VisualizationCNetLight from "../views/cNet/light/Visualization.vue"; //云网-满意度
import VisualizationCVideo from "../views/cVideo/Visualization.vue";
import VisualizationCVideoLight from "../views/cVideo/light/Visualization.vue";
import VisualizationGroup from "../views/group/Visualization.vue";
import VisualizationGroupLight from "../views/group/light/Visualization.vue";
import VisualizationSCamera from "../views/sCamera/Visualization.vue";
import VisualizationSCameraLight from "../views/sCamera/light/Visualization.vue";
import QualitySc from '../views/sCamera/Quality.vue';
import QualityScLight from '../views/sCamera/light/Quality.vue';
import QualityCv from '../views/cVideo/Quality.vue';
import QualityCvLight from '../views/cVideo/light/Quality.vue';
import QualityGp from '../views/group/Quality.vue';
import QualityGpLight from '../views/group/light/Quality.vue';
import AlarmLight from '../views/5g/light/Alarm.vue';
import AlarmDark from '../views/5g/dark/AlarmDark.vue';
import Timelyrate from '../views/5g/light/Timelyrate.vue';

export default function (router) {
  const routes = [
    {
      path: '/5g/resourcevisualization',
      name: 'ResourceVisualization5G',
      component: ResourceVisualization5G
    },
    {
      path: '/5g/light/resourcevisualization',
      name: 'ResourceVisualization5GLight',
      component: ResourceVisualization5GLight
    },
    {
      path: '/5g/dark/resourcevisualization',
      name: 'ResourceVisualization5GDark',
      component: ResourceVisualization5GDark
    },
    {
      path: '/5g/satisfaction',
      name: 'Satisfaction5G',
      component: Satisfaction5G
    },
    {
      path: '/5g/light/satisfaction',
      name: 'Satisfaction5GLight',
      component: Satisfaction5GLight
    },
    {
      path: '/5g/quality',
      name: 'Quality5G',
      component: Quality5G
    },
    {
      path: '/5g/light/quality',
      name: 'Quality5GLight',
      component: Quality5GLight
    },
    {
      path: '/5g/onecase',
      name: 'OneCase5G',
      component: OneCase5G
    },
    {
      path: '/5g/visualization',
      name: 'Visualization5G',
      component: Visualization5G
    },
    {
      path: '/5g/light/visualization',
      name: 'Visualization5GLight',
      component: Visualization5GLight
    },
    {
      path: '/5g/light/qualityserve',
      name: 'QualityServe5GLight',
      component: QualityServe5GLight
    },
    {
      path: '/5g/dark/qualityserve',
      name: 'QualityServe5GDark',
      component: QualityServe5GDark
    },
    {
      path: '/5g/light/qualitynet',
      name: 'QualityNet5GLight',
      component: QualityNet5GLight
    },
    {
      path: '/5g/light/overviewfg',
      name: 'OverViewFgLight',
      component: OverViewFgLight
    }, 
    {
      path: '/5g/dark/overviewfg',
      name: 'OverViewFgDark',
      component: OverViewFgDark
    }, 
    {
      path: '/5g/light/alarm',
      name: 'AlarmLight',
      component: AlarmLight
    },     
    {
      path: '/5g/dark/alarm',
      name: 'AlarmDark',
      component: AlarmDark
    }, 
    {
      path: '/5g/light/Timelyrate',
      name: 'Timelyrate',
      component: Timelyrate
    },
    {
      path: '/iot/satisfaction',
      name: 'SatisfactionIot',
      component: SatisfactionIot
    },
    {
      path: '/iot/light/satisfaction',
      name: 'SatisfactionIotLight',
      component: SatisfactionIotLight
    },
    {
      path: '/iot/wide',
      name: 'Wide',
      component: Wide
    },
    {
      path: '/iot/light/wide',
      name: 'WideLight',
      component: WideLight
    },
    {
      path: '/bBroad/visBroad',
      name: 'visBroad',
      component: VisBroad
    },
    {
      path: '/bBroad/light/visBroad',
      name: 'visBroadLight',
      component: VisBroadLight
    },
    {
      path: '/iot/quality',
      name: 'QualityIOT',
      component: QualityIOT
    },
    {
      path: '/iot/light/quality',
      name: 'QualityIOTLight',
      component: QualityIOTLight
    },
    {
      path: '/cNet/quality',
      name: 'QualityCNet',
      component: QualityCNet
    },
    {
      path: '/cNet/light/quality',
      name: 'QualityCNetLight',
      component: QualityCNetLight
    },
    {
      path: '/bBroad/quality',
      name: 'QualityBBroad',
      component: QualityBBroad
    },
    {
      path: '/bBroad/light/quality',
      name: 'QualityBBroadLight',
      component: QualityBBroadLight
    },
    {
      path: '/iot/quality',
      name: 'QualityIOT',
      component: QualityIOT
    },
    {
      path: '/iot/light/quality',
      name: 'QualityIOTLight',
      component: QualityIOTLight
    },
    {
      path: '/bBroad/quality',
      name: 'QualityBBroad',
      component: QualityBBroad
    },
    {
      path: '/bBroad/light/quality',
      name: 'QualityBBroadLight',
      component: QualityBBroadLight
    },
    {
      path: '/iot/resourcevisualization',
      name: 'ResourceVisualizationIOT',
      component: ResourceVisualizationIOT
    },
    {
      path: '/iot/light/resourcevisualization',
      name: 'ResourceVisualizationIOTLight',
      component: ResourceVisualizationIOTLight
    },
    {
      path: '/bBroad/resourcevisualization',
      name: 'ResourceVisualizationBBroad',
      component: ResourceVisualizationBBroad
    },
    {
      path: '/bBroad/light/resourcevisualization',
      name: 'ResourceVisualizationBBroadLight',
      component: ResourceVisualizationBBroadLight
    },
    {
      path: '/cNet/resourcevisualization',
      name: 'ResourceVisualizationCCnet',
      component: ResourceVisualizationCCnet
    },
    {
      path: '/cNet/light/resourcevisualization',
      name: 'ResourceVisualizationCCnetLight',
      component: ResourceVisualizationCCnetLight
    },
    {
      path: '/cVideo/resourcevisualization',
      name: 'ResourceVisualizationCVideo',
      component: ResourceVisualizationCVideo
    },
    {
      path: '/cVideo/light/resourcevisualization',
      name: 'ResourceVisualizationCVideoLight',
      component: ResourceVisualizationCVideoLight
    },
    {
      path: '/group/resourcevisualization',
      name: 'ResourceVisualizationGroup',
      component: ResourceVisualizationGroup
    },
    {
      path: '/group/light/resourcevisualization',
      name: 'ResourceVisualizationGroupLight',
      component: ResourceVisualizationGroupLight
    },
    {
      path: '/group/light/resourcevisualizationgl',
      name: 'ResourceVisualizationGroupLightGl',
      component: ResourceVisualizationGroupLightGl
    },
    {
      path: '/group/light/runserve',
      name: 'RunServe',
      component: RunServe
    },
    {
      path: '/sCamera/resourcevisualization',
      name: 'ResourceVisualizationSCamera',
      component: ResourceVisualizationSCamera
    },
    {
      path: '/sCamera/light/resourcevisualization',
      name: 'ResourceVisualizationSCameraLight',
      component: ResourceVisualizationSCameraLight
    },
    {
      path: '/bBroad/satisfaction',
      name: 'SatisfactionBB',
      component: SatisfactionBB
    },
    {
      path: '/bBroad/light/satisfaction',
      name: 'SatisfactionBBLight',
      component: SatisfactionBBLight
    },
    {
      path: '/cNet/satisfaction',
      name: 'SatisfactioncNet',
      component: SatisfactionCNet
    },
    {
      path: '/cNet/light/satisfaction',
      name: 'SatisfactioncNetLight',
      component: SatisfactionCNetLight
    },
    {
      path: '/cVideo/satisfaction',
      name: 'SatisfactionCV',
      component: SatisfactionCV
    },
    {
      path: '/cVideo/light/satisfaction',
      name: 'SatisfactionCVLight',
      component: SatisfactionCVLight
    },
    {
      path: '/group/satisfaction',
      name: 'SatisfactionGroup',
      component: SatisfactionGroup
    },
    {
      path: '/group/light/satisfaction',
      name: 'SatisfactionGroupLight',
      component: SatisfactionGroupLight
    },
    {
      path: '/sCamera/satisfaction',
      name: 'SatisfactionSc',
      component: SatisfactionSc
    },
    {
      path: '/sCamera/light/satisfaction',
      name: 'SatisfactionScLight',
      component: SatisfactionScLight
    },
    {
      path: '/bBroad/onecasebbroad',
      name: 'onecasebbroad',
      component: OneCaseBBroad
    },
    {
      path: '/cNet/onecasecnet',
      name: 'onecasecnet',
      component: OneCaseCNet
    },
    {
      path: '/cVideo/onecasecvideo',
      name: 'onecasecvideo',
      component: OneCaseCVideo
    },
    {
      path: '/iot/onecaseiot',
      name: 'onecaseiot',
      component: OneCaseIot
    },
    {
      path: '/sCamear/onecasescamear',
      name: 'onecasescamear',
      component: OneCaseScamear
    },
    {
      path: '/group/onecasesgroup',
      name: 'onecasesgroup',
      component: OneCaseGroup
    },
    {
      path: '/cNet/visualization',
      name: 'VisualizationCNet',
      component: VisualizationCNet
    },
    {
      path: '/cNet/light/visualization',
      name: 'VisualizationCNetLight',
      component: VisualizationCNetLight
    },
    {
      path: '/cVideo/visualization',
      name: 'VisualizationCVideo',
      component: VisualizationCVideo
    },
    {
      path: '/cVideo/light/visualization',
      name: 'VisualizationCVideoLight',
      component: VisualizationCVideoLight
    },
    {
      path: '/group/visualization',
      name: 'VisualizationGroup',
      component: VisualizationGroup
    },
    {
      path: '/group/light/visualization',
      name: 'VisualizationGroupLight',
      component: VisualizationGroupLight
    },
    {
      path: '/sCamera/visualization',
      name: 'VisualizationSCamera',
      component: VisualizationSCamera
    },
    {
      path: '/sCamera/light/visualization',
      name: 'VisualizationSCameraLight',
      component: VisualizationSCameraLight
    },
    {
      path: '/cVideo/quality',
      name: 'QualityCv',
      component: QualityCv
    },
    {
      path: '/cVideo/light/quality',
      name: 'QualityCvLight',
      component: QualityCvLight
    },
    {
      path: '/sCamera/quality',
      name: 'QualitySc',
      component: QualitySc
    },
    {
      path: '/sCamera/light/quality',
      name: 'QualityScLight',
      component: QualityScLight
    },
    {
      path: '/group/quality',
      name: 'QualityGp',
      component: QualityGp
    },
    {
      path: '/group/light/quality',
      name: 'QualityGpLight',
      component: QualityGpLight
    },
  ]
  routes.forEach(route => {
    router.addRoute(route);
  });

}
