<template>
  <div class="echart" id="bargraph" key="bargraph" ref="bargraph"></div>
</template>
<script>
import { cityData } from "@/tempData/tempData";
import * as echarts from "echarts";
export default {
  data() {
    return {
      xData: [],
      yData: []
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    /**
     * 省份成绩排名
     */
    drawChart() {
      /**
       * 数组排序
       */
      let sortArr = cityData.sort((item1, item2) => {
        return item2.tonnage - item1.tonnage;
      });
      /**
       * 数据填充
       */
      sortArr.forEach((v) => {
        this.xData.push(v.toAddress);
        this.yData.push(v.tonnage);
      });
      /**
       * 绘制echarts
       */
      let myChart = echarts.init(document.getElementById("bargraph"));
      let option = {
        tooltip: {},
        grid: {
          y: "6%",
          y2: "15%",
          x: "12%",
          x2: "3%"
        },
        xAxis: {
          type: "category",
          data: this.xData,
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
            data: this.yData,
            type: "bar",
            itemStyle: {
              normal: {
                color: "#11E6FF"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style>
.echart {
  width: 100%;
  height: 100%;
}
</style>
