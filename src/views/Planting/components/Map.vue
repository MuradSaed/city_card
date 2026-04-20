<template>
  <div>
    <div id="map" class="map"></div>
    <VideoDialog class="fixed top-[25vh] left-[30vw] w-[34vw] z-50" v-if="showVideoDialog"
      @closeVideoDialog="closeVideoDialog"></VideoDialog>


    <!-- <div class="cqlbox">
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="全部">
        <div class="cqlcolor" style="background-color: green;"></div>
        <div>全部</div>
      </div>
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="小麦">
        <div class="cqlcolor" style="background-color: #4a66f3;"></div>
        <div>智慧球阀</div>
      </div>

      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
        <div class="cqlcolor" style="background-color: #FFFF00;"></div>
        <div>摄像头</div>
      </div>

      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
        <div class="cqlcolor" style="background-color: pink;"></div>
        <div>其他设备</div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import VideoDialog from "./VideoDialog.vue";
import geojson from '@/assets/map/json/yiwuxian.json'
import dong from '@/assets/map/json/dong.json'
import Bottom from "./Bottom.vue";
import axios from "axios";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getland, getLandDeviceList } from '@/api/api.js'
import iconLocation from "../../../../public/img/icon-map.png";
import busBgIcon from "../../../../public/img/bus-point-bg.png";
import iconDeviceLabel from "../../../../public/img/device-label.png";
import iconCamera from "../../../../public/img/camera.png";
import iconEnvironment from "../../../../public/img/environment.png";
import { onMounted, ref, reactive, watch, defineProps, defineEmits, nextTick, defineExpose } from "vue";
const props = defineProps(["lng", "lat", "deviceList", "camera", "cameraVisible", "weatherInfo", "deviceId"]);
let showVideoDialog = ref(false);


const centerLat = ref(48.08660);
const centerLng = ref(87.15712);


const state = reactive({
  count: 0,
  name: 'Vue 3',
  shodilog: false,
  pollution: {},
  wmsname: "tgland_xianyiwu_xiangzhennaomaohu"
});
const data = reactive({
  detailId: 0,
  show: false,
  mapLevel: 6,
  centerLng: 94.316302151369,
  centerLat: 43.310609268544,
  map: null,
  currentDevice: null,
  weatherList: [], //传感器数组
  aredList: [
    [94.28, 43.32],
    [94.42, 43.33],
    [94.50, 43.31],
    [94.99, 43.76],
    [94.94, 43.79],
    [95.06, 43.82],
    [95.03, 43.89],
    [94.87, 43.48],
    [94.88, 43.49],
    [94.87, 43.48],
    [95.29, 43.14],
    [95.27, 43.18],
    [94.67, 43.24],

    [94.76, 43.26],
    [94.75, 43.21],
    [94.21, 43.49],
    [94.32, 43.58],
    [94.68, 43.26],
    [94.73, 43.25],
    [95.12, 43.60],
    
    [93.90,43.44],  
    [93.93,43.43],
    [93.86,43.48],
    [95.06, 43.82],
    [95.03, 43.89],
    [94.87, 43.48],
    [94.88, 43.49],
    [94.87, 43.48],
    [95.29, 43.14],
    [95.27, 43.18],
    [94.67, 43.24]
  ]
});
watch(
  () => props.lat,
  () => {
    nextTick(() => {

      // data.map.flyTo([props.lat, props.lng], 5);
      // addLocation(props.lat, props.lng);

    })

  }, {
  immediate: true, // 设置 immediate 选项为 true
  flush: 'post'
}
);

