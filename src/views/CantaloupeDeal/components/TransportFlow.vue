<template>
  <div class="transport">
    <div class="title">运单流向</div>
    <img class="line_img" src="../../../../public/img/left-line.png" />
    <div class="scroll_list">
      <dv-scroll-board v-model:config="config" style="width: 100%; height: 100%" @click="detail" />
    </div>
  </div>
</template>
<script>
import { DvScrollBoard } from "@dataview/datav-vue3";
import { goodsFlowData } from "@/tempData/tempData";
export default {
  props: ["showDialog"],
  data() {
    return {
      dataId: [],
      config: {
        header: ["时间", "吨数", "运输流向"],
        data: [],
        rowNum: 10,
        columnWidth: [200, 130],
        align: ["center"],
        headerBGC: "",
        oddRowBGC: "",
        evenRowBGC: ""
      }
    };
  },
  async created() {
    let config = {
      header: ["时间", "吨数", "运输流向"],
      data: [],
      rowNum: 8,
      columnWidth: [200, 130],
      align: ["center"],
      headerBGC: "",
      oddRowBGC: "",
      evenRowBGC: ""
    };
    goodsFlowData.forEach((v) => {
      this.dataId.push(v.id);
      config.data.push([v.transportTime, v.tonnage + "吨", `${v.fromAddress}-${v.toAddress}`]);
    });
    this.config = { ...config };
  },
  methods: {
    detail(row) {
      this.$emit("show", this.dataId[row.rowIndex]);
    }
  }
};
</script>
<style lang="scss" scoped>
.transport {
  color: "#fff";
  height: 37%;
  background: url("../../../../public/img/transport-panel.png") no-repeat scroll center;
  background-size: 100% 100%;
  > .title {
    font-size: calc(100vw * 18 / 1920);
    font-weight: bold;
    color: #ffffff;
  }
}
.scroll_list {
  margin-top: 1%;
  width: 100%;
  height: 90%;
}
</style>
