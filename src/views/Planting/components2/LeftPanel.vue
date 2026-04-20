<template>
  <div class="content">
    <div class="echarts-panel">
      <div class="pie-title">阿勒泰耕地红线</div>
      <img class="img" src="img/panel/line.png" />
      <div class="farm-land" ref="farmLand"></div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">耕地数据统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="plowland">
        <div>
          <div class="dkzs">
            <img src="img/panel/icon-dkzs.png" />
            <div class="dkzs-text">地块总数</div>
          </div>
          <div class="dkzs-label">123456块</div>
        </div>
        <div>
          <div class="lzmj">
            <img src="img/panel/icon-lzmj.png" />
            <div class="lzmj-text">流转面积</div>
          </div>
          <div class="lzmj-label">123456块</div>
        </div>
        <div>
          <div class="httj">
            <img src="img/panel/icon-httj.png" />
            <div class="httj-text">合同统计</div>
          </div>
          <div class="httj-label">123456块</div>
        </div>
        <div>
          <div class="qqrs">
            <img src="img/panel/icon-qqrs.png" />
            <div class="qqrs-text">合同统计</div>
          </div>
          <div class="qqrs-label">123456块</div>
        </div>
      </div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">种植特色</div>
      <img class="img" src="img/panel/line.png" />
      <div class="plant">
        <div>
          <div class="farm-num">
            <div class="plant-echart-1" ref="plantEchart1"></div>
          </div>
          <div>高标准农田数</div>
        </div>
        <div>
          <div class="green-num">
            <div class="plant-echart-1" ref="plantEchart2"></div>
          </div>
          <div>
            <div>获得绿色认证</div>
            <div>地块数</div>
          </div>
        </div>
        <div>
          <div class="organic-num">
            <div class="plant-echart-1" ref="plantEchart3"></div>
          </div>
          <div>
            <div>获得有机认证</div>
            <div>地块总数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.farmLandInitEcharts();
    this.plantInitEcharts1();
    this.plantInitEcharts2();
    this.plantInitEcharts3();
  },
  methods: {
    fontSize(res) {
      let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    farmLandInitEcharts() {
      const myEcharts = echarts.init(this.$refs.farmLand);
      let value = { value: 500, name: "耕地总面积" };
      let min = 0;
      let max = 600;
      let option = {
        series: [
          {
            name: "最外层",
            type: "gauge",
            radius: "106%",
            center: ["50%", "70%"],
            splitNumber: 0, //刻度数量
            startAngle: 180,
            endAngle: 0,
            min: min, //最小刻度
            max: max, //最大刻度
            z: 0,
            zlevel: 0,
            axisLine: {
              show: true,
              lineStyle: {
                // 轴线样式
                width: 0, // 宽度
                color: [
                  [0.5, "red"],
                  [1, "#35F1D6"]
                ]
              }
            },
            //分隔线样式
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              color: "#12FCFF",
              offsetCenter: [0, "40%"]
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "20%"],
              textStyle: {
                fontSize: this.fontSize(0.6),
                color: "#EEFFFF"
              },
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|w亩}";
              },
              rich: {
                value: {
                  fontSize: this.fontSize(0.24),
                  fontWeight: "bolder",
                  color: "#EEFFFF"
                },
                unit: {
                  fontSize: this.fontSize(0.24),
                  color: "#EEFFFF"
                }
              }
            },
            data: [{ value: 600, name: "耕地总面积" }]
          },
          {
            name: "数据显示",
            type: "gauge",
            radius: "100%",
            center: ["50%", "70%"],
            splitNumber: 6, //刻度数量
            startAngle: 180,
            endAngle: 0,
            min: min, //最小刻度
            max: max, //最大刻度
            z: 2,
            zlevel: 2,
            axisLine: {
              show: true,
              lineStyle: {
                // 轴线样式
                width: 10, // 宽度
                color: [[1, "#35F1D6"]]
              }
            },
            splitLine: {
              // 分隔线样式。
              show: true, // 是否显示分隔线,默认 true。
              length: 8, // 分隔线线长。支持相对半径的百分比,默认 30。
              lineStyle: {
                // 分隔线样式。
                color: "35F1D6", //线的颜色,默认 #eee。
                opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                width: 2 //线度,默认 2。
              }
            },
            axisLabel: {
              show: false,
              color: "#4b695e",
              fontSize: 12,
              distance: -5
            },
            axisTick: {
              show: true,
              splitNumber: 3,
              distance: 6,
              lineStyle: {
                color: "#35F1D6",
                width: 2
              },
              length: 8
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 20,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "red"
              }
            },
            title: {
              fontSize: this.fontSize(0.14),
              color: "#F67658",
              fontWeight: "bolder",
              offsetCenter: ["140%", "-42%"]
            },
            detail: {
              show: true,
              fontSize: this.fontSize(0.14),
              color: "#F67658",
              offsetCenter: ["140%", "-60%"],
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|w亩}";
              },
              rich: {
                value: {
                  fontSize: this.fontSize(0.14),
                  fontWeight: "bolder",
                  color: "#F67658"
                },
                unit: {
                  fontSize: this.fontSize(0.14),
                  fontWeight: "bolder",
                  color: "#F67658"
                }
              }
            },
            data: [{ value: 500, name: "红线" }]
          },
          {
            type: "pie",
            radius: "73%",
            center: ["50%", "70%"],
            hoverAnimation: false,
            animation: false,
            startAngle: 180,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              normal: {
                color: function (colors) {
                  var colorList = ["#35F1D6", "transparent"];
                  return colorList[colors.dataIndex];
                }
              }
            },
            // itemStyle: {
            //   color: "transparent",
            // },
            data: [{ value: 1 }, { value: 1 }]
          }
        ]
      };
      myEcharts.setOption(option);
    },
    plantInitEcharts1() {
      const myEcharts = echarts.init(this.$refs.plantEchart1);
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 30000,
            splitNumber: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                1,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "#FFDB83" },
                  { offset: 1, color: "#FFFFFF" }
                ]
              ),
              shadowColor: "#fff",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            pointer: {
              show: false
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            title: {
              show: true,
              fontSize: this.fontSize(0.16),
              color: "#FFB049",
              offsetCenter: ["0", "45%"]
            },
            detail: {
              offsetCenter: ["0", "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|亩}";
              },
              rich: {
                value: {
                  fontSize: this.fontSize(0.16),
                  fontWeight: "bolder",
                  color: "#FFB049"
                },
                unit: {
                  fontSize: this.fontSize(0.16),
                  color: "#FFB049"
                }
              }
            },
            data: [
              {
                value: 23456,
                name: "20块地"
              }
            ]
          }
        ]
      };
      myEcharts.setOption(option);
    },
    plantInitEcharts2() {
      const myEcharts = echarts.init(this.$refs.plantEchart2);
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 30000,
            splitNumber: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                1,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "#48F5BF" },
                  { offset: 1, color: "#FFFFFF" }
                ]
              ),
              shadowColor: "#fff",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            pointer: {
              show: false
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            title: {
              show: true,
              fontSize: this.fontSize(0.16),
              color: "#41E1AE",
              offsetCenter: ["0", "45%"]
            },
            detail: {
              offsetCenter: ["0", "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|亩}";
              },
              rich: {
                value: {
                  fontSize: this.fontSize(0.16),
                  fontWeight: "bolder",
                  color: "#41E1AE"
                },
                unit: {
                  fontSize: this.fontSize(0.16),
                  color: "#41E1AE"
                }
              }
            },
            data: [
              {
                value: 23456,
                name: "20块地"
              }
            ]
          }
        ]
      };
      myEcharts.setOption(option);
    },
    plantInitEcharts3() {
      const myEcharts = echarts.init(this.$refs.plantEchart3);
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 30000,
            splitNumber: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                1,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "#1AF4FF" },
                  { offset: 1, color: "#FFFFFF" }
                ]
              ),
              shadowColor: "#fff",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            pointer: {
              show: false
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            title: {
              show: true,
              fontSize: this.fontSize(0.16),
              color: "#1AF4FF",
              offsetCenter: ["0", "45%"]
            },
            detail: {
              offsetCenter: ["0", "0%"],
              valueAnimation: true,
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|亩}";
              },
              rich: {
                value: {
                  fontSize: this.fontSize(0.16),
                  fontWeight: "bolder",
                  color: "#1AF4FF"
                },
                unit: {
                  fontSize: this.fontSize(0.16),
                  color: "#1AF4FF"
                }
              }
            },
            data: [
              {
                value: 23456,
                name: "20块地"
              }
            ]
          }
        ]
      };
      myEcharts.setOption(option);
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
  box-sizing: border-box;
  margin: 5px 0 !important;
  flex: 1;
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 10px 20px !important;
  height: calc(100vh * 293 / 1080);

  > div:last-child {
    width: 100%;
    height: 100%;
  }
}

