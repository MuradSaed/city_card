<template>
  <div :class="[labelstause ? '' : 'closedh', 'content']">
    <div class="colse" @click="labelstause = !labelstause">
      <svg t="1729849222179" v-if="labelstause" class="icon colseshow" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="5453" width="200" height="200">
        <path
          d="M462.08 192a47.36 47.36 0 0 0 0 64l256 256-256 256a47.36 47.36 0 1 0 64 64l288.64-288.64A50.56 50.56 0 0 0 832 512a47.36 47.36 0 0 0-14.08-33.28L529.28 192a47.36 47.36 0 0 0-67.2 0z"
          p-id="5454" fill="#ffffff"></path>
        <path
          d="M206.08 192a47.36 47.36 0 0 0 0 64l256 256-256 256a47.36 47.36 0 1 0 64 64l291.84-286.08A50.56 50.56 0 0 0 576 512a47.36 47.36 0 0 0-14.08-33.28L273.28 192a47.36 47.36 0 0 0-67.2 0z"
          p-id="5455" fill="#ffffff"></path>
      </svg>
      <svg t="1729848998393" v-else class="icon colsehide" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="4421" width="200" height="200">
        <path
          d="M561.92 192a47.36 47.36 0 0 1 0 64l-256 256 256 256a47.36 47.36 0 0 1-64 64L206.08 545.92A50.56 50.56 0 0 1 192 512a47.36 47.36 0 0 1 14.08-33.28L494.72 192a47.36 47.36 0 0 1 67.2 0z"
          p-id="4422" fill="#ffffff"></path>
        <path
          d="M817.92 192a47.36 47.36 0 0 1 0 64l-256 256 256 256a47.36 47.36 0 0 1-64 64L462.08 545.92A50.56 50.56 0 0 1 448 512a47.36 47.36 0 0 1 14.08-33.28L750.72 192a47.36 47.36 0 0 1 67.2 0z"
          p-id="4423" fill="#ffffff"></path>
      </svg>
    </div>


    <div class="echarts-panel">
      <div class="pie-title">流转登记统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="plant farm-land">
        <div>
          <div class="farm-num">
            <div class="plant-echart-1" ref="plantEchart1"></div>
          </div>
          <div>流转户次</div>
        </div>
        <div>
          <div class="green-num">
            <div class="plant-echart-1" ref="plantEchart2"></div>
          </div>
          <div>
            <div>流转面积</div>
          </div>
        </div>
        <div>
          <div class="organic-num">
            <div class="plant-echart-1" ref="plantEchart3"></div>
          </div>
          <div>
            <div>流转金额</div>
          </div>
        </div>
      </div>
    </div>

    <div class="echarts-panel">
      <div class="pie-title">种植登记统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts1" ref="echartsr2"></div>

   
        <div class="legend">
          <div style="font-size: 18px;margin: 20px 0px; font-weight: bold;">登记排行Top3</div>
          <div>
            <div>
              <div class="legend-color legend-color-1"></div>
              <div class="labeltext">
                <div class="legend-title">哈密瓜</div>
                <div class="legend-num">3014亩</div>
              </div>
            </div>
            <div>
              <div class="legend-color legend-color-6"></div>
              <div class="labeltext">
                <div class="legend-title">小麦</div>
                <div class="legend-num">7390亩</div>
              </div>
            </div>

          </div>
          <div>
            <div>
              <div class="legend-color legend-color-5"></div>
              <div class="labeltext">
                <div class="legend-title">玉米</div>
                <div class="legend-num">3329亩</div>
              </div>
            </div>
       


          </div>
      
        </div>
      </div>
    </div>
    
    
    <div class="echarts-panel" >
      <div class="pie-title">核验统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="plant-info" style="padding-top: 10px;height: 90%;">
        <div>
          <img src="img/panel/diamond-base-2.png" />
          <div>
            <div class="plant-num color-yellow">
              3450
              <span>个</span>
            </div>
            <div>核验数量</div>
          </div>
        </div>
        <div>
          <img src="img/panel/icon-plant-info-2.png" />
          <div>
            <div class="plant-num color-green">
              23203
              <span>亩</span>
            </div>
            <div>核验面积</div>
          </div>
        </div>
        <div>
          <img src="img/panel/icon-httj.png" />
          <div>
            <div class="plant-num color-cyan">
               6563
              <span>个</span>
            </div>
            <div>待核验数量</div>
          </div>
        </div>
        <div>
          <img src="img/panel/icon-plant-info-4.png" />
          <div>
            <div class="plant-num color-blue">
              55797
              <span>亩</span>
            </div>
            <div>待核验面积</div>
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

    return {
      curIndex: -1,
      labelstause: true,
    };
  },
  mounted() {
    // this.initEcharts1();

    this.plantInitEcharts1();
    this.plantInitEcharts2();
    this.plantInitEcharts3();
    this.initEcharts2();
  },
  methods: {

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
                value: 632,
                name: "次"
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
                value:15253,
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
                value: 1830,
                name: "万元"
              }
            ]
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
    initEcharts1() {

      const myEcharts = echarts.init(this.$refs.echarts1);
      //获取屏幕宽度并计算比例
      let option = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "土地用途统计",
          subtext: "",
          left: "center",
          top: "35%",
          textStyle: {
            fontWeight: "lighter",
            lineHeight: 20,
            color: "#fff",
            fontSize: this.fontSize(0.12),
          },
          subtextStyle: {
            fontSize: this.fontSize(0.16),
            fontWeight: "bold",
            color: "#12FDFE",
          },
        },
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: require("../../../../public/img/pie-bg.png"),
                width: this.fontSize(1.8),
                height: this.fontSize(1.8),
              },
              left: "center",
              top: "center",
            },
          ],
        },
        legend: {
          show: false,
          top: "5%",
          right: "0",
          orient: "vertical",
          itemGap: 30,
          formatter: function (name) {
            let data = option.series[0].data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].name == name) {
                return `${name}：${data[i].value}`;
              }
            }
          },
          textStyle: {
            color: "#fff",
          },
        },
        color: ["#5bd887", "#ffaa00", "#00fff4", "#4ad2ff", "#248ae0"],
        series: [
          {
            name: "经营主体统计",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 76109, name: "高标准农田" },
              { value: 400, name: "实验田" },
              { value: 0, name: "林地" },
              { value: 0, name: "草地" },
              { value: 3592, name: "其他" }
            ],
          },
        ],
      };
      myEcharts.setOption(option);
      setInterval(() => {
        let data = option.series[0].data;
        let dataLen = option.series[0].data.length;
        myEcharts.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: this.curIndex,
        });
        this.curIndex = (this.curIndex + 1) % dataLen;
        myEcharts.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: this.curIndex,
        });
        myEcharts.setOption({
          title: {
            text: data[this.curIndex].name,
            subtext: data[this.curIndex].value + "亩",
          },
        });
      }, 1000);
    },
    initEcharts2() {
      const myEcharts = echarts.init(this.$refs.echartsr2);
      let option = {
        color: ["#4C98FB", "#26C7C8", "#8CDF6C", "#F56679", "#83CCE7", "#73DEBD", "#FBD657", "#E07BCE"],
        grid: {},
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}亩 ({d}%)"
        },

        title: {
          text: "种植登记",
          subtext: "",
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
                name: "已登记",
                value:  33733
              },
              {
                name: "未登记",
                value: 42502
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
            subtext: data[this.curIndex].value + "亩"
          }
        });
      }, 1000);
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  height: 100%;
  transition: all 1s;
  position: relative;
  right: 0px;
  display: flex;
  flex-direction: column;
}

