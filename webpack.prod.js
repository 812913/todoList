const webpack=require("webpack");
const common=require("./webpack.common.js");
const merge=require("webpack-merge");
const miniCssExtractPlugin=require("mini-css-extract-plugin");
const cleanWebpackPlugin=require("clean-webpack-plugin");

module.exports=merge(common,{
    devtool:"#@cheap-module-source-map",
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {loader:miniCssExtractPlugin.loader},
                    {loader:"css-loader"},
                    {loader:"sass-loader"},
                    {
                        loader:"postcss-loader",
                        options:{
                            plugins:[require("autoprefixer")]//自动添加前缀
                        }
                    }
                ]
            },
        ]
    },
    
     

    plugins:[
        // new webpack.DefinePlugin({//指定环境
        //     'process.env.NODE_ENV':JSON.stringify('production')
        // }),
        new webpack.BannerPlugin("版本所有，翻版必究"),
         new miniCssExtractPlugin({
            filename:'./css/[name].[hash:4].css',
        }),
        new cleanWebpackPlugin(["./dist"])
    ]
})