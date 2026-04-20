<template>
  <div class="title_content">
    <div class="title">2024年哈密瓜运输总吨数</div>
    <fanPaiTem :val="allTonnage" suffix="吨"></fanPaiTem>
    <div class="statistic">
      <div>总车次：{{ allCarNum }}辆</div>
      <div>今日拉运重量：{{ toDayTonnage }}吨</div>
      <div>今日车次：{{ toDayCarNum }}辆</div>
    </div>
  </div>
</template>
<script>
import fanPaiTem from "@/components/fanPaiTem.vue";
// import { statistics } from "@/api/statistic.js";
export default {
  components: {
    fanPaiTem
  },
  data() {
    return {
      allCarNum: "2110",
      allTonnage: "103601.75",
      toDayCarNum: "0",
      toDayTonnage: "0",
      time: null
    };
  },
  created() {
    // this.getStatistic();
  },
  mounted() {
    setInterval(() => {
      this.time = new Date().toLocaleString();
    }, 1000);
  },
  methods: {
    getStatistic() {
      // statistics().then((res) => {
      //   this.allTonnage = res.data.allTonnage;
      //   this.allCarNum = res.data.allCarNum;
      //   this.toDayCarNum = res.data.toDayCarNum;
      //   this.toDayTonnage = res.data.toDayTonnage;
      // });
    }
  }
};
</script>
<style lang="scss">
.title_content {
  color: #fff;
  width: 100%;
  z-index: 999 !important;
}
.title {
  font-size: calc(100vw * 25 / 1920);
  margin-bottom: 1%;
  width: 100%;
}
::v-deep .count-flop-box {
  font-size: calc(100vw * 52 / 1920);
}
.statistic {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: calc(100vw * 18 / 1920);
  font-weight: bold;
  margin-top: 1%;
  > div {
    margin-right: calc(100vw * 80 / 1920);
  }
}
</style>