const closemb = () => {
  state.shodilog = false
  data.map.flyTo([centerLat.value, centerLng.value], 14);
}
const addLocation = (Lat, Lng) => {
  let markerIcon1 = L.divIcon({
    html:
      "<div class='device-div'><div class='device-label'>物联网设备</div><img class='device-bg' src='" +
      iconLocation +
      "'/></div>", //marker标注
    className: "",
    iconSize: [57, 71], //marker宽高
    iconAnchor: [28.5, 55] //文字标注相对位置
  });
  var marker1 = new L.marker([Lat, Lng], {
    opacity: 1,
    icon: markerIcon1
  });
  marker1.addTo(data.map).on("click", function (e) {
    showVideoDialog.value = true;
    console.log(showVideoDialog);
  });

  let markerIcon = L.divIcon({
    html:
      "<div class='bus-div'><div class='bus-label'>经营主体</div><img class='bus-bg' src='" + busBgIcon + "'/></div>", //marker标注
    className: "",
    iconSize: [57, 71], //marker宽高
    iconAnchor: [30, 120] //文字标注相对位置
  });
  var marker = new L.marker([Lat + 0.001, Lng + 0.001], {
    opacity: 1,
    icon: markerIcon
  });
  // marker.addTo(data.map).on("click", function (e) {
  //   showBusinessDialog.value = true;
  // });
};

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
    x: 50,
    y: 50,
    layers: state.wmsname,//图层服务名
    query_layers: state.wmsname, //图层服务名
    info_format: 'application/json'
  };
  params[map.getCenter().lat < 0 ? 'i' : 'x'] = parseInt(point.x);
  params[map.getCenter().lng < 0 ? 'j' : 'y'] = parseInt(point.y);
  console.log('params====>', params);
  let url = "/geoserveraddress/geoserver/wms" + L.Util.getParamString(params, "", true);
  console.log('url====>', url);
  return url
}
const initMap = () => {
  data.map = L.map("map", {
    center: [data.centerLat, data.centerLng], // 地图中心
    zoom: 5, //缩放比列
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


  //边界高亮及遮罩效果，arr是内部行政区边界线的geojson的坐标

  //设置自定义窗格zindex层级，让它在底部层级
  let polygonPane = data.map.createPane('polygonPane')
  polygonPane.style.zIndex = 200
  polygonPane.style.pointerEvents = 'none'
  //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
  const NW = { lat: 59.0, lng: 73.0 } //西北
  const NE = { lat: 59.0, lng: 136.0 } //东北
  const SE = { lat: 3.0, lng: 136.0 } //东南
  const SW = { lat: 3.0, lng: 73.0 } //西南
  let maskLatLngs = [NW, SW, SE, NE, NW]
  let points = []
  dong.features[0].geometry.coordinates[0][0].forEach(item => {
    points.push({ lat: item[1], lng: item[0] })
  })
  maskLatLngs = maskLatLngs.concat(points)
  maskLatLngs.push(NW) //最后再次添加西北角闭合图形
  let polygonLayer = L.polygon(maskLatLngs, {
    color: 'transparent',
    fillColor: '#000',
    fillOpacity: 0.4,
    pane: 'polygonPane'
  })
  polygonLayer.addTo(data.map)




  // let wmsUrl = "/geoserveraddress/geoserver/wms"
  // // let wmsUrl = "/geoserver/gengyun/wms";

  // L.tileLayer
  //   .wms(wmsUrl, {
  //     format: "image/png",
  //     // layers: "gengyun:tb_land_info_yiwu",
  //     layers: "gbznt",

  //     transparent: true
  //   })
  //   .addTo(data.map);



  // L.tileLayer
  //   .wms(wmsUrl, {
  //     format: "image/png",
  //     // layers: "gengyun:tb_land_info_yiwu",
  //     layers: "tgcrop_hami_yiwu_2024",

  //     transparent: true
  //   })
  //   .addTo(data.map);


  L.Popup.prototype._animateZoom = function (e) {
  if (!this._map) {
    return
  }
  var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
    anchor = this._getAnchor()
  L.DomUtil.setPosition(this._container, pos.add(anchor))
}


  // 绘制图片

  //自定义图片marker
  let myIcon = L.icon({
    iconUrl: '/img/yangzhi.png',
    iconSize: [40, 25],
    // iconAnchor: [21, 21],
    popupAnchor: [0, -20],//注意坐标轴的方向
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });

  for (let i = 0; i < data.aredList.length; i++) {
    let customIconMarker = L.marker([data.aredList[i][1], data.aredList[i][0]], { icon: myIcon }).addTo(data.map);
    customIconMarker.bindPopup(`
    <div class="popupdiv">合作社名称:阿勒泰清河县阿依塔克养殖农民专业合作社</div>
    <div class="popupdiv">经营状态: <span style="color:green">经营中</span></div>
    <div class="popupdiv">负责人:阿斯甫·玉努斯</div>
    <div class="popupdiv">负责人电话:13699363935</div>
    <div class="popupdiv">社员信息:暂无</div>
    <div class="popupdiv">养殖种类:牛</div>
    <div class="popupdiv">存栏量:147头</div>
    <div class="popupdiv">详细地址:新疆哈密地区阿勒泰吉木乃县老政府院内</div>
    `,{ minWidth: 500 });
  }


  data.map.on('click', function (e) {
    console.log(1111)
    console.log(e)
    var url = getFeatureInfoUrl(data.map, e.latlng);
    axios.get(url).then(res => {
      console.log('getFeatureInfoUrl====>', res);
      if (res.data.features && res.data.features[0]) {
        console.log('properties====>', res.data.features, res.data.features[0].properties);
        state.pollution = res.data.features[0].properties
        // 展示框框
        data.map.flyTo(e.latlng, 18);
        state.shodilog = true
      } else {
        return
      }
    })
  })
}




onMounted(() => {
  initMap();
});


// 获取地块数据
const getlandinfo = async () => {
  const res = await getland({ "userId": null })
  console.log(res.data)
  res.data[0].lat = 43.299609268544
  res.data[0].lng = 94.386302151369
  res.data[1].lat = 43.282563487976105
  res.data[1].lng = 94.38356637954713
  data.aredList.value = res.data
  // 获取设备信息
  for (let i = 0; i < res.data.length; i++) {
    const sbinfo = await getLandDeviceList({ "companyId": res.data[i].companyId, "landId": res.data[i].landId })
    console.log(sbinfo)
    // 绘制设备信息
  }
}
// getlandinfo()


const flyto = (lat, lng) => {
  data.map.flyTo([lat, lng], 12);
  setTimeout(() => {
    data.map.flyTo([lat, lng], 14);
  }, 1000);
}

defineExpose({
  flyto
});
</script>

<style>
.popupdiv {
  width: 500px;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
<style lang="scss" scoped>

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

.cqlbox {
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 10px 20px;
  padding-right: 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 28px;
  left: vw(320);
  width: vw(130);
  color: #fff;
}

.cqlitem {
  cursor: pointer;
  margin-bottom: 4px;
}

.cqlcolor {
  width: vw(16);
  height: vw(16);
  border-radius: 4px;
  margin-right: 10px;

}



.ol-popup-main {
  // display: none;
  width: 800px;
  height: fit-content;
  left: calc(50% - 400px);
  top: 20vh;

}

.ol-popup {
  position: absolute;
  box-shadow: 0 1px 4px #0003;
  opacity: 1;
  z-index: 99999;
}

.popup_property_box {
  width: 800px;
  height: 530px;
  background: rgba(26, 59, 61, 0.6) linear-gradient(202deg, #00dddd85 0%, rgba(3, 36, 28, .25) 100%);
  box-shadow: inset 0 0 15px #54b19e;
  border-radius: 0;
  opacity: 1;
  border: 1px solid #00dddd;
  // border-image: linear-gradient(71deg, rgb(48, 255, 203), rgba(255, 255, 255, .25)) 1 1;


}

.fsfsfs {
  border: 1px solid rgba(136, 252, 209, .2);
  ;
}

.title_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 0px;
  box-sizing: border-box;
  color: #fff;
}

.title_left {
  width: 80%;
  font-weight: bold;

}

.title_right {
  width: 15px;
  position: relative;
  top: -10px;
}

.font_style {
  position: relative;
  top: -10px;
  left: 20px;
  font-weight: bold;

  background: linear-gradient(180deg, #FFFFFF 0%, #00dddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

.con {
  padding: 20px;
  box-sizing: border-box;
}

.table {
  padding: 20px;
  font-size: 0px;
  box-sizing: border-box;
}

.el-descriptions__label1 {
  // flex: 1;
  width: 120px;
  height: 48px;
  background: rgba(31, 78, 66, .3);
  border: 1px solid rgba(136, 252, 209, .2);
  font-size: 14px;
  font-weight: 400;
  color: #ffffffd9;
  line-height: 22px;
  line-height: 40px;
  padding: 4px 7px;
  box-sizing: border-box;

}

.el-descriptions__content1 {
  flex: 2;
  width: 110px;
  height: 48px;
  background: rgba(3, 35, 27, .3);
  border: 1px solid rgba(136, 252, 209, .2);
  font-size: 14px;
  font-weight: 400;
  color: #ffffffd9;
  line-height: 40px;
  box-sizing: border-box;
  padding: 4px 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}

.oneline {}

.flex_start {
  display: flex;
  justify-content: flex-start;
}

.alicenter {
  align-items: center;
}
</style>
