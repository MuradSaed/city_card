<template>
    <div class="w-full h-full">
      <Map :lat="lat" ref="map" :lng="lng"></Map>
      <div class="left-panel">
        <!-- <LeftPanel></LeftPanel> -->
        <div class="selectcun all">
          <div class="pie-title">各村镇地块分布</div>
          <img class="img" src="img/panel/line.png" />
          <div class="culist">
  
            <div class="cunitem" @click="flytomap" data-lng="94.99" data-lat="43.76">福海县</div>
              <div class="cunitem" @click="flytomap" data-lng="94.30" data-lat="43.33">富蕴县</div>
              <div class="cunitem" @click="flytomap" data-lng="94.85" data-lat="43.46">清河县</div>
              <div class="cunitem" @click="flytomap" data-lng="95.26" data-lat="43.22">吉木乃县</div>
              <div class="cunitem" @click="flytomap" data-lng="94.67" data-lat="43.24">布尔津县</div>
              <div class="cunitem" @click="flytomap" data-lng="93.38" data-lat="42.95">哈巴河县</div>
  
            <!-- <div v-for="(item,index) in aredList" :key="index" @click="flytomap" :data-lng="item.lng" :data-lat="item.lat" class="cunitem">{{ item.landName }}</div> -->
          </div>
  
  
        </div>
      </div>
      <div class="right-panel">
        <RightPanel></RightPanel>
      </div>
    </div>
  </template>
  
  <script setup>
  // import BgMap from "../land-manage/components/BgMap.vue";
  import Map from "./components3/Map.vue";
  import LeftPanel from "./components3/LeftPanel.vue";
  import RightPanel from "./components3/RightPanel.vue";
  // import { getland, getLandDeviceList } from '@/api/api.js'
  import { ref } from "vue";
  const lat = ref(43.310609268544)
  const lng = ref(94.366302151369)
  
  const map = ref(null)
  const flytomap = function(e) {
    map.value.flyto(e.currentTarget.dataset.lat,e.currentTarget.dataset.lng)
  }
  </script>
  
  <style lang="scss" scoped>
  .left-panel {
    // width: calc(100vw * 496 / 1920);
    height: calc(100vh * 939 / 1080);
    position: absolute;
    top: calc(100vh * 117 / 1080);
    left: calc(100vw * 24 / 1920);
    display: flex;
    color: #fff;
  }
  
  .right-panel {
    width: calc(100vw * 496 / 1920);
    height: calc(100vh * 939 / 1080);
    position: absolute;
    top: calc(100vh * 117 / 1080);
    right: calc(100vw * 24 / 1920);
    display: flex;
    color: #fff;
  }
  
  
  .selectcun{
    background: rgba(26, 59, 61, 0.6);
    border-radius: 6px;
    padding: 20px;
    width:vw(280) ;
  }
  .culist{
    width: 100%;
    padding-top: 20px;
  }
  .cunitem{
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
    // border: 1px solid #e5e5e5;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #61d2d87d;
    cursor: pointer;
    color: #fff;
    margin-bottom: 20px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
  }
  .cunitem:hover{
    border: none;
    background-color: #00fbff7d ;
  }
  </style>
  