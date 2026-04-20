<template>
  <div class="echart" key="lineChart" id="lineChart" ref="lineChart"></div>
</template>
<script setup>
import * as echarts from "echarts";
import { reactive, onMounted } from "vue";
let xAxisData = reactive([]);
let yAxisData = reactive([]);
onMounted(() => {
  drawChart();
});
const drawChart = () => {
  let dateArr = {};
  let xAxisData = [];
  let yAxisData = [];
  //7月
  // for (let i = 1; i <= 31; i++) {
  //   let dateStr = "2022-07-" + (i < 10 ? "0" + i : i);
  //   dateArr[dateStr] = 0;
  // }
  //8月
  for (let i = 1; i <= 31; i++) {
    let dateStr = "2024-08-" + (i < 10 ? "0" + i : i);
    dateArr[dateStr] = 0;
  }
  //9月
  for (let i = 1; i <= 15; i++) {
    let dateStr = "2024-09-" + (i < 10 ? "0" + i : i);
    dateArr[dateStr] = 0;
  }
  [].forEach((v) => {
    dateArr[v.transportTime] = v.tonnage;
  });
  xAxisData = Object.keys(dateArr);
  yAxisData = Object.values(dateArr);
  let myChart = echarts.init(document.getElementById("lineChart"));
  let option = {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    grid: {
      y: "6%",
      y2: "20%",
      x: "10%",
      x2: "3%"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: "#fff" //更改坐标轴颜色
        }
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff" //更改坐标轴颜色
        }
      }
    },
    series: [
      {
        data: yAxisData,
        type: "line",
        lineStyle: { color: "#FFF600" },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: "#FFFFFF" },
              { offset: 0, color: "#FFF600" }
            ])
          }
        },
        symbol: "circle", //折线点设置为实心点
        symbolSize: 8, //折线点的大小
        itemStyle: {
          normal: {
            color: "#FF8400" //折线点的颜色
          }
        }
      }
    ]
  };
  myChart.setOption(option);
};
</script>
<style>
.echart {
  width: 100%;
  height: 100%;
}
</style>
