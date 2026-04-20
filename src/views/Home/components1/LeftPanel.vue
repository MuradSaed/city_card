<template>
  <div :class="[labelstause ? '' : 'closedh', 'content']">
    <div class="colse" @click="labelstause = !labelstause">
      <svg t="1729848998393" v-if="labelstause" class="icon colseshow" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="4421" width="200" height="200">
        <path
          d="M561.92 192a47.36 47.36 0 0 1 0 64l-256 256 256 256a47.36 47.36 0 0 1-64 64L206.08 545.92A50.56 50.56 0 0 1 192 512a47.36 47.36 0 0 1 14.08-33.28L494.72 192a47.36 47.36 0 0 1 67.2 0z"
          p-id="4422" fill="#ffffff"></path>
        <path
          d="M817.92 192a47.36 47.36 0 0 1 0 64l-256 256 256 256a47.36 47.36 0 0 1-64 64L462.08 545.92A50.56 50.56 0 0 1 448 512a47.36 47.36 0 0 1 14.08-33.28L750.72 192a47.36 47.36 0 0 1 67.2 0z"
          p-id="4423" fill="#ffffff"></path>
      </svg>
      <svg t="1729849222179" v-else class="icon colsehide" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="5453" width="200" height="200">
        <path
          d="M462.08 192a47.36 47.36 0 0 0 0 64l256 256-256 256a47.36 47.36 0 1 0 64 64l288.64-288.64A50.56 50.56 0 0 0 832 512a47.36 47.36 0 0 0-14.08-33.28L529.28 192a47.36 47.36 0 0 0-67.2 0z"
          p-id="5454" fill="#ffffff"></path>
        <path
          d="M206.08 192a47.36 47.36 0 0 0 0 64l256 256-256 256a47.36 47.36 0 1 0 64 64l291.84-286.08A50.56 50.56 0 0 0 576 512a47.36 47.36 0 0 0-14.08-33.28L273.28 192a47.36 47.36 0 0 0-67.2 0z"
          p-id="5455" fill="#ffffff"></path>
      </svg>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">土地用途统计</div>
      <img class="img" src="img/panel/line.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts1" ref="echarts1"></div>
        <div>
          <div>
            <div class="legend-color legend-color-2"></div>
            <div class="legend-title">高标准农田：</div>
            <div class="color-2"> 76109亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-1"></div>
            <div class="legend-title">实验田：</div>
            <div class="color-1">400亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-3"></div>
            <div class="legend-title">林地：</div>
            <div class="color-3"> 222.1万亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-4"></div>
            <div class="legend-title">草地：</div>
            <div class="color-4"> 417.5万亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-5"></div>
            <div class="legend-title">其他：</div>
            <div class="color-5">3592亩</div>
          </div>
        </div>
      </div>
    </div>

    <div class="echarts-panel">
      <div class="pie-title">耕地质量等级</div>
      <img class="img" src="img/panel/line.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts3" ref="echarts3"></div>
        <div>
          <div>
            <div class="legend-color legend-color-1"></div>
            <div class="legend-title">一等地：</div>
            <div class="color-1">7080亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-2"></div>
            <div class="legend-title">二等地：</div>
            <div class="color-2">2760亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-3"></div>
            <div class="legend-title">三等地：</div>
            <div class="color-3">10530亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-4"></div>
            <div class="legend-title">四等地：</div>
            <div class="color-4">19860亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-5"></div>
            <div class="legend-title">五等地：</div>
            <div class="color-5">23595亩</div>
          </div>
          <div>
            <div class="legend-color legend-color-6"></div>
            <div class="legend-title">其他：</div>
            <div class="color-6">15175亩</div>
          </div>
        </div>
      </div>

    </div>

    <div class="echarts-panel">
      <div class="pie-title">土地规模统计</div>
      <img class="img" src="img/panel/line.png" />
      <div id="echarts2" style="height: 88%;" ref="echarts2"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      labelstause: true,
      curIndex: -1,
    };
  },
  mounted() {
    this.initEcharts1();
    this.initEcharts2();
    this.initEcharts3();
  },
  methods: {
    fontSize(res) {
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
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
        color: [ "#5bd887","#ffaa00", "#00fff4", "#4ad2ff","#248ae0"],
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
              { value: 2221020, name: "林地" },
              { value: 4175595, name: "草地" },
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
      const myEcharts = echarts.init(this.$refs.echarts2);
      let data = [376, 3465, 1582, 906, 101, 95];
      let option = {
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "10%",
          top: "10%",
          right: "5%",
          bottom: "28%",
        },
        xAxis: {
          type: "category",
          data: ["<50", "50-100", "100-200", "200-400", "400-600", ">600"],
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: "#fff",
              fontSize: this.fontSize(0.12),
            },
            margin: 30, //刻度标签与轴线之间的距离。
          },
        },
        //  [
        //   {
        //     data: [
        //       ">100",
        //       "100-500",
        //       "500-1000",
        //       "1000-2000",
        //       "2000-5000",
        //       ">5000",
        //     ],
        //     axisLabel: {
        //       textStyle: {
        //         color: "rgba(122,173,212,1)",
        //         fontSize: 14,
        //       },
        //       margin: 30, //刻度标签与轴线之间的距离。
        //     },
        //     axisLine: {
        //       lineStyle: {
        //         color: "rgba(53,65,95,1)",
        //       },
        //     },
        //     boundaryGap: true,
        //     splitLine: {
        //       show: false,
        //     },
        //   },
        // ],
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(53,65,95,1)",
                type: "dashed",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "rgba(122,173,212,1)",
                fontSize: this.fontSize(0.14),
              },
            },
          },
        ],
        series: [
          {
            type: "pictorialBar",
            symbolSize: [30, 12],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: "#14b1eb",
              },
            },
            data: data,
          },
          {
            type: "pictorialBar",
            symbolSize: [40, 20],
            symbolOffset: [0, 15],
            z: 11,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#14b1eb",
                borderWidth: 2,
              },
            },
            data: data,
          },
          {
            type: "pictorialBar",
            symbolSize: [60, 30],
            symbolOffset: [0, 21],
            z: 10,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#14b1eb",
                borderType: "dashed",
                borderWidth: 2,
              },
            },
            data: data,
          },
          //柱体
          {
            name: "",
            type: "bar",
            barWidth: 28,
            itemStyle: {
              // shadowOffsetX: 200,
              // shadowOffsetY: 200,
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      //第一节下面
                      offset: 0,
                      color: "#00AEFF",
                    },
                    {
                      offset: 1,
                      color: "rgba(5,149,214,0.1)",
                    },
                  ],
                },
              },
            },
            data: data,
          },

          //柱顶圆片
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [28, 10], //调整截面形状
            symbolOffset: [0, -5],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,143,223,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,143,223,1)",
                    },
                  ],
                  false
                ),
              },
            },
            data: data,
          },
        ],
      };
      myEcharts.setOption(option);
    },
    initEcharts3() {
      const myEcharts = echarts.init(this.$refs.echarts3);
      this.option = {
        backgroundColor: "rgba(0,0,0,0)",
        angleAxis: {
          type: "value",
          min: 0,
          max: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        radiusAxis: {
          type: "category",
          data: ["其他", "资源加工工业", "制造", "轻纺工业", "机械电子制造业"],
          z: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            margin: 2,
            fontSize: 10,
            formatter: function (value, index) {
              let list = [50, 60, 70, 20, 30];
              return list[index] + "%";
            },
            textStyle: {
              color: "rgba(255,255,255,0)",
            },
            interval: 0,
          },
        },
        polar: {
          center: ["50%", "50%"],
          radius: ["10%", "100%"],
        },
        tooltip: {
          show: false,
        },
        series: [
          {
            type: "bar",
            barWidth: "80%",
            data: [50],
            coordinateSystem: "polar",
            name: "净制",
            stack: "a",
            roundCap: true,
            itemStyle: {
              color: "#ffaa00",
              barWidth: 20,
              barBorderRadius: 3,
            },
            z: 5,
          },
          {
            type: "bar",
            data: [0, 60, 0, 0, 0],
            coordinateSystem: "polar",
            name: "洗润",
            stack: "a",
            roundCap: true,
            itemStyle: {
              color: "#5bd887",
              barWidth: 10,
            },
          },
          {
            type: "bar",
            data: [0, 0, 70, 0, 0],
            coordinateSystem: "polar",
            name: "切制",
            stack: "a",
            roundCap: true,
            itemStyle: {
              color: "#00fff4",
              barWidth: 10,
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 90, 0],
            coordinateSystem: "polar",
            name: "干燥",
            stack: "a",
            roundCap: true,
            itemStyle: {
              color: "#4ad2ff",
              barBorderRadius: 5,
              barWidth: 10,
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 85],
            coordinateSystem: "polar",
            name: "筛分",
            stack: "a",
            roundCap: true,
            itemStyle: {
              color: "#248ae0",
              barBorderRadius: 5,
              barWidth: 10,
            },
          },
        ],
      };
      //最后把option放到echarts中就可以了
      myEcharts.setOption(this.option);
    }

  }

};
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  transition: all 1s;
  position: relative;
  left: 0px;
  flex-direction: column;
}

