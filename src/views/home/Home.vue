<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--要想监听组件的点击,需要加上@click.native
    html标签可以直接监听点击事件，直接写@click即可
    -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //子组件
  import HomeSwiper from './childrenComponents/HomeSwiper'
  import RecommendView from './childrenComponents/RecommendView'
  import FeatureView from './childrenComponents/FeatureView'

  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  //方法中的数据
  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils.js'

    export default {
        name: "Home",
        components: {
          HomeSwiper,
          RecommendView,
          FeatureView,
          NavBar,
          TabControl,
          GoodsList,
          Scroll,
          BackTop
        },
      data(){
          return {
            //这里用来保存请求过来的数据
            banners:[],
            recommends:[],
            goods:{
              'pop':{page: 0,list:[]},
              'new':{page: 0,list:[]},
              'sell':{page: 0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            //item-control完成吸顶效果需要使用tabOffsetTop属性 初始值设置为0
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY:0
          }
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      // activated() {
      //  this.$refs.scroll.scrollTo(0,this.saveY,0.1);
      //   this.$refs.scroll.refresh();
      // },
      // deactivated(){
      //   this.saveY=this.$refs.scroll.getScrollY();
      // },
      created(){
          //什么时候发送getHomeMultidata的网络请求，组件创建好就可以发送
        // 实现一个生命周期函数
          //1.请求多个数据
        this.getHomeMultidata();
        //2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
      },
      mounted(){
        //1.图片加载完的事件监听
        //监听item中图片加载完成
        //下面这句话的意思就是将refresh函数出阿奴到debounce中，延迟时间为500ms
       const refresh = debounce(this.$refs.scroll.refresh,500);
        this.$bus.$on('itemImageLoad',()=>{
          //console.log('------');
          //如果直接执行refresh，会执行30次，为了防止下面的函数调用很多次
          //可以将refresh传入到debounce函数中，生成一个新的函数
          refresh();
        })


      },
      methods:{
        /**
         * 事件监听相关的方法
         */
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop';
              break;
              case 1:
                this.currentType='new';
               break;
                case 2:
                  this.currentType='sell';
                  break;
          }
          this.$refs.tabControl1.currentIndex=index;
          this.$refs.tabControl2.currentIndex=index;
        },
        backClick(){
          //注意这里是拿到scroll组件的scroll属性，监听事件点击，当鼠标点击时，返回到顶部，scrollTop(参数1,参数2,参数3)第一个参数和第二个参数是返回的位置，0,0表示返回到顶部，第三个参数是延迟时间，如果不设置将直接返回到顶部，如果设置延迟时间，会缓慢返回到顶部，有个过渡
          this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
          // console.log(position);
          //1.判断BackTop是否显示
          this.isShowBackTop = Math.abs(position.y) > 1000;
          //2.判断tabControl是否吸顶(position:fixed)
          this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
        },
        loadMore(){
          //console.log('底部加载更多');
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
          //2.获取tabControl的offsetTop
          //所有组件都有一个属性$el,这个属性用来获取组件中的元素
         // console.log(this.$refs.tabControl.$el.offsetTop);
          this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
        },
          /**
           * 网络请求相关的方法
           */
          getHomeMultidata(){
            getHomeMultidata().then(res=>{
              //res拿到请求到的结果
              // this.result = res;
              this.banners=res.data.banner.list;
              this.recommends=res.data.recommend.list;
            });
          },
        getHomeGoods(type){
          //动态获取页码
          const page = this.goods[type].page+1;
          getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page+=1;
            //完成上拉加载更多
            this.$refs.scroll.finishPullUp()
          })
        }
      }
    }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
 .home-nav {
   background-color: var(--color-tint);
   color: #fff;
   /*在使用浏览器原生滚动时，为了让导航不跟着一起滚动*/
   /*position: fixed;*/
   /*top: 0;*/
   /*left: 0;*/
   /*right: 0;*/
   /*z-index: 1;*/
 }
  .content {
    /*height: calc(100% - 93px);*/
   overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
.tab-control {
  position: relative;
  z-index:1;
}
</style>
