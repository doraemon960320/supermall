<template>
  <div id="tab-bar">
    <!--在大组件里面创建一个大插槽-->
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    height: 49px;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -3px 10px rgba(1,1,1,0.2);
  }

</style>
