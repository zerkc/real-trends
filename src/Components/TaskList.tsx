import React from "react";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import TaskItem from "./TaskItem";
import { css } from "@emotion/css";

const TaskListCss = css`
    margin: 1rem 1.5rem;
    border-radius: 6px;
    box-shadow: 1px 2px 8px #666;
    padding: 1.2rem;
`;

export default observer((props: any) => {
    return (
        <div className={TaskListCss}>
            {values(props.store.tasks).map((task: any) => (
                <TaskItem key={task.key} item={task} moveDownTask={props.store.moveDownTask} moveUpTask={props.store.moveUpTask} deleteTask={props.store.deleteTask} />
            ))}
        </div>
    )
})