<template>
  <div>
    <div id="map" class="map"></div>
    <VideoDialog class="fixed top-[25vh] left-[30vw] w-[34vw] z-50" v-if="showVideoDialog"
      @closeVideoDialog="closeVideoDialog"></VideoDialog>

    <!-- <Bottom class="fixed bottom-0 z-50" :place="{}"></Bottom> -->

    <div :class="[data.showjk ? 'pshow' : 'phide', 'modelpoupou']">
      <div class="markercontent">
        <div style="font-size: 20px;margin-bottom: 10px;">实时监控</div>
        <div class="modelpoupouclose" @click="closejk">关闭</div>
        <video id="videoElement" ref="videoContainer" class="centeredVideo" controls autoplay width="1024"
          height="576">Your browser is too old which doesn't support HTML5 video.</video>
      </div>
    </div>

  </div>
</template>

<script setup>

import flvjs from 'flv.js'
import VideoDialog from "./VideoDialog.vue";
import geojson from '@/assets/map/json/yiwuxian.json'
import dong from '@/assets/map/json/dong.json'

import Bottom from "./Bottom.vue";
import axios from "axios";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconLocation from "../../../../public/img/icon-map.png";
import busBgIcon from "../../../../public/img/bus-point-bg.png";
import iconDeviceLabel from "../../../../public/img/device-label.png";
import iconCamera from "../../../../public/img/camera.png";
import iconEnvironment from "../../../../public/img/environment.png";
import { onMounted, ref, reactive, watch, defineProps, defineEmits, defineExpose } from "vue";
const props = defineProps(["lng", "lat", "deviceList", "camera", "cameraVisible", "weatherInfo", "deviceId"]);
let showVideoDialog = ref(false);

const videoContainer = ref(null);

