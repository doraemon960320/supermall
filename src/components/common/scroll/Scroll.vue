<template>
  <div class="wrapper" ref="aaa">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      props:{
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      data(){
        return {
          scroll: null
        }
      },
      mounted(){
        //1.创建BScroll对象
        this.scroll=new BScroll(this.$refs.aaa,{
          probeType: this.probeType,
          //显示上拉加载更多将pullUoLoad设置为true
          pullUpLoad:this.pullUpLoad,
          click:true,
        })
        //2.监听滚动的位置 当probeType为2或probeType为3时，才会监听滚动的位置
        //当probeType为其他值时，不需要监听
        if(this.probeType === 2|| this.probeType === 3){
          this.scroll.on('scroll',(position)=>{
            //  console.log(position);
            //$emit是子传父
            //通过自定义事件，将其传给父组件
            this.$emit('scroll',position)
          })
        }
        //3.监听Scroll滚动到底部
        if(this.pullUpLoad){
          //pullUpLoad条件为真时，监听滚动到底部
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
          })
        }
      },
    methods:{
        scrollTo(x,y,time=300){
          //当所有的都有值之后，再执行最后一项
         this.scroll && this.scroll.scrollTo(0,0,500)
        },
        refresh(){
          // console.log('-----');
          this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
      },
      // getScrollY(){
      //     return this.scroll ? this.scroll.y : 0;
      // }
    }
  }
</script>

<style scoped>

</style>
