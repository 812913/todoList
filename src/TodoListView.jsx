import React,{Component} from "react";
import {observer,inject} from "mobx-react"; 
// import TodoView from "./TodoView.jsx";
import asyncLoad from "./asyncLoad.jsx";

const TodoView=asyncLoad(()=>import("./TodoView.jsx"));

@inject('store')

@observer
export default class TodoListView extends Component{
    constructor(props){
        super(props);
        const {todos:TodoList}=this.props.store;
        this.todoList=TodoList;
    }
    handleInputChange=(e)=>{
        this.todoList.setTitText(e.target.value);
    }
    handleButtonClick=()=>{
        this.todoList.unshift(this.todoList.titText);
        this.todoList.titText='';
    }
    render(){
        const todoList=this.todoList;
        return(
            <div>
                <div>
                    <input type="text" onChange={this.handleInputChange} value={todoList.titText} placeholder="todoTitle"/>
                    <button onClick={this.handleButtonClick}>+todo</button>
                </div>
                <ul>
                    <TodoView />
                    {/* {
                        todoList.todos.map(todo=>{
                        console.log(todo);
                        return (<TodoView todo={todo} key={todo.key}></TodoView>)
                        //return (<p>{todo.title}</p>)
                    })} */}
                </ul>
                Tasks Left:{todoList.unfinishedTodoCount}
            </div>
        )
    }
}