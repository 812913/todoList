import {observable,computed,action,autorun,configure} from "mobx";
import data from "./data.json";

// configure({enforceActions:true})

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

export default store;