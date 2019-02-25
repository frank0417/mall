
<template>
<div class="index z_index">
  <!-- <Loadmore
    @reachBottom="reach"
    :limit = "20"
    :showMore ="showMore"
    :loadState="productPageQuery.loadState"
    class="z_index"
    
  > -->
   <!-- <my-scroll ref="myScroll" :on-refresh="onRefresh" :get-scroll-top="getTopF" :scroll-state="scrollState"> -->

    <scroller :on-refresh="onRefresh" :on-infinite="loadMoreData" ref="my_scroller" class="my-scroller">
        <!-- sdsfsdfsd -->
		<!-- <div slot="scrollList"> -->
            <p class="testImg"></p>
            <header class="header" ref="refreshT">
                <div class="header_wrap">
                    <a class="red_packet" :class="redPacketData && redPacketData.active?'ballon':''"
                        v-clipboard:copy="redPacketData.code"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                        @click="url=redPacketData.url"
                    ></a>
                    <a class="header_header"></a>
                    <div class="clock" @click="hideMask = true"></div>
                </div>
            </header>
      
        <article class="swiperWarp">
            <swiper :options="swiperOption_0">
                <swiperSlide v-for="(item, key) in swiperList" :key="key">
                    <img :src="item.thumbnail" alt=""  @click="swiperJump(item.url)" style="width: 100%;height: 100%;">
                </swiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
       </article>
       <!-- 爆款排行 -->
       <article class="hot_sall">
            <aside class="nav_hot_sall flex">
                <aside class="nav_left nav_margin_left"></aside>
                <aside class="nav_middle"></aside>
                <aside class="nav_left nav_margin_right"></aside>
            </aside>
        <aside class="hot_sall_main">
            <aside class="left"
                v-clipboard:copy="top1.code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                @click="url=top1.url"
            >
                <div class="hot_sall_top1">
                    <article class="top1">{{top1.name?top1.name:''}}</article>
                    <article class="capacity">{{top1.caption}}</article>
                    <div class="rush_buy">立即抢购</div>
                    <article class="coupon" v-if="top1.price !=0"><span>券后</span> <span>¥ {{top1.price }}</span></article>
                    <article class="oprice" v-if="top1.marketPrice !=0"><span>原价</span> <span>¥ {{top1.marketPrice}}</span></article>
                </div>
                <figure>
                    <img :src="top1.thumbnail_temp" alt="" class="top1_img">
                </figure>
          </aside>
          <aside class="right">
            <aside class="top2 common"
                v-clipboard:copy="top2.code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                @click="url=top2.url"
                >
                <aside class="top2_left">
                    <article class="top1">{{top2.name?top2.name:''}}</article>
                    <article class="capacity">{{top2.caption}}</article>
                    <article class="coupon" v-if="top2.price !=0"><span>券后</span> <span>¥ {{top2.price }}</span>
                        <span class="oprice" v-if="top2.marketPrice !=0"> &nbsp;&nbsp;<span>原价</span> <span>¥ {{top2.marketPrice}}</span></span>
                    </article>
                    <div class="rush_buy" style="margin: 0.1rem 0">立即抢购</div>
                </aside>
                <figure class="top2_right">
                    <img :src="top2.thumbnail_temp" alt="" class="top2_img">
                </figure>
            </aside>
            <aside class="top3 common"
                v-clipboard:copy="top3.code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                @click="url=top3.url"
                >
                <aside class="top2_left">
                  <article class="top1" style="margin-top:0.12rem">{{top3.name?top3.name:''}}</article>
                  <article class="capacity" style="margin-top:0rem">{{top3.caption}}</article>
                  <article class="coupon" style="margin-top:0.04rem" v-if="top3.price !=0"><span>券后</span> <span>¥ {{top3.price }}</span>
                    <span class="oprice" v-if="top3.marketPrice !=0"> &nbsp;&nbsp;<span>原价</span> <span>¥ {{top3.marketPrice}}</span></span>
                  </article>
                  <div class="rush_buy" style="margin:0.06rem 0 0.1rem">立即抢购</div>
                </aside>
                <figure class="top2_right">
                    <img :src="top3.thumbnail_temp" alt="" class="top2_img">
                </figure>
            </aside>
          </aside>
        </aside>
       </article>

       <aside class="nav_hot_grab">
          <aside class="hot_grab_left">
            <img src="../../static/image/rounded_rectangle.png" alt="">
            <span>大家都在抢</span>
          </aside>
          <aside class="hot_grab_right">
              <span>{{count}}</span><span>次实时领券</span>
          </aside>
      </aside>
       <!-- 大家都在抢 -->
       <article class="recommed">
            <aside class="nav nav_recommend"></aside>
            <Recommend
                @copy="copy2"
                v-for="(item,index) in productPageData"
                :key="index"
                :url="item.url"
                :code="item.code"
                :data-clipboard-text="item.code"
                :img="item.thumbnail_temp"
                :title="item.name"
                :marketPrice="item.marketPrice"
                :price="item.price"
                :state="item.state"
                :marketable="item.marketable"
                :startTime="item.startTime"
                :endTime="item.endTime"
                :sale="item.sales"
            ></Recommend>
       </article>
