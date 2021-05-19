<template>
  <div id="app">
<!--让Home不随意销毁，添加keep-alive-->
<!--注意：这里要消除Detail的keep-alive,因为Detail每次都要刷新图片-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/mainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
 @import 'assets/css/base.css';
</style>