const data = reactive({
  detailId: 0,
  show: false,
  showjk: false,
  mapLevel: 6,
  flvPlayer: null,
  centerLng: 94.386302151369,
  centerLat: 43.299609268544,
  map: null,
  currentDevice: null,
  weatherList: [], //传感器数组
  jktoken: "",
  aredList: [
    {
      "lat": 43.29489013605451,
      "lnt": 94.38935458660127,
      "deviceId": 40560,
      "waterOutletName": "5-7",
      "deviceCode": "F4002786",
      "longitude": null,
      "latitude": null
    },
    {
      "lat": 43.29544472974769,
      "lnt": 94.38957452774049,
      "deviceId": 41662,
      "waterOutletName": "5-3",
      "deviceCode": "F4004097",
      "longitude": null,
      "latitude": null
    },
    {
      "lat": 43.29615163409475,
      "lnt": 94.38985884189606,
      "deviceId": 41673,
      "waterOutletName": "5-5",
      "deviceCode": "F4004108",
      "longitude": null,
      "latitude": null
    },
    {
      "lat": 43.29672183824329,
      "lnt": 94.39007878303528,
      "deviceId": 41712,
      "waterOutletName": "5-1",
      "deviceCode": "F4004151",
      "longitude": null,
      "latitude": null
    },


    {
      "lat": 43.29748281027289,
      "lnt": 94.39034700393678,
      "deviceId": 41725,
      "waterOutletName": "5-2",
      "deviceCode": "F4004164",
      "longitude": null,
      "latitude": null
    },
    {
      "lat": 43.297924211195486,
      "lnt": 94.39051866531373,
      "deviceId": 41807,
      "waterOutletName": "5-6",
      "deviceCode": "F4004251",
      "longitude": null,
      "latitude": null
    },
    {

      "lat": 43.298689667194125,
      "lnt": 94.39082443714143,
      "deviceId": 41811,
      "waterOutletName": "5-8",
      "deviceCode": "F4004256",
      "longitude": null,
      "latitude": null
    },
    {
      "lat": 43.29949367278096,
      "lnt": 94.39113020896912,
      "deviceId": 41814,
      "waterOutletName": "5-4",
      "deviceCode": "F4004259",
      "longitude": null,
      "latitude": null
    }
  ],
  jklist: [
    {
      "lat": 43.27797470876639,
      "lnt": 94.38250958919525,
      "deviceId": 40560,
      "waterOutletName": "901",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000901_34020000001320000901.live.flv",
      "deviceId": "34020000001320000903",
      "channelId": "34020000001320000903"
    },
    {

      "lat": 43.27727562181154,
      "lnt": 94.38440322875978,
      "deviceId": 40560,
      "waterOutletName": "902",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000902_34020000001320000902.live.flv",
      "deviceId": "34020000001320000903",
      "channelId": "34020000001320000903"
    },
    {
      "lat": 43.2892865975901,
      "lnt": 94.40054114783828,
      "deviceId": 40560,
      "waterOutletName": "903",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000903_34020000001320000903.live.flv",
      "deviceId": "34020000001320000903",
      "channelId": "34020000001320000903"
    },
    {
      "lat": 43.29659505810615,
      "lnt": 94.40364034682649,
      "deviceId": 40560,
      "waterOutletName": "904",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000904_34020000001320000904.live.flv",
      "deviceId": "34020000001320000904",
      "channelId": "34020000001320000904"

    },
    {
      "lat": 43.29709762587168,
      "lnt": 94.38608543824809,
      "deviceId": 40560,
      "waterOutletName": "905",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000905_34020000001320000905.live.flv",
      "deviceId": "34020000001320000905",
      "channelId": "34020000001320000905"

    },
    {
      "lat": 43.30219049368096,
      "lnt": 94.38813511212433,
      "deviceId": 40560,
      "waterOutletName": "906",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000906_34020000001320000906.live.flv",
      "deviceId": "34020000001320000906",
      "channelId": "34020000001320000906"
    },
    {
      "lat": 43.300582633535114,
      "lnt": 94.37980707349355,
      "deviceId": 40560,
      "waterOutletName": "907",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000907_34020000001320000907.live.flv",
      "deviceId": "34020000001320000907",
      "channelId": "34020000001320000907"

    },
    {
      "lat": 43.30394192953941,
      "lnt": 94.38105066131324,
      "deviceId": 40560,
      "waterOutletName": "908",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000908_34020000001320000908.live.flv",
      "deviceId": "34020000001320000908",
      "channelId": "34020000001320000908"

    },
    {
      "lat": 43.30394192953941,
      "lnt": 94.38105066131324,
      "deviceId": 40560,
      "waterOutletName": "909",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000909_34020000001320000909.live.flv",
      "deviceId": "34020000001320000909",
      "channelId": "34020000001320000909"

    },
    {
      "lat": 43.306282074713245,
      "lnt": 94.37437591096547,
      "deviceId": 40560,
      "waterOutletName": "910",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000910_34020000001320000910.live.flv",
      "deviceId": "34020000001320000910",
      "channelId": "34020000001320000910"

    },
    {
      "lat": 43.31004538246547,
      "lnt": 94.36014490532479,
      "deviceId": 40560,
      "waterOutletName": "911",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000911_34020000001320000911.live.flv",
      "deviceId": "34020000001320000911",
      "channelId": "34020000001320000911"

    },
    {
      "lat": 43.31031476667706,
      "lnt": 94.36507817885109,
      "deviceId": 40560,
      "waterOutletName": "912",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000912_34020000001320000912.live.flv",
      "deviceId": "34020000001320000912",
      "channelId": "34020000001320000912"

    },
    {
      "lat": 43.29387165730466,
      "lnt": 94.39256562647286,
      "deviceId": 40560,
      "waterOutletName": "913",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000913_34020000001320000913.live.flv",
      "deviceId": "34020000001320000913",
      "channelId": "34020000001320000913"

    },
    {
      "lat": 43.29941802350243,
      "lnt": 94.39460254819681,
      "deviceId": 40560,
      "waterOutletName": "914",
      "deviceCode": "F4002786",
      "video_url": "http://182.92.190.80:9092/rtp/34020000001320000914_34020000001320000914.live.flv",
      "deviceId": "34020000001320000914",
      "channelId": "34020000001320000914"

    }
  ],
  miewendeng: [
    {
      name: '57',
      lat: '43.31288195881693',
      lnt: '94.3509855388157'
    },
    {
      name: '56',
      lat: '43.31240330773173',
      lnt: '94.35188640881869'
    },
    {
      name: '55',
      lat: '43.312089499222445',
      lnt: '94.352830129169'
    },
    {
      name: '54',
      lat: '43.31172882316174',
      lnt: '94.35380332518446'
    },
    {
      name: '53',
      lat: '43.31141608078893',
      lnt: '94.3547122888885'
    },
    {
      name: '52',
      lat: '43.31107197896832',
      lnt: '94.35571632622968'
    },
    {
      name: '51',
      lat: '43.31076023279335',
      lnt: '94.35663471160969'
    },
    {
      name: '50',
      lat: '43.31043092410718',
      lnt: '94.35756383360206'
    },
    {
      name: '49',
      lat: '43.31010450629246',
      lnt: '94.35852913099762'
    },
    {
      name: '48',
      lat: '43.3097057952172',
      lnt: '94.35956542161449'
    },
    {
      name: '47',
      lat: '43.30939213441587',
      lnt: '94.36051203668765'
    },
    {
      name: '46',
      lat: '43.309003242652686',
      lnt: '94.36153902312228'
    },
    {
      name: '45',
      lat: '43.308696318440056',
      lnt: '94.36258345062679'
    },
    {
      name: '44',
      lat: '43.3083485265491',
      lnt: '94.36356498252309'
    },
    {
      name: '43',
      lat: '43.307976397369764',
      lnt: '94.36452244663587'
    },
    {
      name: '42',
      lat: '43.30761123604307',
      lnt: '94.36539557775065'
    },
    {
      name: '41',
      lat: '43.307170014547594',
      lnt: '94.36624329603451'
    },
    {
      name: '40',
      lat: '43.306717122133655',
      lnt: '94.36707497185091'
    },
    {
      name: '39',
      lat: '43.30624370213085',
      lnt: '94.36794819402704'
    },
    {
      name: '38',
      lat: '43.30578295955238',
      lnt: '94.36884421543475'
    },
    {
      name: '37',
      lat: '43.30530173124284',
      lnt: '94.3697523252426'
    },
    {
      name: '36',
      lat: '43.30403503349867',
      lnt: '94.37228262398392'
    },
    {
      name: '35',
      lat: '43.30362131523211',
      lnt: '94.37311182951468'
    },
    {
      name: '34',
      lat: '43.30310591353008',
      lnt: '94.37413933685171'
    },
    {
      name: '33',
      lat: '43.30256129895144',
      lnt: '94.37513607973713'
    },
    {
      name: '32',
      lat: '43.302004984656165',
      lnt: '94.37615162563887'
    },
    {
      name: '31',
      lat: '43.30145459207205',
      lnt: '94.37713104393596'
    },
    {
      name: '30',
      lat: '43.30089246949657',
      lnt: '94.37816276431418'
    },
    {
      name: '29',
      lat: '43.30037333641038',
      lnt: '94.37917711473945'
    },
    {
      name: '28',
      lat: '43.29977321775173',
      lnt: '94.38021161895394'
    },
    {
      name: '27',
      lat: '43.29922096936945',
      lnt: '94.38122741286939'
    },
    {
      name: '26',
      lat: '43.29866291498711',
      lnt: '94.38222315613521'
    },
    {
      name: '25',
      lat: '43.298112690194266',
      lnt: '94.38323369204778'
    },
    {
      name: '24',
      lat: '43.29757032079815',
      lnt: '94.38422551574298'
    },
    {
      name: '23',
      lat: '43.29703773412197',
      lnt: '94.38523347467546'
    },
    {
      name: '22',
      lat: '43.296485640972314',
      lnt: '94.38627767984758'
    },
    {
      name: '21',
      lat: '43.29599224368294',
      lnt: '94.38715303485368'
    },
    {
      name: '20',
      lat: '43.295449015617486',
      lnt: '94.38817857816592'
    },
    {
      name: '19',
      lat: '43.294893157722065',
      lnt: '94.389163958851'
    },
    {
      name: '18',
      lat: '43.29439295525314',
      lnt: '94.39017486430734'
    },
    {
      name: '17',
      lat: '43.293837147332965',
      lnt: '94.39121130341596'
    },
    {
      name: '16',
      lat: '43.293302868385474',
      lnt: '94.39220355193643'
    },
    {
      name: '15',
      lat: '43.29279890397594',
      lnt: '94.39313417019915'
    },
    {
      name: '14',
      lat: '43.29222272789149',
      lnt: '94.39412250409667'
    },
    {
      name: '13',
      lat: '43.29164950144798',
      lnt: '94.39516856084354'
    },

    {
      name: '12',
      lat: '43.29100601221021',
      lnt: '94.3963514846036'
    },
    {
      name: '11',
      lat: '43.290485593367016',
      lnt: '94.39732792621044'
    },
    {
      name: '10',
      lat: '43.28993982691054',
      lnt: '94.39836076071349'
    },
    {
      name: '9',
      lat: '43.28939117630353',
      lnt: '94.39936012133596'
    },
    {
      name: '8',
      lat: '43.29563298912491',
      lnt: '94.40347054070146'
    },
    {
      name: '7',
      lat: '43.29463841130927',
      lnt: '94.40308683901654'
    },
    {
      name: '6',
      lat: '43.293641874656196',
      lnt: '94.40272729672694'
    },
    {
      name: '5',
      lat: '43.29267851274499',
      lnt: '94.40235166079061'
    },
    {
      name: '4',
      lat: '43.29171026266043',
      lnt: '94.40197603337896'
    },
    {
      name: '3',
      lat: '43.290716627281505',
      lnt: '94.4016165145907'
    },
    {
      name: '2',
      lat: '43.289763977508905',
      lnt: '94.40123285338808'
    },
    {
      name: '1',
      lat: '43.28884938743811',
      lnt: '94.4009082278153'

    }
  ],
  jkMarkers: [],
  sfMarkers: [],
  mwdMarker: [],
  jkMarkerst: true,
  sfMarkerst: true,
  mwdMarkert: true
});
watch(
  () => props.lat,
  () => {
    data.map.flyTo([props.lat, props.lng], 16);

  }
);


