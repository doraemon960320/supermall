<template>
  <tab-bar>
    <!--tab-bar-item是小组件，里面插入4个内容显示-->
    <tab-bar-item path="/home">
      <!--因为4个内容是不同的，所以这里分开来写，写入小组件中-->
      <img slot="tab-icon" src="~assets/img/tabbar/home-active.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/home.png" alt="">
      <div slot="tab-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/menu" activeColor="red">
      <img slot="tab-icon" src="~assets/img/tabbar/menu-active.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/menu.png" alt="">
      <div slot="tab-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="red">
      <img slot="tab-icon" src="~assets/img/tabbar/shop_car.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/shop-car-active.png" alt="">
      <div slot="tab-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile" activeColor="red">
      <img slot="tab-icon" src="~assets/img/tabbar/profile.png" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabbar/profile-active.png" alt="">
      <div slot="tab-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  /*引入TabBar*/
  import TabBar from "../../common/tabbar/TabBar"
  import TabBarItem from "../../common/tabbar/TabBarItem"
    export default {
        name: "mainTabBar",
      components:{
        /*只要引入了组件，就要在这里注册组件*/
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
