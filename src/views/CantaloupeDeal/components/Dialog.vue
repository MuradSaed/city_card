<template>
  <div class="dialog">
    <img src="../../../../public/img/close.png" class="close" @click="closed" />
    <div class="dialog-title">运单详情</div>
    <img
      class="img"
      src="../../../../public/img/dot-header.png"
      alt=""
      srcset=""
    />
    <div class="row-info">
      <div>拉 运 日 期：</div>
      <div>{{ item.transportTime || "--" }}</div>
    </div>
    <div class="row-info">
      <div>司 机 信 息：</div>
      <div>{{ item.driverName || "--" }}</div>
    </div>
    <div class="row-info">
      <div>农 户 信 息：</div>
      <div>{{ item.fromName || "--" }}</div>
    </div>
    <div class="row-info">
      <div>发货人信息：</div>
      <div>{{ item.fromName || "--" }}</div>
    </div>
    <div class="row-info">
      <div>收货人信息：</div>
      <div>{{ item.toName || "--" }}</div>
    </div>
    <div class="row-info">
      <div>拉 运 吨 数：</div>
      <div>{{ item.weight || "--" }}</div>
    </div>
    <div class="row-info">
      <div>目&nbsp;&nbsp;&nbsp;的&nbsp;&nbsp;&nbsp;地：</div>
      <div>{{ item.province || "--" }}</div>
    </div>
    <img
      class="img"
      src="../../../../public/img/dot-bottom.png"
      alt=""
      srcset=""
    />
  </div>
</template>
<script>
import { detail } from "@/api/statistic.js";
export default {
  props: ["id", "showDialog"],
  data() {
    return {
      item: {
        transportTime: "",
        driverName: "",
        fromName: "",
        toName: "",
        weight: "",
        province: "",
      },
    };
  },
  created() {
    detail(this.id).then((res) => {
      console.log(res);
      this.item = res.data;
    });
  },
  methods: {
    closed() {
      this.$emit("update:showDialog", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  position: relative;
  width: calc(100vw * 658 / 1920);
  height: calc(100vh * 500 / 1080);
  color: "#fff";
  height: 37%;
  background: url("../../../../public/img/poup.png") no-repeat scroll center;
  background-size: 100% 100%;
  position: fixed;
  top: 20%;
  left: 30%;
  padding: 20px;
  box-sizing: border-box;
}
.dialog-title {
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: calc(100vw * 18 / 1920);
}
.img {
  width: 100%;
}
.row-info {
  color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 calc(100vw * 20 / 1920);
  font-size: calc(100vw * 16 / 1920);
  > div:first-child {
    width: calc(100vw * 120 / 1920);
    height: calc(100vw * 40 / 1920);
    line-height: calc(100vw * 40 / 1920);
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
  }
}
.close {
  width: calc(100vw * 15 / 1920);
  position: absolute;
  right: calc(100vw * 20 / 1920);
}
</style>