</scroller>
		<!-- </my-scroll> -->
  <!-- </Loadmore> -->
  <article class="mask" v-show="hideMask" @click="hideMask = false">
      <article  class="message"  @click.stop="">
          <Loadmore
            @reachBottom="reachMessage"
            :limit = "20"
            :loadState="messageQuery.loadState"
          >
          <article>
            <div v-for="item in messageData" :key="item.id" class="message_info">
              <aside class="message_icon">
                <img src="../assets/image/money.png" alt="">
              </aside>
              <aside class="message_wrap">
                <article class="message_title">系统消息</article>
                <article class="message_contain">{{item.content}}</article>
                <article class="message_time">{{item.createDate | filterDate}}</article>
              </aside>
            </div>
          </article>
        </Loadmore>
      </article>
    </article>
    <!-- 首次下载领福利 -->
    <article class="mask" v-show="hideMaskRed">
      <article class="first_red_wrap">
        <img src="../../static/image/first_red_rokect.png" alt="" class="first_red" 
        v-clipboard:copy="new_red_code"
        v-clipboard:error="onError"
        @click="newRead"
        >
        <img src="../../static/image/close.png" alt="" class="first_close" @click="hideMaskRed = false">
      </article>
    </article>
</div>
</template>

<script>
import {
  swiperFunc,
  redPacket,
  message,
  getTop,
  productPage,
  newRedEnvelope
} from "../api/index";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Recommend from "./recommend";
import Loadmore from "./loadeMore";
import myScroll from "./vue-scroll";
import { setTimeout } from 'timers';
// import { setTimeout } from "timers";

