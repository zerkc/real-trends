import React, { useState } from 'react';
import './App.css';
import { types, onSnapshot, flow, applySnapshot, detach } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import TodoList from './Components/TaskList';
import { autorun } from 'mobx';


const Task = types
  .model({
    id: types.identifier,
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    isEdit: types.optional(types.boolean, false),
  })
  .actions(self => {
    function setName(newName: string) {
      self.name = newName;
    }

    function toggle() {
      self.done = !self.done;
    }

    function enableEdit() {
      self.isEdit = true;
    }
    function disableEdit() {
      self.isEdit = false;
    }


    return { setName, toggle, enableEdit, disableEdit };
  });

const RootStore = types
  .model({
    tasks: types.optional(types.array(Task), [])
  })
  .actions(self => {
    function addTask(id: string, name: string) {
      self.tasks.push(Task.create({ id, name }));
    }

    const deleteTask = (id: string) => {
      let indexTask = self.tasks.findIndex(e => e.id == id);
      detach(self.tasks[indexTask])
    }

    const moveUpTask = (id: string) => {
      let indexTask = self.tasks.findIndex(e => e.id == id);
      if (indexTask == 0) {
        return;
      }
      const taskToMove = detach(self.tasks[indexTask]);
      self.tasks.splice(indexTask - 1, 0, taskToMove);
      return;
    };

    const moveDownTask = (id: string) => {
      let indexTask = self.tasks.findIndex(e => e.id == id);
      if (indexTask >= self.tasks.length - 1) {
        return;
      }
      const taskToMove = detach(self.tasks[indexTask]);
      self.tasks.splice(indexTask + 1, 0, taskToMove);
    }

    return { addTask, deleteTask, moveUpTask, moveDownTask };
  });

const store = RootStore.create({
  tasks: []
});

autorun(()=>{
  const snapshot = localStorage.getItem("persistData")
  if(snapshot){
    
    try{
      applySnapshot(store,JSON.parse(snapshot))
    }catch(ex){
      
    }
  }
})


onSnapshot(store, (snapshot) => {
  localStorage.setItem("persistData", JSON.stringify(snapshot));
})

const App = observer(() => {

  const [taskText, setTaskText] = useState("");

  function saveTask() {
    store.addTask(crypto.randomUUID(), taskText);
    setTaskText("");
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <input value={taskText} onChange={evt => setTaskText(evt.target.value)} />
      <button onClick={e => saveTask()}>
        Add Task
      </button>
      <TodoList store={store} />
    </div>
  );
})


export default () => <App />;
