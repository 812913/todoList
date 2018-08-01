import React,{Component} from "react";
import ReactDOM from "react-dom";
import {observable,computed,action,autorun,configure} from "mobx";
import {observer} from "mobx-react"; 
import data from "./data.json";

// configure({enforceActions:true})

@observer
class TodoListView extends Component{
    constructor(props){
        super(props);
        this.todoList=this.props.todoList;
    }
    handleInputChange=(e)=>{
        this.todoList.setTitText(e.target.value);
    }
    handleButtonClick=()=>{
        this.todoList.unshift(this.todoList.titText);
        this.todoList.titText='';
    }
    render(){
        return(
            <div>
                <div>
                    <input type="text" onChange={this.handleInputChange} value={this.todoList.titText} placeholder="todoTitle"/>
                    <button onClick={this.handleButtonClick}>+todo</button>
                </div>
                <ul>
                    {this.props.todoList.todos.map(todo=>
                        <TodoView todo={todo} key={todo.key}></TodoView>
                    )}
                </ul>
                Tasks Left:{this.props.todoList.unfinishedTodoCount}
            </div>
        )
    }
}

const TodoView=observer(({todo})=>{
   return (
        <li>
            <input
                type="checkbox"
                checked={todo.finished}
                onClick={()=>todo.finished=!todo.finished}
            />
            {todo.title}
        </li>
   )
})


class TodoList{
    @observable todos=data;
    @observable titText;
    @computed get unfinishedTodoCount(){
      return this.todos.filter((todo)=>{
           return todo.finished===false
        }).length;
    }
    @action unshift(title){
        return this.todos.unshift({"key":`${this.todos.length+1}`,"title":title,"finished":false})
    }
    @action setTitText(titText){
         this.titText=titText;
    }
    
}

const store=new TodoList();
autorun(()=>{
    console.log(store.unfinishedTodoCount);
})
ReactDOM.render(<TodoListView todoList={store} />,document.getElementById("root"));