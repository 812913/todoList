# todoList
使用Mobx+React实现的一个简单的todoList   
## 使用  

    npm install(下载所有依赖)   
    npm start(启动本地服务器，预览)  
    npm run build(构建项目，打包输出dist目录)   
## 遇到的问题  
* 没有理解mobx真正的意义   
mobx是一个状态管理库，主要就是解决React组件之间通信的问题，避免使用state来管理状态。  
最开始做的时候，没有理解其意义，表面上使用了mobx，但只是把相应的store传给了父组件的props，然后使用props实现父子组件的通信。   
虽然表面上没有问题，但实际上并没有真正使用Mbox来进行状态管理。后来进行了调整。   

* 分chunk打包   
使用老师给的asyncLoad.jsx，进行打包出现错误   

        // asyncLoad.jsx
        import React, { Component } from 'react';
        export default function asyncLoad(cb) {
        return class AsyncComponent extends Component {
            state = {
            component: null,
            };
            async componentWillMount() {
            this.setState({
                component: (await cb()).default,
            });
            }
            render() {
            const { component: Cmp } = this.state;
            if (Cmp) {
                return <Cmp />;
            } else {
                return null;
            }
            }
        };
        }

        //TodoListView.jsx
        ...
        import asyncLoad from "./asyncLoad.jsx";
        const TodoView=asyncLoad(()=>import("./TodoView.jsx"));
        ...  
    错误原因：   
    asyncLoad.jsx中使用async，所以需要下载`babel-plugin-transform-runtime`并进行配置。      
        options:{
                presets:['es2015','env','react','stage-0'],
                plugins:['transform-runtime','transform-decorators-legacy']
            }
webpack中配置chunk打包后的文件名：`chunkFilename`   

        output:{
            filename:'[name].[hash:4].bundle.js',//用于输出文件的文件名
            path:path.resolve(__dirname,'dist'),//输出目录，绝对路径
            chunkFilename: '[name].[chunkhash:5].chunk.js',
        }   
## 其他注意问题  
mobx中使用decorator(装饰器)，因此需要下载并配置`babel-plugin-decorators-legacy`   
