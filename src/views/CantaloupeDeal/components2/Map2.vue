<template>
  <div class="echart" id="map" ref="map"></div>
</template>
<script setup>
import { cityData, cityLngLat } from "@/tempData/tempData2.ts";
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import "@/assets/map/js/china.js"; // 核心文件
let chinaDatas = reactive([]);
const map = ref(null);

let chinaGeoCoordMap = reactive({
  阿勒泰: [94.69705, 43.25543]
});
let myChart = reactive(null);
console.log(echarts);
const convertData = (data) => {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = [94.69705, 43.25543];
    var toCoord = chinaGeoCoordMap[dataItem[0].name];
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: fromCoord,
          value: `阿勒泰->${dataItem[0].name}<br/>${dataItem[0].value}吨`
        },
        {
          coord: toCoord
        }
      ]);
    }
  }
  return res;
};

onMounted(() => {
  drawEcharts();
});
const drawEcharts = () => {
  var series = [];
  [["阿勒泰", chinaDatas]].forEach(function (item) {
    series.push(
      {
        name: "阿勒泰",
        type: "lines",
        zlevel: 2,
        effect: {
          //飞线箭头
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 8 //图标大小
        },
        lineStyle: {
          normal: {
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: 0.3, //尾迹线条曲直度
            color: "#02E3AB"
          }
        },
        data: convertData(item[1])
      },
      {
        //气泡点
        type: "effectScatter",
        tooltip: {
          show: false
        },
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          number: 1,
          period: 4, //动画时间，值越小速度越快
          brushType: "fill", //波纹绘制方式 stroke, fill
          scale: 1 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: "bottom", //显示位置
            offset: [0, 0], //偏移设置
            formatter: function (params) {
              //圆环显示文字
              return params.data.name;
            },
            fontSize: 13,
            color: "#fff"
          },
          emphasis: {
            show: true
          }
        },
        symbol: "circle",
        itemStyle: {
          normal: {
            show: true,
            color: {
              type: "radial", // 径向渐变
              x: 0.5, // 圆心坐标（中心）
              y: 0.5,
              r: 1, // 半径长度
              colorStops: [
                {
                  offset: 0,
                  color: "#87EAFF" // offset：坐标为0处的颜色
                },
                {
                  offset: 0.5,
                  color: "#04AFFF" // offset：坐标为1处的颜色
                }
              ]
            }
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value | 0])
          };
        })
      },
      {
        //阿勒泰
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: "stroke",
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: "top",
            color: "#0A6A65",
            formatter: "{b}",
            fontSize: 18,
            backgroundColor: "#FFE425",
            borderRadius: 6,
            padding: 5,
            textStyle: {
              color: "#0A6A65"
            }
          },
          emphasis: {
            show: false,
            color: "#f60"
          }
        },
        itemStyle: {
          color: "#FFE425"
        },
        symbol:
          "image://data:image/png;base64,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",
        symbolSize: 25,
        data: [
          {
            name: item[0],
            value: chinaGeoCoordMap[item[0]].concat([10])
          }
        ]
      }
    );
  });
  let option = {
    tooltip: {
      formatter: function (params) {
        return params.data.value;
      },
      textStyle: {
        align: "center"
      }
    },
    geo: {
      map: "china",
      zoom: 1.2,
      label: {
        emphasis: {
          show: true, //鼠标划过高亮显示地方名
          color: "#fff"
        }
      },
      roam: false, //是否允许缩放
      itemStyle: {
        normal: {
          color: "#02ACA6",
          borderColor: "#013C52", //省市边界线00fcff 516a89
          borderWidth: 2
        },
        emphasis: {
          color: "#00FFC0" //悬浮背景
        }
      }
    },
    series: series
  };
  myChart = echarts.init(document.getElementById("map"));
  myChart.setOption(option);
};

const getLatLng = () => {
  let keys = Object.keys(cityLngLat);
  keys.forEach((v) => {
    chinaGeoCoordMap[cityLngLat[v].name] = [cityLngLat[v].longitude, cityLngLat[v].latitude];
  });
};

const flowInfo = () => {
  let toAddress = [];
  cityData.forEach((v) => {
    toAddress.push([
      {
        name: v.toAddress,
        value: v.tonnage //吨数
      }
    ]);
  });
  chinaDatas = toAddress;
  getLatLng();
};
flowInfo();
</script>
<style scoped>
.echart {
  /* width: 87.5rem; */
  /* height: 61.375rem; */
  width: 100%;
  height: 100%;
}
</style>