.img {
  width: 100%;
}

.pie-title {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  font-size: calc(100vw * 18 / 1920);
}

.plowland {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 8% !important;

  > div {
    //图标及图标内文字
    > div:first-child {
      height: calc(100vh * 105 / 1080);
      width: calc(100vw * 91 / 1920);
      text-align: center;

      > img {
        display: inline-block;
        width: calc(100vw * 30 / 1920);
        height: calc(100vh * 30 / 1080);
        margin-top: 25% !important;
      }

      //图标里的字体大小
      > div:last-child {
        font-size: calc(100vw * 16 / 1920);
        font-family: Microsoft YaHei;
        font-weight: bold;
      }
    }

    //图标的标签
    > div:last-child {
      text-align: center;
      margin-top: 35% !important;
    }
  }
}

.dkzs {
  background: url("../../../../public/img/panel/icon-dkzs-bg.png") no-repeat center center;
  background-size: 100% 100% !important;

  .dkzs-text {
    color: #35f8fd;
  }
}

.dkzs-label {
  background: url("../../../../public/img/panel/icon-dkzs-label.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 5px !important;
  font-size: calc(100vw * 14 / 1920);
}

.lzmj {
  background: url("../../../../public/img/panel/icon-lzmj-bg.png") no-repeat center center;
  background-size: 100% 100%;

  .lzmj-text {
    color: #c4a4ff;
  }
}

.lzmj-label {
  background: url("../../../../public/img/panel/icon-lzmj-label.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 5px !important;
  font-size: calc(100vw * 14 / 1920);
}

.httj {
  background: url("../../../../public/img/panel/icon-httj-bg.png") no-repeat center center;
  background-size: 100% 100%;

  .httj-text {
    color: #45ebc6;
  }
}

.httj-label {
  background: url("../../../../public/img/panel/icon-httj-label.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 5px !important;
  font-size: calc(100vw * 14 / 1920);
}

.qqrs {
  background: url("../../../../public/img/panel/icon-qqrs-bg.png") no-repeat center center;
  background-size: 100% 100%;

  .qqrs-text {
    color: #fac22b;
  }
}

.qqrs-label {
  background: url("../../../../public/img/panel/icon-qqrs-label.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 5px !important;
  font-size: calc(100vw * 14 / 1920);
}

.farm-land {
  width: 100% !important;
  height: 80% !important;
}

.farm-num {
  background: url("../../../../public/img/panel/plant-1.png") no-repeat center center;
  background-size: 100% 100%;
  width: calc(100vw * 109 / 1920);
  height: calc(100vh * 127 / 1080);
  margin-top: calc(100vh * 24 / 1080) !important;
}

.green-num {
  background: url("../../../../public/img/panel/plant-2.png") no-repeat center center;
  background-size: 100% 100%;
  width: calc(100vw * 134 / 1920);
  height: calc(100vh * 150 / 1080);
}

.organic-num {
  background: url("../../../../public/img/panel/plant-3.png") no-repeat center center;
  background-size: 100% 100%;
  width: calc(100vw * 109 / 1920);
  height: calc(100vh * 127 / 1080);
  margin-top: calc(100vh * 24 / 1080) !important;
}

.plant {
  //每个种植面板
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px !important;
  > div {
    text-align: center;

    > div:last-child {
      margin-top: 20px !important;
    }
  }
}

.plant-echart-1 {
  width: 100%;
  height: 100%;
}
</style>