export default {
  name: "Index",
  components: {
    swiper,
    swiperSlide,
    Recommend,
    Loadmore,
    myScroll
  },
  data() {
    return {
      isFirst:true,
      totalNum: 0,
      showMore: false,
      swiperOption_0: {
        loop: true,
        autoplay: 3000,
        speed: 800,
        pagination: ".swiper-pagination"
      },
      scrollState: true, //是否可以滑动
      indexScrollTop: 0,
      listdata: [],
      listParams: {
        p: 0
      },
      url: "", // 跳转的路径
      swiperList: [],
      redPacketData: {},
      messageData: [],
      productPageData: [],
      topList: [],
      top1: {},
      top2: {},
      top3: {},
      count: 197938,
      type: "",
      options: {
        currentPage: 0,
        autoplay: 3500,
        loop: true
      }, // swiper参数
      hideMask: false,
      copy: "",
      productPageQuery: {
        pageNum: 1,
        pageSize: 10,
        loading: false, //上拉加载
        totalPage: 1,
        loadState: 0 // 上拉加载
      }, // 主播推荐
      messageQuery: {
        pageNum: 1,
        pageSize: 10,
        loading: false,
        totalPage: 1,
        loadState: 0
      },
      hideMaskRed: false, // 首次领红包
      new_red_code: "",
      new_red_url: ""
    };
  },
  filters: {
    filterDate(val) {
      let m = val.split("-")[1],
        d = val.split("-")[2].substring(0, 2);
      let month = parseInt(m),
        day = parseInt(d);
      return month + "月" + day + "日";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    
  },
  created() {
    let myToken =
      this.$route.query && this.$route.query.token
        ? this.$route.query.token
        : "";
    localStorage.setItem("myToken", myToken);
    this.getSwiper();
    this.getRedPacket();
    this.getMessage();
    this.getTopProduct();
    this.getFirstData(1,10);
    this.getNewRedEnvelope();
    this.count = 1609812 + Math.round(Math.random() * (200 - 10) + 10);
    setInterval(() => {
      let max = 10;
      let min = 3;
      this.count = this.count + Math.round(Math.random() * (max - min) + min);
    }, 1000);
    setInterval(() => {
      this.getRedPacket();
      this.getMessage();
      this.getTopProduct();
      this.refreshProductPage();
    }, 10000);
    setInterval(() => {
      this.getSwiper();
    }, 600000);
  },

  methods: {
    loadMoreData(done) {
      
      if(this.isFirst){
          done();
      }else if(this.totalNum > this.productPageData.length){
        this.getProductPage(
            this.productPageQuery.pageNum + 1,
            this.productPageQuery.pageSize,
            done
        );
      }else{
          done(true)
      }
    },

    handleScroll() {
      let topTemp = this.$refs.myScroll;
    },
    /**
     * 下拉刷新
     */
    onRefresh(done) {
      this.listParams.p = 1;
      this.getRedPacket();
      this.getMessage();
      this.getTopProduct();
      this.getProductPage(
        this.productPageQuery.pageNum,
        this.productPageQuery.pageSize,
        done
      );
      setTimeout(() => {
          done()
      }, 3000);
    },
    getTopF(y) {
      //滚动条位置
      this.indexScrollTop = y;
    },
    newRead() {
      this.url = this.new_red_url;
      this.hideMaskRed = false;
      this.onCopy();
    },
    copy2(i) {
      this.url = i;
      this.onCopy();
    },
    onCopy: function(e) {
      window.location.href = this.url;
      console.log(e);
    },
    onError: function(e) {
      console.log("复制失败！");
    },

    reach() {
      if (this.productPageQuery.loading) {
        return;
      } else {
        this.productPageQuery.loading = true;
        this.showMore = true;
        if (this.totalNum > this.productPageData.length) {
          this.getProductPage(
            this.productPageQuery.pageNum + 1,
            this.productPageQuery.pageSize
          );
          return;
        } else {
          this.productPageQuery.loadState = 1;
        }
      }
    },
    reachMessage() {
      if (this.messageQuery.loading) {
        return;
      } else {
        this.messageQuery.loading = true;
        if (this.messageQuery.pageNum > this.messageQuery.totalPage) {
          this.messageQuery.loadState = 1;
          return;
        }
        this.getMessage(this.messageQuery.pageNum, this.messageQuery.pageSize);
      }
    },
    // 新人红包
    getNewRedEnvelope() {
      newRedEnvelope().then(res => {
        if (res.code == 200) {
          if (res.data && res.data.code) {
            this.hideMaskRed = true;
            this.new_red_code = res.data.code;
            this.new_red_url = res.data.url;
          }
        }
      });
    },

    refreshProductPage() {
      let that = this,
        pageNum = 1,
        pageSize = 10 * this.productPageQuery.pageNum,
        parames = { pageNum, pageSize };

      productPage(parames).then(res => {
        if (res.code == 200) {
          that.productPageQuery.totalPage = res.data.totalPage;
          that.productPageData = res.data.list;
          if(res.data.totalRow > that.totalNum){
              setTimeout(()=>{
                  that.$refs.my_scroller.finishInfinite(false);
              })
          }
        }
      });
    },

    getFirstData(pageNum,pageSize){
        let self = this,
        parames = { pageNum, pageSize };
        productPage(parames).then((res)=>{
            self.isFirst = false;
            if(res.code === 200){
                self.productPageData = res.data.list;
                self.productPageQuery.totalPage = res.data.totalPage;
                self.productPageQuery.pageNum = res.data.pageNumber;
                self.totalNum = res.data.totalRow;
            }
        })
    },
    // 抢购商品
    getProductPage(pageNum=1, pageSize=10,done) {
      let that = this,
        parames = { pageNum, pageSize };
      productPage(parames).then(res => {
        if (res.code == 200) {
          that.totalNum = res.data.totalRow;
          if (pageNum == 1) {
            that.productPageData = res.data.list;
            that.productPageQuery.totalPage = res.data.totalPage;

            // if (res.data.totalPage == 1) {
            //   this.productPageQuery.loadState = 1;
            // }
          } else {
            that.productPageData = [].concat(
              that.productPageData,
              res.data.list
            );

          }
          if(that.totalNum > that.productPageData.length){
              done(true)
          }else{
              setTimeout(()=>{
                //    that.$refs.my_scroller.finishInfinite(0);
                  done(false)
                  that.$refs.my_scroller.resize()
              },1500)
          }
          that.productPageQuery.pageNum = res.data.pageNumber;
          that.productPageQuery.loading = false;

        }
      });
    },
    getTopProduct() {
      getTop().then(res => {
        if (res.code == 200) {
          this.top1 = res.data.list[0];
          this.top2 = res.data.list[1];
          this.top3 = res.data.list[2];
        }
      });
    },
    getMessage() {
      let that = this;
      message({
        pageNum: this.messageQuery.pageNum,
        pageSize: this.messageQuery.pageSize
      }).then(res => {
        if (res.code == 200) {
          if (that.messageQuery.pageNum == 1) {
            that.messageData = res.data.list;
            that.messageQuery.totalPage = res.data.totalPage;
            if (res.data.totalPage == 1) {
              this.messageQuery.loadState = 1;
            }
          } else {
            that.messageData = [].concat(that.messageData, res.data.list);
          }
          that.messageQuery.pageNum += 1;
          that.messageQuery.loading = false;
        }
      });
    },
    getRedPacket() {
      redPacket().then(res => {
        if (res.code == 200) {
          this.redPacketData = res.data;
        }
      });
    },
    getSwiper() {
      swiperFunc().then(res => {
        if (res.code == 200) {
          this.swiperList = res.data.list;
        }
      });
    },
    swiperJump(url) {
      url ? (window.location.href = url) : "";
    }
  }
};
</script>


<style>
  .my-scroller .pull-to-refresh-layer .spinner-holder
  {
    visibility: hidden;
  }
  .my-scroller .pull-to-refresh-layer {
    background: url('../../static/image/Load.gif');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40px 40px;
    height: 40px;
    opacity: 0;
    -webkit-transform: scale(1);
    transform: scale(1);

    transition: all .15s linear;
    -webkit-transition: all .15s linear;
  }
    .my-scroller .pull-to-refresh-layer.active {
    -webkit-transform: scale(1.35);
    transform: scale(1.35);
    opacity: 1;
  }
.swiperWarp {
  position: relative;
}
.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 0.3s;
  transform: translateZ(0);
  z-index: 10;
  bottom: 20px;
}
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #ffffff;
  opacity: 0.6;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}
