<template>
  <div class="dialog">
    <img src="../../../../public/img/dialog-close.png" class="close" @click="closed" />
    <div class="dialog-title">物联网监控</div>
    <div class="bg-[#285e6a] video">
      <img src="../../../../public/img/video-bg.png" />
    </div>
    <div class="flex">
      <div class="sensor-info">
        <div class="fix-width">
          <img class="icon-bg" src="../../../../public/img/icon-light.png" />
          <div class="sensor-title">光合有效辐射</div>
        </div>
        <div class="sensor-value">124</div>
        <div class="sensor-unit">W/m2</div>
      </div>
      <div class="sensor-info">
        <div class="fix-width">
          <img class="icon-bg" src="../../../../public/img/icon-light-strength.png" />
          <div class="sensor-title">光照强度</div>
        </div>
        <div class="sensor-value">124</div>
        <div class="sensor-unit">Lux</div>
      </div>
    </div>
    <div class="flex">
      <div class="sensor-info">
        <div class="fix-width">
          <img class="icon-bg" src="../../../../public/img/icon-humidity.png" />
          <div class="sensor-title">空气湿度</div>
        </div>
        <div class="sensor-value">124</div>
        <div class="sensor-unit">%RH</div>
      </div>
      <div class="sensor-info">
        <div class="fix-width">
          <img class="icon-bg" src="../../../../public/img/icon-temperature.png" />
          <div class="sensor-title">空气温度</div>
        </div>
        <div class="sensor-value">30</div>
        <div class="sensor-unit">℃</div>
      </div>
    </div>
    <div class="flex">
      <div class="sensor-info">
        <div class="fix-width">
          <img class="icon-bg" src="../../../../public/img/icon-conductivity.png" />
          <div class="sensor-title">土壤电导率</div>
        </div>
        <div class="sensor-value">124</div>
        <div class="sensor-unit">us/cm</div>
      </div>

      <div class="sensor-info">
        <div class="fix-width">
          <img class="icon-bg" src="../../../../public/img/icon-soil-temperature.png" />
          <div class="sensor-title">土壤温度</div>
        </div>
        <div class="sensor-value">40</div>
        <div class="sensor-unit">℃</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, watch, defineProps, defineEmits } from "vue";
const emits = defineEmits(["closecloseVideoDialogVideoDialog"]);

const closed = () => {
  emits("closeVideoDialog");
};
</script>
<style lang="scss" scoped>
.dialog {
  color: #fff;
  background: url("../../../../public/img/dialog-bg.png") no-repeat scroll center;
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1001;
  box-sizing: border-box;
}

.dialog-title {
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
}

.video {
  border: 1px solid #09e9ea;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
}

.close {
  width: 15px;
  position: absolute;
  right: 20px;
}

.sensor-info {
  width: 49%;
  height: 6vh;
  background: url("../../../../public/img/sensor-bg.png") no-repeat scroll center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  margin: 4px;
  .fix-width {
    width: 136px;
    display: flex;
    align-items: center;

    .icon-bg {
      width: 30px;
      height: 30px;
      margin-left: 12px;
    }

    .sensor-title {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      line-height: 120px;
      margin-left: 8px;
    }
  }

  .sensor-value {
    font-size: font(24);
    font-family: DIN;
    font-weight: 400;
    color: #00ffff;
    line-height: 120px;
  }

  .sensor-unit {
    font-size: 14px;
    font-family: DIN;
    font-weight: 400;
    color: #ffffff;
    line-height: 120px;
    margin-left: 8px;
  }
}

.label {
  font-size: 18px;
  color: #fff;
  text-align: justify-all;
}

.content {
  font-size: 18px;
  color: #fff;
}
.flex:last-child {
  margin-bottom: 20px;
}
</style>
