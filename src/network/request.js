import axios from 'axios'
//第四种方法
export function request(config) {

//1.创建axios实例  最好不要使用全局实例
    const instance = axios.create({
     baseURL:'http://123.127.200:8080',
      timeout: 5000
    })
  //2.axios的拦截器  因为要拦截上面的instance 所以这里写的是instance
  //2.1 请求拦截的作用
  instance.interceptors.request.use(config=>{
   // console.log(config);
    //请求拦截在这里会做什么事情呢？
    //1.比如config中的一些内容不符合服务器的要求
    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3.某些网络请求（比如登录(token)），必须携带一些特殊的信息
    //拦截之后一定要返回  否则内部发送数据的时候拿不到数据  就请求失败  打印err
    return config;
  },err=>{
    //console.log(err);
  })
  //2.2 响应拦截
  instance.interceptors.response.use(res=>{
    //console.log(res);
    //拦截之后直接返回data即可，因为data是有用的数据
    return res.data;
  },err=>{
    console.log(err);
  })
    //3.发送真正的网络请求
   return instance(config)
}
