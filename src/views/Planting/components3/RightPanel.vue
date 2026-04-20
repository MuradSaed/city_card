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
      <div class="pie-title">灌区水利工程</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts1" ref="echarts1"></div>
        <div class="legend">
          <div>
            <div>
              <div class="legend-color legend-color-3"></div>
              <div class="labeltext">
                <div class="legend-title">灌区</div>
                <div class="legend-num">6处</div>
              </div>
            </div>

            <div>
              <div class="legend-color legend-color-2"></div>
              <div class="labeltext">
                <div class="legend-title">渠首</div>
                <div class="legend-num">6座</div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="legend-color legend-color-1"></div>
              <div class="labeltext">
                <div class="legend-title">渠道</div>
                <div class="legend-num">149条</div>
              </div>
            </div>
            <div>
              <div class="legend-color legend-color-6"></div>
              <div class="labeltext">
                <div class="legend-title">水库</div>
                <div class="legend-num">5座</div>
              </div>
            </div>

          </div>
          <div>
            <div>
              <div class="legend-color legend-color-5"></div>
              <div class="labeltext">
                <div class="legend-title">水闸</div>
                <div class="legend-num">109座</div>
              </div>
            </div>

            <div>
              <div class="legend-color "></div>
              <div class="labeltext">
                <div class="legend-title"></div>
                <div class="legend-num"></div>
              </div>
            </div>
            


          </div>

        </div>
      </div>
    </div>
    <div class="echarts-panel">
      <div class="pie-title">其他工程</div>
      <img class="img" src="img/panel/line2.png" />
      <div class="echarts-pie-panel">
        <div class="echarts-pie" id="echarts2" ref="echarts2"></div>
        <div class="legend">
          <div>
            <div>
              <div class="legend-color legend-color-3"></div>
              <div class="labeltext">
                <div class="legend-title">河流</div>
                <div class="legend-num">0条</div>
              </div>
            </div>

            <div>
              <div class="legend-color legend-color-2"></div>
              <div class="labeltext">
                <div class="legend-title">渡槽</div>
                <div class="legend-num">11座</div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="legend-color legend-color-1"></div>
              <div class="labeltext">
                <div class="legend-title">涵洞</div>
                <div class="legend-num">320座</div>
              </div>
            </div>
            <div>
              <div class="legend-color legend-color-6"></div>
              <div class="labeltext">
                <div class="legend-title">泵站</div>
                <div class="legend-num">24座</div>
              </div>
            </div>

          </div>
          <div>
            <div>
              <div class="legend-color legend-color-5"></div>
              <div class="labeltext">
                <div class="legend-title">倒虹吸</div>
                <div class="legend-num">0座</div>
              </div>
            </div>
            <div>
              <div class="legend-color legend-color-7"></div>
              <div class="labeltext">
                <div class="legend-title">水电站</div>
                <div class="legend-num">3座</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="echarts-panel" style="visibility: hidden;">
      <div class="pie-title">种植结构统计TOP3</div>
      <img class="img" src="img/panel/line.png" />
      <div class="base">
        <div class="base-demo">
          <div class="base-num color-blue">48380</div>
          <div class="base-unit color-blue">亩</div>
          <div class="base-demo-img">
            <img class="base-icon" src="img/哈密瓜.png" />
            <img class="base-bottom" src="img/panel/plant-struct-bg-3.png" />
          </div>
          <div>哈密瓜</div>
        </div>
        <div class="base-demo">
          <div class="base-num color-orange">16386</div>
          <div class="base-unit color-orange">亩</div>
          <div class="base-demo-img">
            <img class="base-icon" src="img/panel/icon-plant-struct-1.png" />
            <img class="base-bottom" src="img/panel/plant-struct-bg-1.png" />
          </div>
          <div>小麦</div>
        </div>
        <div class="base-demo">
          <div class="base-num color-green">3014</div>
          <div class="base-unit color-green">亩</div>
          <div class="base-demo-img">
            <img class="base-icon" src="img/panel/icon-plant-struct-2.png" />
            <img class="base-bottom" src="img/panel/plant-struct-bg-2.png" />
          </div>
          <div>玉米</div>
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
    this.initEcharts1();
    this.initEcharts2();
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
          formatter: "{b} : {c} ({d}%)"
        },

        title: {
          text: "灌区水利工程",
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
                name: "灌区",
                value: 6
              },
              {
                name: "渠首",
                value: 6
              },
              {
                name: "渠道",
                value: 149
              },
              {
                name: "水库",
                value: 5
              },

              {
                name: "水闸",
                value: 109
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
            subtext: data[this.curIndex].value 
          }
        });
      }, 1000);
    },
    initEcharts2() {
      const myEcharts = echarts.init(this.$refs.echarts2);
      let option = {
        color: ["#4C98FB", "#26C7C8", "#8CDF6C", "#F56679", "#83CCE7", "#73DEBD", "#FBD657", "#E07BCE"],
        grid: {},
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },

        title: {
          text: "其他工程",
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
                name: "河流",
                value: 0
              },
              {
                name: "渡槽",
                value: 11
              },
              {
                name: "涵洞",
                value: 320
              },
              {
                name: "泵站",
                value: 24
              },

              {
                name: "倒虹吸",
                value: 0
              },
              {
                name: "水电站",
                value: 3
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
            subtext: data[this.curIndex].value 
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
  text-align: right;
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
    display: flex;
    flex-direction: row;
    font-size: calc(100vw * 14 / 1920);
    justify-content: space-around;
    margin: 15px 0px;

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
    height: calc(100vh * 36 / 1080);
    margin-right: 10px;
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
  width: 80px;
}
</style>
