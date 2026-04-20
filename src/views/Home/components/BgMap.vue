<template>
  <div>
    <div :id="id" class="map"></div>
    <div id="popup" class="ol-popup ol-popup-main" v-if="state.shodilog">
      <div class="popup_property_box">
        <div class="title_box">
          <div class="title_left">
            <div class="title_name"
              style="background-size: 100%;background-image: url(&quot;https://xjnydsj.xingnongbao.net:9003/wujiaqu/pop_3_title_bg-b93d9d43.png&quot;);">
              <div class="font_style">经营地-家庭农场</div>
            </div>
          </div>
          <div class="close" @click="closemb">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAa1JREFUSEu9lutRwzAQhHc7gA6gA+iASQVQAYEGIA0wCQ2QCng0AFRAhgYgFQAdUMIyl5EyZ0eWJSeD/tke36e925OO+OdFz5N0SvJ1V3uQdA7gneRPjLkGSroDcA1gTnKyLVTSGMADgG8AowhdAU0ZgBcHmZKcDYU6WAyxIDmyB69wDuBqW6ikMwDPLs6mwvhR0iMAy3tcVUolHQN4A7AXAjRgDYXbQktgSWCoaZXSUlgnMEAXAE760ivpEMBHLo3efI0+bPWk1cGgR+79hKSZa7UCzGp20FWzttM7gSFgCjom+TQElk2pU5GCWo+am6Oy39Dcy77ezSpsQT8dwMcthhUpdFBTYzWNquxTFawWaG70BhGAS5LWQsWrNKWdsNSNkKP3AiXtB2WxPdbKum6EwcAEzGJdWBpDW3y54BvnZgqca/y2Mvt/RnLqjHQB4L4GmgRKsvd2XPlTpgEbCt0ABpjt2m7suJKwIdD2TGPPVbBaqL/xB8NqoKkhqiiNXdaXlDVS1xCVrVnfsZKAJocos/sNgFtv/b7gBUqzQ9SuB2EbP5fJQXioktr//gBsgQYs3zNsKwAAAABJRU5ErkJggg=="
              class="title_right">
          </div>
        </div>
        <div class="con">
          <div class="content1 content">
            <div class=" margin-top">
              <div class="">
                <div class="fsfsfs">


                  <div class="flex_start">
                    <div class="el-descriptions__label1 ">
                      经营人
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.name != null ? state.pollution.name : '暂无' }}
                    </div>
                    <div class="el-descriptions__label1 ">
                      联系电话
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.phone != null ? state.pollution.phone : '暂无' }}
                    </div>
                    <div class="el-descriptions__label1 ">
                      种植亩数
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.lsms != null ? state.pollution.lsms + "亩" : '暂无' }}
                    </div>
                  </div>

                  <div class="flex_start">

                    <div class="el-descriptions__label1 ">
                      地块代码
                    </div>
                    <div class="el-descriptions__content1 ">
                      {{ state.pollution.land_code != null ? state.pollution.land_code : '暂无' }}
                    </div>
                    <div class="el-descriptions__label1 ">
                      地块名称
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.land_name != null ? state.pollution.land_name : '暂无' }}


                    </div>
                    <div class="el-descriptions__label1 ">
                      土地类型
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.land_use_type != null ? state.pollution.land_use_type : '暂无' }}

                    </div>

                  </div>





                  <!--  -->
                  <div class="flex_start">
                    <div class="el-descriptions__label1 ">
                      种植作物
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.cropname != null ? state.pollution.cropname : '暂无' }}


                    </div>
                    <div class="el-descriptions__label1 ">
                      细化分类
                    </div>
                    <div class="el-descriptions__content1">
                      暂无
                    </div>
                    <div class="el-descriptions__label1 ">
                      每亩需配水
                    </div>
                    <div class="el-descriptions__content1">
                      {{ state.pollution.mmjhps != null ? state.pollution.mmjhps : '暂无' }}

                    </div>


                  </div>

                  <div class="flex_start">
                    <div class="el-descriptions__label1">
                      所属乡镇
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px">
                      {{ state.pollution.town != null ? state.pollution.town : '暂无' }}
                    </div>
                    <div class="el-descriptions__label1 ">
                      所属村
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px">
                      {{ state.pollution.cun != null ? state.pollution.cun : '暂无' }}
                    </div>
                  </div>







                  <div class="flex_start">
                    <div class="el-descriptions__label1 ">
                      地块东至
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                    <div class="el-descriptions__label1 ">
                      地块西至
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                  </div>


                  <div class="flex_start">
                    <div class="el-descriptions__label1 ">
                      地块南至
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                    <div class="el-descriptions__label1 ">
                      地块北至
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>

                  </div>

                  <div class="flex_start">
                    <div class="el-descriptions__label1 ">
                      出让人姓名
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                    <div class="el-descriptions__label1 ">
                      联系电话
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                  </div>

                  <div class="flex_start">
                    <div class="el-descriptions__label1 ">
                      身份证号
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                    <div class="el-descriptions__label1 ">
                      户籍所在地
                    </div>
                    <div class="el-descriptions__content1" style="width: 210px;">
                      暂无
                    </div>
                  </div>

                  <div class="flex_start">

                    <div class="el-descriptions__label1 ">
                      备注
                    </div>
                    <div class="el-descriptions__content1" style="width: 610px;">
                      暂无
                      <!-- {{ state.pollution.description != null ? state.pollution.description : '暂无' }} -->


                    </div>
                  </div>




                </div>
              </div>
            </div>
          </div><!----><!----><!---->
        </div>
      </div>
    </div>
  </div>



