<template>
  <div class="count-flop" :key="compKey">
    <div :class="item != '.' ? 'count-flop-box' : 'count-flop-point'" v-for="(item, index) in value" :key="index">
      <div v-if="item != '.'" class="count-flop-content" :class="['rolling_' + item]">
        <div v-for="(item2, index2) in numberList" :key="index2" class="count-flop-num">
          {{ item2 }}
        </div>
      </div>
      <div v-else class="count-flop-content">
        <div>.</div>
      </div>
    </div>
    <div v-if="suffix" class="count-flop-suffix">{{ suffix }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      numberList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      compKey: 0
    };
  },
  props: ["val", "suffix"],
  watch: {
    val() {
      this.value = this.val.toString().split("");
      this.compKey += 1;
    }
  },
  created() {
    this.value = this.val.toString().split("");
  }
};
</script>
<style scoped>
.count-flop {
  display: inline-block;
  font-size: 0;
  width: 100%;
  /* 可更改 */
  height: calc(100vh * 70 / 1080);
  line-height: calc(100vh * 70 / 1080);
  font-size: calc(100vw * 62 / 1920);
  color: #fff;
}

.count-flop > div {
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: 100%;
  background: linear-gradient(0deg, #009570 0%, #0c6563 41%, #009570 62%, #1e6a68 100%);
}

.count-flop-box {
  /* 可更改 */
  margin-right: 5px;
  /* width: 60px; */
  width: calc(100vw * 60 / 1920);
  /* border: 1px solid rgba(72, 152, 241, 0.3); */
  /* line-height: 70px; */
  line-height: calc(100vh * 70 / 1080);
  border-radius: 6px;
}

.count-flop-point {
  /* 可更改 */
  margin-right: 5px;
  width: calc(100vw * 60 / 1920);
  height: calc(100vh * 70 / 1080);
  line-height: calc(100vh * 70 / 1080);
  /* border: 1px solid rgba(72, 152, 241, 0.3); */
  border-radius: 6px;
}
.count-flop-suffix {
  margin-right: 5px;
  /* width: 60px;
  height: 70px; */
  width: calc(100vw * 60 / 1920);
  height: calc(100vh * 70 / 1080);
  line-height: calc(100vh * 70 / 1080);
  border-radius: 6px;
  font-size: calc(100vw * 55 / 1920);
}

.count-flop-content {
  font-family: MicrosoftYaHei-Bold;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  animation-fill-mode: forwards !important;
}

.rolling_0 {
  animation: rolling_0 2.1s ease;
}

@keyframes rolling_0 {
  from {
    transform: translateY(-90%);
  }
  to {
    transform: translateY(0);
  }
}

.rolling_1 {
  animation: rolling_1 3s ease;
}

@keyframes rolling_1 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10%);
  }
}

.rolling_2 {
  animation: rolling_2 2.1s ease;
}

@keyframes rolling_2 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20%);
  }
}

.rolling_3 {
  animation: rolling_3 3s ease;
}

@keyframes rolling_3 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-30%);
  }
}

.rolling_4 {
  animation: rolling_4 2.1s ease;
}

@keyframes rolling_4 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-40%);
  }
}

.rolling_5 {
  animation: rolling_5 3s ease;
}

@keyframes rolling_5 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

.rolling_6 {
  animation: rolling_6 2.1s ease;
}

@keyframes rolling_6 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-60%);
  }
}

.rolling_7 {
  animation: rolling_7 3.1s ease;
}

@keyframes rolling_7 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-70%);
  }
}

.rolling_8 {
  animation: rolling_8 2.1s ease;
}

@keyframes rolling_8 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-80%);
  }
}

.rolling_9 {
  animation: rolling_9 3.6s ease;
}

@keyframes rolling_9 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-90%);
  }
}
</style>
