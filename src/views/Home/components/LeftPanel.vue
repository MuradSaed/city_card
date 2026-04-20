<template>
  <div class="content">
    <!-- <div class="echarts-panel">
      <div class="pie-title">耕地总面积统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="farm-land" ref="farmLand"></div>
    </div> -->


    <div class="echarts-panel">
      <div class="pie-title">地块类型统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="echarts-pie-panel farm-land">
        <div class="echarts-pie" id="echarts1" ref="echarts1"></div>
        <div>
          <div>
            <div class="legend-color legend-color-1"></div>
            <div class="legend-title">耕地总面积</div>
            <div class="color-1"> 7.9万亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-2"></div>
            <div class="legend-title">国有土地：</div>
            <div class="color-2">5178块</div>
          </div>
          <div>
            <div class="legend-color legend-color-3"></div>
            <div class="legend-title">村集体土地：</div>
            <div class="color-3">1385块</div>
          </div>
          <div>
            <div class="legend-color legend-color-3"></div>
            <div class="legend-title">二轮地：</div>
            <div class="color-3">3450块</div>
          </div>
        </div>
      </div>
    </div>


    <div class="echarts-panel">
      <div class="pie-title">耕地数据统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="plowland">
        <div>
          <div class="dkzs">
            <img src="img/panel/icon-dkzs.png" />
            <div class="dkzs-text">高标准农田</div>
          </div>
          <div class="dkzs-label">7.6万亩</div>
        </div>
        <div>
          <div class="lzmj">
            <img src="img/panel/icon-lzmj.png" />
            <div class="lzmj-text">提升改造</div>
          </div>
          <div class="lzmj-label">3000亩</div>
        </div>
        <div>
          <div class="httj">
            <img src="img/panel/icon-httj.png" />
            <div class="httj-text">物联网设备</div>
          </div>
          <div class="httj-label">8个</div>
        </div>
        <div>
          <div class="qqrs">
            <img src="img/panel/icon-qqrs.png" />
            <div class="qqrs-text">经营主体</div>
          </div>
          <div class="qqrs-label">258</div>
        </div>
      </div>
    </div>


    <div class="echarts-panel">
      <div class="pie-title">种植特色</div>
      <img class="img" src="img/panel/line.png" />
      <div class="plant farm-land">
        <div>
          <div class="farm-num">
            <div class="plant-echart-1" ref="plantEchart1"></div>
          </div>
          <div>玉米</div>
        </div>
        <div>
          <div class="green-num">
            <div class="plant-echart-1" ref="plantEchart2"></div>
          </div>
          <div>
            <div>哈密瓜</div>
          </div>
        </div>
        <div>
          <div class="organic-num">
            <div class="plant-echart-1" ref="plantEchart3"></div>
          </div>
          <div>
            <div>小麦</div>
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
    // this.farmLandInitEcharts();
    this.plantInitEcharts1();
    this.plantInitEcharts2();
    this.plantInitEcharts3();
    this.initEcharts1()
  },
  methods: {
    initEcharts1() {
      const myEcharts = echarts.init(this.$refs.echarts1);
      let option = {
        color: [
          new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
            [
              { offset: 1, color: "#3870FF" },
              { offset: 0, color: "#5EA9FD" }
            ]
          ),
          new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
            [
              { offset: 1, color: "#C518FF" },
              { offset: 0, color: "#09B3FF" }
            ]
          ),
          new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
            [
              { offset: 1, color: "#2996F6" },
              { offset: 0, color: "#24E3D0" }
            ]
          )
        ],
        grid: {
          left: -100,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        title: {
          text: "地块总数",
          subtext: "10013块",
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
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: require("../../../../public/img/panel/pie-bg-2.png"),
                width: this.fontSize(1.8),
                height: this.fontSize(1.8)
              },
              left: "center",
              top: "center"
            }
          ]
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            roseType: "radius",
            label: {
              show: false
            },
            data: [
              {
                value: 3450,
                name: "二轮地"
              },
              {
                value: 5178,
                name: "国有土地"
              },
              {
                value: 1385,
                name: "村集体土地"
              }
            ]
          }
        ]
      };

      myEcharts.setOption(option);
      // setInterval(() => {
      //   let data = option.series[0].data;
      //   let dataLen = option.series[0].data.length;
      //   myEcharts.dispatchAction({
      //     type: "downplay",
      //     seriesIndex: 0,
      //     dataIndex: this.curIndex
      //   });
      //   this.curIndex = (this.curIndex + 1) % dataLen;
      //   myEcharts.dispatchAction({
      //     type: "highlight",
      //     seriesIndex: 0,
      //     dataIndex: this.curIndex
      //   });
      //   myEcharts.setOption({
      //     title: {
      //       text: data[this.curIndex].name,
      //       subtext: data[this.curIndex].value + "块"
      //     }
      //   });
      // }, 1000);
    },
    initEcharts2() {
      const myEcharts = echarts.init(this.$refs.echarts2);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
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
          data: ["清河县", "吉木乃县", "布尔津县", "前山哈萨克民族乡", "阿勒泰镇", "福海县", "富蕴县"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "小麦",
            type: "bar",
            stack: "total",
            data: [220, 182, 191, 234, 290, 330, 310, 299]
          },
          {
            name: "玉米",
            type: "bar",
            stack: "total",
            data: [120, 132, 101, 134, 90, 230, 210, 180]
          },

          {
            name: "水稻",
            type: "bar",
            stack: "total",
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "大麦",
            type: "bar",
            stack: "total",
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "谷子",
            type: "bar",
            stack: "total",
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "高粱",
            type: "bar",
            stack: "total",
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "其他",
            type: "bar",
            stack: "total",
            data: [220, 132, 101, 134, 290, 130, 120, 200]
          }
        ]
      };

      myEcharts.setOption(option);
    },
    fontSize(res) {
      let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    farmLandInitEcharts() {
      const myEcharts = echarts.init(this.$refs.farmLand);
      let value = { value: 79881.74, name: "耕地总面积" };
      let min = 0;
      let max = 79881.74;
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
                return "{value|" + value.toFixed(0) + "}{unit|亩}";
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
            data: [{ value: 79881.74, name: "耕地总面积" }]
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
            //data: [{ value: 500, name: "红线" }]
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
                return "{value|" + value.toFixed(0) + "}{unit|}";
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
                value:  3014.77,
                name: "亩"
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
                return "{value|" + value.toFixed(0) + "}{unit|}";
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
                value: 48380.83,
                name: "亩"
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
                return "{value|" + value.toFixed(0) + "}{unit|}";
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
                value: 16386.75,
                name: "亩"
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
  border-radius: 10px;
  padding: 10px 20px !important;
  height: calc(100vh * 293 / 1080);

  >div:last-child {
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

  >div {

    //图标及图标内文字
    >div:first-child {
      height: calc(100vh * 105 / 1080);
      width: calc(100vw * 91 / 1920);
      text-align: center;

      >img {
        display: inline-block;
        width: calc(100vw * 30 / 1920);
        height: calc(100vh * 30 / 1080);
        margin-top: 25% !important;
      }

      //图标里的字体大小
      >div:last-child {
        font-size: calc(100vw * 16 / 1920);
        font-family: Microsoft YaHei;
        font-weight: bold;
      }
    }

    //图标的标签
    >div:last-child {
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
  height: 90% !important;
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
  padding-top: 30px !important;

  >div {
    text-align: center;

    >div:last-child {
      margin-top: 20px !important;
    }
  }
}

.plant-echart-1 {
  width: 100%;
  height: 100%;
}

.echarts-pie {
  height: 80%;
  width: 40%;
  margin-right: 5%;
  //   background: url("../../../../public/img/pie-bg.png") no-repeat center center !important;
  //   background-size: 80% 90% !important;
}

.echarts-pie-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100% !important;
  height: 90% !important;

  >div:last-child {
    margin-left: 15px;

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

.legend-title {
  width: calc(100vw * 110 / 1920);
  text-align: left;
}
</style>