.echarts-panel {
  box-sizing: border-box;
  margin: 5px 0;
  flex: 1;
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 10px 20px;
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
  margin-top: vw(10);
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80% !important;
  width: 100% !important;

  >div:last-child {
    // margin-right: 15px;

    >div {
      margin: 15px 0;
      display: flex;
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
  height: 80%;
  width: 40%;
  margin-right: 5%;
  // background: url("../../../../public/img/pie-bg.png") no-repeat center center;
  // background-size: 75% 100%;
  //   background: url("../../../../public/img/pie-bg.png") no-repeat center center !important;
  //   background-size: 80% 90% !important;
}

.legend-title {
  width: calc(100vw * 110 / 1920);
}

.legend-color {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  margin-right: 10px;
}

.legend-color-1 {
  background-color: #ffaa00;
}

.color-1 {
  color: #ffaa00;
}

.legend-color-2 {
  background-color: #5bd887;
}

.color-2 {
  color: #5bd887;
}

.legend-color-3 {
  background-color: #00fff4;
}

.color-3 {
  color: #00fff4;
}

.legend-color-4 {
  background-color: #4ad2ff;
}

.color-4 {
  color: #4ad2ff;
}



.legend-color-5 {
  background-color: #248ae0;
}

.color-5 {
  color: #248ae0;
}


.legend-color-6 {
  background-color: #16c5c8;
}

.color-6 {
  color: #16c5c8;
}

.plant-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  >div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: calc(100vw * 182 / 1920);
    height: calc(100vh * 110 / 1080);
    background: url("../../../../public/img/panel/plant-bg-4.png") no-repeat center center;
    background-size: 100% 100%;

    >img {
      width: calc(100vw * 36 / 1920);
      height: calc(100vh * 34 / 1080);
      margin-right: 5%;
    }

    >div>.plant-num {
      font-size: calc(100vw * 18 / 1920);
      font-family: Microsoft YaHei;
      font-weight: bold;

      >span {
        font-size: calc(100vw * 14 / 1920);
      }
    }
  }
}

.color-yellow {
  color: #fac22b;
}

.color-green {
  color: #8dd835;
}

.color-cyan {
  color: #0fe3f3;
}

.color-blue {
  color: #82bdff;
}

.colse {
  width: 30px;
  height: 30px;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(26, 59, 61, 0.6);
  position: absolute;
  right: -40px;
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
  left: -520px;
}
</style>
