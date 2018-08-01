import React,{Component} from "react";
import {Provider,observer} from "mobx-react";
import TodoListView from "./TodoListView.jsx";
import TodoList from "./TodoList.js";

@observer
export default class App extends Component{
    render(){
        return(
            <Provider store={{todos:TodoList}}>
                <TodoListView/>
            </Provider>
        )
    }
}