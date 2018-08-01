const merge=require("webpack-merge");
const common=require("./webpack.common.js");
const webpack=require("webpack");
const htmlWebpackPlugin=require("html-webpack-plugin");

module.exports=merge(common,{
    devtool:"#@cheap-module-eval-source-map",
    devServer:{
        contentBase:'./dist',
        port:8080,
        inline:true,
        historyApiFallback:true,//在开发单页面时非常有用，当设置为true时，所有的跳转将指向index.html
        open:true,
        hot:true
    },
    mode:"development",
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
               // loader:'style-loader!css-loader!sass-loader'
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"sass-loader"},
                    {
                        loader:"postcss-loader",
                        options:{
                            plugins:[require("autoprefixer")]//自动添加前缀
                        }
                    }
                ]
            }
        ]
    },
   
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//热加载插件
    ]
})
