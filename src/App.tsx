import React, { useState } from 'react';
import { StoreTasks } from "./Models/TasksModel";
import TaskList from './Components/TaskList';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/css';
import { Input } from './Components/Input';
import { Button } from './Components/Button';


const mainCss = css`
  h1{
    text-align:center;
  }
  .added{
    display:flex;
    justify-content:center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
`


const App = observer(() => {

  const [taskText, setTaskText] = useState("");
  const [filterTasks, setFilterTasks] = useState<"ALL"| "UNCOMPLETE">("UNCOMPLETE");

  function saveTask() {
    if(!taskText || !taskText.trim()){
      return;
    }
    StoreTasks.addTask(crypto.randomUUID(), taskText);
    setTaskText("");
  }

  return (
    <div className={mainCss}>
      <h1>Lista de Tareas</h1>
      <div className='added'>
        <Input value={taskText} onChange={evt => setTaskText(evt.target.value)} />
        <Button onClick={e => saveTask()}>
          Agregar
        </Button>
      </div>

      <div className='added'>
        <Button onClick={e => setFilterTasks(filterTasks === "ALL"?"UNCOMPLETE":"ALL")}>
          {filterTasks === "ALL"?"Ocultar completadas":"Mostrar completadas"}
        </Button>
      </div>
      
      <TaskList StoreTasks={StoreTasks} filter={filterTasks} />
    </div>
  );
})


export default App;
