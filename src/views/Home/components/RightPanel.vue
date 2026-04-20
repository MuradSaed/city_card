<template>
  <div class="content">

    <div class="echarts-panel">
      <div class="pie-title">各县市种植面积统计</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="farm-land" ref="echarts1"></div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">各县市耕地面积统计</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts2" ref="echarts2"></div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">流转交易统计</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts3" ref="echarts3"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      curIndex: -1
    };
  },
  mounted() {
    this.initEcharts1();
    this.initEcharts2();
    this.initEcharts3();

  },
  methods: {


    initEcharts1() {
      const myEcharts = echarts.init(this.$refs.echarts1);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#4C98FB", "#26C7C8", "#8CDF6C", "#F56679", "#83CCE7", "#73DEBD", "#FBD657", "#E07BCE"],
        legend: {
          width: 300,
          bottom: 10,
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          top: "5%",
          bottom: '25%',
          left: '0%',
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "category",
          data: ["哈巴河县", "布尔津县", "吉木乃县", "清河县", "富蕴县", "福海县"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "哈密瓜",
            type: "bar",
            stack: "total",
            data: [0, 0, 2817.3, 1574.9, 0, 43988.63]
          },
          {
            name: "小麦",
            type: "bar",
            stack: "total",
            data: [8.65, 1418.1, 0, 0, 14960, 0]
          },
          {
            name: "玉米",
            type: "bar",
            stack: "total",
            data: [98.77, 1159, 306, 113, 1200, 138]
          },

          {
            name: "油葵",
            type: "bar",
            stack: "total",
            data: [0, 410.1, 0, 0, 6980, 0]
          },
          {
            name: "苜蓿",
            type: "bar",
            stack: "total",
            data: [30, 0, 51, 0, 3248, 0]
          },
          {
            name: "甘草",
            type: "bar",
            stack: "total",
            data: [122, 0, 0, 0, 0, 0]
          },
    
          {
            name: "蔬菜",
            type: "bar",
            stack: "total",
            data: [0, 210.3, 11, 19, 103.6, 39]
          },
          {
            name: "花生",
            type: "bar",
            stack: "total",
            data: [225.29, 0, 0, 0, 0, 0]
          }



        ]
      };

      myEcharts.setOption(option);
    },

    initEcharts2() {
      const myChart = echarts.init(this.$refs.echarts2);
      let dataValue = [0, 0, 0, 0, 0];
      let dataValue2 = [1011.71, 3311.1, 3185.3, 1709.4, 26498.6, 44165.63];
      let dataName = ["哈巴河县", "布尔津县", "吉木乃县", "清河县", "富蕴县", "福海县"];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: [
          new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
            [
              { offset: 0, color: "#1AB0F9" },
              { offset: 1, color: "#36F3D5" }
            ]
          ),
          new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
            [
              { offset: 0, color: "#0066FF" },
              { offset: 1, color: "#2AC0FF" }
            ]
          )
        ],
        grid: {
          left: "0%",
          right: "4%",
          bottom: "5%",
          top: "20%",
          containLabel: true
        },
        legend: {
          top: 10,
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "category",
          data: dataName,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          // {
          //   name: "流转面积",
          //   type: "bar",
          //   data: dataValue,
          //   label: {
          //     show: true,
          //     precision: 1,
          //     position: "right",
          //     valueAnimation: true,
          //     color: "#36F2D5"
          //   }
          // },
          {
            name: "耕地面积",
            type: "bar",
            data: dataValue2,
            label: {
              show: true,
              precision: 1,
              position: "right",
              valueAnimation: true,
              color: "#2AC0FF"
            }
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    initEcharts3() {
      const myChart = echarts.init(this.$refs.echarts3);
      let dataValue = [1160, 1320, 860, 4680, 7300];
      // let dataValue2 = [0, 0, 0, 0, 0, 0, 0];
      // let dataValue3 = [0, 0, 0, 0, 0, 0, 0];
      let dataName = ["清河县", "吉木乃县", "布尔津县",  "福海县", "富蕴县"];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          textStyle: {
            color: "#fff"
          },
          data: ["二轮地", "集体地", "国有地"],
          top: "3%"
        },
        color: ["#9C66FF", "#45EBC6", "#2CA2FD"],
        grid: {
          left: "15%",
          right: "4%",
          bottom: "18%",
          top: "10%"
        },
        xAxis: {
          type: "category",
          data: dataName,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "亩",
            type: "bar",
            data: dataValue
          }
          // {
          //   name: "集体地",
          //   type: "bar",
          //   data: dataValue2
          // },
          // {
          //   name: "国有地",
          //   type: "bar",
          //   data: dataValue3
          // }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    fontSize(res) {
      let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },

  }
};
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.echarts-panel {
  text-align: right;
  margin: 5px 0 !important;
  flex: 1;
  background: rgba(26, 59, 61, 0.6);
  border-radius: 10px;
  padding: 10px 20px !important;
  box-sizing: border-box;
  height: 18.3125rem !important;

  .echarts2 {
    width: 100%;
    height: 90%;
  }

  .echarts3 {
    width: 100%;
    height: 90%;
  }
}