.echarts-panel {
  // text-align: right;
  margin: 5px 0;
  flex: 1;
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh * 293 / 1080);

  >div:last-child {
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
}

.pie-title {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  font-size: calc(100vw * 18 / 1920);
}

.echarts-pie {
  height: 100%;
  width: 50%;
  //   background: url("../../../../public/img/pie-bg.png") no-repeat center center !important;
  //   background-size: 80% 90% !important;
}

.legend {
  width: 50%;

  >div {
    display: block;
    // flex-direction: row;
    // font-size: calc(100vw * 12 / 1920);
    // justify-content: space-around;

    // margin-bottom: 20px;
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

.grow-crop {
  height: 90% !important;
  width: 100%;
}

.base-demo {
  text-align: center;
  font-size: calc(100vw * 16 / 1920);

  .base-num {
    font-weight: bold;
    font-size: calc(100vw * 20 / 1920);
    text-align: center;
    font-family: DOUYU;
    // margin-bottom: -20px;
    margin-top: 10px;
  }

  .base-unit {
    font-size: calc(100vw * 14 / 1920);
    font-weight: bold;
    text-align: center;
    font-family: DOUYU;
    // margin-bottom: -20px;
    margin-top: 10px;
  }

  >div:last-child {
    margin-top: 15%;
  }
}

.base {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.base-demo-img {
  position: relative;
  flex: 1;
  width: calc(100vw * 113 / 1920);
  height: calc(100vh * 109 / 1080);
  margin-top: 8%;

  .base-icon {
    position: absolute;
    width: calc(100vw * 36 / 1920);
    height: calc(100vh * 36 / 1080);
    top: 45px;
    left: calc(100vw * 38 / 1920);
  }

  .base-bottom {
    width: calc(100vw * 113 / 1920);
    height: calc(100vh * 109 / 1080);
  }
}

@keyframes jump {
  0% {
    transform: translateY(0) scale(1, 1);
  }

  /* 中间状态图片位移并且拉伸 */
  50% {
    transform: translateY(-30px) scale(0.97, 1.03);
  }

  100% {
    transform: translateY(0) scale(1, 1);
  }
}

.base-icon {
  /* 设置图片跳动动画 */
  animation: jump 3s ease infinite;
}

.color-green {
  color: #28ffbf;
}

.color-orange {
  color: #ffb968;
}

.color-blue {
  color: #24ffff;
}

.colse {
  width: 30px;
  height: 30px;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(26, 59, 61, 0.6);
  position: absolute;
  left: -40px;
  top: 50%;
  cursor: pointer;
  transition: all .3s;

}

.colse:hover {
  transform: scale(1.1);
}

.colse svg {
  width: 100%;
  height: 100%;
}

.closedh {
  right: -520px;
}

.labeltext {
  width: 280px;
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

.farm-land {
  width: 100% !important;
  height: 90% !important;
}

.farm-num {
  background: url("../../../../public/img/panel/plant-1.png") no-repeat center center;
  background-size: 100% 100%;
  width: calc(100vw * 134 / 1920);
  height: calc(100vh * 150 / 1080);
  // margin-top: calc(100vh * 24 / 1080) !important;
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
  width: calc(100vw * 134 / 1920);
  height: calc(100vh * 150 / 1080);
  // margin-top: calc(100vh * 24 / 1080) !important;
}


.plant-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: calc(100vw * 182 / 1920);
    height: calc(100vh * 110 / 1080);
    background: url("../../../../public/img/panel/plant-bg-4.png") no-repeat
      center center;
    background-size: 100% 100%;
    > img {
      width: calc(100vw * 36 / 1920);
      height: calc(100vh * 34 / 1080);
      margin-right: 5%;
    }
    > div > .plant-num {
      font-size: calc(100vw * 18 / 1920);
      font-family: Microsoft YaHei;
      font-weight: bold;

      > span {
        font-size: calc(100vw * 14 / 1920);
      }
    }
  }
}
</style>
