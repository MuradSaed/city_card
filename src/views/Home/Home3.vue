<template>
  <div>
    <div class="bg-map">
      <BgMap id="home3" ref="map"  :queryParams="routerQueryParams"></BgMap>
    </div>

    <div class="selectcun all">
      <div class="selectbox " @click="selectarea">
        <div>{{ selectcun }}</div>
        <div class="righticon">
          <svg t="1730427663777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2309" width="200" height="200">
            <path
              d="M512 625.664L131.584 245.248c-28.16-28.16-73.216-28.16-101.376 0s-28.16 73.216 0 101.376l420.864 420.864c2.56 4.096 5.632 7.68 9.216 11.264 14.336 14.336 32.768 21.504 51.712 20.992 18.432 0 37.376-6.656 51.712-20.992 3.584-3.584 6.656-7.168 9.216-11.264l420.864-420.864c13.824-13.824 20.992-32.256 20.992-50.688 0-18.432-7.168-36.864-20.992-50.688-28.16-28.16-73.216-28.16-101.376 0L512 625.664z"
              fill="#fff" p-id="2310"></path>
          </svg>
        </div>
      </div>
      <ul class="culist" v-if="showarea">
        <li class="cunitem" @click="flyto" data-text="福海县" style="border-top: none;" data-lng="94.99" data-lat="43.76">
          福海县</li>
        <li class="cunitem" @click="flyto" data-text="富蕴县" data-lng="94.30" data-lat="43.33">富蕴县</li>
        <li class="cunitem" @click="flyto" data-text="清河县" data-lng="94.85" data-lat="43.46">清河县</li>
        <li class="cunitem" @click="flyto" data-text="吉木乃县" data-lng="95.26" data-lat="43.22">吉木乃县</li>
        <li class="cunitem" @click="flyto" data-text="布尔津县" data-lng="94.67" data-lat="43.24">布尔津县</li>
        <li class="cunitem" @click="flyto" data-text="哈巴河县" data-lng="93.38" data-lat="42.95">哈巴河县</li>
      </ul>
    </div>

    <div class="left-panel">
      <LeftPanel></LeftPanel>
    </div>
    <div class="right-panel" >
      <RightPanel></RightPanel>
    </div>
  </div>
</template>

<script setup>
import BgMap from "./components3/BgMap.vue";
import LeftPanel from "./components3/LeftPanel.vue";
import RightPanel from "./components3/RightPanel.vue";
import { ref, watch } from 'vue';
const map = ref(null)
const showarea = ref(false);
const selectcun = ref('布尔津县');
const flyto = function(e) {
  showarea.value = !showarea.value
  selectcun.value = e.currentTarget.dataset.text
  map.value.flyto(e.currentTarget.dataset.lat,e.currentTarget.dataset.lng)
}
const selectarea = function () {
  showarea.value = !showarea.value
}
</script>

<style lang="scss" scoped>
.bg-map {
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 999;
}

.left-panel {
  width: vw(496);
  height: vh(939);
  position: absolute;
  top: vh(117);
  left: vw(24);
  display: flex;
  color: #fff;
  z-index: 1000;
}

.right-panel {
  width: vw(496);
  height: vh(939);
  position: absolute;
  top: vh(117);
  right: vw(24);
  display: flex;
  color: #fff;
  z-index: 1000;
}
.selectbox{
  background: rgba(26, 59, 61, 1);
  cursor: pointer;
  color: #fff;
  height: 50px;
  border-radius: 6px;
  padding: 15px;
  font-size: 18px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.righticon{
  width: 20px;
  height: 20px;
}
.righticon svg{
  width: 100%;
  height: 100%;
}
.selectcun{
  border-radius: 6px;
  width: vw(200);
  position: fixed;
  right: vw(540);
  top: vh(122);
  z-index: 999;
}
.culist{
  width: 100%;
  background-color: rgba(26, 59, 61,0.6);
  color: #fff;
  border-radius: 6px;
  // padding: 0px 10px;
  margin-top: 10px;
}
.cunitem{
  width: 100%;
  border-top: 1px solid #92b0b0;
  overflow: hidden;
  // border: 1px solid #e5e5e5;
  height: 50px;
  line-height: 50px;
  // padding: 10px;
  box-sizing: border-box;

  cursor: pointer;
  color: #fff;
  // margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
}
.cunitem:hover{
  border: none;
  background-color: #00fbff7d ;
}
</style>