</template>

<script setup>
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import geojson from '@/assets/map/json/yiwuxian.json'
import dong from '@/assets/map/json/dong.json'
import axios from "axios";
import { ref, reactive, watch, onMounted, watchEffect, nextTick, defineProps, defineExpose } from "vue";
import { useRouter } from "vue-router"

const props = defineProps({
  queryParams: Object,
  id: String
});
let map = ref(null);
const centerLat = ref(48.08660);
const centerLng = ref(87.15712);

const initMap = () => {
  map.value = L.map(props.id, {
    center: [centerLat.value, centerLng.value], // 地图中心
    zoom: 15, //缩放比列
    zoomControl: false, //禁用 + - 按钮
    doubleClickZoom: false, // 禁用双击放大
    attributionControl: false // 移除右下角leaflet标识
  });
  let tdtKey = "fec6ab6bd6785c8ff8b4a233192de352";

  // 遮罩
  // var countryLayer = L.geoJSON(dong, {
  //   style: function (feature) {
  //     return {
  //       weight: 4,
  //       opacity: 1,
  //       color: '#95f9fa',
  //       fillOpacity: 0,
  //       fillColor: '#41a5a8'
  //     }
  //   }
  // }).addTo(map.value)
  // map.value.fitBounds(countryLayer.getBounds());


  //边界高亮及遮罩效果，arr是内部行政区边界线的geojson的坐标

    //设置自定义窗格zindex层级，让它在底部层级
    let polygonPane = map.value.createPane('polygonPane')
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
    polygonLayer.addTo(map.value)



  L.tileLayer(
    "http://t0.tianditu.gov.cn/img_w/wmts?" +
    "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
    "&tk=fec6ab6bd6785c8ff8b4a233192de352",
    {
      maxZoom: 18,
      minZoom: 5
    }
  ).addTo(map.value);

  L.tileLayer(
    `http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtKey}`,
    {
      subdomains: "01234567"
    }
  ).addTo(map.value);




  let wmsUrl = "/geoserveraddress/geoserver/wms";
  L.tileLayer
    .wms(wmsUrl, {
      format: "image/png",
      layers: state.wmsname,
      transparent: true
    })
    .addTo(map.value);









  map.value.on('click', function (e) {
    console.log(1111)
    console.log(e)
    var url = getFeatureInfoUrl(map.value, e.latlng);
    axios.get(url).then(res => {
      console.log('getFeatureInfoUrl====>', res);
      if (res.data.features && res.data.features[0]) {
        console.log('properties====>', res.data.features, res.data.features[0].properties);
        state.pollution = res.data.features[0].properties
        // 展示框框
        map.value.flyTo(e.latlng, 18);
        state.shodilog = true
      } else {
        return
      }
    })
  })
};
onMounted(() => {
  initMap();
});

const state = reactive({
  count: 0,
  name: 'Vue 3',
  shodilog: false,
  pollution: {},
  wmsname: "td_land"
});
// 监听props变化
watch(props, (post, pre) => {

  nextTick(() => {
    if (post.queryParams) {
      // map.value.remove()
      console.log(map.value)
      if (post.queryParams == "1") {
        console.log("type1")
        centerLat.value = 43.775556
        centerLng.value = 95.007637
      }
      if (post.queryParams == "2") {
        console.log("type2")
        centerLat.value = 43.264751
        centerLng.value = 94.736502
      }
      if (post.queryParams == "3") {
        // 种植一张图
        console.log("type4")
        centerLat.value = 43.304609268544645
        centerLng.value = 94.32003021513698
      }
      map.value.flyTo([centerLat.value, centerLng.value], 12);
      setTimeout(() => {
        map.value.flyTo([centerLat.value, centerLng.value], 14);
      }, 1000);
    }
  });
}, {
  immediate: true, // 设置 immediate 选项为 true
  flush: 'post'
});



const closemb = () => {
  state.shodilog = false
  map.value.flyTo([centerLat.value, centerLng.value], 14);
}
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

const flyto = (lat, lng) => {
  map.value.flyTo([lat, lng], 12);
  setTimeout(() => {
    map.value.flyTo([lat, lng], 14);
  }, 1000);
}

defineExpose({
  flyto
});

</script>

<style lang="scss">
.map {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
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
