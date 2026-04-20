<template>
  <div class="w-full h-full">
    <Map :lat="lat" ref="map" :lng="lng"></Map>
    <div class="left-panel">
      <!-- <LeftPanel></LeftPanel> -->
      <div class="selectcun all">
        <div class="pie-title">养殖合作社</div>
        <img class="img" src="img/panel/line.png" />

        <div class="searchbox">
          <input type="text" name="" placeholder="搜索养殖合作社" id="">
          <div>
            <svg t="1730451738669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6590" width="200" height="200">
              <path
                d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0"
                p-id="6591"></path>
            </svg>
          </div>
        </div>
        <div class="culist">
          <div class="cunitem" v-for="(item, index) in list" :key="index" @click="flytomap" :data-lng="zb[index][0]"
            :data-lat="zb[index][1]">
            <div class="oneline">{{ item }}</div>
            <div>
              <svg t="1730452076908" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7613" width="200" height="200">
                <path
                  d="M512 938.666667c-53.333333 0-384-257.258667-384-469.333334S299.925333 85.333333 512 85.333333s384 171.925333 384 384-330.666667 469.333333-384 469.333334z m0-352c64.8 0 117.333333-52.533333 117.333333-117.333334s-52.533333-117.333333-117.333333-117.333333-117.333333 52.533333-117.333333 117.333333 52.533333 117.333333 117.333333 117.333334z"
                  p-id="7614"></path>
              </svg>
            </div>

          </div>
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
import Map from "./components/Map.vue";
import LeftPanel from "./components/LeftPanel.vue";
import RightPanel from "./components/RightPanel.vue";
// import { getland, getLandDeviceList } from '@/api/api.js'
import { ref } from "vue";
const lat = ref(43.310609268544)
const lng = ref(94.316302151369)
const map = ref(null)

const list = ref([
  "阿勒泰淖毛湖初鑫养殖农民专业合作社",
  "阿勒泰众汇养殖专业合作社",
  "阿勒泰张忠华生猪养殖专业合作社",
  "阿勒泰丰年牲畜养殖农民专业合作社",
  "阿勒泰志忠牲畜养殖农民专业合作社",
  "阿勒泰茂源牲畜养殖农民专业合作社",
  "哈密鑫源骞驴养殖专业合作社",
  "阿勒泰哈巴河县福田生猪养殖专业合作社",
  "阿勒泰旭丰生猪养殖专业合作社",
  "哈密伊州区仟佰头牛羊养殖专业合作社",
  "哈密市伊缘养殖专业合作社",
  "阿勒泰江鑫昌达养殖农民专业合作社",
  "阿勒泰下马崖众合骆驼养殖专业合作社",
  "阿勒泰吉木乃县伊驼养殖农民专业合作社",
  "阿勒泰绿丰园种植农民专业合作社",
  "阿勒泰吉丰养殖农民专业合作社",
  "阿勒泰清河县阿依塔克养殖农民专业合作社",
  "阿勒泰益农养殖农民专业合作社",
  "阿勒泰福林祥牲畜养殖农民专业合作社",
  "阿勒泰银健养殖农民专业合作社",
  "阿勒泰钢铁骆驼饲养农民专业合作社",
  "阿勒泰俊发牛羊育肥专业合作社",
  "阿勒泰傲日郭楞种植农民专业合作社",
  "阿勒泰富蕴县绿驰丰采养殖农民专业合作社",
  "阿勒泰中驼骆驼养殖农民专业合作社",
  "阿勒泰雪山养殖农民专业合作社",
  "阿勒泰盐池乡冰山羊肉专卖合作社",
  "阿勒泰胜帮养殖农民专业合作社",
  "阿勒泰建辉牲畜养殖农民专业合作社"

])

const zb = ref([
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

  [93.90, 43.44],
  [93.93, 43.43],
  [93.86, 43.48],

  [95.06, 43.82],
  [95.03, 43.89],
  [94.87, 43.48],
  [94.88, 43.49],
  [94.87, 43.48],
  [95.29, 43.14],
  [95.27, 43.18],
  [94.67, 43.24]

])

const flytomap = function (e) {
  map.value.flyto(e.currentTarget.dataset.lat, e.currentTarget.dataset.lng)
}
</script>

<style lang="scss" scoped>
.searchbox {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-radius: 6px;
  background-color: rgba(26, 59, 61, 1);
}

.searchbox input {
  width: 100%;
  height: 100%;
  line-height: 40px;
  background-color: transparent;
  text-decoration: none;
  border: none;
  outline: none;
}

.searchbox svg {
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
}

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


.selectcun {
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 20px;
  width: vw(350);
}

.culist {
  width: 100%;
  height: vh(800);
  overflow-y: auto;
  margin-top: 10px;
}

.culist::-webkit-scrollbar-track {

  background-color: rgba(26, 59, 61, 0.6);
}

.culist::-webkit-scrollbar-thumb {

  background-color: #61d2d87d
}

.culist::-webkit-scrollbar {
  width: 2px;
}

.cunitem {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  // border: 1px solid #e5e5e5;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  // background-color: #61d2d87d;
  cursor: pointer;
  color: #fff;
  margin-bottom: 0px;
  line-height: 20px;
  text-align: left;
  font-size: 16px;
}

.cunitem svg {
  width: 20px;
  height: 20px;
  fill: #fff;

}

.cunitem:hover {
  border: none;
  background-color: #00fbff7d;
}

.oneline {
  width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
