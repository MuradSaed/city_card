<template>
  <div class="content">
    <div class="echarts-panel">
      <div class="pie-title">养殖主体数量统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts1" ref="echarts1"></div>
        <div class="legend">
          <div>
            <div>
              <div class="legend-color legend-color-3"></div>
              <div class="labeltext">
                <div class="legend-title">养殖骆驼</div>
                <div class="legend-num">5家</div>
              </div>
            </div>

            <div>
              <div class="legend-color legend-color-2"></div>
              <div class="labeltext">
                <div class="legend-title">养殖牛</div>
                <div class="legend-num">10家</div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="legend-color legend-color-1"></div>
              <div class="labeltext">
                <div class="legend-title">养殖羊</div>
                <div class="legend-num">15家</div>
              </div>
            </div>
            <div>
              <div class="legend-color legend-color-6"></div>
              <div class="labeltext">
                <div class="legend-title">养殖猪</div>
                <div class="legend-num">5家</div>
              </div>
            </div>

          </div>
          <div>
            <div>
              <div class="legend-color legend-color-5"></div>
              <div class="labeltext">
                <div class="legend-title">养殖马</div>
                <div class="legend-num">5家</div>
              </div>
            </div>
            <div>
              <div class="legend-color legend-color-7"></div>
              <div class="labeltext">
                <div class="legend-title">其他</div>
                <div class="legend-num">2家</div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">存栏量统计</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts2" ref="echarts2"></div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">本月动物检疫统计</div>
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
    fontSize(res) {
      let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    initEcharts1() {
      const myEcharts = echarts.init(this.$refs.echarts1);
      let option = {
        color: ["#4C98FB", "#26C7C8", "#8CDF6C", "#F56679", "#83CCE7", "#73DEBD", "#FBD657", "#E07BCE"],
        grid: {},
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}亩 ({d}%)"
        },
        title: {
          text: "养殖主体数量",
          subtext: "42家",
          left: "center",
          top: "35%",
          textStyle: {
            fontWeight: "lighter",
            lineHeight: 20,
            color: "#fff",
            fontSize: this.fontSize(0.12)
          },
          subtextStyle: {
            fontSize: this.fontSize(0.16),
            fontWeight: "bold",
            color: "#12FDFE"
          }
        },
        series: [
          {
            stack: "a",
            type: "pie",
            radius: ["50%", "70%"],
            roseType: "area",
            zlevel: 10,
            label: {
              show: false
            },
            data: [
              {
                name: "骆驼",
                value: 5
              },
              {
                name: "牛",
                value: 10
              },
              {
                name: "羊",
                value: 15
              },
              {
                name: "猪",
                value: 5
              },

              {
                name: "马",
                value: 5
              },
              {
                name: "其他",
                value: 2
              }
        
            ]
          }
        ]
      };
      myEcharts.setOption(option);
      setInterval(() => {
        let data = option.series[0].data;
        let dataLen = option.series[0].data.length;
        myEcharts.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: this.curIndex
        });
        this.curIndex = (this.curIndex + 1) % dataLen;
        myEcharts.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: this.curIndex
        });
        myEcharts.setOption({
          title: {
            text: data[this.curIndex].name,
            subtext: data[this.curIndex].value + "家"
          }
        });
      }, 1000);
    },
    initEcharts2() {
      const myChart = echarts.init(this.$refs.echarts2);
      let dataValue = [20151, 84449, 5163, 9462, 9561, 7113];
      let dataName = ["牛", "羊","马", "骆驼", "猪", "鸡"];
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
          left: "2%",
          right: "4%",
          bottom: "10%",
          top: "10%",
          containLabel: true
        },
        legend: {
          show:false,
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
          {
            name: "流转面积",
            type: "bar",
            data: dataValue,
            label: {
              show: true,
              precision: 1,
              position: "right",
              valueAnimation: true,
              color: "#36F2D5"
            }
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    initEcharts3() {
      const myChart = echarts.init(this.$refs.echarts3);
      let dataValue = [274, 957, 548, 1190, 6681];
      let dataName = ["骆驼", "羊", "牛", "肉鸡", "商品猪"];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show:false,
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
          bottom: "25%",
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
            name: "本月动物检疫统计",
            type: "bar",
            data: dataValue
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    }
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
  border-radius: 6px;
  padding: 10px 20px !important;
  box-sizing: border-box;
  height: 18.3125rem !important;

  .echarts2 {
    width: 100%;
    height: 90%;
  }

  .echarts3 {
    width: 100%;
    height: 100%;
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
    // margin-right: 15px;

    >div {
      display: flex;
      // margin-bottom: 5px;
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
.legend {
  width: 50%;

  >div {
    display: flex;
    flex-direction: row;
    font-size: calc(100vw * 12 / 1920);
    justify-content: space-around;

    >div {
      display: flex;
      flex-direction: row;
      align-items: center;

      >div:last-child {
        margin-left: 5px;
      }
    }
  }

  .legend-title {
    text-align: left;
    font-family: Microsoft YaHei;
  }

  .legend-num {
    font-size: calc(100vw * 18 / 1920);
    color: #58fffd;
    font-family: DINPro;
  }

  .legend-color {
    width: calc(100vw * 7 / 1920);
    height: calc(100vh * 24 / 1080);
    border-radius: 4px;
  }

  .legend-color-1 {
    background-color: #4c98fb;
  }

  .legend-color-2 {
    background-color: #26c7c8;
  }

  .legend-color-3 {
    background-color: #8cdf6c;
  }

  .legend-color-4 {
    background-color: #f56679;
  }

  .legend-color-5 {
    background-color: #83cce7;
  }

  .legend-color-6 {
    background-color: #73debd;
  }

  .legend-color-7 {
    background-color: #fbd657;
  }

  .legend-color-8 {
    background-color: #e07bce;
  }
}
.labeltext {
  width: 80px;
}
</style>
