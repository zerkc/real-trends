import React, { useState } from 'react';
import './App.css';
import { types, getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import TodoList from './Components/TaskList';

const Task = types
  .model({
    id: types.identifier,
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    isEdit: types.optional(types.boolean, false),
  })
  .actions(self => {
    function setName(newName:string) {
      self.name = newName;
    }

    function toggle() {
      self.done = !self.done;
    }

    function enableEdit(){
      self.isEdit = true;
    }
    function disableEdit(){
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

    function deleteTask(id: string){
      let indexTask = self.tasks.findIndex(e=>e.id==id);
      self.tasks.splice(indexTask,1);
    }

    function moveUpTask(id: string){
        let indexTask = self.tasks.findIndex(e=>e.id==id);
        if(indexTask == 0){
          return;
        }
        const taskToMove = self.tasks.splice(indexTask,1)[0];
        self.tasks.splice(indexTask-1,0, taskToMove);
    }

    function moveDownTask(id: string){
      let indexTask = self.tasks.findIndex(e=>e.id==id);
      if(indexTask >= self.tasks.length - 1){
        return;
      }
      const taskToMove = self.tasks.splice(indexTask,1)[0];
      self.tasks.splice(indexTask+1,0, taskToMove);
  }

    return { addTask, deleteTask, moveUpTask, moveDownTask };
  });

const store = RootStore.create({
  tasks: [
    {
      id: crypto.randomUUID(),
      name: "Eat a cake",
      done: true
    }
  ]
});

const App = observer(() => {

  const [taskText, setTaskText] = useState("");

  function saveTask(){
    store.addTask(crypto.randomUUID(), taskText);
    setTaskText("");
  }

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <input value={taskText} onChange={evt=>setTaskText(evt.target.value)} />
      <button onClick={e => saveTask()}>
        Add Task
      </button>
      <TodoList store={store} />
    </div>
  );
})


export default ()=><App  />;
