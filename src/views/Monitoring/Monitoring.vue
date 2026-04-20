<template>
  <div class="w-full h-full">
    <Map ref="map" :lat="lat" :lng="lng"></Map>

    <div style="display: none;" class="business-entity w-[20vw] mr-4 p-6 float-right overflow-auto text-white">
      <div class="entity-item" v-for="(item, index) in aredList" :data-lng="item.lng" :data-lat="item.lat" :key="index"
        @click="flytomap">
        <text>{{ item.landName }}</text>
        <span><img class="w-6 h-6" src="../../../public/img/icon-device.png" />
          <!-- <img class="w-6 h-6" src="../../../public/img/icon-exit.png"/> -->
        </span>
      </div>
    </div>

    <div class="left-panel">
      <div class="selectcun all">
        <div class="pie-title">各村镇地块分布</div>
        <img class="img" src="img/panel/line.png" />
        <div class="culist">
          <div class="cunitem" @click="flytomap" data-lng="94.99" data-lat="43.76">福海县</div>
          <div class="cunitem" @click="flytomap" data-lng="94.30" data-lat="43.33">富蕴县</div>
          <div class="cunitem" @click="flytomap" data-lng="94.85" data-lat="43.46">清河县</div>
          <div class="cunitem" @click="flytomap" data-lng="95.26" data-lat="43.22">吉木乃县</div>
          <div class="cunitem" @click="flytomap" data-lng="94.67" data-lat="43.24">布尔津县</div>
          <div class="cunitem" @click="flytomap" data-lng="93.38" data-lat="42.95">哈巴河县</div>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <RightPanel></RightPanel>
    </div>



    <div class="cqlbox">
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="全部">
        <div class="cqlcolor" style="background-color:#fbd657 ;"></div>
        <div>全部</div>
      </div>
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="sfMarkers">
        <div class="cqlcolor" style="background-color: #4c98fb;"></div>
        <div>智慧球阀</div>
      </div>
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="mwdMarkers">
        <div class="cqlcolor" style="background-color: #8cdf6c;"></div>
        <div>杀虫灯</div>
      </div>
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="jkMarkers">
        <div class="cqlcolor" style="background-color: #f56679;"></div>
        <div>远程监控</div>
      </div>
      <div class="flex_start alicenter cqlitem" @click="cqlwms" data-cql="">
        <div class="cqlcolor" style="background-color: #26c7c8;"></div>
        <div>其他</div>
      </div>

    </div>
  </div>
</template>
<script setup>
import RightPanel from "./components/RightPanel.vue";
import Map from "./components/Map.vue";
import { ref, reactive } from "vue";
import { getland, getLandDeviceList } from '@/api/api.js'
const lat = ref(43.299609268544)
const lng = ref(94.386302151369)
let deviceList = reactive([]);

