<template>
  <div class="dialog">
    <img src="../../../../public/img/dialog-close.png" class="close" @click="close" />
    <div class="dialog-title">经营主体</div>
    <!-- <img class="img" src="../../../../public/img/dot-header.png" alt="" srcset="" /> -->
    <div class="gap my-2"></div>
    <div class="row">
      <div>
        <div class="label">名称：</div>
      </div>
      <div>
        <div class="label">陈家庄子</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">编号：</div>
      </div>
      <div>
        <div class="label">234657778234367</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">统一社会代码：</div>
      </div>
      <div>
        <div class="label">246823657898099</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">主体类型：</div>
      </div>
      <div>
        <div class="label">个体</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">经营类目：</div>
      </div>
      <div>
        <div class="label">种植</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">入网面积：</div>
      </div>
      <div>
        <div class="label">234 亩</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">法人代表：</div>
      </div>
      <div>
        <div class="label">陈某某</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">联系方式：</div>
      </div>
      <div>
        <div class="label">18394028129</div>
      </div>
    </div>
    <img class="img-line my-2" src="../../../../public/img/bus-line.png" />
    <div class="dialog-title">获得荣誉</div>
    <div class="auth-bg">
      <div class="auth-item">
        <div class="col-bg">
          <div class="auth-label mt-[1.5vh]">GIA</div>
          <div class="auth-label">认证</div>
        </div>
      </div>
      <div class="auth-item">
        <div class="col-bg">
          <div class="auth-label mt-[1.5vh]">有机</div>
          <div class="auth-label">认证</div>
        </div>
      </div>
      <div class="auth-item">
        <div class="col-bg">
          <div class="auth-label mt-[1.5vh]">有机</div>
          <div class="auth-label">认证</div>
        </div>
      </div>
    </div>
    <img class="img-line mb-2" src="../../../../public/img/bus-line.png" />
    <div class="row">
      <div>
        <div class="label">地块位置：</div>
      </div>
      <div>
        <div class="label">大泉乡-五道河子村</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">当前经营人信息：</div>
      </div>
      <div>
        <div class="label">未流转</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">经营人：</div>
      </div>
      <div>
        <div class="label">五道河子村委会</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">联系电话：</div>
      </div>
      <div>
        <div class="label">18394028129</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">联系电话：</div>
      </div>
      <div>
        <div class="label">18394028129</div>
      </div>
    </div>
    <div class="row">
      <div>
        <div class="label">身份证号：</div>
      </div>
      <div>
        <div class="label">29934488118976539</div>
      </div>
    </div>
    <div class="dialog-title margin-top-16">经营主体照片</div>
    <div class="flex flex-row img-list">
      <img alt="example" class="img" v-for="item in imgList" :key="item" :src="item" />
    </div>
  </div>
</template>
<script setup>
import { reactive, defineEmits } from "vue";

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};

const imgList = reactive([
  "https://p4.itc.cn/q_70/images03/20210408/fbd0707aea0746dea9a4f9e594f0a108.jpeg",
  "https://p5.itc.cn/q_70/images03/20210408/f1c3e03e5011478ca096306d3beeb33f.jpeg"
]);
</script>
<style lang="scss" scoped>
.dialog {
  box-sizing: border-box;
  color: #fff;
  background: url("../../../../public/img/dialog-bg.png") no-repeat scroll center;
  background-size: 100% 100%;
  padding: 20px;
  z-index: 1001;
}
.dialog-title {
  width: 100%;
  text-align: left;
  color: #ffffff;
  font-size: font(18);
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.close {
  width: vw(15);
  position: absolute;
  right: vw(20);
}
.gap {
  margin-top: vh(8);
  width: vw(464);
  height: vh(2);
  background: linear-gradient(90deg, #07fcfc 0%, rgba(7, 252, 252, 0) 100%);
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  > div:first-child > .label {
    width: 18vw;
  }
}
.label {
  margin-top: vh(10);
  font-size: font(14);
  color: #fff;
  text-align: justify-all;
}
.auth-bg {
  display: flex;
  flex-direction: row;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
.col-bg {
  width: vw(150);
  height: vh(176);
  background: url("../../../../public/img/auth-bg.png") no-repeat scroll center;
  background-size: 100% 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.img-list {
  height: vh(120);
}
.img {
  width: vw(120);
  height: vh(80);
  margin: 10px;
}
</style>