const closeVideoDialog = () => {
  showVideoDialog.value = false;
};
const closeBusinessDialog = () => {
  // showBusinessDialog.value = false;
};


const getFeatureInfoUrl = (map, latlng) => {
  // 根据你的WMS服务和参数修改以下URL构造过程
  var point = map.latLngToContainerPoint(latlng, map.getZoom())
  let size = map.getSize()
  let params = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    srs: 'EPSG:4326',
    styles: '',
    transparent: true,
    version: '1.1.1', //这里是对应你的服务版本每个服务都会不同
    format: 'image/png',
    bbox: map.getBounds().toBBoxString(),
    height: size.y,
    width: size.x,
    layers: 'tgcrop_hami_yiwu_2024',//图层服务名
    query_layers: 'tgcrop_hami_yiwu_2024', //图层服务名
    info_format: 'application/json'
  };
  params[map.getCenter().lat < 0 ? 'i' : 'x'] = point.x;
  params[map.getCenter().lng < 0 ? 'j' : 'y'] = point.y;
  console.log('params====>', params);
  let url = "/geoserveraddress/geoserver/wms" + L.Util.getParamString(params, this.mapUrl, true);
  console.log('url====>', url);
  return url
}
const initMap = () => {
  data.map = L.map("map", {
    center: [data.centerLat, data.centerLng], // 地图中心
    zoom: 16, //缩放比列
    zoomControl: false, //禁用 + - 按钮
    doubleClickZoom: false, // 禁用双击放大
    attributionControl: false // 移除右下角leaflet标识
  });
  let tdtKey = "fec6ab6bd6785c8ff8b4a233192de352";
  L.tileLayer(
    "http://t0.tianditu.gov.cn/img_w/wmts?" +
    "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
    "&tk=fec6ab6bd6785c8ff8b4a233192de352",
    {
      maxZoom: 18,
      minZoom: 5
    }
  ).addTo(data.map);

  L.tileLayer(
    `http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtKey}`,
    {
      subdomains: "01234567"
    }
  ).addTo(data.map);

  let wmsUrl = "/geoserveraddress/geoserver/wms"
  L.tileLayer
    .wms(wmsUrl, {
      format: "image/png",
      // layers: "gengyun:tb_land_info_yiwu",
      layers: "gbznt",

      transparent: true
    })
    .addTo(data.map);

  L.Popup.prototype._animateZoom = function (e) {
    if (!this._map) {
      return
    }
    var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
      anchor = this._getAnchor()
    L.DomUtil.setPosition(this._container, pos.add(anchor))
  }

  // 遮罩
  var countryLayer = L.geoJSON(dong, {
    style: function (feature) {
      return {
        weight: 4,
        opacity: 1,
        color: '#95f9fa',
        fillOpacity: 0,
        fillColor: '#41a5a8'
      }
    }
  }).addTo(data.map)
  // data.map.fitBounds(countryLayer.getBounds());
  let polygonPane = data.map.createPane('polygonPane');
  polygonPane.style.zIndex = 200;
  polygonPane.style.pointerEvents = 'none';

  // 定义地图边界点（用于外部多边形框架）
  const NW = { lat: 59.0, lng: 73.0 }; // 西北
  const NE = { lat: 59.0, lng: 136.0 }; // 东北
  const SE = { lat: 3.0, lng: 136.0 }; // 东南
  const SW = { lat: 3.0, lng: 73.0 }; // 西南

  const baseMaskLatLngs = [
    [NW, SW, SE, NE, NW] // 外部多边形框架
  ];

  // 遍历每个 feature，生成内部的“挖洞”多边形
  dong.features.forEach((feature) => {
    let holePoints = [];

    // 提取当前 feature 的坐标点，作为孔洞的顶点
    feature.geometry.coordinates[0][0].forEach(item => {
      holePoints.push([item[1], item[0]]); // 按 [纬度, 经度] 顺序
    });

    // 将孔洞的点添加为多边形的第二环
    baseMaskLatLngs.push(holePoints);
  });

  // 创建多边形图层，包含孔洞
  let polygonLayer = L.polygon(baseMaskLatLngs, {
    color: 'transparent', // 边框颜色
    fillColor: '#000',    // 填充颜色（黑色）
    fillOpacity: 0.4,     // 填充透明度
    pane: 'polygonPane'
  });

  // 将多边形添加到地图
  polygonLayer.addTo(data.map);


  //   物联网设备 加气象站矩形

  L.polygon([
    [43.29551174214805, 94.38671472036457],
    [43.294121772149786, 94.38939640565118],
    [43.29291918820301, 94.38896733600532],
    [43.29441850998522, 94.38574931366145]
  ], {
    color: '#26c7c8', // 边框颜色
    weight: 2, // 边框宽度
    opacity: 1, // 边框透明度
    fill: true, // 是否填充内部
    fillColor: '#26c7c8', // 填充颜色
    fillOpacity: 1 // 填充透明度
  }).addTo(data.map);





  //自定义图片marker
  let myIcon = L.icon({
    iconUrl: '/img/shuifa.png',
    iconSize: [30, 30],
    // iconAnchor: [21, 21],
    popupAnchor: [0, -20],//注意坐标轴的方向
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });
  let jk = L.icon({
    iconUrl: '/img/jiankong.png',
    iconSize: [30, 30],
    popupAnchor: [0, -20],//注意坐标轴的方向
  });


  let mwd = L.icon({
    iconUrl: '/img/deng.png',
    iconSize: [30, 30],
    popupAnchor: [0, -20],//注意坐标轴的方向
  });


  let jkMarkers = []
  for (let i = 0; i < data.jklist.length; i++) {
    let jkMarker = L.marker([data.jklist[i].lat, data.jklist[i].lnt], { icon: jk }).addTo(data.map);
    jkMarker.on('click', function (e) {
      data.showjk = true
      // 调用播放接口
      axios.get('/sp/api/play/start/' + data.jklist[i].deviceId + '/' + data.jklist[i].channelId + '?isSubStream=false', {
        headers: {
          "access-token": data.jktoken
        }
      });
      if (flvjs.isSupported()) {
        const videoElement = videoContainer.value;
        data.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: data.jklist[i].video_url,
        });
        data.flvPlayer.attachMediaElement(videoElement);
        data.flvPlayer.load();
      }
    });
    jkMarkers.push(jkMarker)
  }
  data.jkMarkers = jkMarkers


  let sfMarkers = []
  for (let i = 0; i < data.aredList.length; i++) {
    let sfMarker = L.marker([data.aredList[i].lat, data.aredList[i].lnt], { icon: myIcon }).addTo(data.map);
    sfMarker.bindPopup(`
    <div class="popupdiv">设备状态: <span style="color:green">运行中</span></div>
    <div class="popupdiv">设备ID:${data.aredList[i].deviceId}</div>
    <div class="popupdiv">出水口编码:${data.aredList[i].waterOutletName}</div>
    <div class="popupdiv">设备编码:${data.aredList[i].deviceCode}</div>
    `);
    sfMarkers.push(sfMarker)
  }
  data.sfMarkers = sfMarkers


  let mwdMarkers = []
  for (let i = 0; i < data.miewendeng.length; i++) {
    let mwdMarker = L.marker([data.miewendeng[i].lat, data.miewendeng[i].lnt], { icon: mwd }).addTo(data.map);
    mwdMarkers.push(mwdMarker)
  }
  data.mwdMarkers = mwdMarkers
}