const placeList = reactive([
  {
    id: 1,
    createTime: "2023-05-30 15:52:50",
    updateTime: "2023-05-30 16:31:36",
    name: "物联网监控1号",
    lat: 43.39357267488317,
    lng: 94.12776947021486,
    address: "哈密市阿勒泰在瓜乡美购物广场附近",
    introduce:
      "阿勒泰福海县汇峰农民专业合作社基地位于福海县原粮食局农场，合作社由马海博、李建刚等8名成员于2010年年底发起成立。并选举马海博为理事长，注册资金100万元。该合作社是集生产、经营、销售有机哈密瓜为一体的合作社，经营范围：开展种殖业、组织销售种植水果等。2012年至今哈密瓜种植面积逐年扩大。2016年申请有机认证。2018年8月被评为国家农民合作社示范社。2021年注册了“淖木土尔、淖木库洪”商标。采用专版包装，统一标识，因其生产有机哈密瓜耐贮运、品质纯正、口感独特因此在广州市场、上海嘉兴市场、广西南宁市场倍受客户青睐，产品供不应求。\n目前合作社有8方施肥机、约翰迪尔954、304拖拉机东方红拖拉机、旋耕机、平地机、无人机等20套农机具，贮量50吨哈密瓜保鲜库8座，固定资产达到 500 万元。基础设施建设为合作社发展奠定了基础。合作社本着互惠互利原则，为农户提供农业产前、产中、产后一条龙服务，经济效益凸显逐步实现了有机哈密瓜膜下种植的机械化、精准化及现代化。\n2022年合作社流转1011亩土地。种植西州蜜17号170亩新密25号841亩。8月10号左右进入哈密瓜采摘季节，哈密瓜陆续上市销往上海、嘉兴水果市场、广西南宁海吉星市场等，产量2500吨、实现哈密瓜销售收入500万元。",
    manageType: "哈密瓜",
    manager: "阿勒泰福海县汇峰农民专业合作社",
    pics: "uploadFiles/png/b11cabbb2d22ca91626bd3decc30f437.png,uploadFiles/png/c594250f901d686196f5da93433a3daa.png",
    superviseTimes: 50,
    passRate: 96,
    authenticationArea: 90,
    coverArea: 88,
    list: [
      {
        id: 1,
        createTime: "2023-05-30 16:13:15",
        updateTime: "2023-05-30 16:13:15",
        landId: 1,
        type: "0",
        name: "摄像头1",
        deviceId: "K31763794",
        lat: 0,
        lng: 0,
        videoUrl: "ezopen://NIVRFN@open.ys7.com/K31763794/1.live",
        online: false,
        accessToken: "at.0uuirwg9dducsp563ra1mbng4bdegwtg-4ckewfuyw1-19rcg05-0kihekny4"
      },
      {
        id: 2,
        createTime: "2023-05-30 16:13:43",
        updateTime: "2023-05-30 16:13:43",
        landId: 1,
        type: "1",
        name: "气象传感器",
        deviceId: "861551056095136",
        lat: 0,
        lng: 0,
        videoUrl: null,
        online: false,
        accessToken: null
      }
    ],
    certificateList: []
  },
  {
    id: 2,
    createTime: "2023-05-30 15:55:23",
    updateTime: "2023-05-30 16:31:19",
    name: "物联网监控2号",
    lat: 43.32118142926663,
    lng: 94.29977416992189,
    address: "阿勒泰布尔津县泉脑村",
    introduce:
      "阿勒泰布尔津县草莓种植基地位于阿勒泰布尔津县泉脑村，基地由如先古丽·霍加不都和沙德尔·怕孜力等5名人员共同管理，基地主要负责人为如先古丽·霍加不都。基地共有大棚8座，主要种植草莓和圣女果为主。2020年如先古丽·霍加不都和沙德尔·怕孜力请来技术员，又从北京购买了草莓苗，试种成功的草莓填补了阿勒泰历史空白，2020年开始，沙德尔·怕孜力开始承包村里的大棚种植草莓，种植的草莓果实呈现出鲜艳的红色，有浓郁的香味，沁人心脾，草莓果肉饱满细腻，多汁，有一定的酸甜味道，果肉质地脆嫩，口感爽口，深受消费者好评。草莓长势喜人，正全面进入盛果期，每个棚年均收入约在2至3万元。目前大棚正在进行羊肚菌的试种，未来将继续扩大种植经营范围。承包大棚后村里面的一些农民也来这打工提高了家庭收入，他们在示范性种植中学到了很多宝贵的经验，以后还会继续保质量，保产量的增收，同时还要扩宽销售渠道，让更多的农民过上富裕的好日子。",
    manageType: "草莓、圣女果",
    manager: "如先古丽·霍加不都",
    pics: "uploadFiles/png/44602bce20bedb977ac0ba975e186a61.png,uploadFiles/png/4d642224851a9ab81ecc21c694c1b7db.png,uploadFiles/png/50570981f624aee82dd9376ebba8da11.png",
    superviseTimes: 30,
    passRate: 93,
    authenticationArea: 100,
    coverArea: 80,
    list: [
      {
        id: 3,
        createTime: "2023-05-30 16:27:10",
        updateTime: "2023-05-30 16:27:10",
        landId: 2,
        type: "0",
        name: "摄像头1",
        deviceId: "K31763719",
        lat: 0,
        lng: 0,
        videoUrl: "ezopen://QVIRFO@open.ys7.com/K31763719/1.live",
        online: false,
        accessToken: "at.0uuirwg9dducsp563ra1mbng4bdegwtg-4ckewfuyw1-19rcg05-0kihekny4"
      },
      {
        id: 4,
        createTime: "2023-05-30 16:27:27",
        updateTime: "2023-05-30 16:27:27",
        landId: 2,
        type: "1",
        name: "气象传感器",
        deviceId: "861551055333074",
        lat: 0,
        lng: 0,
        videoUrl: null,
        online: false,
        accessToken: null
      }
    ],
    certificateList: []
  },
  {
    id: 3,
    createTime: "2023-05-30 15:56:34",
    updateTime: "2023-05-30 16:33:25",
    name: "物联网监控3号",
    lat: 43.29694853167274,
    lng: 94.39315795898438,
    address: "阿勒泰吉木乃县",
    introduce:
      "阿勒泰下马崖众合骆驼养殖专业合作社，坐落于美丽的阿勒泰吉木乃县。本合作社投资创建于2014年11月1日，是一家专业养殖骆驼，销售新鲜驼奶的合作社。经过多年经营和政府有关部门的大力帮助下，合作社发展成以社长努尔艾力·喀斯木为代表的，有21名专业工作人员，占地面积约50亩，养殖基地3000平方米，现有800多峰骆驼和100匹马的专业合作社。此外，合作社为了发展绿色，具有丰富营养价值的骆驼奶，专门在广汇路120公里处修建400平方米的挤奶大厅；在吉木乃县西面6公里处修建300平方米和南面7公里处400平方米的三间设施齐全，带有专业自动化消毒间的挤奶厅。在所有工作人员的共同努力下，现在我们的新鲜驼奶送往盐池中驼科技有限公司，2020年度的一个月的骆驼奶最高销售5000公斤左右，共受到了长久好评。这几年合作社通过系统化管理，经济效益大幅度的增加，不光达到了自己致富，也带领了大家一起致富的效果。2015年开始我们合作社分红工作中，我们合作社为吉木乃县村民分红额达394000元。以大家一起致富为原则，我们不光带领吉木乃县牧民致富，我们也和阿勒泰伟子峡乡部分牧民合作，分红共计发放43000元。此外，于阿勒泰前山乡牧民合作，分红共计发放95000元。据今年的增值收益情况分析，分红额度与年俱增，给牧民带来更多收益。",
    manageType: "骆驼奶",
    manager: "阿勒泰下马崖众合骆驼养殖专业合作社",
    pics: "uploadFiles/png/029b45cd4c2c85e4809bcba6f78e0d36.png,uploadFiles/png/b084b14127c12116d3ccee91c4de859e.png,uploadFiles/png/04a22a9da445c67ed7e1cf9b09d7f50c.png",
    superviseTimes: 20,
    passRate: 97,
    authenticationArea: 100,
    coverArea: 85,
    list: [
      {
        id: 5,
        createTime: "2023-05-30 16:27:52",
        updateTime: "2023-05-30 16:27:52",
        landId: 3,
        type: "0",
        name: "摄像头",
        deviceId: "K31763603",
        lat: 0,
        lng: 0,
        videoUrl: "ezopen://ZJCNOS@open.ys7.com/K31763603/1.live",
        online: false,
        accessToken: "at.0uuirwg9dducsp563ra1mbng4bdegwtg-4ckewfuyw1-19rcg05-0kihekny4"
      },
      {
        id: 6,
        createTime: "2023-05-30 16:28:08",
        updateTime: "2023-05-30 16:28:08",
        landId: 3,
        type: "1",
        name: "气象传感器",
        deviceId: "861551056095532",
        lat: 0,
        lng: 0,
        videoUrl: null,
        online: false,
        accessToken: null
      }
    ],
    certificateList: [
      {
        id: 1,
        createTime: "2023-05-30 16:02:40",
        updateTime: "2023-05-30 16:02:40",
        landId: 3,
        name: "诚信企业",
        path: "uploadFiles/png/a82d5bf882b21e06d83c6feb7123cd6c.png"
      }
    ]
  },
  {
    id: 4,
    createTime: "2023-05-30 15:57:55",
    updateTime: "2023-05-30 16:45:58",
    name: "物联网监控4号",
    lat: 43.31868363907222,
    lng: 94.33376312255861,
    address: "新疆哈密地区阿勒泰工业园区富蕴县轻工业园区",
    introduce:
      "新疆阿勒泰玉龙奶业有限公司注册成立于2016年9月，注册资金800万元。公司现有职工26人，大专以上学历占员工总数的65%，研发人员占员工总数的17%，研发的冷冻干燥驴乳粉已申报国家知识产权局发明专利（一种低温灭菌设备冻干驴乳粉的方法，受理专利号：201610108465.8）。公司是一家由自然人投资的集饲草种植、奶驴养殖、乳制品生产加工、销售及研发为一体的驴产业的民营企业。公司在阿勒泰富蕴县轻工业园区建成占地面积18000余平方米的驴乳制品生产基地，已安装年产30吨冻干驴奶粉、年产30吨巴氏灭菌驴乳生产线各一条。计划总投资5500万元，一期工程完成投资2200万元。公司法人郜玉龙，早在2016年2月就在阿勒泰哈巴河县二区投资1299万创建了占地面积约94000平方米的哈密鑫源骞驴养殖专业合作社，是一家专业从事新疆驴的养殖、改良繁育，肉制品及鲜驴奶生产加工及销售的养殖合作社。在其占地上拟建成了九座标准化的养殖棚圈（每座1400平米），已建成四座.配套建设1500平米的储料库，800平米的精料库，300平米的标准化挤奶厅，合作社现存栏奶驴600余头，期间累计增加，3年后繁育量可达1300余头，肉制品年产量达30余吨，年产鲜奶量达到54吨左右。同年4月投资385万元在哈密市建成哈密鑫源骞驴养殖专业合作社鲜驴乳专营店，实现自产自销，满足市场需求，新疆阿勒泰玉龙奶业有限公司根据产品特点及企业发展需求，构建了公司+基地+合作社+农户+科研的企业模式，使企业步入绿色、生态、可持续发展的道路。",
    manageType: "驴肉、驴奶、驴奶粉",
    manager: "新疆阿勒泰玉龙奶业有限公司",
    pics: "uploadFiles/png/221c52671c7b784bac5c687929aa666e.png,uploadFiles/png/83a64db215e92e89db57fd94988bcfe4.png",
    superviseTimes: 76,
    passRate: 93,
    authenticationArea: 80,
    coverArea: 78,
    list: [
      {
        id: 7,
        createTime: "2023-05-30 16:28:36",
        updateTime: "2023-05-30 16:28:36",
        landId: 4,
        type: "0",
        name: "摄像头",
        deviceId: "K31763705",
        lat: 0,
        lng: 0,
        videoUrl: "ezopen://AZAVPS@open.ys7.com/K31763705/1.live",
        online: false,
        accessToken: "at.0uuirwg9dducsp563ra1mbng4bdegwtg-4ckewfuyw1-19rcg05-0kihekny4"
      },
      {
        id: 8,
        createTime: "2023-05-30 16:28:50",
        updateTime: "2023-05-30 16:28:50",
        landId: 4,
        type: "1",
        name: "气象传感器",
        deviceId: "861551056099211",
        lat: 0,
        lng: 0,
        videoUrl: null,
        online: false,
        accessToken: null
      }
    ],
    certificateList: []
  },
  {
    id: 5,
    createTime: "2023-05-30 15:59:06",
    updateTime: "2023-05-30 15:59:06",
    name: "物联网监控5号",

    lat: 43.32218051659263,
    lng: 94.28123474121095,
    address: "清河县",
    introduce: null,
    manageType: "三文鱼、鲟鱼",
    manager: null,
    pics: null,
    superviseTimes: 30,
    passRate: 92,
    authenticationArea: null,
    coverArea: null,
    list: [
      {
        id: 9,
        createTime: "2023-05-30 16:29:31",
        updateTime: "2023-05-30 16:29:31",
        landId: 5,
        type: "0",
        name: "摄像头1",
        deviceId: "L21760813",
        lat: 0,
        lng: 0,
        videoUrl: "ezopen://YW123456@open.ys7.com/L21760813/1.live",
        online: false,
        accessToken: "at.0uuirwg9dducsp563ra1mbng4bdegwtg-4ckewfuyw1-19rcg05-0kihekny4"
      },
      {
        id: 10,
        createTime: "2023-05-30 16:29:52",
        updateTime: "2023-05-30 16:29:52",
        landId: 5,
        type: "0",
        name: "摄像头2",
        deviceId: "L21760861",
        lat: 0,
        lng: 0,
        videoUrl: "ezopen://YW123456@open.ys7.com/L21760861/1.live",
        online: false,
        accessToken: "at.0uuirwg9dducsp563ra1mbng4bdegwtg-4ckewfuyw1-19rcg05-0kihekny4"
      }
    ],
    certificateList: []
  }
]);
const aredList = ref()

