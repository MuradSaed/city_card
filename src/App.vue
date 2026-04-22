<template>
  <div class="main">
    <div id="app" >
      <div class="time">
        <img class="time-img" src="../public/img/icon-time.png" />
        <div class="time-label">{{ time }}</div>
      </div>
      <div class="weather" @click="goWeather">
        <img class="weather-img" src="../public/img/icon-weather.png" />
        <div class="weather-label">多云 10℃</div>
        <div class="weather-label">风速 南风2级</div>
      </div>
      <div class="loginout" @click="loginoutfun">
        退出系统
      </div>

      <div class="top-title">
        <div style="margin-top: -30px; margin-left: 20px;font-size: 24px;line-height: 1;">霍尔果斯数字孪生城市名片平台</div>
      </div>
      <div class="top">
        <div class="top-left">
          <div class="menu-item" :class="active == '1' ? 'active' : 'no-active'" @click="menuClick('1')">首页</div>
          <div class="menu-item margin-left zhuisu" @click="menuClick('2')" :class="active == '2' || active == '10' ? 'active' : 'no-active'">
            核心指标
          </div>
          <div class="menu-item margin-left" :class="active == '3' ? 'active' : 'no-active'" @click="menuClick('3')">
            数字党建
          </div>
          <div class="menu-item margin-left" :class="active == '4' ? 'active' : 'no-active'" @click="menuClick('4')">
            数字政务
          </div>
        </div>
        <div class="top-right">
          <div class="menu-item margin-left" :class="active == '3' ? 'active' : 'no-active'" @click="menuClick('3')">
            数字经济
          </div>
          <div class="menu-item margin-left" :class="active == '6' ? 'active' : 'no-active'" @click="menuClick('6')">
            数字社会
          </div>
          <div class="menu-item margin-left" :class="active == '7' ? 'active' : 'no-active'" @click="menuClick('7')">
            数字文化
          </div>
          <div class="menu-item margin-left zhuisu" :class="active == '8' || active == '9' ? 'active' : 'no-active'">
            平安霍城
            <div class="zhuisubox">
              <div class="item" @click="menuClick('8')">马铃薯</div>
              <div class="item" @click="menuClick('9')">驼奶粉</div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-bg"></div>
      <div class="right-bg"></div>
      <div class="bottom-bg"></div>




      <router-view>


      </router-view>
    </div>
    <!-- <login @onlogin="loginfun" v-else></login> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import login from "./views/login.vue";

var islogin = ref(false)
if (localStorage.islogin) {
  console.log('登录过')
  islogin.value = true;
} else {
  console.log('没登录过')

}


const router = useRouter();
let active = ref("1");

const loginfun = (e) => {

  localStorage.islogin = "1";
  islogin.value = true
};

const loginoutfun = (e) => {
  localStorage.removeItem("islogin");
  islogin.value = false
};

const menuClick = (index) => {
  active.value = index;
  console.log(index);
  switch (index) {
    case "1":
      router.push({ path: "/" });
      break;
    case "2":
      router.push({ path: "/home1" });
      break;
    case "3":
      router.push({ path: "/home2"});
      break;
    case "4":
      router.push({ path: "/home3" });
      break;
    case "5":
      router.push({ path: "/planting" });
      break;
    case "6":
      router.push({ path: "/planting2" });
      break;
    case "7":
      router.push({ path: "/monitoring" });
      break;
    case "8":
      router.push({ path: "/hmg" });
      break;
    case "9":
      router.push({ path: "/hmg2" });
      break;
    case "10":
      router.push({ path: "/planting3" });
      break;

    default:
      break;
  }

};

const debounce = (fn, wait) => {
  var timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
    location.reload();
  };
};

const width = ref("1920");
const height = ref("1080");
const style = reactive({
  width: width.value + "px",
  height: height.value + "px",
  transform: "scale(1) translate(-50%, -50%)"
});
// 获取放大缩小比例
const getScale = () => {
  const w = window.innerWidth / width.value;
  const h = window.innerHeight / height.value;
  console.log("scale", [w, h]);
  return [w, h];
};
// 设置比例
const setScale = () => {
  style.transform = "scale(" + getScale()[0] + "," + getScale()[1] + ") translate(-50%, -50%)";
};
let time = ref("");
onMounted(() => {
  // router.push({ path: "/" });
  let href = window.location.href;
  let path = href.substring(href.lastIndexOf("/") + 1);
  console.log(path)
  if (path !== "") {
    switch (path) {
    case "/":
      active.value = 1;
      break;
    case "/home1":
      active.value = 2;
      break;
    case "home2":
      active.value = 3;
      break;
    case "home3":
      active.value = 4;
      break;
    case "planting":
      active.value = 5;
      break;
    case "planting2":
      active.value = 6;
      break;
    case "monitoring":
      active.value = 7;
      break;
    case "hmg":
      active.value = 8;
      break;
    case "hmg2":
      active.value = 9;
      break;
    case "planting3":
      active.value = 10;
      break;
    default:
      break;
  }


  }
  setInterval(() => {
    time.value = new Date().toLocaleString();
  }, 1000);

  setScale();
  window.onresize = debounce(setScale, 200);
});
</script>
<style lang="scss" scoped>
.zhuisubox {
  display: none;
  position: absolute;
  bottom: -100px;
  left: 0px;
  width: 80%;
  z-index: 99999;

  border-radius: 6px;

  background-color: rgba(26, 59, 61, 1);
  ;
}

