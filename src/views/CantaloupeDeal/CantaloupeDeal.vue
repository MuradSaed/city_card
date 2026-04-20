<template>
  <div class="bg-[#263b52] h-screen fixed top-0 left-0 right-0 bottom-0 -z-10">
    <div class="home">
      <div class="content">
        <total-panel class="total_panel"></total-panel>
        <div class="left_panel w-[70vw] h-screen">
          <Map2 v-model:chinaDatas="chinaDatas"></Map2>
        </div>
        <div class="right_panel w-[30vw] h-[90vh] flex flex-col mt-3 box-border" style="padding-top: 20px;padding-right: 20px;">
          <!-- <div class="line_chart h-[24vh]">
            <div class="echarts_title">8-9.15日每日收瓜数</div>
            <div class="h-full w-full">
              <line-chart></line-chart>
            </div>
          </div> -->
          <div class="h-[42vh]">
            <Rank></Rank>
          </div>
          <div class="line_chart h-[24vh]">
            <div class="echarts_title">省份成交排名</div>
            <div class="h-full w-full">
              <Bargraph></Bargraph>
            </div>
          </div>
               <div class="line_chart h-[24vh]" style="visibility: hidden;">
            <div class="echarts_title">8-9.15日每日收瓜数</div>
            <div class="h-full w-full">
              <line-chart></line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TotalPanel from "@/views/CantaloupeDeal/components/TotalPanel.vue";
import Map2 from "@/views/CantaloupeDeal/components/Map2.vue";
import LineChart from "@/views/CantaloupeDeal/components/LineChart.vue";
import Rank from "@/views/CantaloupeDeal/components/Rank.vue";
import Bargraph from "@/views/CantaloupeDeal/components/Bargraph.vue";
import { reactive } from "vue";
const chinaDatas = reactive([]);
</script>
<style lang="scss">
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
