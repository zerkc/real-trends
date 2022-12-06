import React, { MouseEventHandler, useState } from "react";
import { css } from '@emotion/css'
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronUp, faSquareCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Input } from "./Input";



const ItemCss = css`
  display:grid;
  grid-template-columns: 20px 20px 1fr 20px;
  gap:5px;
  margin: 10px 0px;
  align-items:center;
  user-select: none;
  &.editting{
    grid-template-columns: 20px 1fr 20px 20px;
  }
  .position{
    display:flex;
    flex-direction: column;
  }
  .editable{
    cursor:pointer;
  }
  .textChecked{
    text-decoration: line-through
  }
  .hidden{
    opacity: 0;
    transition: opacity 600ms;
  }
  &:hover{
    .hidden{
        opacity: 1;
        transition: opacity 400ms;
    }
  }
`

interface ITaskItem {
    id: string,
    name: string,
    done: boolean,
    isEdit: boolean,
    setName: Function,
    toggle: Function,
    enableEdit: Function
    disableEdit: Function
} 

interface ITaskItemProps {
    item: ITaskItem;
    deleteTask: (id: string) => void;
    moveUpTask: (id: string) => void;
    moveDownTask: (id: string) => void;
}

export default observer((props: ITaskItemProps) => {

    const [name, setName] = useState(props.item.name);

    function saveEdit(name: string){
        props.item.setName(name);
        props.item.disableEdit();
    }

    function cancelEdit(){
        setName(props.item.name);
        props.item.disableEdit();
    }

    return (
        <div
            className={`${ItemCss} ${props.item.isEdit && "editting"}`}
            key={props.item.id}>
            <div className="position">
                <FontAwesomeIcon size="xs" onClick={()=>props.moveUpTask(props.item.id)} icon={faChevronUp} />
                <FontAwesomeIcon size="xs" onClick={()=>props.moveDownTask(props.item.id)} icon={faChevronDown} />
            </div>
            {!props.item.isEdit && <FontAwesomeIcon size="xl" icon={props.item.done ? faSquareCheck : faSquare} color={"gray"} onClick={props.item.toggle as MouseEventHandler} />}
            {props.item.isEdit ? <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyUp={evt=>{
                    if(evt.code === "Enter"){
                        saveEdit(name);
                    }else if(evt.code === "Escape"){
                        cancelEdit();
                    }
                }}
                autoFocus={true}
            />: <span className={`editable ${props.item.done && "textChecked"}`} onClick={props.item.enableEdit as MouseEventHandler}>{props.item.name}</span>}
            
            {!props.item.isEdit ? <FontAwesomeIcon className="hidden" size="xl" icon={faTrash} onClick={()=>props.deleteTask(props.item.id)} color="red" /> : (<>
                <FontAwesomeIcon size="xl" icon={faCheck} onClick={()=>saveEdit(name)} color="green" />
                <FontAwesomeIcon size="xl" icon={faXmark} onClick={cancelEdit} color="red" />
            </>)}
        </div>
    )
})