.img {
  width: 100%;
}

.echarts-pie-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100% !important;
  height: 80% !important;

  >div:last-child {
    margin-right: 15px;

    >div {
      display: flex;
      margin: 20px 0;
      flex-direction: row;
      align-items: center;
      font-size: calc(100vw * 18 / 1920);
      font-family: Microsoft YaHei;
    }
  }
}

.pie-title {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  font-size: calc(100vw * 18 / 1920);
}

.echarts-pie {
  height: 100%;
  width: 45%;
  //   background: url("../../../../public/img/pie-bg.png") no-repeat center center !important;
  //   background-size: 80% 90% !important;
}

.legend-title {
  width: calc(100vw * 110 / 1920);
  text-align: left;
}

.legend-color {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  margin-right: 10px;
}

.legend-color-1 {
  background: linear-gradient(29deg, #3870ff, #5ea9fd);
}

.color-1 {
  color: #3870ff;
}

.legend-color-2 {
  background: linear-gradient(-12deg, #09b3ff, #c518ff);
}

.color-2 {
  color: #c518ff;
}

.legend-color-3 {
  background: linear-gradient(117deg, #2996f6, #24e3d0);
}

.color-3 {
  color: #24e3d0;
}

.base-demo {
  font-size: calc(100vw * 16 / 1920);

  .base-num {
    font-weight: bold;
    font-size: calc(100vw * 24 / 1920);
    font-family: DOUYU;
    margin-bottom: 10px;
  }
}

.base {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.base-demo-img {
  position: relative;
  flex: 1;
  width: calc(100vw * 127 / 1920);
  height: calc(100vh * 101 / 1080);
  text-align: center;
  margin-top: 30px;

  .base-icon {
    position: absolute;
    width: calc(100vw * 54 / 1920);
    height: calc(100vh * 54 / 1080);
    top: 20px;
    left: calc(100vw * 36.5 / 1920);
  }

  .base-bottom {
    width: calc(100vw * 127 / 1920);
    height: calc(100vh * 101 / 1080);
    margin-bottom: 10px;
  }
}

.device-demo {
  font-size: calc(100vw * 16 / 1920);

  .device-demo-img {
    position: relative;
    flex: 1;
    width: calc(100vw * 166 / 1920);
    height: calc(100vh * 126 / 1080);
    text-align: center;
    margin-top: 10px;

    .device-num {
      font-weight: bold;
      font-size: calc(100vw * 24 / 1920);
      font-family: DOUYU;
      margin-bottom: 10px;
    }

    .device-icon {
      position: absolute;
      width: calc(100vw * 45 / 1920);
      height: calc(100vh * 45 / 1080);
      top: 50px;
      left: calc(100vw * 60 / 1920);
    }

    .device-bottom {
      width: calc(100vw * 166 / 1920);
      height: calc(100vh * 126 / 1080);
      margin-bottom: 10px;
    }
  }
}

@keyframes jump {
  0% {
    transform: translateY(0) scale(1, 1);
  }

  /* 中间状态图片位移并且拉伸 */
  50% {
    transform: translateY(-40px) scale(0.97, 1.03);
  }

  100% {
    transform: translateY(0) scale(1, 1);
  }
}

@keyframes jump2 {
  0% {
    transform: translateY(0) scale(1, 1);
  }

  /* 中间状态图片位移并且拉伸 */
  50% {
    transform: translateY(-25px) scale(0.97, 1.03);
  }

  100% {
    transform: translateY(0) scale(1, 1);
  }
}

.base-icon {
  /* 设置图片跳动动画 */
  animation: jump 3s ease infinite;
}

.device-icon {
  /* 设置图片跳动动画 */
  animation: jump2 3s ease infinite;
}

.color-green {
  color: #35fb92;
}

.color-yellow {
  color: #f7c12c;
}

.color-blue {
  color: #00f8ff;
}

.device-num-blue {
  background-image: linear-gradient(0deg, #00ffff 40%, #ffffff 60%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.device-num-green {
  background-image: linear-gradient(0deg, #00ff8a 40%, #ffffff 60%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.farm-land {
  width: 100% !important;
  height: 90% !important;
}
</style>