.zhuisubox .item {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
}

.zhuisubox .item:hover {
  color: #03ddde;
}

.zhuisu:hover .zhuisubox {
  display: block;
}

.zhuisu {
  position: relative;
}

@font-face {
  font-family: DOUYU;
  src: url("./assets/douyuFont.otf");
}

.main {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.time {
  position: fixed;
  top: vh(7);
  left: vw(21);
  width: vw(300);
  height: vh(29);
  z-index: 1002;
  color: #fff;
  display: flex;
  align-items: center;

  .time-img {
    height: vh(28);
  }

  .time-label {
    font-size: font(14);
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    margin-left: vw(13);
  }
}

.loginout {
  position: fixed;
  height: vh(28);
  top: vh(10);
  right: vw(12);
  z-index: 1002;
  font-size: 14px;
  color: #03ddde;
  cursor: pointer;
}

.loginout:hover {
  color: #07ffff;
}

.weather {
  position: fixed;
  height: vh(28);
  top: vh(8);
  right: vw(100);
  display: flex;
  align-items: center;
  z-index: 1002;
  cursor: pointer;

  .weather-img {
    height: vh(28);
  }

  .weather-label {
    font-size: font(14);
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    margin-left: vw(13);
  }
}

.top-title {
  width: vw(1920);
  height: vh(126);
  background: url("../public/img/top-bg.png") no-repeat scroll center;
  background-size: cover;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: font(36);
  font-family: DOUYU;
  font-weight: 400;
  color: #ffffff;
  line-height: vh(216);
}

.top {
  width: vw(1920);
  height: vh(93);
  background: url("../public/img/top-title.png") no-repeat scroll center;
  background-size: cover;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  justify-content: space-between;

  .top-left {
    // width: vw(624);
    height: vh(48);
    margin-left: vw(56);
    margin-top: vh(52);
    display: flex;

    .menu-item {
      width: vw(177);
      height: vh(51);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: font(18);
      font-family: Microsoft YaHei;
      font-weight: 400;
      cursor: pointer;
    }

    .margin-left {
      margin-left: vw(-24);
    }

    .no-active {
      background: url("../public/img/menu-left.png") no-repeat scroll center;
      background-size: cover;
      color: #03ddde;
    }

    .active {
      background: url("../public/img/menu-left-active.png") no-repeat scroll center;
      background-size: cover;
      color: #fff;
    }
  }

  .top-right {
    height: vh(48);
    margin-right: vw(56);
    margin-top: vh(52);
    display: flex;

    .menu-item {
      width: vw(177);
      height: vh(51);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: font(18);
      font-family: Microsoft YaHei;
      font-weight: 400;
      cursor: pointer;
    }

    .no-active {
      background: url("../public/img/menu-right.png") no-repeat scroll center;
      background-size: cover;
      color: #03ddde;
    }

    .active {
      background: url("../public/img/menu-right-active.png") no-repeat scroll center;
      background-size: cover;
      color: #fff;
    }

    .margin-left {
      margin-left: vw(-30);
    }
  }
}

// .left-bg {
//   width: vw(127);
//   height: vh(1041);
//   background: url("../public/img/left-bg.png") no-repeat scroll center;
//   background-size: cover;
//   color: #fff;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
// }

// .right-bg {
//   width: vw(126);
//   height: vh(1041);
//   background: linear-gradient(90deg, rgba(17, 56, 63, 0) 0%, rgba(17, 56, 63, 0.8) 100%);
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   z-index: 1000;
// }

// .bottom-bg {
//   width: vw(1920);
//   height: vh(125);
//   background: url("../public/img/bottom-bg.png") no-repeat scroll center;
//   background-size: cover;
//   color: #fff;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
// }</style>
<style>
/* 页面切换动画 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  /* will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置 */
  will-change: transform;
  transition: all ease 0.4s;
  -webkit-transition: all ease 0.4s;
  position: absolute;
  width: 100%;
  left: 0;
}

.slide-right-enter {
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}

.slide-right-leave-active {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}

.slide-left-enter {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}

.slide-left-leave-active {
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}

.pie-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
}
</style>
