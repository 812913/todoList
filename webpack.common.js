const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");

module.exports={
    //单入口
    // entry:"./src/index.jsx",
    entry:"./src/index.jsx",
    output:{
        filename:'[name].[hash:4].bundle.js',//用于输出文件的文件名
        path:path.resolve(__dirname,'dist'),//输出目录，绝对路径
        chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',//将ES6转为ES5供浏览器使用
                    options:{
                        presets:['es2015','env','react','stage-0'],
                        plugins:['transform-runtime','transform-decorators-legacy']
                    }
                    
                }
            } 
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:__dirname+"/src/index.tmpl.html"
        }),
       
    ]
}