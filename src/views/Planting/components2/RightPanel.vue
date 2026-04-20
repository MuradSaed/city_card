<template>
  <div class="content">
    <div class="echarts-panel">
      <div class="pie-title">长势检测</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts1" ref="echarts1"></div>
        <div>
          <div>
            <div class="legend-color legend-color-1"></div>
            <div class="legend-title">过旺:</div>
            <div class="color-1">0%</div>
          </div>
          <div>
            <div class="legend-color legend-color-2"></div>
            <div class="legend-title">过盛:</div>
            <div class="color-2">0%</div>
          </div>
          <div>
            <div class="legend-color legend-color-3"></div>
            <div class="legend-title">正常:</div>
            <div class="color-3">0%</div>
          </div>
          <div>
            <div class="legend-color legend-color-4"></div>
            <div class="legend-title">较差:</div>
            <div class="color-4">0%</div>
          </div>
          <div>
            <div class="legend-color legend-color-5"></div>
            <div class="legend-title">极差:</div>
            <div class="color-5">0%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">土壤墒情监测</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts2" ref="echarts2"></div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">气象壤墒情预报</div>
      <img class="img" src="img/panel/line2.png" />

      <div class="tqlist">
        <div class="tqlistitem">
          <div class="ttt">阿勒泰气象台发布雷电黄色预警</div>
          <div class="ddd">2024-10-23 06:00.04</div>
        </div>

        <div class="tqlistitem">
          <div class="ttt">阿勒泰气象台发布雷电黄色预警</div>
          <div class="ddd">2024-10-14 06:00.04</div>
        </div>


        <div class="tqlistitem">
          <div class="ttt">阿勒泰气象台发布雷电黄色预警</div>
          <div class="ddd">2024-10-13 06:00.04</div>
        </div>

        <div class="tqlistitem">
          <div class="ttt">阿勒泰气象台发布雷电黄色预警</div>
          <div class="ddd">2024-10-12 06:00.04</div>
        </div>

        <div class="tqlistitem">
          <div class="ttt">阿勒泰气象台发布雷电黄色预警</div>
          <div class="ddd">2024-10-5 06:00.04</div>
        </div>
      </div>

      <!-- <div class="echarts3" ref="echarts3"></div> -->
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
    // this.initEcharts3();

  },
  methods: {


    fontSize(res) {
      let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    initEcharts1() {
      // 建议使用 let 代替所有的 var
      const myChart = echarts.init(this.$refs.echarts1);
      let trafficWay = [
        {
          name: "过旺",
          value: 10,
        },
        {
          name: "过盛",
          value: 25,
        },
        {
          name: "正常",
          value: 45,
        },
        {
          name: "较差",
          value: 10,
        },
        {
          name: "极差",
          value: 5,
        },
      ];

      let data = [];
      let color = ["#ffaa00", "#5bd887", "#00fff4", "#4ad2ff", "#248ae0"];
      for (let i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            // name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i],
              },
            },
          },
          {
            value: 2,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      }
      let seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [70, 74],
          hoverAnimation: true,
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
            },
          },
          data: data,
        },
        {
          type: "pie",
          radius: [50, 45],
        }
      ];
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        color: color,
        tooltip: {
          show: true,
        },
        toolbox: {
          show: true,
        },
        series: seriesOption,
      };
      myChart.setOption(option);
    },
    initEcharts2() {
      const myChart = echarts.init(this.$refs.echarts2);
      let legendItem = ["土壤温度", "土壤含水量"];
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: "摄氏度/百分比",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          left: "20px",
          top: "10px",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)",
                  },
                ],
                global: false,
              },
            },
          },
          renderMode: "html",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: 0,
          borderColor: "rgba(15, 45, 83, 0.9)",
          textStyle: {
            color: "#fff",
          },
          formatter: (val) => {
            const style =
              "display: inline-block;width: 10px;height: 10px;border-radius: 50%";
            const tooltip = val
              .map((i) => {
                const { seriesName, color, value } = i;
                return `<span class="border" style='${style} background: ${color};margin:6px 0 0-12px'></span> ${seriesName}: ${value}`;
              })
              .join("<br />");
            return tooltip;
          },
        },
        legend: {
          center: true,
          top: 10,
          data: legendItem,
          textStyle: {
            color: "#00DEFF",
          },
        },
        grid: {
          top: "15%",
          left: "10%",
          right: "5%",
          bottom: "10%",
          containLabel: false,
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#39608F",
              },
            },
            splitArea: {
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            boundaryGap: true,
            data: ["5月", "6月", "7月", "8月", "9月", "10月", "11月"],
          },
        ],

        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#39608F",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#d1e6eb",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#39608F",
              },
            },
          },
        ],
        series: [
          {
            name: legendItem[0],
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#90c7ff",
                shadowColor: "rgba(0, 0, 0, 0)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: false,
            },

            itemStyle: {
              color: "#90c7ff",
              borderColor: "#fff",
              borderWidth: 2,
              shadowColor: "rgba(0, 0, 0, 0)",
              shadowBlur: 0,
              shadowOffsetY: 6,
              shadowOffsetX: 2,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(36, 102, 171, 0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(36, 102, 171, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: [0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: legendItem[1],
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#8dfafb",
                shadowColor: "rgba(0, 0, 0, 0)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: false,
            },

            itemStyle: {
              color: "#8dfafb",
              // borderColor: "#fff",
              borderWidth: 2,
              shadowColor: "rgba(0, 0, 0, 0)",
              shadowBlur: 0,
              shadowOffsetY: 1,
              shadowOffsetX: 1,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(40, 158, 169, 0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(40, 158, 169, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      };
      let app = {
        currentIndex: -1,
      };
      setInterval(function () {
        let dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
      }, 2000);
      myChart.setOption(option);
    },
    initEcharts3() {
      const myChart = echarts.init(this.$refs.echarts3);
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: "单位/kg",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          left: "50px",
          top: "30px",
        },
        tooltip: {
          //提示框组件
          trigger: "axis",
          formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985",
            },
          },
          textStyle: {
            color: "#000",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "15%",
          top: "25%",
          //	padding:'0 0 10 0',
          containLabel: true,
        },
        legend: {
          //图例组件，颜色和名字
          right: "10%",
          top: "10%",
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 10,
          data: [
            {
              name: "计划订单数",
              //icon:'image://../wwwroot/js/url2.png', //路径
            },
            {
              name: "实际订单数",
            },
          ],
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
          },
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: ["1月", "2月", "3月", "4月", "5月", "6月"],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
              rotate: 50,
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false,
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2,
              },
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#fff"],
                opacity: 0.06,
              },
            },
          },
        ],
        series: [
          {
            name: "计划订单数",
            type: "bar",
            data: [10, 15, 30, 45, 55, 60],
            barWidth: 10,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#248ae0",
                  },
                  {
                    offset: 1,
                    color: "#248ae0",
                  },
                ]),
                barBorderRadius: [50, 50, 0, 0],
                borderWidth: 0,
              },
            },
          },
          {
            name: "实际订单数",
            type: "bar",
            data: [8, 5, 25, 30, 35, 55],
            barWidth: 10,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#49fbf3",
                  },
                  {
                    offset: 1,
                    color: "#49fbf3",
                  },
                ]),
                barBorderRadius: [50, 50, 0, 0],
                borderWidth: 0,
              },
            },
          },
        ],
      };
      let app = {
        currentIndex: -1,
      };
      setInterval(function () {
        let dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        //console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
      }, 2000);
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped lang="scss">

.tqlist{
  width: 100%;
  height: 90%;
  text-align: left;
  overflow-y: auto;
}
.tqlistitem{
  width: 100%;
  // height: 50px;
  background-color: rgba(26, 59, 61, .7);
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  padding-left: 30px;
  position: relative;
}
.tqlistitem::before{
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top:20px;
  background-color: #ffaa00;
}
.tqlistitem .ttt{
  font-size: 16px;
  color: #fff;
}
.tqlistitem .ddd{
  font-size: 14px;
  color: #ccc;
}
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
  margin-top: vh(10);

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
  height: 80%;
  width: 45%;
  margin-right: 5%;
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
  background: #ffaa00;
}

.color-1 {
  color: #ffaa00;
}

.legend-color-2 {
  background: #5bd887;
}

.color-2 {
  color: #5bd887;
}

.legend-color-3 {
  background: #00fff4
}

.legend-color-4 {
  background: #4ad2ff
}

.legend-color-5 {
  background: #248ae0
}

.color-3 {
  color: #00fff4;
}

.color-4 {
  color: #4ad2ff;
}

.color-5 {
  color: #248ae0;
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
</style>
