<template>
  <div class="rank">
    <div>
      <div class="title">产瓜排名TOP5</div>
      <img class="line_img" src="../../../../public/img/line.png" />
      <div class="table">
        <div class="table_header">
          <div class="w-[30%] h-[3vh] leading-[3vh]">排名</div>
          <div class="w-[30%] h-[3vh] leading-[3vh]">名称</div>
          <div class="w-[40%] h-[3vh] leading-[3vh]">吨数</div>
        </div>
        <div class="table_content">
          <div v-for="(item, index) in farmerList" :key="index">
            <div class="w-[30%] h-[6vh] leading-[6vh] text-center">
              <img :src="item.src" class="inline-block crown" />
            </div>
            <div class="w-[30%] h-[6vh] leading-[6vh]">{{ item.name }}</div>
            <div class="w-[40%] h-[6vh] leading-[6vh]">{{ item.weight }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">收瓜排名TOP5</div>
      <img class="line_img" src="../../../../public/img/line.png" />
      <div class="table">
        <div class="table_header">
          <div class="w-[30%] h-[3vh] leading-[3vh]">排名</div>
          <div class="w-[30%] h-[3vh] leading-[3vh]">名称</div>
          <div class="w-[40%] h-[3vh] leading-[3vh]">吨数</div>
        </div>
        <div class="table_content">
          <div v-for="(item, index) in consigneeList" :key="index">
            <div class="w-[30%] h-[6vh] leading-[6vh]">
              <img :src="item.src" class="inline-block crown" />
            </div>
            <div class="w-[30%] h-[6vh] leading-[6vh]" :title="item.name">{{ item.name }}</div>
            <div class="w-[40%] h-[6vh] leading-[6vh]" :title="item.weight">{{ item.weight }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { rankData } from "@/tempData/tempData";
import { reactive } from "vue";
const farmerList = reactive([
  {
    src: require("../../../../public/img/rank-1.png"),
    name: "希望农村",
    weight: "4504吨"
  },
  {
    src: require("../../../../public/img/rank-2.png"),
    name: "开发区",
    weight: "2564.7吨"
  },
  {
    src: require("../../../../public/img/rank-3.png"),
    name: "明光社区",
    weight: "2248.8吨"
  },
  {
    src: require("../../../../public/img/rank-4.png"),
    name: "长城公司",
    weight: "1203.3吨"
  },
  {
    src: require("../../../../public/img/rank-5.png"),
    name: "县办农场",
    weight: "919.56吨"
  }
]);

const consigneeList = reactive([
  {
    src: require("../../../../public/img/rank-1.png"),
    name: "--",
    weight: "--"
  },
  {
    src: require("../../../../public/img/rank-2.png"),
    name: "--",
    weight: "--"
  },
  {
    src: require("../../../../public/img/rank-3.png"),
    name: "--",
    weight: "--"
  },
  {
    src: "/img/rank-4.png",
    name: "--",
    weight: "--"
  },
  {
    src: require("../../../../public/img/rank-5.png"),
    name: "--",
    weight: "--"
  }
]);

// const getRankInfo = () => {
//   for (let i = 0; i < rankData.length; i++) {
//     consigneeList[i].name = rankData[i].toAddress ? rankData[i].toAddress : "--";
//     consigneeList[i].weight = rankData[i].tonnage ? rankData[i].tonnage + "吨" : "--";
//   }
// };
// getRankInfo();
</script>
<style lang="scss">
@mixin flex($flexDirection: row, $alignItems: center, $justifyContent: space-around) {
  display: flex;
  flex-direction: $flexDirection;
  align-items: $alignItems;
}
.rank {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow: hidden;
  > div {
    background: url("../../../../public/img/rank-panel.png") no-repeat scroll center;
    background-size: 100% 100%;
    text-align: right;
    padding: 0.625rem;
    height: 100%;
    box-sizing: border-box;
    width: 48%;
  }
}
.title {
  font-size: calc(100vw * 18 / 1920);
  font-weight: bold;
  color: #ffffff;
  padding-right: 0.625rem;
}
.line_img {
  width: 90%;
  margin: 4% 0 2% 0;
}
.table {
  color: #ffffff;
  font-size: calc(100vw * 16 / 1920);
  width: 100%;
  .table_header {
    @include flex();
    > div {
      text-align: center;
    }
  }
  .table_content {
    font-size: calc(100vw * 16 / 1920);
    width: 100%;
    > div {
      @include flex();
      flex: 1;
      > div {
        text-align: center;
        text-overflow: ellipsis; //关键代码
        white-space: nowrap; /* 不换行 */
        overflow: hidden;
      }
    }
  }
}
.bubble {
  position: relative;
  > .label {
    position: absolute;
    // text-align: center;
    top: -0.3125rem;
    left: 46%;
  }
}
.crown {
  width: 1.875rem;
  max-width: 80px;
  // min-height: 1.875rem;
}
</style>