// 获取地块数据
const getlandinfo = async () => {
  const res = await getland({ "userId": null })
  console.log(res.data)
  res.data[0].lat = 43.299609268544
  res.data[0].lng = 94.386302151369
  res.data[1].lat = 43.282563487976105
  res.data[1].lng = 94.38356637954713
  aredList.value = res.data
  // 获取设备信息
  // for (let i = 0; i < res.data.length; i++) {
  //   const sbinfo = await getLandDeviceList({ "companyId": res.data[i].companyId, "landId": res.data[i].landId })
  //   console.log(sbinfo)
  //   // 绘制设备信息
  // }
}
// getlandinfo()

const map = ref(null)
const flytomap = function (e) {
  map.value.flyto(e.currentTarget.dataset.lat, e.currentTarget.dataset.lng)
}

const cqlwms = function (e) {
  map.value.showorhidemarkers(e.currentTarget.dataset.cql)
}




const location = (place) => {
  let { list } = place;
  lat.value = place.lat;
  lng.value = place.lng;

  list.forEach(async (v) => {
    if (v.type == "1") {
      v.children = [
        {
          id: 54842,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "大气温度",
          value: "29.9",
          unit: "℃",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "101"
        },
        {
          id: 54843,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "大气湿度",
          value: "24.2",
          unit: "%RH",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "102"
        },
        {
          id: 54844,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "土壤温度",
          value: "29.3",
          unit: "℃",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "106"
        },
        {
          id: 54845,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "土壤湿度",
          value: "10.3",
          unit: "%RH",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "107"
        },
        {
          id: 54846,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "风速",
          value: "1.3",
          unit: "m/s",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "108"
        },
        {
          id: 54847,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "风向",
          value: "127",
          unit: "°",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "109"
        },
        {
          id: 54848,
          createTime: "2023-08-05 23:42:02",
          updateTime: "2023-08-05 23:42:02",
          stationId: "861551056095136",
          name: "照度",
          value: "0",
          unit: "LUX",
          reportTime: "1691250122252",
          reportDay: "2023-08-05",
          monitorTime: "2023-08-05 23:42:16",
          sensorType: "112"
        }
      ];
    } else {
      v.children = [];
    }
  });
  deviceList = list;
};
</script>
<style lang="scss" scoped>
.business-entity {
  background: url("../../../public/img/bargraph-panel.png") no-repeat center center;
  background-size: 100% 100%;
  margin-top: vh(120);
}

