<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--tab-bar-item是小插槽 这里创建两个 一个用来存放图片 一个用来存放文字-->
    <div v-if="!isActive"><slot name="tab-icon"></slot></div>
    <div v-else><slot name="tab-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="tab-text"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
      props:{
        path:String,
        activeColor:{
          type: String,
          default: 'red'
        }
      },
      data(){
          return {
            //isActive:true,
          }
      },
      computed:{
         isActive(){
           //this.$route判断当前哪个属于活跃状态  indexOf判断是否是当前路径 如果不等于-1 就拿到了当前活跃的路由  显示出来
           return this.$route.path.indexOf(this.path) !== -1
         },
        activeStyle(){
           return this.isActive ? {color:this.activeColor} : {}
        }
      },
      methods:{
          itemClick(){
            this.$router.replace(this.path)
          }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  /*.active {
    color: red;
  }*/


</style>
