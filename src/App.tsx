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

    return { setName, toggle, enableEdit };
  });

const RootStore = types
  .model({
    tasks: types.optional(types.map(Task), {})
  })
  .actions(self => {
    function addTask(id: string, name: string) {
      self.tasks.set(id, Task.create({ id, name }));
    }

    return { addTask };
  });

const store = RootStore.create({
  tasks: {
    "1": {
      id: crypto.randomUUID(),
      name: "Eat a cake",
      done: true
    }
  }
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