const flyto = (lat, lng) => {
  data.map.flyTo([lat, lng], 14);
  setTimeout(() => {
    data.map.flyTo([lat, lng], 16);
  }, 1000);
}

const showorhidemarkers = (cql) => {
  if (cql == "sfMarkers") {

    if (data.sfMarkerst) {
      data.sfMarkers.forEach(function (marker) {
        console.log(marker)
        marker.remove();  // 移除标记
      });
      data.sfMarkerst = false
    } else {
      data.sfMarkers.forEach(function (marker) {
        console.log(marker)
        marker.addTo(data.map);  // 移除标记
      });
      data.sfMarkerst = true
    }

  }
  if (cql == "mwdMarkers") {
    if (data.mwdMarkerst) {
      data.mwdMarkers.forEach(function (marker) {
        console.log(marker)
        marker.remove();  // 移除标记
      });
      data.mwdMarkerst = false
    } else {
      data.mwdMarkers.forEach(function (marker) {
        console.log(marker)
        marker.addTo(data.map);  // 移除标记
      });
      data.mwdMarkerst = true
    }

  }
  if (cql == "jkMarkers") {
    if (data.jkMarkerst) {
      data.jkMarkers.forEach(function (marker) {
        console.log(marker)
        marker.remove();  // 移除标记
      });
      data.jkMarkerst = false
    } else {
      data.jkMarkers.forEach(function (marker) {
        console.log(marker)
        marker.addTo(data.map);  // 移除标记
      });
      data.jkMarkerst = true
    }
  }
}

