<template>
  <div class="bg-[#263b52] h-screen fixed top-0 left-0 right-0 bottom-0 -z-10">
    <div class="home">
      <div class="content">
        <total-panel class="total_panel"></total-panel>
        <div class="left_panel w-[70vw] h-screen">
          <Map2 v-model:chinaDatas="chinaDatas"></Map2>
        </div>
        <div class="right_panel w-[30vw] h-[90vh] flex flex-col mt-3 box-border"
          style="padding-top: 20px;padding-right: 20px;">
          <!-- <div class="line_chart h-[24vh]">
            <div class="echarts_title">8-9.15日每日收瓜数</div>
            <div class="h-full w-full">
              <line-chart></line-chart>
            </div>
          </div> -->
          <div class="h-[42vh]">
            <Rank></Rank>
          </div>

          <div class="line_chart h-[24vh]" style="overflow: hidden;">

            <div class="carousel">
              <div class="carousel-inner" :style="{ 'transform': `translateX(${currentSlide}px)` }">
                <div v-for="(item, index) in items" :key="index" class="carousel-item">
                  <img style="width: 100%;" :src="item" >
                </div>
              </div>
            </div>

          </div>
          <!-- <div class="line_chart h-[24vh]" style="visibility: hidden;">
            <div class="echarts_title">省份成交排名</div>
            <div class="h-full w-full">
              <Bargraph></Bargraph>
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TotalPanel from "@/views/CantaloupeDeal/components2/TotalPanel.vue";
import Map2 from "@/views/CantaloupeDeal/components2/Map2.vue";
import LineChart from "@/views/CantaloupeDeal/components2/LineChart.vue";
import Rank from "@/views/CantaloupeDeal/components2/Rank.vue";
import Bargraph from "@/views/CantaloupeDeal/components2/Bargraph.vue";
import { reactive, ref, onMounted, onUnmounted } from "vue";


const items = ['img/图像(11).png', 'img/图像(3).png', 'img/图像(4).png','img/图像(5).png','img/图像(6).png','img/图像(7).png']; // 轮播图的内容
const currentSlide = ref(0); // 当前显示的项
const slideWidth = ref(300); // 每个轮播项的宽度
const autoPlayInterval = ref(null); // 自动播放的定时器

// 自动播放的函数
function autoPlay() {
  autoPlayInterval.value = setInterval(() => {
    goToNext();
  }, 3000); // 每3秒切换到下一个项
}

// 停止自动播放的函数
function stopAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
  }
}

// 切换到上一个项
function goToPrev() {
  if (currentSlide.value > 0) {
    currentSlide.value -= slideWidth.value;
  }
}

// 切换到下一个项
function goToNext() {
  if (currentSlide.value < (-items.length + 2) * slideWidth.value) {
    currentSlide.value = 0;
  } else {
    currentSlide.value -= slideWidth.value;
  }
}
// 在组件挂载时开始自动播放
onMounted(autoPlay);
// 在组件卸载时停止自动播放
onUnmounted(stopAutoPlay);

const chinaDatas = reactive([]);
</script>
<style lang="scss">
.carousel{
  width: 300px;
  margin: 10px auto;
  overflow: hidden;
}
.carousel-inner {
  display: flex;
  transition: transform 0.3s ease;
}

.carousel-item {
  width: 300px;
  display: flex;
  align-items: center;
  /* 根据实际需要设置宽度 */
  flex-shrink: 0;
  /* 其他样式 */
}

.home {
  position: relative;
  margin-top: vh(93);
}

.content {
  flex: 11;
  display: flex;
  flex-direction: row;

  .right_panel {
    .line_chart {
      flex: 1;
      background: url("../../../public/img/bargraph-panel.png") no-repeat scroll center;
      background-size: 100% 100%;
      margin: 0.625rem 0;
      padding: 0.625rem;
      box-sizing: border-box;
    }
  }
}

.transport_flow {
  box-sizing: border-box;
  width: 34.375rem;
  padding: 1.25rem;
  position: absolute;
  z-index: 666;
  bottom: 1.25rem;
  left: 1.25rem;
  z-index: 999;
}

.total_panel {
  width: 70vw;
  padding: 1.25rem;
  position: absolute;
  z-index: 999;
  top: 0;
}

.dialog {
  z-index: 999;
}

.echarts_title {
  font-size: calc(100vw * 18 / 1920);
  font-weight: bold;
  color: #ffffff;
  padding-right: 0.625rem;
  padding-top: 10px;
  text-align: right;
}
</style>
