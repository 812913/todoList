import React from "react";
import {observer,inject} from "mobx-react"; 

const TodoView=inject('store')(observer((props)=>{
    // console.log(todo);
    const {todos:TodoList}=props.store;
    return TodoList.todos.map((todo)=>{
        return (
            <li key={todo.key}>
                <input
                    type="checkbox"
                    checked={todo.finished}
                    onClick={()=>todo.finished=!todo.finished}
                />
                {todo.title}
            </li>
       )
    })
 }))

export default TodoView;