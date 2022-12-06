import React, { MouseEventHandler } from "react";
import { css } from '@emotion/css'
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPen, faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from '@fortawesome/free-regular-svg-icons';



const ItemCss = css`
  display:grid;
  grid-template-columns: 20px 20px 1fr 20px;
  gap:5px;
  margin: 10px 0px;
  align-items:center;
  .position{
    display:flex;
    flex-direction: column;
  }
  .editable{
    cursor:pointer;
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
    position: number,
    name: string,
    done: boolean,
    isEdit: boolean,
    setName: Function,
    toggle: Function,
    enableEdit: Function
} 

interface ITaskItemProps {
    item: ITaskItem;
}


export default observer((props: ITaskItemProps) => {
    return (
        <div
            className={ItemCss}
            key={props.item.id}>
            <div className="position">
                <FontAwesomeIcon size="xs" icon={faChevronUp} />
                <FontAwesomeIcon size="xs" icon={faChevronDown} />
            </div>
            <FontAwesomeIcon size="xl" icon={props.item.done ? faSquareCheck : faSquare} color={"gray"} onClick={props.item.toggle as MouseEventHandler} />
            {props.item.isEdit ? <input
                type="text"
                value={props.item.name}
                onChange={e => props.item.setName(e.target.value)}
            />: <span className="editable" onClick={props.item.enableEdit as MouseEventHandler}>{props.item.name}</span>}
            
            <FontAwesomeIcon className="hidden" size="xl" icon={faTrash} color="red" />
        </div>
    )
})