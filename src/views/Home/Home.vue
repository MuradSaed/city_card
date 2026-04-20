<template>
  <div>
    <div class="bg-map">
      <BgMap id="home"></BgMap>
      <div class="ywxmap" ref="ywx"></div>
    </div>
    <div class="left-panel">
      <LeftPanel></LeftPanel>
    </div>
    <div class="right-panel">
      <RightPanel></RightPanel>
    </div>

    <div class="bottom-panel">
      <div class="echarts-panel">
        <div class="pie-title">2024年农产品交易统计</div>
        <img class="img" src="img/panel/line.png" />
        <div class="echarts2" ref="echarts2"></div>
      </div>
      <div class="echarts-panel">
        <div class="pie-title">农作物产销分析</div>
        <img class="img" src="img/panel/line.png" />
        <div class="echarts3" ref="echarts3"></div>
      </div>
    </div>

  </div>
</template>

<script>
import BgMap from "./components/BgMap.vue";
import LeftPanel from "./components/LeftPanel.vue";
import RightPanel from "./components/RightPanel.vue";
import aletaJson from '@/assets/map/json/yiwuxian.json'
import * as echarts from "echarts";
import 'echarts-gl'
export default {
  data() {
    return {};
  },
  components: {
    BgMap,
    LeftPanel,
    RightPanel
  },
  mounted() {
    this.initEcharts2();
    this.initEcharts3();
    var extraData = {
      "清河县": {
        "耕地面积": "1709亩",
        "哈密瓜":"1574亩",
        "玉米":"113亩",
        "蔬菜":"19亩",
        "合作社":"4家"
      },
      "吉木乃县": {
        "耕地面积": "3185亩",
        "哈密瓜":"2817亩",
        "玉米":"306亩",
        "苜蓿":"51亩",
        "蔬菜":"11亩",
        "合作社":"9家"
      },
      "布尔津县": {
        "耕地面积": "3311亩",
        "小麦":"1418亩",
        "玉米":"1159亩",
        "油葵":"410亩",
        "蔬菜":"210亩",
        "合作社":"9家"
      },
      "富蕴县": {
        "耕地面积": "26498亩",
        "小麦":"14960亩",
        "玉米":"1200亩",
        "蔬菜":"103亩",
        "油葵":"6980亩",
        "苜蓿":"3248亩",
        "合作社":"15家"
      },
      "福海县": {
        "耕地面积": "44165亩",
        "哈密瓜":"43988亩",
        "玉米":"138亩",
        "蔬菜":"39亩",
        "合作社":"38家"
      },
      "前山哈萨克民族乡": {
        "耕地面积": "0亩",
        "合作社":"0家"
      },
      "阿勒泰镇": {
        "耕地面积": "0亩",
        "合作社":"0家"
      },
      "兵团淖毛湖农场": {
        "耕地面积": "0亩",
        "合作社":"0家"
      }
    };
    const myEcharts = echarts.init(this.$refs.ywx);
    echarts.registerMap('ywx', aletaJson);
    const option = {
      tooltip: {
        show: true // 确保这里是 true
      },

      geo3D: {
        show: true,
        map: "ywx",
        // light: {
        //     status: false  // 关闭光照
        // },
        bottom: "12%",
        roam: true,
        regionHeight: 5,
        shading: 'realistic',
        label: {
          show: true,
          silent: true,
          position: 'inside',
          formatter: function (params) {
            return params.name;
          },
          fontSize: 16,
          color: "#fff",
          textStyle: {
            align: 'center', // 文字水平居中
          },
          backgroundColor: '#4d93ff6e', // 设置标签背景色
          borderColor: '#35f1d6', // 标签边框颜色
          borderWidth: 1, // 标签边框宽度
          borderRadius: 4, // 标签边角半径
          padding: 14 // 标签内边距
        },
         emphasis: {
          label: {
            show: true,
            color: "#fff000",
          },
             itemStyle: {
             color: "#34f8fd"
           }
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     color: "#fff000",
        //     formatter: function (params) {
        //       let str = "耕地面积:" + extraData[params.name]['耕地面积'] +"\n\n"+
        //       "合作社:" + extraData[params.name]['合作社'] +"\n\n"
              
        //       if (extraData[params.name]['哈密瓜']) {
        //         str += "哈密瓜:" + extraData[params.name]['哈密瓜'] +"\n\n"
        //       }

        //       if (extraData[params.name]['小麦']) {
        //         str += "小麦:" + extraData[params.name]['小麦'] +"\n\n"
        //       }
        //       if (extraData[params.name]['玉米']) {
        //         str += "玉米:" + extraData[params.name]['玉米'] +"\n\n"
        //       }
        //       if (extraData[params.name]['油葵']) {
        //         str += "油葵:" + extraData[params.name]['油葵'] +"\n\n"
        //       }

        //       if (extraData[params.name]['苜蓿']) {
        //         str += "苜蓿:" + extraData[params.name]['苜蓿'] +"\n\n"
        //       }

        //       if (extraData[params.name]['甘草']) {
        //         str += "甘草:" + extraData[params.name]['甘草'] +"\n\n"
        //       }

        //       if (extraData[params.name]['花生']) {
        //         str += "花生:" + extraData[params.name]['花生'] +"\n\n"
        //       }
        //       if (extraData[params.name]['蔬菜']) {
        //         str += "蔬菜:" + extraData[params.name]['蔬菜'] +"\n\n"
        //       }


        //       return str
        //       ;
        //     },
        //   },
        //   itemStyle: {
        //     color: "#34f8fd"
        //   }
        // },
        itemStyle: {
          // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
          color: "#35f1d6", // 地图板块的颜色
          opacity: 1, // 图形的不透明度 [ default: 1 ]
          borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
          borderColor: "#35f1d6", // 图形描边的颜色。[ default: #333 ]
          areaColor: "#35f1d6",
        },
        viewControl: {
          // 用于鼠标的旋转，缩放等视角控制。
          projection: "orthographic", // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
          orthographicSize: 140, //控制地图大小
          maxOrthographicSize: 150,
          minOrthographicSize: 150,
          autoRotate: true, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
          autoRotateDirection: "cw", // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
          autoRotateSpeed: 0, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
          autoRotateAfterStill: 1, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
          damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
          rotateSensitivity: 1, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。	rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
          zoomSensitivity: 1, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
          panSensitivity: 1, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
          panMouseButton: "left", // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
          rotateMouseButton: "left", // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

          distance: 170, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
          minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
          maxDistance: 170, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。
          alpha: 50, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
          beta: 0, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
          minAlpha: -360, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
          maxAlpha: 360, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
          minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
          maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
          center: [0, 0, 0], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。

          animation: true, // 是否开启动画。[ default: true ]
          animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
          animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
        },
        groundPlane: false,
        zlevel: -10
      },
      series: [
        {
          type: "scatter3D",
          coordinateSystem: "geo3D",
          // data: originalDatas.datas.map((item) => {
          //   item.value = [
          //     i == 0 ? item.lng - 0 + 0.05 : item.lng - 0.05,
          //     item.lat,
          //     item[seriesItem.field],
          //     seriesItem.unit,
          //   ];
          //   return JSON.parse(JSON.stringify(item));
          // }),
          emphasis: {
            label: { show: true },
          },
        }
      ],
    }
    myEcharts.setOption(option);
    myEcharts.getZr().on('click', function (params) {
      // 弹出窗口
      console.log(params)
    });
  },
  methods: {
    initEcharts2() {
      const myChart = echarts.init(this.$refs.echarts2);
      let legendItem = ["交易次数"];
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: "次",
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
                return `<span class="border" style='${style} background: ${color};margin:6px 0 0-12px'></span> ${seriesName}: ${value} /个`;
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
          left: "14%",
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
            data: ["5月", "6月", "7月", "8月", "9月", "10月"],
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
            data: [ 556, 617, 1924, 1254, 2412, 578],
          }
        ],
      };
      let app = {
        currentIndex: -1,
      };
      // setInterval(function () {
      //   let dataLen = option.series[0].data.length;

      //   // 取消之前高亮的图形
      //   myChart.dispatchAction({
      //     type: "downplay",
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      //   app.currentIndex = (app.currentIndex + 1) % dataLen;
      //   // 高亮当前图形
      //   myChart.dispatchAction({
      //     type: "highlight",
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      //   // 显示 tooltip
      //   myChart.dispatchAction({
      //     type: "showTip",
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      // }, 2000);
      myChart.setOption(option);
    },
    initEcharts3() {
      const myChart = echarts.init(this.$refs.echarts3);
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: "单位/吨",
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
          bottom: "0%",
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
              name: "预计产销",
              //icon:'image://../wwwroot/js/url2.png', //路径
            },
            {
              name: "实际采收",
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
            data: ["4月", "5月", "6月", "7月", "8月", "9月"],
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
            name: "预计产销",
            type: "bar",
            data: [50, 55, 50, 335, 7045, 4050],
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
            name: "实际采收",
            type: "bar",
            data: [40, 60, 80, 430, 8600, 5300],
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
      // setInterval(function () {
      //   let dataLen = option.series[0].data.length;

      //   // 取消之前高亮的图形
      //   myChart.dispatchAction({
      //     type: "downplay",
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      //   app.currentIndex = (app.currentIndex + 1) % dataLen;
      //   //console.log(app.currentIndex);
      //   // 高亮当前图形
      //   myChart.dispatchAction({
      //     type: "highlight",
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      //   // 显示 tooltip
      //   myChart.dispatchAction({
      //     type: "showTip",
      //     seriesIndex: 0,
      //     dataIndex: app.currentIndex,
      //   });
      // }, 2000);
      myChart.setOption(option);
    }
  }
}







</script>

<style lang="scss" scoped>
.bg-map {
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 999;
  background-color: #165d62;
}

.bottom-panel {
  width: vw(840);
  height: vh(300);
  position: fixed;
  bottom: vh(30);
  left: vw(540);
  display: flex;
  justify-content: space-between;
  color: #fff;
  z-index: 1000;
}

.left-panel {
  width: vw(496);
  height: vh(939);
  position: absolute;
  top: vh(117);
  left: vw(24);
  display: flex;
  color: #fff;
  z-index: 1000;
}

.right-panel {
  width: vw(496);
  height: vh(939);
  position: absolute;
  top: vh(117);
  right: vw(24);
  display: flex;
  color: #fff;
  z-index: 1000;
}

.ywxmap {
  width: 100%;
  height: 100%;
  background: #165d62d6;
}


.echarts-panel {
  // text-align: right;
  // margin: 5px 0 !important;
  // flex: 1;
  width: vw(410);
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 10px 20px !important;
  box-sizing: border-box;
  height: vh(300) !important;

  .echarts2 {
    width: 100%;
    height: 90%;
  }

  .echarts3 {
    width: 100%;
    height: 90%;
  }
}

.pie-title {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  font-size: calc(100vw * 18 / 1920);
}
</style>
