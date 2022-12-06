import React from "react";
import { observer } from "mobx-react-lite";
import TaskItem from "./TaskItem";
import { css } from "@emotion/css";

const TaskListCss = css`
    margin: 1rem 1.5rem;
    border-radius: 6px;
    box-shadow: 1px 2px 8px #666;
    padding: 1.2rem;
`;

export default observer((props: { StoreTasks: any, filter: "ALL" | "UNCOMPLETE" }) => {
    return (
        <div className={TaskListCss}>
            {props.StoreTasks.filterTasks(props.filter).map((task: any) => (
                <TaskItem key={task.id} item={task} moveDownTask={props.StoreTasks.moveDownTask} moveUpTask={props.StoreTasks.moveUpTask} deleteTask={props.StoreTasks.deleteTask} />
            ))}
        </div>
    )
})