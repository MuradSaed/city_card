<template>
  <div>
    <div v-if="!tc2">
      <div class="bg-map">
        <BgMap id="home4" ref="map" :queryParams="routerQueryParams"></BgMap>
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
          <li class="cunitem" @click="flyto" data-text="福海县" style="border-top: none;" data-lng="94.99"
            data-lat="43.76">
            福海县</li>
          <li class="cunitem" @click="flyto" data-text="富蕴县" data-lng="94.30" data-lat="43.33">富蕴县</li>
          <li class="cunitem" @click="flyto" data-text="清河县" data-lng="94.85" data-lat="43.46">清河县</li>
          <li class="cunitem" @click="flyto" data-text="吉木乃县" data-lng="95.26" data-lat="43.22">吉木乃县</li>
          <li class="cunitem" @click="flyto" data-text="布尔津县" data-lng="94.67" data-lat="43.24">布尔津县</li>
          <li class="cunitem" @click="flyto" data-text="哈巴河县" data-lng="93.38" data-lat="42.95">哈巴河县</li>
        </ul>
      </div>
      <div class="changest" @click="tc2 = true">
        切换气象视图
      </div>
      <div class="left-panel">
        <LeftPanel></LeftPanel>
      </div>
      <div class="right-panel">
        <RightPanel></RightPanel>
      </div>
      <div class="cqlbox">
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="全部">
          <div class="cqlcolor" style="background-color:#fbd657 ;"></div>
          <div>全部</div>
        </div>
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
          <div class="cqlcolor" style="background-color: #4c98fb;"></div>
          <div>高标准农田</div>
        </div>
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
          <div class="cqlcolor" style="background-color: #26c7c8;"></div>
          <div>实验田</div>
        </div>
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="小麦">
          <div class="cqlcolor" style="background-color: #8cdf6c;"></div>
          <div>农用地</div>
        </div>
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
          <div class="cqlcolor" style="background-color: #f56679;"></div>
          <div>林地</div>
        </div>
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
          <div class="cqlcolor" style="background-color: #83cce7;"></div>
          <div>草场</div>
        </div>
        <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="玉米">
          <div class="cqlcolor" style="background-color: #73debd;"></div>
          <div>其他</div>
        </div>
      </div>
    </div>
    <div v-else style="widows: 100%;height: calc(100vh ); padding-top: 165px;background-color: #26c7c8;">
      <iframe ref="myIframe"  style="width: 100%;height:calc(100% + 60px) ;margin-top: -60px;"  src="https://www.ventusky.com/?p=23.8;98.7;4&l=temperature-2m"
      frameborder="0"></iframe>

      <div class="backbtn" @click="tc2 = false">
        返回
      </div>
    </div>
  </div>
</template>

<script setup>
import BgMap from "./components1/BgMap.vue";
import LeftPanel from "./components1/LeftPanel.vue";
import RightPanel from "./components1/RightPanel.vue";
import { useRouter } from "vue-router"
import { ref, watch, getCurrentInstance } from 'vue';
// import {nextTick} from 'process'
const router = useRouter()
const routerQueryParams = ref({});
const tc2 = ref(false);
const map = ref(null)
const showarea = ref(false);
const selectcun = ref('福海县');
// 将router.query赋值给一个响应式变量
routerQueryParams.value = router.currentRoute.value.query.type;

// 监听路由变化来更新queryParams
watch(() => router.currentRoute.value.query.type, (newQuery, oldQuery) => {
  routerQueryParams.value = newQuery;
});




const flyto = function (e) {
  showarea.value = !showarea.value
  selectcun.value = e.currentTarget.dataset.text
  map.value.flyto(e.currentTarget.dataset.lat, e.currentTarget.dataset.lng)
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

.selectcun {

  border-radius: 6px;
  // padding: 10px;
  width: vw(200);
  position: fixed;
  right: vw(540);
  top: vh(122);
  z-index: 999;
}
.changest{
  border-radius: 6px;
  // padding: 10px;
  width: vw(200);
  height: 50px;
  line-height:50px;
  position: fixed;
  right: vw(540);
  top: vh(182);
  z-index: 999;
  background: rgba(26, 59, 61, 1);
  text-align: center;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}




.culist {
  width: 100%;
  background-color: rgba(26, 59, 61, 0.6);
  color: #fff;
  border-radius: 6px;
  // padding: 0px 10px;
  margin-top: 10px;
}

.cunitem {
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

.cunitem:hover {
  border: none;
  background-color: #00fbff7d;
}

.cqlbox {
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 10px 20px;
  padding-right: 10px;
  z-index: 9999;
  box-sizing: border-box;
  position: fixed;
  bottom: 28px;
  left: vw(540);
  width: vw(160);
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

.selectbox {
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

.righticon {
  width: 20px;
  height: 20px;
}

.righticon svg {
  width: 100%;
  height: 100%;
}
.backbtn{
  width: 50px;
  height: 50px;
  background:rgba(26, 59, 61, 0.6);
  position: absolute;
  left: calc(50% - 25px);
  top: 120px;
  z-index: 99999;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  line-height: 50px;
  overflow: hidden;
  cursor: pointer;
}
.backbtn:hover{
  background: rgba(26, 59, 61, 1);
}
</style>
