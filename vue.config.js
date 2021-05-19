module.exports= {
    configureWebpack:{
        //配置路径相关的在resolve里面
        resolve:{
            //别名的配置在alias里面
            alias:{
                //注意:@相当于src
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
}