const closejk = () => {
  data.showjk = !data.showjk
  if (data.flvPlayer) {
    data.flvPlayer.pause();
    data.flvPlayer.unload();
    data.flvPlayer.detachMediaElement();
    data.flvPlayer.destroy();
    data.flvPlayer = null;
  }
}

defineExpose({
  flyto,
  showorhidemarkers
});
onMounted(() => {
  var that = this
  initMap();
  var axios = require('axios');
  var config = {
    method: 'get',
    url: '/sp/api/user/login?username=admin&password=2876c5c91e55a8829f60d92885cbb65e',
  };
  axios(config)
    .then(function (response) {
      console.log(response.data.data.accessToken);
      data.jktoken = response.data.data.accessToken
    })
    .catch(function (error) {
      console.log(error);
    });

});
</script>

<style lang="scss">
.map {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -10;
  box-sizing: border-box;
}

.location-icon {
  width: 68px;
  height: 100px;
  background: url("../../../../public/img/icon-map.png") center no-repeat;
  background-size: 68px 100px;
  z-index: 99;
}

.bus-label {
  width: vw(100);
  height: vh(30);
  line-height: vh(30);
  text-align: center;
  background: url("../../../../public/img/bus-point-label.png") center no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: font(18);
  margin-left: vw(-25);
  z-index: 99;
}

.device-label {
  width: vw(140);
  height: vh(60);
  line-height: vh(60);
  text-align: center;
  background: url("../../../../public/img/device-label.png") center no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: font(18);
  margin-left: vw(-25);
  margin-bottom: vh(-15);
  z-index: 99;
}

.markercontent {
  width: 900px;
  // height: 600px;
  position: relative;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.modelpoupou {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
}

.modelpoupouclose {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #999;
  cursor: pointer;
}

.pshow {
  z-index: 1111;
  display: flex;
}

.phide {
  z-index: -1111;
  display: none;
}
</style>
