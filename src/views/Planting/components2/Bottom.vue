<template>
  <div class="info">
    <img src="../../../../public/img/farm-detail-footer-icon1.png" />
    <div>
      安全监管次数：<span style="color: #00f3fb; margin: 0 10px">{{
        place.superviseTimes || "暂无信息"
      }}</span>
    </div>
    <div>
      合格率：<span style="color: #22fd55; margin: 0 10px"
        >{{ place.passRate || "暂无信息" }}%</span
      >
    </div>
    <div class="line"></div>
    <img src="../../../../public/img/farm-detail-footer-icon2.png" />
    <div>
      绿色认证面积：<span style="color: #00f3fb; margin: 0 10px"
        >{{ place.authenticationArea || "暂无信息" }}亩</span
      >
    </div>
    <div>
      占地比例：<span style="color: #22fd55; margin: 0 10px"
        >{{ place.coverArea || "暂无信息" }}%</span
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["place"],
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  height: 50px;
  background: url("../../../../public/img/bk_bottom.png") center no-repeat;
  text-align: center;
  vertical-align: bottom;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  font-size: 18px;
  color: #c4edf2;
  padding-bottom: 5px;

  > img {
    height: 30px;
    width: 30px;
    margin: 0 10px;
  }
}
.line {
  height: 25px;
  width: 2px;
  margin: 0 10px;
  border-left: 1px solid #3ebcbc;
}
</style>