.entity-item {
  height: 4vh;
  line-height: 4vh;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #aefff0;

  >span {
    display: flex;

    >img {
      margin: 0 0.625rem;
    }
  }
}

.entity-item:hover {
  border-bottom: 2px solid #aefff0;
}




.selectcun {
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 20px;
  width: vw(280);
}

.culist {
  width: 100%;
  padding-top: 20px;
}

.cunitem {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  // border: 1px solid #e5e5e5;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #61d2d87d;
  cursor: pointer;
  color: #fff;
  margin-bottom: 20px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
}

.cunitem:hover {
  border: none;
  background-color: #00fbff7d;
}

.left-panel {
  // width: calc(100vw * 496 / 1920);
  height: calc(100vh * 939 / 1080);
  position: absolute;
  top: calc(100vh * 117 / 1080);
  left: calc(100vw * 24 / 1920);
  display: flex;
  color: #fff;
}

.right-panel {
  width: calc(100vw * 496 / 1920);
  height: calc(100vh * 939 / 1080);
  position: absolute;
  top: calc(100vh * 117 / 1080);
  right: calc(100vw * 24 / 1920);
  display: flex;
  color: #fff;
}
.cqlbox {
  background: rgba(26, 59, 61, 0.6);
  border-radius: 6px;
  padding: 10px 20px;
  padding-right: 10px;
  z-index: 9999;
  box-sizing: border-box;
  position: fixed;
  bottom: 28px;
  left: vw(330);
  width: vw(160);
  color: #fff;
}

.cqlitem {
  cursor: pointer;
  margin-bottom: 4px;
}

.cqlcolor {
  width: vw(16);
  height: vw(16);
  border-radius: 4px;
  margin-right: 10px;

}
</style>
