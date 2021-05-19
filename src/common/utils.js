//防抖
export function debounce(func,delay){
  //debounce起到防抖动的作用
  //debounce(参数1,参数2)  参数1是一个函数，参数2是一个延迟时间
  let timer = null;
  return function(...args){
    if(timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      //执行函数
      func.apply(this,args)
    },delay)
  }
}

//日期格式化
export function formatDate(date,fmt){
  //1.获取年份
  //y+的意思取1个或多个y
  //y*表示取0个或多个y
  //y?表示0个或1个y
  /*
  以2019年为例
  y: 一个y表示只取9
  yy: 两个y表示取后两位 19
  yyy: 019
  yyyy: 2019
   */
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
    //2.M+是正则表达式中的一个规则
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k]+'';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1) ? str: padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str){
  return ('00'+str).substr(str.length);
}