.swiper-pagination-bullet-active {
  background: #e01212;
  opacity: 0.8 !important;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -ms-flexbox;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.swiper-container-horizontal > * > .slider-pagination-bullet {
  background: #fff none repeat scroll 0 0 !important;
  opacity: 0.6 !important;
}
.swiper-container-horizontal .slider-pagination-bullet-active {
  background: #e01212 none repeat scroll 0 0 !important;
}
</style>
<style scoped>
.z_index {
  background-color: #fff;
  min-height: 100vh;
}
.first_red {
  width: 70%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.first_close {
  position: absolute;
  left: 50%;
  top: 78%;
  transform: translateX(-50%);
  width: 0.6rem;
  height: 0.6rem;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  box-sizing: border-box;
  height: 6.5rem;
  max-height: 6.5rem;
  width: 73%;
  border-radius: 0.2rem;
  background-color: #f7f7f7;
  z-index: 100;
  padding: 0.15rem 0.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.message_info {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 0.2rem;
  margin: 0.15rem;
  position: relative;
  height: 1.5rem;
}
.message_icon {
  height: 1rem;
  width: 1rem;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
}
.message_icon img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.message_wrap .message_title {
  color: #333333;
  font-size: 0.32rem;
  position: absolute;
  top: 0.4rem;
  left: 1.47rem;
}
.message_wrap .message_contain {
  color: #999999;
  font-size: 0.24rem;
  position: absolute;
  left: 1.47rem;
  top: 0.9rem;
  width: 3.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.message_wrap .message_time {
  color: #cccccc;
  font-size: 0.22rem;
  position: absolute;
  top: 0.3rem;
  right: 0.2rem;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.5s;
  z-index: 99;
}
.top2_right {
  position: relative;
  margin-right: 0.15rem;
}
.header {
  width: 100%;
  box-sizing: border-box;
  height: 0.88rem;
  background: url("../assets/image/header_bac.png") no-repeat;
  background-size: 100% 0.9rem;
  position: relative;
}
.header_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 0.2rem;
}
.header .red_packet {
  width: 0.45rem;
  height: 0.46rem;
  background: url("../assets/image/hongbao.png") no-repeat center/contain;
}
.header_header {
  width: 2.58rem;
  height: 0.62rem;
  background: url("../assets/image/logo.png") no-repeat center/contain;
}
.clock {
  width: 0.61rem;
  height: 0.54rem;
  background: url("../assets/image/xitongxiaoxi.png") no-repeat center/contain;
}

/* 爆款排行 */
.hot_sall {
  box-sizing: border-box;
  width: 100%;
  padding: 0.05rem 0.2rem 0 0.2rem;
}
.nav_hot_sall {
  height: 0.9rem;
}
.nav_left {
  width: 0.88rem;
  height: 0.03rem;
}
.nav_margin_left {
  background: url("../assets/image/baokuan_left.png") no-repeat center/contain;
}
.nav_margin_right {
  background: url("../assets/image/baokuan_right.png") no-repeat center/contain;
}
.nav_middle {
  width: 3.19rem;
  height: 0.44rem;
  background: url("../assets/image/baokuan.png") no-repeat center/contain;
  margin: 0 0.45rem;
}
.hot_sall_main {
  width: 7.1rem;
  display: flex;
  justify-content: space-between;
}
.hot_sall_main .left {
  width: 2.8rem;
  height: 3.92rem;
  background-color: #fff3f5;
  overflow: hidden;
}
.hot_sall_top1 {
  font-family: MicrosoftYaHei;
  margin-left: 0.25rem;
}
.top1 {
  color: #e01212;
  font: 0.38rem MicrosoftYaHei;
  margin-top: 0.14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 2.59rem;
}
.capacity {
  color: #8e9198;
  font: 0.26rem MicrosoftYaHei;
  margin-top: 0.12rem;
  max-width: 2.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rush_buy {
  margin-top: 0.1rem;
  width: 1.27rem;
  min-width: 68px;
  height: 0.32rem;
  min-height: 15px;
  background-color: transparent;
  background: url("../assets/image/lijigoumaim.png") no-repeat;
  background-size: 100% 100%;
  font: 0.18rem MicrosoftYaHei;
  line-height: 0.32rem;
  color: #ffffff;
  box-sizing: border-box;
  padding-left: 0.09rem;
  text-align: left;
}
.coupon {
  margin-top: 0.04rem;
  color: #ff4d4f;
  font-size: 0.24rem;
}
.oprice {
  margin-top: 0.04rem;
  color: #cccccc;
  font-size: 0.24rem;
}
.top1_img {
  width: 2.62rem;
  height: 1.52rem;
  margin-left: 0.1rem;
  margin-top: 0.1rem;
}
.hot_sall_main .right {
  width: 4.1rem;
  height: 3.92rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right .common {
  width: 100%;
  box-sizing: border-box;
  padding-right: 0.1rem;
  background-color: #f6f6ff;
  display: flex;
  justify-content: space-around;
}
.right .top2 {
  height: 1.94rem;
}
.top2_img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 0.77rem;
  max-height: 1.48rem;
}
.right .top3 {
  height: 1.78rem;
}
/* 主播推荐 */
.nav_hot_grab {
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.hot_grab_left {
  display: flex;
  align-items: center;
  margin: 0 0.2rem;
}

.hot_grab_left img {
  width: 0.08rem;
  height: 0.4rem;
  margin-right: 0.2rem;
}
.hot_grab_left span {
  color: #333333;
  font-size: 0.36rem;
}
.hot_grab_right {
  color: #e01212;
  font-size: 0.3rem;
  margin-right: 0.2rem;
}
.hot_grab_right span:last-of-type {
  color: #666666;
}
.recommed {
  box-sizing: border-box;
  width: 100%;
  padding: 0.33rem 0.2rem 0 0.2rem;
}
.nav_recommend {
  background: url("../assets/image/zhubo.png") no-repeat center/contain;
}

@keyframes scaleDraw {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.5);
  }
}
.ballon {
  width: 150px;
  height: 200px;
  animation-name: scaleDraw;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}
.spinner-holder span{
display: none!important;
}
</style>
