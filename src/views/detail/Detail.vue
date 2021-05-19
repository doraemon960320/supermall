<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
     <scroll class="content" ref="scroll">
       <detail-swiper :top-images="topImages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"></detail-shop-info>
       <detail-goods-info :detail-info="detailInfo"
       @imageLoad="imageLoad"></detail-goods-info>
       <detail-params-info :param-info="paramInfo"></detail-params-info>
       <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
       <goods-list :goods="recommends"></goods-list>
     </scroll>
      <h2>详情页:{{iid}}</h2>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamsInfo from "./childComps/DetailParamsInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from "components/content/goods/GoodsList";

    import {getDetail,getRecommend,Goods,Shop,GoodsParams} from 'network/detail'
    export default {
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamsInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList
      },
      data(){
          return {
            iid: null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[]
          }
      },
      created(){
        //1.保存传入的iid
        this.iid=this.$route.params.iid;
        //2.根据iid请求详情页数据
        getDetail(this.iid).then(res=>{
          console.log(res);
          const data=res.result;
          //1.获取顶部轮播数据
          this.topImages=data.itemInfo.topImages;
          //2.获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
          //3.创建店铺信息的对象
          this.shop=new Shop(data.shopInfo);
          //4.保存商品详情数据
          this.detailInfo = data.detailInfo;
          //5.获取参数信息
          this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule);
          //6.获取评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo=data.rate.list[0];
          }
        });
        //3.请求推荐数据
        getRecommend().then(res=>{
         this.recommends=res.data.list;
        })
      },
      methods:{
        imageLoad(){
          this.$refs.scroll.refresh()
        }
      }
    }
</script>

<style scoped>
#detail {
  position:relative;
  z-index:1;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 1;
  background-color: #fff;
}
  .content {
    height: calc(100% - 44px);
  }
</style>
