<template>
  <dv-flyline-chart-enhanced
    :config="config"
    :dev="true"
    style="width: 100%; height: 100%" />
</template>
<script>
export default {
  data() {
    return {
      config: {
        points: [
          {
            name: "郑州",
            coordinate: [0.36, 0.29],
            halo: {
              show: true,
            },
          },
          {
            name: "开封",
            coordinate: [0.59, 0.35],
          },
          {
            name: "许昌",
            coordinate: [0.53, 0.47],
          },
          {
            name: "平顶山",
            coordinate: [0.45, 0.54],
          },
          {
            name: "洛阳",
            coordinate: [0.36, 0.38],
          },
          {
            name: "周口",
            coordinate: [0.62, 0.55],
          },
          {
            name: "漯河",
            coordinate: [0.56, 0.56],
          },
          {
            name: "南阳",
            coordinate: [0.37, 0.66],
          },
          {
            name: "信阳",
            coordinate: [0.55, 0.81],
          },
          {
            name: "驻马店",
            coordinate: [0.55, 0.67],
          },
          {
            name: "济源",
            coordinate: [0.37, 0.29],
          },
          {
            name: "三门峡",
            coordinate: [0.2, 0.36],
          },
          {
            name: "商丘",
            coordinate: [0.76, 0.41],
          },
        ],
        lines: [
          {
            target: "开封",
            source: "郑州",
          },
          {
            target: "许昌",
            source: "郑州",
          },
          {
            target: "平顶山",
            source: "郑州",
          },
          {
            target: "洛阳",
            source: "郑州",
          },
          {
            target: "周口",
            source: "郑州",
          },
          {
            target: "漯河",
            source: "郑州",
          },
          {
            target: "南阳",
            source: "郑州",
          },
          {
            target: "信阳",
            source: "郑州",
          },
          {
            target: "驻马店",
            source: "郑州",
          },
          {
            target: "济源",
            source: "郑州",
          },
          {
            target: "三门峡",
            source: "郑州",
          },
          {
            target: "商丘",
            source: "郑州",
          },
        ],
        bgImgSrc: "../../../../public/img/map-zh.png",
      },
    }
  },
}
</script>
<style>
.echart {
  width: 100%;
  height: 100%;
}
</style>
